import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../DB/database";
import template from "../services/emailTemplate";
import sgMail from "../services/sendgridMail";
import verify from "../Authorization";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.get("/staff", verify, async (req, res) => {
  try {
    const staff = await db.Staff.findAndCountAll({
      attributes: { exclude: ["password"] },
    });
    return res
      .status(200)
      .json({ staff: staff.rows, numberOfStaff: staff.count });
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

router.post("/signUp", async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;
  try {
    const existingStaff = await db.Staff.findOne({ where: { email: email } });
    if (existingStaff) {
      return res.status(400).json({ error: "Staff already exists" });
    }

    const hashPass = await bcrypt.hash(password, 10);
    const staff = await db.Staff.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashPass,
      role: role,
    });
    const msg = template(staff);
    await sgMail.sendEmail(
      `Developer-Justice <pistischaris494@gmail.com>`,
      email,
      `Email Confirmation`,
      msg
    );
    return res.status(201).json({
      staffId: staff.id,
      firstName: staff.firstName,
      lastName: staff.lastName,
      email: staff.email,
      role: staff.role,
    });
  } catch (err) {
    return res.status(400).send(err);
  }
});

router.get("/verify/:token", async (req, res, next) => {
  const { token } = req.params;
  try {
    const { id } = jwt.verify(req.params.token, process.env.JWT_SECRET);
    if (id) {
      const staff = await db.Staff.findOne({ where: { id: id } });
      if (staff) {
        await staff.update({ verified: true });
        return res.redirect(process.env.APP_REDIRECT);
      }
      return res.status(400).send(`Staff with id ${id} not found`);
    }
    return res.status(500).send("Not a valid token");
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const staff = await db.Staff.findOne({ where: { email: email } });
    if (!staff) {
      return res.status(400).send(`Staff with email ${email} not found`);
    }
    const validPassword = await bcrypt.compare(password, staff.password);
    if (!validPassword) {
      return res.status(400).send("Invalid password");
    }
    if (!staff.verified) {
      return res
        .status(401)
        .send(
          `Your email ${email} has not been verified. Please verify your email.`
        );
    }

    const token = jwt.sign(
      { id: staff.id, role: staff.role },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );
    res.header("Authorization", token);
    return res.status(200).json({
      id: staff.id,
      name: staff.firstName + " " + staff.lastName,
      token: token,
      tokenExpiration: process.env.JWT_EXPIRES_IN,
    });
  } catch (err) {
    return res.status(500).send(err);
  }
});

export default router;
