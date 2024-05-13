import express from "express";
import { sendMail, increaseView } from "../controllers/mailController.js";

const router = express.Router();
router.route("/").post(sendMail);
router.route("/:id").get(increaseView);

export default router;
