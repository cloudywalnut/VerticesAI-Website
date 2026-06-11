"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowRightIcon, SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { createClient } from "@/lib/supabase/client";
import { useTheme } from "@/app/home/theme-provider";

export default function LoginPage() {
  const router = useRouter();
  const { theme, toggle } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-canvas flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 lg:px-10 py-4 border-b border-edge">
        <Link href="/">
          <Image
            src={theme === "dark" ? "/Vertices-NOBG-White.png" : "/Vertices-NOBG.png"}
            alt="Vertices AI"
            width={100}
            height={40}
            className="object-contain"
          />
        </Link>
        <button
          onClick={toggle}
          aria-label="Toggle theme"
          className="p-2 rounded-lg text-ink-2 hover:text-accent hover:bg-surface transition-all duration-200 cursor-pointer"
        >
          {theme === "dark" ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
        </button>
      </div>

      {/* Card */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-surface border border-edge rounded-2xl p-8">
            <div className="mb-8">
              <span className="inline-flex items-center px-3 py-1.5 bg-tint text-accent text-xs font-semibold uppercase tracking-widest rounded-full border border-accent/20 mb-4">
                Vertices Bot
              </span>
              <h1 className="text-2xl font-bold text-ink mb-2">Welcome back</h1>
              <p className="text-ink-2 text-sm">Sign in to manage your business bot</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-ink mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  required
                  className="w-full px-4 py-3 bg-canvas border border-edge rounded-lg text-ink placeholder:text-ink-2 focus:outline-none focus:border-accent transition-colors text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-ink mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-3 bg-canvas border border-edge rounded-lg text-ink placeholder:text-ink-2 focus:outline-none focus:border-accent transition-colors text-sm"
                />
              </div>

              {error && (
                <p className="text-accent text-sm bg-tint border border-accent/20 rounded-lg px-4 py-3">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3 bg-accent hover:bg-[#d42a1d] text-white font-semibold rounded-lg transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
              >
                {loading ? "Signing in…" : (<>Sign In <ArrowRightIcon className="w-4 h-4" /></>)}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-ink-2">
              Don&apos;t have an account?{" "}
              <Link href="/auth/signup" className="text-accent hover:underline font-semibold">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
