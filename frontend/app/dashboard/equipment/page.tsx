"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import EquipmentGrid from "@/components/EquipmentGrid";

export default function EquipmentPage() {
  return (
    <ProtectedRoute>
      <EquipmentGrid />
    </ProtectedRoute>
  );
}
