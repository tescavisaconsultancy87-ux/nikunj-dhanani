"use client";

import React, { useState } from "react";
import { X, ArrowRight, CheckCircle2, RotateCcw, Sparkles } from "lucide-react";
import Link from "next/link";
import LeafMotif from "@/components/LeafMotif";

interface StressQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const quizQuestions = [
  {
    id: 1,
    question: "Over the past two weeks, how often have you felt overwhelmed by daily stress or emotional tension?",
    options: [
      { label: "Almost every day — I feel stretched to my limit", weight: "high", focus: "general" },
      { label: "Frequently — mainly during conflict or family duties", weight: "medium", focus: "family" },
      { label: "Occasionally — specific situations trigger my anxiety", weight: "low", focus: "relationship" },
      { label: "Rarely, but I need guidance on a major decision", weight: "coaching", focus: "coaching" },
    ],
  },
  {
    id: 2,
    question: "Which area in your life is experiencing the highest friction right now?",
    options: [
      { label: "Parenting challenges, children's behavior, or household burnout", focus: "parenting" },
      { label: "Communication breakdowns or emotional distance with my spouse/partner", focus: "relationship" },
      { label: "Workplace stress, executive burnout, or career direction", focus: "counselling" },
      { label: "Managing personal emotional anxiety, boundaries, and balance", focus: "counselling" },
    ],
  },
  {
    id: 3,
    question: "When you try to resolve these struggles on your own, what usually happens?",
    options: [
      { label: "Arguments repeat in cycles without a real resolution", focus: "relationship" },
      { label: "I feel guilty, exhausted, or misunderstood by my family", focus: "parenting" },
      { label: "I suppress my feelings until I burn out or react sharply", focus: "counselling" },
      { label: "I get temporary clarity, but lose momentum without structure", focus: "coaching" },
    ],
  },
  {
    id: 4,
    question: "What primary outcome would bring you the greatest relief?",
    options: [
      { label: "Calm, structured parenting strategies and peaceful home atmosphere", focus: "parenting" },
      { label: "Rebuilding trust, warmth, and honest dialogue with my partner", focus: "relationship" },
      { label: "Clear coping strategies for stress, anxiety, and work-life balance", focus: "counselling" },
      { label: "Personal growth, confidence, and structured life direction", focus: "coaching" },
    ],
  },
];

export default function StressQuizModal({ isOpen, onClose }: StressQuizModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [recommendedService, setRecommendedService] = useState<{
    title: string;
    description: string;
    href: string;
    serviceParam: string;
  }>({
    title: "",
    description: "",
    href: "",
    serviceParam: "",
  });

  if (!isOpen) return null;

  const handleSelectOption = (focus: string) => {
    const updatedAnswers = [...answers, focus];
    setAnswers(updatedAnswers);

    if (currentStep < quizQuestions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate recommendation
      const counts: Record<string, number> = {};
      updatedAnswers.forEach((item) => {
        counts[item] = (counts[item] || 0) + 1;
      });

      let topFocus = "counselling";
      let maxCount = 0;
      Object.entries(counts).forEach(([key, val]) => {
        if (val > maxCount) {
          maxCount = val;
          topFocus = key;
        }
      });

      if (topFocus === "parenting") {
        setRecommendedService({
          title: "Parenting & Family Coaching",
          description: "Your responses suggest parenting stress and family communication friction. Structured coaching will give you proven frameworks for child behavior, emotional calm, and peaceful home routines.",
          href: "/services/parenting-coaching",
          serviceParam: "Parenting Coaching",
        });
      } else if (topFocus === "relationship") {
        setRecommendedService({
          title: "Relationship Repair & Couples Counseling",
          description: "Your responses indicate misaligned communication cycles or emotional distance in your relationship. Guided sessions help break negative patterns and restore warmth and trust.",
          href: "/services/relationship-repair",
          serviceParam: "Relationship Repair",
        });
      } else {
        setRecommendedService({
          title: "Individual Counseling & Life Coaching",
          description: "Your responses highlight personal stress, emotional fatigue, or life transitions. 1-on-1 counseling provides a safe, evidence-based space to regain balance, clarity, and peace of mind.",
          href: "/services/counselling-life-coaching",
          serviceParam: "Counselling & Life Coaching",
        });
      }

      setIsCompleted(true);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers([]);
    setIsCompleted(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1B2A2E]/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#0F3D3E]/10 my-auto">
        {/* Modal Header */}
        <div className="bg-warm-linen px-6 py-4 border-b border-[#0F3D3E]/10 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <LeafMotif className="w-5 h-5 text-[#0F3D3E]" />
            <h3 className="font-display font-semibold text-lg text-[#0F3D3E]">
              2-Minute Stress & Clarity Check-in
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-ink-muted hover:text-ink-navy hover:bg-[#8FB8B0]/20 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress bar */}
        {!isCompleted && (
          <div className="w-full bg-[#E5DFC5]/40 h-1.5">
            <div
              className="bg-[#E08A3E] h-1.5 transition-all duration-300 ease-out"
              style={{ width: `${((currentStep + 1) / quizQuestions.length) * 100}%` }}
            ></div>
          </div>
        )}

        <div className="p-6 md:p-8">
          {!isCompleted ? (
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-ink-muted uppercase tracking-wider mb-2">
                <span>Question {currentStep + 1} of {quizQuestions.length}</span>
                <span>Self-Assessment</span>
              </div>
              <h4 className="text-xl md:text-2xl font-display font-bold text-ink-navy mb-6 leading-tight">
                {quizQuestions[currentStep].question}
              </h4>

              <div className="space-y-3">
                {quizQuestions[currentStep].options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(opt.focus)}
                    className="w-full text-left p-4 rounded-xl border border-[#0F3D3E]/15 hover:border-[#0F3D3E] bg-warm-linen/40 hover:bg-[#8FB8B0]/10 transition-all duration-200 text-ink-navy font-medium text-sm md:text-base flex items-center justify-between group"
                  >
                    <span>{opt.label}</span>
                    <ArrowRight className="w-4 h-4 text-[#0F3D3E] opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-2 animate-fade-in">
              <div className="w-14 h-14 rounded-full bg-[#A9C4A0]/20 text-[#0F3D3E] flex items-center justify-center mx-auto mb-4 border border-[#A9C4A0]/40">
                <Sparkles className="w-7 h-7 text-[#E08A3E]" />
              </div>

              <span className="inline-block px-3 py-1 rounded-full bg-[#E08A3E]/10 text-[#E08A3E] text-xs font-bold uppercase tracking-wider mb-2">
                Assessment Complete
              </span>

              <h4 className="text-2xl font-display font-bold text-[#0F3D3E] mb-3">
                Recommended Support: {recommendedService.title}
              </h4>

              <p className="text-ink-muted text-sm md:text-base mb-6 leading-relaxed bg-warm-linen p-4 rounded-xl border border-[#0F3D3E]/10">
                {recommendedService.description}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href={`/contact?service=${encodeURIComponent(recommendedService.serviceParam)}#booking`}
                  onClick={onClose}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#E08A3E] hover:bg-[#c9752b] text-white font-bold text-sm shadow-md transition-all glow-btn"
                >
                  Book Recommended Session
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-3 rounded-full border border-[#0F3D3E]/20 text-[#0F3D3E] hover:bg-warm-linen text-sm font-semibold transition-colors"
                >
                  <RotateCcw className="w-4 h-4 mr-1.5" />
                  Retake Quiz
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Note */}
        <div className="px-6 py-3 bg-warm-linen/60 border-t border-[#0F3D3E]/10 text-center">
          <p className="text-[11px] text-ink-light">
            🔒 Confidential & Free — This self-check tool is for personal insight and guidance, not a medical diagnosis.
          </p>
        </div>
      </div>
    </div>
  );
}
