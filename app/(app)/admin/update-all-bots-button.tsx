"use client";
import { useState } from "react";
import { ArrowPathIcon, CheckCircleIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";

type BotResult = {
  clientName: string;
  instanceId: string;
  status: "ok" | "failed";
  error?: string;
};

type Result = {
  success: boolean;
  results?: BotResult[];
  error?: string;
};

const FETCH_TIMEOUT_MS = 10 * 60 * 1000; // 10 minutes

export default function UpdateAllBotsButton() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  const handleUpdate = async () => {
    setLoading(true);
    setResult(null);

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

    try {
      const res = await fetch("/api/updateBot", { method: "POST", signal: controller.signal });
      const data = await res.json();
      setResult({ success: res.ok, ...data });
    } catch (err) {
      const timedOut = err instanceof DOMException && err.name === "AbortError";
      setResult({ success: false, error: timedOut ? "Request timed out after 10 minutes." : "Network error. Please try again." });
    } finally {
      clearTimeout(timer);
      setLoading(false);
    }
  };

  const failed = result?.results?.filter((r) => r.status === "failed") ?? [];
  const succeeded = result?.results?.filter((r) => r.status === "ok") ?? [];

  return (
    <div className="space-y-3">
      <button
        onClick={handleUpdate}
        disabled={loading}
        className="inline-flex items-center gap-2 px-5 py-2.5 border border-edge hover:border-accent text-ink hover:text-accent font-semibold rounded-lg transition-all duration-200 text-sm disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
      >
        <ArrowPathIcon className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
        {loading ? "Updating all bots…" : "Update All Bots"}
      </button>

      {result && (
        <div className="space-y-2">
          {/* Succeeded */}
          {succeeded.length > 0 && (
            <div className="rounded-xl p-4 border bg-emerald-500/10 border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-sm">
              <div className="flex items-center gap-2 font-semibold mb-2">
                <CheckCircleIcon className="w-4 h-4" />
                {succeeded.length} bot{succeeded.length !== 1 ? "s" : ""} updated
              </div>
              {succeeded.map((r) => (
                <div key={r.instanceId} className="text-xs opacity-80">
                  {r.clientName} <span className="opacity-60">({r.instanceId})</span>
                </div>
              ))}
            </div>
          )}

          {/* Failed */}
          {failed.length > 0 && (
            <div className="rounded-xl p-4 border bg-tint border-accent/20 text-accent text-sm">
              <div className="flex items-center gap-2 font-semibold mb-2">
                <ExclamationTriangleIcon className="w-4 h-4 shrink-0" />
                {failed.length} bot{failed.length !== 1 ? "s" : ""} failed
              </div>
              {failed.map((r) => (
                <div key={r.instanceId} className="text-xs mb-1.5 last:mb-0">
                  <span className="font-medium">{r.clientName}</span>{" "}
                  <span className="opacity-60">({r.instanceId})</span>
                  {r.error && <div className="opacity-75 mt-0.5 font-mono">{r.error}</div>}
                </div>
              ))}
            </div>
          )}

          {/* Network/timeout error with no per-bot results */}
          {!result.results && result.error && (
            <div className="rounded-xl p-4 border bg-tint border-accent/20 text-accent text-sm flex items-center gap-2">
              <ExclamationTriangleIcon className="w-4 h-4 shrink-0" />
              {result.error}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
