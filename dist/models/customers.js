"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});

var _sequelize = require("sequelize");

var _sequelize2 = _interopRequireDefault(_sequelize);

var _connection = require("../DB/connection");

var _connection2 = _interopRequireDefault(_connection);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

exports.default = _connection2.default.define(
  "Customers",
  {
    id: {
      type: _sequelize2.default.UUID,
      allowNull: false,
      defaultValue: _sequelize2.default.UUIDV4,
      primaryKey: true,
      unique: true,
    },
    name: {
      type: _sequelize2.default.STRING,
      allowNull: false,
    },
    gender: {
      type: _sequelize2.default.STRING,
      allowNull: false,
    },
    phoneNumber: {
      field: "phone_number",
      type: _sequelize2.default.BIGINT,
      allowNull: false,
      validate: {
        isNumeric: {
          msg: "Enter a valid phone number",
        },
      },
    },
    homeAddress: {
      field: "home_address",
      type: _sequelize2.default.STRING,
      allowNull: false,
    },
    email: {
      type: _sequelize2.default.STRING,
      unique: true,
      allowNull: true,
      validate: {
        isEmail: true,
      },
    },
    nationality: {
      type: _sequelize2.default.STRING,
      allowNull: false,
    },
    state: {
      type: _sequelize2.default.STRING,
    },
    local_govt: {
      type: _sequelize2.default.STRING,
      allowNull: false,
    },
    createdAt: {
      type: _sequelize2.default.DATE,
      allowNull: true,
    },
    updatedAt: {
      type: _sequelize2.default.DATE,
      allowNull: true,
    },
  },
  { timestamps: true }
);
