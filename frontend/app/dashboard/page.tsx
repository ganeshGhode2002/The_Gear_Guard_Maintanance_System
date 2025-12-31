"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import StatCard from "@/components/StatCard";
import { toast } from "sonner";
import api from "@/lib/axios";

interface Stats {
  equipment: number;
  open: number;
  inProgress: number;
  completed: number;
}

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState<Stats>({
    equipment: 0,
    open: 0,
    inProgress: 0,
    completed: 0,
  });

  useEffect(() => {
    if (!loading && !user) {
      toast.error("Please login first");
      router.push("/auth/login");
    }
  }, [loading, user, router]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [equipmentRes, requestsRes] = await Promise.all([
          api.get("/equipment"),
          api.get("/requests"),
        ]);

        const requests = requestsRes.data;

        setStats({
          equipment: equipmentRes.data.length,
          open: requests.filter((r: any) => r.status === "NEW").length,
          inProgress: requests.filter((r: any) => r.status === "IN_PROGRESS").length,
          completed: requests.filter((r: any) => r.status === "REPAIRED").length,
        });
      } catch {
        toast.error("Failed to load dashboard data");
      }
    };

    if (user) fetchStats();
  }, [user]);

  if (loading || !user) return null;

  return (
    <div className="p-6">
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-6"
      >
        Welcome, {user.name}
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Equipment" value={stats.equipment} />
        <StatCard title="Open Requests" value={stats.open} color="text-red-500" />
        <StatCard title="In Progress" value={stats.inProgress} color="text-yellow-500" />
        <StatCard title="Completed" value={stats.completed} color="text-green-500" />
      </div>
    </div>
  );
}
