import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const create = async (payload, userId) => {
  if (!payload || !payload.equipmentId) {
    throw new Error("equipmentId is required");
  }

  const equipment = await prisma.equipment.findUnique({
    where: { id: payload.equipmentId },
  });

  if (!equipment) throw new Error("Equipment not found");

  return prisma.maintenanceRequest.create({
    data: {
      subject: payload.subject,
      type: payload.type,
      status: "NEW",
      equipmentId: equipment.id,
      teamId: equipment.teamId,
      scheduledDate: payload.scheduledDate || null,
      createdById: userId,
    },
  });
};

export const list = ()=>prisma.maintenanceRequest.findMany({
  include:{ equipment:true, team:true, technician:true }
});

export const assign = async (id, technicianId) => {
  const technician = await prisma.user.findUnique({
    where: { id: technicianId },
    include: { team: true },
  });

  if (!technician || technician.role !== "TECHNICIAN") {
    throw new Error("Invalid technician");
  }

  const request = await prisma.maintenanceRequest.findUnique({
    where: { id },
  });

  if (technician.teamId !== request.teamId) {
    throw new Error("Technician does not belong to this team");
  }

  return prisma.maintenanceRequest.update({
    where: { id },
    data: {
      technicianId,
      status: "IN_PROGRESS",
    },
  });
};

export const complete = (id,duration)=>prisma.maintenanceRequest.update({
  where:{id},
  data:{ durationHours:duration, status:"REPAIRED" }
});

export const updateStatus = (id,status)=>prisma.maintenanceRequest.update({
  where:{id},
  data:{ status }
});
