/**
 * AI quota / rate-limit types (user_ai_quota + GET /api/quota).
 */

/** Response from GET /api/quota */
export interface QuotaApiResponse {
  callCount: number;
  remainingCalls: number;
  resetAt: string | null;
  windowStart: string;
}

/** Client hook / UI state derived from quota */
export interface QuotaState {
  callCount: number;
  remainingCalls: number;
  resetAt: Date | null;
  windowStart: Date | null;
  loading: boolean;
  error: string | null;
}

/** Result from server-side checkAndIncrementQuota (lib/rate-limit.ts) */
export interface QuotaCheckResult {
  allowed: boolean;
  remainingCalls: number;
  resetAt: Date | null;
}

/** Standard 429 payload for AI routes */
export interface RateLimitErrorBody {
  error: "rate_limit";
  message: string;
  resetAt: string;
}
