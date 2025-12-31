import express from "express";
import { register, login } from "./auth.controller.js";
import { authorize } from "../../middleware/role.middleware.js";
import { protect } from "../../middleware/auth.middleware.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/test-rbac", protect, authorize("MANAGER"), (req, res) => {
    res.json({ message: "RBAC works" });
}
);
export default router;