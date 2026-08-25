"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar } from "lucide-react";

export default function MobileStickyCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
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
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#0B3C2D]/15 p-3.5 px-4 shadow-[0_-8px_30px_rgba(0,0,0,0.12)] flex items-center justify-between space-x-3 animate-fade-up">
      <a
        href="https://wa.me/919925060609?text=Hi%20Nikunj,%20I'd%20like%20to%20ask%20a%20quick%20question."
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 inline-flex items-center justify-center py-3.5 px-4 rounded-full border border-[#0B3C2D]/20 text-[#0B3C2D] font-bold text-sm sm:text-base bg-[#F8F4EE] hover:bg-[#0B3C2D]/5 transition-colors shadow-xs"
      >
        <svg
          viewBox="0 0 24 24"
          className="w-5 h-5 fill-[#25D366] mr-2 shrink-0"
          aria-hidden="true"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.572-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.119.553 4.11 1.519 5.84L.055 23.515l5.849-1.503A11.942 11.942 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.945 9.945 0 01-5.078-1.39l-.364-.216-3.465.89.916-3.376-.237-.377A9.947 9.947 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
        </svg>
        WhatsApp
      </a>
      <Link
        href="/contact#booking"
        className="flex-1 inline-flex items-center justify-center py-3.5 px-4 rounded-full bg-[#0B3C2D] hover:bg-[#07291f] text-white font-bold text-sm sm:text-base shadow-md transition-all"
      >
        <Calendar className="w-5 h-5 mr-2 text-[#D98A2B]" />
        Book Session
      </Link>
    </div>
  );
}
