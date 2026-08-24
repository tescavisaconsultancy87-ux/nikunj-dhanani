"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Star,
  ArrowRight,
  CheckCircle2,
  PhoneCall,
  Sparkles,
  Users,
  Heart,
  Brain,
  ShieldCheck,
  Globe,
  Award,
  ChevronRight,
  MessageCircle,
  Clock,
  ChevronLeft
} from "lucide-react";
import LeafMotif from "@/components/LeafMotif";
import WaveDivider from "@/components/WaveDivider";
import StressQuizModal from "@/components/StressQuizModal";

export default function HomePage() {
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const realAvatars = [
    { name: "Priya R.", url: "/avatar1.png" },
    { name: "Siddharth M.", url: "/avatar2.png" },
    { name: "Ananya K.", url: "/avatar3.png" },
    { name: "Rahul S.", url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80" },
  ];

  const concernCards = [
    {
      title: "Parenting Overwhelm",
      description: "Constantly walking on eggshells with children's behavior, school stress, or daily household friction.",
      serviceHref: "/services/parenting-coaching",
      tag: "Family Focus",
    },
    {
      title: "Marriage After Kids",
      description: "Feeling distant from your partner, trapped in repetitive arguments, or lacking emotional intimacy.",
      serviceHref: "/services/relationship-repair",
      tag: "Couples Repair",
    },
    {
      title: "Corporate Burnout",
      description: "Managing executive pressure, high-stakes decision fatigue, and chronic mental exhaustion.",
      serviceHref: "/services/counselling-life-coaching",
      tag: "Leadership & Work",
    },
    {
      title: "Communication Breakdowns",
      description: "Struggling to express emotional needs without triggering defensive or explosive reactions.",
      serviceHref: "/services/relationship-repair",
      tag: "Communication",
    },
    {
      title: "Teen Conflict & Guiding",
      description: "Navigating teenage independence, academic pressure, mood shifts, and parent-child distance.",
      serviceHref: "/services/parenting-coaching",
      tag: "Parenting",
    },
    {
      title: "Career-Stage Anxiety",
      description: "Uncertainty around major career transitions, identity shifts, and personal direction.",
      serviceHref: "/services/counselling-life-coaching",
      tag: "Personal Growth",
    },
  ];

  const processSteps = [
    {
      step: "01",
      title: "Discover",
      subtitle: "Free Initial Call",
      description: "A 15-minute introductory conversation to understand your context, concerns, and primary goals.",
    },
    {
      step: "02",
      title: "Define",
      subtitle: "Root Cause Mapping",
      description: "We map underlying behavioral patterns, emotional triggers, and relational friction points.",
    },
    {
      step: "03",
      title: "Strategy",
      subtitle: "Custom Action Plan",
      description: "Co-creating practical, evidence-based coping tools and communication frameworks for daily life.",
    },
    {
      step: "04",
      title: "Sessions",
      subtitle: "Guided 1-on-1 Work",
      description: "Dedicated structured sessions (online or in Mumbai) to practice strategies and navigate real scenarios.",
    },
    {
      step: "05",
      title: "Growth",
      subtitle: "Sustainable Calm",
      description: "Achieving lasting emotional balance, renewed relationship warmth, and self-sustaining clarity.",
    },
  ];

  const testimonials = [
    {
      quote: "Nikunj helped us transform our evening routine with our teenagers from screaming matches into calm, open conversations. His practical frameworks gave our family back peace.",
      author: "P. R. & Family",
      role: "Parenting Coaching Clients",
      location: "Mumbai",
      avatar: "/avatar1.png",
      stars: 5,
    },
    {
      quote: "My husband and I were trapped in the same argument for 2 years after our second child. In just 4 sessions, Nikunj helped us break down defenses and rebuild trust.",
      author: "S. & A. Mehta",
      role: "Relationship Repair",
      location: "Pune / Online",
      avatar: "/avatar2.png",
      stars: 5,
    },
    {
      quote: "As a senior manager, my anxiety was leaking into both my leadership and my home life. Nikunj's evidence-based approach is grounded, practical, and deeply supportive.",
      author: "R. Sharma",
      role: "Corporate Executive",
      location: "Bengaluru",
      avatar: "/avatar3.png",
      stars: 5,
    },
  ];

  return (
    <div className="space-y-0 bg-[#F8F4EE]">
      
      {/* ── SECTION 1: HERO (Nikunj image card FIRST on mobile) ── */}
      <section className="relative bg-[#F8F4EE] pt-8 pb-20 md:pt-12 md:pb-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Person Image Card (ORDER 1 on Mobile, ORDER 2 on Desktop) */}
            <div className="order-1 lg:order-2 lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none bg-white rounded-3xl p-5 sm:p-7 shadow-xl border border-[#0B3C2D]/10 space-y-5">
                
                {/* Hero Card Image Showcase using 03.png real portrait photo */}
                <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-md group">
                  <Image
                    src="/03.png"
                    alt="Nikunj Dhanani Counselor"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-[center_20%] group-hover:scale-105 transition-transform duration-500"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B3C2D]/60 via-transparent to-transparent"></div>
                  
                  <span className="absolute bottom-3 left-3 px-3 py-1.5 bg-white/95 backdrop-blur-md rounded-full text-[11px] font-bold text-[#0B3C2D] shadow-sm flex items-center">
                    ✨ Safe & Confidential Environment
                  </span>
                </div>

                {/* Card Quick Feature */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#D98A2B]">
                      One-on-One Dedicated Care
                    </span>
                    <span className="text-xs text-ink-light">60-Min Sessions</span>
                  </div>
                  <h3 className="text-lg font-serif-display font-bold text-[#0B3C2D]">
                    Direct Support from Nikunj Dhanani
                  </h3>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    No random matching or junior associates. Every session is conducted directly by Nikunj with personalized session notes and progress tracking.
                  </p>
                </div>

              </div>
            </div>

            {/* Left Content (ORDER 2 on Mobile, ORDER 1 on Desktop) */}
            <div className="order-2 lg:order-1 lg:col-span-7 space-y-6">
              
              {/* Trust Badge Pill */}
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#0B3C2D]/10 border border-[#0B3C2D]/15 text-[#0B3C2D] text-xs font-semibold">
                <LeafMotif className="w-4 h-4 text-[#D98A2B]" />
                <span>Personal Practitioner · Surat & Nationwide Online</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif-display font-bold text-[#0B3C2D] leading-[1.15] tracking-tight">
                Guiding families through stress,{" "}
                <span className="italic text-[#D98A2B] font-normal underline decoration-[#8CA899]/50 decoration-wavy decoration-2">
                  back to calm.
                </span>
              </h1>

              {/* Subline */}
              <p className="text-base sm:text-lg text-ink-muted leading-relaxed max-w-2xl">
                6+ years of structured, evidence-based counseling for parenting overwhelm, couples relationship repair, and high-stress executives — delivered by one person you can actually reach.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <Link
                  href="/contact#booking"
                  className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-[#D98A2B] hover:bg-[#bd7522] text-white font-bold text-base shadow-lg hover-lift transition-all glow-btn"
                >
                  <PhoneCall className="w-5 h-5 mr-2" />
                  Book a Session
                </Link>
                
                <button
                  onClick={() => setIsQuizOpen(true)}
                  className="inline-flex items-center justify-center px-6 py-3.5 rounded-full border-2 border-[#0B3C2D]/20 text-[#0B3C2D] hover:bg-[#0B3C2D] hover:text-white font-semibold text-base transition-all duration-200 group"
                >
                  <Sparkles className="w-5 h-5 mr-2 text-[#D98A2B] group-hover:text-white transition-colors" />
                  Take 2-Min Stress Check-in
                </button>
              </div>

              {/* Multilingual Hook Badge */}
              <div className="pt-1">
                <button
                  onClick={() => setIsQuizOpen(true)}
                  className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-xl bg-white/80 border border-[#0B3C2D]/10 hover:border-[#D98A2B] text-xs font-semibold text-[#0B3C2D] shadow-2xs hover:shadow-xs transition-all group"
                >
                  <Globe className="w-3.5 h-3.5 text-[#D98A2B] shrink-0" />
                  <span>Take Check-in in your language: <strong>English • हिंदी • ગુજરાતી</strong></span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#D98A2B] group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>

              {/* Real Avatars Trust Signal Row */}
              <div className="pt-6 border-t border-[#0B3C2D]/10 flex flex-wrap items-center gap-6">
                <div className="flex items-center space-x-1 text-[#D98A2B]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                  <span className="ml-1 text-xs font-bold text-[#0B3C2D]">4.9 / 5.0</span>
                </div>

                <div className="text-xs text-ink-muted flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#8CA899]"></span>
                  <span>80+ families & executives guided across India</span>
                </div>

                {/* Real Photographic Avatars */}
                <div className="flex -space-x-2.5">
                  {realAvatars.map((person, idx) => (
                    <div key={idx} className="relative w-8 h-8">
                      <Image
                        src={person.url}
                        alt={person.name}
                        fill
                        sizes="32px"
                        className="rounded-full object-cover border-2 border-[#F8F4EE] shadow-sm hover:scale-110 transition-transform"
                      />
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Curved Divider */}
      <WaveDivider type="wave" fillColor="#FFFFFF" className="-mt-1 z-10 relative" />

      {/* ── SECTION 2: EMOTIONAL CONNECTOR BLOCK ── */}
      <section className="bg-white py-16 md:py-24 relative">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <div className="w-12 h-12 rounded-full bg-[#D98A2B]/15 text-[#D98A2B] flex items-center justify-center mx-auto">
            <Heart className="w-6 h-6 fill-current" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif-display font-bold text-[#0B3C2D] leading-snug">
            "You don't need to be fixed. You need to be heard, understood, and equipped."
          </h2>
          <p className="text-base md:text-lg text-ink-muted leading-relaxed">
            Relational friction, parenting stress, and emotional anxiety often arise not from lack of love, but from carrying heavy responsibilities without structural support. You don't have to navigate family conflict or personal burnout alone.
          </p>
          <div className="pt-2">
            <Link
              href="/about"
              className="inline-flex items-center text-sm font-bold text-[#0B3C2D] hover:text-[#D98A2B] transition-colors group"
            >
              Read about Nikunj's Counseling Philosophy
              <ArrowRight className="w-4 h-4 ml-1.5 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Curved Divider */}
      <WaveDivider type="curve-dip" fillColor="#F8F4EE" className="-mt-1 z-10 relative" />

      {/* ── SECTION 3: WHO THIS IS FOR — CONCERN CARDS ── */}
      <section className="bg-[#F8F4EE] py-16 md:py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D98A2B]">
              Areas of Focus
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif-display font-bold text-[#0B3C2D]">
              What situation are you bringing to session?
            </h2>
            <p className="text-sm sm:text-base text-ink-muted">
              Counseling tailored to specific, real-world friction points in family, relationship, and career life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {concernCards.map((card, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-[#0B3C2D]/10 hover:border-[#0B3C2D] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group hover-lift"
              >
                <div className="space-y-3">
                  <span className="inline-block px-3 py-1 rounded-full bg-[#8CA899]/20 text-[#0B3C2D] text-[11px] font-bold">
                    {card.tag}
                  </span>
                  <h3 className="text-xl font-serif-display font-bold text-[#0B3C2D] group-hover:text-[#D98A2B] transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    {card.description}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-[#0B3C2D]/5 flex items-center justify-between">
                  <Link
                    href={card.serviceHref}
                    className="text-xs font-bold text-[#0B3C2D] group-hover:text-[#D98A2B] inline-flex items-center transition-colors"
                  >
                    Explore Support Plan
                    <ChevronRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <LeafMotif className="w-4 h-4 text-[#8CA899]" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Curved Divider */}
      <WaveDivider type="asymmetric" fillColor="#FFFFFF" className="-mt-1 z-10 relative" />

      {/* ── SECTION 4: SERVICES OVERVIEW CARDS ── */}
      <section className="bg-white py-16 md:py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D98A2B]">
              Core Practice Offerings
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif-display font-bold text-[#0B3C2D]">
              Structured Offerings & Counseling Services
            </h2>
            <p className="text-sm sm:text-base text-ink-muted">
              Choose the dedicated format that aligns with your present needs.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Service 1 */}
            <div className="bg-[#F8F4EE] rounded-3xl p-8 border border-[#0B3C2D]/15 flex flex-col justify-between hover-lift">
              <div className="space-y-6">
                <div className="relative w-full h-44 rounded-2xl overflow-hidden shadow-sm">
                  <Image
                    src="/service_parenting.png"
                    alt="Parenting Coaching"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#D98A2B] uppercase tracking-wider block mb-1">
                    Family & Youth
                  </span>
                  <h3 className="text-2xl font-serif-display font-bold text-[#0B3C2D]">
                    Parenting Coaching
                  </h3>
                </div>
                <p className="text-xs text-ink-muted leading-relaxed">
                  Transform household stress, manage child behavior cycles, and restore warmth between parents and children with structured guidance.
                </p>
                <ul className="space-y-2 text-xs text-[#13221C]">
                  <li className="flex items-center space-x-2">
                    <LeafMotif className="w-4 h-4 text-[#D98A2B]" />
                    <span>Behavioral triggers & routine structure</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <LeafMotif className="w-4 h-4 text-[#D98A2B]" />
                    <span>Teenager independence & emotional regulation</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <LeafMotif className="w-4 h-4 text-[#D98A2B]" />
                    <span>Co-parenting alignment</span>
                  </li>
                </ul>
              </div>

              <div className="pt-8 mt-6 border-t border-[#0B3C2D]/10">
                <Link
                  href="/services/parenting-coaching"
                  className="w-full inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#0B3C2D] hover:bg-[#07291f] text-white font-bold text-xs transition-colors"
                >
                  View Parenting Program
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>

            {/* Service 2 */}
            <div className="bg-white rounded-3xl p-8 border-2 border-[#D98A2B] flex flex-col justify-between shadow-lg relative hover-lift">
              <span className="absolute -top-3.5 left-8 px-4 py-1 rounded-full bg-[#D98A2B] text-white text-[10px] font-bold uppercase tracking-wider">
                Most Requested
              </span>
              <div className="space-y-6">
                <div className="relative w-full h-44 rounded-2xl overflow-hidden shadow-sm">
                  <Image
                    src="/service_relationship.png"
                    alt="Relationship Repair"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#0B3C2D] uppercase tracking-wider block mb-1">
                    Couples Support
                  </span>
                  <h3 className="text-2xl font-serif-display font-bold text-[#0B3C2D]">
                    Relationship Repair
                  </h3>
                </div>
                <p className="text-xs text-ink-muted leading-relaxed">
                  Break repetitive argument cycles, heal past misunderstandings, and rebuild intimate communication with your partner.
                </p>
                <ul className="space-y-2 text-xs text-[#13221C]">
                  <li className="flex items-center space-x-2">
                    <LeafMotif className="w-4 h-4 text-[#0B3C2D]" />
                    <span>De-escalation & conflict resolution</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <LeafMotif className="w-4 h-4 text-[#0B3C2D]" />
                    <span>Emotional intimacy & trust renewal</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <LeafMotif className="w-4 h-4 text-[#0B3C2D]" />
                    <span>Post-kids relationship balancing</span>
                  </li>
                </ul>
              </div>

              <div className="pt-8 mt-6 border-t border-[#0B3C2D]/10">
                <Link
                  href="/services/relationship-repair"
                  className="w-full inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#D98A2B] hover:bg-[#bd7522] text-white font-bold text-xs transition-colors shadow-md glow-btn"
                >
                  View Relationship Program
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>

            {/* Service 3 */}
            <div className="bg-[#F8F4EE] rounded-3xl p-8 border border-[#0B3C2D]/15 flex flex-col justify-between hover-lift">
              <div className="space-y-6">
                <div className="relative w-full h-44 rounded-2xl overflow-hidden shadow-sm">
                  <Image
                    src="/service_counselling.png"
                    alt="Counselling & Life Coaching"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#0B3C2D] uppercase tracking-wider block mb-1">
                    Individual Care
                  </span>
                  <h3 className="text-2xl font-serif-display font-bold text-[#0B3C2D]">
                    Counselling & Life Coaching
                  </h3>
                </div>
                <p className="text-xs text-ink-muted leading-relaxed">
                  Tailored 1-on-1 counseling for stress management, executive burnout, life transitions, and self-confidence.
                </p>
                <ul className="space-y-2 text-xs text-[#13221C]">
                  <li className="flex items-center space-x-2">
                    <LeafMotif className="w-4 h-4 text-[#D98A2B]" />
                    <span>Stress & executive burnout relief</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <LeafMotif className="w-4 h-4 text-[#D98A2B]" />
                    <span>Emotional resilience & boundaries</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <LeafMotif className="w-4 h-4 text-[#D98A2B]" />
                    <span>Career & life transition clarity</span>
                  </li>
                </ul>
              </div>

              <div className="pt-8 mt-6 border-t border-[#0B3C2D]/10">
                <Link
                  href="/services/counselling-life-coaching"
                  className="w-full inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#0B3C2D] hover:bg-[#07291f] text-white font-bold text-xs transition-colors"
                >
                  View Individual Program
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Curved Divider */}
      <WaveDivider type="gentle-arc" fillColor="#F8F4EE" className="-mt-1 z-10 relative" />

      {/* ── SECTION 5: HOW IT WORKS — PROCESS STEPPER ── */}
      <section className="bg-[#F8F4EE] py-16 md:py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D98A2B]">
              Clear, Transparent Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif-display font-bold text-[#0B3C2D]">
              How We Work Together
            </h2>
            <p className="text-sm sm:text-base text-ink-muted">
              A 5-step structured journey designed to move you from stress to emotional calm.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {processSteps.map((step, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-[#0B3C2D]/10 shadow-sm relative flex flex-col justify-between hover-lift"
              >
                <div className="space-y-3">
                  <span className="text-3xl font-serif-display font-bold text-[#D98A2B] block">
                    {step.step}
                  </span>
                  <h3 className="text-lg font-serif-display font-bold text-[#0B3C2D]">
                    {step.title}
                  </h3>
                  <span className="text-[11px] font-bold uppercase text-[#8CA899] block">
                    {step.subtitle}
                  </span>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Curved Divider */}
      <WaveDivider type="curve-dip" fillColor="#0B3C2D" className="-mt-1 z-10 relative" />

      {/* ── SECTION 6: STATS BAR ── */}
      <section className="bg-[#0B3C2D] text-white py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-[#8CA899]/20">
            
            <div className="space-y-1 pt-4 md:pt-0">
              <span className="text-4xl sm:text-5xl font-serif-display font-bold text-[#D98A2B]">
                120+
              </span>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#8CA899]">
                Sessions Conducted
              </p>
            </div>

            <div className="space-y-1 pt-4 md:pt-0">
              <span className="text-4xl sm:text-5xl font-serif-display font-bold text-[#D98A2B]">
                80+
              </span>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#8CA899]">
                Families & Leaders
              </p>
            </div>

            <div className="space-y-1 pt-4 md:pt-0">
              <span className="text-4xl sm:text-5xl font-serif-display font-bold text-[#D98A2B]">
                6+
              </span>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#8CA899]">
                Years Practice
              </p>
            </div>

            <div className="space-y-1 pt-4 md:pt-0">
              <span className="text-4xl sm:text-5xl font-serif-display font-bold text-[#D98A2B]">
                25+
              </span>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#8CA899]">
                Cities Served Online
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Curved Divider */}
      <WaveDivider type="asymmetric" fillColor="#FFFFFF" className="-mt-1 z-10 relative" />

      {/* ── SECTION 7: TESTIMONIALS CAROUSEL / GRID WITH REAL AVATARS ── */}
      <section className="bg-white py-16 md:py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D98A2B]">
              Client Experiences
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif-display font-bold text-[#0B3C2D]">
              What Families Say
            </h2>
          </div>

          <div className="max-w-4xl mx-auto bg-[#F8F4EE] rounded-3xl p-8 sm:p-12 border border-[#0B3C2D]/10 relative shadow-md">
            <div className="flex items-center space-x-1 text-[#D98A2B] mb-6">
              {[...Array(testimonials[activeTestimonial].stars)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>

            <blockquote className="text-lg sm:text-xl font-serif-display italic text-[#0B3C2D] leading-relaxed mb-8">
              "{testimonials[activeTestimonial].quote}"
            </blockquote>

            <div className="flex items-center justify-between pt-6 border-t border-[#0B3C2D]/10">
              <div className="flex items-center space-x-3">
                <div className="relative w-12 h-12 shrink-0">
                  <Image
                    src={testimonials[activeTestimonial].avatar}
                    alt={testimonials[activeTestimonial].author}
                    fill
                    sizes="48px"
                    className="rounded-full object-cover border-2 border-[#0B3C2D]/20 shadow-sm"
                  />
                </div>
                <div>
                  <span className="text-base font-bold text-[#0B3C2D] block">
                    {testimonials[activeTestimonial].author}
                  </span>
                  <span className="text-xs text-ink-muted">
                    {testimonials[activeTestimonial].role} · {testimonials[activeTestimonial].location}
                  </span>
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() =>
                    setActiveTestimonial((prev) =>
                      prev === 0 ? testimonials.length - 1 : prev - 1
                    )
                  }
                  className="w-10 h-10 rounded-full bg-white border border-[#0B3C2D]/15 hover:bg-[#0B3C2D] hover:text-white transition-colors flex items-center justify-center text-[#0B3C2D]"
                  aria-label="Previous quote"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() =>
                    setActiveTestimonial((prev) =>
                      prev === testimonials.length - 1 ? 0 : prev + 1
                    )
                  }
                  className="w-10 h-10 rounded-full bg-white border border-[#0B3C2D]/15 hover:bg-[#0B3C2D] hover:text-white transition-colors flex items-center justify-center text-[#0B3C2D]"
                  aria-label="Next quote"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Curved Divider */}
      <WaveDivider type="wave" fillColor="#F8F4EE" className="-mt-1 z-10 relative" />

      {/* ── SECTION 8: ABOUT PREVIEW WITH ndhanani_2nd.png ── */}
      <section className="bg-[#F8F4EE] py-16 md:py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl p-8 border border-[#0B3C2D]/10 shadow-lg text-center space-y-4">
                <div className="relative w-36 h-36 mx-auto">
                  <Image
                    src="/03.png"
                    alt="Nikunj Dhanani Counselor"
                    fill
                    sizes="144px"
                    className="rounded-full object-cover object-[center_20%] border-4 border-[#F8F4EE] shadow-md hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-serif-display font-bold text-[#0B3C2D]">
                    Nikunj Dhanani
                  </h3>
                  <p className="text-xs text-[#D98A2B] font-bold uppercase tracking-wider">
                    Family Counselor & Life Coach
                  </p>
                </div>
                <p className="text-xs text-ink-muted leading-relaxed">
                  Based in Surat. Specializing in family stress dynamics, relationship repair, and executive mental wellness.
                </p>
                <div className="pt-2 flex flex-wrap justify-center gap-2 text-[11px] text-[#0B3C2D]">
                  <span className="px-3 py-1 bg-[#F8F4EE] rounded-full border border-[#0B3C2D]/10">English</span>
                  <span className="px-3 py-1 bg-[#F8F4EE] rounded-full border border-[#0B3C2D]/10">Hindi</span>
                  <span className="px-3 py-1 bg-[#F8F4EE] rounded-full border border-[#0B3C2D]/10">Gujarati</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-[#D98A2B]">
                Meet Your Counselor
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif-display font-bold text-[#0B3C2D]">
                "Every family holds the capacity for calm — sometimes it just takes an outside lens."
              </h2>
              <p className="text-sm sm:text-base text-ink-muted leading-relaxed">
                Over the past 6 years, Nikunj has sat across hundreds of parents, couples, and corporate leaders navigating high-stakes emotional challenges. His approach combines evidence-based behavioral coaching with warmth, specificity, and absolute confidentiality.
              </p>

              <div className="pt-2">
                <Link
                  href="/about"
                  className="inline-flex items-center px-6 py-3 rounded-full bg-[#0B3C2D] hover:bg-[#07291f] text-white font-bold text-sm transition-colors"
                >
                  Read Nikunj's Story & Background
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Curved Divider */}
      <WaveDivider type="curve-dip" fillColor="#FFFFFF" className="-mt-1 z-10 relative" />

      {/* ── SECTION 9: SPEAKING TEASER WITH WORK IMAGES ── */}
      <section className="bg-white py-16 md:py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#D98A2B]">
                Keynotes & Workshops
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif-display font-bold text-[#0B3C2D]">
                Speaking for Corporate & School Audiences
              </h2>
            </div>
            <Link
              href="/speaking"
              className="inline-flex items-center text-sm font-bold text-[#0B3C2D] hover:text-[#D98A2B] transition-colors"
            >
              View Keynote Topics & Request Talk
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#F8F4EE] rounded-2xl overflow-hidden border border-[#0B3C2D]/10 space-y-4 hover-lift">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src="/1st_work.png"
                  alt="Leading Through Uncertainty"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-top hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 pt-0 space-y-3">
                <span className="text-xs font-bold text-[#D98A2B] uppercase tracking-wider block">
                  Corporate Leadership
                </span>
                <h3 className="text-xl font-serif-display font-bold text-[#0B3C2D]">
                  Leading Through Uncertainty
                </h3>
                <p className="text-xs text-ink-muted leading-relaxed">
                  Practical strategies for leaders to manage decision fatigue, support team wellbeing, and maintain personal resilience.
                </p>
              </div>
            </div>

            <div className="bg-[#F8F4EE] rounded-2xl overflow-hidden border border-[#0B3C2D]/10 space-y-4 hover-lift">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src="/2nd_work.png"
                  alt="Modern Parenting & Teen Anxiety"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-top hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 pt-0 space-y-3">
                <span className="text-xs font-bold text-[#D98A2B] uppercase tracking-wider block">
                  Schools & Parents
                </span>
                <h3 className="text-xl font-serif-display font-bold text-[#0B3C2D]">
                  Modern Parenting & Teen Anxiety
                </h3>
                <p className="text-xs text-ink-muted leading-relaxed">
                  Helping parents build emotional safety and effective boundaries in the digital age.
                </p>
              </div>
            </div>

            <div className="bg-[#F8F4EE] rounded-2xl overflow-hidden border border-[#0B3C2D]/10 space-y-4 hover-lift">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src="/3rd_work.png"
                  alt="Building Emotional Balance"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-top hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 pt-0 space-y-3">
                <span className="text-xs font-bold text-[#D98A2B] uppercase tracking-wider block">
                  Institutions & Retreats
                </span>
                <h3 className="text-xl font-serif-display font-bold text-[#0B3C2D]">
                  Building Emotional Balance
                </h3>
                <p className="text-xs text-ink-muted leading-relaxed">
                  Interactive workshops on stress regulation, active listening, and relationship longevity.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Curved Divider */}
      <WaveDivider type="asymmetric" fillColor="#F8F4EE" className="-mt-1 z-10 relative" />

      {/* ── SECTION 10: TRUST & CREDENTIALS STRIP ── */}
      <section className="bg-[#F8F4EE] py-14 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            
            <div className="flex items-center justify-center space-x-3 p-4 bg-white rounded-2xl border border-[#0B3C2D]/10">
              <ShieldCheck className="w-6 h-6 text-[#8CA899]" />
              <div className="text-left">
                <span className="text-xs font-bold text-[#0B3C2D] block">100% Confidential Care</span>
                <span className="text-[11px] text-ink-muted">Strict privacy standards enforced</span>
              </div>
            </div>

            <div className="flex items-center justify-center space-x-3 p-4 bg-white rounded-2xl border border-[#0B3C2D]/10">
              <Globe className="w-6 h-6 text-[#8CA899]" />
              <div className="text-left">
                <span className="text-xs font-bold text-[#0B3C2D] block">3 Languages Spoken</span>
                <span className="text-[11px] text-ink-muted">English, Hindi, & Gujarati</span>
              </div>
            </div>

            <div className="flex items-center justify-center space-x-3 p-4 bg-white rounded-2xl border border-[#0B3C2D]/10">
              <Award className="w-6 h-6 text-[#D98A2B]" />
              <div className="text-left">
                <span className="text-xs font-bold text-[#0B3C2D] block">6+ Years Credibility</span>
                <span className="text-[11px] text-ink-muted">Surat Practice & Online Nationwide</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Curved Divider */}
      <WaveDivider type="wave" fillColor="#0B3C2D" className="-mt-1 z-10 relative" />

      {/* ── SECTION 11: FINAL CTA BAND ── */}
      <section className="bg-[#0B3C2D] text-white py-20 relative">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
          <LeafMotif className="w-10 h-10 text-[#D98A2B] mx-auto" />
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-display font-bold leading-tight">
            Get the support you deserve today.
          </h2>
          <p className="text-base sm:text-lg text-[#8CA899] max-w-2xl mx-auto">
            Take the first step toward family calm, relationship repair, or personal stress relief with direct 1-on-1 counseling.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/contact#booking"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#D98A2B] hover:bg-[#bd7522] text-white font-bold text-base shadow-xl transition-all glow-btn"
            >
              <PhoneCall className="w-5 h-5 mr-2" />
              Book a Confidential Session
            </Link>

            <a
              href="https://wa.me/919925060609?text=Hi%20Nikunj,%20I'd%20like%20to%20inquire%20about%20a%20session."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-4 rounded-full border border-[#8CA899]/40 text-white hover:bg-white/10 font-semibold text-base transition-colors"
            >
              <MessageCircle className="w-5 h-5 mr-2 text-[#25D366]" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Interactive Quiz Modal Component */}
      <StressQuizModal isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
    </div>
  );
}
