"use client";

import {
  Briefcase,
  GraduationCap,
  Layers,
  Sparkles,
  User,
  Wrench,
} from "lucide-react";
import { SectionCard } from "@/components/builder/SectionCard";
import { PersonalInfoForm } from "@/components/forms/PersonalInfoForm";
import { ExperienceForm } from "@/components/forms/ExperienceForm";
import { EducationForm } from "@/components/forms/EducationForm";
import { SkillsForm } from "@/components/forms/SkillsForm";
import { ProjectsForm } from "@/components/forms/ProjectsForm";
import { useResumeStore } from "@/hooks/useResumeStore";
import { AIButton } from "@/components/builder/AIButton";

export function FormPanel({
  remainingCalls,
  onRefreshQuota,
}: {
  remainingCalls: number;
  onRefreshQuota: () => void;
}) {
  const resumeData = useResumeStore((s) => s.resumeData);
  const patchResumeData = useResumeStore((s) => s.patchResumeData);
  const targetJobRole = useResumeStore((s) => s.targetJobRole);
  const setTargetJobRole = useResumeStore((s) => s.setTargetJobRole);
  const jobDescription = useResumeStore((s) => s.jobDescription);
  const setJobDescription = useResumeStore((s) => s.setJobDescription);

  return (
    <div className="space-y-4 pb-24 lg:pb-8">
      <SectionCard
        id="step-personal"
        title="Personal info"
        icon={User}
        headerRight={
          <AIButton
            label="AI summary"
            remainingCalls={remainingCalls}
            onEnhance={async () => {
              const r = await fetch("/api/generate-summary", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  jobRole: targetJobRole,
                  resumeData,
                }),
              });
              const j = (await r.json()) as { summary?: string };
              if (j.summary) patchResumeData({ summary: j.summary });
              onRefreshQuota();
            }}
          />
        }
      >
        <div className="mb-4 grid gap-3 sm:grid-cols-2">
          <label className="block sm:col-span-2">
            <span className="mb-1 block text-xs font-medium text-slate-600">
              Target job role (for AI)
            </span>
            <input
              className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
              value={targetJobRole}
              onChange={(e) => setTargetJobRole(e.target.value)}
            />
          </label>
        </div>
        <PersonalInfoForm
          value={resumeData.personalInfo}
          onChange={(personalInfo) => patchResumeData({ personalInfo })}
        />
        <label className="mt-4 block">
          <span className="mb-1 flex items-center gap-2 text-xs font-medium text-slate-600">
            <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
            Professional summary
          </span>
          <textarea
            className="min-h-[100px] w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
            value={resumeData.summary}
            onChange={(e) => patchResumeData({ summary: e.target.value })}
            placeholder="2–4 sentences: role, strengths, and what you're looking for."
          />
        </label>
      </SectionCard>

      <SectionCard
        id="step-experience"
        title="Work experience"
        icon={Briefcase}
        headerRight={
          <span className="text-xs text-slate-400">Add roles below</span>
        }
      >
        <ExperienceForm
          items={resumeData.experience}
          onChange={(experience) => patchResumeData({ experience })}
          targetJobRole={targetJobRole}
          remainingCalls={remainingCalls}
          onRefreshQuota={onRefreshQuota}
        />
      </SectionCard>

      <SectionCard id="step-education" title="Education" icon={GraduationCap}>
        <EducationForm
          items={resumeData.education}
          onChange={(education) => patchResumeData({ education })}
        />
      </SectionCard>

      <SectionCard id="step-skills" title="Skills" icon={Wrench}>
        <SkillsForm
          skills={resumeData.skills}
          onChange={(skills) => patchResumeData({ skills })}
          targetJobRole={targetJobRole}
          remainingCalls={remainingCalls}
          onRefreshQuota={onRefreshQuota}
        />
      </SectionCard>

      <SectionCard id="step-projects" title="Projects" icon={Layers}>
        <ProjectsForm
          items={resumeData.projects}
          onChange={(projects) => patchResumeData({ projects })}
          targetJobRole={targetJobRole}
          remainingCalls={remainingCalls}
          onRefreshQuota={onRefreshQuota}
        />
      </SectionCard>

      <SectionCard
        id="step-finish"
        title="Job description & ATS"
        icon={Sparkles}
        defaultOpen
      >
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-slate-600">
            Paste job description (for ATS analysis)
          </span>
          <textarea
            className="min-h-[140px] w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the full job posting here…"
          />
        </label>
      </SectionCard>
    </div>
  );
}
