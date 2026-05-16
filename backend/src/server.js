import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { connectMySQL, sequelize } from "./config/mysql.js";

import itemRoutes from "./routes/itemRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import installationRoutes from "./routes/installationRoutes.js";

dotenv.config();

const app = express();

// ✅ MIDDLEWARE
app.use(cors());
app.use(express.json());

// ✅ MYSQL CONNECTION
connectMySQL();

// ✅ CREATE TABLES
sequelize.sync();

// ✅ ROUTES
app.use("/api/items", itemRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/installations", installationRoutes);

// ✅ TEST API
app.get("/", (req, res) => {
  res.send("API Running");
});

// ✅ SERVER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on ${PORT}`);
});
