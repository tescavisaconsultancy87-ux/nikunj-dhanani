"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Brain, Menu, X, PhoneCall } from "lucide-react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Services", href: "#services" },
    { label: "About", href: "#about" },
    { label: "Speaking", href: "#speaking" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass-nav shadow-sm py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 rounded-full bg-accent-navy flex items-center justify-center text-white shadow-md hover-lift">
              <Brain className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-primary-900 font-display">
                N. DHANANI
              </span>
              <span className="block text-[10px] font-bold text-primary-500 uppercase tracking-widest -mt-1 font-sans">
                Counselor & Speaker
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-primary-900/80 hover:text-accent-navy transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Call to Action */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="#contact"
              className="inline-flex items-center px-6 py-2.5 rounded-full bg-accent-navy hover:bg-accent-navy-hover text-white text-sm font-semibold transition-all duration-200 shadow-md hover-lift glow-btn"
            >
              <PhoneCall className="w-4 h-4 mr-2" />
              Book a Session
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-primary-900 hover:bg-primary-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass-card absolute top-full left-0 right-0 py-4 px-6 border-b shadow-lg animate-fade-in">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-base font-semibold text-primary-900 hover:text-accent-navy"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="inline-flex items-center justify-center px-5 py-3 rounded-full bg-accent-navy text-white text-base font-bold shadow-md"
            >
              <PhoneCall className="w-4 h-4 mr-2" />
              Book a Session
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
