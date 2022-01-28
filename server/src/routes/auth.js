import {
  currentUser,
  login,
  logout,
  register,
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

module.exports = router;
