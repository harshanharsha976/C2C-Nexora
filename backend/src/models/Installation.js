import { DataTypes } from "sequelize";
import { sequelize } from "../config/mysql.js";

const Installation = sequelize.define(
  "Installation",
  {
    customer: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    product: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    technician: {
      type: DataTypes.STRING, 
      allowNull: true,
    },

    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    status: {
      type: DataTypes.STRING,
      defaultValue: "Pending",
    },
  },
  {
    timestamps: false, // keeps it simple (no createdAt/updatedAt)
  },
);

export default Installation;
