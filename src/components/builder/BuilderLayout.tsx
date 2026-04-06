"use client";

import { useMemo } from "react";
import {
  Briefcase,
  GraduationCap,
  Home,
  Layers,
  LayoutGrid,
  Wrench,
} from "lucide-react";
import { TopNavbar } from "@/components/layout/TopNavbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { FormPanel } from "@/components/builder/FormPanel";
import { PreviewPanel } from "@/components/builder/PreviewPanel";
import { useResumeStore, type BuilderStep } from "@/hooks/useResumeStore";
import { useQuota } from "@/hooks/useQuota";
import { useAutoSave } from "@/hooks/useAutoSave";
import type { ResumeData } from "@/types/resume";
import { cn } from "@/lib/utils";

function computeResumeScore(data: ResumeData): number {
  let pts = 0;
  if (data.personalInfo.fullName && data.personalInfo.email) pts += 15;
  if (data.summary.length > 40) pts += 15;
  if (data.experience.some((e) => e.bullets.some((b) => b.length > 20)))
    pts += 20;
  if (data.education.length) pts += 15;
  if (data.skills.length >= 3) pts += 15;
  if (data.projects.length) pts += 10;
  if (data.experience.length) pts += 10;
  return Math.min(100, pts);
}

const MOBILE_TABS: {
  step: BuilderStep;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { step: "personal", icon: Home },
  { step: "experience", icon: Briefcase },
  { step: "education", icon: GraduationCap },
  { step: "skills", icon: Wrench },
  { step: "projects", icon: Layers },
  { step: "finish", icon: LayoutGrid },
];

export function BuilderLayout() {
  useAutoSave();
  const { remainingCalls, refresh } = useQuota();

  const resumeData = useResumeStore((s) => s.resumeData);
  const template = useResumeStore((s) => s.template);
  const setTemplate = useResumeStore((s) => s.setTemplate);
  const jobDescription = useResumeStore((s) => s.jobDescription);
  const atsResult = useResumeStore((s) => s.atsResult);
  const setAtsResult = useResumeStore((s) => s.setAtsResult);
  const activeStep = useResumeStore((s) => s.activeStep);
  const setActiveStep = useResumeStore((s) => s.setActiveStep);

  const score = useMemo(() => computeResumeScore(resumeData), [resumeData]);

  const scrollToStep = (step: BuilderStep) => {
    const map: Record<BuilderStep, string> = {
      personal: "step-personal",
      experience: "step-experience",
      education: "step-education",
      skills: "step-skills",
      projects: "step-projects",
      finish: "step-finish",
    };
    setActiveStep(step);
    document.getElementById(map[step])?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#f8f8f8]">
      <TopNavbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar resumeScore={score} remainingCalls={remainingCalls} />
        <main className="min-w-0 flex-1 overflow-y-auto px-3 py-4 sm:px-6">
          <FormPanel
            remainingCalls={remainingCalls}
            onRefreshQuota={refresh}
          />
        </main>
        <aside className="hidden w-[420px] shrink-0 overflow-y-auto border-l border-slate-200 bg-[#f8f8f8] p-4 xl:block">
          <div className="sticky top-0 space-y-4">
            <PreviewPanel
              data={resumeData}
              template={template}
              onTemplateChange={setTemplate}
              jobDescription={jobDescription}
              atsResult={atsResult}
              onAtsResult={setAtsResult}
            />
          </div>
        </aside>
      </div>

      {/* Mobile: stacked preview + bottom tabs */}
      <div className="border-t border-slate-200 bg-white p-4 xl:hidden">
        <PreviewPanel
          data={resumeData}
          template={template}
          onTemplateChange={setTemplate}
          jobDescription={jobDescription}
          atsResult={atsResult}
          onAtsResult={setAtsResult}
        />
      </div>
      <nav className="fixed bottom-0 left-0 right-0 z-30 flex border-t border-slate-200 bg-[#1a1a2e] px-1 py-2 lg:hidden">
        {MOBILE_TABS.map(({ step, icon: Icon }) => (
          <button
            key={step}
            type="button"
            onClick={() => scrollToStep(step)}
            className={cn(
              "flex flex-1 flex-col items-center gap-0.5 py-1 text-[10px] text-white/70",
              activeStep === step && "text-white",
            )}
          >
            <Icon
              className={cn(
                "h-5 w-5",
                activeStep === step ? "text-indigo-400" : "",
              )}
            />
            <span className="capitalize">{step}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
