"use client";
import { motion } from "framer-motion";
import {
  ClockIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline";

const values = [
  {
    icon: ClockIcon,
    title: "Save Time",
    description: "Automate repetitive tasks and reduce manual work.",
  },
  {
    icon: CurrencyDollarIcon,
    title: "Reduce Costs",
    description: "Do more with fewer resources and lower operational costs.",
  },
  {
    icon: ChartBarIcon,
    title: "Increase Sales",
    description: "Qualify leads, engage faster and close more deals.",
  },
  {
    icon: RocketLaunchIcon,
    title: "Scale Operations",
    description: "Build systems that scale with your business.",
  },
];

export default function Values() {
  return (
    <section className="w-full py-14 bg-[#F7F7F7] border-y border-[#E8E8E8]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {values.map(({ icon: Icon, title, description }, i) => (
            <motion.div
              key={title}
              className="flex items-start gap-4 p-6 bg-white rounded-xl border border-[#E8E8E8] shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div className="w-10 h-10 bg-[#FFF0EE] rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-[#F13223]" />
              </div>
              <div>
                <h3 className="font-bold text-[#0F0F0F] mb-1">{title}</h3>
                <p className="text-[#5A5A5A] text-sm leading-relaxed">
                  {description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
