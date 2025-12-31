import * as service from "./team.service.js";

export const create = async (req, res) =>
  res.status(201).json(await service.createTeam(req.body));

export const list = async (req, res) =>
  res.json(await service.getTeams());

export const getOne = async (req, res) =>
  res.json(await service.getTeamById(req.params.id));

export const update = async (req, res) =>
  res.json(await service.updateTeam(req.params.id, req.body));

export const remove = async (req, res) =>
  res.json(await service.deleteTeam(req.params.id));
