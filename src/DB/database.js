import Sequelize from "sequelize";
import sequelize from "./connection";

import Customers from "../models/customers";
import Staff from "../models/staff";

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Customers = Customers;
db.Staff = Staff;

export default db;
