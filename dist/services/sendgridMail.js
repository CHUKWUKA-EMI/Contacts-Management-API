"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});

var _mail = require("@sendgrid/mail");

var _mail2 = _interopRequireDefault(_mail);

var _dotenv = require("dotenv");

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

_dotenv2.default.config();

_mail2.default.setApiKey(process.env.SENDGRID_API_KEY);

exports.default = {
  sendEmail(from, to, subject, html) {
    return new Promise((resolve, reject) => {
      _mail2.default.send({ to, subject, from, html }, (err, result) => {
        if (err) reject(err);

        resolve(result);
      });
    });
  },
};
// sgMail.send(msg);
