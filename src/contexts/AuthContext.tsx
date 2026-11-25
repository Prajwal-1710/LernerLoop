"use client";

import * as React from "react";
import { createContext, useContext, useState, useCallback } from "react";

export type Role = "student" | "teacher" | "administrator";

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: Role;
  locale: string;
  is_active: boolean;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (user: AuthUser) => void;
  logout: () => void;
  setLocale: (locale: string) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  const login = React.useCallback((u: AuthUser) => {
    setUser(u);
    localStorage.setItem("learnloop_user", JSON.stringify(u));
  }, []);

  const logout = React.useCallback(() => {
    setUser(null);
    localStorage.removeItem("learnloop_user");
  }, []);

  const setLocale = React.useCallback((locale: string) => {
    if (user) {
      const updated = { ...user, locale };
      setUser(updated);
      localStorage.setItem("learnloop_user", JSON.stringify(updated));
    }
  }, [user]);

  React.useEffect(() => {
    const stored = localStorage.getItem("learnloop_user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem("learnloop_user");
      }
    }
    setIsLoading(false);
  }, []);

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    setLocale,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
