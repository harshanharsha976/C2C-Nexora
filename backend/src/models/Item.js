import { DataTypes } from "sequelize";
import { sequelize } from "../config/mysql.js";

const Item = sequelize.define(
  "Item",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  },
);

export default Item;
