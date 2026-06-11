import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import UpdateAllBotsButton from "./update-all-bots-button";
import Link from "next/link";
import { PlusIcon, ServerStackIcon, GlobeAltIcon, CalendarDaysIcon } from "@heroicons/react/24/outline";

export default async function AdminPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");

  // Middleware already enforces admin-only, but double-check server-side
  const { data: profile } = await supabase.from("users").select("role, name").eq("id", user.id).single();
  if (profile?.role !== "admin") redirect("/dashboard");

  const { data: allBots, error: botsError } = await supabase
    .from("bots")
    .select("*, users(name, company_name)")
    .order("created_at", { ascending: false });

  if (botsError) console.error("Admin bots query error:", botsError);

  return (
    <main className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
      {/* Header */}
      <div className="mb-10">
        <span className="inline-flex items-center px-3 py-1.5 bg-tint text-accent text-xs font-semibold uppercase tracking-widest rounded-full border border-accent/20 mb-3">
          Admin
        </span>
        <h1 className="text-3xl font-bold text-ink">Admin Panel</h1>
        <p className="text-ink-2 mt-1 text-sm">Manage all deployed bots across all users</p>
      </div>

      {/* Action cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
        {/* Create new bot */}
        <div className="bg-surface border border-edge rounded-2xl p-6">
          <div className="w-10 h-10 bg-tint rounded-xl flex items-center justify-center mb-4">
            <PlusIcon className="w-5 h-5 text-accent" />
          </div>
          <h2 className="text-base font-bold text-ink mb-1">Create New Bot</h2>
          <p className="text-ink-2 text-sm mb-5">
            Provision and deploy a new bot to a dedicated server.
          </p>
          <Link
            href="/dashboard/create"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent hover:bg-[#d42a1d] text-white font-semibold rounded-lg transition-colors text-sm"
          >
            <PlusIcon className="w-4 h-4" /> Create Bot
          </Link>
        </div>

        {/* Update all bots */}
        <div className="bg-surface border border-edge rounded-2xl p-6">
          <div className="w-10 h-10 bg-tint rounded-xl flex items-center justify-center mb-4">
            <ServerStackIcon className="w-5 h-5 text-accent" />
          </div>
          <h2 className="text-base font-bold text-ink mb-1">Update All Bots</h2>
          <p className="text-ink-2 text-sm mb-5">
            Pull latest changes and redeploy all{" "}
            <span className="text-ink font-semibold">{allBots?.length ?? 0}</span> running bots.
          </p>
          <UpdateAllBotsButton />
        </div>
      </div>

      {/* All bots table */}
      <div>
        <h2 className="text-lg font-bold text-ink mb-4">All Deployed Bots</h2>

        {!allBots || allBots.length === 0 ? (
          <div className="bg-surface border border-edge rounded-2xl py-16 text-center">
            <ServerStackIcon className="w-8 h-8 text-ink-2 mx-auto mb-3" />
            <p className="text-ink-2 text-sm">No bots deployed yet</p>
          </div>
        ) : (
          <div className="bg-surface border border-edge rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-edge">
                    <th className="text-left px-6 py-4 text-xs font-semibold text-ink-2 uppercase tracking-wider">Bot Name</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-ink-2 uppercase tracking-wider">Company</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-ink-2 uppercase tracking-wider">URL</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-ink-2 uppercase tracking-wider">Created</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-ink-2 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {allBots.map((bot, i) => (
                    <tr
                      key={bot.id}
                      className={`border-b border-edge last:border-0 hover:bg-canvas transition-colors ${
                        i % 2 === 0 ? "" : "bg-canvas/40"
                      }`}
                    >
                      <td className="px-6 py-4 font-medium text-ink">{bot.bot_name}</td>
                      <td className="px-6 py-4 text-ink-2">
                        {(bot.users as { company_name?: string } | null)?.company_name ?? "—"}
                      </td>
                      <td className="px-6 py-4">
                        {bot.url ? (
                          <a
                            href={bot.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-accent hover:underline"
                          >
                            <GlobeAltIcon className="w-3.5 h-3.5" />
                            {bot.url.replace("https://", "")}
                          </a>
                        ) : "—"}
                      </td>
                      <td className="px-6 py-4 text-ink-2">
                        <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                          <CalendarDaysIcon className="w-3.5 h-3.5 shrink-0" />
                          {new Date(bot.created_at).toLocaleDateString("en-US", {
                            month: "short", day: "numeric", year: "numeric",
                          })}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold rounded-full">
                          Live
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
