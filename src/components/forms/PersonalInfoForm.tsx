"use client";

import type { PersonalInfo } from "@/types/resume";

export function PersonalInfoForm({
  value,
  onChange,
}: {
  value: PersonalInfo;
  onChange: (next: PersonalInfo) => void;
}) {
  const field = (k: keyof PersonalInfo, label: string, ph?: string) => (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-slate-600">
        {label}
      </span>
      <input
        className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none ring-indigo-500 focus:ring-2"
        value={value[k]}
        onChange={(e) => onChange({ ...value, [k]: e.target.value })}
        placeholder={ph}
      />
    </label>
  );

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {field("fullName", "Full name", "Jane Doe")}
      {field("email", "Email", "jane@email.com")}
      {field("phone", "Phone", "(555) 000-0000")}
      {field("location", "Location", "City, ST")}
      {field("linkedin", "LinkedIn", "linkedin.com/in/...")}
      {field("github", "GitHub", "github.com/...")}
      {field("website", "Website", "https://")}
    </div>
  );
}
