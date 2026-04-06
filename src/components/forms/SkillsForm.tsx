"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { AIButton } from "@/components/builder/AIButton";

export function SkillsForm({
  skills,
  onChange,
  targetJobRole,
  remainingCalls,
  onRefreshQuota,
}: {
  skills: string[];
  onChange: (next: string[]) => void;
  targetJobRole: string;
  remainingCalls: number;
  onRefreshQuota: () => void;
}) {
  const [draft, setDraft] = useState("");

  const add = (s: string) => {
    const t = s.trim();
    if (!t || skills.includes(t)) return;
    onChange([...skills, t]);
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {skills.map((s) => (
          <span
            key={s}
            className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-800"
          >
            {s}
            <button
              type="button"
              className="rounded p-0.5 hover:bg-indigo-100"
              aria-label={`Remove ${s}`}
              onClick={() => onChange(skills.filter((x) => x !== s))}
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
      </div>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <input
          className="flex-1 rounded-md border border-slate-200 px-3 py-2 text-sm"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              add(draft);
              setDraft("");
            }
          }}
          placeholder="Type a skill and press Enter"
        />
        <button
          type="button"
          className="rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-200"
          onClick={() => {
            add(draft);
            setDraft("");
          }}
        >
          Add
        </button>
        <AIButton
          label="Suggest skills"
          remainingCalls={remainingCalls}
          onEnhance={async () => {
            const r = await fetch("/api/suggest-skills", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                jobRole: targetJobRole,
                currentSkills: skills,
              }),
            });
            const j = (await r.json()) as { suggestions?: string[] };
            const sug = j.suggestions || [];
            onChange([...new Set([...skills, ...sug])]);
            onRefreshQuota();
          }}
        />
      </div>
    </div>
  );
}
