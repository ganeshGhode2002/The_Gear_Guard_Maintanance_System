import express from "express";
import * as c from "./team.controller.js";
import { protect } from "../../middleware/auth.middleware.js";
import { authorize } from "../../middleware/role.middleware.js";

const router = express.Router();

router.use(protect);

router.post("/", authorize("ADMIN"), c.create);
router.get("/", authorize("ADMIN", "MANAGER"), c.list);
router.get("/:id", authorize("ADMIN", "MANAGER"), c.getOne);
router.put("/:id", authorize("ADMIN"), c.update);
router.delete("/:id", authorize("ADMIN"), c.remove);

export default router;
