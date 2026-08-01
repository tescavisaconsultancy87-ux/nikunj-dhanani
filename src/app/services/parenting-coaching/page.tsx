import React from "react";
import Link from "next/link";
import { Users, CheckCircle2, ArrowRight, Star, Calendar, ShieldCheck, HelpCircle, XCircle } from "lucide-react";
import LeafMotif from "@/components/LeafMotif";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata = {
  title: "Parenting Coaching & Youth Guidance | N. Dhanani",
  description: "Evidence-based parenting coaching in Mumbai and online. Manage child behavioral triggers, teen anxiety, and household stress with structured guidance.",
};

export default function ParentingCoachingPage() {
  const coveredTopics = [
    "De-escalating child tantrums, outbursts, and refusal behaviors",
    "Navigating digital screen time, academic pressure, and teen independence",
    "Building co-parenting alignment so both parents enforce consistent boundaries",
    "Creating calm morning and bedtime household routines that reduce parental exhaustion",
    "Fostering open parent-child communication without guilt or defensiveness",
  ];

  const arcSteps = [
    { step: "Session 1", title: "Family Intake & Trigger Mapping", desc: "Understanding child dynamics, parent stress patterns, and household triggers." },
    { step: "Session 2", title: "Behavioral Structure & Routine", desc: "Setting clear, calm household boundaries and consistent rewards/consequences." },
    { step: "Session 3", title: "Teen & Child Communication", desc: "Practicing active listening, non-confrontational dialogue, and emotional validation." },
    { step: "Session 4", title: "Review & Long-Term Calibration", desc: "Refining strategies based on real home results for lasting family peace." },
  ];

  const takeawayTools = [
    { title: "The 3-Second Emotion Pause", desc: "A script for parents to regulate their own anger before responding to child tantrums." },
    { title: "Parallel Drive-Time Dialogue", desc: "Framework for talking to teenagers in low-pressure settings like car rides or walks." },
    { title: "Co-Parenting Alignment Matrix", desc: "Agreement template to ensure both parents enforce identical rules without conflict." },
    { title: "Screen-Time Contract Template", desc: "Fair digital boundary agreements designed collaboratively with children." },
  ];

  const parentingFaqs = [
    { q: "Should both parents attend parenting coaching sessions?", a: "While having both parents present builds faster alignment, single-parent attendance is completely effective and common." },
    { q: "Do children or teenagers join the session directly?", a: "Session 1 is usually parent-only. Depending on the situation, joint parent-teen sessions or 1-on-1 youth guidance can be integrated." },
    { q: "How many sessions are typically required to see results?", a: "Most families report noticeable calm and reduced yelling within 3–4 structured sessions." },
  ];

  return (
    <div className="bg-[#F8F4EE] py-12 md:py-20 space-y-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Page Hero */}
        <ScrollReveal direction="up" delay={100}>
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-[#0B3C2D]/10 shadow-md space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#0B3C2D]/10 text-[#0B3C2D] text-xs font-bold">
              <Users className="w-4 h-4 text-[#D98A2B]" />
              <span>Dedicated Parenting Program</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif-display font-bold text-[#0B3C2D]">
              Parenting Coaching & Youth Guidance
            </h1>

            <p className="text-base text-ink-muted leading-relaxed max-w-3xl">
              Parenting in the modern world is filled with noise, exhaustion, and constant self-doubt. Our sessions replace reactive discipline and shouting with structured frameworks that build mutual respect and household calm.
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <Link
                href="/contact?service=Parenting%20Coaching#booking"
                className="inline-flex items-center px-7 py-3.5 rounded-full bg-[#D98A2B] hover:bg-[#bd7522] text-white font-bold text-sm shadow-md transition-all glow-btn"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Book Parenting Session
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
                  <LeafMotif className="w-4 h-4 text-[#D98A2B] shrink-0 mt-0.5" />
                  <span>Parents feeling overwhelmed by daily household friction or child tantrums</span>
                </li>
                <li className="flex items-start space-x-2">
                  <LeafMotif className="w-4 h-4 text-[#D98A2B] shrink-0 mt-0.5" />
                  <span>Families experiencing distance or hostility with teenagers</span>
                </li>
                <li className="flex items-start space-x-2">
                  <LeafMotif className="w-4 h-4 text-[#D98A2B] shrink-0 mt-0.5" />
                  <span>Couples who disagree on parenting styles or discipline methods</span>
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

        {/* Practical Takeaway Tools */}
        <ScrollReveal direction="up" delay={200}>
          <div className="bg-white rounded-3xl p-8 md:p-10 border border-[#0B3C2D]/10 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#D98A2B] uppercase tracking-wider">Practical Frameworks</span>
              <h2 className="text-2xl font-serif-display font-bold text-[#0B3C2D]">Core Parenting Tools You Receive</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {takeawayTools.map((tool, idx) => (
                <div key={idx} className="p-4 bg-[#F8F4EE] rounded-2xl border border-[#0B3C2D]/10 space-y-1">
                  <h4 className="text-xs font-bold text-[#0B3C2D]">{tool.title}</h4>
                  <p className="text-xs text-ink-muted leading-relaxed">{tool.desc}</p>
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
                What Your Parenting Arc Looks Like
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

        {/* Parenting FAQs */}
        <ScrollReveal direction="up" delay={300}>
          <div className="bg-white rounded-3xl p-8 md:p-10 border border-[#0B3C2D]/10 space-y-6">
            <div className="flex items-center space-x-2">
              <HelpCircle className="w-5 h-5 text-[#D98A2B]" />
              <h2 className="text-xl font-serif-display font-bold text-[#0B3C2D]">Parenting Session FAQs</h2>
            </div>
            <div className="space-y-4">
              {parentingFaqs.map((faq, idx) => (
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
              "Nikunj gave us practical script examples for talking to our 14-year-old son. We stopped screaming and started actually understanding each other within weeks."
            </p>
            <span className="text-xs font-bold text-white block">— Family in South Mumbai</span>
          </div>
        </ScrollReveal>

        {/* CTA */}
        <div className="text-center space-y-4 pt-4">
          <h3 className="text-2xl font-serif-display font-bold text-[#0B3C2D]">
            Ready to bring calm back to your home?
          </h3>
          <Link
            href="/contact?service=Parenting%20Coaching#booking"
            className="inline-flex items-center px-8 py-4 rounded-full bg-[#D98A2B] hover:bg-[#bd7522] text-white font-bold text-sm shadow-lg transition-all glow-btn"
          >
            Book Your Parenting Session
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>

      </div>
    </div>
  );
}
