import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, ShieldCheck, Heart, AlertCircle, ExternalLink } from "lucide-react";
import LeafMotif from "@/components/LeafMotif";

export default function Footer() {
  return (
    <footer className="bg-[#0B3C2D] text-white pt-16 pb-24 md:pb-12 border-t border-[#8CA899]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#8CA899]/20">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 rounded-full bg-[#D98A2B] flex items-center justify-center text-white group-hover:scale-105 transition-transform">
                <LeafMotif className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-serif-display font-bold tracking-tight text-white group-hover:text-[#D98A2B] transition-colors">
                N. DHANANI
              </span>
            </Link>
            <p className="text-xs text-[#8CA899] leading-relaxed">
              Guiding families through stress back to calm. Evidence-based personal counseling, parenting coaching, and corporate keynote speaker based in Mumbai.
            </p>
            <div className="pt-2">
              <Link
                href="/faq#confidentiality"
                className="inline-flex items-center space-x-2 text-xs text-[#8CA899] hover:text-white transition-colors"
              >
                <ShieldCheck className="w-4 h-4 text-[#8CA899]" />
                <span>100% Confidential & Private Care</span>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[#D98A2B] mb-4 font-sans">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-[#8CA899]">
              <li>
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">Counseling Services</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">About Nikunj</Link>
              </li>
              <li>
                <Link href="/speaking" className="hover:text-white transition-colors">Keynote Speaking</Link>
              </li>
              <li>
                <Link href="/resources" className="hover:text-white transition-colors">Articles & Guides</Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">FAQ</Link>
              </li>
              <li>
                <Link href="/contact#booking" className="hover:text-white font-bold text-[#D98A2B] transition-colors">Book a Session</Link>
              </li>
            </ul>
          </div>

          {/* Practice Focus - All Clickable Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[#D98A2B] mb-4 font-sans">
              Practice Focus
            </h4>
            <ul className="space-y-2.5 text-xs text-[#8CA899]">
              <li>
                <Link href="/services/parenting-coaching" className="hover:text-white transition-colors flex items-center">
                  <span className="mr-1.5 text-[#D98A2B]">•</span> Parenting Stress & Child Dynamics
                </Link>
              </li>
              <li>
                <Link href="/services/relationship-repair" className="hover:text-white transition-colors flex items-center">
                  <span className="mr-1.5 text-[#D98A2B]">•</span> Couples Relationship Repair
                </Link>
              </li>
              <li>
                <Link href="/services/counselling-life-coaching" className="hover:text-white transition-colors flex items-center">
                  <span className="mr-1.5 text-[#D98A2B]">•</span> Executive & Corporate Burnout
                </Link>
              </li>
              <li>
                <Link href="/services/parenting-coaching" className="hover:text-white transition-colors flex items-center">
                  <span className="mr-1.5 text-[#D98A2B]">•</span> Teen Emotional Guidance
                </Link>
              </li>
              <li>
                <Link href="/services/counselling-life-coaching" className="hover:text-white transition-colors flex items-center">
                  <span className="mr-1.5 text-[#D98A2B]">•</span> Life Direction & Self-Improvement
                </Link>
              </li>
            </ul>
            <div className="pt-3 border-t border-[#8CA899]/20 mt-3">
              <span className="text-[11px] font-bold text-[#D98A2B] uppercase block mb-1">
                Languages Spoken
              </span>
              <p className="text-xs text-[#8CA899]">English, Hindi, Gujarati</p>
            </div>
          </div>

          {/* Direct Contact - All Clickable */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[#D98A2B] mb-4 font-sans">
              Direct Contact
            </h4>
            <ul className="space-y-3 text-xs text-[#8CA899]">
              <li>
                <Link href="/contact#booking" className="flex items-start space-x-3 group hover:text-white transition-colors">
                  <MapPin className="w-4 h-4 text-[#D98A2B] shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <span>Mumbai, Maharashtra, India (Online Sessions Available Nationwide)</span>
                </Link>
              </li>
              <li>
                <a href="tel:+919870000000" className="flex items-center space-x-3 group hover:text-white transition-colors">
                  <Phone className="w-4 h-4 text-[#D98A2B] shrink-0 group-hover:scale-110 transition-transform" />
                  <span>+91 98700 00000</span>
                </a>
              </li>
              <li>
                <a href="mailto:contact@ndhanani.com" className="flex items-center space-x-3 group hover:text-white transition-colors">
                  <Mail className="w-4 h-4 text-[#D98A2B] shrink-0 group-hover:scale-110 transition-transform" />
                  <span>contact@ndhanani.com</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Crisis Resource Disclaimer Bar - Fully Clickable Emergency Helplines */}
        <div className="mt-8 p-4 rounded-2xl bg-white/5 border border-[#8CA899]/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs text-[#8CA899]">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-[#D98A2B] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-white block">Crisis Helpline Disclaimer:</span>
              <span>
                If you or someone you know is in immediate danger or experiencing a mental health crisis, please reach out to national emergency services immediately.
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 shrink-0">
            <a
              href="tel:14416"
              className="bg-[#D98A2B]/20 hover:bg-[#D98A2B]/40 text-[#D98A2B] hover:text-white px-3 py-1.5 rounded-lg border border-[#D98A2B]/30 font-semibold text-[11px] transition-colors flex items-center"
            >
              Tele-MANAS: 14416
              <ExternalLink className="w-3 h-3 ml-1" />
            </a>
            <a
              href="tel:+919999666555"
              className="bg-[#D98A2B]/20 hover:bg-[#D98A2B]/40 text-[#D98A2B] hover:text-white px-3 py-1.5 rounded-lg border border-[#D98A2B]/30 font-semibold text-[11px] transition-colors flex items-center"
            >
              Vandrevala: +91 9999 666 555
              <ExternalLink className="w-3 h-3 ml-1" />
            </a>
          </div>
        </div>

        {/* Copyright & Additional Navigation */}
        <div className="mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#8CA899]">
          <p>© {new Date().getFullYear()} N. Dhanani Counseling. All rights reserved.</p>
          <div className="flex space-x-4 mt-2 sm:mt-0">
            <Link href="/faq" className="hover:text-white transition-colors">Confidential Care</Link>
            <span>•</span>
            <Link href="/about" className="hover:text-white transition-colors">Evidence-Based Practice</Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-white transition-colors">Mumbai, India</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
