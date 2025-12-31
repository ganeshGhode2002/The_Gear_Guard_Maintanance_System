import express from "express";
import authRoutes from "./modules/auth/auth.routes.js";
import usersRoutes from "./modules/users/user.routes.js";
import teamRoutes from "./modules/teams/team.routes.js";
import categoryRoutes from "./modules/equipment-categories/category.routes.js"
import equipmentRoutes from "./modules/equipment/equipment.routes.js"
import requestRoutes from "./modules/maintenance-requests/request.routes.js"
const router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", usersRoutes);
router.use("/teams", teamRoutes);
router.use("/categories", categoryRoutes);
router.use("/equipment", equipmentRoutes);
router.use("/requests", requestRoutes);
export default router;
