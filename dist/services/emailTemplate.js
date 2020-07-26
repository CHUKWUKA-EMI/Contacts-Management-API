"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _dotenv = require("dotenv");

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

_dotenv2.default.config();

const { JWT_SECRET } = process.env;

const template = (staff) => {
  const token = _jsonwebtoken2.default.sign({ id: staff.id }, JWT_SECRET, {
    expiresIn: "24h",
  });
  const url = `https://customers-contacts-manager.herokuapp.com//staff/verify/${token}`;

  const html = `
     <!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Email Confirmation</title>
		<style>
			.btn {
				background-color: aqua;
				color: brown;
				padding: 1em 1.5em;
        text-decoration: none;
        font-weight:bold;
				text-transform: capitalize;
			}
			.btn:hover {
				background-color: rgb(40, 167, 167);
			}
			.btn:active {
				background-color: rgb(40, 167, 167);
			}

			.btn:visited {
				background-color: rgb(40, 167, 167);
      }
      p{
        font-size: 15px;
        
        font-weight:bold;
      }
      h2{
        font-size:25px;
        font-weight:800;
        
      }
		</style>
	</head>
	<body>
    <h3>Hi ${staff.firstName} ${staff.lastName} </h3>
    <p>Thank you for registering as a staff [role:${staff.role}] on this platform</p>
    <hr/>
    <b><h2>Please Verify your email</h2></b>
		<a style="background-color: rgb(40, 167, 167);
				color: brown;
				padding: 1em 1.5em;
        text-decoration: none;
        font-weight:bold;
				text-transform: capitalize;" class="btn" href="${url}">Verify Email</a>
	</body>
</html>
  `;
  return html;
};

exports.default = template;
