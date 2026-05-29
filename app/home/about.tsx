"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { CheckBadgeIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

const highlights = [
  "Real engineering, not just theory",
  "Business understanding comes first",
  "Practical AI that solves real problems",
  "Long-term partner, not a vendor",
];

export default function About() {
  const scrollTo = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <section id="about" className="w-full py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* ── Left: Founder image ── */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Decorative squares */}
          <div className="absolute -top-5 -left-5 w-20 h-20 bg-[#FFF0EE] rounded-2xl -z-10" />
          <div className="absolute -bottom-5 -right-5 w-14 h-14 bg-[#F7F7F7] rounded-xl -z-10" />

          <div className="relative rounded-2xl overflow-hidden aspect-[4/5] max-w-sm mx-auto lg:mx-0 shadow-xl">
            <Image
              src="/MyPortfolioPic.png"
              alt="Mustansir — Founder of Vertices AI"
              fill
              className="object-cover"
              priority={false}
            />
            {/* Name badge overlay */}
            <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 border border-[#E8E8E8] shadow-lg">
              <p className="font-bold text-[#0F0F0F] text-sm">Mustansir</p>
              <p className="text-[#5A5A5A] text-xs mt-0.5">
                Founder &amp; AI Engineer, Vertices AI
              </p>
            </div>
          </div>
        </motion.div>

        {/* ── Right: Text ── */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[#F13223] text-xs font-semibold uppercase tracking-widest">
            About Us
          </span>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold text-[#0F0F0F] mb-6 leading-tight">
            Built by Engineers,
            <br />
            <span className="text-[#F13223]">For Businesses</span>
          </h2>
          <p className="text-[#5A5A5A] text-lg leading-relaxed mb-4">
            Vertices AI was founded with one mission: to make powerful AI systems accessible to every business — not just enterprises with massive budgets.
          </p>
          <p className="text-[#5A5A5A] leading-relaxed mb-8">
            We don&apos;t sell generic AI tools or one-size-fits-all solutions. Every system we build is engineered specifically around how your business operates, your team&apos;s workflows, and your actual goals.
          </p>

          <ul className="space-y-3 mb-9">
            {highlights.map((h, i) => (
              <motion.li
                key={h}
                className="flex items-center gap-3 text-[#0F0F0F] font-medium"
                initial={{ opacity: 0, x: 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.3 + i * 0.08 }}
              >
                <CheckBadgeIcon className="w-5 h-5 text-[#F13223] flex-shrink-0" />
                {h}
              </motion.li>
            ))}
          </ul>

          <button
            onClick={() => scrollTo("#contact")}
            className="flex items-center gap-2 px-6 py-3.5 bg-[#F13223] hover:bg-[#d42a1d] text-white font-semibold rounded-lg transition-colors duration-200 cursor-pointer"
          >
            Work With Us <ArrowRightIcon className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
