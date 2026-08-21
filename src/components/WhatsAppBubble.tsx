"use client";

import React from "react";
import { MessageCircle } from "lucide-react";

export default function WhatsAppBubble() {
  const whatsappUrl = "https://wa.me/919925060609?text=Hi%20Nikunj,%20I'd%20like%20to%20ask%20a%20quick%20question.";

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp with Nikunj Dhanani"
      className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-40 flex items-center space-x-2 bg-[#25D366] hover:bg-[#20ba5a] text-white px-4 py-3 rounded-full shadow-xl hover-lift transition-all duration-300 group"
    >
      <MessageCircle className="w-6 h-6 fill-current" />
      <span className="text-sm font-bold hidden md:inline-block max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap">
        Chat with Me
      </span>
    </a>
  );
}
