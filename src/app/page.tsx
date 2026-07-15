"use client";

import React, { useState } from "react";
import {
  Brain,
  Users,
  Mic,
  Smile,
  Heart,
  Calendar,
  Send,
  MessageSquare,
  Sparkles,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Play,
  Clock,
  Compass,
  Star,
  Users2
} from "lucide-react";
import CalendarBooking from "@/components/CalendarBooking";

interface CustomDropdownProps {
  label: string;
  value: string;
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
}

export function CustomDropdown({ label, value, options, onChange }: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedLabel = options.find((opt) => opt.value === value)?.label || value;

  return (
    <div className="relative w-full text-left">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 rounded-xl border border-primary-200 bg-white focus:outline-none focus:ring-2 focus:ring-accent-navy focus:border-transparent transition-all text-sm text-primary-900 flex justify-between items-center cursor-pointer shadow-sm hover:border-accent-navy/50"
      >
        <span className="truncate">{selectedLabel}</span>
        <svg
          className={`w-4 h-4 text-primary-500 transition-transform duration-200 shrink-0 ml-2 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          {/* Backdrop click-away trigger */}
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />

          <div className="absolute z-20 mt-2 w-full rounded-xl bg-white border border-primary-200 shadow-xl p-1.5 focus:outline-none animate-fade-up duration-150 origin-top">
            <div className="px-2.5 py-1.5 text-[10px] font-bold text-primary-400 uppercase tracking-widest border-b border-primary-100 mb-1">
              Select {label}
            </div>
            <div className="space-y-0.5 max-h-60 overflow-y-auto">
              {options.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    onChange(opt.value);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs sm:text-sm transition-colors duration-150 flex items-center justify-between cursor-pointer ${opt.value === value
                      ? "bg-accent-navy/10 text-accent-navy font-semibold"
                      : "text-primary-800 hover:bg-primary-50 hover:text-primary-900"
                    }`}
                >
                  <span className="truncate mr-2">{opt.label}</span>
                  {opt.value === value && (
                    <svg className="w-4 h-4 text-accent-navy shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: "Counseling",
    message: ""
  });
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name } = e.target;
    let { value } = e.target;
    if (name === "phone") {
      value = value.replace(/\D/g, "").slice(0, 10);
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: null, message: "" });

    if (!selectedDate || !selectedTime) {
      setStatus({ type: "error", message: "Please select a date and time for your session." });
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          date: selectedDate.toISOString(),
          time: selectedTime
        })
      });
      const data = await res.json();

      if (res.ok) {
        // Trigger Web3Forms email client-side so it bypasses serverless bot challenge blocks
        const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
        if (accessKey) {
          try {
            const formattedDate = selectedDate.toLocaleDateString("en-IN", {
              weekday: "short",
              day: "numeric",
              month: "short",
              year: "numeric"
            });
            
            await fetch("https://api.web3forms.com/submit", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                access_key: accessKey,
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                service: formData.serviceType,
                message: formData.message,
                booking_date: formattedDate,
                booking_time: selectedTime,
                subject: `New Lead: ${formData.serviceType} Consultation Request from ${formData.name}`,
                from_name: "Portfolio Booking"
              })
            });
          } catch (mailErr) {
            console.error("Client-side mail dispatch error:", mailErr);
          }
        } else {
          console.warn("NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY is not defined.");
        }

        setStatus({ type: "success", message: data.message });
        setFormData({ name: "", email: "", phone: "", serviceType: "Counseling", message: "" });
      } else {
        setStatus({ type: "error", message: data.error || "Something went wrong" });
      }
    } catch (err) {
      setStatus({ type: "error", message: "Failed to connect to the server. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const services = [
    {
      icon: <Users className="w-5 h-5 text-accent-navy" />,
      title: "Family Counseling",
      desc: "Resolving communication blocks and deep conflicts to nurture strong family bonds."
    },
    {
      icon: <Brain className="w-5 h-5 text-accent-navy" />,
      title: "Stress Coaching",
      desc: "Providing cognitive toolkits to master high-pressure corporate life and personal anxiety."
    },
    {
      icon: <Heart className="w-5 h-5 text-accent-navy" />,
      title: "Parenting Coach",
      desc: "Compassionate, evidence-based coaching to help parents raise resilient children."
    },
    {
      icon: <Smile className="w-5 h-5 text-accent-navy" />,
      title: "Personal Growth",
      desc: "Goal-oriented counseling sessions to break negative habits and gain clarity."
    },
    {
      icon: <Mic className="w-5 h-5 text-accent-navy" />,
      title: "Public Speaking",
      desc: "Inspiring keynotes and workshops for community events and educational meets."
    },
    {
      icon: <TrendingUp className="w-5 h-5 text-accent-navy" />,
      title: "Corporate Wellness",
      desc: "Mental wellbeing consulting and seminars to build high-performance workplace teams."
    }
  ];

  const timelineSteps = [
    {
      num: "01",
      title: "Discover",
      desc: "A 20-minute call to understand what's really going on."
    },
    {
      num: "02",
      title: "Define",
      desc: "We name the pattern, the pain, and the outcome you want."
    },
    {
      num: "03",
      title: "Strategy",
      desc: "A personal roadmap with weekly focus areas and rituals."
    },
    {
      num: "04",
      title: "Sessions",
      desc: "Weekly or fortnightly work — in person or over video."
    },
    {
      num: "05",
      title: "Growth",
      desc: "You leave with tools that outlast our time together."
    }
  ];

  const testimonials = [
    {
      quote: "N. helped our family speak to each other again. We came in exhausted and left with a language for our love.",
      author: "Priya & Rohan M.",
      role: "Family clients, Mumbai"
    },
    {
      quote: "I stopped waking up with a knot in my chest. Her stress tools are simple, but they actually work under pressure.",
      author: "Aakash V.",
      role: "Founder, Fintech"
    },
    {
      quote: "Warm, sharp, and refreshingly honest. Our team's engagement scores moved within a quarter of her sessions.",
      author: "Meera S.",
      role: "Head of People, retail group"
    }
  ];

  return (
    <div className="relative bg-white">
      {/* Hero Section */}
      <section id="home" className="pt-28 pb-16 lg:pt-36 lg:pb-20 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

            {/* Left Column (Content) */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <span className="text-xs font-bold text-accent-navy tracking-widest uppercase block animate-fade-up">
                WELCOME, I'M NIKUNJ DHANANI
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight text-primary-900 leading-[1.1] font-display animate-fade-up delay-100">
                Guiding families through <br className="hidden lg:inline" />stress, back to <span className="text-accent-navy font-display font-semibold">calm.</span>
              </h1>
              <p className="text-sm sm:text-base text-primary-500 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal animate-fade-up delay-200">
                Real talk. Real change. For over six years I've helped parents, couples, and professionals in Mumbai turn conflict and burnout into clarity &mdash; with warmth, structure, and zero judgment.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 pt-2 animate-fade-up delay-300">
                <a
                  href="#contact"
                  className="w-full sm:w-auto text-center px-8 py-4 rounded-full bg-accent-navy hover:bg-accent-navy-hover text-white font-bold transition-all duration-300 shadow-md hover-lift glow-btn text-sm flex items-center justify-center"
                >
                  Book a Session
                </a>
                <div className="flex items-center space-x-3 text-left">
                  <a
                    href="#testimonials"
                    className="w-12 h-12 rounded-full border border-accent-navy/30 flex items-center justify-center bg-white hover-lift text-accent-navy shadow-sm shrink-0"
                  >
                    <Star className="w-3.5 h-3.5 fill-accent-navy stroke-accent-navy" />
                  </a>
                  <div>
                    <span className="block text-xs font-bold text-primary-900 leading-tight">Read Client Stories</span>
                    <span className="text-[10px] text-primary-550 font-semibold mt-0.5 block">
                      Client Stories &middot; 4.9★
                    </span>
                  </div>
                </div>
              </div>

              {/* Overlapping avatars social proof */}
              <div className="flex items-center justify-center lg:justify-start space-x-3 pt-6 border-t border-primary-200/40 max-w-md mx-auto lg:mx-0 animate-fade-up delay-400">
                <div className="flex -space-x-2 shrink-0">
                  <div className="w-6 h-6 rounded-full overflow-hidden border border-white shadow-sm shrink-0">
                    <img src="/avatar1.png" alt="Client headshot" className="w-full h-full object-cover" />
                  </div>
                  <div className="w-6 h-6 rounded-full overflow-hidden border border-white shadow-sm shrink-0">
                    <img src="/avatar2.png" alt="Client headshot" className="w-full h-full object-cover" />
                  </div>
                  <div className="w-6 h-6 rounded-full overflow-hidden border border-white shadow-sm shrink-0">
                    <img src="/avatar3.png" alt="Client headshot" className="w-full h-full object-cover" />
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-primary-500 leading-none">
                  Trusted by 80+ families &amp; leaders across India
                </span>
              </div>
            </div>

            {/* Right Column (Portrait Circle Style & Cursive Signature) */}
            <div className="lg:col-span-5 flex justify-center relative animate-fade-in delay-200">
              <div className="relative w-80 h-80 sm:w-96 sm:h-96">

                {/* Background Solid Disc Offset */}
                <div className="absolute inset-0 bg-primary-100 rounded-full scale-95 transform translate-x-4 translate-y-4" />

                {/* Profile Image Circle Crop */}
                <div className="absolute inset-0 rounded-full overflow-hidden bg-primary-100 flex items-end shadow-lg border-8 border-white/60">
                  <img
                    src="/second image.png"
                    alt="N. Dhanani"
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                {/* Signature Overlay (Without white background, rotated) */}
                <div className="absolute bottom-4 right-4 select-none pointer-events-none transform rotate-[-8deg] hover:scale-105 transition-transform duration-300 z-10">
                  <span className="font-signature text-4xl sm:text-5xl text-white tracking-wide block drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                    N. Dhanani
                  </span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Services Grid Section (6 columns layout) */}
      <section id="services" className="py-16 lg:py-20 border-t border-primary-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
            {services.map((svc, idx) => (
              <div key={idx} className="space-y-3 p-4 bg-white border border-primary-100 rounded-2xl shadow-sm hover-lift">
                <div className="w-9 h-9 rounded-xl bg-primary-100 flex items-center justify-center shadow-inner">
                  {svc.icon}
                </div>
                <h3 className="text-sm font-bold text-primary-900 font-display leading-tight">
                  {svc.title}
                </h3>
                <p className="text-[11px] text-primary-500 leading-relaxed font-medium">
                  {svc.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Work With Me Section */}
      <section className="py-16 lg:py-24 border-t border-primary-200 bg-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="text-4xl font-extrabold font-display tracking-tight text-primary-900">
              Work With Me
            </h2>
            <p className="text-sm sm:text-base text-primary-600 leading-relaxed font-normal">
              Take the plunge and break your unhealthy patterns to ignite your power within.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Parenting Coaching",
                img: "/service_parenting.png",
                link: "/services/parenting-coaching"
              },
              {
                title: "Relationship / Couple Counselling",
                img: "/service_relationship.png",
                link: "/services/relationship-repair"
              },
              {
                title: "Counselling & Life Coaching",
                img: "/service_counselling.png",
                link: "/services/counselling-life-coaching"
              }
            ].map((pkg, idx) => (
              <div key={idx} className="bg-white border border-primary-200/60 rounded-[2rem] p-3 overflow-hidden shadow-sm hover-lift flex flex-col items-center justify-between text-center animate-fade-in group">
                <div className="w-full">
                  <div className="aspect-[4/3] bg-primary-50 overflow-hidden relative rounded-[1.5rem] border border-primary-100 mb-6">
                    <img src={pkg.img} alt={pkg.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-primary-900 font-display px-4 mb-6 leading-tight group-hover:text-accent-navy transition-colors">
                    {pkg.title}
                  </h3>
                </div>
                <div className="pb-4">
                  <a
                    href={pkg.link}
                    className="inline-flex items-center px-8 py-2.5 rounded-full bg-accent-navy hover:bg-accent-navy-hover text-white text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-sm"
                  >
                    Explore
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Selected Work Section (Featured Programs) */}
      <section className="py-16 lg:py-24 border-t border-primary-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-accent-navy uppercase tracking-widest block">FEATURED WORK</span>
              <h2 className="text-3xl font-extrabold font-display tracking-tight text-primary-900">
                Resources built from real sessions
              </h2>
            </div>
            <a href="#contact" className="text-xs font-bold text-accent-navy flex items-center hover:underline uppercase tracking-wider">
              Request access <span className="ml-1">↗</span>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
  {
    title: "5 Relationship Challenges Every Husband Should Know",
    desc: "Discover five common relationship challenges that can quietly affect even the strongest marriages, along with practical ways to strengthen your bond.",
    tag: "Relationship Tips",
    img: "/1st_work.png",
    link: "https://www.instagram.com/p/DZCxlk4gCxK/"
  },
  {
    title: "4 Signs You're More Than Just a Businessman",
    desc: "Success isn't measured only by work. Learn four signs that show you're building a meaningful life through love, family, and genuine relationships.",
    tag: "Personal Growth",
    img: "/2nd_work.png",
    link: "https://www.instagram.com/p/DY170uxj5t8/"
  },
  {
    title: "Why Intent Matters More Than Anger in Relationships",
    desc: "Misunderstandings don't always come from anger—they often come from unclear intentions. Explore how empathy and honest communication create stronger relationships.",
    tag: "Relationship Advice",
    img: "/3rd_work.png",
    link: "https://www.instagram.com/p/Dau5MnNjIMT/"
  }
].map((proj, idx) => (
              <a key={idx} href={proj.link} className="group bg-white border border-primary-200/60 rounded-[2rem] p-2 overflow-hidden shadow-sm hover-lift flex flex-col justify-between animate-fade-in cursor-pointer">
                <div>
                  <div className="aspect-square bg-primary-50 overflow-hidden relative rounded-[1.5rem] border border-primary-100">
                    <img src={proj.img} alt={proj.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="p-5 space-y-3">
                    <span className="inline-block px-2.5 py-0.5 rounded-full border border-accent-navy/25 bg-accent-navy/5 text-accent-navy text-[10px] font-bold uppercase tracking-wider">
                      {proj.tag}
                    </span>
                    <h3 className="text-lg font-bold text-primary-900 font-display leading-tight group-hover:text-accent-navy transition-colors">{proj.title}</h3>
                    <p className="text-xs text-primary-500 leading-relaxed font-normal">{proj.desc}</p>
                  </div>
                </div>
                <div className="px-5 pb-5 pt-2 flex justify-start">
                  <div className="w-8 h-8 rounded-full border border-primary-200 flex items-center justify-center text-primary-500 group-hover:text-accent-navy group-hover:border-accent-navy/30 transition-all duration-300">
                    <ArrowRight className="w-3.5 h-3.5 transform -rotate-45" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Stat counter Banner (Card layout from screenshot) */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary-900 rounded-[2rem] p-8 border border-primary-850 shadow-lg text-white">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center items-center">
              {[
                { num: "120+", label: "SESSIONS COMPLETED", icon: <Smile className="w-4 h-4 text-accent-gold" /> },
                { num: "80+", label: "HAPPY CLIENTS", icon: <Users2 className="w-4 h-4 text-accent-gold" /> },
                { num: "6+", label: "YEARS EXPERIENCE", icon: <Star className="w-4 h-4 text-accent-gold" /> },
                { num: "25+", label: "CITIES REACHED", icon: <Compass className="w-4 h-4 text-accent-gold" /> }
              ].map((stat, idx) => (
                <div key={idx} className="space-y-3">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center mx-auto border border-white/10">
                    {stat.icon}
                  </div>
                  <span className="block text-3xl sm:text-4xl font-extrabold text-white font-display">
                    {stat.num}
                  </span>
                  <span className="block text-[9px] font-bold text-primary-400 uppercase tracking-widest leading-none">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-[10px] font-bold text-accent-navy uppercase tracking-widest block">COUNSELOR BIO</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-primary-900 leading-tight">
                About Me
              </h2>
              <p className="text-sm sm:text-base text-primary-500 leading-relaxed font-normal">
                My work sits at the meeting point of research and real life. I believe most families aren't broken &mdash; they're just carrying more than they were ever taught to hold. My role is to help you set some of it down, and pick up the things that matter with more intention.
              </p>
              <p className="text-sm sm:text-base text-primary-500 leading-relaxed font-normal">
                Over the last six years I've worked with hundreds of parents, couples, and professionals across Mumbai and beyond. Sessions are warm, structured, and rooted in what actually moves the needle &mdash; not vague advice.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 pt-2">
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-accent-navy shrink-0 mt-0.5" />
                  <span className="text-xs font-semibold text-primary-850 leading-tight">Certified in family systems and cognitive behavioral therapy</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-accent-navy shrink-0 mt-0.5" />
                  <span className="text-xs font-semibold text-primary-850 leading-tight">Trained in trauma-informed care and mindfulness practices</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-accent-navy shrink-0 mt-0.5" />
                  <span className="text-xs font-semibold text-primary-850 leading-tight">Featured speaker at parenting and wellness summits across India</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-accent-navy shrink-0 mt-0.5" />
                  <span className="text-xs font-semibold text-primary-850 leading-tight">Sessions available in English, Hindi, and Gujarati</span>
                </div>
              </div>
            </div>

            {/* Right Quote Panel */}
            <div className="lg:col-span-6">
              <div className="bg-white p-8 rounded-3xl space-y-6 border border-primary-200/60 shadow-md relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-accent-navy" />
                <blockquote className="text-lg sm:text-xl italic text-primary-900 font-semibold leading-relaxed pl-2">
                  "You don't need to be fixed. You need to be heard, and then handed better tools. That's the whole of my practice."
                </blockquote>
                <div className="flex items-center space-x-3 pt-4 border-t border-primary-100 pl-2">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-primary-100 border border-primary-200 shrink-0">
                    <img src="/second image.png" alt="N. Dhanani headshot" className="w-full h-full object-cover object-center" />
                  </div>
                  <div>
                    <span className="block text-sm font-bold text-primary-900">Nikunj Dhanani</span>
                    <span className="text-[9px] text-primary-400 font-bold uppercase tracking-widest">COUNSELOR &middot; COACH &middot; SPEAKER</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tesca Section */}
      <section id="tesca" className="py-16 lg:py-24 bg-primary-50 border-t border-b border-primary-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left side: Logo & Branding Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="bg-white p-8 rounded-3xl border border-primary-200/60 shadow-md hover-lift flex flex-col items-center justify-center max-w-sm w-full aspect-square relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-accent-steel" />
                <div className="w-full h-full flex items-center justify-center p-4">
                  <img 
                    src="/tesca_logo.png" 
                    alt="Tesca Spoken English & Visa Consultancy Logo" 
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Right side: Information and Redirects */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-accent-steel/10 text-accent-steel rounded-full text-xs font-bold tracking-wider uppercase">
                <span>Enterprise</span>
                <span className="w-1.5 h-1.5 rounded-full bg-accent-steel" />
                <span>Established 2005</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-primary-900 leading-tight">
                Co-Founder at Tesca Spoken English & Visa Consultancy
              </h2>
              
              <p className="text-sm sm:text-base text-primary-500 leading-relaxed font-normal font-sans">
                Alongside my coaching practice, I am the co-founder of Tesca, a leading educational and visa consulting firm. We specialize in empowering individuals to achieve global communication fluency and navigate the complex journey of studying and working abroad.
              </p>
              
              <p className="text-sm text-primary-500 leading-relaxed font-normal font-sans">
                Whether you need to master English proficiency exams (IELTS, PTE, TOEFL) or require reliable, expert guidance for study/work visa pathways, our dedicated team at Tesca provides end-to-end support with a track record of high success rates.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href="https://tesca.co"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 rounded-xl bg-accent-navy hover:bg-accent-navy-hover text-white font-bold transition-all duration-300 shadow-sm hover-lift text-sm space-x-2"
                >
                  <span>Explore Tesca Education</span>
                  <span className="text-base font-normal">↗</span>
                </a>
                <a
                  href="https://tescavisa.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 rounded-xl bg-white border border-primary-300 hover:border-accent-steel text-primary-800 hover:text-accent-steel font-bold transition-all duration-300 shadow-sm hover-lift text-sm space-x-2"
                >
                  <span>Visit Tesca Visa Consultancy</span>
                  <span className="text-base font-normal">↗</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Speaking Section */}
      <section id="speaking" className="py-16 lg:py-24 bg-primary-900 text-white border-t border-b border-primary-850">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left Content */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-bold text-accent-gold uppercase tracking-wider block">ON THE STAGE</span>
              <h2 className="text-3xl font-extrabold font-display tracking-tight text-white leading-tight">
                Keynotes that leave rooms lighter than they walked in
              </h2>
              <p className="text-sm text-primary-200 leading-relaxed font-normal">
                I speak at schools, conferences, and corporate offsites on parenting, burnout, and emotional resilience &mdash; with the same warmth I bring to a one-on-one session.
              </p>
              <div className="pt-2">
                <a
                  href="#contact"
                  className="inline-flex items-center px-6 py-3 rounded-full bg-accent-navy hover:bg-accent-navy-hover text-white font-bold transition-all duration-200 text-sm shadow-md"
                >
                  Request Speaking Date
                </a>
              </div>
            </div>

            {/* Right Topics Stack */}
            <div className="lg:col-span-7 space-y-4">
              {[
                { title: "Raising Resilient Children", aud: "Schools & Parent Groups", dur: "60 min keynote" },
                { title: "The Burnout Blueprint", aud: "Corporate Leadership Teams", dur: "90 min workshop" },
                { title: "Marriage After Kids", aud: "Couples & Retreats", dur: "Half-day intensive" }
              ].map((topic, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-accent-navy/30 hover:bg-white/10 transition-all duration-200 flex flex-col sm:flex-row justify-between sm:items-center gap-4"
                >
                  <div>
                    <h3 className="text-base font-bold text-white font-display leading-tight">{topic.title}</h3>
                    <span className="text-xs text-primary-400 font-semibold block mt-1">{topic.aud}</span>
                  </div>
                  <div className="text-xs text-primary-300 font-medium flex items-center shrink-0">
                    <Clock className="w-3.5 h-3.5 mr-1 text-accent-gold" /> {topic.dur}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* How I work Timeline (5 Steps timeline from Arjun Mehta screenshot) */}
      <section className="py-16 lg:py-24 border-b border-primary-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
            <span className="text-[10px] font-bold text-accent-navy uppercase tracking-widest block">THE PROCESS</span>
            <h2 className="text-3xl font-extrabold font-display tracking-tight text-primary-900">
              From conflict to calm
            </h2>
            <p className="text-xs sm:text-sm text-primary-500 font-normal mt-2">
              A five-step arc I've refined across hundreds of family and coaching engagements.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 relative">
            {/* Connecting lines for large screens */}
            <div className="hidden lg:block absolute top-7 left-12 right-12 h-0.5 border-t border-dashed border-primary-200 -z-10" />

            {timelineSteps.map((step, idx) => (
              <div key={idx} className="space-y-4 bg-white p-2 relative text-center lg:text-left">
                <div className="w-10 h-10 rounded-full bg-accent-navy text-white flex items-center justify-center font-bold text-sm mx-auto lg:mx-0 shadow-md">
                  {step.num}
                </div>
                <h3 className="text-base font-bold text-primary-900 font-display">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-primary-500 leading-relaxed font-normal">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials (Kind Words from screenshot with Plant vase decoration) */}
      <section className="py-16 lg:py-24 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
            <div className="lg:col-span-4 space-y-2">
              <span className="text-[10px] font-bold text-accent-navy uppercase tracking-widest block">KIND WORDS</span>
              <h2 className="text-3xl font-extrabold font-display tracking-tight text-primary-900">
                Stories from the sessions
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Testimonials Grid */}
            <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((test, idx) => (
                <div key={idx} className="p-8 rounded-3xl bg-white space-y-6 flex flex-col justify-between hover-lift border border-primary-100 shadow-sm">
                  <div className="space-y-4">
                    <span className="block text-5xl font-serif text-accent-navy/60 leading-none -mb-2">&ldquo;</span>
                    <p className="text-sm text-primary-800 leading-relaxed font-normal">
                      {test.quote}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-primary-100">
                    <span className="block text-xs font-bold text-primary-900">{test.author}</span>
                    <span className="text-[10px] text-primary-500 font-bold uppercase tracking-wider">{test.role}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Decorative Plant Vase block on the right */}
            <div className="hidden lg:col-span-3 lg:flex flex-col items-center justify-end p-4 border border-dashed border-primary-200 rounded-3xl relative min-h-[300px]">
              {/* Plant illustration SVG */}
              <svg className="w-24 h-48 text-accent-navy/20 hover:text-accent-navy/30 transition-all duration-300 mb-2" viewBox="0 0 100 200" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M50 150 V 50" />
                <path d="M50 100 Q 20 80 15 50 Q 30 50 50 90" fill="none" />
                <path d="M50 80 Q 80 60 85 30 Q 70 30 50 70" fill="none" />
                <path d="M50 120 Q 15 110 10 90 Q 25 90 50 115" fill="none" />
                <path d="M50 110 Q 85 100 90 80 Q 75 80 50 105" fill="none" />
                {/* Vase */}
                <path d="M35 150 L 30 190 H 70 L 65 150 Z" fill="currentColor" opacity="0.1" stroke="currentColor" strokeWidth="3" />
              </svg>
              <span className="text-[10px] text-primary-500 font-bold uppercase tracking-wider">Care & Growth</span>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Credentials Strip */}
      <section className="py-6 bg-white border-t border-primary-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-accent-gold shrink-0" />
              <span className="text-xs font-semibold text-primary-600">100% Confidential Sessions</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-accent-gold shrink-0" />
              <span className="text-xs font-semibold text-primary-600">Certified Counselor (CBT &amp; Family Systems)</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-accent-gold shrink-0" />
              <span className="text-xs font-semibold text-primary-600">Flexible Scheduling Available</span>
            </div>
            <div className="flex items-center space-x-2">
              <MessageSquare className="w-4 h-4 text-accent-gold shrink-0" />
              <span className="text-xs font-semibold text-primary-600">English &middot; Hindi &middot; Gujarati</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 lg:py-24 bg-primary-100 border-t border-primary-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

            {/* Left Column Information */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-[10px] font-bold text-accent-navy uppercase tracking-widest block">Let's Connect</span>
              <h2 className="text-4xl font-extrabold font-display tracking-tight text-primary-900 leading-tight">
                Book Your Session
              </h2>
              <p className="text-sm text-primary-500 leading-relaxed">
                Pick a date and time that works for you, share a few details, and I'll confirm within 24 hours. Every session is a safe, judgment-free space.
              </p>

              <div className="space-y-4 pt-4 border-t border-primary-200 text-sm text-primary-800">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-bold text-accent-navy tracking-wider">Email</span>
                  <a href="mailto:ndhanani85@gmail.com" className="font-semibold hover:underline">ndhanani85@gmail.com</a>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-bold text-accent-navy tracking-wider">Phone</span>
                  <a href="tel:+919925060609" className="font-semibold hover:underline">+91 99250 60609</a>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-bold text-accent-navy tracking-wider">Location</span>
                  <span className="font-semibold">Surat, Gujarat, India.</span>
                </div>
              </div>

              <div className="bg-accent-gold-light border border-accent-gold/20 rounded-2xl p-5 space-y-2">
                <span className="text-[10px] font-bold text-accent-gold uppercase tracking-widest block">Free Discovery Call</span>
                <p className="text-xs text-primary-700 leading-relaxed">
                  Not sure where to start? Book a free 15-minute call to see if we're a fit. No pressure, just clarity.
                </p>
              </div>
            </div>

            {/* Right Column: Calendar + Form */}
            <div className="lg:col-span-7 space-y-6">
              {/* Calendar Booking */}
              <CalendarBooking
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                onDateSelect={setSelectedDate}
                onTimeSelect={setSelectedTime}
              />

              {/* Selected Slot Summary */}
              {selectedDate && selectedTime && (
                <div className="flex items-center space-x-2 px-4 py-2.5 bg-accent-gold-light border border-accent-gold/20 rounded-xl text-xs font-semibold text-primary-800">
                  <Calendar className="w-4 h-4 text-accent-gold shrink-0" />
                  <span>Your session: {selectedDate.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" })} at {selectedTime}</span>
                </div>
              )}

              {/* Success/Error Messages */}
              {status.type && (
                <div
                  className={`p-4 rounded-xl flex items-start space-x-3 text-sm font-semibold transition-all duration-300 ${status.type === "success"
                    ? "bg-accent-steel/10 text-accent-steel border border-accent-steel/20"
                    : "bg-accent-rose/10 text-accent-rose border border-accent-rose/20"
                    }`}
                >
                  {status.type === "success" ? (
                    <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  )}
                  <span>{status.message}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your Name"
                    className="w-full px-4 py-3 rounded-xl border border-primary-200 bg-white focus:outline-none focus:ring-2 focus:ring-accent-navy focus:border-transparent transition-all text-sm text-primary-900"
                  />
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Your Email"
                    className="w-full px-4 py-3 rounded-xl border border-primary-200 bg-white focus:outline-none focus:ring-2 focus:ring-accent-navy focus:border-transparent transition-all text-sm text-primary-900"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative w-full">
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Your Phone Number"
                      className="w-full px-4 py-3 rounded-xl border border-primary-200 bg-white focus:outline-none focus:ring-2 focus:ring-accent-navy focus:border-transparent transition-all text-sm text-primary-900 pr-16"
                    />
                    <span className={`absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold transition-all duration-200 ${
                      formData.phone.length === 10 ? "text-accent-teal bg-accent-teal/10 px-1.5 py-0.5 rounded" : "text-primary-400"
                    }`}>
                      {formData.phone.length}/10
                    </span>
                  </div>
                  <CustomDropdown
                    label="Service"
                    value={formData.serviceType}
                    onChange={(val) => setFormData((prev) => ({ ...prev, serviceType: val }))}
                    options={[
                      { label: "Personal & Family Counseling", value: "Counseling" },
                      { label: "Stress Management Coaching", value: "Stress" },
                      { label: "Parenting Consultations", value: "Parenting" },
                      { label: "Speaking / Corporate Seminars", value: "Speaking" },
                      { label: "General Inquiry", value: "Other" }
                    ]}
                  />
                </div>

                <textarea
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Briefly describe what you'd like to work on..."
                  className="w-full px-4 py-3 rounded-xl border border-primary-200 bg-white focus:outline-none focus:ring-2 focus:ring-accent-navy focus:border-transparent transition-all text-sm text-primary-900"
                />

                <div className="flex items-center justify-between pt-2">
                  <p className="text-[10px] text-primary-400 italic max-w-xs leading-relaxed">
                    Your information is kept strictly confidential.
                  </p>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-3 rounded-xl bg-accent-navy hover:bg-accent-navy-hover text-white font-bold transition-all duration-300 shadow-md hover-lift disabled:opacity-50 text-sm flex items-center justify-center space-x-2"
                  >
                    <span>{loading ? "Sending..." : "Book Session"}</span>
                    <span className="text-base">↗</span>
                  </button>
                </div>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* Floating WhatsApp and Instagram CTC Buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3">
        <a
          href="https://www.instagram.com/nikunj.dhanani/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer"
          aria-label="Follow on Instagram"
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051C.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
          </svg>
        </a>
        <a
          href="https://wa.me/919925060609"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer"
          aria-label="Chat on WhatsApp"
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.03-5.114-2.905-6.99C16.257 1.875 13.775 1.84 11.139 1.84c-5.442 0-9.866 4.42-9.87 9.864 0 1.63.499 3.224 1.453 4.825L1.758 20.89l4.889-1.282zM17.067 14.38c-.27-.135-1.597-.788-1.846-.879-.25-.09-.43-.135-.61.135-.18.27-.698.879-.857 1.06-.16.18-.318.2-.588.066-2.73-1.366-4.47-2.83-5.264-4.194-.21-.362-.02-.56.162-.741.16-.162.318-.372.48-.56.162-.18.21-.31.318-.52.11-.2-.05-.39-.13-.56-.08-.18-.61-1.47-.84-2.01-.22-.53-.47-.46-.61-.47-.14-.01-.3-.01-.45-.01-.16 0-.41.06-.63.3-.22.24-.84.82-.84 2.01 0 1.19.87 2.33 1.06 2.58.19.25 1.7 2.59 4.12 3.64.57.25 1.02.4 1.37.51.58.18 1.1.16 1.51.1.46-.07 1.59-.65 1.82-1.27.23-.62.23-1.15.16-1.27-.07-.11-.25-.18-.52-.315z"/>
          </svg>
        </a>
      </div>
    </div>
  );
}
