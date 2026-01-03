"use client";

import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: ""
  });
  
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    company: "",
    message: ""
  });

  const [submitted, setSubmitted] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  // Need to Add Actual Form Submission Logic Here that Submit Forms to the Right Place
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;
    const newErrors = { name: "", email: "", company: "", message: "" };

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      valid = false;
    }

    // Company validation (optional but recommended)
    if (!formData.company.trim()) {
      newErrors.company = "Company name is recommended";
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
      valid = false;
    } else if (formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters long";
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      // Handle form submission here - make a post request to email service
      console.log("Form submitted:", formData);
      setSubmitted(true);
      setFormData({ name: "", email: "", company: "", message: "" });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    }
  };

  if (submitted) {
    return (
      <section className="w-full py-20 md:py-32 bg-black" id="contact">
        <div className="max-w-4xl mx-auto px-6 sm:px-10 md:px-16 lg:px-20">
          <div className="bg-gray-900 rounded-2xl p-12 border border-gray-800 text-center">
            <div className="w-20 h-20 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Thank You!
            </h2>
            <p className="text-gray-300 text-lg md:text-xl">
              We have received your message and will get back to you soon.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-20 md:py-32 bg-black" id="contact">
      <div className="max-w-4xl mx-auto px-6 sm:px-10 md:px-16 lg:px-20">
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Contact <span className="text-orange-500">Us</span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl mt-6 max-w-2xl mx-auto">
            Ready to transform your business with AI? Lets discuss your project.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-gray-900 rounded-2xl shadow-2xl p-8 md:p-10 border border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-gray-200 text-sm font-medium mb-2">
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-black border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 ${
                  errors.name ? 'border-red-500' : 'border-gray-700'
                }`}
                placeholder="Your full name"
              />
              {errors.name && (
                <p className="text-red-400 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-gray-200 text-sm font-medium mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-black border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 ${
                  errors.email ? 'border-red-500' : 'border-gray-700'
                }`}
                placeholder="your.email@example.com"
              />
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">{errors.email}</p>
              )}
            </div>
          </div>

          {/* Company Field */}
          <div className="mb-6">
            <label htmlFor="company" className="block text-gray-200 text-sm font-medium mb-2">
              Company
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-black border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 ${
                errors.company ? 'border-yellow-500' : 'border-gray-700'
              }`}
              placeholder="Your company name"
            />
            {errors.company && (
              <p className="text-yellow-400 text-sm mt-1">{errors.company}</p>
            )}
          </div>

          {/* Message Field */}
          <div className="mb-8">
            <label htmlFor="message" className="block text-gray-200 text-sm font-medium mb-2">
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={6}
              className={`w-full px-4 py-3 bg-black border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 resize-none ${
                errors.message ? 'border-red-500' : 'border-gray-700'
              }`}
              placeholder="Tell us about your project, requirements, or how we can help..."
            />
            {errors.message && (
              <p className="text-red-400 text-sm mt-1">{errors.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-lg rounded-lg transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-orange-500/50"
          >
            Start Your AI Project
          </button>
        </form>

        {/* Contact Info */}
        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-4">Or reach out directly:</p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center text-gray-300">
            <a href="mailto:contact@verticesai.com" className="hover:text-orange-500 transition-colors flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              contact@verticesai.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
