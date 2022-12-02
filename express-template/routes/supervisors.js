import express from "express";
import { getSupervisor, createSupervisor } from "../controllers/supervisors.js";
const router = express.Router();

router.get("/supervisors", getSupervisor);
router.put("/submit", createSupervisor);

export default router;
