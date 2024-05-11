import express from "express";
const router = express.Router();
import { getAllExperiments } from "../controllers/experimentController.js";

router.get("/", getAllExperiments);
// router
//   .route("/profile")
//   .get(protect, getUserProfile)
//   .put(protect, updateUserProfile);
// router
//   .route("/:id")
//   .delete(protect, admin, deleteUser)
//   .get(protect, admin, getUserById)
//   .put(protect, admin, updateUser);

export default router;
