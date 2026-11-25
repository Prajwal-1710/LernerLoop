"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

interface MobileMenuButtonProps {
  onOpen: () => void;
}

export function MobileMenuButton({ onOpen }: MobileMenuButtonProps) {
  return (
    <button
      onClick={onOpen}
      className="lg:hidden p-2 text-slate-500 hover:text-slate-700"
      aria-label="Open menu"
    >
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
  );
}

interface TopNavProps {
  user: { name: string; role: string };
  onLogout: () => void;
}

export function TopNav({ user, onLogout }: TopNavProps) {
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b border-slate-200 bg-white/95 backdrop-blur px-4 lg:px-6">
      <MobileMenuButton onOpen={() => {}} />
      <Link href="/" className="flex items-center gap-2">
        <div className="w-8 h-8 rounded bg-teal-600 flex items-center justify-center text-white font-bold">
          LL
        </div>
        <span className="font-bold text-navy-900 hidden sm:block">LearnLoop Intelligence</span>
      </Link>
      <div className="ml-auto flex items-center gap-3">
        <Badge variant="default">{user.role}</Badge>
        <Button variant="ghost" onClick={onLogout} className="hidden sm:block">
          {t("common", "sign_out")}
        </Button>
      </div>
    </header>
  );
}
