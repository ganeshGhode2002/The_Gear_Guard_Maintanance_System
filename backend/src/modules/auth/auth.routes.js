import express from "express";
import { register, login, logout, me } from "./auth.controller.js";
import { authorize } from "../../middleware/role.middleware.js";
import { protect } from "../../middleware/auth.middleware.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/me", protect, me);
export default router;