"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import KanbanBoard from "@/components/KanbanBoard";

export default function RequestsPage() {
  return (
    <ProtectedRoute>
      <KanbanBoard />
    </ProtectedRoute>
  );
}
