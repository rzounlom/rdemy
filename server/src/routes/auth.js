import {
  currentUser,
  forgotPassword,
  login,
  logout,
  register,
  resetPassword,
  sendTestEmail,
} from "../controllers/auth";

import { Router } from "express";
import { requireSignin } from "../middlewares";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/current-user", requireSignin, currentUser);
router.get("/send-email", sendTestEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

module.exports = router;
