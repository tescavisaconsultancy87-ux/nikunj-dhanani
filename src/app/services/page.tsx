import React from "react";
import Link from "next/link";
import { Users, Heart, Brain, ArrowRight, PhoneCall, CheckCircle2, ShieldCheck, Sparkles, HelpCircle } from "lucide-react";
import LeafMotif from "@/components/LeafMotif";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata = {
  title: "Counseling Services | N. Dhanani",
  description: "Explore individual counseling, couples relationship repair, and parenting coaching sessions guided directly by me in Mumbai and online across India.",
};

export default function ServicesHubPage() {
  return (
    <div className="bg-[#F8F4EE] py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <ScrollReveal direction="up" delay={100}>
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D98A2B]">
              Practice Offerings Hub
            </span>
            <h1 className="text-4xl sm:text-5xl font-serif-display font-bold text-[#0B3C2D]">
              Structured Counseling for Family, Relationship & Personal Calm
            </h1>
            <p className="text-base text-ink-muted leading-relaxed">
              Every offering is conducted directly by me with personalized session notes, actionable coping frameworks, and complete confidentiality.
            </p>
          </div>
        </ScrollReveal>

        {/* Alternating Service Cards */}
        <div className="space-y-12">
          
          {/* Card 1: Parenting Coaching */}
          <ScrollReveal direction="up" delay={150}>
            <div className="bg-white rounded-3xl p-8 md:p-12 border border-[#0B3C2D]/10 shadow-md grid grid-cols-1 lg:grid-cols-12 gap-8 items-center hover-lift">
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#0B3C2D]/10 text-[#0B3C2D] text-xs font-bold">
                  <Users className="w-4 h-4 text-[#D98A2B]" />
                  <span>Family & Parenting Guidance</span>
                </div>

                <h2 className="text-3xl font-serif-display font-bold text-[#0B3C2D]">
                  Parenting Coaching & Youth Guidance
                </h2>

                <p className="text-sm text-ink-muted leading-relaxed">
                  Designed for parents facing daily household friction, behavioral triggers, academic anxiety, or teenage distance. We replace yelling and guilt with structured, calm communication frameworks.
                </p>

                <div className="bg-[#F8F4EE] p-5 rounded-2xl border border-[#0B3C2D]/10 space-y-2">
                  <h4 className="text-xs font-bold text-[#0B3C2D] uppercase tracking-wider">
                    What a session looks like:
                  </h4>
                  <p className="text-xs text-ink-muted">
                    60 minutes mapping family stress points, identifying behavioral triggers, and establishing practical routine agreements between parents and children.
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 pt-2">
                  <Link
                    href="/services/parenting-coaching"
                    className="inline-flex items-center px-6 py-3 rounded-full bg-[#0B3C2D] hover:bg-[#07291f] text-white font-bold text-xs transition-colors"
                  >
                    Explore Full Parenting Page
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                  <Link
                    href="/contact?service=Parenting%20Coaching#booking"
                    className="inline-flex items-center px-6 py-3 rounded-full bg-[#0B3C2D] hover:bg-[#07291f] text-white font-bold text-xs transition-colors shadow-md"
                  >
                    Book Parenting Session
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5 bg-[#F8F4EE]/80 p-6 rounded-2xl border border-[#0B3C2D]/10 space-y-4">
                <h3 className="text-sm font-bold text-[#0B3C2D] uppercase tracking-wider">
                  Key Topics Covered:
                </h3>
                <ul className="space-y-3 text-xs text-deep-ink">
                  <li className="flex items-start space-x-2">
                    <LeafMotif className="w-4 h-4 text-[#D98A2B] shrink-0 mt-0.5" />
                    <span>De-escalating child tantrums and explosive emotional reactions</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <LeafMotif className="w-4 h-4 text-[#D98A2B] shrink-0 mt-0.5" />
                    <span>Navigating teen independence and digital boundaries</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <LeafMotif className="w-4 h-4 text-[#D98A2B] shrink-0 mt-0.5" />
                    <span>Establishing consistent co-parenting discipline standards</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <LeafMotif className="w-4 h-4 text-[#D98A2B] shrink-0 mt-0.5" />
                    <span>Reducing parental guilt and daily household fatigue</span>
                  </li>
                </ul>
              </div>
            </div>
          </ScrollReveal>

          {/* Card 2: Relationship Repair */}
          <ScrollReveal direction="up" delay={200}>
            <div className="bg-white rounded-3xl p-8 md:p-12 border border-[#0B3C2D]/10 shadow-md grid grid-cols-1 lg:grid-cols-12 gap-8 items-center hover-lift">
              <div className="lg:col-span-5 lg:order-1 order-2 bg-[#F8F4EE]/80 p-6 rounded-2xl border border-[#0B3C2D]/10 space-y-4">
                <h3 className="text-sm font-bold text-[#0B3C2D] uppercase tracking-wider">
                  Key Topics Covered:
                </h3>
                <ul className="space-y-3 text-xs text-deep-ink">
                  <li className="flex items-start space-x-2">
                    <LeafMotif className="w-4 h-4 text-[#0B3C2D] shrink-0 mt-0.5" />
                    <span>Breaking repetitive, unproductive argument cycles</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <LeafMotif className="w-4 h-4 text-[#0B3C2D] shrink-0 mt-0.5" />
                    <span>Rebuilding emotional warmth and trust after strain</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <LeafMotif className="w-4 h-4 text-[#0B3C2D] shrink-0 mt-0.5" />
                    <span>Balancing marital intimacy with parenting duties</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <LeafMotif className="w-4 h-4 text-[#0B3C2D] shrink-0 mt-0.5" />
                    <span>Constructive dialogue for high-stakes financial/family choices</span>
                  </li>
                </ul>
              </div>

              <div className="lg:col-span-7 lg:order-2 order-1 space-y-6">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#D98A2B]/15 text-[#D98A2B] text-xs font-bold">
                  <Heart className="w-4 h-4 fill-current" />
                  <span>Couples & Marital Support</span>
                </div>

                <h2 className="text-3xl font-serif-display font-bold text-[#0B3C2D]">
                  Relationship Repair & Couples Counseling
                </h2>

                <p className="text-sm text-ink-muted leading-relaxed">
                  Helps couples move past emotional distance, defensiveness, and circular arguments. Sessions provide a neutral, safe space to communicate honestly without blame.
                </p>

                <div className="bg-[#F8F4EE] p-5 rounded-2xl border border-[#0B3C2D]/10 space-y-2">
                  <h4 className="text-xs font-bold text-[#0B3C2D] uppercase tracking-wider">
                    What a session looks like:
                  </h4>
                  <p className="text-xs text-ink-muted">
                    60–75 minutes joint session focusing on communication bottlenecks, de-escalation techniques, and co-creating shared partnership goals.
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 pt-2">
                  <Link
                    href="/services/relationship-repair"
                    className="inline-flex items-center px-6 py-3 rounded-full bg-[#0B3C2D] hover:bg-[#07291f] text-white font-bold text-xs transition-colors"
                  >
                    Explore Full Relationship Page
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                  <Link
                    href="/contact?service=Relationship%20Repair#booking"
                    className="inline-flex items-center px-6 py-3 rounded-full bg-[#0B3C2D] hover:bg-[#07291f] text-white font-bold text-xs transition-colors shadow-md"
                  >
                    Book Couples Session
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Card 3: Counselling & Life Coaching */}
          <ScrollReveal direction="up" delay={250}>
            <div className="bg-white rounded-3xl p-8 md:p-12 border border-[#0B3C2D]/10 shadow-md grid grid-cols-1 lg:grid-cols-12 gap-8 items-center hover-lift">
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#8CA899]/20 text-[#0B3C2D] text-xs font-bold">
                  <Brain className="w-4 h-4 text-[#0B3C2D]" />
                  <span>Individual 1-on-1 Support</span>
                </div>

                <h2 className="text-3xl font-serif-display font-bold text-[#0B3C2D]">
                  Counselling & Life Coaching
                </h2>

                <p className="text-sm text-ink-muted leading-relaxed">
                  Tailored 1-on-1 counseling for professionals, executives, and individuals navigating anxiety, work-life burnout, grief, or major life transitions.
                </p>

                <div className="bg-[#F8F4EE] p-5 rounded-2xl border border-[#0B3C2D]/10 space-y-2">
                  <h4 className="text-xs font-bold text-[#0B3C2D] uppercase tracking-wider">
                    What a session looks like:
                  </h4>
                  <p className="text-xs text-ink-muted">
                    60 minutes 1-on-1 video or in-person consultation exploring root triggers, emotional regulation practices, and structured personal development goals.
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 pt-2">
                  <Link
                    href="/services/counselling-life-coaching"
                    className="inline-flex items-center px-6 py-3 rounded-full bg-[#0B3C2D] hover:bg-[#07291f] text-white font-bold text-xs transition-colors"
                  >
                    Explore Full Individual Page
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                  <Link
                    href="/contact?service=Counselling%20%26%20Life%20Coaching#booking"
                    className="inline-flex items-center px-6 py-3 rounded-full bg-[#0B3C2D] hover:bg-[#07291f] text-white font-bold text-xs transition-colors shadow-md"
                  >
                    Book Individual Session
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5 bg-[#F8F4EE]/80 p-6 rounded-2xl border border-[#0B3C2D]/10 space-y-4">
                <h3 className="text-sm font-bold text-[#0B3C2D] uppercase tracking-wider">
                  Key Topics Covered:
                </h3>
                <ul className="space-y-3 text-xs text-deep-ink">
                  <li className="flex items-start space-x-2">
                    <LeafMotif className="w-4 h-4 text-[#8CA899] shrink-0 mt-0.5" />
                    <span>Executive stress management & fatigue recovery</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <LeafMotif className="w-4 h-4 text-[#8CA899] shrink-0 mt-0.5" />
                    <span>Overcoming imposter syndrome & career transition anxiety</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <LeafMotif className="w-4 h-4 text-[#8CA899] shrink-0 mt-0.5" />
                    <span>Establishing personal emotional boundaries</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <LeafMotif className="w-4 h-4 text-[#8CA899] shrink-0 mt-0.5" />
                    <span>Developing sustainable self-care and mental habits</span>
                  </li>
                </ul>
              </div>
            </div>
          </ScrollReveal>

        </div>

        {/* Extended Section: Session Preparation & Guarantees */}
        <ScrollReveal direction="up" delay={300}>
          <div className="bg-white rounded-3xl p-8 md:p-10 border border-[#0B3C2D]/10 space-y-6 shadow-sm">
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#D98A2B] uppercase tracking-wider">
                Practice Standards
              </span>
              <h2 className="text-2xl font-serif-display font-bold text-[#0B3C2D]">
                What Makes My Counseling Unique
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 bg-[#F8F4EE] rounded-2xl border border-[#0B3C2D]/10 space-y-2">
                <Sparkles className="w-6 h-6 text-[#D98A2B]" />
                <h4 className="text-sm font-bold text-[#0B3C2D]">Direct Practitioner Connection</h4>
                <p className="text-xs text-ink-muted">
                  You work directly with me in every session — no junior associates, rotating counselors, or automated app matching.
                </p>
              </div>

              <div className="p-5 bg-[#F8F4EE] rounded-2xl border border-[#0B3C2D]/10 space-y-2">
                <ShieldCheck className="w-6 h-6 text-[#8CA899]" />
                <h4 className="text-sm font-bold text-[#0B3C2D]">Strict Privacy Guarantee</h4>
                <p className="text-xs text-ink-muted">
                  100% confidential sessions. Your records, conversation details, and personal data are never shared or sold.
                </p>
              </div>

              <div className="p-5 bg-[#F8F4EE] rounded-2xl border border-[#0B3C2D]/10 space-y-2">
                <Brain className="w-6 h-6 text-[#0B3C2D]" />
                <h4 className="text-sm font-bold text-[#0B3C2D]">Actionable Frameworks</h4>
                <p className="text-xs text-ink-muted">
                  Every session concludes with concrete takeaways, conversation scripts, or emotional exercises tailored to your daily routine.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </div>
  );
}
