"use client";

import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type Role = "ADMIN" | "MANAGER" | "TECHNICIAN" | "EMPLOYEE";

interface Props {
  children: React.ReactNode;
  roles?: Role[]; // ✅ OPTIONAL
}

export default function ProtectedRoute({ children, roles }: Props) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.replace("/auth/login");
      } else if (roles && !roles.includes(user.role)) {
        router.replace("/dashboard");
      }
    }
  }, [user, loading, roles, router]);

  if (loading || !user) return null;

  return <>{children}</>;
}
