"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { EnvelopeIcon, CheckCircleIcon } from "@heroicons/react/24/outline";

interface FormData { name: string; email: string; company: string; message: string; }
interface FormErrors { name: string; email: string; message: string; }

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputBase =
  "w-full px-4 py-3 bg-canvas border rounded-lg text-ink placeholder-ink-2/50 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all duration-200 text-sm";

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({ name: "", email: "", company: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: FormErrors = { name: "", email: "", message: "" };
    let valid = true;

    if (!formData.name.trim()) { newErrors.name = "Name is required"; valid = false; }
    if (!formData.email.trim()) { newErrors.email = "Email is required"; valid = false; }
    else if (!emailRegex.test(formData.email)) { newErrors.email = "Please enter a valid email"; valid = false; }
    if (!formData.message.trim() || formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters"; valid = false;
    }

    setErrors(newErrors);
    if (valid) {
      console.log("Form submitted:", formData);
      setSubmitted(true);
      setFormData({ name: "", email: "", company: "", message: "" });
      setTimeout(() => setSubmitted(false), 6000);
    }
  };

  if (submitted) {
    return (
      <section id="contact" className="w-full py-24 bg-canvas">
        <div className="max-w-2xl mx-auto px-6 lg:px-10">
          <motion.div
            className="border border-edge rounded-2xl p-12 text-center"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className="w-16 h-16 bg-tint rounded-full flex items-center justify-center mx-auto mb-5">
              <CheckCircleIcon className="w-8 h-8 text-accent" />
            </div>
            <h2 className="text-2xl font-bold text-ink mb-3">Message Received!</h2>
            <p className="text-ink-2">Thanks for reaching out. We&apos;ll get back to you shortly.</p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="w-full py-24 bg-canvas">
      <div className="max-w-2xl mx-auto px-6 lg:px-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-accent text-xs font-semibold uppercase tracking-widest">Contact</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold text-ink">
            Let&apos;s <span className="text-accent">Talk</span>
          </h2>
          <p className="mt-4 text-ink-2 text-lg">
            Ready to transform your business with AI? Tell us about your project.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="bg-canvas border border-edge rounded-2xl p-8 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-ink mb-2">
                Name <span className="text-accent">*</span>
              </label>
              <input
                type="text" id="name" name="name" value={formData.name}
                onChange={handleChange} placeholder="Your full name"
                className={`${inputBase} ${errors.name ? "border-red-400" : "border-edge"}`}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-ink mb-2">
                Email <span className="text-accent">*</span>
              </label>
              <input
                type="email" id="email" name="email" value={formData.email}
                onChange={handleChange} placeholder="your@email.com"
                className={`${inputBase} ${errors.email ? "border-red-400" : "border-edge"}`}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
          </div>

          <div className="mb-5">
            <label htmlFor="company" className="block text-sm font-semibold text-ink mb-2">
              Company <span className="text-ink-2 font-normal">(optional)</span>
            </label>
            <input
              type="text" id="company" name="company" value={formData.company}
              onChange={handleChange} placeholder="Your company name"
              className={`${inputBase} border-edge`}
            />
          </div>

          <div className="mb-7">
            <label htmlFor="message" className="block text-sm font-semibold text-ink mb-2">
              Message <span className="text-accent">*</span>
            </label>
            <textarea
              id="message" name="message" value={formData.message}
              onChange={handleChange} rows={5}
              placeholder="Tell us about your project, requirements, or how we can help..."
              className={`${inputBase} resize-none ${errors.message ? "border-red-400" : "border-edge"}`}
            />
            {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-accent hover:bg-[#d42a1d] text-white font-semibold rounded-lg transition-colors duration-200 cursor-pointer text-base"
          >
            Send Message
          </button>
        </motion.form>

        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <p className="text-ink-2 text-sm mb-3">Or reach out directly:</p>
          <a
            href="mailto:info.vertices.ai@gmail.com"
            className="inline-flex items-center gap-2 text-ink hover:text-accent font-medium transition-colors duration-200 text-sm"
          >
            <EnvelopeIcon className="w-4 h-4" />
            info.vertices.ai@gmail.com
          </a>
        </motion.div>
      </div>
    </section>
  );
}
