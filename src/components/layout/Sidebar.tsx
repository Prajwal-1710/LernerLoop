"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  GraduationCap,
  BookOpen,
  Activity,
  Users,
  Settings,
  ShieldAlert,
  LogOut,
  Menu,
  ChevronLeft,
} from "lucide-react";
import { useTranslation, t, LOCALES } from "@/lib/i18n";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

interface NavItem {
  href: string;
  labelKey: string;
  namespace: string;
  icon: React.ElementType;
  roles: ("student" | "teacher" | "administrator")[];
}

const NAV_ITEMS: Record<string, NavItem[]> = {
  student: [
    {
      href: "/dashboard/student",
      labelKey: "dashboard",
      namespace: "nav",
      icon: LayoutDashboard,
      roles: ["student"],
    },
    {
      href: "/subjects",
      labelKey: "subjects",
      namespace: "nav",
      icon: BookOpen,
      roles: ["student"],
    },
    {
      href: "/progress",
      labelKey: "progress",
      namespace: "nav",
      icon: Activity,
      roles: ["student"],
    },
    {
      href: "/learning-dna",
      labelKey: "learning_dna",
      namespace: "nav",
      icon: ShieldAlert,
      roles: ["student"],
    },
  ],
  teacher: [
    {
      href: "/dashboard/teacher",
      labelKey: "dashboard",
      namespace: "nav",
      icon: LayoutDashboard,
      roles: ["teacher"],
    },
    {
      href: "/classes",
      labelKey: "class_overview",
      namespace: "nav",
      icon: Users,
      roles: ["teacher"],
    },
    {
      href: "/assignments",
      labelKey: "assignments",
      namespace: "nav",
      icon: BookOpen,
      roles: ["teacher"],
    },
    {
      href: "/copilot",
      labelKey: "copilot",
      namespace: "nav",
      icon: ShieldAlert,
      roles: ["teacher"],
    },
    {
      href: "/sync-status",
      labelKey: "sync_status",
      namespace: "nav",
      icon: Activity,
      roles: ["teacher"],
    },
  ],
  administrator: [
    {
      href: "/dashboard/admin",
      labelKey: "dashboard",
      namespace: "nav",
      icon: LayoutDashboard,
      roles: ["administrator"],
    },
    {
      href: "/users",
      labelKey: "users",
      namespace: "nav",
      icon: Users,
      roles: ["administrator"],
    },
    {
      href: "/content",
      labelKey: "content",
      namespace: "nav",
      icon: BookOpen,
      roles: ["administrator"],
    },
    {
      href: "/system",
      labelKey: "system",
      namespace: "nav",
      icon: Settings,
      roles: ["administrator"],
    },
  ],
};

interface SidebarProps {
  role: string;
  user: { name: string; email: string; locale: string };
  onLogout: () => void;
  onLocaleChange: (locale: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({
  role,
  user,
  onLogout,
  onLocaleChange,
  isOpen,
  onClose,
}: SidebarProps) {
  const { t, locale } = useTranslation(user.locale as any);
  const pathname = usePathname();
  const items = NAV_ITEMS[role as keyof typeof NAV_ITEMS] || [];

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300",
        isOpen ? "translate-x-0" : "-translate-x-full",
        "lg:relative lg:translate-x-0 lg:w-64 lg:shadow-none lg:border-r-0"
      )}
      aria-label="Main navigation"
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between h-16 px-6 border-b border-slate-200">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-teal-600 flex items-center justify-center text-white font-bold">
              LL
            </div>
            <span className="font-bold text-navy-900 hidden sm:block">
              LearnLoop
            </span>
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden p-2 text-slate-500 hover:text-slate-700"
            aria-label="Close menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 space-y-2">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-teal-50 text-teal-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <Icon className="w-5 h-5" />
                {t(item.namespace as any, item.labelKey)}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-200">
          <div className="mb-4">
            <label className="block text-xs font-medium text-slate-500 mb-2">
              {t("common", "language")}
            </label>
            <select
              value={locale}
              onChange={(e) => onLocaleChange(e.target.value)}
              className="w-full rounded-md border border-slate-200 bg-white px-2 py-1.5 text-sm text-slate-900 focus:border-teal-600 focus:outline-none"
            >
              {LOCALES.map((l) => (
                <option key={l} value={l}>
                  {l === "en" ? t("common", "english") : l === "kn" ? t("common", "kannada") : t("common", "hindi")}
                </option>
              ))}
            </select>
          </div>
          <div className="p-3 rounded-lg border border-slate-200 bg-slate-50">
            <p className="text-xs font-medium text-navy-900">{user.name}</p>
            <p className="text-xs text-slate-500">{user.email}</p>
            <Badge variant="default">{role.charAt(0).toUpperCase() + role.slice(1)}</Badge>
          </div>
          <Button
            variant="ghost"
            onClick={onLogout}
            className="w-full mt-4"
          >
            {t("common", "sign_out")}
          </Button>
        </div>
      </div>
    </aside>
  );
}

function cn(...inputs: (string | undefined | null | false)[]): string {
  return inputs.filter(Boolean).join(" ");
}
