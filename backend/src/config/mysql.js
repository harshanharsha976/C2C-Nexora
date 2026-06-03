

import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  "waterpurifier", 
  "root", 
  "Harshan#.000", 
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
