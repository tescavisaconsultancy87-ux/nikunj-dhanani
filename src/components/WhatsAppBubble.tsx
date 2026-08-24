"use client";

import React from "react";

export default function WhatsAppBubble() {
  const whatsappUrl = "https://wa.me/919925060609?text=Hi%20Nikunj,%20I'd%20like%20to%20ask%20a%20quick%20question.";

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp with Nikunj Dhanani"
      className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-40 flex items-center space-x-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white px-4 py-3 rounded-full shadow-2xl hover-lift transition-all duration-300 group border border-white/20"
    >
      {/* Official Crisp WhatsApp SVG Logo */}
      <svg
        viewBox="0 0 24 24"
        className="w-6 h-6 fill-current shrink-0"
        aria-hidden="true"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.572-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347z"/>
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.119.553 4.11 1.519 5.84L.055 23.515l5.849-1.503A11.942 11.942 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.945 9.945 0 01-5.078-1.39l-.364-.216-3.465.89.916-3.376-.237-.377A9.947 9.947 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
      </svg>
      
      <span className="text-xs sm:text-sm font-bold whitespace-nowrap">
        Chat on WhatsApp
      </span>
    </a>
  );
}
