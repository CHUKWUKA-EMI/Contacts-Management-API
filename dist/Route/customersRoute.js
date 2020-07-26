"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _database = require("../DB/database");

var _database2 = _interopRequireDefault(_database);

var _sequelize = require("sequelize");

var _Authorization = require("../Authorization");

var _Authorization2 = _interopRequireDefault(_Authorization);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const router = _express2.default.Router();

router.get("/customers", _Authorization2.default, async (req, res) => {
  try {
    const customers = await _database2.default.Customers.findAndCountAll();
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
router.post("/customer", _Authorization2.default, async (req, res) => {
  try {
    const customer = await _database2.default.Customers.findAndCountAll({
      where: _database2.default.Sequelize.or(
        { name: { [_sequelize.Op.iLike]: `%${req.body.query}%` } },
        _database2.default.Sequelize.or({
          email: { [_sequelize.Op.iLike]: `%${req.body.query}%` },
        }),
        _database2.default.Sequelize.or({
          nationality: { [_sequelize.Op.iLike]: `%${req.body.query}%` },
        }),
        _database2.default.Sequelize.or({
          state: { [_sequelize.Op.iLike]: `%${req.body.query}%` },
        }),
        _database2.default.Sequelize.or({
          local_govt: { [_sequelize.Op.iLike]: `%${req.body.query}%` },
        }),
        _database2.default.Sequelize.or({
          home_address: { [_sequelize.Op.iLike]: `%${req.body.query}%` },
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

router.post("/customers", _Authorization2.default, async (req, res) => {
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
    const customers = await _database2.default.Customers.create({
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

router.put("/customer/:id", _Authorization2.default, async (req, res) => {
  const { id } = req.params;
  try {
    const [updatedCustomer] = await _database2.default.Customers.update(
      req.body,
      {
        where: { id: id },
      }
    );

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

router.delete("/customer/:id", _Authorization2.default, async (req, res) => {
  const { id } = req.params;
  try {
    if (req.user.role !== "Admin") {
      return res.status(400).json({
        notAllowed:
          "Your role does not include the deletion of customers. Obtain the equired permissions",
      });
    }
    const deleted = await _database2.default.Customers.destroy({
      where: { id: id },
    });
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

exports.default = router;
