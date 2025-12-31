"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";

interface Equipment {
  id: string;
  name: string;
  serialNumber: string;
  category: { name: string };
  status: string;
}

export default function EquipmentGrid() {
  const [data, setData] = useState<Equipment[]>([]);

  useEffect(() => {
    api.get("/equipment").then(res => setData(res.data));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {data.map(eq => (
        <div
          key={eq.id}
          className="bg-white rounded-xl shadow p-5 hover:shadow-lg transition"
        >
          <h3 className="font-semibold text-lg">{eq.name}</h3>
          <p className="text-sm text-gray-500">{eq.serialNumber}</p>

          <div className="mt-3 flex justify-between text-sm">
            <span className="px-2 py-1 bg-gray-100 rounded">
              {eq.category?.name}
            </span>
            <span className="font-medium">{eq.status}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
