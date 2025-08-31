import {
  signupPage,
  signup,
  loginPage,
  login,
  profile,
  logout,
} from "../controllers/userControllers.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import { signupValidation } from "../middlewares/validationMiddleware.js";
import loginValidation from "../middlewares/loginValidation.js";
import upload from "../middlewares/uploadMiddleware.js";
import { updateProfilePic } from "../controllers/userControllers.js";
import express from "express";
const router = express.Router();

router.get("/signup", signupPage);
router.get("/login", loginPage);
router.post("/login", loginValidation, login);
router.get("/profile", isAuthenticated, profile);
router.post("/signup", signupValidation, signup);
router.get("/logout", logout);
router.post("/profile/upload", upload.single("profilePic"), updateProfilePic);

export default router;
