"use client";
import { motion } from "framer-motion";

const projects = [
  {
    tag: "AI Chatbot",
    title: "SME Customer Support Bot",
    description:
      "Deployed an in-house AI chatbot for a retail business that handles the majority of customer queries automatically — freeing the team to focus on high-value work.",
    result: "85% query resolution rate",
    tech: ["Next.js", "OpenAI", "PostgreSQL"],
    accent: "#F13223",
  },
  {
    tag: "Automation",
    title: "Document Processing Pipeline",
    description:
      "Built an intelligent automation workflow that extracts, categorises, and routes documents end-to-end with zero manual handling.",
    result: "80% reduction in manual work",
    tech: ["Python", "n8n", "OpenAI"],
    accent: "#0F0F0F",
  },
  {
    tag: "Custom Software",
    title: "Enterprise Analytics Platform",
    description:
      "Developed a real-time analytics dashboard with AI-powered forecasting for a mid-size logistics company, integrated directly into their existing stack.",
    result: "3× faster decision making",
    tech: ["React", "FastAPI", "Claude AI"],
    accent: "#F13223",
  },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="w-full py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-[#F13223] text-xs font-semibold uppercase tracking-widest">
            Our Work
          </span>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold text-[#0F0F0F]">
            Results That <span className="text-[#F13223]">Speak</span>
          </h2>
          <p className="mt-4 text-[#5A5A5A] text-lg max-w-2xl">
            Real projects, real impact. Here&apos;s how we&apos;ve helped
            businesses transform.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map(({ tag, title, description, result, tech, accent }, i) => (
            <motion.div
              key={title}
              className="group border border-[#E8E8E8] rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              {/* Accent strip */}
              <div className="h-1.5" style={{ background: accent }} />

              <div className="p-7">
                <span className="inline-block px-2.5 py-1 bg-[#F7F7F7] text-[#5A5A5A] text-xs font-semibold rounded-full mb-4">
                  {tag}
                </span>
                <h3 className="text-lg font-bold text-[#0F0F0F] mb-3">
                  {title}
                </h3>
                <p className="text-[#5A5A5A] text-sm leading-relaxed mb-5">
                  {description}
                </p>

                {/* Result */}
                <div className="bg-[#F7F7F7] rounded-xl px-4 py-3 mb-5">
                  <p className="text-xs text-[#5A5A5A] mb-0.5">Key Result</p>
                  <p className="text-sm font-bold text-[#0F0F0F]">{result}</p>
                </div>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-1.5">
                  {tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 bg-white border border-[#E8E8E8] text-[#5A5A5A] text-xs rounded-full"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
