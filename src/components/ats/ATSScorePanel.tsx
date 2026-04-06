"use client";

import { useState } from "react";
import { Loader2, Target } from "lucide-react";
import type { ATSResult } from "@/hooks/useResumeStore";
import { cn } from "@/lib/utils";

export function ATSScorePanel({
  jobDescription,
  resumeText,
  result,
  onResult,
}: {
  jobDescription: string;
  resumeText: string;
  result: ATSResult | null;
  onResult: (r: ATSResult) => void;
}) {
  const [loading, setLoading] = useState(false);

  const run = async () => {
    setLoading(true);
    try {
      const r = await fetch("/api/ats-score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobDescription, resumeText }),
      });
      const j = (await r.json()) as ATSResult;
      onResult({
        score: j.score ?? 0,
        matched: j.matched ?? [],
        missing: j.missing ?? [],
        suggestions: j.suggestions ?? [],
      });
    } finally {
      setLoading(false);
    }
  };

  const score = result?.score ?? 0;
  const badgeColor =
    score >= 75 ? "bg-emerald-100 text-emerald-800" : score >= 50 ? "bg-amber-100 text-amber-900" : "bg-red-100 text-red-800";

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="flex items-center gap-2 text-sm font-semibold text-slate-800">
          <Target className="h-4 w-4 text-indigo-600" />
          ATS match
        </span>
        <button
          type="button"
          onClick={() => void run()}
          disabled={loading || !jobDescription.trim()}
          className="rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Analyze"
          )}
        </button>
      </div>
      <p className="mb-3 text-xs text-slate-500">
        Paste a job description in the center panel, then analyze against your resume text.
      </p>
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "flex h-14 w-14 items-center justify-center rounded-full text-lg font-bold",
            badgeColor,
          )}
        >
          {score}
        </div>
        <div>
          <p className="text-xs font-medium text-slate-600">Score / 100</p>
          <p className="text-xs text-slate-500">
            {result ? "Based on keyword overlap" : "Run analysis to see results"}
          </p>
        </div>
      </div>
      {result ? (
        <div className="mt-4 space-y-3 text-xs">
          <div>
            <p className="mb-1 font-semibold text-slate-700">Matched</p>
            <div className="flex flex-wrap gap-1">
              {result.matched.slice(0, 12).map((m) => (
                <span
                  key={m}
                  className="rounded-full bg-emerald-50 px-2 py-0.5 text-emerald-800"
                >
                  {m}
                </span>
              ))}
              {!result.matched.length ? (
                <span className="text-slate-400">—</span>
              ) : null}
            </div>
          </div>
          <div>
            <p className="mb-1 font-semibold text-slate-700">Missing</p>
            <div className="flex flex-wrap gap-1">
              {result.missing.slice(0, 12).map((m) => (
                <span
                  key={m}
                  className="rounded-full bg-rose-50 px-2 py-0.5 text-rose-800"
                >
                  {m}
                </span>
              ))}
              {!result.missing.length ? (
                <span className="text-slate-400">—</span>
              ) : null}
            </div>
          </div>
          <div>
            <p className="mb-1 font-semibold text-slate-700">Suggestions</p>
            <ul className="list-inside list-disc text-slate-600">
              {result.suggestions.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
}
