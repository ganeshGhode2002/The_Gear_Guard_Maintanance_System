"use client";

import UsersTable from "@/components/UsersTable";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function UsersPage() {
  return (
    <ProtectedRoute roles={["ADMIN", "MANAGER"]}>
      <UsersTable />
    </ProtectedRoute>
  );
}
