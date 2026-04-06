"use client";

import { useState } from "react";
import { Loader2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

type AIButtonProps = {
  label?: string;
  remainingCalls?: number;
  className?: string;
  disabled?: boolean;
  onEnhance: () => Promise<void>;
};

export function AIButton({
  label = "AI Enhance",
  remainingCalls = 99,
  className,
  disabled,
  onEnhance,
}: AIButtonProps) {
  const [loading, setLoading] = useState(false);

  return (
    <button
      type="button"
      disabled={disabled || loading}
      onClick={async () => {
        setLoading(true);
        try {
          await onEnhance();
        } finally {
          setLoading(false);
        }
      }}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full bg-emerald-500 px-3 py-1 text-xs font-medium text-white shadow-sm transition hover:bg-emerald-600 disabled:opacity-50",
        className,
      )}
    >
      {loading ? (
        <Loader2 className="h-3.5 w-3.5 animate-spin" />
      ) : (
        <Sparkles className="h-3.5 w-3.5" />
      )}
      {label}
      <span className="opacity-90">({remainingCalls} left)</span>
    </button>
  );
}
