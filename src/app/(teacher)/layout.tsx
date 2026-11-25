"use client";

import * as React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { MainLayout } from "@/components/layout/MainLayout";

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  if (!user) return null;

  return (
    <MainLayout
      role={user.role}
      user={{ name: user.name, email: user.email, locale: user.locale, role: user.role }}
      onLogout={logout}
      onLocaleChange={() => {}}
    >
      {children}
    </MainLayout>
  );
}
