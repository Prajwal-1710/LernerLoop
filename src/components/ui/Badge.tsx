"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "error" | "info";
  children?: React.ReactNode;
  className?: string;
}

export function Badge({
  children,
  className,
  variant = "default",
}: BadgeProps) {
  const variants = {
    default: "border-slate-200 text-slate-600 bg-slate-50",
    success: "border-emerald-100 text-emerald-700 bg-emerald-50",
    warning: "border-amber-100 text-amber-700 bg-amber-50",
    error: "border-rose-100 text-rose-700 bg-rose-50",
    info: "border-teal-100 text-teal-700 bg-teal-50",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
