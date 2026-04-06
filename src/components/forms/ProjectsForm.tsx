"use client";

import { Plus, Trash2 } from "lucide-react";
import type { ProjectItem } from "@/types/resume";
import { AIButton } from "@/components/builder/AIButton";

function newProject(): ProjectItem {
  return {
    id: crypto.randomUUID(),
    name: "",
    description: "",
    techStack: [],
    link: "",
    bullets: [""],
  };
}

export function ProjectsForm({
  items,
  onChange,
  targetJobRole,
  remainingCalls,
  onRefreshQuota,
}: {
  items: ProjectItem[];
  onChange: (next: ProjectItem[]) => void;
  targetJobRole: string;
  remainingCalls: number;
  onRefreshQuota: () => void;
}) {
  const update = (i: number, patch: Partial<ProjectItem>) => {
    const next = [...items];
    next[i] = { ...next[i], ...patch };
    onChange(next);
  };

  const updateBullet = (pi: number, bi: number, text: string) => {
    const pr = items[pi];
    const bullets = [...pr.bullets];
    bullets[bi] = text;
    update(pi, { bullets });
  };

  return (
    <div className="space-y-6">
      {items.map((pr, pi) => (
        <div
          key={pr.id}
          className="rounded-lg border border-slate-100 bg-slate-50/50 p-3"
        >
          <div className="mb-2 flex justify-end">
            <button
              type="button"
              className="text-slate-400 hover:text-red-600"
              aria-label="Remove project"
              onClick={() => onChange(items.filter((_, i) => i !== pi))}
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
          <div className="grid gap-2">
            <label className="block">
              <span className="mb-1 block text-xs font-medium text-slate-600">
                Project name
              </span>
              <input
                className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
                value={pr.name}
                onChange={(e) => update(pi, { name: e.target.value })}
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-medium text-slate-600">
                Description
              </span>
              <textarea
                className="min-h-[64px] w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
                value={pr.description}
                onChange={(e) => update(pi, { description: e.target.value })}
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-medium text-slate-600">
                Link
              </span>
              <input
                className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
                value={pr.link}
                onChange={(e) => update(pi, { link: e.target.value })}
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-medium text-slate-600">
                Tech stack (comma-separated)
              </span>
              <input
                className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
                value={pr.techStack.join(", ")}
                onChange={(e) =>
                  update(pi, {
                    techStack: e.target.value
                      .split(",")
                      .map((s) => s.trim())
                      .filter(Boolean),
                  })
                }
              />
            </label>
            <div className="space-y-2">
              <p className="text-xs font-medium text-slate-600">Highlights</p>
              {pr.bullets.map((b, bi) => (
                <div
                  key={bi}
                  className="flex flex-col gap-2 sm:flex-row sm:items-start"
                >
                  <textarea
                    className="min-h-[64px] flex-1 rounded-md border border-slate-200 px-3 py-2 text-sm"
                    value={b}
                    onChange={(e) => updateBullet(pi, bi, e.target.value)}
                  />
                  <AIButton
                    remainingCalls={remainingCalls}
                    onEnhance={async () => {
                      const r = await fetch("/api/generate-bullets", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          jobRole: targetJobRole,
                          context: `${pr.name}. ${b}`,
                          section: "project",
                        }),
                      });
                      const j = (await r.json()) as { bullets?: string[] };
                      if (j.bullets?.length) {
                        const bullets = [...pr.bullets];
                        bullets[bi] = j.bullets[0] ?? b;
                        update(pi, { bullets });
                      }
                      onRefreshQuota();
                    }}
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  update(pi, { bullets: [...pr.bullets, ""] })
                }
                className="text-xs font-medium text-indigo-600 hover:underline"
              >
                + Add bullet
              </button>
            </div>
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...items, newProject()])}
        className="inline-flex items-center gap-2 rounded-lg border border-dashed border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
      >
        <Plus className="h-4 w-4" />
        Add project
      </button>
    </div>
  );
}
