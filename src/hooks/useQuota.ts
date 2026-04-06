"use client";

import { useCallback, useEffect, useState } from "react";
import type { QuotaApiResponse } from "@/types/quota";

export function useQuota() {
  const [quota, setQuota] = useState<QuotaApiResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const r = await fetch("/api/quota");
      if (r.ok) {
        const j = (await r.json()) as QuotaApiResponse;
        setQuota(j);
      }
    } catch {
      setQuota({
        callCount: 0,
        remainingCalls: 99,
        resetAt: null,
        windowStart: new Date().toISOString(),
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return {
    quota,
    loading,
    remainingCalls: quota?.remainingCalls ?? 99,
    refresh,
  };
}
