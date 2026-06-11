import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { PlusIcon, GlobeAltIcon, CalendarDaysIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");

  const [{ data: profile }, { data: bots }] = await Promise.all([
    supabase.from("users").select("name, company_name").eq("id", user.id).single(),
    supabase.from("bots").select("*").eq("user_id", user.id).order("created_at", { ascending: false }),
  ]);

  return (
    <main className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
      {/* Header */}
      <div className="flex items-start justify-between mb-10 gap-4 flex-wrap">
        <div>
          <span className="inline-flex items-center px-3 py-1.5 bg-tint text-accent text-xs font-semibold uppercase tracking-widest rounded-full border border-accent/20 mb-3">
            {profile?.company_name ?? "Your Company"}
          </span>
          <h1 className="text-3xl font-bold text-ink">Your Bots</h1>
          <p className="text-ink-2 mt-1 text-sm">Manage and monitor your deployed AI bots</p>
        </div>
        <Link
          href="/dashboard/create"
          className="flex items-center gap-2 px-5 py-3 bg-accent hover:bg-[#d42a1d] text-white font-semibold rounded-lg transition-colors duration-200 text-sm shrink-0"
        >
          <PlusIcon className="w-4 h-4" />
          Create Bot
        </Link>
      </div>

      {/* Bot grid */}
      {!bots || bots.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 bg-surface border border-edge rounded-2xl text-center">
          <div className="w-14 h-14 bg-tint rounded-2xl flex items-center justify-center mb-4">
            <GlobeAltIcon className="w-7 h-7 text-accent" />
          </div>
          <h2 className="text-lg font-bold text-ink mb-2">No bots yet</h2>
          <p className="text-ink-2 text-sm mb-6 max-w-xs">
            Create your first AI bot and get it deployed on your own subdomain.
          </p>
          <Link
            href="/dashboard/create"
            className="flex items-center gap-2 px-5 py-3 bg-accent hover:bg-[#d42a1d] text-white font-semibold rounded-lg transition-colors text-sm"
          >
            <PlusIcon className="w-4 h-4" /> Create Your First Bot
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {bots.map((bot) => (
            <div
              key={bot.id}
              className="bg-surface border border-edge rounded-2xl p-6 hover:border-accent/40 transition-colors group"
            >
              {/* Bot header */}
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 bg-tint rounded-xl flex items-center justify-center shrink-0">
                  <div className="w-4 h-4 bg-accent rounded-sm" />
                </div>
                <span className="inline-flex items-center px-2.5 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold rounded-full">
                  Live
                </span>
              </div>

              <h3 className="text-base font-bold text-ink mb-1 truncate">{bot.bot_name}</h3>

              {/* URL */}
              {bot.url && (
                <a
                  href={bot.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-accent hover:underline mb-4 break-all"
                >
                  <GlobeAltIcon className="w-3.5 h-3.5 shrink-0" />
                  {bot.url.replace("https://", "")}
                  <ArrowTopRightOnSquareIcon className="w-3 h-3 shrink-0" />
                </a>
              )}

              {/* Meta */}
              <div className="flex items-center gap-1.5 text-xs text-ink-2 mt-auto">
                <CalendarDaysIcon className="w-3.5 h-3.5" />
                {new Date(bot.created_at).toLocaleDateString("en-US", {
                  month: "short", day: "numeric", year: "numeric",
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
