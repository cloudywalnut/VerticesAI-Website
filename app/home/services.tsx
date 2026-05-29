"use client";
import { motion } from "framer-motion";
import {
  ChatBubbleLeftRightIcon, BoltIcon, CodeBracketIcon, GlobeAltIcon,
  UserCircleIcon, MegaphoneIcon, CpuChipIcon, BuildingOffice2Icon,
} from "@heroicons/react/24/outline";

const services = [
  { icon: ChatBubbleLeftRightIcon, title: "AI Chatbots", description: "Smart chatbots that engage, qualify and convert leads 24/7." },
  { icon: BoltIcon, title: "Workflow Automation", description: "Automate repetitive tasks and streamline your entire workflow." },
  { icon: CodeBracketIcon, title: "Custom Software", description: "Powerful custom platforms built to solve your unique business problems." },
  { icon: GlobeAltIcon, title: "Business Websites", description: "Modern, fast and conversion-focused websites that build trust and drive growth." },
  { icon: UserCircleIcon, title: "Portfolio Websites", description: "Showcase your work beautifully with a premium personal portfolio." },
  { icon: MegaphoneIcon, title: "Landing Pages", description: "High-converting landing pages designed to maximise campaign results." },
  { icon: CpuChipIcon, title: "AI Consulting", description: "Strategic AI guidance to identify where AI creates the most business value." },
  { icon: BuildingOffice2Icon, title: "Enterprise AI Systems", description: "Scalable AI infrastructure for large organisations requiring robust systems." },
];

export default function Services() {
  return (
    <section id="services" className="w-full py-24 bg-canvas">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-accent text-xs font-semibold uppercase tracking-widest">What We Do</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold text-ink">
            Services That Drive <span className="text-accent">Real Results</span>
          </h2>
          <p className="mt-4 text-ink-2 text-lg max-w-2xl mx-auto">
            End-to-end AI, automation and software solutions designed around your business.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map(({ icon: Icon, title, description }, i) => (
            <motion.div
              key={title}
              className="group p-6 bg-canvas border border-edge rounded-xl hover:border-accent/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (i % 4) * 0.08 }}
            >
              <div className="w-12 h-12 bg-surface group-hover:bg-tint rounded-xl flex items-center justify-center mb-4 transition-colors duration-300">
                <Icon className="w-6 h-6 text-ink-2 group-hover:text-accent transition-colors duration-300" />
              </div>
              <h3 className="font-bold text-ink mb-2">{title}</h3>
              <p className="text-ink-2 text-sm leading-relaxed mb-4">{description}</p>
              <span className="inline-flex items-center gap-1.5 text-accent text-sm font-semibold group-hover:gap-2.5 transition-all duration-200">
                Learn more
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
