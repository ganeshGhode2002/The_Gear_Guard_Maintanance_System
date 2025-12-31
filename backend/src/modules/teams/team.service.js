import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createTeam = (data) =>
  prisma.team.create({ data });

export const getTeams = () =>
  prisma.team.findMany({
    include: { members: true },
  });

export const getTeamById = (id) =>
  prisma.team.findUnique({
    where: { id },
    include: { members: true },
  });

export const updateTeam = (id, data) =>
  prisma.team.update({
    where: { id },
    data,
  });

export const deleteTeam = (id) =>
  prisma.team.delete({
    where: { id },
  });
