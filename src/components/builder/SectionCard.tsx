"use client";

import { useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function SectionCard({
  id,
  title,
  icon: Icon,
  defaultOpen = true,
  headerRight,
  children,
}: {
  id?: string;
  title: string;
  icon?: React.ComponentType<{ className?: string }>;
  defaultOpen?: boolean;
  headerRight?: ReactNode;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section
      id={id}
      className="rounded-lg border border-slate-200 bg-white shadow-sm"
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-2 px-4 py-3 text-left"
      >
        <span className="flex items-center gap-2 font-semibold text-slate-800">
          {Icon ? <Icon className="h-4 w-4 text-indigo-600" /> : null}
          {title}
        </span>
        <span className="flex items-center gap-2">
          {headerRight}
          <ChevronDown
            className={cn(
              "h-5 w-5 text-slate-400 transition",
              open && "rotate-180",
            )}
          />
        </span>
      </button>
      {open ? <div className="border-t border-slate-100 px-4 py-4">{children}</div> : null}
    </section>
  );
}
