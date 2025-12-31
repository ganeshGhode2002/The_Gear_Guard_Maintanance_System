"use client";

import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <header className="w-full h-14 bg-white border-b flex items-center justify-between px-6">
      {/* Left */}
      <div
        className="font-bold text-lg cursor-pointer"
        onClick={() => router.push("/dashboard")}
      >
        GearGuard
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        {user && (
          <div className="text-sm text-gray-600">
            {user.name} • <span className="font-medium">{user.role}</span>
          </div>
        )}

        <button
          onClick={logout}
          className="px-4 py-1.5 text-sm rounded-md bg-black text-white hover:bg-gray-800 transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
