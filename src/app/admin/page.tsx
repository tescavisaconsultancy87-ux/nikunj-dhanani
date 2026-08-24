"use client";

import React, { useState, useEffect } from "react";
import {
  Shield,
  Lock,
  User,
  Mail,
  Phone,
  MessageSquare,
  Calendar,
  Filter,
  Database,
  Search,
  CheckCircle,
  Inbox,
  LogOut,
  RefreshCw
} from "lucide-react";

interface Booking {
  _id: string;
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  message: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState("");
  
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [source, setSource] = useState("");
  
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");

  // Load auth state from localStorage on mount
  useEffect(() => {
    const savedKey = localStorage.getItem("dhanani_admin_key");
    if (savedKey) {
      verifyAndFetch(savedKey);
    }
  }, []);

  // Filter and search logic
  useEffect(() => {
    let result = bookings;
    
    if (filterType !== "All") {
      result = result.filter((b) => b.serviceType.toLowerCase().includes(filterType.toLowerCase()));
    }
    
    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (b) =>
          b.name.toLowerCase().includes(term) ||
          b.email.toLowerCase().includes(term) ||
          b.phone.toLowerCase().includes(term) ||
          b.message.toLowerCase().includes(term)
      );
    }
    
    setFilteredBookings(result);
  }, [bookings, searchTerm, filterType]);

  const verifyAndFetch = async (key: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/bookings?key=${key}`);
      const data = await res.json();

      if (res.ok && data.success) {
        setIsAuthenticated(true);
        localStorage.setItem("dhanani_admin_key", key);
        setBookings(data.data || []);
        setFilteredBookings(data.data || []);
        setSource(data.source === "mongodb" ? "MongoDB Atlas Database" : "Local JSON Storage");
      } else {
        setLoginError(data.error || "Invalid administrator password");
        localStorage.removeItem("dhanani_admin_key");
        setIsAuthenticated(false);
      }
    } catch (err) {
      setError("Failed to fetch bookings from API");
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    if (!password) return;
    verifyAndFetch(password);
  };

  const handleLogout = () => {
    localStorage.removeItem("dhanani_admin_key");
    setIsAuthenticated(false);
    setPassword("");
    setBookings([]);
    setFilteredBookings([]);
  };

  const handleRefresh = () => {
    const savedKey = localStorage.getItem("dhanani_admin_key");
    if (savedKey) {
      verifyAndFetch(savedKey);
    }
  };

  // Metrics calculations
  const totalCount = bookings.length;
  const counselingCount = bookings.filter(b => b.serviceType.toLowerCase().includes("counseling") || b.serviceType.toLowerCase().includes("life")).length;
  const quizCount = bookings.filter(b => b.serviceType.toLowerCase().includes("quiz") || b.serviceType.toLowerCase().includes("lead")).length;
  const parentingCount = bookings.filter(b => b.serviceType.toLowerCase().includes("parenting")).length;
  const relationshipCount = bookings.filter(b => b.serviceType.toLowerCase().includes("relationship") || b.serviceType.toLowerCase().includes("repair")).length;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF6F0] px-4 py-12 text-[#2E2A26]">
        <div className="max-w-md w-full bg-[#FFFDF9] p-8 rounded-3xl shadow-xl border border-[#E6DEC8] space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-[#1E2C24] flex items-center justify-center text-white mx-auto shadow-md">
              <Shield className="w-7 h-7 text-[#C97B5B]" />
            </div>
            <h1 className="text-2xl font-serif-display font-bold text-[#1E2C24]">
              Practitioner Admin Portal
            </h1>
            <p className="text-xs text-[#5E5852]">
              Enter administrator password to access client bookings and assessment leads.
            </p>
          </div>

          {loginError && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-semibold text-center">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4 text-left">
            <div>
              <label htmlFor="adminKey" className="block text-xs font-bold uppercase tracking-wider text-[#1E2C24] mb-1.5">
                Administrator Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-[#8C847C]" />
                <input
                  type="password"
                  id="adminKey"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E6DEC8] bg-[#FAF6F0] text-xs font-medium text-[#1E2C24] focus:outline-none focus:border-[#6B7F62]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-full bg-[#1E2C24] hover:bg-[#142019] text-white font-semibold text-xs transition-all shadow-md flex items-center justify-center space-x-2 glow-btn"
            >
              {loading ? <span>Verifying Password...</span> : <span>Access Admin Dashboard</span>}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF6F0] py-8 sm:py-12 text-[#2E2A26]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Dashboard Top Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 bg-[#FFFDF9] p-6 rounded-3xl border border-[#E6DEC8] shadow-sm">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#C97B5B] block">
              Nikunj Dhanani • Practice Dashboard
            </span>
            <h1 className="text-2xl sm:text-3xl font-serif-display font-bold text-[#1E2C24]">
              Client Inquiries & Assessment Leads
            </h1>
            <p className="text-xs text-[#5E5852] flex items-center mt-1">
              <Database className="w-3.5 h-3.5 mr-1.5 text-[#6B7F62]" />
              Data Source: <strong className="ml-1 text-[#1E2C24] font-bold">{source}</strong>
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleRefresh}
              className="p-3 rounded-2xl border border-[#E6DEC8] bg-[#FAF6F0] hover:bg-[#EBF0E8] text-[#1E2C24] transition-all flex items-center space-x-1.5 text-xs font-bold shadow-2xs"
              title="Refresh Client Data"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-[#C97B5B]" : "text-[#6B7F62]"}`} />
              <span>Refresh</span>
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-3 rounded-2xl bg-red-50 hover:bg-red-100 text-red-700 font-bold transition-all text-xs flex items-center space-x-1.5 border border-red-200"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* High-Contrast Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { label: "Total Submissions", val: totalCount, border: "border-l-[#1E2C24]", bg: "bg-[#FFFDF9]" },
            { label: "Quiz Leads", val: quizCount, border: "border-l-[#C97B5B]", bg: "bg-[#FFFDF9]" },
            { label: "Counseling", val: counselingCount, border: "border-l-[#6B7F62]", bg: "bg-[#FFFDF9]" },
            { label: "Parenting", val: parentingCount, border: "border-l-[#D98A2B]", bg: "bg-[#FFFDF9]" },
            { label: "Relationship", val: relationshipCount, border: "border-l-[#6B7F62]", bg: "bg-[#FFFDF9]" }
          ].map((metric, idx) => (
            <div key={idx} className={`bg-[#FFFDF9] p-5 rounded-2xl border border-[#E6DEC8] border-l-4 ${metric.border} shadow-2xs space-y-1`}>
              <span className="block text-[11px] font-bold text-[#8C847C] uppercase tracking-wider">
                {metric.label}
              </span>
              <span className="block text-2xl sm:text-3xl font-serif-display font-bold text-[#1E2C24]">
                {metric.val}
              </span>
            </div>
          ))}
        </div>

        {/* Filters and Controls */}
        <div className="bg-[#FFFDF9] p-5 rounded-2xl border border-[#E6DEC8] shadow-2xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Search Bar */}
          <div className="relative flex-grow max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-[#8C847C]" />
            <input
              type="text"
              placeholder="Search clients by name, phone, email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E6DEC8] bg-[#FAF6F0] focus:outline-none focus:border-[#6B7F62] text-xs font-semibold text-[#1E2C24]"
            />
          </div>
          {/* Filter Dropdown */}
          <div className="flex items-center space-x-3 shrink-0">
            <Filter className="w-4 h-4 text-[#8C847C]" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2.5 rounded-xl border border-[#E6DEC8] bg-[#FAF6F0] focus:outline-none text-xs font-bold text-[#1E2C24]"
            >
              <option value="All">All Inquiries & Leads</option>
              <option value="Quiz">Quiz Check-in Leads</option>
              <option value="Counseling">Counseling</option>
              <option value="Parenting">Parenting</option>
              <option value="Relationship">Relationship</option>
              <option value="Speaking">Public Speaking</option>
            </select>
          </div>
        </div>

        {/* High-Contrast Client Inquiries Grid */}
        {loading && bookings.length === 0 ? (
          <div className="text-center py-20 bg-[#FFFDF9] rounded-3xl border border-[#E6DEC8]">
            <RefreshCw className="w-10 h-10 animate-spin text-[#C97B5B] mx-auto mb-3" />
            <p className="text-xs font-bold text-[#1E2C24]">Fetching Client Submissions...</p>
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="bg-[#FFFDF9] rounded-3xl p-16 text-center space-y-3 border border-[#E6DEC8]">
            <Inbox className="w-12 h-12 text-[#8C847C] mx-auto" />
            <h3 className="text-lg font-serif-display font-bold text-[#1E2C24]">No Inquiries Found</h3>
            <p className="text-xs text-[#5E5852] max-w-md mx-auto">
              No entries match your search criteria. Submissions from the website booking form and assessment quiz will appear here in real time.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredBookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-[#FFFDF9] hover:bg-[#FAF6F0]/70 transition-all p-6 rounded-2xl border border-[#E6DEC8] shadow-sm flex flex-col justify-between space-y-4 border-l-4 border-l-[#C97B5B]"
              >
                <div className="space-y-4">
                  
                  {/* Card Top Row: Name & Date */}
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-serif-display font-bold text-[#1E2C24] leading-snug">
                        {booking.name}
                      </h3>
                      <span className="inline-block px-3 py-1 mt-1.5 rounded-full bg-[#F9EFEA] text-[#C97B5B] text-[10px] font-extrabold uppercase tracking-wider border border-[#C97B5B]/30">
                        {booking.serviceType}
                      </span>
                    </div>

                    <div className="text-right text-[11px] font-semibold text-[#5E5852] bg-[#FAF6F0] px-3 py-1.5 rounded-xl border border-[#E6DEC8] flex items-center space-x-1 shrink-0">
                      <Calendar className="w-3.5 h-3.5 text-[#6B7F62] mr-1" />
                      <span>
                        {new Date(booking.createdAt).toLocaleDateString("en-IN", {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit"
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Client Contact Info Grid - High Contrast */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-[#E6DEC8] text-xs">
                    <div className="flex items-center space-x-2 text-[#1E2C24] font-semibold bg-[#FAF6F0] p-2.5 rounded-xl border border-[#E6DEC8]">
                      <Phone className="w-4 h-4 text-[#6B7F62] shrink-0" />
                      <a href={`tel:${booking.phone}`} className="hover:underline text-[#1E2C24]">
                        +91 {booking.phone}
                      </a>
                    </div>

                    {booking.email && (
                      <div className="flex items-center space-x-2 text-[#1E2C24] font-semibold bg-[#FAF6F0] p-2.5 rounded-xl border border-[#E6DEC8]">
                        <Mail className="w-4 h-4 text-[#6B7F62] shrink-0" />
                        <a href={`mailto:${booking.email}`} className="hover:underline text-[#1E2C24] truncate">
                          {booking.email}
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Client Message / Quiz Assessment Notes */}
                  {booking.message && (
                    <div className="p-3.5 bg-[#FAF6F0] rounded-xl border border-[#E6DEC8] text-xs text-[#2E2A26] space-y-1">
                      <span className="text-[10px] font-bold text-[#6B7F62] uppercase tracking-wider block">
                        Submission Context / Assessment Notes:
                      </span>
                      <div className="flex items-start space-x-2">
                        <MessageSquare className="w-4 h-4 text-[#C97B5B] shrink-0 mt-0.5" />
                        <p className="text-xs text-[#2E2A26] font-medium leading-relaxed">
                          {booking.message}
                        </p>
                      </div>
                    </div>
                  )}

                </div>

                {/* Card Footer Security Signal */}
                <div className="pt-3 border-t border-[#E6DEC8] flex items-center justify-between">
                  <span className="text-[11px] text-[#6B7F62] font-bold uppercase flex items-center">
                    <CheckCircle className="w-3.5 h-3.5 mr-1 text-[#6B7F62]" />
                    Confidential Client Submission
                  </span>
                  
                  {/* WhatsApp Quick Link to Client */}
                  {booking.phone && (
                    <a
                      href={`https://wa.me/91${booking.phone.replace(/\D/g, "")}?text=${encodeURIComponent(
                        `Hi ${booking.name}, thank you for reaching out regarding ${booking.serviceType}. This is Nikunj Dhanani.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white text-[11px] font-bold transition-all shadow-2xs"
                    >
                      Reply on WhatsApp
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
