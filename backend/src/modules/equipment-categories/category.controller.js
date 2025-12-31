import * as s from "./category.service.js";
export const create = async (r,res)=>res.status(201).json(await s.create(r.body));
export const list = async (r,res)=>res.json(await s.list());
export const getOne = async (r,res)=>res.json(await s.get(r.params.id));
export const update = async (r,res)=>res.json(await s.update(r.params.id,r.body));
export const remove = async (r,res)=>res.json(await s.remove(r.params.id));
