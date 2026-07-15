"use client";

import Link from "next/link";
import { CheckCircle2, Shield, Heart, Sparkles, BookOpen } from "lucide-react";

export default function ParentingBookPage() {
  return (
    <main className="flex-grow pt-28 pb-16 lg:pt-36 lg:pb-24 bg-white animate-fade-in">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-bold text-accent-navy hover:text-accent-navy-hover transition-colors"
          >
            <span className="mr-2">&larr;</span> Back to Home
          </Link>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column - Image & Quick Quote */}
          <div className="lg:col-span-5 space-y-6">
            <div className="aspect-square w-full rounded-[2.5rem] p-2 bg-white border border-primary-200/60 shadow-md overflow-hidden">
              <div className="w-full h-full rounded-[2rem] overflow-hidden bg-primary-50 border border-primary-100 relative">
                <img
                  src="/3rd_work.png"
                  alt="Conscious Parenting E-Book"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <div className="bg-primary-50 p-6 rounded-3xl border border-primary-200/40 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-accent-navy" />
              <p className="text-sm italic text-primary-800 leading-relaxed pl-2 font-medium">
                "Our kids don't need us to be perfect. They need us to be present, to repair when we fall, and to grow alongside them."
              </p>
            </div>
          </div>

          {/* Right Column - Empathetic Content */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-bold text-accent-navy tracking-widest uppercase block">
                COMPLIMENTARY DIGITAL E-BOOK
              </span>
              <h1 className="text-4xl font-extrabold font-display tracking-tight text-primary-900 leading-tight">
                Conscious Parenting E-Book
              </h1>
              <p className="text-base text-primary-650 leading-relaxed font-normal">
                This short e-book introduces the foundations of connection-first parenting. Drawing from clinical studies and hundreds of counseling sessions, it provides parents with simple, actionable frameworks to understand child emotional development, handle tantrums without yelling, and build mutual respect.
              </p>
            </div>

            {/* Core Values */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: <Heart className="w-4 h-4 text-accent-navy" />, title: "Connection Over Control", desc: "Build secure emotional bonds." },
                { icon: <Shield className="w-4 h-4 text-accent-navy" />, title: "Tantrum De-escalation", desc: "Step-by-step calming procedures." },
                { icon: <Sparkles className="w-4 h-4 text-accent-navy" />, title: "Emotional Development", desc: "Understanding age-specific dynamics." },
                { icon: <BookOpen className="w-4 h-4 text-accent-navy" />, title: "Quick Cheat-Sheets", desc: "Printable summaries for quick recall." }
              ].map((val, idx) => (
                <div key={idx} className="flex items-start space-x-3 p-4 rounded-2xl border border-primary-100 bg-primary-50/30">
                  <div className="p-2 rounded-xl bg-white shadow-sm shrink-0">
                    {val.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-primary-900">{val.title}</h3>
                    <p className="text-xs text-primary-550 mt-0.5">{val.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Program Details */}
            <div className="space-y-4 pt-6 border-t border-primary-200">
              <h3 className="text-lg font-bold text-primary-900 font-display">What You'll Get Inside</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "Complete 45-Page E-Book (PDF/EPUB)",
                  "Parent-Child Connection Frameworks",
                  "Age-by-Age Developmental Milestones",
                  "No-Yelling Action Checklists",
                  "Printable Discipline Alternatives Cheat-sheet",
                  "Exclusive Counseling Discounts"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center space-x-2 text-sm text-primary-750 font-normal">
                    <CheckCircle2 className="w-4 h-4 text-accent-navy shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Panel */}
            <div className="pt-8">
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-accent-navy hover:bg-accent-navy-hover text-white font-bold transition-all duration-300 shadow-md text-sm hover-lift"
              >
                Request Free Access
              </Link>
            </div>

          </div>

        </div>

      </div>
    </main>
  );
}
