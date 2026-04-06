"use client";

import Link from "next/link";
import { FileText } from "lucide-react";
import { useResumeStore } from "@/hooks/useResumeStore";

export function TopNavbar() {
  const title = useResumeStore((s) => s.title);
  const setTitle = useResumeStore((s) => s.setTitle);
  const lastSavedAt = useResumeStore((s) => s.lastSavedAt);

  const savedLabel = lastSavedAt
    ? `Saved ${new Date(lastSavedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
    : "Not saved yet";

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-[1600px] items-center gap-3 px-3 sm:px-4">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 font-semibold text-slate-900"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
            <FileText className="h-4 w-4" />
          </span>
          <span className="hidden sm:inline">Joblit</span>
        </Link>
        <div className="min-w-0 flex-1 text-center">
          <input
            className="w-full max-w-md border-b border-transparent bg-transparent text-center text-sm font-medium text-slate-800 outline-none focus:border-indigo-300"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            aria-label="Resume title"
          />
        </div>
        <div className="flex shrink-0 items-center gap-2 text-xs text-slate-500">
          <span className="hidden rounded-full bg-emerald-50 px-2 py-1 font-medium text-emerald-800 sm:inline">
            {savedLabel}
          </span>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-xs font-bold text-slate-600">
            U
          </span>
        </div>
      </div>
    </header>
  );
}
