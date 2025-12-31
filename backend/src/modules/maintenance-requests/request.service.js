import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const create = async (data,userId)=>{
  const eq = await prisma.equipment.findUnique({ where:{id:data.equipmentId} });
  if(!eq) throw new Error("Equipment not found");

  return prisma.maintenanceRequest.create({
    data:{
      subject:data.subject,
      type:data.type,
      status:"NEW",
      equipmentId:eq.id,
      teamId:eq.teamId,
      scheduledDate:data.scheduledDate,
      createdById:userId
    }
  });
};

export const list = ()=>prisma.maintenanceRequest.findMany({
  include:{ equipment:true, team:true, technician:true }
});

export const assign = (id,technicianId)=>prisma.maintenanceRequest.update({
  where:{id},
  data:{ technicianId, status:"IN_PROGRESS" }
});

export const complete = (id,duration)=>prisma.maintenanceRequest.update({
  where:{id},
  data:{ durationHours:duration, status:"REPAIRED" }
});

export const updateStatus = (id,status)=>prisma.maintenanceRequest.update({
  where:{id},
  data:{ status }
});
