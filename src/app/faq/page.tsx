"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, HelpCircle, PhoneCall, ShieldCheck, MessageCircle, Search } from "lucide-react";
import LeafMotif from "@/components/LeafMotif";
import ScrollReveal from "@/components/ScrollReveal";

const faqs = [
  {
    category: "Format & Logistics",
    question: "What is the format of counseling sessions? Are they online or in-person?",
    answer: "Sessions are available both in-person at my practice and online nationwide via secure video calls (Zoom/Google Meet). Both formats offer the exact same level of privacy, structure, and 1-on-1 dedicated care.",
  },
  {
    category: "General",
    question: "What languages are counseling sessions conducted in?",
    answer: "I conduct sessions fluently in English, Hindi, and Gujarati based on your personal comfort and family preference.",
  },
  {
    category: "Confidentiality & Ethics",
    question: "How is client confidentiality protected?",
    answer: "Every session is strictly confidential. No details, notes, or identities are shared with third parties, employers, or family members without your explicit written consent.",
  },
  {
    category: "General",
    question: "What can I expect during my very first session?",
    answer: "Session 1 is an intake & goal-definition session. I will listen to your current situation, map primary stress points or relational triggers, and co-create an initial 4-session action plan.",
  },
  {
    category: "Payments & Pricing",
    question: "What is the duration and fee structure for a session?",
    answer: "Individual and parenting sessions are 60 minutes long. Joint couples relationship sessions run 60–75 minutes. Clear, transparent fee details are confirmed prior to your session booking.",
  },
  {
    category: "Format & Logistics",
    question: "How does the booking and time slot scheduling process work?",
    answer: "You can select your preferred date, time slot, and session type using our online calendar on the Contact page. You will receive an instant confirmation email and WhatsApp reminder with session link/location details.",
  },
  {
    category: "Payments & Pricing",
    question: "What is the cancellation and rescheduling policy?",
    answer: "We request at least 24 hours' notice for rescheduling or canceling a session so that the slot can be made available to other clients in need.",
  },
  {
    category: "Confidentiality & Ethics",
    question: "What should I do if I or a family member am in an immediate crisis?",
    answer: "My counseling practice provides scheduled therapy and coaching. If you are experiencing a mental health emergency or immediate danger, please reach out to national emergency helplines immediately (Tele-MANAS: 14416 | Vandrevala Foundation: +91 9999 666 555).",
  },
  {
    category: "Format & Logistics",
    question: "Can I switch between online and in-person sessions?",
    answer: "Yes, clients frequently mix online and in-person sessions based on travel schedules or work commitments.",
  },
  {
    category: "General",
    question: "Is counseling suitable for executive burnout or work stress?",
    answer: "Absolutely. Executive stress, decision fatigue, and career burnout are primary core specialties of my 1-on-1 counseling practice.",
  },
  {
    category: "Confidentiality & Ethics",
    question: "Are session notes kept securely?",
    answer: "Yes, all clinical notes are encrypted, password-protected, and strictly accessible only by me.",
  },
  {
    category: "Payments & Pricing",
    question: "Are receipts or invoices provided for corporate reimbursement?",
    answer: "Yes, official invoices detailing professional wellness consulting are provided upon request.",
  },
];

export default function FAQPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", "General", "Format & Logistics", "Confidentiality & Ethics", "Payments & Pricing"];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCat = activeCategory === "All" || faq.category === activeCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const toggleAccordion = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <div className="bg-[#F8F4EE] py-12 md:py-20 space-y-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header Hero */}
        <ScrollReveal direction="up" delay={100}>
          <div className="text-center space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D98A2B]">
              Common Questions
            </span>
            <h1 className="text-4xl sm:text-5xl font-serif-display font-bold text-[#0B3C2D]">
              Frequently Asked Questions
            </h1>
            <p className="text-base text-ink-muted leading-relaxed max-w-2xl mx-auto">
              Everything you need to know about booking sessions, confidentiality, pricing, and what to expect during your counseling journey with me.
            </p>
          </div>
        </ScrollReveal>

        {/* Category Filter & Search */}
        <ScrollReveal direction="up" delay={150}>
          <div className="bg-white p-4 md:p-6 rounded-3xl border border-[#0B3C2D]/10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                    activeCategory === cat
                      ? "bg-[#0B3C2D] text-white shadow-sm"
                      : "bg-[#F8F4EE] text-[#0B3C2D] hover:bg-[#8CA899]/20"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-full border border-[#0B3C2D]/15 text-xs text-deep-ink focus:outline-none focus:border-[#0B3C2D]"
              />
              <Search className="w-4 h-4 text-ink-light absolute left-3 top-2.5" />
            </div>
          </div>
        </ScrollReveal>

        {/* Accordion list */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <ScrollReveal key={idx} direction="up" delay={150 + idx * 30}>
                <div className="bg-white rounded-2xl border border-[#0B3C2D]/10 overflow-hidden shadow-sm transition-all">
                  <button
                    onClick={() => toggleAccordion(idx)}
                    className="w-full p-6 text-left flex items-center justify-between space-x-4 focus:outline-none"
                  >
                    <div className="flex items-center space-x-3">
                      <LeafMotif className="w-4 h-4 text-[#D98A2B] shrink-0" />
                      <span className="text-base font-serif-display font-bold text-[#0B3C2D]">
                        {faq.question}
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-[#0B3C2D] shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-0 border-t border-[#0B3C2D]/5 text-xs sm:text-sm text-ink-muted leading-relaxed animate-fade-in bg-[#F8F4EE]/40">
                      <p className="pt-4">{faq.answer}</p>
                    </div>
                  )}
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* CTA Card */}
        <ScrollReveal direction="up" delay={300}>
          <div className="bg-white rounded-3xl p-8 border border-[#0B3C2D]/10 text-center space-y-4 shadow-md">
            <h3 className="text-xl font-serif-display font-bold text-[#0B3C2D]">
              Have a specific question not listed here?
            </h3>
            <p className="text-xs text-ink-muted">
              I am happy to answer quick inquiries over WhatsApp or via our booking page.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                href="/contact#booking"
                className="inline-flex items-center px-6 py-3 rounded-full bg-[#0B3C2D] hover:bg-[#07291f] text-white font-bold text-xs transition-colors shadow-md"
              >
                <PhoneCall className="w-4 h-4 mr-2" />
                Book a Session
              </Link>
              <a
                href="https://wa.me/919925060609?text=Hi%20Nikunj,%20I%20have%20a%20question%20before%20booking."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 rounded-full border border-[#0B3C2D]/20 text-[#0B3C2D] hover:bg-[#F8F4EE] text-xs font-bold transition-colors"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4 fill-[#25D366] mr-2 shrink-0"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.572-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.119.553 4.11 1.519 5.84L.055 23.515l5.849-1.503A11.942 11.942 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.945 9.945 0 01-5.078-1.39l-.364-.216-3.465.89.916-3.376-.237-.377A9.947 9.947 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                </svg>
                Ask on WhatsApp
              </a>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </div>
  );
}
