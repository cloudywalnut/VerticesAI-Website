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
    <section className="w-full py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-ink">
            From Chaos to <span className="text-accent">Clarity</span>
          </h2>
          <p className="mt-4 text-ink-2 text-lg max-w-2xl mx-auto">
            We eliminate friction and build compounding business value — not random point solutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Problems */}
          <motion.div
            className="bg-canvas border border-edge rounded-2xl p-8"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-7">
              <div className="w-9 h-9 bg-red-500/10 rounded-xl flex items-center justify-center">
                <XCircleIcon className="w-5 h-5 text-red-500" />
              </div>
              <h3 className="text-lg font-bold text-ink">The Problem</h3>
            </div>
            <ul className="space-y-5">
              {problems.map((p, i) => (
                <motion.li
                  key={p}
                  className="flex items-start gap-3 text-ink-2"
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.15 + i * 0.08 }}
                >
                  <div className="mt-1 w-5 h-5 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                  </div>
                  {p}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Solutions */}
          <motion.div
            className="bg-night rounded-2xl p-8"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex items-center gap-3 mb-7">
              <div className="w-9 h-9 bg-accent/20 rounded-xl flex items-center justify-center">
                <CheckCircleIcon className="w-5 h-5 text-accent" />
              </div>
              <h3 className="text-lg font-bold text-white">The Vertices Solution</h3>
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
                  <div className="mt-1 w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent" />
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
          <span className="inline-block px-5 py-2.5 bg-accent text-white text-sm font-semibold rounded-full">
            We build systems, not random tools.
          </span>
        </motion.div>
      </div>
    </section>
  );
}
