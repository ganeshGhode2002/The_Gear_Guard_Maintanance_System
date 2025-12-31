"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";

export default function StatsCards() {
  const [stats, setStats] = useState({
    users: 0,
    equipment: 0,
    requests: 0,
    pending: 0,
  });

  useEffect(() => {
    api.get("/dashboard/stats").then(res => setStats(res.data));
  }, []);

  const CARD = [
    { label: "Users", value: stats.users },
    { label: "Equipment", value: stats.equipment },
    { label: "Requests", value: stats.requests },
    { label: "Pending", value: stats.pending },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {CARD.map(c => (
        <div
          key={c.label}
          className="bg-white rounded-xl shadow p-6 hover:scale-[1.02] transition"
        >
          <p className="text-sm text-gray-500">{c.label}</p>
          <h2 className="text-3xl font-bold">{c.value}</h2>
        </div>
      ))}
    </div>
  );
}
