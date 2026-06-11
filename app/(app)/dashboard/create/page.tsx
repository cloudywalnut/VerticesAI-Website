"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeftIcon, ArrowRightIcon, SparklesIcon } from "@heroicons/react/24/outline";

export default function CreateBotPage() {
  const router = useRouter();
  const [botName, setBotName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/createBot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ botName }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }

      router.push("/dashboard");
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <main className="max-w-2xl mx-auto px-6 lg:px-10 py-12">
      {/* Back */}
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 text-sm text-ink-2 hover:text-accent transition-colors mb-8"
      >
        <ArrowLeftIcon className="w-4 h-4" /> Back to Dashboard
      </Link>

      <div className="bg-surface border border-edge rounded-2xl p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="w-12 h-12 bg-tint rounded-2xl flex items-center justify-center mb-4">
            <SparklesIcon className="w-6 h-6 text-accent" />
          </div>
          <span className="inline-flex items-center px-3 py-1.5 bg-tint text-accent text-xs font-semibold uppercase tracking-widest rounded-full border border-accent/20 mb-3">
            New Bot
          </span>
          <h1 className="text-2xl font-bold text-ink mb-2">Create Your Bot</h1>
          <p className="text-ink-2 text-sm">
            Your bot will be deployed on a dedicated server and accessible via a unique URL within minutes.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-ink mb-2">Bot Name</label>
            <input
              type="text"
              value={botName}
              onChange={(e) => setBotName(e.target.value)}
              placeholder="e.g. Sales Assistant, Support Bot…"
              required
              className="w-full px-4 py-3 bg-canvas border border-edge rounded-lg text-ink placeholder:text-ink-2 focus:outline-none focus:border-accent transition-colors text-sm"
            />
            <p className="mt-2 text-xs text-ink-2">
              This will be used as your bot&apos;s subdomain:{" "}
              <span className="text-accent font-medium">
                {botName
                  ? `${botName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}.verticesai.tech`
                  : "your-bot-name.verticesai.tech"}
              </span>
            </p>
          </div>

          {/* Info box */}
          <div className="bg-canvas border border-edge rounded-xl p-4">
            <p className="text-xs font-semibold text-ink mb-2">What happens next</p>
            <ul className="space-y-1.5">
              {[
                "A dedicated server is provisioned for your bot",
                "Your bot is built and deployed automatically",
                "You get a live URL within a few minutes",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-xs text-ink-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {error && (
            <p className="text-accent text-sm bg-tint border border-accent/20 rounded-lg px-4 py-3">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !botName.trim()}
            className="w-full flex items-center justify-center gap-2 py-3.5 bg-accent hover:bg-[#d42a1d] text-white font-semibold rounded-lg transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? (
              "Deploying your bot…"
            ) : (
              <>Deploy Bot <ArrowRightIcon className="w-4 h-4" /></>
            )}
          </button>
        </form>
      </div>
    </main>
  );
}
