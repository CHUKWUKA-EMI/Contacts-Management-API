"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _bcryptjs = require("bcryptjs");

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _database = require("../DB/database");

var _database2 = _interopRequireDefault(_database);

var _emailTemplate = require("../services/emailTemplate");

var _emailTemplate2 = _interopRequireDefault(_emailTemplate);

var _sendgridMail = require("../services/sendgridMail");

var _sendgridMail2 = _interopRequireDefault(_sendgridMail);

var _Authorization = require("../Authorization");

var _Authorization2 = _interopRequireDefault(_Authorization);

var _dotenv = require("dotenv");

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

_dotenv2.default.config();

const router = _express2.default.Router();

router.get("/staff", _Authorization2.default, async (req, res) => {
  try {
    const staff = await _database2.default.Staff.findAndCountAll({
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
    const existingStaff = await _database2.default.Staff.findOne({
      where: { email: email },
    });
    if (existingStaff) {
      return res.status(400).json({ error: "Staff already exists" });
    }

    const hashPass = await _bcryptjs2.default.hash(password, 10);
    const staff = await _database2.default.Staff.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashPass,
      role: role,
    });
    const msg = (0, _emailTemplate2.default)(staff);
    await _sendgridMail2.default.sendEmail(
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
    const { id } = _jsonwebtoken2.default.verify(
      req.params.token,
      process.env.JWT_SECRET
    );
    if (id) {
      const staff = await _database2.default.Staff.findOne({
        where: { id: id },
      });
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
    const staff = await _database2.default.Staff.findOne({
      where: { email: email },
    });
    if (!staff) {
      return res.status(400).send(`Staff with email ${email} not found`);
    }
    const validPassword = await _bcryptjs2.default.compare(
      password,
      staff.password
    );
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

    const token = _jsonwebtoken2.default.sign(
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

exports.default = router;
