import express from "express";
import { setUpJob } from "../controllers/scheduleJobController.js";

const router = express.Router();
router.route("/").post(setUpJob);

export default router;
