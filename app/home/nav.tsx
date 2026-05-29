"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Bars3Icon, XMarkIcon, ArrowRightIcon, SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { useTheme } from "./theme-provider";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Services", href: "#services" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Process", href: "#process" },
  { name: "About", href: "#about" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-canvas/95 backdrop-blur-md shadow-sm border-b border-edge"
          : "bg-canvas border-b border-edge"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-20">
        {/* Logo */}
        <a href="#home" onClick={(e) => scrollTo(e, "#home")} className="shrink-0">
          <Image
            src={theme === "dark" ? "/Vertices-NOBG-White.png" : "/Vertices-NOBG.png"}
            alt="Vertices AI Logo"
            width={120}
            height={120}
            className="object-contain"
          />
        </a>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                onClick={(e) => scrollTo(e, link.href)}
                className="text-ink-2 hover:text-accent text-sm font-medium transition-colors duration-200"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA + Theme Toggle + Mobile Toggle */}
        <div className="flex items-center gap-3">
          {/* Theme toggle */}
          <button
            onClick={toggle}
            aria-label="Toggle dark mode"
            className="p-2 rounded-lg text-ink-2 hover:text-accent hover:bg-surface transition-all duration-200 cursor-pointer"
          >
            {theme === "dark" ? (
              <SunIcon className="w-5 h-5" />
            ) : (
              <MoonIcon className="w-5 h-5" />
            )}
          </button>

          <a
            href="#contact"
            onClick={(e) => scrollTo(e, "#contact")}
            className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-accent hover:bg-[#d42a1d] text-white text-sm font-semibold rounded-lg transition-colors duration-200 whitespace-nowrap"
          >
            Book a Consultation
            <ArrowRightIcon className="w-4 h-4" />
          </a>

          <button
            className="md:hidden p-2 text-ink hover:text-accent transition-colors cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-canvas border-t border-edge">
          <ul className="flex flex-col px-6 py-4 gap-1">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={(e) => scrollTo(e, link.href)}
                  className="block py-3 text-ink font-medium hover:text-accent transition-colors border-b border-edge last:border-0"
                >
                  {link.name}
                </a>
              </li>
            ))}
            <li className="pt-3">
              <a
                href="#contact"
                onClick={(e) => scrollTo(e, "#contact")}
                className="flex items-center justify-center gap-2 w-full py-3 bg-accent text-white font-semibold rounded-lg"
              >
                Book a Consultation
                <ArrowRightIcon className="w-4 h-4" />
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
