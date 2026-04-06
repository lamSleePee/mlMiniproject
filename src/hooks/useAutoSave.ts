"use client";

import { useEffect, useMemo, useRef } from "react";
import { debounce } from "@/lib/resume-utils";
import { useResumeStore } from "@/hooks/useResumeStore";

/** Marks resume as saved shortly after edits stop (local demo — no Supabase) */
export function useAutoSave(debounceMs = 600) {
  const resumeData = useResumeStore((s) => s.resumeData);
  const title = useResumeStore((s) => s.title);
  const template = useResumeStore((s) => s.template);
  const touchSaved = useResumeStore((s) => s.touchSaved);

  const save = useMemo(
    () =>
      debounce(() => {
        touchSaved();
      }, debounceMs),
    [debounceMs, touchSaved],
  );

  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    save();
  }, [resumeData, title, template, save]);
}
