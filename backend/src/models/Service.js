
import { DataTypes } from "sequelize";
import { sequelize } from "../config/mysql.js";

const Service = sequelize.define(
  "Service",
  {
    customer: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    product: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    issue: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    status: {
      type: DataTypes.STRING,
      defaultValue: "Pending",
    },

    date: {
      type: DataTypes.DATEONLY,
    },
  },
  {
    timestamps: false,
  },
);

export default Service;
