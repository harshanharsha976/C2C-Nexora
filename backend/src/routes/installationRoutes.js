import express from "express";

import {
  getInstallations,
  addInstallation,
  updateInstallation,
  deleteInstallation,
} from "../controllers/installationController.js";

const router = express.Router();

// ✅ GET ALL INSTALLATIONS
router.get("/", getInstallations);

// ✅ ADD INSTALLATION
router.post("/", addInstallation);

// ✅ UPDATE INSTALLATION
router.put("/:id", updateInstallation);

// ✅ DELETE INSTALLATION
router.delete("/:id", deleteInstallation);

export default router;
