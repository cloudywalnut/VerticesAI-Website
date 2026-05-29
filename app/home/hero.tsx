"use client";
import { motion, type Variants } from "framer-motion";
import { ArrowRightIcon, UserGroupIcon, BoltIcon, ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

const stats = [
  { label: "Total Leads", value: "2,543", change: "+32%" },
  { label: "Conversations", value: "845", change: "+24%" },
  { label: "Conversion Rate", value: "24.6%", change: "+18%" },
  { label: "Revenue", value: "$84,320", change: "+28%" },
];

const sidebarItems = [
  { label: "Dashboard", active: true },
  { label: "Leads" },
  { label: "Automations" },
  { label: "Chatbot" },
  { label: "Analytics" },
  { label: "Settings" },
];

const flowSteps = [
  { icon: UserGroupIcon, title: "Website Visitor", sub: "New Lead" },
  { icon: ChatBubbleLeftRightIcon, title: "AI Chatbot", sub: "Qualify Lead" },
  { icon: BoltIcon, title: "Automation", sub: "Follow Up" },
];

export default function Hero() {
  const scrollTo = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <section
      id="home"
      className="w-full min-h-screen bg-white flex items-center pt-20"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">

        {/* ── Left: Copy ── */}
        <div>
          <motion.div
            initial="hidden"
            animate="visible"
            custom={0}
            variants={fadeUp}
          >
            <span className="inline-flex items-center px-3 py-1.5 bg-[#FFF0EE] text-[#F13223] text-xs font-semibold uppercase tracking-widest rounded-full border border-[#F13223]/20 mb-6">
              AI Systems Built for Real Business Impact
            </span>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-5xl xl:text-6xl font-bold text-[#0F0F0F] leading-[1.1] mb-6"
            initial="hidden"
            animate="visible"
            custom={1}
            variants={fadeUp}
          >
            AI Systems &amp;{" "}
            <span className="block">Custom Software</span>
            <span className="text-[#F13223] block">Built Around</span>
            <span className="block">Your Business</span>
          </motion.h1>

          <motion.p
            className="text-[#5A5A5A] text-lg leading-relaxed mb-8 max-w-lg"
            initial="hidden"
            animate="visible"
            custom={2}
            variants={fadeUp}
          >
            We build AI chatbots, automate workflows, create custom software
            and high-performing websites tailored to the way you operate.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4 mb-10"
            initial="hidden"
            animate="visible"
            custom={3}
            variants={fadeUp}
          >
            <button
              onClick={() => scrollTo("#contact")}
              className="flex items-center gap-2 px-6 py-3.5 bg-[#F13223] hover:bg-[#d42a1d] text-white font-semibold rounded-lg transition-colors duration-200 cursor-pointer"
            >
              Book a Consultation <ArrowRightIcon className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollTo("#services")}
              className="flex items-center gap-2 px-6 py-3.5 border border-[#E8E8E8] hover:border-[#0F0F0F] text-[#0F0F0F] font-semibold rounded-lg transition-colors duration-200 cursor-pointer"
            >
              View Services <ArrowRightIcon className="w-4 h-4" />
            </button>
          </motion.div>

          <motion.div
            className="flex items-center gap-3"
            initial="hidden"
            animate="visible"
            custom={4}
            variants={fadeUp}
          >
            {/* Replace later with images */}
            <div className="flex -space-x-2">
              {["bg-slate-400", "bg-stone-500", "bg-zinc-600", "bg-gray-400"].map(
                (c, i) => (
                  <div
                    key={i}
                    className={`w-8 h-8 rounded-full ${c} border-2 border-white`}
                  />
                )
              )}
            </div>
            <p className="text-sm text-[#5A5A5A]">
              Trusted by businesses worldwide to{" "}
              <span className="text-[#F13223] font-semibold">
                automate, scale &amp; grow.
              </span>
            </p>
          </motion.div>
        </div>

        {/* ── Right: Dashboard Mockup ── */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
        >
          {/* Dashboard card */}
          <div className="bg-white rounded-2xl shadow-2xl border border-[#E8E8E8] overflow-hidden">
            <div className="flex">
              {/* Sidebar */}
              <div className="w-32 bg-[#F7F7F7] border-r border-[#E8E8E8] p-3 flex-shrink-0">
                <div className="flex items-center gap-1.5 mb-4 px-1">
                  <div className="w-4 h-4 bg-[#F13223] rounded-sm" />
                  <span className="text-[8px] font-bold text-[#0F0F0F] uppercase tracking-wider">
                    Overview
                  </span>
                </div>
                {sidebarItems.map(({ label, active }) => (
                  <div
                    key={label}
                    className={`flex items-center gap-2 px-2 py-1.5 rounded mb-0.5 text-[9px] font-medium ${
                      active
                        ? "bg-white text-[#F13223] shadow-sm"
                        : "text-[#5A5A5A]"
                    }`}
                  >
                    <div
                      className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                        active ? "bg-[#F13223]" : "bg-[#E8E8E8]"
                      }`}
                    />
                    {label}
                  </div>
                ))}
              </div>

              {/* Main panel */}
              <div className="flex-1 p-4 min-w-0">
                {/* Stats row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                  {stats.map(({ label, value, change }) => (
                    <div key={label} className="bg-[#F7F7F7] rounded-lg p-2">
                      <p className="text-[7px] text-[#5A5A5A] mb-0.5 truncate">
                        {label}
                      </p>
                      <p className="text-[11px] font-bold text-[#0F0F0F]">
                        {value}
                      </p>
                      <p className="text-[7px] text-emerald-500 font-semibold">
                        {change}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Charts */}
                <div className="grid grid-cols-3 gap-2">
                  {/* Line chart */}
                  <div className="col-span-2 bg-[#F7F7F7] rounded-lg p-2">
                    <p className="text-[8px] font-semibold text-[#0F0F0F] mb-1">
                      Performance
                    </p>
                    <svg viewBox="0 0 200 56" className="w-full h-10">
                      <defs>
                        <linearGradient id="perfGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#F13223" stopOpacity="0.15" />
                          <stop offset="100%" stopColor="#F13223" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M0,48 L30,38 L60,42 L90,22 L120,28 L150,12 L180,18 L200,8"
                        fill="none"
                        stroke="#F13223"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M0,48 L30,38 L60,42 L90,22 L120,28 L150,12 L180,18 L200,8 L200,56 L0,56Z"
                        fill="url(#perfGrad)"
                      />
                      {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((m, i) => (
                        <text
                          key={m}
                          x={i * 38 + 2}
                          y={55}
                          fontSize="5"
                          fill="#5A5A5A"
                        >
                          {m}
                        </text>
                      ))}
                    </svg>
                  </div>

                  {/* Donut chart */}
                  <div className="bg-[#F7F7F7] rounded-lg p-2">
                    <p className="text-[8px] font-semibold text-[#0F0F0F] mb-1">
                      Top Channels
                    </p>
                    <div className="flex flex-col items-center">
                      <svg viewBox="0 0 56 56" className="w-10 h-10">
                        <circle cx="28" cy="28" r="18" fill="none" stroke="#F13223" strokeWidth="7" strokeDasharray="70 113" strokeDashoffset="-14" />
                        <circle cx="28" cy="28" r="18" fill="none" stroke="#0F0F0F" strokeWidth="7" strokeDasharray="32 151" strokeDashoffset="-84" />
                        <circle cx="28" cy="28" r="18" fill="none" stroke="#5A5A5A" strokeWidth="7" strokeDasharray="24 159" strokeDashoffset="-116" />
                        <circle cx="28" cy="28" r="18" fill="none" stroke="#E8E8E8" strokeWidth="7" strokeDasharray="14 169" strokeDashoffset="-140" />
                      </svg>
                      <div className="flex flex-col gap-0.5 w-full mt-1">
                        {[
                          ["Website", "#F13223"],
                          ["Chatbot", "#0F0F0F"],
                          ["Automation", "#5A5A5A"],
                          ["Other", "#E8E8E8"],
                        ].map(([label, color]) => (
                          <div key={label} className="flex items-center gap-1">
                            <div
                              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                              style={{ background: color }}
                            />
                            <span className="text-[6px] text-[#5A5A5A]">
                              {label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Flow steps */}
          <div className="mt-4 flex items-center gap-2">
            {flowSteps.map(({ icon: Icon, title, sub }, i) => (
              <div key={title} className="flex items-center gap-2 flex-1 min-w-0">
                <div className="flex-1 bg-white rounded-xl border border-[#E8E8E8] shadow-sm p-3 text-center">
                  <div className="w-8 h-8 bg-[#FFF0EE] rounded-lg flex items-center justify-center mx-auto mb-1.5">
                    <Icon className="w-4 h-4 text-[#F13223]" />
                  </div>
                  <p className="text-[10px] font-bold text-[#0F0F0F] truncate">
                    {title}
                  </p>
                  <p className="text-[9px] text-[#5A5A5A]">{sub}</p>
                </div>
                {i < flowSteps.length - 1 && (
                  <ArrowRightIcon className="w-4 h-4 text-[#F13223] flex-shrink-0" />
                )}
              </div>
            ))}
          </div>

          {/* Decorative blobs */}
          <div className="absolute -top-6 -right-6 w-28 h-28 bg-[#FFF0EE] rounded-full -z-10 blur-xl opacity-70" />
          <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-[#F7F7F7] rounded-full -z-10" />
        </motion.div>
      </div>
    </section>
  );
}
