"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import CalendarBooking from "@/components/CalendarBooking";
import { Phone, Mail, MapPin, ShieldCheck, CheckCircle2, MessageCircle, Clock, CalendarDays, Lock } from "lucide-react";
import LeafMotif from "@/components/LeafMotif";
import ScrollReveal from "@/components/ScrollReveal";

function ContactBookingContent() {
  const searchParams = useSearchParams();
  const initialService = searchParams.get("service") || "Parenting Coaching";

  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [sessionType, setSessionType] = useState<string>(initialService);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });
  const [isBooked, setIsBooked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const serviceParam = searchParams.get("service");
    if (serviceParam) {
      setSessionType(serviceParam);
    }
  }, [searchParams]);

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) {
      alert("Please select a date and time slot for your session.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsBooked(true);
    }, 800);
  };

  return (
    <div className="bg-[#F8F4EE] py-12 md:py-20 space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header Hero */}
        <ScrollReveal direction="up" delay={100}>
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D98A2B]">
              Direct Scheduling
            </span>
            <h1 className="text-4xl sm:text-5xl font-serif-display font-bold text-[#0B3C2D]">
              Book Your Confidential Counseling Session
            </h1>
            <p className="text-base text-ink-muted leading-relaxed">
              Choose your preferred date, time slot, and session focus. Every session is conducted directly by Nikunj Dhanani with 100% privacy.
            </p>
          </div>
        </ScrollReveal>

        {/* Booking & Contact Section */}
        <div id="booking" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Info & Prep Checklist */}
          <div className="lg:col-span-5 space-y-6">
            <ScrollReveal direction="up" delay={150}>
              <div className="bg-white rounded-3xl p-8 border border-[#0B3C2D]/10 shadow-md space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-[#0B3C2D] text-white flex items-center justify-center">
                    <LeafMotif className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-serif-display font-bold text-[#0B3C2D]">
                      Nikunj Dhanani
                    </h3>
                    <p className="text-xs text-ink-muted">Independent Counselor & Speaker</p>
                  </div>
                </div>

                <div className="space-y-4 text-xs text-deep-ink border-t border-[#0B3C2D]/10 pt-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-4 h-4 text-[#D98A2B] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-[#0B3C2D]">Practice Location:</strong>
                      <span>Mota Varachha, Surat, Gujarat (Online Nationwide via Zoom)</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 text-[#D98A2B] shrink-0" />
                    <div>
                      <strong className="block text-[#0B3C2D]">Phone / WhatsApp:</strong>
                      <span>+91 99250 60609</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Mail className="w-4 h-4 text-[#D98A2B] shrink-0" />
                    <div>
                      <strong className="block text-[#0B3C2D]">Email:</strong>
                      <span>ndhanani85@gmail.com</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#F8F4EE] p-4 rounded-2xl border border-[#0B3C2D]/10 space-y-2">
                  <div className="flex items-center space-x-2 text-xs font-bold text-[#0B3C2D]">
                    <ShieldCheck className="w-4 h-4 text-[#8CA899]" />
                    <span>100% Confidential & Private Care</span>
                  </div>
                  <p className="text-[11px] text-ink-muted">
                    No third-party platforms or shared data. All communications remain strictly between you and Nikunj.
                  </p>
                </div>

                {/* WhatsApp Callout */}
                <div className="p-4 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/20 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-[#0B3C2D] block">Prefer quick WhatsApp chat?</span>
                    <span className="text-[11px] text-ink-muted">Ask questions before booking</span>
                  </div>
                  <a
                    href="https://wa.me/919925060609?text=Hi%20Nikunj,%20I'd%20like%20to%20ask%20a%20question."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-xl bg-[#25D366] text-white font-bold text-xs hover:bg-[#20ba5a] transition-colors"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            </ScrollReveal>

            {/* What Happens Next Box */}
            <ScrollReveal direction="up" delay={200}>
              <div className="bg-white rounded-3xl p-6 border border-[#0B3C2D]/10 space-y-3">
                <span className="text-xs font-bold text-[#D98A2B] uppercase tracking-wider block">What Happens Next?</span>
                <ul className="space-y-2 text-xs text-ink-muted">
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0B3C2D] shrink-0 mt-0.5" />
                    <span>Instant confirmation email & WhatsApp text with session details.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0B3C2D] shrink-0 mt-0.5" />
                    <span>Private Zoom link or Surat practice address provided prior to session.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0B3C2D] shrink-0 mt-0.5" />
                    <span>Optional 5-minute pre-session questionnaire sent for goal alignment.</span>
                  </li>
                </ul>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Calendar & Form */}
          <div className="lg:col-span-7">
            <ScrollReveal direction="up" delay={150}>
              {!isBooked ? (
                <form onSubmit={handleSubmitBooking} className="bg-white rounded-3xl p-8 border border-[#0B3C2D]/10 shadow-md space-y-6">
                  <h3 className="text-2xl font-serif-display font-bold text-[#0B3C2D]">
                    Schedule Your Session
                  </h3>

                  {/* Session Type Picker */}
                  <div>
                    <label className="block text-xs font-bold text-[#0B3C2D] mb-2 uppercase tracking-wider">
                      Select Session Offering
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {[
                        "Parenting Coaching",
                        "Relationship Repair",
                        "Counselling & Life Coaching",
                      ].map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setSessionType(type)}
                          className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all border ${
                            sessionType === type
                              ? "bg-[#0B3C2D] text-white border-[#0B3C2D] shadow-sm"
                              : "bg-[#F8F4EE] border-[#0B3C2D]/15 text-deep-ink hover:bg-[#8CA899]/20"
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Interactive Calendar Component */}
                  <CalendarBooking
                    selectedDate={selectedDate}
                    selectedTime={selectedTime}
                    onDateSelect={(d) => setSelectedDate(d)}
                    onTimeSelect={(t) => setSelectedTime(t)}
                  />

                  {/* Contact Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#0B3C2D] mb-1">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Priya Sharma"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#0B3C2D]/20 text-xs focus:outline-none focus:border-[#0B3C2D]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0B3C2D] mb-1">Phone / WhatsApp Number *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#0B3C2D]/20 text-xs focus:outline-none focus:border-[#0B3C2D]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0B3C2D] mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="priya@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#0B3C2D]/20 text-xs focus:outline-none focus:border-[#0B3C2D]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0B3C2D] mb-1">Brief Note / What brings you to counseling? (Optional)</label>
                    <textarea
                      rows={2}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Share any background details or specific concerns..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#0B3C2D]/20 text-xs focus:outline-none focus:border-[#0B3C2D]"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-full bg-[#D98A2B] hover:bg-[#bd7522] text-white font-bold text-sm transition-all shadow-lg glow-btn"
                  >
                    {isSubmitting ? "Processing Reservation..." : "Confirm & Reserve Time Slot"}
                  </button>

                </form>
              ) : (
                <div className="bg-white rounded-3xl p-8 md:p-12 border border-[#0B3C2D]/10 shadow-lg text-center space-y-6 animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-[#8CA899]/20 text-[#0B3C2D] flex items-center justify-center mx-auto border border-[#8CA899]">
                    <CheckCircle2 className="w-8 h-8 text-[#0B3C2D]" />
                  </div>
                  <h3 className="text-3xl font-serif-display font-bold text-[#0B3C2D]">
                    Session Reserved!
                  </h3>
                  <p className="text-sm text-ink-muted leading-relaxed max-w-md mx-auto">
                    Thank you, <strong>{formData.name}</strong>. Your <strong>{sessionType}</strong> session has been reserved for:
                  </p>
                  <div className="bg-[#F8F4EE] p-4 rounded-2xl border border-[#0B3C2D]/10 max-w-sm mx-auto text-xs font-bold text-[#0B3C2D] space-y-1">
                    <p>📅 {selectedDate?.toLocaleDateString("en-IN", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}</p>
                    <p>⏰ {selectedTime}</p>
                  </div>
                  <p className="text-xs text-ink-muted">
                    A confirmation email & WhatsApp message with link/location details will be sent to <strong>{formData.email}</strong>.
                  </p>
                </div>
              )}
            </ScrollReveal>
          </div>

        </div>

      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs">Loading booking portal...</div>}>
      <ContactBookingContent />
    </Suspense>
  );
}
