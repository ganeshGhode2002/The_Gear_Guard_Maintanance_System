import * as s from "./request.service.js";

export const create = async (req, res) => {
  try {
    const request = await s.create(req.body, req.user.id);
    res.status(201).json(request);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
export const list = async (r, res) => res.json(await s.list());
export const assign = async (req, res) => {
  try {
    const result = await s.assign(req.params.id, req.body.technicianId);
    res.json(result);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
export const complete = async (r, res) => res.json(await s.complete(r.params.id, r.body.duration));
export const updateStatus = async (r, res) => res.json(await s.updateStatus(r.params.id, r.body.status));
