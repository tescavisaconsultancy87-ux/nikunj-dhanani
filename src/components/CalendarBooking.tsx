"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Clock, CalendarDays } from "lucide-react";
import LeafMotif from "@/components/LeafMotif";

interface CalendarBookingProps {
  selectedDate: Date | null;
  selectedTime: string;
  onDateSelect: (date: Date) => void;
  onTimeSelect: (time: string) => void;
}

const timeSlots = [
  "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM"
];

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function CalendarBooking({
  selectedDate,
  selectedTime,
  onDateSelect,
  onTimeSelect
}: CalendarBookingProps) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const isPastDate = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return date < now;
  };

  const checkIsPastTime = (date: Date | null, timeStr: string) => {
    if (!date) return false;
    const now = new Date();
    const isDateToday =
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear();

    if (!isDateToday) return false;

    const match = timeStr.match(/^(\d+):(\d+)\s*(AM|PM)$/i);
    if (!match) return false;

    let hours = parseInt(match[1]);
    const minutes = parseInt(match[2]);
    const ampm = match[3].toUpperCase();

    if (ampm === "PM" && hours !== 12) {
      hours += 12;
    } else if (ampm === "AM" && hours === 12) {
      hours = 0;
    }

    const slotTime = new Date(date);
    slotTime.setHours(hours, minutes, 0, 0);

    return slotTime < now;
  };

  const isSelected = (day: number) => {
    if (!selectedDate) return false;
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentMonth &&
      selectedDate.getFullYear() === currentYear
    );
  };

  const isToday = (day: number) => {
    return (
      day === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear()
    );
  };

  const handleDayClick = (day: number) => {
    if (isPastDate(day)) return;
    const newDate = new Date(currentYear, currentMonth, day);
    onDateSelect(newDate);

    if (selectedTime && checkIsPastTime(newDate, selectedTime)) {
      onTimeSelect("");
    }
  };

  const formatSelectedDate = () => {
    if (!selectedDate) return "Please choose a date above";
    return selectedDate.toLocaleDateString("en-IN", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  };

  return (
    <div className="bg-white border border-[#0B3C2D]/15 rounded-2xl p-5 md:p-6 shadow-md">
      <div className="flex items-center space-x-2 mb-4">
        <LeafMotif className="w-5 h-5 text-[#D98A2B]" />
        <h3 className="text-base font-bold text-[#0B3C2D] font-serif-display">Select Session Date</h3>
      </div>

      <div className="flex items-center justify-between mb-3 bg-[#FAF7F2] px-3 py-2 rounded-xl">
        <button
          type="button"
          onClick={prevMonth}
          className="w-8 h-8 rounded-full hover:bg-[#8CA899]/20 flex items-center justify-center transition-colors text-[#0B3C2D]"
          aria-label="Previous month"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="text-sm font-bold text-[#0B3C2D] font-serif-display">
          {monthNames[currentMonth]} {currentYear}
        </span>
        <button
          type="button"
          onClick={nextMonth}
          className="w-8 h-8 rounded-full hover:bg-[#8CA899]/20 flex items-center justify-center transition-colors text-[#0B3C2D]"
          aria-label="Next month"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-1">
        {dayNames.map((d) => (
          <div key={d} className="text-center text-[11px] font-bold text-ink-light uppercase tracking-wider py-1">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 mb-4">
        {Array.from({ length: firstDayOfMonth }).map((_, i) => (
          <div key={`e-${i}`} />
        ))}
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
          const disabled = isPastDate(day);
          const selected = isSelected(day);
          const todayMarker = isToday(day);

          return (
            <button
              key={day}
              type="button"
              disabled={disabled}
              onClick={() => handleDayClick(day)}
              className={`w-full aspect-square rounded-xl text-xs font-semibold flex items-center justify-center transition-all duration-150 ${
                selected
                  ? "bg-[#0B3C2D] text-white shadow-md font-bold scale-105"
                  : todayMarker
                  ? "border border-[#D98A2B] text-[#D98A2B] bg-[#D98A2B]/10"
                  : disabled
                  ? "text-ink-light/40 cursor-not-allowed bg-[#FAF7F2]/40"
                  : "text-deep-ink hover:bg-[#8CA899]/20 hover:text-[#0B3C2D]"
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>

      <div className="flex items-center space-x-2 mb-4 px-3 py-2 bg-[#FAF7F2] rounded-xl border border-[#0B3C2D]/10">
        <CalendarDays className="w-4 h-4 text-[#D98A2B] shrink-0" />
        <span className="text-xs font-semibold text-[#0B3C2D]">
          {formatSelectedDate()}
        </span>
      </div>

      <div className="border-t border-[#0B3C2D]/10 pt-4">
        <div className="flex items-center space-x-2 mb-3">
          <Clock className="w-4 h-4 text-[#D98A2B]" />
          <span className="text-xs font-bold text-[#0B3C2D] uppercase tracking-wider">Select Available Time Slot</span>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-3 gap-2">
          {timeSlots.map((time) => {
            const isPast = checkIsPastTime(selectedDate, time);
            return (
              <button
                key={time}
                type="button"
                disabled={isPast}
                onClick={() => onTimeSelect(time)}
                className={`py-2 px-2 rounded-xl text-xs font-semibold transition-all duration-150 border ${
                  selectedTime === time
                    ? "bg-[#D98A2B] text-white border-[#D98A2B] shadow-sm font-bold"
                    : isPast
                    ? "border-[#0B3C2D]/10 text-ink-light/40 cursor-not-allowed bg-[#FAF7F2]/40"
                    : "border-[#0B3C2D]/15 text-deep-ink hover:border-[#0B3C2D] hover:bg-[#FAF7F2]"
                }`}
              >
                {time}
              </button>
            );
          })}
        </div>
        {!selectedTime && (
          <p className="text-[11px] text-ink-light mt-3 text-center">Select an available slot to proceed</p>
        )}
      </div>
    </div>
  );
}
