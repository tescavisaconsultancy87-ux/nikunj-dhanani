import React from "react";
import Link from "next/link";
import { Heart, CheckCircle2, ArrowRight, Star, Calendar, HelpCircle, ShieldCheck } from "lucide-react";
import LeafMotif from "@/components/LeafMotif";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata = {
  title: "Relationship Repair & Couples Counseling | N. Dhanani",
  description: "Couples counseling and relationship repair in Mumbai and online. Break circular argument cycles, restore emotional warmth, and rebuild trust.",
};

export default function RelationshipRepairPage() {
  const coveredTopics = [
    "De-escalating defensive reactions during argument cycles",
    "Restoring emotional intimacy and physical warmth after marital strain",
    "Communicating personal emotional needs clearly without blame or guilt",
    "Balancing career ambition, parenting responsibilities, and partner quality time",
    "Rebuilding trust, honesty, and mutual respect after deep misunderstandings",
  ];

  const arcSteps = [
    { step: "Session 1", title: "Joint Assessment & Pattern Mapping", desc: "Understanding recurring conflict loops and communication barriers without taking sides." },
    { step: "Session 2", title: "De-escalation & Trigger Awareness", desc: "Learning how to pause defensive responses and communicate real emotional needs." },
    { step: "Session 3", title: "Intimacy & Trust Calibration", desc: "Co-creating practical habits that rebuild warmth, affection, and shared purpose." },
    { step: "Session 4", title: "Long-Term Partnership Plan", desc: "Establishing tools for self-correcting arguments before they become toxic." },
  ];

  const deescalationSteps = [
    { num: "01", name: "Pattern Recognition", detail: "Identifying the precise moment an argument shifts from productive to defensive." },
    { num: "02", name: "The Safe Pause", detail: "Agreeing on a neutral phrase to pause discussions for 15 minutes before escalation." },
    { num: "03", name: "Need Translation", detail: "Translating accusations ('You don't care') into emotional requests ('I miss your support')." },
    { num: "04", name: "Re-engagement Agreement", detail: "Returning to discussions with structured active-listening guidelines." },
  ];

  const couplesFaqs = [
    { q: "What if my spouse is reluctant to join counseling?", a: "Nikunj offers initial 1-on-1 prep sessions for one partner to learn communication tools that often positively shift the relationship dynamic." },
    { q: "Does the counselor take sides during arguments?", a: "Never. Nikunj remains completely neutral, focusing entirely on diagnosing and repairing the interaction pattern between partners." },
    { q: "Are sessions online or in-person for couples?", a: "Both options are available. Online sessions are conducted via secure private video links, allowing flexible scheduling for busy couples." },
  ];

  return (
    <div className="bg-[#F8F4EE] py-12 md:py-20 space-y-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Page Hero */}
        <ScrollReveal direction="up" delay={100}>
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-[#0B3C2D]/10 shadow-md space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#D98A2B]/15 text-[#D98A2B] text-xs font-bold">
              <Heart className="w-4 h-4 fill-current" />
              <span>Couples Relationship Program</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif-display font-bold text-[#0B3C2D]">
              Relationship Repair & Couples Counseling
            </h1>

            <p className="text-base text-ink-muted leading-relaxed max-w-3xl">
              When couples get stuck in repetitive argument cycles, love can feel buried beneath resentment and exhaustion. Our sessions provide a safe, neutral space to hear each other deeply and rebuild your foundation.
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <Link
                href="/contact?service=Relationship%20Repair#booking"
                className="inline-flex items-center px-7 py-3.5 rounded-full bg-[#D98A2B] hover:bg-[#bd7522] text-white font-bold text-sm shadow-md transition-all glow-btn"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Book Couples Session
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
                  <span>Couples trapped in repeating arguments about household, finances, or family</span>
                </li>
                <li className="flex items-start space-x-2">
                  <LeafMotif className="w-4 h-4 text-[#D98A2B] shrink-0 mt-0.5" />
                  <span>Partners experiencing emotional distance or lack of affection after having kids</span>
                </li>
                <li className="flex items-start space-x-2">
                  <LeafMotif className="w-4 h-4 text-[#D98A2B] shrink-0 mt-0.5" />
                  <span>Couples seeking to repair trust and rebuild open dialogue</span>
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

        {/* De-escalation Protocol */}
        <ScrollReveal direction="up" delay={200}>
          <div className="bg-white rounded-3xl p-8 md:p-10 border border-[#0B3C2D]/10 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#D98A2B] uppercase tracking-wider">Methodology</span>
              <h2 className="text-2xl font-serif-display font-bold text-[#0B3C2D]">Our De-escalation Protocol</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {deescalationSteps.map((step, idx) => (
                <div key={idx} className="p-4 bg-[#F8F4EE] rounded-2xl border border-[#0B3C2D]/10 space-y-1">
                  <span className="text-xs font-bold text-[#D98A2B] block">{step.num}</span>
                  <h4 className="text-sm font-serif-display font-bold text-[#0B3C2D]">{step.name}</h4>
                  <p className="text-xs text-ink-muted leading-relaxed">{step.detail}</p>
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
                What Your Relationship Repair Arc Looks Like
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

        {/* Couples FAQs */}
        <ScrollReveal direction="up" delay={300}>
          <div className="bg-white rounded-3xl p-8 md:p-10 border border-[#0B3C2D]/10 space-y-6">
            <div className="flex items-center space-x-2">
              <HelpCircle className="w-5 h-5 text-[#D98A2B]" />
              <h2 className="text-xl font-serif-display font-bold text-[#0B3C2D]">Couples Session FAQs</h2>
            </div>
            <div className="space-y-4">
              {couplesFaqs.map((faq, idx) => (
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
              "Nikunj never took sides. He helped us see our defense patterns clearly, and gave us practical ways to express love again."
            </p>
            <span className="text-xs font-bold text-white block">— Couples Client, Pune</span>
          </div>
        </ScrollReveal>

        {/* CTA */}
        <div className="text-center space-y-4 pt-4">
          <h3 className="text-2xl font-serif-display font-bold text-[#0B3C2D]">
            Ready to reconnect with your partner?
          </h3>
          <Link
            href="/contact?service=Relationship%20Repair#booking"
            className="inline-flex items-center px-8 py-4 rounded-full bg-[#D98A2B] hover:bg-[#bd7522] text-white font-bold text-sm shadow-lg transition-all glow-btn"
          >
            Book Your Relationship Session
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>

      </div>
    </div>
  );
}
