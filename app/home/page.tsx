"use client";

import Image from "next/image";
import Navbar from "./nav";
import Projects from "./projects";
import Bot from "./bot";
import ContactForm from "./contact";
import { useState } from "react";

export default function Home() {
  
  const techStack = [
    { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
    { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
    { name: "TensorFlow", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg" },
    { name: "Flutter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg" },
    { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" },
    { name: "Angular", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angularjs/angularjs-original.svg" },
  ]

  const companies = [
    { name: "OSOM", icon: "/OSOM.png" },
    { name: "APSPACE", icon: "/APSPACE.svg" },
    { name: "Beyond", icon: "/Beyond.avif" },
  ];


  const [botBox, setBotBox] = useState(false);
  
  return (
    
    <>
      <Navbar />

      <div className="relative w-full h-102 md:h-screen">
        
        <Image
          src="/banner.png"
          alt="Banner"
          fill
          className="object-cover grayscale"
          priority
        />
        
        {/* Dark Overlay Gradient */}
        <div className="absolute inset-0 bg-linear-to-r from-black via-black to-transparent opacity-40"></div>

        {/* Hero Text Content */}
        <div className="absolute inset-0 flex flex-col justify-start md:justify-start items-start px-6 sm:px-10 md:px-16 lg:px-20 pt-18 md:pt-45">
          <div className="max-w-2xl">
            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-3 md:mb-6 tracking-tighter">
              Hello, I am <span className="text-orange-500">Mustansir</span>
            </h1>

            {/* Subheading with Details */}
            <p className="text-sm sm:text-base md:text-xl text-gray-200 font-bold md:font-light tracking-wide mb-6 md:mb-8 max-w-sm md:max-w-lg leading-relaxed block">
              An AI/ML enthusiast and Full Stack developer. I specialize in building scalable AI powered apps and services, fine-tuning LLMs, and solving complex problems with clean, practical code.
            </p>

            {/* Tech Stack Icons */}
            <ul className="flex gap-4 mb-6 md:mb-8">
              {techStack.map((tech) => (
                <li key={tech.name} className="flex items-center justify-center">
                  <Image
                    src={tech.icon}
                    alt={tech.name}
                    width={40}
                    height={40}
                    className="hover:scale-110 transition-transform duration-300"
                    title={tech.name}
                  />
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <button className="px-6 md:px-8 py-2 md:py-3 bg-white hover:bg-gray-100 text-black font-semibold text-sm md:text-base rounded-lg transition-all duration-300 hover:shadow-lg transform hover:scale-105 drop-shadow-md">
              <a href="#Projects">Explore My Work</a>
            </button>
          </div>
        </div>

      </div>

      {/* Companies I have Worked With */}
      <section className="w-full py-10 md:py-15 bg-linear-to-b from-white via-gray-200 to-white" id="Projects">
        
        <div className="max-w-10xl mx-auto px-6 sm:px-10 md:px-16 lg:px-20">
          <div className="mb-10 md:mb-10">
            <h2 className="text-4xl text-center md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              Building with <span className="text-orange-500">Great</span> Teams
            </h2>
            <p className="text-gray-600 text-lg md:text-xl mt-6 max-w-3xl font-light text-center mx-auto">
              Behind every great project are even greater teams. Here are the amazing companies and collaborators I have had the privilege to build with and learn from.
            </p>
          </div>
          
          {/* Companies Grid */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-12 lg:gap-16">
            {companies.map((company, index) => (
              <div key={index} className="flex justify-center items-center">
                <Image
                  src={company.icon}
                  alt={company.name}
                  width={120}
                  height={60}
                  className="object-contain grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            ))}
          </div>
          
        </div>
      </section>

      <Projects/>

      <ContactForm/>

      <Image
        src="/bot.jpg"
        alt="Bot"
        width={50}
        height={50}
        className="fixed bottom-6 right-6 object-cover rounded-full cursor-pointer shadow-lg hover:scale-110 transition-transform duration-300"
        priority
        onClick={() => {setBotBox(true)}}
      />
    
      <Bot botBox={botBox} setBotBox={setBotBox} />

    </>
  );
}