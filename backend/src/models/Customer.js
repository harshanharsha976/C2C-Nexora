import { DataTypes } from "sequelize";
import { sequelize } from "../config/mysql.js";

const Customer = sequelize.define(
  "Customer",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  },
);

export default Customer;
