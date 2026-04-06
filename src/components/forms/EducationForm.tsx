"use client";

import { Plus, Trash2 } from "lucide-react";
import type { EducationItem } from "@/types/resume";

function newEd(): EducationItem {
  return {
    id: crypto.randomUUID(),
    institution: "",
    degree: "",
    field: "",
    startDate: "",
    endDate: "",
    gpa: "",
  };
}

export function EducationForm({
  items,
  onChange,
}: {
  items: EducationItem[];
  onChange: (next: EducationItem[]) => void;
}) {
  const update = (i: number, patch: Partial<EducationItem>) => {
    const next = [...items];
    next[i] = { ...next[i], ...patch };
    onChange(next);
  };

  return (
    <div className="space-y-4">
      {items.map((ed, i) => (
        <div
          key={ed.id}
          className="rounded-lg border border-slate-100 bg-slate-50/50 p-3"
        >
          <div className="mb-2 flex justify-end">
            <button
              type="button"
              className="text-slate-400 hover:text-red-600"
              aria-label="Remove education"
              onClick={() => onChange(items.filter((_, j) => j !== i))}
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            <label className="block sm:col-span-2">
              <span className="mb-1 block text-xs font-medium text-slate-600">
                School
              </span>
              <input
                className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
                value={ed.institution}
                onChange={(e) => update(i, { institution: e.target.value })}
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-medium text-slate-600">
                Degree
              </span>
              <input
                className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
                value={ed.degree}
                onChange={(e) => update(i, { degree: e.target.value })}
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-medium text-slate-600">
                Field
              </span>
              <input
                className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
                value={ed.field}
                onChange={(e) => update(i, { field: e.target.value })}
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-medium text-slate-600">
                Start
              </span>
              <input
                className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
                value={ed.startDate}
                onChange={(e) => update(i, { startDate: e.target.value })}
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-medium text-slate-600">
                End
              </span>
              <input
                className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
                value={ed.endDate}
                onChange={(e) => update(i, { endDate: e.target.value })}
              />
            </label>
            <label className="block sm:col-span-2">
              <span className="mb-1 block text-xs font-medium text-slate-600">
                GPA (optional)
              </span>
              <input
                className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
                value={ed.gpa}
                onChange={(e) => update(i, { gpa: e.target.value })}
              />
            </label>
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...items, newEd()])}
        className="inline-flex items-center gap-2 rounded-lg border border-dashed border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
      >
        <Plus className="h-4 w-4" />
        Add education
      </button>
    </div>
  );
}
