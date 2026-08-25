import React from "react";
import Link from "next/link";
import { Brain, CheckCircle2, ArrowRight, Star, Calendar, HelpCircle, ShieldCheck } from "lucide-react";
import LeafMotif from "@/components/LeafMotif";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata = {
  title: "Individual Counselling & Life Coaching | N. Dhanani",
  description: "Personal counseling and executive life coaching in Mumbai and online. Manage stress, executive burnout, life transitions, and emotional balance.",
};

export default function CounsellingLifeCoachingPage() {
  const coveredTopics = [
    "Managing executive burnout, decision fatigue, and chronic workplace stress",
    "Developing emotional regulation strategies for anxiety and mood swings",
    "Setting healthy emotional boundaries with family, colleagues, and friends",
    "Navigating major life transitions (career change, marriage, relocation, loss)",
    "Building authentic self-confidence, purpose, and work-life balance",
  ];

  const arcSteps = [
    { step: "Session 1", title: "Personal Discovery & Stress Map", desc: "Understanding your current emotional landscape, triggers, and primary life goals." },
    { step: "Session 2", title: "Coping Frameworks & Regulation", desc: "Equipping you with practical tools to manage anxiety, overthinking, and fatigue." },
    { step: "Session 3", title: "Boundaries & Life Alignment", desc: "Establishing healthy personal boundaries and aligning daily choices with core values." },
    { step: "Session 4", title: "Sustained Resilience & Growth", desc: "Embedding self-sustaining mental habits for long-term clarity and emotional calm." },
  ];

  const burnoutPillars = [
    { name: "Somatic De-stress", desc: "Nervous system regulation tools to lower physical cortisol and racing thoughts." },
    { name: "Decision Pruning", desc: "Frameworks for delegating micro-decisions to combat executive fatigue." },
    { name: "Boundary Architecture", desc: "Designing non-negotiable personal time blocks without guilt." },
    { name: "Identity Alignment", desc: "Reconnecting your daily effort with core personal values and purpose." },
  ];

  const individualFaqs = [
    { q: "Is 1-on-1 counseling appropriate for work stress or only severe clinical issues?", a: "Individual counseling is designed for everyday stress, executive decision fatigue, life transitions, and emotional regulation, as well as deeper psychological clarity." },
    { q: "How long are individual coaching sessions?", a: "Each individual session runs for 60 minutes, conducted 1-on-1 either in Mumbai or via secure online video." },
    { q: "Can sessions be scheduled around busy work hours?", a: "Yes, flexible morning, evening, and weekend time slots are available to accommodate professional schedules." },
  ];

  return (
    <div className="bg-[#F8F4EE] py-12 md:py-20 space-y-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Page Hero */}
        <ScrollReveal direction="up" delay={100}>
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-[#0B3C2D]/10 shadow-md space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#8CA899]/20 text-[#0B3C2D] text-xs font-bold">
              <Brain className="w-4 h-4 text-[#0B3C2D]" />
              <span>Individual 1-on-1 Program</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif-display font-bold text-[#0B3C2D]">
              Counselling & Life Coaching
            </h1>

            <p className="text-base text-ink-muted leading-relaxed max-w-3xl">
              High expectations, workplace pressure, and family obligations can leave even high achievers feeling drained and anxious. 1-on-1 counseling gives you a confidential, structured space to regain control and peace of mind.
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <Link
                href="/contact?service=Counselling%20%26%20Life%20Coaching#booking"
                className="inline-flex items-center px-7 py-3.5 rounded-full bg-[#0B3C2D] hover:bg-[#07291f] text-white font-bold text-sm shadow-md transition-all"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Book Individual Session
              </Link>
            </div>
          </div>
        </ScrollReveal>

        {/* Who It's For & What's Covered */}
        <ScrollReveal direction="up" delay={150}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <div className="bg-white rounded-3xl p-8 border border-[#0B3C2D]/10 space-y-4">
              <h2 className="text-xl font-serif-display font-bold text-[#0B3C2D]">
                Who This Is For
              </h2>
              <ul className="space-y-3 text-xs text-deep-ink">
                <li className="flex items-start space-x-2">
                  <LeafMotif className="w-4 h-4 text-[#8CA899] shrink-0 mt-0.5" />
                  <span>Executives, entrepreneurs, and professionals experiencing high stress or burnout</span>
                </li>
                <li className="flex items-start space-x-2">
                  <LeafMotif className="w-4 h-4 text-[#8CA899] shrink-0 mt-0.5" />
                  <span>Individuals struggling with chronic anxiety, overthinking, or emotional fatigue</span>
                </li>
                <li className="flex items-start space-x-2">
                  <LeafMotif className="w-4 h-4 text-[#8CA899] shrink-0 mt-0.5" />
                  <span>Anyone seeking clear direction during major career or personal life transitions</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-[#0B3C2D]/10 space-y-4">
              <h2 className="text-xl font-serif-display font-bold text-[#0B3C2D]">
                What We Cover in Sessions
              </h2>
              <ul className="space-y-3 text-xs text-deep-ink">
                {coveredTopics.map((topic, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0B3C2D] shrink-0 mt-0.5" />
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </ScrollReveal>

        {/* Burnout Pillars */}
        <ScrollReveal direction="up" delay={200}>
          <div className="bg-white rounded-3xl p-8 md:p-10 border border-[#0B3C2D]/10 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#D98A2B] uppercase tracking-wider">Executive Resilience</span>
              <h2 className="text-2xl font-serif-display font-bold text-[#0B3C2D]">Burnout Recovery & Mental Strength Pillars</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {burnoutPillars.map((p, idx) => (
                <div key={idx} className="p-4 bg-[#F8F4EE] rounded-2xl border border-[#0B3C2D]/10 space-y-1">
                  <h4 className="text-sm font-serif-display font-bold text-[#0B3C2D]">{p.name}</h4>
                  <p className="text-xs text-ink-muted leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Typical Arc */}
        <ScrollReveal direction="up" delay={250}>
          <div className="bg-white rounded-3xl p-8 md:p-10 border border-[#0B3C2D]/10 space-y-8">
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#D98A2B] uppercase tracking-wider">
                Structured Roadmap
              </span>
              <h2 className="text-2xl font-serif-display font-bold text-[#0B3C2D]">
                What Your Individual Counseling Arc Looks Like
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {arcSteps.map((arc, idx) => (
                <div key={idx} className="bg-[#F8F4EE] p-5 rounded-2xl border border-[#0B3C2D]/10 space-y-2">
                  <span className="text-xs font-bold text-[#D98A2B] block">{arc.step}</span>
                  <h3 className="text-sm font-serif-display font-bold text-[#0B3C2D]">{arc.title}</h3>
                  <p className="text-xs text-ink-muted">{arc.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Individual FAQs */}
        <ScrollReveal direction="up" delay={300}>
          <div className="bg-white rounded-3xl p-8 md:p-10 border border-[#0B3C2D]/10 space-y-6">
            <div className="flex items-center space-x-2">
              <HelpCircle className="w-5 h-5 text-[#D98A2B]" />
              <h2 className="text-xl font-serif-display font-bold text-[#0B3C2D]">Individual Counseling FAQs</h2>
            </div>
            <div className="space-y-4">
              {individualFaqs.map((faq, idx) => (
                <div key={idx} className="p-4 bg-[#F8F4EE] rounded-2xl border border-[#0B3C2D]/10 space-y-1">
                  <h4 className="text-xs font-bold text-[#0B3C2D]">Q: {faq.q}</h4>
                  <p className="text-xs text-ink-muted leading-relaxed">A: {faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Testimonial Feature */}
        <ScrollReveal direction="up" delay={350}>
          <div className="bg-[#0B3C2D] text-white rounded-3xl p-8 md:p-10 space-y-4">
            <div className="flex items-center space-x-1 text-[#D98A2B]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <p className="text-base sm:text-lg font-serif-display italic text-[#8CA899]">
              "Nikunj provided an incredibly grounding perspective during my career transition. His evidence-based exercises helped me manage anxiety and regain confidence."
            </p>
            <span className="text-xs font-bold text-white block">— Corporate Leader, Bengaluru</span>
          </div>
        </ScrollReveal>

        {/* CTA */}
        <div className="text-center space-y-4 pt-4">
          <h3 className="text-2xl font-serif-display font-bold text-[#0B3C2D]">
            Ready to invest in your peace of mind?
          </h3>
          <Link
            href="/contact?service=Counselling%20%26%20Life%20Coaching#booking"
            className="inline-flex items-center px-8 py-4 rounded-full bg-[#0B3C2D] hover:bg-[#07291f] text-white font-bold text-sm shadow-lg transition-all"
          >
            Book Your Individual Session
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>

      </div>
    </div>
  );
}
