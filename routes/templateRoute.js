import express from "express";
const router = express.Router();
import {
  getAllTemplates,
  getTemplateById,
  deleteTemplate,
} from "../controllers/templateController.js";

router.route("/").get(getAllTemplates);
router.route("/:id").get(getTemplateById).delete(deleteTemplate);

export default router;
