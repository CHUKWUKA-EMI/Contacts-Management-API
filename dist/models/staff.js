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
  "Staff",
  {
    id: {
      type: _sequelize2.default.UUID,
      allowNull: false,
      defaultValue: _sequelize2.default.UUIDV4,
      primaryKey: true,
      unique: true,
    },
    firstName: {
      type: _sequelize2.default.STRING,
      allowNull: false,
      validate: {
        isAlpha: true,
        min: {
          msg: "Name must be at least 3 characters long",
          args: [3],
        },
      },
    },
    lastName: {
      type: _sequelize2.default.STRING,
      allowNull: false,
      validate: {
        isAlpha: true,
        min: {
          msg: "Name must be at least 3 characters long",
          args: [3],
        },
      },
    },
    email: {
      type: _sequelize2.default.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: _sequelize2.default.STRING,
      allowNull: false,
      validate: {
        min: {
          msg: "Password must be at least 6 characters/digits long",
          args: [6],
        },
      },
    },
    role: {
      type: _sequelize2.default.STRING,
      allowNull: false,
      validate: {
        isAlpha: {
          msg: "Role must only be in aphabetical letters",
        },
      },
    },
    verified: {
      type: _sequelize2.default.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
  },
  { timestamps: false, freezeTableName: true }
);
