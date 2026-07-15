"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Clock, CalendarDays } from "lucide-react";

interface CalendarBookingProps {
  selectedDate: Date | null;
  selectedTime: string;
  onDateSelect: (date: Date) => void;
  onTimeSelect: (time: string) => void;
}

const timeSlots = [
  "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
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

    // If the selectedTime is in the past on this new date, clear it
    if (selectedTime && checkIsPastTime(newDate, selectedTime)) {
      onTimeSelect("");
    }
  };

  const formatSelectedDate = () => {
    if (!selectedDate) return "Choose a date above";
    return selectedDate.toLocaleDateString("en-IN", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  };

  return (
    <div className="bg-white border border-primary-200 rounded-2xl p-5 shadow-sm">
      <div className="flex items-center space-x-2 mb-4">
        <CalendarDays className="w-4 h-4 text-accent-gold" />
        <h3 className="text-sm font-bold text-primary-900 font-display">Pick a Date</h3>
      </div>

      <div className="flex items-center justify-between mb-3">
        <button
          onClick={prevMonth}
          className="w-8 h-8 rounded-full hover:bg-primary-100 flex items-center justify-center transition-colors"
          aria-label="Previous month"
        >
          <ChevronLeft className="w-4 h-4 text-primary-600" />
        </button>
        <span className="text-sm font-bold text-primary-900 font-display">
          {monthNames[currentMonth]} {currentYear}
        </span>
        <button
          onClick={nextMonth}
          className="w-8 h-8 rounded-full hover:bg-primary-100 flex items-center justify-center transition-colors"
          aria-label="Next month"
        >
          <ChevronRight className="w-4 h-4 text-primary-600" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-1">
        {dayNames.map((d) => (
          <div key={d} className="text-center text-[10px] font-bold text-primary-400 uppercase tracking-wider py-1">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 mb-3">
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
              disabled={disabled}
              onClick={() => handleDayClick(day)}
              className={`w-full aspect-square rounded-lg text-xs font-semibold flex items-center justify-center transition-all duration-150 ${
                selected
                  ? "bg-accent-navy text-white shadow-sm"
                  : todayMarker
                  ? "border border-accent-gold text-accent-gold bg-accent-gold-light"
                  : disabled
                  ? "text-primary-200 cursor-not-allowed"
                  : "text-primary-700 hover:bg-primary-100 hover:text-primary-900"
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>

      <div className="flex items-center space-x-2 mb-3 px-1 py-1.5 bg-primary-50 rounded-lg">
        <CalendarDays className="w-3.5 h-3.5 text-accent-gold shrink-0" />
        <span className="text-xs font-semibold text-primary-700">
          {formatSelectedDate()}
        </span>
      </div>

      <div className="border-t border-primary-100 pt-3">
        <div className="flex items-center space-x-2 mb-2">
          <Clock className="w-3.5 h-3.5 text-accent-gold" />
          <span className="text-[11px] font-bold text-primary-600 uppercase tracking-wider">Pick a Time</span>
        </div>
        <div className="grid grid-cols-4 gap-1.5">
          {timeSlots.map((time) => {
            const isPast = checkIsPastTime(selectedDate, time);
            return (
              <button
                key={time}
                disabled={isPast}
                onClick={() => onTimeSelect(time)}
                className={`py-1.5 px-1 rounded-lg text-[11px] font-semibold transition-all duration-150 border ${
                  selectedTime === time
                    ? "bg-accent-navy text-white border-accent-navy shadow-sm"
                    : isPast
                    ? "border-primary-100 text-primary-200 cursor-not-allowed bg-primary-50/50"
                    : "border-primary-200 text-primary-600 hover:border-accent-navy/30 hover:bg-primary-50"
                }`}
              >
                {time}
              </button>
            );
          })}
        </div>
        {!selectedTime && (
          <p className="text-[10px] text-primary-400 mt-2 text-center">Select a time slot above</p>
        )}
      </div>
    </div>
  );
}
