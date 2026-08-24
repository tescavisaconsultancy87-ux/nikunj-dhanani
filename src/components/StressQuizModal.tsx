"use client";

import React, { useState } from "react";
import { X, ArrowRight, CheckCircle2, RotateCcw, Sparkles, ChevronLeft, ShieldCheck } from "lucide-react";
import Link from "next/link";
import LeafMotif from "@/components/LeafMotif";

interface StressQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface QuizOption {
  label: string;
  nextId: string;
  domain: "parenting" | "relationship" | "burnout" | "teen" | "anxiety";
  subTag?: string;
  weight?: number;
}

interface QuizQuestionNode {
  id: string;
  category: string;
  question: string;
  options: QuizOption[];
}

// ── 26-QUESTION DYNAMIC ADAPTIVE DECISION TREE ──
const questionBank: Record<string, QuizQuestionNode> = {
  // ROOT NODE
  start: {
    id: "start",
    category: "Initial Assessment",
    question: "Which area of your life is experiencing the highest stress or friction right now?",
    options: [
      { label: "Parenting challenges, child behavior, or daily household burnout", nextId: "parenting_1", domain: "parenting", subTag: "Family Dynamics" },
      { label: "Communication breakdowns or emotional distance with my spouse/partner", nextId: "relationship_1", domain: "relationship", subTag: "Couples Repair" },
      { label: "Workplace pressure, executive burnout, or decision fatigue", nextId: "burnout_1", domain: "burnout", subTag: "Executive Care" },
      { label: "Teenager conflict, digital screen battles, or youth academic stress", nextId: "teen_1", domain: "teen", subTag: "Teen Guidance" },
      { label: "Personal anxiety, boundary issues, or major life transition shifts", nextId: "anxiety_1", domain: "anxiety", subTag: "Personal Growth" },
    ],
  },

  // ── BRANCH 1: PARENTING & FAMILY ──
  parenting_1: {
    id: "parenting_1",
    category: "Parenting & Household Dynamics",
    question: "What is the primary source of daily friction with your child/children?",
    options: [
      { label: "Explosive tantrums, emotional outbursts, or defiant behavior", nextId: "parenting_behavior", domain: "parenting", subTag: "Child Behavior" },
      { label: "Morning & bedtime routines are constant battles and exhausting", nextId: "parenting_routine", domain: "parenting", subTag: "Routine Structure" },
      { label: "My partner and I disagree sharply on discipline and parenting rules", nextId: "parenting_coparenting", domain: "parenting", subTag: "Co-Parenting Alignment" },
      { label: "Constant parental guilt, feeling like I'm failing despite trying hard", nextId: "parenting_guilt", domain: "parenting", subTag: "Parental Overwhelm" },
    ],
  },
  parenting_behavior: {
    id: "parenting_behavior",
    category: "Parenting & Behavior",
    question: "When your child exhibits explosive or defiant behavior, how do you usually react?",
    options: [
      { label: "I try to stay calm, but eventually yell or lose my patience", nextId: "parenting_impact", domain: "parenting", weight: 3 },
      { label: "I give in to avoid major scenes, which creates bad long-term habits", nextId: "parenting_impact", domain: "parenting", weight: 2 },
      { label: "My partner and I end up arguing about how to handle the child", nextId: "parenting_coparenting", domain: "parenting", weight: 3 },
      { label: "I feel helpless and withdraw emotionally until the storm passes", nextId: "parenting_impact", domain: "parenting", weight: 2 },
    ],
  },
  parenting_routine: {
    id: "parenting_routine",
    category: "Parenting & Household Structure",
    question: "How does household stress affect your overall family peace?",
    options: [
      { label: "Evenings are tense, leaving no time for rest or partner connection", nextId: "parenting_impact", domain: "parenting", weight: 3 },
      { label: "Screen time and homework create daily shouting matches", nextId: "parenting_impact", domain: "parenting", weight: 3 },
      { label: "I feel like a full-time manager rather than an empathetic parent", nextId: "parenting_goal", domain: "parenting", weight: 2 },
    ],
  },
  parenting_coparenting: {
    id: "parenting_coparenting",
    category: "Co-Parenting Alignment",
    question: "How does co-parenting disagreement impact your relationship with your spouse?",
    options: [
      { label: "It leads to silent resentment or arguing in front of the kids", nextId: "parenting_goal", domain: "relationship", weight: 3 },
      { label: "One of us becomes the 'strict' parent while the other is 'permissive'", nextId: "parenting_goal", domain: "parenting", weight: 3 },
      { label: "We feel like roommates managing kids rather than a united team", nextId: "parenting_goal", domain: "relationship", weight: 3 },
    ],
  },
  parenting_guilt: {
    id: "parenting_guilt",
    category: "Parental Wellbeing",
    question: "After a high-stress day with your family, what thoughts stay with you?",
    options: [
      { label: "I feel guilty for losing my temper and worry about long-term impact", nextId: "parenting_goal", domain: "parenting", weight: 3 },
      { label: "I feel deeply exhausted and lack energy for my own life or spouse", nextId: "parenting_goal", domain: "parenting", weight: 2 },
      { label: "I feel alone because no one in the household appreciates my efforts", nextId: "parenting_goal", domain: "parenting", weight: 3 },
    ],
  },
  parenting_impact: {
    id: "parenting_impact",
    category: "Family Wellbeing Impact",
    question: "How long has your family been navigating this level of parenting stress?",
    options: [
      { label: "Over 6 months — it feels like our new normal and we need help", nextId: "parenting_goal", domain: "parenting", weight: 3 },
      { label: "Recently escalated due to school transitions or behavioral shifts", nextId: "parenting_goal", domain: "parenting", weight: 2 },
      { label: "It comes in waves, but each wave leaves us more exhausted", nextId: "parenting_goal", domain: "parenting", weight: 2 },
    ],
  },
  parenting_goal: {
    id: "parenting_goal",
    category: "Desired Outcome",
    question: "What outcome would bring your family the greatest relief right now?",
    options: [
      { label: "Clear, structured scripts for child discipline & peaceful routines", nextId: "RESULT", domain: "parenting", weight: 4 },
      { label: "Unifying with my partner on consistent co-parenting boundaries", nextId: "RESULT", domain: "parenting", weight: 4 },
      { label: "Replacing daily yelling with calm, respectful family communication", nextId: "RESULT", domain: "parenting", weight: 4 },
    ],
  },

  // ── BRANCH 2: MARRIAGE & RELATIONSHIP REPAIR ──
  relationship_1: {
    id: "relationship_1",
    category: "Couples & Marital Friction",
    question: "What best describes the current emotional state of your relationship?",
    options: [
      { label: "We get stuck in the exact same arguments over and over", nextId: "relationship_communication", domain: "relationship", subTag: "Conflict Cycles" },
      { label: "We feel like emotional strangers or roommates living parallel lives", nextId: "relationship_intimacy", domain: "relationship", subTag: "Emotional Intimacy" },
      { label: "Post-kids stress has drained our romantic warmth and patience", nextId: "relationship_postkids", domain: "relationship", subTag: "Post-Kids Strain" },
      { label: "Past misunderstandings or broken trust are hovering unresolved", nextId: "relationship_pattern", domain: "relationship", subTag: "Trust Renewal" },
    ],
  },
  relationship_communication: {
    id: "relationship_communication",
    category: "Couples Communication",
    question: "When a disagreement starts, how does it usually unfold?",
    options: [
      { label: "One person becomes defensive/angry while the other shuts down", nextId: "relationship_pattern", domain: "relationship", weight: 3 },
      { label: "Small minor issues spiral into major personal attacks", nextId: "relationship_pattern", domain: "relationship", weight: 3 },
      { label: "We avoid discussing sensitive topics to keep a fake peace", nextId: "relationship_pattern", domain: "relationship", weight: 2 },
    ],
  },
  relationship_intimacy: {
    id: "relationship_intimacy",
    category: "Emotional Intimacy & Bond",
    question: "How often do you and your partner share genuine warmth or meaningful conversations?",
    options: [
      { label: "Rarely — conversations are strictly operational about kids/bills", nextId: "relationship_goal", domain: "relationship", weight: 3 },
      { label: "We try, but friction or defensive walls build up quickly", nextId: "relationship_goal", domain: "relationship", weight: 3 },
      { label: "I feel unappreciated and emotionally lonely in the marriage", nextId: "relationship_goal", domain: "relationship", weight: 3 },
    ],
  },
  relationship_postkids: {
    id: "relationship_postkids",
    category: "Post-Kids Relationship Strain",
    question: "How has managing parenting or work responsibilities altered your bond?",
    options: [
      { label: "We have zero quality time alone together as a couple", nextId: "relationship_goal", domain: "relationship", weight: 3 },
      { label: "Resentment has built over division of household work and effort", nextId: "relationship_goal", domain: "relationship", weight: 3 },
      { label: "Stress makes us short-tempered with each other by evening", nextId: "relationship_goal", domain: "relationship", weight: 2 },
    ],
  },
  relationship_pattern: {
    id: "relationship_pattern",
    category: "Conflict De-escalation",
    question: "When you try to resolve these struggles on your own, what happens?",
    options: [
      { label: "We make temporary peace, but the root cause isn't solved", nextId: "relationship_goal", domain: "relationship", weight: 3 },
      { label: "One or both of us feels unheard, invalidating our emotions", nextId: "relationship_goal", domain: "relationship", weight: 3 },
      { label: "The argument ends in silent treatment for days", nextId: "relationship_goal", domain: "relationship", weight: 3 },
    ],
  },
  relationship_goal: {
    id: "relationship_goal",
    category: "Desired Relationship Outcome",
    question: "What would bring the deepest healing to your relationship right now?",
    options: [
      { label: "Breaking repetitive argument cycles with proven de-escalation tools", nextId: "RESULT", domain: "relationship", weight: 4 },
      { label: "Rebuilding emotional intimacy, warmth, and mutual appreciation", nextId: "RESULT", domain: "relationship", weight: 4 },
      { label: "Learning to communicate honest needs without triggering defensiveness", nextId: "RESULT", domain: "relationship", weight: 4 },
    ],
  },

  // ── BRANCH 3: CORPORATE BURNOUT & LEADERSHIP ──
  burnout_1: {
    id: "burnout_1",
    category: "Executive Burnout & Workplace Pressure",
    question: "What is the primary driver of your current work-related stress?",
    options: [
      { label: "High-stakes executive decision fatigue and constant responsibility", nextId: "burnout_decision", domain: "burnout", subTag: "Decision Fatigue" },
      { label: "Work stress is leaking into my family life, sleep, and health", nextId: "burnout_leakage", domain: "burnout", subTag: "Stress Leakage" },
      { label: "Inability to set firm work-life boundaries or turn off my mind", nextId: "burnout_boundary", domain: "burnout", subTag: "Work Boundaries" },
      { label: "Uncertainty around career direction, identity, or leadership pressure", nextId: "burnout_clarity", domain: "burnout", subTag: "Career Clarity" },
    ],
  },
  burnout_decision: {
    id: "burnout_decision",
    category: "Decision Fatigue & Exhaustion",
    question: "How does decision fatigue manifest in your daily routine?",
    options: [
      { label: "I feel mentally depleted by evening and struggle to engage at home", nextId: "burnout_impact", domain: "burnout", weight: 3 },
      { label: "I suffer from insomnia, chronic tension, or anxiety on weekdays", nextId: "burnout_impact", domain: "burnout", weight: 3 },
      { label: "I react with irritability towards family members or team members", nextId: "burnout_impact", domain: "burnout", weight: 3 },
    ],
  },
  burnout_leakage: {
    id: "burnout_leakage",
    category: "Work-Life Boundaries",
    question: "How is your work pressure impacting your personal relationships?",
    options: [
      { label: "My partner feels I am physically present but mentally absent", nextId: "burnout_goal", domain: "burnout", weight: 3 },
      { label: "I have no patience for normal family noise or parenting demands", nextId: "burnout_goal", domain: "burnout", weight: 3 },
      { label: "I feel guilty for not giving my best to either work or family", nextId: "burnout_goal", domain: "burnout", weight: 3 },
    ],
  },
  burnout_boundary: {
    id: "burnout_boundary",
    category: "Boundary Setting",
    question: "What happens when you try to disconnect from work during weekends?",
    options: [
      { label: "I constantly check messages or mentally replay work problems", nextId: "burnout_goal", domain: "burnout", weight: 3 },
      { label: "I feel guilty for taking rest or relaxing", nextId: "burnout_goal", domain: "burnout", weight: 2 },
      { label: "Unexpected work emergencies disrupt my planned family time", nextId: "burnout_goal", domain: "burnout", weight: 3 },
    ],
  },
  burnout_clarity: {
    id: "burnout_clarity",
    category: "Career Direction & Purpose",
    question: "What clarity are you seeking regarding your career or leadership role?",
    options: [
      { label: "Learning to delegate and manage pressure without personal burnout", nextId: "burnout_goal", domain: "burnout", weight: 3 },
      { label: "Evaluating a major career shift, business transition, or new direction", nextId: "burnout_goal", domain: "burnout", weight: 3 },
      { label: "Regaining passion, focus, and personal resilience in my current role", nextId: "burnout_goal", domain: "burnout", weight: 3 },
    ],
  },
  burnout_impact: {
    id: "burnout_impact",
    category: "Coping Mechanisms",
    question: "When work pressure peaks, how do you typically cope?",
    options: [
      { label: "I push harder until my body or mind forces me to stop", nextId: "burnout_goal", domain: "burnout", weight: 3 },
      { label: "I isolate myself and suffer through executive stress in silence", nextId: "burnout_goal", domain: "burnout", weight: 3 },
      { label: "I get temporary relief, but lack long-term coping frameworks", nextId: "burnout_goal", domain: "burnout", weight: 2 },
    ],
  },
  burnout_goal: {
    id: "burnout_goal",
    category: "Desired Burnout Relief",
    question: "What primary outcome would bring you the greatest executive clarity?",
    options: [
      { label: "Evidence-based stress prevention & emotional regulation tools", nextId: "RESULT", domain: "burnout", weight: 4 },
      { label: "Clear personal boundaries to protect my home life and sleep", nextId: "RESULT", domain: "burnout", weight: 4 },
      { label: "1-on-1 confidential executive coaching for decision clarity", nextId: "RESULT", domain: "burnout", weight: 4 },
    ],
  },

  // ── BRANCH 4: TEEN CONFLICT & GUIDANCE ──
  teen_1: {
    id: "teen_1",
    category: "Teenager & Youth Guidance",
    question: "What is the biggest struggle you are facing with your teenager?",
    options: [
      { label: "Communication gap — my teen is distant, secretive, or uncommunicative", nextId: "teen_communication", domain: "teen", subTag: "Communication Gap" },
      { label: "Screen time, smartphone addiction, or social media isolation", nextId: "teen_screens", domain: "teen", subTag: "Screen Battles" },
      { label: "Academic anxiety, exam pressure, or career decision confusion", nextId: "teen_academics", domain: "teen", subTag: "Academic Stress" },
      { label: "Frequent mood swings, defensiveness, or rebellion against boundaries", nextId: "teen_mood", domain: "teen", subTag: "Emotional Regulation" },
    ],
  },
  teen_communication: {
    id: "teen_communication",
    category: "Teen Communication",
    question: "When you try to talk to your teen about important issues, what occurs?",
    options: [
      { label: "They roll their eyes, give 1-word answers, or retreat to their room", nextId: "teen_goal", domain: "teen", weight: 3 },
      { label: "Conversations quickly turn into heated shouting matches", nextId: "teen_goal", domain: "teen", weight: 3 },
      { label: "I feel like I'm walking on eggshells around their changing moods", nextId: "teen_goal", domain: "teen", weight: 3 },
    ],
  },
  teen_screens: {
    id: "teen_screens",
    category: "Digital Screen Boundaries",
    question: "How does screen time impact your household harmony?",
    options: [
      { label: "Enforcing phone limits triggers explosive arguments every time", nextId: "teen_goal", domain: "teen", weight: 3 },
      { label: "My teen stays up late on screens, affecting their sleep and mood", nextId: "teen_goal", domain: "teen", weight: 3 },
      { label: "I worry about their online exposure and lack of real-world focus", nextId: "teen_goal", domain: "teen", weight: 2 },
    ],
  },
  teen_academics: {
    id: "teen_academics",
    category: "Academic & Exam Stress",
    question: "How is exam or career pressure affecting your teenager?",
    options: [
      { label: "They experience severe anxiety, panic, or fear of failure", nextId: "teen_goal", domain: "teen", weight: 3 },
      { label: "They have given up or show complete apathy toward studies", nextId: "teen_goal", domain: "teen", weight: 3 },
      { label: "Parental expectations are causing friction between us", nextId: "teen_goal", domain: "teen", weight: 3 },
    ],
  },
  teen_mood: {
    id: "teen_mood",
    category: "Teen Emotional Regulation",
    question: "How do you currently handle your teen's mood shifts or withdrawal?",
    options: [
      { label: "I enforce strict consequences, but it increases their distance", nextId: "teen_goal", domain: "teen", weight: 3 },
      { label: "I step back completely, but feel worried about their well-being", nextId: "teen_goal", domain: "teen", weight: 2 },
      { label: "We end up in constant power struggles with no winner", nextId: "teen_goal", domain: "teen", weight: 3 },
    ],
  },
  teen_goal: {
    id: "teen_goal",
    category: "Desired Teen Outcome",
    question: "What shift would make the biggest difference in your relationship with your teen?",
    options: [
      { label: "Building emotional safety so my teen talks openly without shutting down", nextId: "RESULT", domain: "teen", weight: 4 },
      { label: "Establishing respectful screen boundaries without explosive conflict", nextId: "RESULT", domain: "teen", weight: 4 },
      { label: "Helping my teen manage exam anxiety and build personal resilience", nextId: "RESULT", domain: "teen", weight: 4 },
    ],
  },

  // ── BRANCH 5: PERSONAL ANXIETY & LIFE DIRECTION ──
  anxiety_1: {
    id: "anxiety_1",
    category: "Personal Stress & Life Direction",
    question: "What internal challenge is most prominent for you right now?",
    options: [
      { label: "Persistent emotional anxiety, overthinking, or feeling overwhelmed", nextId: "anxiety_overwhelm", domain: "anxiety", subTag: "Anxiety & Overthinking" },
      { label: "Difficulty saying 'no', setting firm boundaries, or people-pleasing", nextId: "anxiety_boundaries", domain: "anxiety", subTag: "Personal Boundaries" },
      { label: "Navigating a major life transition (career, marriage, moving, age shift)", nextId: "anxiety_transition", domain: "anxiety", subTag: "Life Transition" },
      { label: "Feeling stuck, lacking clarity or confidence in my personal goals", nextId: "anxiety_direction", domain: "anxiety", subTag: "Life Direction" },
    ],
  },
  anxiety_overwhelm: {
    id: "anxiety_overwhelm",
    category: "Anxiety & Overthinking",
    question: "How does this anxiety impact your daily life?",
    options: [
      { label: "Constant mental chatter makes it hard to focus or sleep", nextId: "anxiety_goal", domain: "anxiety", weight: 3 },
      { label: "I feel a tight chest or physical restlessness when under stress", nextId: "anxiety_goal", domain: "anxiety", weight: 3 },
      { label: "I second-guess every decision I make, leading to inaction", nextId: "anxiety_goal", domain: "anxiety", weight: 3 },
    ],
  },
  anxiety_boundaries: {
    id: "anxiety_boundaries",
    category: "Personal Boundaries",
    question: "When you try to set boundaries with family, friends, or work, what happens?",
    options: [
      { label: "I feel intense guilt and eventually back down", nextId: "anxiety_goal", domain: "anxiety", weight: 3 },
      { label: "I take on too much responsibility until I burn out quietly", nextId: "anxiety_goal", domain: "anxiety", weight: 3 },
      { label: "Others react defensively, making me feel unreasonable", nextId: "anxiety_goal", domain: "anxiety", weight: 3 },
    ],
  },
  anxiety_transition: {
    id: "anxiety_transition",
    category: "Life Transition Support",
    question: "What is making this current life transition stressful for you?",
    options: [
      { label: "Fear of making the wrong choice and facing regret", nextId: "anxiety_goal", domain: "anxiety", weight: 3 },
      { label: "Loss of familiar routine, identity, or emotional security", nextId: "anxiety_goal", domain: "anxiety", weight: 3 },
      { label: "Navigating expectations from family or society", nextId: "anxiety_goal", domain: "anxiety", weight: 2 },
    ],
  },
  anxiety_direction: {
    id: "anxiety_direction",
    category: "Life Coaching & Direction",
    question: "What is holding you back from achieving the clarity you want?",
    options: [
      { label: "Lack of a structured action plan and accountability", nextId: "anxiety_goal", domain: "anxiety", weight: 3 },
      { label: "Self-doubt and lingering negative self-talk", nextId: "anxiety_goal", domain: "anxiety", weight: 3 },
      { label: "Overwhelming choices with no clear priority", nextId: "anxiety_goal", domain: "anxiety", weight: 2 },
    ],
  },
  anxiety_goal: {
    id: "anxiety_goal",
    category: "Desired Personal Outcome",
    question: "What outcome would bring you the greatest peace of mind?",
    options: [
      { label: "Practical tools for emotional regulation & anxiety relief", nextId: "RESULT", domain: "anxiety", weight: 4 },
      { label: "Confidence to set healthy boundaries without guilt", nextId: "RESULT", domain: "anxiety", weight: 4 },
      { label: "Clear 1-on-1 coaching for life direction, self-worth & calm", nextId: "RESULT", domain: "anxiety", weight: 4 },
    ],
  },
};

export default function StressQuizModal({ isOpen, onClose }: StressQuizModalProps) {
  // Navigation History Stack for Branching Algorithm
  const [history, setHistory] = useState<string[]>(["start"]);
  const [answers, setAnswers] = useState<{
    questionId: string;
    label: string;
    domain: "parenting" | "relationship" | "burnout" | "teen" | "anxiety";
    weight?: number;
    subTag?: string;
  }[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);

  if (!isOpen) return null;

  const currentQuestionId = history[history.length - 1];
  const currentNode = questionBank[currentQuestionId] || questionBank["start"];

  // Handle Option Click (Branching Logic)
  const handleSelectOption = (opt: QuizOption) => {
    const newAnswer = {
      questionId: currentQuestionId,
      label: opt.label,
      domain: opt.domain,
      weight: opt.weight || 1,
      subTag: opt.subTag,
    };

    const updatedAnswers = [...answers, newAnswer];
    setAnswers(updatedAnswers);

    if (opt.nextId === "RESULT" || !questionBank[opt.nextId]) {
      setIsCompleted(true);
    } else {
      setHistory([...history, opt.nextId]);
    }
  };

  // Back Button to navigate back up the decision tree
  const handleGoBack = () => {
    if (history.length > 1) {
      setHistory(history.slice(0, history.length - 1));
      setAnswers(answers.slice(0, answers.length - 1));
    }
  };

  // Reset Assessment Algorithm
  const handleReset = () => {
    setHistory(["start"]);
    setAnswers([]);
    setIsCompleted(false);
  };

  // Calculate Tailored Recommendation from Branch Path
  const computeTailoredResult = () => {
    const domainCounts: Record<string, number> = {
      parenting: 0,
      relationship: 0,
      burnout: 0,
      teen: 0,
      anxiety: 0,
    };

    let detectedSubTags: string[] = [];

    answers.forEach((ans) => {
      domainCounts[ans.domain] = (domainCounts[ans.domain] || 0) + (ans.weight || 1);
      if (ans.subTag) detectedSubTags.push(ans.subTag);
    });

    let topDomain = "parenting";
    let maxScore = -1;
    Object.entries(domainCounts).forEach(([domain, score]) => {
      if (score > maxScore) {
        maxScore = score;
        topDomain = domain;
      }
    });

    const primarySubTag = detectedSubTags[0] || "Custom Support";

    if (topDomain === "parenting" || topDomain === "teen") {
      return {
        title: "Parenting & Family Dynamics Coaching",
        pattern: `Primary Friction: ${primarySubTag} & Household Stress`,
        description:
          "Your responses indicate high household friction, child/teen behavioral stress, or co-parenting disconnect. Guided sessions with Nikunj Dhanani will equip you with practical behavioral scripts, calm routine structures, and emotional boundary tools for a peaceful home.",
        href: "/services/parenting-coaching",
        serviceParam: "Parenting Coaching",
        tagColor: "bg-[#F9EFEA] text-[#C97B5B] border-[#C97B5B]/30",
        insights: [
          "De-escalate daily yelling & behavioral resistance",
          "Align with your partner on co-parenting boundaries",
          "Restore emotional safety & open conversation with your child/teen",
        ],
      };
    } else if (topDomain === "relationship") {
      return {
        title: "Relationship Repair & Couples Counseling",
        pattern: `Primary Friction: ${primarySubTag} & Argument Cycles`,
        description:
          "Your assessment points to misaligned communication cycles, emotional distance, or unresolved marital strain. Nikunj's structured couples framework helps break repetitive argument traps and rebuild mutual warmth, trust, and intimate dialogue.",
        href: "/services/relationship-repair",
        serviceParam: "Relationship Repair",
        tagColor: "bg-[#EBF0E8] text-[#6B7F62] border-[#6B7F62]/30",
        insights: [
          "De-escalate defensive reactions during disagreements",
          "Rebuild genuine emotional intimacy & appreciation",
          "Clear past misunderstandings with guided active listening",
        ],
      };
    } else if (topDomain === "burnout") {
      return {
        title: "Executive Burnout & Life Coaching",
        pattern: `Primary Friction: ${primarySubTag} & Decision Fatigue`,
        description:
          "Your responses highlight severe executive decision fatigue, work-to-home stress leakage, or boundary exhaustion. 1-on-1 coaching with Nikunj provides confidential stress prevention frameworks to safeguard your mental clarity, sleep, and home life.",
        href: "/services/counselling-life-coaching",
        serviceParam: "Counselling & Life Coaching",
        tagColor: "bg-[#F5EFE6] text-[#1E2C24] border-[#8E9F86]/40",
        insights: [
          "Manage high-stakes decision fatigue without burnout",
          "Establish firm boundaries between executive work and family time",
          "Gain 1-on-1 confidential clarity for major career/life shifts",
        ],
      };
    } else {
      return {
        title: "Individual Counseling & Personal Growth",
        pattern: `Primary Friction: ${primarySubTag} & Overwhelm`,
        description:
          "Your responses indicate persistent internal anxiety, difficulty establishing boundaries, or life transition pressure. 1-on-1 counseling offers a safe, empathetic container to regulate stress, release guilt, and move forward with calm confidence.",
        href: "/services/counselling-life-coaching",
        serviceParam: "Counselling & Life Coaching",
        tagColor: "bg-[#F9EFEA] text-[#C97B5B] border-[#C97B5B]/30",
        insights: [
          "Practical somatic regulation for persistent overthinking & anxiety",
          "Confidence to hold healthy personal boundaries guilt-free",
          "Clear direction and self-sustaining tools for your life journey",
        ],
      };
    }
  };

  const result = computeTailoredResult();
  const currentStepNum = history.length;
  const estimatedTotal = 5;
  const progressPercent = Math.min(100, Math.round((currentStepNum / estimatedTotal) * 100));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1E2C24]/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-xl bg-[#FFFDF9] rounded-3xl shadow-2xl overflow-hidden border border-[#E6DEC8] my-auto text-[#2E2A26]">
        
        {/* Modal Header */}
        <div className="bg-[#FAF6F0] px-6 py-4 border-b border-[#E6DEC8] flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-full bg-[#6B7F62] text-white flex items-center justify-center">
              <LeafMotif className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-serif-display font-bold text-base text-[#1E2C24]">
                2-Minute Stress & Clarity Check-in
              </h3>
              <span className="text-[10px] font-bold text-[#6B7F62] uppercase tracking-wider block -mt-0.5">
                Adaptive Decision Tree Algorithm
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-[#8C847C] hover:text-[#1E2C24] hover:bg-[#EBF0E8] transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dynamic Progress Bar */}
        {!isCompleted && (
          <div className="w-full bg-[#E6DEC8]/40 h-1.5 relative">
            <div
              className="bg-[#C97B5B] h-1.5 transition-all duration-300 ease-out"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        )}

        <div className="p-6 md:p-8">
          {!isCompleted ? (
            <div className="space-y-5 animate-fade-in">
              
              {/* Question Breadcrumb Header */}
              <div className="flex items-center justify-between text-xs font-semibold text-[#5E5852]">
                <div className="flex items-center space-x-2">
                  {history.length > 1 && (
                    <button
                      onClick={handleGoBack}
                      className="inline-flex items-center text-[#6B7F62] hover:text-[#C97B5B] transition-colors text-xs font-bold mr-1"
                    >
                      <ChevronLeft className="w-4 h-4 mr-0.5" />
                      Back
                    </button>
                  )}
                  <span className="px-2.5 py-0.5 rounded-full bg-[#EBF0E8] text-[#4A5A43] text-[11px] font-bold">
                    {currentNode.category}
                  </span>
                </div>
                <span>Step {currentStepNum} of ~5</span>
              </div>

              {/* Question Headline */}
              <h4 className="text-xl md:text-2xl font-serif-display font-bold text-[#1E2C24] leading-snug">
                {currentNode.question}
              </h4>

              {/* Dynamic Branching Options */}
              <div className="space-y-3 pt-1">
                {currentNode.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(opt)}
                    className="w-full text-left p-4 rounded-2xl border border-[#E6DEC8] hover:border-[#6B7F62] bg-[#FAF6F0]/60 hover:bg-[#FFFDF9] transition-all duration-200 text-[#2E2A26] font-medium text-xs md:text-sm flex items-center justify-between group shadow-2xs hover:shadow-xs"
                  >
                    <span className="pr-3 leading-relaxed">{opt.label}</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5] text-[#C97B5B] opacity-40 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all shrink-0" />
                  </button>
                ))}
              </div>

            </div>
          ) : (
            
            /* Tailored Assessment Result Card */
            <div className="text-center space-y-6 animate-fade-in py-1">
              <div className="w-14 h-14 rounded-full bg-[#F9EFEA] text-[#C97B5B] flex items-center justify-center mx-auto border border-[#C97B5B]/30 shadow-sm">
                <Sparkles className="w-7 h-7 text-[#C97B5B]" />
              </div>

              <div className="space-y-2">
                <span className={`inline-block px-3.5 py-1 rounded-full text-xs font-bold border ${result.tagColor}`}>
                  {result.pattern}
                </span>
                <h4 className="text-2xl md:text-3xl font-serif-display font-bold text-[#1E2C24]">
                  Recommended Care: {result.title}
                </h4>
              </div>

              <div className="bg-[#FAF6F0] p-5 rounded-2xl border border-[#E6DEC8] text-left space-y-3">
                <p className="text-xs md:text-sm text-[#5E5852] leading-relaxed">
                  {result.description}
                </p>
                <div className="pt-2 border-t border-[#E6DEC8] space-y-1.5">
                  <span className="text-[11px] font-bold text-[#1E2C24] uppercase tracking-wider block">
                    Key Focus Areas For Session:
                  </span>
                  <ul className="space-y-1 text-xs text-[#2E2A26]">
                    {result.insights.map((insight, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#6B7F62] shrink-0 mt-0.5" />
                        <span>{insight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <Link
                  href={`/contact?service=${encodeURIComponent(result.serviceParam)}#booking`}
                  onClick={onClose}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-[#C97B5B] hover:bg-[#BD5C3D] text-white font-semibold text-sm shadow-md transition-all glow-btn"
                >
                  Book Session for {result.serviceParam}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-3.5 rounded-full border border-[#E6DEC8] text-[#1E2C24] hover:bg-[#FAF6F0] text-xs font-bold transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
                  Retake Check-in
                </button>
              </div>

            </div>
          )}
        </div>

        {/* Modal Footer Security Note */}
        <div className="px-6 py-3 bg-[#FAF6F0] border-t border-[#E6DEC8] text-center flex items-center justify-center space-x-1.5 text-[11px] text-[#8C847C]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#6B7F62]" />
          <span>Confidential & Free — This self-assessment provides personal clarity, not medical diagnosis.</span>
        </div>

      </div>
    </div>
  );
}
