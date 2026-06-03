import express from "express";

import {
  getInstallations,
  addInstallation,
  updateInstallation,
  deleteInstallation,
} from "../controllers/installationController.js";

const router = express.Router();

router.get("/", getInstallations);


router.post("/", addInstallation);
router.put("/:id", updateInstallation);

router.delete("/:id", deleteInstallation);

export default router;
