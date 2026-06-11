"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowRightIcon, SunIcon, MoonIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { createClient } from "@/lib/supabase/client";
import { useTheme } from "@/app/home/theme-provider";

const INDUSTRIES = [
  "Technology", "Retail", "Healthcare", "Finance",
  "Education", "Real Estate", "Hospitality", "Other",
];
const COMPANY_SIZES = ["1–10", "11–50", "51–200", "201–500", "500+"];

export default function SignupPage() {
  const router = useRouter();
  const { theme, toggle } = useTheme();
  const [step, setStep] = useState<1 | 2>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    companyName: "",
    industry: "",
    companySize: "",
  });

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (step === 1) {
      setStep(2);
      return;
    }

    setError("");
    setLoading(true);

    const supabase = createClient();

    const { data, error: signUpError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    if (data.user) {
      const { error: insertError } = await supabase.from("users").insert({
        id: data.user.id,
        name: form.name,
        company_name: form.companyName,
        industry: form.industry,
        company_size: form.companySize,
        role: "user",
      });

      if (insertError) {
        setError(insertError.message);
        setLoading(false);
        return;
      }
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

            {/* Step indicator */}
            <div className="flex items-center gap-2 mb-8">
              {[1, 2].map((s) => (
                <div key={s} className="flex items-center gap-2">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                      step >= s ? "bg-accent text-white" : "bg-edge text-ink-2"
                    }`}
                  >
                    {s}
                  </div>
                  {s < 2 && <div className={`flex-1 h-px w-16 ${step > s ? "bg-accent" : "bg-edge"}`} />}
                </div>
              ))}
              <span className="ml-2 text-xs text-ink-2 font-medium">
                {step === 1 ? "Account" : "Company"}
              </span>
            </div>

            <div className="mb-6">
              <span className="inline-flex items-center px-3 py-1.5 bg-tint text-accent text-xs font-semibold uppercase tracking-widest rounded-full border border-accent/20 mb-4">
                Vertices Bot
              </span>
              <h1 className="text-2xl font-bold text-ink mb-1">
                {step === 1 ? "Create your account" : "About your company"}
              </h1>
              <p className="text-ink-2 text-sm">
                {step === 1
                  ? "Get started with your AI business bot"
                  : "Help us personalise your experience"}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {step === 1 ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-ink mb-2">Full Name</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={set("name")}
                      placeholder="John Smith"
                      required
                      className="w-full px-4 py-3 bg-canvas border border-edge rounded-lg text-ink placeholder:text-ink-2 focus:outline-none focus:border-accent transition-colors text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-ink mb-2">Email</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={set("email")}
                      placeholder="you@company.com"
                      required
                      className="w-full px-4 py-3 bg-canvas border border-edge rounded-lg text-ink placeholder:text-ink-2 focus:outline-none focus:border-accent transition-colors text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-ink mb-2">Password</label>
                    <input
                      type="password"
                      value={form.password}
                      onChange={set("password")}
                      placeholder="Min. 8 characters"
                      minLength={8}
                      required
                      className="w-full px-4 py-3 bg-canvas border border-edge rounded-lg text-ink placeholder:text-ink-2 focus:outline-none focus:border-accent transition-colors text-sm"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium text-ink mb-2">Company Name</label>
                    <input
                      type="text"
                      value={form.companyName}
                      onChange={set("companyName")}
                      placeholder="Acme Inc."
                      required
                      className="w-full px-4 py-3 bg-canvas border border-edge rounded-lg text-ink placeholder:text-ink-2 focus:outline-none focus:border-accent transition-colors text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-ink mb-2">Industry</label>
                    <select
                      value={form.industry}
                      onChange={set("industry")}
                      required
                      className="w-full px-4 py-3 bg-canvas border border-edge rounded-lg text-ink focus:outline-none focus:border-accent transition-colors text-sm appearance-none"
                    >
                      <option value="">Select industry…</option>
                      {INDUSTRIES.map((i) => (
                        <option key={i} value={i}>{i}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-ink mb-2">Company Size</label>
                    <div className="flex gap-2 flex-wrap">
                      {COMPANY_SIZES.map((size) => (
                        <button
                          key={size}
                          type="button"
                          onClick={() => setForm((f) => ({ ...f, companySize: size }))}
                          className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors cursor-pointer ${
                            form.companySize === size
                              ? "bg-accent text-white border-accent"
                              : "bg-canvas text-ink-2 border-edge hover:border-accent hover:text-accent"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {error && (
                <p className="text-accent text-sm bg-tint border border-accent/20 rounded-lg px-4 py-3">
                  {error}
                </p>
              )}

              <div className="flex gap-3 pt-1">
                {step === 2 && (
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex items-center gap-2 px-5 py-3 border border-edge rounded-lg text-ink font-semibold text-sm hover:border-ink transition-colors cursor-pointer"
                  >
                    <ArrowLeftIcon className="w-4 h-4" /> Back
                  </button>
                )}
                <button
                  type="submit"
                  disabled={loading || (step === 2 && !form.companySize)}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-accent hover:bg-[#d42a1d] text-white font-semibold rounded-lg transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer text-sm"
                >
                  {loading
                    ? "Creating account…"
                    : step === 1
                    ? (<>Continue <ArrowRightIcon className="w-4 h-4" /></>)
                    : (<>Create Account <ArrowRightIcon className="w-4 h-4" /></>)}
                </button>
              </div>
            </form>

            <p className="mt-6 text-center text-sm text-ink-2">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-accent hover:underline font-semibold">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
