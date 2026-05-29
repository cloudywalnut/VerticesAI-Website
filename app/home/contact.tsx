"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { EnvelopeIcon, CheckCircleIcon } from "@heroicons/react/24/outline";

interface FormData {
  name: string;
  email: string;
  company: string;
  message: string;
}

interface FormErrors {
  name: string;
  email: string;
  message: string;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputClass =
  "w-full px-4 py-3 bg-white border rounded-lg text-[#0F0F0F] placeholder-[#5A5A5A]/50 focus:outline-none focus:ring-2 focus:ring-[#F13223]/30 focus:border-[#F13223] transition-all duration-200 text-sm";

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      valid = false;
    }
    if (!formData.message.trim() || formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters";
      valid = false;
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
      <section id="contact" className="w-full py-24 bg-white">
        <div className="max-w-2xl mx-auto px-6 lg:px-10">
          <motion.div
            className="border border-[#E8E8E8] rounded-2xl p-12 text-center"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className="w-16 h-16 bg-[#FFF0EE] rounded-full flex items-center justify-center mx-auto mb-5">
              <CheckCircleIcon className="w-8 h-8 text-[#F13223]" />
            </div>
            <h2 className="text-2xl font-bold text-[#0F0F0F] mb-3">
              Message Received!
            </h2>
            <p className="text-[#5A5A5A]">
              Thanks for reaching out. We&apos;ll get back to you shortly.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="w-full py-24 bg-white">
      <div className="max-w-2xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-[#F13223] text-xs font-semibold uppercase tracking-widest">
            Contact
          </span>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold text-[#0F0F0F]">
            Let&apos;s <span className="text-[#F13223]">Talk</span>
          </h2>
          <p className="mt-4 text-[#5A5A5A] text-lg">
            Ready to transform your business with AI? Tell us about your
            project.
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="bg-white border border-[#E8E8E8] rounded-2xl p-8 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-[#0F0F0F] mb-2"
              >
                Name <span className="text-[#F13223]">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                className={`${inputClass} ${
                  errors.name
                    ? "border-red-400"
                    : "border-[#E8E8E8]"
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-[#0F0F0F] mb-2"
              >
                Email <span className="text-[#F13223]">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className={`${inputClass} ${
                  errors.email
                    ? "border-red-400"
                    : "border-[#E8E8E8]"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>
          </div>

          {/* Company */}
          <div className="mb-5">
            <label
              htmlFor="company"
              className="block text-sm font-semibold text-[#0F0F0F] mb-2"
            >
              Company{" "}
              <span className="text-[#5A5A5A] font-normal">(optional)</span>
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Your company name"
              className={`${inputClass} border-[#E8E8E8]`}
            />
          </div>

          {/* Message */}
          <div className="mb-7">
            <label
              htmlFor="message"
              className="block text-sm font-semibold text-[#0F0F0F] mb-2"
            >
              Message <span className="text-[#F13223]">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              placeholder="Tell us about your project, requirements, or how we can help..."
              className={`${inputClass} resize-none ${
                errors.message ? "border-red-400" : "border-[#E8E8E8]"
              }`}
            />
            {errors.message && (
              <p className="text-red-500 text-xs mt-1">{errors.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-4 bg-[#F13223] hover:bg-[#d42a1d] text-white font-semibold rounded-lg transition-colors duration-200 cursor-pointer text-base"
          >
            Send Message
          </button>
        </motion.form>

        {/* Direct contact */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <p className="text-[#5A5A5A] text-sm mb-3">Or reach out directly:</p>
          <a
            href="mailto:info.vertices.ai@gmail.com"
            className="inline-flex items-center gap-2 text-[#0F0F0F] hover:text-[#F13223] font-medium transition-colors duration-200 text-sm"
          >
            <EnvelopeIcon className="w-4 h-4" />
            info.vertices.ai@gmail.com
          </a>
        </motion.div>
      </div>
    </section>
  );
}
