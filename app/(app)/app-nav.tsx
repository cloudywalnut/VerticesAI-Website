"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { SunIcon, MoonIcon, ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";
import { createClient } from "@/lib/supabase/client";
import { useTheme } from "@/app/home/theme-provider";

export default function AppNav() {
  const { theme, toggle } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const [userName, setUserName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) return;
      const { data } = await supabase
        .from("users")
        .select("name, role")
        .eq("id", user.id)
        .single();
      if (data) {
        setUserName(data.name);
        setIsAdmin(data.role === "admin");
      }
    });
  }, []);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
  };

  const linkClass = (href: string) =>
    `text-sm font-medium transition-colors duration-200 ${
      pathname === href ? "text-accent" : "text-ink-2 hover:text-accent"
    }`;

  return (
    <nav className="fixed inset-x-0 top-0 z-50 bg-canvas border-b border-edge">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-20">
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <Image
            src={theme === "dark" ? "/Vertices-NOBG-White.png" : "/Vertices-NOBG.png"}
            alt="Vertices AI Logo"
            width={110}
            height={44}
            className="object-contain"
          />
        </Link>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/dashboard" className={linkClass("/dashboard")}>My Bots</Link>
          {isAdmin && (
            <Link href="/admin" className={linkClass("/admin")}>Admin Panel</Link>
          )}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {userName && (
            <span className="hidden md:block text-sm text-ink-2">
              Hello, <span className="text-ink font-medium">{userName}</span>
            </span>
          )}
          <button
            onClick={toggle}
            aria-label="Toggle dark mode"
            className="p-2 rounded-lg text-ink-2 hover:text-accent hover:bg-surface transition-all duration-200 cursor-pointer"
          >
            {theme === "dark" ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
          </button>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-ink-2 hover:text-accent border border-edge hover:border-accent rounded-lg transition-all duration-200 cursor-pointer"
          >
            <ArrowRightStartOnRectangleIcon className="w-4 h-4" />
            <span className="hidden md:inline">Sign Out</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
