"use client";

import Navbar from "./nav";
import ContactForm from "./contact";
import Footer from "./footer";
import { ChatBubbleLeftRightIcon, BoltIcon, CpuChipIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useState } from "react";
import Bot from "./bot";

export default function Home() {
  
  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const [botBox, setBotBox] = useState(false);

  return (
    <>
      <Navbar />

      <Image
        src="/bot.jpg"
        alt="Bot"
        width={50}
        height={50}
        className="fixed bottom-6 right-6 object-cover rounded-full cursor-pointer shadow-lg hover:scale-110 transition-transform duration-300"
        priority
        onClick={() => {setBotBox(true)}}
      />

      {/* Bot Box */}
      <Bot botBox={botBox} setBotBox={setBotBox} />

      {/* Hero Section */}
      <section id="home" className="w-full min-h-screen flex items-center justify-center overflow-hidden bg-black bg-cover bg-center" 
      style={{ backgroundImage: "url('/banner.jpg')" }}>

        {/* Hero Content */}
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 md:mb-8">
              Making AI <span className="text-orange-500">Easy</span>, Useful, and{" "}
              <span className="text-orange-500">Accessible</span> for Every Business
            </h1>

            <p className="text-lg md:text-2xl text-gray-300 mb-8 md:mb-12 max-w-3xl mx-auto font-light">
              Smart chatbots, automation workflows, and enterprise AI solutions tailored for your business.
            </p>

            <button
              onClick={() => scrollToSection('#contact')}
              className="px-8 md:px-12 py-4 md:py-5 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-base md:text-lg rounded-lg transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/50 transform hover:scale-105 cursor-pointer"
            >
              Get Started / Contact Us
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-orange-500 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-orange-500 rounded-full mt-2"></div>
          </div>
        </div>

      </section>

      {/* Products & Services Section */}
      <section id="products" className="w-full py-20 md:py-32 bg-black">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16 lg:px-20">

          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Products & <span className="text-orange-500">Services</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Comprehensive AI solutions designed to transform your business operations
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Chatbots */}
            <div className="group bg-gray-900 rounded-2xl p-8 border border-gray-800 hover:border-orange-500 transition hover:-translate-y-2 hover:shadow-orange-500/20 hover:shadow-2xl cursor-pointer">
              <div className="w-16 h-16 bg-orange-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-orange-500/30">
                <ChatBubbleLeftRightIcon className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-orange-500">
                Custom Sales & Service Chatbots
              </h3>
              <p className="text-gray-400 mb-6">
                Privacy-first, in-house deployed chatbots tailored for SMEs with full data control.
              </p>
              <button onClick={() => scrollToSection("#contact")} className="text-orange-500 font-semibold">
                Learn More →
              </button>
            </div>

            {/* Automation */}
            <div className="group bg-gray-900 rounded-2xl p-8 border border-gray-800 hover:border-orange-500 transition hover:-translate-y-2 hover:shadow-orange-500/20 hover:shadow-2xl cursor-pointer">
              <div className="w-16 h-16 bg-orange-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-orange-500/30">
                <BoltIcon className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-orange-500">
                Custom Automation Workflows
              </h3>
              <p className="text-gray-400 mb-6">
                Intelligent automation for document processing, extraction, and social media workflows.
              </p>
              <button onClick={() => scrollToSection("#contact")} className="text-orange-500 font-semibold">
                Learn More →
              </button>
            </div>

            {/* Enterprise LLMs */}
            <div className="group bg-gray-900 rounded-2xl p-8 border border-gray-800 hover:border-orange-500 transition hover:-translate-y-2 hover:shadow-orange-500/20 hover:shadow-2xl cursor-pointer">
              <div className="w-16 h-16 bg-orange-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-orange-500/30">
                <CpuChipIcon className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-orange-500">
                Enterprise In-House LLMs
              </h3>
              <p className="text-gray-400 mb-6">
                Secure, fine-tuned large language models optimized for internal enterprise use.
              </p>
              <button onClick={() => scrollToSection("#contact")} className="text-orange-500 font-semibold">
                Learn More →
              </button>
            </div>

          </div>

          {/* Pricing note */}
          <div className="mt-16 text-center">
            <p className="text-gray-400">
              Pricing available upon consultation.{" "}
              <button onClick={() => scrollToSection("#contact")} className="text-orange-500 underline">
                Contact us
              </button>
            </p>
          </div>

        </div>
      </section>


      {/* Vision & Work Section */}
      <section id="vision" className="w-full py-20 md:py-32 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16 lg:px-20">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Our Vision & <span className="text-orange-500">Work</span>
            </h2>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
              Empowering businesses with AI while maintaining full data control
            </p>
          </div>

          {/* Mission Statement */}
          <div className="max-w-4xl mx-auto mb-20">
            <div className="bg-black rounded-2xl p-8 md:p-12 border border-gray-800">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Our Mission
              </h3>
              <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
                Streamline business processes, enhance sales & service, and unlock enterprise AI power while maintaining full data control. 
                We believe AI should be accessible, secure, and tailored to your unique business needs.
              </p>
            </div>
          </div>

          {/* Case Studies / Projects */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Case Study 1 */}
            <div className="bg-black rounded-2xl p-8 border border-gray-800 hover:border-orange-500 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer">
              <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">SME Chatbots</h3>
              <p className="text-gray-400 leading-relaxed">
                Custom chatbot solutions deployed in-house for small and medium enterprises, ensuring data privacy and seamless customer interactions.
              </p>
            </div>

            {/* Case Study 2 */}
            <div className="bg-black rounded-2xl p-8 border border-gray-800 hover:border-orange-500 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer">
              <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Automation Solutions</h3>
              <p className="text-gray-400 leading-relaxed">
                Intelligent workflow automation for document processing, data extraction, and social media management, reducing manual work by up to 80%.
              </p>
            </div>

            {/* Case Study 3 */}
            <div className="bg-black rounded-2xl p-8 border border-gray-800 hover:border-orange-500 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer">
              <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🏢</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Enterprise LLMs</h3>
              <p className="text-gray-400 leading-relaxed">
                Large-scale language models fine-tuned for enterprise use, providing secure, high-performance AI capabilities for internal operations.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ContactForm />

      <Footer />
    
    </>
  );
}
