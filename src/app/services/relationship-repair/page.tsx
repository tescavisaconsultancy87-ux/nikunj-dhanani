"use client";

import Link from "next/link";
import { CheckCircle2, Shield, Heart, Sparkles, BookOpen } from "lucide-react";

export default function RelationshipRepairPage() {
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
                  src="/service_relationship.png"
                  alt="Relationship Repair Session"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <div className="bg-primary-50 p-6 rounded-3xl border border-primary-200/40 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-accent-navy" />
              <p className="text-sm italic text-primary-800 leading-relaxed pl-2 font-medium">
                "Conflict is not the end of love. It is the beginning of a conversation that, when guided with trust, rebuilds a stronger bridge."
              </p>
            </div>
          </div>

          {/* Right Column - Empathetic Content */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-bold text-accent-navy tracking-widest uppercase block">
                SPECIALIZED PACKAGE
              </span>
              <h1 className="text-4xl font-extrabold font-display tracking-tight text-primary-900 leading-tight">
                Relationship Repair Counselling
              </h1>
              <p className="text-base text-primary-650 leading-relaxed font-normal">
                Every relationship experiences seasons of distance, recurring disagreements, or broken trust. My relationship repair counseling are structured to help couples identify destructive communication loops, build emotional alignment, and discover realistic ways to align their shared goals.
              </p>
            </div>

            {/* Core Values */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: <Heart className="w-4 h-4 text-accent-navy" />, title: "Restorative Dialogue", desc: "Constructive frameworks for talking." },
                { icon: <Shield className="w-4 h-4 text-accent-navy" />, title: "Safe Environment", desc: "Equal validation for both voices." },
                { icon: <Sparkles className="w-4 h-4 text-accent-navy" />, title: "Aligned Future", desc: "Establish shared relationship goals." },
                { icon: <BookOpen className="w-4 h-4 text-accent-navy" />, title: "Practical Handouts", desc: "Conflict resolution tools." }
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

            {/* Package Offerings */}
            <div className="space-y-4 pt-6 border-t border-primary-200">
              <h3 className="text-lg font-bold text-primary-900 font-display">What the Program Includes</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "8 Couples Therapy Sessions",
                  "Individual Intake Consultations",
                  "Conflict Management Frameworks",
                  "Active Listening Workbooks",
                  "Shared Vision Goal Checklists",
                  "Monthly Check-in Calls (Post-therapy)"
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
                Book a Consultation Session
              </Link>
            </div>

          </div>

        </div>

      </div>
    </main>
  );
}
