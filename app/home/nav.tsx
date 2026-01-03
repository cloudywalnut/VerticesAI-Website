"use client";
import { useState, useEffect } from "react";

export default function Navbar() {
  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Products & Services', href: '#products' },
    { name: 'Our Vision & Work', href: '#vision' },
    { name: 'Contact Us', href: '#contact' }
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16 lg:px-20 flex justify-between items-center h-20">
        
        {/* Logo */}
        <a 
          href="#home" 
          onClick={(e) => handleNavClick(e, '#home')}
          className="text-2xl md:text-3xl font-bold text-white hover:text-orange-500 transition-colors duration-300"
        >
          Vertices <span className="text-orange-500">AI</span>
        </a>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex md:gap-8 lg:gap-12">
          {navItems.map((item) => (
            <li key={item.name}>
              <a
                href={item.name === 'Home' ? '#home' : item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-white text-sm lg:text-base font-medium tracking-wide relative group transition-all duration-300 hover:text-orange-500"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300 ease-out"></span>
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button 
          className="flex flex-col md:hidden gap-1.5 w-6 h-6 justify-center items-center group"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`bg-white w-6 h-0.5 transition-all duration-300 ${
            isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
          }`}></span>
          <span className={`bg-white w-6 h-0.5 transition-all duration-300 ${
            isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
          }`}></span>
          <span className={`bg-white w-6 h-0.5 transition-all duration-300 ${
            isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
          }`}></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/98 backdrop-blur-md border-t border-gray-800">
          <ul className="flex flex-col px-6 py-4 gap-1">
            {navItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.name === 'Home' ? '#home' : item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-white text-lg font-medium uppercase hover:text-orange-500 transition-colors duration-300 block py-3 px-4 rounded-lg hover:bg-gray-900"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
