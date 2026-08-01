"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, PhoneCall, ChevronDown } from "lucide-react";
import LeafMotif from "@/components/LeafMotif";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const serviceSubpages = [
    { label: "Overview — All Services", href: "/services" },
    { label: "Parenting Coaching", href: "/services/parenting-coaching" },
    { label: "Relationship Repair", href: "/services/relationship-repair" },
    { label: "Counselling & Life Coaching", href: "/services/counselling-life-coaching" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-md py-3 border-b border-[#0B3C2D]/10" : "bg-[#F8F4EE] py-4 border-b border-[#0B3C2D]/10"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-full bg-[#0B3C2D] flex items-center justify-center text-white shadow-md hover-lift">
              <LeafMotif className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-[#0B3C2D] font-serif-display block">
                N. DHANANI
              </span>
              <span className="block text-[10px] font-bold text-ink-muted uppercase tracking-widest -mt-1 font-sans">
                Counselor & Life Coach
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-7">
            <Link
              href="/"
              className="text-sm font-medium text-deep-ink hover:text-[#0B3C2D] transition-colors"
            >
              Home
            </Link>

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <Link
                href="/services"
                className="inline-flex items-center text-sm font-medium text-deep-ink hover:text-[#0B3C2D] transition-colors py-2"
              >
                Services
                <ChevronDown className="w-3.5 h-3.5 ml-1 text-ink-muted group-hover:text-[#0B3C2D]" />
              </Link>

              {isServicesOpen && (
                <div className="absolute top-full left-0 w-64 bg-white rounded-xl shadow-xl border border-[#0B3C2D]/10 py-2 animate-fade-in">
                  {serviceSubpages.map((sub) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      className="block px-4 py-2.5 text-xs font-semibold text-deep-ink hover:bg-[#F8F4EE] hover:text-[#0B3C2D] transition-colors"
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/about"
              className="text-sm font-medium text-deep-ink hover:text-[#0B3C2D] transition-colors"
            >
              About
            </Link>

            <Link
              href="/speaking"
              className="text-sm font-medium text-deep-ink hover:text-[#0B3C2D] transition-colors"
            >
              Speaking
            </Link>

            <Link
              href="/resources"
              className="text-sm font-medium text-deep-ink hover:text-[#0B3C2D] transition-colors"
            >
              Resources
            </Link>

            <Link
              href="/faq"
              className="text-sm font-medium text-deep-ink hover:text-[#0B3C2D] transition-colors"
            >
              FAQ
            </Link>
          </nav>

          {/* Primary CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/contact#booking"
              className="inline-flex items-center px-5 py-2.5 rounded-full bg-[#D98A2B] hover:bg-[#bd7522] text-white text-sm font-semibold transition-all duration-200 shadow-md hover-lift glow-btn"
            >
              <PhoneCall className="w-4 h-4 mr-2" />
              Book a Session
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-[#0B3C2D] hover:bg-[#8CA899]/20 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer & Overlay */}
      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 top-16 bg-[#13221C]/50 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="md:hidden absolute top-full left-0 right-0 py-6 px-6 border-b-2 border-[#0B3C2D]/10 shadow-2xl animate-fade-in bg-white z-50 max-h-[85vh] overflow-y-auto">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-base font-bold text-[#0B3C2D] hover:text-[#D98A2B]"
              >
                Home
              </Link>
              
              <div className="pl-3 border-l-2 border-[#D98A2B] space-y-2.5 my-1">
                <span className="text-xs font-bold text-[#D98A2B] uppercase tracking-wider block">
                  Services
                </span>
                {serviceSubpages.map((sub) => (
                  <Link
                    key={sub.href}
                    href={sub.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-sm font-medium text-deep-ink hover:text-[#0B3C2D]"
                  >
                    {sub.label}
                  </Link>
                ))}
              </div>

              <Link
                href="/about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-base font-bold text-[#0B3C2D] hover:text-[#D98A2B]"
              >
                About Nikunj
              </Link>
              <Link
                href="/speaking"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-base font-bold text-[#0B3C2D] hover:text-[#D98A2B]"
              >
                Keynote Speaking
              </Link>
              <Link
                href="/resources"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-base font-bold text-[#0B3C2D] hover:text-[#D98A2B]"
              >
                Articles & Guides
              </Link>
              <Link
                href="/faq"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-base font-bold text-[#0B3C2D] hover:text-[#D98A2B]"
              >
                FAQ
              </Link>
              <Link
                href="/contact#booking"
                onClick={() => setIsMobileMenuOpen(false)}
                className="inline-flex items-center justify-center px-5 py-3.5 rounded-full bg-[#D98A2B] text-white text-base font-bold shadow-md glow-btn mt-3"
              >
                <PhoneCall className="w-4 h-4 mr-2" />
                Book a Session
              </Link>
            </nav>
          </div>
        </>
      )}
    </header>
  );
}
