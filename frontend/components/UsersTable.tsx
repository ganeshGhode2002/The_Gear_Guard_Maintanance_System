"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { toast } from "sonner";

type Role = "ADMIN" | "MANAGER" | "TECHNICIAN" | "EMPLOYEE";

interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  isActive: boolean;
}

export default function UsersTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/users")
      .then(res => setUsers(res.data))
      .catch(() => toast.error("Failed to load users"))
      .finally(() => setLoading(false));
  }, []);

  const deactivate = async (id: string) => {
    await api.delete(`/users/${id}`);
    setUsers(prev => prev.map(u => u.id === id ? { ...u, isActive: false } : u));
    toast.success("User deactivated");
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Users</h2>

      <table className="w-full text-sm">
        <thead className="text-left text-gray-500">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th />
          </tr>
        </thead>

        <tbody>
          {users.map(u => (
            <tr key={u.id} className="border-t">
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                <span className={u.isActive ? "text-green-600" : "text-red-500"}>
                  {u.isActive ? "Active" : "Inactive"}
                </span>
              </td>
              <td>
                {u.isActive && (
                  <button
                    onClick={() => deactivate(u.id)}
                    className="text-red-600 hover:underline"
                  >
                    Deactivate
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
