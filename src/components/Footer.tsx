import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, ShieldCheck } from "lucide-react";
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
                <Link href="/about" className="hover:text-white transition-colors">About Me</Link>
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
              <span>Mota Varachha, Surat, Gujarat, India (Online Sessions Available Nationwide)</span>
                </Link>
              </li>
              <li>
                <a href="tel:+919925060609" className="flex items-center space-x-3 group hover:text-white transition-colors">
                  <Phone className="w-4 h-4 text-[#D98A2B] shrink-0 group-hover:scale-110 transition-transform" />
                  <span>+91 99250 60609</span>
                </a>
              </li>
              <li>
                <a href="mailto:ndhanani85@gmail.com" className="flex items-center space-x-3 group hover:text-white transition-colors">
                  <Mail className="w-4 h-4 text-[#D98A2B] shrink-0 group-hover:scale-110 transition-transform" />
                  <span>ndhanani85@gmail.com</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright & Developed By */}
        <div className="mt-8 pt-6 border-t border-[#8CA899]/20 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8CA899]">
          <p>© {new Date().getFullYear()} N. Dhanani Counseling. All rights reserved.</p>
          <a
            href="https://portfolio-avadh.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 sm:mt-0 hover:text-white transition-colors flex items-center space-x-1.5 font-medium"
          >
            <span>Developed & Managed by</span>
            <span className="font-bold text-white hover:text-[#D98A2B] transition-colors">AD</span>
            <span className="w-2 h-2 rounded-full bg-red-500 inline-block animate-pulse"></span>
          </a>
        </div>
      </div>
    </footer>
  );
}
