import express from "express";
import * as c from "./equipment.controller.js";
import { protect } from "../../middleware/auth.middleware.js";
import { authorize } from "../../middleware/role.middleware.js";

const r = express.Router();
r.use(protect);

r.post("/", authorize("ADMIN"), c.create);
r.get("/", authorize("ADMIN","MANAGER","TECHNICIAN"), c.list);
r.get("/:id", authorize("ADMIN","MANAGER","TECHNICIAN"), c.getOne);
r.put("/:id", authorize("ADMIN"), c.update);
r.delete("/:id", authorize("ADMIN"), c.scrap);

export default r;
