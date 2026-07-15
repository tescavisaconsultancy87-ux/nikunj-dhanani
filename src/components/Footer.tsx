import React from "react";
import Link from "next/link";
import { Brain, Mail, Phone, Shield } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary-900 text-primary-200 border-t border-primary-850">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-accent-navy flex items-center justify-center text-white">
                <Brain className="w-5 h-5" />
              </div>
              <span className="text-lg font-bold font-display tracking-tight text-white">N. DHANANI</span>
            </div>
            <p className="text-sm text-primary-300">
              Expert counselor and public speaker helping families, parents, and individuals overcome stress and find a path to meaningful self-improvement.
            </p>
            <p className="text-xs italic text-accent-steel font-semibold">"Real talk. Real change."</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-bold text-accent-steel tracking-wider uppercase mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { label: "Home", href: "/" },
                { label: "Services", href: "/#services" },
                { label: "About", href: "/#about" },
                { label: "Speaking", href: "/#speaking" },
                { label: "Contact", href: "/#contact" }
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-sm text-primary-300 hover:text-accent-steel transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Specialties */}
          <div>
            <h3 className="text-xs font-bold text-accent-steel tracking-wider uppercase mb-4">Specialties</h3>
            <ul className="space-y-2">
              {[
                { label: "Family Counseling", href: "/services/relationship-repair" },
                { label: "Stress Management", href: "/services/counselling-life-coaching" },
                { label: "Parenting Workshops", href: "/services/parenting-coaching" },
                { label: "Self-Improvement Coaching", href: "/services/counselling-life-coaching" },
                { label: "Public Speaking", href: "/#speaking" }
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-sm text-primary-300 hover:text-accent-steel transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-xs font-bold text-accent-steel tracking-wider uppercase mb-4">Get In Touch</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-accent-steel shrink-0" />
                <a href="mailto:ndhanani85@gmail.com" className="text-sm text-primary-300 hover:text-accent-steel transition-colors break-all">
                  ndhanani85@gmail.com
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-accent-steel shrink-0" />
                <a href="tel:+919925060609" className="text-sm text-primary-300 hover:text-accent-steel transition-colors">
                  +91 99250 60609
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-accent-steel shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
                <a
                  href="https://www.instagram.com/nikunj.dhanani/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary-300 hover:text-accent-steel transition-colors"
                >
                  Follow on Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary-700 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-xs text-primary-300">
            &copy; {new Date().getFullYear()} N. Dhanani. All rights reserved.
          </p>
          <div className="flex items-center space-x-6">
            <a
              href="https://portfolio-avadh.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-primary-300 hover:text-accent-steel transition-colors"
            >
              Developed and managed by AD.
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
