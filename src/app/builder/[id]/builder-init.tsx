"use client";

import { useEffect } from "react";
import { useResumeStore } from "@/hooks/useResumeStore";

export function BuilderInit({ resumeId }: { resumeId: string }) {
  const setResumeId = useResumeStore((s) => s.setResumeId);
  const loadDemo = useResumeStore((s) => s.loadDemo);
  const resetEmpty = useResumeStore((s) => s.resetEmpty);
  const setTitle = useResumeStore((s) => s.setTitle);

  useEffect(() => {
    setResumeId(resumeId);
    if (resumeId === "demo") {
      loadDemo();
    } else if (resumeId === "new") {
      resetEmpty();
      setTitle("Untitled Resume");
    }
  }, [resumeId, setResumeId, loadDemo, resetEmpty, setTitle]);

  return null;
}
