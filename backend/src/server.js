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

app.use(cors());
app.use(express.json());

connectMySQL();

sequelize.sync();


app.use("/api/items", itemRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/installations", installationRoutes);


app.get("/", (req, res) => {
  res.send("API Running");
});

const PORT = process.env.PORT 

app.listen(PORT, () => {
  console.log(`🚀 Server running on ${PORT}`);
});
