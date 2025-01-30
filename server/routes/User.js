import express from "express";
import {
  UserLogin,
  UserRegister,
  addWorkout,
  getUserDashboard,
  getWorkoutsByDate,
  deleteWorkout,
  updatePassword,
  updateProfileImage,
  updatePersonalDetails,
  getWorkoutDates,
} from "../controllers/User.js";
import { upload } from "../utils/uploadImage.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/signup", UserRegister);
router.post("/signin", UserLogin);

router.put('/update-password/:userId', verifyToken, updatePassword);
router.put('/update-profile-image/:userId', verifyToken, upload.single('imageUrl'), updateProfileImage); // Use the upload middleware
router.put('/update-personal-details/:userId', verifyToken, updatePersonalDetails);

router.get("/dashboard", verifyToken, getUserDashboard);
router.get("/workout", verifyToken, getWorkoutsByDate);
router.post("/workout", verifyToken, addWorkout);
router.delete("/workout/:id", verifyToken, deleteWorkout); // New route for deleting a workout
router.get("/dates", verifyToken, getWorkoutDates);

export default router;
