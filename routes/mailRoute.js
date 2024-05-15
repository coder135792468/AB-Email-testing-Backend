import express from "express";
import {
  sendMail,
  increaseView,
  getMaxViewTime,
} from "../controllers/mailController.js";

const router = express.Router();
router.route("/").post(sendMail);
router.route("/getmax").get(getMaxViewTime);
router.route("/view.png").get(increaseView);

export default router;
