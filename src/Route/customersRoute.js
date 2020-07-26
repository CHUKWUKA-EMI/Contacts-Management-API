import express from "express";
import db from "../DB/database";
import { Op } from "sequelize";
import verify from "../Authorization";

const router = express.Router();

router.get("/customers", verify, async (req, res) => {
  try {
    const customers = await db.Customers.findAndCountAll();
    if (!customers) {
      return res.status(500).json({ error: "Customers don't exist" });
    }

    return res.status(200).json({ customers: customers });
  } catch (err) {
    console.log(err.message);
    return res.send(err.message);
  }
});

//For Performing search on the database for customers
router.post("/customer", verify, async (req, res) => {
  try {
    const customer = await db.Customers.findAndCountAll({
      where: db.Sequelize.or(
        { name: { [Op.iLike]: `%${req.body.query}%` } },
        db.Sequelize.or({ email: { [Op.iLike]: `%${req.body.query}%` } }),
        db.Sequelize.or({ nationality: { [Op.iLike]: `%${req.body.query}%` } }),
        db.Sequelize.or({ state: { [Op.iLike]: `%${req.body.query}%` } }),
        db.Sequelize.or({ local_govt: { [Op.iLike]: `%${req.body.query}%` } }),
        db.Sequelize.or({
          home_address: { [Op.iLike]: `%${req.body.query}%` },
        })
      ),
    });
    if (!customer) {
      return res
        .status(400)
        .json({ err: `customer with name ${name} not found` });
    }

    return res.status(200).json({ customer: customer });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.post("/customers", verify, async (req, res) => {
  const {
    name,
    gender,
    phone_number,
    home_address,
    email,
    nationality,
    state,
    local_govt,
  } = req.body;

  try {
    const customers = await db.Customers.create({
      name: name,
      gender: gender,
      phoneNumber: phone_number,
      homeAddress: home_address,
      email: email,
      nationality: nationality,
      state: state,
      local_govt: local_govt,
    });

    if (customers) {
      return res.status(201).json(customers);
    } else {
      return res.status(500).json({ error: "customer not created" });
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.put("/customer/:id", verify, async (req, res) => {
  const { id } = req.params;
  try {
    const [updatedCustomer] = await db.Customers.update(req.body, {
      where: { id: id },
    });

    if (updatedCustomer) {
      return res
        .status(201)
        .json({ success: `successfully updated customer with id ${id}` });
    }

    return res
      .status(400)
      .json({ error: `failed to update customer with id ${id}` });
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

router.delete("/customer/:id", verify, async (req, res) => {
  const { id } = req.params;
  try {
    if (req.user.role !== "Admin") {
      return res.status(400).json({
        notAllowed:
          "Your role does not include the deletion of customers. Obtain the equired permissions",
      });
    }
    const deleted = await db.Customers.destroy({ where: { id: id } });
    if (deleted) {
      return res.status(200).send("Customer deleted successfully");
    }

    return res
      .status(400)
      .json({ error: `Unable to delete customer with id ${id}` });
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

export default router;
