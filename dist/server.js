"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _cors = require("cors");

var _cors2 = _interopRequireDefault(_cors);

var _connection = require("./DB/connection");

var _connection2 = _interopRequireDefault(_connection);

var _customersRoute = require("./Route/customersRoute");

var _customersRoute2 = _interopRequireDefault(_customersRoute);

var _staffRoute = require("./Route/staffRoute");

var _staffRoute2 = _interopRequireDefault(_staffRoute);

var _dotenv = require("dotenv");

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const app = (0, _express2.default)();
_dotenv2.default.config();

app.use((0, _cors2.default)());

app.use(_express2.default.urlencoded({ extended: false }));
app.use(_express2.default.json());

app.use("/", _customersRoute2.default);
app.use("/staff", _staffRoute2.default);

app.get("/", (req, res) => {
  res.send("WELCOME TO CONTACTS MANAGEMENT API");
});

const port = process.env.PORT || 5000;

app.listen(5000, async () => {
  console.log(`Server listening on Port ${port}`);
  try {
    await _connection2.default.authenticate({ logging: false });
    console.log("Database Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
