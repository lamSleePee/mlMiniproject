"use client";

import { Check } from "lucide-react";
import type { BuilderStep } from "@/hooks/useResumeStore";
import { useResumeStore } from "@/hooks/useResumeStore";
import type { ResumeData } from "@/types/resume";
import { cn } from "@/lib/utils";

const STEPS: { id: BuilderStep; label: string; anchor: string }[] = [
  { id: "personal", label: "Personal", anchor: "step-personal" },
  { id: "experience", label: "Experience", anchor: "step-experience" },
  { id: "education", label: "Education", anchor: "step-education" },
  { id: "skills", label: "Skills", anchor: "step-skills" },
  { id: "projects", label: "Projects", anchor: "step-projects" },
  { id: "finish", label: "Finish", anchor: "step-finish" },
];

function stepComplete(step: BuilderStep, data: ResumeData): boolean {
  switch (step) {
    case "personal":
      return !!(data.personalInfo.fullName && data.personalInfo.email);
    case "experience":
      return data.experience.some((e) => e.company && e.title);
    case "education":
      return data.education.some((e) => e.institution);
    case "skills":
      return data.skills.length > 0;
    case "projects":
      return data.projects.some((p) => p.name);
    case "finish":
      return true;
    default:
      return false;
  }
}

export function Sidebar({
  resumeScore,
  remainingCalls,
}: {
  resumeScore: number;
  remainingCalls: number;
}) {
  const activeStep = useResumeStore((s) => s.activeStep);
  const setActiveStep = useResumeStore((s) => s.setActiveStep);
  const resumeData = useResumeStore((s) => s.resumeData);

  const go = (anchor: string, step: BuilderStep) => {
    setActiveStep(step);
    const el = document.getElementById(anchor);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <aside className="hidden w-[240px] shrink-0 flex-col border-r border-white/10 bg-[#1a1a2e] text-white lg:flex">
      <div className="p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-white/50">
          Progress
        </p>
        <nav className="mt-4 space-y-1">
          {STEPS.map((s) => {
            const done = stepComplete(s.id, resumeData);
            const active = activeStep === s.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => go(s.anchor, s.id)}
                className={cn(
                  "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition",
                  active ? "bg-[#4f46e5] text-white" : "hover:bg-white/10",
                )}
              >
                <span
                  className={cn(
                    "flex h-6 w-6 items-center justify-center rounded-full border text-xs",
                    done
                      ? "border-emerald-400 bg-emerald-500/20 text-emerald-300"
                      : "border-white/20 text-white/60",
                  )}
                >
                  {done ? <Check className="h-3.5 w-3.5" /> : ""}
                </span>
                {s.label}
              </button>
            );
          })}
        </nav>
      </div>
      <div className="mt-auto space-y-3 p-4">
        <div className="rounded-xl bg-white/5 p-3">
          <p className="text-xs text-white/60">Resume strength</p>
          <p className="text-2xl font-bold text-white">{resumeScore}%</p>
        </div>
        <div className="rounded-xl bg-white/5 p-3">
          <p className="text-xs text-white/60">AI generations</p>
          <p className="text-sm font-semibold text-emerald-300">
            {remainingCalls} left
          </p>
        </div>
      </div>
    </aside>
  );
}
