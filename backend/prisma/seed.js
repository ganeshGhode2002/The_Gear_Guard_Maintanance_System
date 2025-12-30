import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
    // Teams
    const itTeam = await prisma.team.create({
        data: { name: "IT Support" },
    });

    const maintenanceTeam = await prisma.team.create({
        data: { name: "Maintenance" },
    });

    // Users
    const managerPassword = await bcrypt.hash("manager123", 10);
    const techPassword = await bcrypt.hash("tech123", 10);

    const manager = await prisma.user.create({
        data: {
            name: "Manager",
            email: "manager@test.com",
            password: managerPassword,
            role: "MANAGER",
        },
    });

    const technician = await prisma.user.create({
        data: {
            name: "Technician",
            email: "tech@test.com",
            password: techPassword,
            role: "TECHNICIAN",
            teamId: itTeam.id,
        },
    });

    // Equipment Categories
    await prisma.equipmentCategory.createMany({
        data: [
            { name: "Computers" },
            { name: "Machines" },
        ],
    });

    console.log("✅ Seed data created");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
