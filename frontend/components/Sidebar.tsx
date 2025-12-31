"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "@/context/authContext";

type Role = "ADMIN" | "MANAGER" | "TECHNICIAN" | "EMPLOYEE";

const MENU: Record<Role, { name: string; path: string }[]> = {
  ADMIN: [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Users", path: "/dashboard/users" },
    { name: "Equipment", path: "/dashboard/equipment" },
    { name: "Requests", path: "/dashboard/requests" },
  ],
  MANAGER: [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Equipment", path: "/dashboard/equipment" },
    { name: "Requests", path: "/dashboard/requests" },
  ],
  TECHNICIAN: [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Requests", path: "/dashboard/requests" },
  ],
  EMPLOYEE: [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Requests", path: "/dashboard/requests" },
  ],
};

export default function Sidebar() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <motion.aside
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="w-64 bg-white border-r p-4"
    >
      <h1 className="text-xl font-bold mb-6">GearGuard</h1>

      <nav className="space-y-2">
        {MENU[user.role].map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className="block rounded-lg px-4 py-2 text-sm font-medium hover:bg-slate-100 transition"
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </motion.aside>
  );
}
