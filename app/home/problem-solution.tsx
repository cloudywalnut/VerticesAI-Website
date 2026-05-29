"use client";
import { motion } from "framer-motion";
import { XCircleIcon, CheckCircleIcon } from "@heroicons/react/24/outline";

const problems = [
  "Manual, repetitive tasks eating your team's time",
  "Disconnected tools that don't talk to each other",
  "Slow customer support and missed follow-ups",
  "No clear visibility into business performance",
];

const solutions = [
  "Intelligent automation handles it all for you",
  "Integrated AI systems that work as one",
  "24/7 AI chatbots that never miss a lead",
  "Real-time dashboards and AI-driven insights",
];

export default function ProblemSolution() {
  return (
    <section className="w-full py-24 bg-[#F7F7F7]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#0F0F0F]">
            From Chaos to{" "}
            <span className="text-[#F13223]">Clarity</span>
          </h2>
          <p className="mt-4 text-[#5A5A5A] text-lg max-w-2xl mx-auto">
            We eliminate friction and build compounding business value — not
            random point solutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Problems panel */}
          <motion.div
            className="bg-white border border-[#E8E8E8] rounded-2xl p-8"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-7">
              <div className="w-9 h-9 bg-red-50 rounded-xl flex items-center justify-center">
                <XCircleIcon className="w-5 h-5 text-red-500" />
              </div>
              <h3 className="text-lg font-bold text-[#0F0F0F]">
                The Problem
              </h3>
            </div>
            <ul className="space-y-5">
              {problems.map((p, i) => (
                <motion.li
                  key={p}
                  className="flex items-start gap-3 text-[#5A5A5A]"
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.15 + i * 0.08 }}
                >
                  <div className="mt-1 w-5 h-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                  </div>
                  {p}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Solutions panel */}
          <motion.div
            className="bg-[#0F0F0F] rounded-2xl p-8"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex items-center gap-3 mb-7">
              <div className="w-9 h-9 bg-[#F13223]/20 rounded-xl flex items-center justify-center">
                <CheckCircleIcon className="w-5 h-5 text-[#F13223]" />
              </div>
              <h3 className="text-lg font-bold text-white">
                The Vertices Solution
              </h3>
            </div>
            <ul className="space-y-5">
              {solutions.map((s, i) => (
                <motion.li
                  key={s}
                  className="flex items-start gap-3 text-gray-300"
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.25 + i * 0.08 }}
                >
                  <div className="mt-1 w-5 h-5 rounded-full bg-[#F13223]/20 flex items-center justify-center flex-shrink-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#F13223]" />
                  </div>
                  {s}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <span className="inline-block px-5 py-2.5 bg-[#F13223] text-white text-sm font-semibold rounded-full">
            We build systems, not random tools.
          </span>
        </motion.div>
      </div>
    </section>
  );
}
