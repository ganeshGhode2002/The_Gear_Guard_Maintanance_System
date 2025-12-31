import * as service from "./user.service.js";

export const create = async (req, res) => {
  try {
    const user = await service.createUser(req.body);
    res.status(201).json(user);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

export const list = async (req, res) => {
  try {
    const users = await service.getUsers(req.query);
    res.json(users);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

export const getOne = async (req, res) => {
  try {
    const user = await service.getUserById(req.params.id);
    res.json(user);
  } catch (e) {
    res.status(404).json({ error: e.message });
  }
};

export const update = async (req, res) => {
  try {
    const user = await service.updateUser(req.params.id, req.body);
    res.json(user);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

export const remove = async (req, res) => {
  try {
    const user = await service.deactivateUser(req.params.id);
    res.json(user);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
