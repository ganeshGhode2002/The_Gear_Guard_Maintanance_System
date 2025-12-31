import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const create = (data)=>prisma.equipment.create({ data });
export const list = ()=>prisma.equipment.findMany({ include:{ category:true, team:true }});
export const get = (id)=>prisma.equipment.findUnique({ where:{id}, include:{ category:true, team:true }});
export const update = (id,data)=>prisma.equipment.update({ where:{id}, data });
export const scrap = (id)=>prisma.equipment.update({ where:{id}, data:{ isScrapped:true }});
