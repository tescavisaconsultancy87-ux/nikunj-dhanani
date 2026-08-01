"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, MessageCircle } from "lucide-react";

export default function MobileStickyCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#0F3D3E]/10 p-3 px-4 shadow-2xl flex items-center justify-between space-x-3 animate-fade-up">
      <a
        href="https://wa.me/919870000000?text=Hi%20Nikunj,%20I'd%20like%20to%20ask%20a%20quick%20question."
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 inline-flex items-center justify-center py-2.5 px-3 rounded-xl border border-[#0F3D3E]/20 text-[#0F3D3E] font-medium text-xs sm:text-sm bg-warm-linen hover:bg-[#8FB8B0]/20 transition-colors"
      >
        <MessageCircle className="w-4 h-4 mr-1.5 text-[#25D366]" />
        WhatsApp
      </a>
      <Link
        href="/contact#booking"
        className="flex-1 inline-flex items-center justify-center py-2.5 px-4 rounded-xl bg-[#E08A3E] hover:bg-[#c9752b] text-white font-semibold text-xs sm:text-sm shadow-md transition-all glow-btn"
      >
        <Calendar className="w-4 h-4 mr-1.5" />
        Book Session
      </Link>
    </div>
  );
}
