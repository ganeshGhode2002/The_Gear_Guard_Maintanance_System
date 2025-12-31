import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const create = (data) => prisma.equipmentCategory.create({ data });
export const list = () => prisma.equipmentCategory.findMany();
export const get = (id) => prisma.equipmentCategory.findUnique({ where:{id} });
export const update = (id,data)=>prisma.equipmentCategory.update({where:{id},data});
export const remove = (id)=>prisma.equipmentCategory.delete({where:{id}});
