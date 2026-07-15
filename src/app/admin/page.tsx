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
      result = result.filter((b) => b.serviceType.toLowerCase() === filterType.toLowerCase());
    }
    
    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (b) =>
          b.name.toLowerCase().includes(term) ||
          b.email.toLowerCase().includes(term) ||
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
        setSource(data.source === "mongodb" ? "MongoDB Atlas" : "Local JSON Fallback");
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
  const counselingCount = bookings.filter(b => b.serviceType.toLowerCase() === "counseling").length;
  const stressCount = bookings.filter(b => b.serviceType.toLowerCase() === "stress").length;
  const parentingCount = bookings.filter(b => b.serviceType.toLowerCase() === "parenting").length;
  const speakingCount = bookings.filter(b => b.serviceType.toLowerCase() === "speaking").length;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary-50 dark:bg-slate-900/40 px-4 py-12">
        <div className="max-w-md w-full glass-card p-8 rounded-3xl shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-accent-navy flex items-center justify-center text-white mx-auto hover-lift">
              <Shield className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-primary-900 dark:text-white font-display">
              Admin Portal
            </h1>
            <p className="text-sm text-primary-500 dark:text-primary-200">
              Please enter password to view bookings and leads.
            </p>
          </div>

          {loginError && (
            <div className="p-3 bg-accent-rose/10 border border-accent-rose/20 text-accent-rose rounded-xl text-xs font-semibold text-center">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label htmlFor="adminKey" className="block text-xs font-bold uppercase tracking-wider text-primary-900 dark:text-white mb-2">
                Administrator Password
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 absolute left-3 top-3.5 text-primary-500" />
                <input
                  type="password"
                  id="adminKey"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-primary-200 dark:border-primary-700 bg-white/50 dark:bg-primary-900/50 focus:outline-none focus:ring-2 focus:ring-accent-navy focus:border-transparent transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-primary-900 dark:bg-accent-navy hover:bg-primary-800 dark:hover:bg-accent-amber text-white font-bold transition-all shadow-md flex items-center justify-center space-x-2"
            >
              {loading ? <span>Verifying...</span> : <span>Access Dashboard</span>}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-50 dark:bg-slate-900/10 pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-primary-900 dark:text-white font-display">
              Client Bookings & Leads
            </h1>
            <p className="text-sm text-primary-500 dark:text-primary-200 flex items-center mt-1">
              <Database className="w-4 h-4 mr-1 text-accent-teal" />
              Connected to: <strong className="ml-1 text-accent-teal">{source}</strong>
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleRefresh}
              className="p-2.5 rounded-xl border border-primary-200 dark:border-primary-700 hover:bg-primary-100 dark:hover:bg-primary-800 text-primary-900 dark:text-white transition-all flex items-center space-x-1"
              title="Refresh"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2.5 rounded-xl bg-accent-rose/10 hover:bg-accent-rose/20 text-accent-rose font-bold transition-all text-sm flex items-center space-x-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { label: "Total Bookings", val: totalCount, color: "border-l-accent-navy" },
            { label: "Counseling", val: counselingCount, color: "border-l-accent-teal" },
            { label: "Stress", val: stressCount, color: "border-l-accent-amber" },
            { label: "Parenting", val: parentingCount, color: "border-l-accent-rose" },
            { label: "Speaking", val: speakingCount, color: "border-l-accent-mint" }
          ].map((metric, idx) => (
            <div key={idx} className={`glass-card p-5 rounded-2xl border-l-4 ${metric.color} shadow-sm`}>
              <span className="block text-xs font-semibold text-primary-500 dark:text-primary-200 uppercase tracking-wider">
                {metric.label}
              </span>
              <span className="block text-2xl font-bold font-display mt-1 text-primary-900 dark:text-white">
                {metric.val}
              </span>
            </div>
          ))}
        </div>

        {/* Filters and Controls */}
        <div className="glass-card p-5 rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Search */}
          <div className="relative flex-grow max-w-md">
            <Search className="w-5 h-5 absolute left-3 top-3.5 text-primary-500" />
            <input
              type="text"
              placeholder="Search clients or message context..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-primary-200 dark:border-primary-700 bg-white/50 dark:bg-primary-900/50 focus:outline-none focus:ring-2 focus:ring-accent-navy focus:border-transparent transition-all text-sm"
            />
          </div>
          {/* Filter */}
          <div className="flex items-center space-x-3 shrink-0">
            <Filter className="w-5 h-5 text-primary-500" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-3 rounded-xl border border-primary-200 dark:border-primary-700 bg-white/50 dark:bg-primary-900/50 focus:outline-none focus:ring-2 focus:ring-accent-navy focus:border-transparent text-sm font-semibold text-primary-900 dark:text-white"
            >
              <option value="All">All Categories</option>
              <option value="Counseling">Counseling</option>
              <option value="Stress">Stress Management</option>
              <option value="Parenting">Parenting</option>
              <option value="Speaking">Public Speaking</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {/* Bookings Display */}
        {loading && bookings.length === 0 ? (
          <div className="text-center py-20">
            <RefreshCw className="w-10 h-10 animate-spin text-accent-navy mx-auto mb-4" />
            <p className="text-sm font-semibold text-primary-500">Loading Client Database...</p>
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="glass-card rounded-2xl p-16 text-center space-y-3">
            <Inbox className="w-12 h-12 text-primary-500 mx-auto" />
            <h3 className="text-lg font-bold text-primary-900 dark:text-white font-display">No inquiries found</h3>
            <p className="text-sm text-primary-500 dark:text-primary-200 max-w-md mx-auto">
              No entries match your search criteria or no booking submissions have been received yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredBookings.map((booking) => (
              <div
                key={booking._id}
                className="glass-card hover-lift p-6 rounded-2xl flex flex-col justify-between border-l-4 border-l-accent-navy"
              >
                <div className="space-y-4">
                  {/* Card Header */}
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-primary-900 dark:text-white font-display">
                        {booking.name}
                      </h3>
                      <span className="inline-block px-2.5 py-0.5 mt-1.5 rounded-full bg-accent-navy/10 text-accent-navy text-[10px] font-bold uppercase tracking-wider">
                        {booking.serviceType}
                      </span>
                    </div>
                    <div className="text-right text-[11px] font-bold text-primary-500 dark:text-primary-200 flex items-center">
                      <Calendar className="w-3.5 h-3.5 mr-1" />
                      {new Date(booking.createdAt).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit"
                      })}
                    </div>
                  </div>

                  {/* Client Info Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-primary-100 dark:border-primary-800/80 text-xs text-primary-500 dark:text-primary-200">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-accent-teal shrink-0" />
                      <a href={`mailto:${booking.email}`} className="hover:underline font-semibold break-all">
                        {booking.email}
                      </a>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-accent-teal shrink-0" />
                      <a href={`tel:${booking.phone}`} className="hover:underline font-semibold">
                        {booking.phone}
                      </a>
                    </div>
                  </div>

                  {/* Client Context Message */}
                  <div className="p-3 bg-primary-100/50 dark:bg-primary-900/30 rounded-xl">
                    <div className="flex items-start space-x-2">
                      <MessageSquare className="w-4 h-4 text-accent-navy shrink-0 mt-0.5" />
                      <p className="text-xs text-primary-900 dark:text-white leading-relaxed">
                        {booking.message}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-primary-100 dark:border-primary-800/80 flex justify-end">
                  <span className="text-[10px] text-accent-teal font-bold uppercase flex items-center space-x-1">
                    <CheckCircle className="w-3.5 h-3.5 mr-1" />
                    Confidential Submission
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
