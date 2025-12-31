import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const createUser = async (data) => {
  const { name, email, password, role } = data;

  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) throw new Error("Email already in use");

  const hashed = await bcrypt.hash(password, 10);

  return prisma.user.create({
    data: {
      name,
      email,
      password: hashed,
      role,
      isActive: true,
    },
    select: { id: true, name: true, email: true, role: true, isActive: true },
  });
};

export const getUsers = async ({ role }) => {
  return prisma.user.findMany({
    where: {
      isActive: true,
      ...(role ? { role } : {}),
    },
    select: { id: true, name: true, email: true, role: true, isActive: true },
  });
};

export const getUserById = async (id) => {
  const user = await prisma.user.findFirst({
    where: { id, isActive: true },
    select: { id: true, name: true, email: true, role: true, isActive: true },
  });
  if (!user) throw new Error("User not found");
  return user;
};

export const updateUser = async (id, data) => {
  return prisma.user.update({
    where: { id },
    data,
    select: { id: true, name: true, email: true, role: true, isActive: true },
  });
};

export const deactivateUser = async (id) => {
  return prisma.user.update({
    where: { id },
    data: { isActive: false },
    select: { id: true, isActive: true },
  });
};
