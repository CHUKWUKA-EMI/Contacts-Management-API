"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      "Staff",
      {
        id: {
          type: Sequelize.UUID,
          allowNull: false,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
          unique: true,
        },
        firstName: {
          type: Sequelize.STRING,
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
          type: Sequelize.STRING,
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
          type: Sequelize.STRING,
          unique: true,
          allowNull: false,
          validate: {
            isEmail: true,
          },
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            min: {
              msg: "Password must be at least 6 characters/digits long",
              args: [6],
            },
          },
        },
        role: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            isAlpha: {
              msg: "Role must only be in aphabetical letters",
            },
          },
        },
        verified: {
          type: Sequelize.BOOLEAN,
          allowNull: true,
          defaultValue: false,
        },
      },
      { timestamps: false, freezeTableName: true }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Staff");
  },
};
