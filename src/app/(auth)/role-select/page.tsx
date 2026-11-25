"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RoleRedirect() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      if (user.role === "student") router.replace("/dashboard/student");
      else if (user.role === "teacher") router.replace("/dashboard/teacher");
      else router.replace("/dashboard/admin");
    }
  }, [user, isLoading, router]);

  return null;
}
