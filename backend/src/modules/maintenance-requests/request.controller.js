import * as s from "./request.service.js";

export const create = async (r,res)=>res.status(201).json(await s.create(r.body,r.user.id));
export const list = async (r,res)=>res.json(await s.list());
export const assign = async (r,res)=>res.json(await s.assign(r.params.id,r.body.technicianId));
export const complete = async (r,res)=>res.json(await s.complete(r.params.id,r.body.duration));
export const updateStatus = async (r,res)=>res.json(await s.updateStatus(r.params.id,r.body.status));
