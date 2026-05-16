

import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  "waterpurifier", // database name
  "root", // mysql username
  "Harshan#.000", // mysql password
  {
    host: "localhost",
    dialect: "mysql",
  },
);

export const connectMySQL = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ MySQL Connected");
  } catch (err) {
    console.log("❌ MySQL Error:", err);
  }
};
