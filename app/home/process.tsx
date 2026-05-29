"use client";
import { motion } from "framer-motion";
import {
  MagnifyingGlassIcon,
  PencilSquareIcon,
  CpuChipIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline";

const steps = [
  {
    number: "01",
    icon: MagnifyingGlassIcon,
    title: "Understand the Problem",
    description:
      "We deeply analyse your business, workflows, and pain points to identify exactly where AI creates the most impact.",
  },
  {
    number: "02",
    icon: PencilSquareIcon,
    title: "Design the System",
    description:
      "We architect a tailored solution — no templates, no generic tools. Every system is designed around how you operate.",
  },
  {
    number: "03",
    icon: CpuChipIcon,
    title: "Build & Integrate",
    description:
      "We build and integrate directly into your workflows, tools, and teams with minimal disruption.",
  },
  {
    number: "04",
    icon: ArrowTrendingUpIcon,
    title: "Optimise & Scale",
    description:
      "We monitor performance, refine the system, and help you scale as your business grows.",
  },
];

export default function Process() {
  return (
    <section id="process" className="w-full py-24 bg-[#F7F7F7]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-[#F13223] text-xs font-semibold uppercase tracking-widest">
            How We Work
          </span>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold text-[#0F0F0F]">
            Our <span className="text-[#F13223]">Process</span>
          </h2>
          <p className="mt-4 text-[#5A5A5A] text-lg max-w-xl mx-auto">
            A structured, transparent approach to building AI systems that
            actually deliver.
          </p>
        </motion.div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 relative">
          {/* Connector line (desktop only) */}
          <div className="hidden lg:block absolute top-[2.25rem] left-[14%] right-[14%] h-px bg-[#E8E8E8]" />

          {steps.map(({ number, icon: Icon, title, description }, i) => (
            <motion.div
              key={number}
              className="relative z-10 bg-white border border-[#E8E8E8] rounded-2xl p-6 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.12 }}
            >
              {/* Step number + icon */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-[#F13223] rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-3xl font-extrabold text-[#E8E8E8] leading-none">
                  {number}
                </span>
              </div>
              <h3 className="font-bold text-[#0F0F0F] mb-2">{title}</h3>
              <p className="text-[#5A5A5A] text-sm leading-relaxed">
                {description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
