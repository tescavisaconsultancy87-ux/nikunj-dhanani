import React from "react";
import Link from "next/link";
import { ShieldCheck, Award, Heart, BookOpen, Calendar, ArrowRight, CheckCircle2, Globe, Sparkles, UserCheck, Lock } from "lucide-react";
import LeafMotif from "@/components/LeafMotif";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata = {
  title: "About Nikunj Dhanani | Family Counselor & Life Coach",
  description: "Learn about Nikunj Dhanani's 6+ years of evidence-based counseling practice in Mumbai, counseling philosophy, credentials, and trauma-informed care background.",
};

export default function AboutPage() {
  const credentials = [
    "Certified Family & Couples Counselor",
    "6+ Years Active Clinical & Life Coaching Practice",
    "Specialist in Executive Stress & Burnout Management",
    "Trauma-Informed & Evidence-Based Frameworks",
    "Member of Professional Counseling Networks in India",
    "Languages: English, Hindi, Gujarati",
  ];

  const coreValues = [
    { title: "Human-Centric Warmth", desc: "You sit across from a real, empathetic human practitioner — not an algorithm or app interface." },
    { title: "Evidence-Based Tools", desc: "Combining cognitive-behavioral principles, somatic regulation, and practical active-listening scripts." },
    { title: "Non-Judgmental Safety", desc: "A safe container where you can speak openly about family conflict, guilt, or personal struggles." },
    { title: "Long-Term Autonomy", desc: "Equipping you with self-sustaining skills so you don't stay dependent on long-term therapy." },
  ];

  const milestones = [
    { year: "2018", title: "Practice Foundations", desc: "Began dedicated 1-on-1 counseling practice focusing on youth and executive stress management in Mumbai." },
    { year: "2020", title: "Nationwide Online Counseling", desc: "Expanded practice online to support over 80+ families and leaders across 25+ Indian cities during high-stress periods." },
    { year: "2022", title: "Corporate & Keynote Expansion", desc: "Launched specialized keynote programs for organizations, schools, and executive retreats on mental resilience." },
    { year: "Present", title: "Evidence-Based Family Practice", desc: "Continuing active 1-on-1 and couples counseling with a 4.9/5 client satisfaction rating." },
  ];

  const galleryImages = [
    { src: "/ndhanani_3rd.png", title: "Executive Counseling & Keynotes" },
    { src: "/ndhanani_4th.png", title: "1-on-1 Counseling Practice" },
    { src: "/1st_work.png", title: "Leadership Resilience Workshops" },
    { src: "/2nd_work.png", title: "School & Parent Seminars" },
  ];

  return (
    <div className="bg-[#F8F4EE] py-12 md:py-20 space-y-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header Hero */}
        <ScrollReveal direction="up" delay={100}>
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-[#0B3C2D]/10 shadow-md grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 text-center">
              <img
                src="/ndhanani_2nd.png"
                alt="Nikunj Dhanani Counselor"
                className="w-44 h-44 rounded-full object-cover mx-auto border-4 border-[#F8F4EE] shadow-xl mb-4 hover:scale-105 transition-transform duration-300"
              />
              <h1 className="text-2xl font-serif-display font-bold text-[#0B3C2D]">
                Nikunj Dhanani
              </h1>
              <p className="text-xs font-bold text-[#D98A2B] uppercase tracking-wider mt-1">
                Family Counselor & Speaker
              </p>
              <div className="mt-3 flex justify-center gap-2 text-[11px] text-[#0B3C2D]">
                <span className="px-2.5 py-1 bg-[#F8F4EE] rounded-full border border-[#0B3C2D]/10">English</span>
                <span className="px-2.5 py-1 bg-[#F8F4EE] rounded-full border border-[#0B3C2D]/10">Hindi</span>
                <span className="px-2.5 py-1 bg-[#F8F4EE] rounded-full border border-[#0B3C2D]/10">Gujarati</span>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#D98A2B]">
                About the Practitioner
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif-display font-bold text-[#0B3C2D] leading-snug">
                Grounding families in calm through evidence-based, human care.
              </h2>
              <p className="text-sm text-ink-muted leading-relaxed">
                Nikunj Dhanani is an independent family counselor, couples specialist, and public speaker based in Mumbai. Unlike multi-therapist clinic platforms, Nikunj works with every client directly, establishing deep continuity, specificity, and trust.
              </p>
              <p className="text-sm text-ink-muted leading-relaxed">
                His practice is rooted in the belief that emotional conflict is not a sign of failure — it is a signal that existing coping structures need updating.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Practice & Speaking Gallery */}
        <ScrollReveal direction="up" delay={150}>
          <div className="space-y-6">
            <div className="text-center">
              <span className="text-xs font-bold uppercase tracking-widest text-[#D98A2B]">In Practice</span>
              <h2 className="text-2xl font-serif-display font-bold text-[#0B3C2D] mt-1">Sessions & Keynote Practice</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {galleryImages.map((img, idx) => (
                <div key={idx} className="bg-white rounded-2xl overflow-hidden border border-[#0B3C2D]/10 shadow-sm hover-lift group">
                  <div className="h-44 overflow-hidden">
                    <img
                      src={img.src}
                      alt={img.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-3 text-center">
                    <span className="text-xs font-bold text-[#0B3C2D]">{img.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Philosophy Pull-Quote */}
        <ScrollReveal direction="up" delay={200}>
          <div className="bg-[#0B3C2D] text-white rounded-3xl p-10 md:p-14 text-center space-y-4 shadow-xl relative overflow-hidden">
            <LeafMotif className="w-10 h-10 text-[#D98A2B] mx-auto" />
            <blockquote className="text-xl sm:text-2xl md:text-3xl font-serif-display italic leading-relaxed text-[#8CA899] max-w-3xl mx-auto">
              "You don't need to be fixed. You need to be heard, understood, and equipped with clear, practical tools for your daily life."
            </blockquote>
            <span className="text-xs font-bold uppercase tracking-widest text-[#D98A2B] block pt-2">
              — Nikunj Dhanani's Counseling Ethos
            </span>
          </div>
        </ScrollReveal>

        {/* 4 Core Values */}
        <ScrollReveal direction="up" delay={250}>
          <div className="bg-white rounded-3xl p-8 md:p-10 border border-[#0B3C2D]/10 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#D98A2B] uppercase tracking-wider">Practice Ethos</span>
              <h2 className="text-2xl font-serif-display font-bold text-[#0B3C2D]">Core Counseling Values</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {coreValues.map((v, idx) => (
                <div key={idx} className="p-5 bg-[#F8F4EE] rounded-2xl border border-[#0B3C2D]/10 space-y-2">
                  <h4 className="text-sm font-serif-display font-bold text-[#0B3C2D]">{v.title}</h4>
                  <p className="text-xs text-ink-muted leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Credentials Grid */}
        <ScrollReveal direction="up" delay={300}>
          <div className="bg-white rounded-3xl p-8 md:p-10 border border-[#0B3C2D]/10 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#D98A2B] uppercase tracking-wider">
                Qualifications & Standards
              </span>
              <h2 className="text-2xl font-serif-display font-bold text-[#0B3C2D]">
                Credentials & Practice Principles
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {credentials.map((cred, idx) => (
                <div key={idx} className="flex items-center space-x-3 p-4 bg-[#F8F4EE] rounded-2xl border border-[#0B3C2D]/10">
                  <CheckCircle2 className="w-5 h-5 text-[#0B3C2D] shrink-0" />
                  <span className="text-xs font-bold text-[#0B3C2D]">{cred}</span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Timeline */}
        <ScrollReveal direction="up" delay={350}>
          <div className="bg-white rounded-3xl p-8 md:p-10 border border-[#0B3C2D]/10 space-y-8">
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#D98A2B] uppercase tracking-wider">
                Practice Journey
              </span>
              <h2 className="text-2xl font-serif-display font-bold text-[#0B3C2D]">
                Milestones & Practice Timeline
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {milestones.map((item, idx) => (
                <div key={idx} className="bg-[#F8F4EE] p-5 rounded-2xl border border-[#0B3C2D]/10 space-y-2">
                  <span className="text-lg font-serif-display font-bold text-[#D98A2B] block">{item.year}</span>
                  <h3 className="text-sm font-serif-display font-bold text-[#0B3C2D]">{item.title}</h3>
                  <p className="text-xs text-ink-muted leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* CTA */}
        <div className="text-center space-y-4 pt-4">
          <h3 className="text-2xl font-serif-display font-bold text-[#0B3C2D]">
            Work directly with Nikunj
          </h3>
          <Link
            href="/contact#booking"
            className="inline-flex items-center px-8 py-4 rounded-full bg-[#D98A2B] hover:bg-[#bd7522] text-white font-bold text-sm shadow-lg transition-all glow-btn"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Book a Confidential Session
          </Link>
        </div>

      </div>
    </div>
  );
}
