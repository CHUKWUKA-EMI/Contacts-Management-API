"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});

var _sequelize = require("sequelize");

var _dotenv = require("dotenv");

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

_dotenv2.default.config();

const { DB_USER, DB_DATABASE, DB_PASSWORD } = process.env;
const sequlize = new _sequelize.Sequelize(DB_USER, DB_DATABASE, DB_PASSWORD, {
  host: "ruby.db.elephantsql.com",
  dialect: "postgres",
  port: 5432,
  define: {
    timestamps: false,
  },
});

exports.default = sequlize;
