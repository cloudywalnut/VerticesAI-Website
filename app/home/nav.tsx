"use client";
import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
  const navItems = [
    { name: 'About', href: '#' },
    { name: 'Projects', href: '#Projects' },
    { name: 'Contact', href: '#Contact' }
  ];

  const socialIcons = [
    { name: "Github", icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/github.svg", url: "https://github.com/cloudywalnut" },
    { name: "Linkedin", icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/linkedin.svg", url: "https://www.linkedin.com/in/mustansir-muhammad-860a19242/" },
    { name: "Whatsapp", icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/whatsapp.svg", url: "http://Wa.me/60146231552" },
    { name: "Instagram", icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/instagram.svg", url: "https://www.instagram.com/mustansirmuhammad_/" },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="absolute inset-x-0 top-4 sm:top-6 md:top-8 z-50 px-6 sm:px-10 md:px-16 lg:px-20 flex justify-between items-center">
      
      {/* Left Nav Links */}
      <ul className="hidden md:flex md:gap-12">
        {navItems.map((item) => (
          <li key={item.name}>
            <a
              href={item.href}
              className="text-white text-sm sm:text-base md:text-xl font-bold tracking-wide uppercase relative group transition-all duration-300 hover:text-orange-400 drop-shadow-lg hover:drop-shadow-xl"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-1 bg-linear-to-r from-orange-400 to-orange-500 group-hover:w-full transition-all duration-500 ease-out drop-shadow-md"></span>
            </a>
          </li>
        ))}
      </ul>

      {/* Mobile Menu Button */}
      <button 
        className="flex flex-col md:hidden gap-1 w-6 h-6 justify-center items-center group"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle menu"
      >
        <span className={`bg-white w-6 h-0.5 transition-all duration-300 ${
          isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
        }`}></span>
        <span className={`bg-white w-6 h-0.5 transition-all duration-300 ${
          isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
        }`}></span>
        <span className={`bg-white w-6 h-0.5 transition-all duration-300 ${
          isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
        }`}></span>
      </button>

      {/* To Display Links on Small Screens */}
      { isMobileMenuOpen && (
        <div className="absolute md:hidden top-full left-4 right-4 mt-5 bg-white p-5 rounded-lg shadow-xl border border-gray-200 z-50">
          <ul className="flex flex-col gap-3">
            {navItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="text-gray-900 text-xl font-bold uppercase hover:text-orange-500 transition-colors duration-300 block py-3 px-4 rounded-lg hover:bg-orange-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}


      {/* Right Social Icons */}
      <ul className="flex gap-4 sm:gap-6 md:gap-8">
        {socialIcons.map((item) => (
          <li key={item.name}>
            <a href={item.url} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform duration-300">
              <Image src={item.icon} alt={item.name} width={24} height={24} />
            </a>
          </li>
        ))}
      </ul>

    </nav>
  );
}
