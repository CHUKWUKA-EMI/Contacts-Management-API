import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const { DB_USER, DB_DATABASE, DB_PASSWORD } = process.env;
const sequlize = new Sequelize(DB_USER, DB_DATABASE, DB_PASSWORD, {
  host: "ruby.db.elephantsql.com",
  dialect: "postgres",
  port: 5432,
  define: {
    timestamps: false,
  },
});

export default sequlize;
