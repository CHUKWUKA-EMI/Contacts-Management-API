import Sequelize from "sequelize";
import sequelize from "../DB/connection";

export default sequelize.define(
  "Customers",
  {
    id: {
      type: Sequelize.UUID,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      unique: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    gender: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    phoneNumber: {
      field: "phone_number",
      type: Sequelize.BIGINT,
      allowNull: false,
      validate: {
        isNumeric: {
          msg: "Enter a valid phone number",
        },
      },
    },
    homeAddress: {
      field: "home_address",
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: true,
      validate: {
        isEmail: true,
      },
    },
    nationality: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    state: {
      type: Sequelize.STRING,
    },
    local_govt: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: true,
    },
  },
  { timestamps: true }
);
