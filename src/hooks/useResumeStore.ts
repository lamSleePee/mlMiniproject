"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ResumeData, ResumeTemplateId } from "@/types/resume";
import { emptyResumeData } from "@/types/resume";
import { demoResumeData as sampleData } from "@/lib/resume-utils";

export type BuilderStep =
  | "personal"
  | "experience"
  | "education"
  | "skills"
  | "projects"
  | "finish";

export interface ATSResult {
  score: number;
  matched: string[];
  missing: string[];
  suggestions: string[];
}

interface ResumeStoreState {
  resumeId: string | null;
  title: string;
  template: ResumeTemplateId;
  targetJobRole: string;
  jobDescription: string;
  resumeData: ResumeData;
  activeStep: BuilderStep;
  lastSavedAt: string | null;
  atsResult: ATSResult | null;
  setResumeId: (id: string | null) => void;
  setTitle: (t: string) => void;
  setTemplate: (t: ResumeTemplateId) => void;
  setTargetJobRole: (r: string) => void;
  setJobDescription: (j: string) => void;
  setResumeData: (data: ResumeData) => void;
  patchResumeData: (patch: Partial<ResumeData>) => void;
  setActiveStep: (s: BuilderStep) => void;
  touchSaved: () => void;
  setAtsResult: (r: ATSResult | null) => void;
  loadDemo: () => void;
  resetEmpty: () => void;
}

const STORAGE_KEY = "joblit-resume-store";

export const useResumeStore = create<ResumeStoreState>()(
  persist(
    (set, get) => ({
      resumeId: null,
      title: "Untitled Resume",
      template: "classic",
      targetJobRole: "Software Engineer",
      jobDescription: "",
      resumeData: emptyResumeData(),
      activeStep: "personal",
      lastSavedAt: null,
      atsResult: null,

      setResumeId: (id) => set({ resumeId: id }),
      setTitle: (title) => set({ title }),
      setTemplate: (template) => set({ template }),
      setTargetJobRole: (targetJobRole) => set({ targetJobRole }),
      setJobDescription: (jobDescription) => set({ jobDescription }),
      setResumeData: (resumeData) => set({ resumeData }),
      patchResumeData: (patch) =>
        set({ resumeData: { ...get().resumeData, ...patch } }),
      setActiveStep: (activeStep) => set({ activeStep }),
      touchSaved: () =>
        set({ lastSavedAt: new Date().toISOString() }),
      setAtsResult: (atsResult) => set({ atsResult }),
      loadDemo: () =>
        set({
          title: "Demo Resume — Software Engineer",
          resumeData: sampleData(),
          targetJobRole: "Software Engineer",
          lastSavedAt: new Date().toISOString(),
        }),
      resetEmpty: () =>
        set({
          title: "Untitled Resume",
          resumeData: emptyResumeData(),
          atsResult: null,
          lastSavedAt: null,
        }),
    }),
    {
      name: STORAGE_KEY,
      partialize: (s) => ({
        title: s.title,
        template: s.template,
        targetJobRole: s.targetJobRole,
        jobDescription: s.jobDescription,
        resumeData: s.resumeData,
        atsResult: s.atsResult,
      }),
    },
  ),
);
