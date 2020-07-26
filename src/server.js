import express from "express";
import cors from "cors";
import sequelize from "./DB/connection";
import customersRoute from "./Route/customersRoute";
import staffRoute from "./Route/staffRoute";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", customersRoute);
app.use("/staff", staffRoute);

const port = process.env.PORT || 5000;

app.listen(5000, async () => {
  console.log(`Server listening on Port ${port}`);
  try {
    await sequelize.authenticate({ logging: false });
    console.log("Database Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
