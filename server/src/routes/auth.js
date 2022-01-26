import { currentUser, login, logout, register } from "../controllers/auth";

import { Router } from "express";
import { requireSignin } from "../middlewares";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/current-user", requireSignin, currentUser);

module.exports = router;
