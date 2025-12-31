"use client";

import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RequireRole({
  allowed,
  children,
}: {
  allowed: string[];
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && !allowed.includes(user.role)) {
      router.replace("/dashboard");
    }
  }, [user]);

  if (!user || !allowed.includes(user.role)) return null;

  return <>{children}</>;
}
