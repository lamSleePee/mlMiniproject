"use client";

import { Plus, Trash2 } from "lucide-react";
import type { ExperienceItem } from "@/types/resume";
import { AIButton } from "@/components/builder/AIButton";

function newExp(): ExperienceItem {
  return {
    id: crypto.randomUUID(),
    company: "",
    title: "",
    startDate: "",
    endDate: "",
    current: false,
    bullets: [""],
  };
}

export function ExperienceForm({
  items,
  onChange,
  targetJobRole,
  remainingCalls,
  onRefreshQuota,
}: {
  items: ExperienceItem[];
  onChange: (next: ExperienceItem[]) => void;
  targetJobRole: string;
  remainingCalls: number;
  onRefreshQuota: () => void;
}) {
  const update = (i: number, patch: Partial<ExperienceItem>) => {
    const next = [...items];
    next[i] = { ...next[i], ...patch };
    onChange(next);
  };

  const updateBullet = (ei: number, bi: number, text: string) => {
    const ex = items[ei];
    const bullets = [...ex.bullets];
    bullets[bi] = text;
    update(ei, { bullets });
  };

  const addBullet = (ei: number) => {
    const ex = items[ei];
    update(ei, { bullets: [...ex.bullets, ""] });
  };

  return (
    <div className="space-y-6">
      {items.map((ex, ei) => (
        <div
          key={ex.id}
          className="rounded-lg border border-slate-100 bg-slate-50/50 p-3"
        >
          <div className="mb-2 flex justify-end">
            <button
              type="button"
              className="text-slate-400 hover:text-red-600"
              aria-label="Remove role"
              onClick={() => onChange(items.filter((_, i) => i !== ei))}
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            <label className="block sm:col-span-2">
              <span className="mb-1 block text-xs font-medium text-slate-600">
                Job title
              </span>
              <input
                className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
                value={ex.title}
                onChange={(e) => update(ei, { title: e.target.value })}
              />
            </label>
            <label className="block sm:col-span-2">
              <span className="mb-1 block text-xs font-medium text-slate-600">
                Company
              </span>
              <input
                className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
                value={ex.company}
                onChange={(e) => update(ei, { company: e.target.value })}
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-medium text-slate-600">
                Start
              </span>
              <input
                className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
                value={ex.startDate}
                onChange={(e) => update(ei, { startDate: e.target.value })}
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-medium text-slate-600">
                End
              </span>
              <input
                disabled={ex.current}
                className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm disabled:bg-slate-100"
                value={ex.endDate}
                onChange={(e) => update(ei, { endDate: e.target.value })}
              />
            </label>
            <label className="flex items-center gap-2 sm:col-span-2">
              <input
                type="checkbox"
                checked={ex.current}
                onChange={(e) =>
                  update(ei, { current: e.target.checked, endDate: "" })
                }
              />
              <span className="text-sm text-slate-700">I currently work here</span>
            </label>
          </div>
          <div className="mt-3 space-y-2">
            <p className="text-xs font-medium text-slate-600">Achievements</p>
            {ex.bullets.map((b, bi) => (
              <div key={bi} className="flex flex-col gap-2 sm:flex-row sm:items-start">
                <textarea
                  className="min-h-[72px] flex-1 rounded-md border border-slate-200 px-3 py-2 text-sm"
                  value={b}
                  onChange={(e) => updateBullet(ei, bi, e.target.value)}
                  placeholder="STAR bullet: context → action → result"
                />
                <AIButton
                  remainingCalls={remainingCalls}
                  onEnhance={async () => {
                    const r = await fetch("/api/generate-bullets", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        jobRole: targetJobRole,
                        context: `${ex.title} at ${ex.company}. ${b}`,
                        section: "experience",
                      }),
                    });
                    const j = (await r.json()) as { bullets?: string[] };
                    if (j.bullets?.length) {
                      const bullets = [...ex.bullets];
                      bullets[bi] = j.bullets[0] ?? b;
                      update(ei, { bullets });
                    }
                    onRefreshQuota();
                  }}
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => addBullet(ei)}
              className="text-xs font-medium text-indigo-600 hover:underline"
            >
              + Add bullet
            </button>
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...items, newExp()])}
        className="inline-flex items-center gap-2 rounded-lg border border-dashed border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
      >
        <Plus className="h-4 w-4" />
        Add position
      </button>
    </div>
  );
}
