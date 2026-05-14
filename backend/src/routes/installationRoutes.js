import express from "express";

import {
  getInstallations,
  addInstallation,
  assignTechnician,
  completeInstallation,
} from "../controllers/installationController.js";

const router = express.Router();

router.get("/", getInstallations);

router.post("/", addInstallation);

// ✅ ADMIN ASSIGNS TECHNICIAN
router.put("/assign/:id", assignTechnician);

// ✅ TECHNICIAN COMPLETES
router.put("/complete/:id", completeInstallation);

export default router;
