"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});

var _sequelize = require("sequelize");

var _sequelize2 = _interopRequireDefault(_sequelize);

var _connection = require("./connection");

var _connection2 = _interopRequireDefault(_connection);

var _customers = require("../models/customers");

var _customers2 = _interopRequireDefault(_customers);

var _staff = require("../models/staff");

var _staff2 = _interopRequireDefault(_staff);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const db = {};

db.sequelize = _connection2.default;
db.Sequelize = _sequelize2.default;

db.Customers = _customers2.default;
db.Staff = _staff2.default;

exports.default = db;
