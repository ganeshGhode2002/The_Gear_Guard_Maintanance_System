import express from "express";
import * as c from "./request.controller.js";
import { protect } from "../../middleware/auth.middleware.js";
import { authorize } from "../../middleware/role.middleware.js";

const r = express.Router();
r.use(protect);

r.post("/", authorize("EMPLOYEE","MANAGER"), c.create);
r.get("/", authorize("ADMIN","MANAGER","TECHNICIAN"), c.list);
r.put("/:id/assign", authorize("TECHNICIAN"), c.assign);
r.put("/:id/complete", authorize("TECHNICIAN"), c.complete);
r.put("/:id/status", authorize("MANAGER"), c.updateStatus);

export default r;
