"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BookOpen, Search, Clock, ArrowRight, Tag, PhoneCall, Download, FileText } from "lucide-react";
import LeafMotif from "@/components/LeafMotif";
import ScrollReveal from "@/components/ScrollReveal";

const downloadableGuides = [
  { title: "Parenting Calm Guidebook", image: "/parenting_book.png", tag: "Parenting", pages: "18 Pages PDF" },
  { title: "Couples Relationship Guide", image: "/family_guide.png", tag: "Relationships", pages: "24 Pages PDF" },
  { title: "Executive Stress & Resilience Toolkit", image: "/stress_toolkit.png", tag: "Stress Management", pages: "15 Pages PDF" },
];

const articles = [
  {
    id: "parenting-triggers",
    title: "5 Hidden Triggers Behind Childhood Behavioral Outbursts",
    category: "Parenting",
    readTime: "3 min read",
    snippet: "Childhood tantrums are rarely about refusing discipline. Most emotional outbursts occur when a child experiences sensory overwhelm or feels unable to express fear. Here is how to respond with calm boundaries.",
    fullContent: `Childhood tantrums are rarely about refusing discipline. Most emotional outbursts occur when a child experiences sensory overwhelm or feels unable to express fear. When parents respond with shouting or immediate punishment, it heightens the child's neurological threat response.

To break this cycle, use the 3-second pause:
1. Lower your vocal pitch and crouch to eye level.
2. Validate their emotional state ("I see you are feeling frustrated right now").
3. Set the boundary calmly without arguing ("It is okay to feel angry, but it is not okay to hit").

Consistent application of this framework creates emotional safety while holding firm behavioral standards.`,
  },
  {
    id: "relationship-arguments",
    title: "Why Couples Get Trapped in the Same Argument for Years",
    category: "Relationships",
    readTime: "4 min read",
    snippet: "Circular arguments occur when partners argue over the surface topic (chores, schedules, finances) rather than the underlying emotional need for appreciation and respect.",
    fullContent: `Circular arguments occur when partners argue over the surface topic rather than the underlying emotional need. When one partner feels unappreciated, a simple disagreement about household duties escalates into a debate over commitment.

To interrupt a circular argument:
- Name the pattern out loud: "We are stepping into our usual argument loop."
- Shift from 'You' statements to 'I' statements ("I feel overwhelmed" vs "You never help").
- Agree on a 15-minute cool-down period before continuing sensitive discussions.

Couples counseling provides the neutral structure required to untangle these historical defense patterns.`,
  },
  {
    id: "executive-burnout",
    title: "Overcoming Executive Burnout: The 4 Signs of Decision Fatigue",
    category: "Stress Management",
    readTime: "3 min read",
    snippet: "High achievers often mistake chronic exhaustion for lack of willpower. Recognizing decision fatigue early allows corporate leaders to protect their focus and personal well-being.",
    fullContent: `High achievers often mistake chronic exhaustion for lack of willpower. When managers make hundreds of micro-decisions daily without adequate recovery, decision fatigue sets in, leading to irritability, cynicism, and sleep disruption.

Key recovery practices for leaders:
- Micro-breaks: 5 minutes of quiet breathwork between high-stakes meetings.
- Boundary setting: Establishing clear offline hours after 7:00 PM.
- Delegating routine choices: Structuring workflows to minimize low-priority decisions.

Personal coaching helps executives design sustainable mental routines that protect peak performance.`,
  },
  {
    id: "teenager-communication",
    title: "Communicating With Teenagers Without Triggering Defensiveness",
    category: "Parenting",
    readTime: "4 min read",
    snippet: "Teenagers naturally seek independence. Interrogating them about school or friends often shuts down dialogue. Discover how to ask open-ended questions that invite connection.",
    fullContent: `Teenagers naturally seek independence. Interrogating them about school or friends often shuts down dialogue. When parents ask rapid-fire questions, teenagers perceive it as control rather than care.

Try these subtle communication shifts:
- Move from interrogation to curiosity ("How was your day?" -> "What was the most interesting part of your afternoon?").
- Use drive-time conversations: Parallel seating in a car reduces intense eye contact and feels safer for teens.
- Respect privacy while maintaining safety boundaries.`,
  },
  {
    id: "rebuilding-trust",
    title: "Rebuilding Trust & Warmth After Emotional Distance",
    category: "Relationships",
    readTime: "3 min read",
    snippet: "Emotional distance rarely happens overnight. Rebuilding warmth requires daily micro-connections and consistent honesty.",
    fullContent: `Emotional distance rarely happens overnight. It builds gradually through unaddressed misunderstandings and busy schedules.

To rebuild warmth:
- Practice 5-minute daily check-ins focused solely on each other's emotional well-being.
- Express explicit gratitude for small everyday efforts.
- Schedule dedicated 1-on-1 time without screens or family discussions.`,
  },
  {
    id: "emotional-resilience",
    title: "Designing a Personal Mental Wellness Toolkit for Busy Professionals",
    category: "Stress Management",
    readTime: "3 min read",
    snippet: "Mental resilience is built through intentional daily habits, not sudden breakthroughs. Learn how to structure your personal wellness routine.",
    fullContent: `Mental resilience is built through intentional daily habits. Busy professionals require practical, low-friction strategies that fit into demanding work schedules.

Essential toolkit components:
- Morning grounding: 10 minutes without checking emails upon waking.
- Physical movement: Mid-day walking breaks to regulate nervous system arousal.
- Evening reflection: Writing down 3 wins or clear priorities for the next day.`,
  },
];

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", "Parenting", "Relationships", "Stress Management"];

  const filteredArticles = articles.filter((art) => {
    const matchesCategory = selectedCategory === "All" || art.category === selectedCategory;
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.snippet.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-[#F8F4EE] py-12 md:py-20 space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header Hero */}
        <ScrollReveal direction="up" delay={100}>
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D98A2B]">
              Insights & Guides
            </span>
            <h1 className="text-4xl sm:text-5xl font-serif-display font-bold text-[#0B3C2D]">
              Articles & Guides on Family Calm & Stress Relief
            </h1>
            <p className="text-base text-ink-muted leading-relaxed">
              Practical, evidence-based insights and downloadable resource booklets created by Nikunj Dhanani.
            </p>
          </div>
        </ScrollReveal>

        {/* Downloadable Guides Feature Showcase */}
        <ScrollReveal direction="up" delay={150}>
          <div className="space-y-6">
            <div className="text-center">
              <span className="text-xs font-bold uppercase tracking-widest text-[#D98A2B]">Featured E-Books</span>
              <h2 className="text-2xl font-serif-display font-bold text-[#0B3C2D] mt-1">Downloadable Practice Booklets</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {downloadableGuides.map((guide, idx) => (
                <div key={idx} className="bg-white rounded-3xl p-6 border border-[#0B3C2D]/10 shadow-md hover-lift flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="h-52 rounded-2xl overflow-hidden shadow-sm">
                      <img src={guide.image} alt={guide.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    </div>
                    <span className="inline-block px-3 py-1 rounded-full bg-[#D98A2B]/15 text-[#D98A2B] text-[11px] font-bold">
                      {guide.tag} · {guide.pages}
                    </span>
                    <h3 className="text-lg font-serif-display font-bold text-[#0B3C2D]">{guide.title}</h3>
                  </div>
                  <Link
                    href="/contact#booking"
                    className="w-full inline-flex items-center justify-center py-2.5 px-4 rounded-full bg-[#0B3C2D] hover:bg-[#07291f] text-white text-xs font-bold transition-colors"
                  >
                    <Download className="w-3.5 h-3.5 mr-1.5" />
                    Request Copy in Session
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Filter & Search Bar */}
        <ScrollReveal direction="up" delay={200}>
          <div className="bg-white p-4 md:p-6 rounded-3xl border border-[#0B3C2D]/10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Category Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                    selectedCategory === cat
                      ? "bg-[#0B3C2D] text-white shadow-sm"
                      : "bg-[#F8F4EE] text-[#0B3C2D] hover:bg-[#8CA899]/20"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Box */}
            <div className="relative w-full md:w-72">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-full border border-[#0B3C2D]/15 text-xs text-deep-ink focus:outline-none focus:border-[#0B3C2D]"
              />
              <Search className="w-4 h-4 text-ink-light absolute left-3 top-2.5" />
            </div>
          </div>
        </ScrollReveal>

        {/* Article Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((art, idx) => (
            <ScrollReveal key={art.id} direction="up" delay={150 + idx * 40}>
              <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#0B3C2D]/10 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between hover-lift group h-full">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-[#D98A2B]/15 text-[#D98A2B] text-[11px] font-bold">
                      {art.category}
                    </span>
                    <span className="text-[11px] text-ink-light flex items-center">
                      <Clock className="w-3.5 h-3.5 mr-1" />
                      {art.readTime}
                    </span>
                  </div>

                  <h3 className="text-xl font-serif-display font-bold text-[#0B3C2D] group-hover:text-[#D98A2B] transition-colors leading-snug">
                    {art.title}
                  </h3>

                  <p className="text-xs text-ink-muted leading-relaxed">
                    {art.snippet}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#0B3C2D]/5 space-y-3">
                  <div className="bg-[#F8F4EE] p-4 rounded-2xl border border-[#0B3C2D]/10 text-xs text-deep-ink leading-relaxed whitespace-pre-line">
                    {art.fullContent}
                  </div>

                  <Link
                    href="/contact#booking"
                    className="w-full inline-flex items-center justify-center py-2.5 px-4 rounded-full bg-[#0B3C2D] hover:bg-[#07291f] text-white text-xs font-bold transition-colors mt-2"
                  >
                    <PhoneCall className="w-3.5 h-3.5 mr-1.5" />
                    Discuss This in Session
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </div>
  );
}
