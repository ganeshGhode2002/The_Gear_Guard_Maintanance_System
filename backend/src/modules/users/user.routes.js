import express from "express";
import * as controller from "./user.controller.js";
import { protect } from "../../middleware/auth.middleware.js";
import { authorize } from "../../middleware/role.middleware.js";

const router = express.Router();

router.use(protect);

router.post("/", authorize("ADMIN"), controller.create);
router.get("/", authorize("ADMIN", "MANAGER"), controller.list);
router.get("/:id", authorize("ADMIN", "MANAGER"), controller.getOne);
router.put("/:id", authorize("ADMIN"), controller.update);
router.delete("/:id", authorize("ADMIN"), controller.remove);

export default router;
