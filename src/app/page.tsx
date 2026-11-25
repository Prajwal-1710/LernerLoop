"use client";

import * as React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { t, LOCALES, DEFAULT_LOCALE } from "@/lib/i18n";
import { Button } from "@/components/ui/Button";
import { Card, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import Link from "next/link";

const DEMO_ACCOUNTS = [
  {
    id: "stu-1",
    email: "ananya@example.in",
    name: "Ananya",
    role: "student" as const,
    locale: "kn" as const,
    grade: "8",
  },
  {
    id: "tea-1",
    email: "ramesh@example.in",
    name: "Ramesh Teacher",
    role: "teacher" as const,
    locale: "en" as const,
  },
  {
    id: "adm-1",
    email: "admin@example.in",
    name: "School Admin",
    role: "administrator" as const,
    locale: "en" as const,
  },
];

export default function LoginPage() {
  const { login, isLoading } = useAuth();
  const [email, setEmail] = React.useState("");
  const [locale, setLocale] = React.useState(DEFAULT_LOCALE);
  const [error, setError] = React.useState("");
  const [selectedRole, setSelectedRole] = React.useState<"student" | "teacher" | "administrator">("student");

  const { t: tt } = React.useMemo(() => {
    const { t } = require("@/lib/i18n");
    return { t: (ns: string, key: string) => t(ns as any, key) };
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const account = DEMO_ACCOUNTS.find((a) => a.email === email && a.role === selectedRole);
    if (account) {
      login({ id: account.id, email: account.email, name: account.name, role: account.role, locale: account.locale, is_active: true });
    } else {
      setError("Invalid credentials for this role. Try a demo account.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <Card className="w-full max-w-md">
        <CardTitle className="text-2xl text-center">{t("auth", "welcome")}</CardTitle>
        <p className="text-sm text-slate-600 text-center mb-6">{t("auth", "welcome_sub")}</p>

        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            label={t("auth", "email")}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ananya@example.in"
            required
          />
          <label className="block text-sm font-medium text-slate-700 mb-2">
            {t("auth", "role_select")}
          </label>
          <div className="grid grid-cols-3 gap-2">
            {["student", "teacher", "administrator"].map((role) => (
              <Button
                key={role}
                type="button"
                variant={selectedRole === role ? "primary" : "outline"}
                onClick={() => setSelectedRole(role as "student" | "teacher" | "administrator")}
                disabled={isLoading}
              >
                {t("auth", role)}
              </Button>
            ))}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-2">{t("common", "language")}</label>
            <select
              value={locale}
              onChange={(e) => setLocale(e.target.value as "en" | "kn" | "hi")}
              className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
            >
              {LOCALES.map((l) => (
                <option key={l} value={l}>
                  {l === "en" ? t("common", "english") : l === "kn" ? t("common", "kannada") : t("common", "hindi")}
                </option>
              ))}
            </select>
          </div>
          <Button type="submit" variant="primary" className="w-full" disabled={isLoading}>
            {t("auth", "sign_in")}
          </Button>
        </form>

        {error && <p className="text-sm text-rose-600 text-center">{error}</p>}

        <div className="mt-6 border-t border-slate-200 pt-4">
          <p className="text-xs text-slate-500 text-center mb-3">{t("auth", "demo_accounts")}</p>
          <div className="space-y-1 text-xs">
            {DEMO_ACCOUNTS.map((a) => (
              <div key={a.id} className="flex justify-between p-2 bg-slate-50 rounded">
                <span className="font-medium">{a.name}</span>
                <span className="text-slate-500">{a.email}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-6 text-xs text-center text-slate-500">
          {t("auth", "no_account")}
        </p>
      </Card>
    </div>
  );
}
