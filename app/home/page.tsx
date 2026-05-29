"use client";

import { useState } from "react";
import Image from "next/image";

import Navbar from "./nav";
import Hero from "./hero";
import Values from "./values";
import Services from "./services";
import ProblemSolution from "./problem-solution";
import Portfolio from "./portfolio";
import Process from "./process";
import About from "./about";
import CTA from "./cta";
import ContactForm from "./contact";
import Footer from "./footer";
import Bot from "./bot";

export default function Home() {
  const [botBox, setBotBox] = useState(false);

  return (
    <>
      <Navbar />

      {/* AI chat trigger — hidden while chat is open */}
      {!botBox && (
        <Image
          src="/bot.jpg"
          alt="AI Chat"
          width={52}
          height={52}
          className="fixed bottom-6 right-6 object-cover rounded-full cursor-pointer shadow-lg hover:scale-110 transition-transform duration-300 z-40 border-2 border-[#F13223]"
          priority={false}
          onClick={() => setBotBox(true)}
        />
      )}
      <Bot botBox={botBox} setBotBox={setBotBox} />

      <main>
        <Hero />
        <Values />
        <Services />
        <ProblemSolution />
        <Portfolio />
        <Process />
        <About />
        <CTA />
        <ContactForm />
      </main>

      <Footer />
    </>
  );
}
