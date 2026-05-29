"use client";
import { motion } from "framer-motion";
import { CalendarIcon, RocketLaunchIcon } from "@heroicons/react/24/outline";

export default function CTA() {
  const scrollTo = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <section className="w-full py-28 bg-night">
      <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-3 py-1.5 bg-accent/15 text-accent text-xs font-semibold uppercase tracking-widest rounded-full mb-6">
            Ready to get started?
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-[1.1]">
            Tell Us Your Problem.{" "}
            <span className="text-accent">We&apos;ll Build</span>{" "}
            The Solution.
          </h2>
          <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            Whether you&apos;re exploring AI for the first time or ready to deploy a full system — we&apos;re here to build the right solution for your business.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => scrollTo("#contact")}
              className="flex items-center gap-2.5 px-7 py-4 bg-accent hover:bg-[#d42a1d] text-white font-semibold rounded-lg transition-colors duration-200 cursor-pointer"
            >
              <CalendarIcon className="w-5 h-5" />
              Schedule a Call
            </button>
            <button
              onClick={() => scrollTo("#contact")}
              className="flex items-center gap-2.5 px-7 py-4 border border-white/20 hover:border-white/50 text-white font-semibold rounded-lg transition-colors duration-200 cursor-pointer"
            >
              <RocketLaunchIcon className="w-5 h-5" />
              Start a Project
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
