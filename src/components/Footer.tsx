"use client";

import React, { useState } from "react";
import { Mail, ShieldCheck } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail("");
      setSubscribed(false);
    }, 3000);
  };

  return (
    <footer className="bg-white text-neutral-800 pt-16 pb-12 border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-neutral-200">
          {/* Brand Info & Newsletter */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-1.5">
              <span className="text-2xl font-black tracking-tight text-neutral-950">
                INNOVIST
              </span>
              <span className="bg-rose-100 text-rose-700 font-extrabold text-[10px] px-1.5 py-0.5 rounded tracking-wider uppercase">
                CREAMS
              </span>
            </div>
            <p className="text-xs text-neutral-500 max-w-sm leading-relaxed">
              India&apos;s first dedicated face cream lab. Formulating dermatological
              ceramide barrier restorers, oil-free salicylic water creams, and
              micro-encapsulated retinol night soufflés.
            </p>

            <div className="pt-2">
              <span className="text-xs font-bold text-neutral-900 block mb-2">
                Subscribe for exclusive cream drops &amp; extra 10% off:
              </span>
              <form onSubmit={handleSubscribe} className="flex max-w-sm gap-2">
                <div className="relative flex-1">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-neutral-100 border border-neutral-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-rose-500"
                  />
                  <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  {subscribed ? "Joined!" : "Join"}
                </button>
              </form>
              {subscribed && (
                <span className="text-[11px] text-emerald-600 font-semibold mt-1 inline-block">
                  ✓ Check your inbox for your 10% welcome coupon!
                </span>
              )}
            </div>
          </div>

          {/* Face Cream Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-neutral-900">
              Face Creams
            </h4>
            <ul className="space-y-2 text-xs text-neutral-500">
              <li>
                <a href="#products-catalog" className="hover:text-neutral-900 transition-colors">
                  Ceramide Barrier Creams
                </a>
              </li>
              <li>
                <a href="#products-catalog" className="hover:text-neutral-900 transition-colors">
                  Oil-Free Water Gels
                </a>
              </li>
              <li>
                <a href="#products-catalog" className="hover:text-neutral-900 transition-colors">
                  Vitamin C Glow Creams
                </a>
              </li>
              <li>
                <a href="#products-catalog" className="hover:text-neutral-900 transition-colors">
                  0.1% Retinol Night Soufflés
                </a>
              </li>
              <li>
                <a href="#products-catalog" className="hover:text-neutral-900 transition-colors">
                  AM/PM Cream Duos (Save 40%)
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-neutral-900">
              Customer Care
            </h4>
            <ul className="space-y-2 text-xs text-neutral-500">
              <li>
                <a href="#" className="hover:text-neutral-900 transition-colors">
                  Track Your Face Cream Order
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-neutral-900 transition-colors">
                  Shipping &amp; 30-Day Returns Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-neutral-900 transition-colors">
                  Face Cream Match Quiz
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-neutral-900 transition-colors">
                  Contact: help@innovistcreams.com
                </a>
              </li>
            </ul>
          </div>

          {/* Tech Stack */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-neutral-900">
              Production Stack
            </h4>
            <ul className="space-y-2 text-xs text-neutral-500">
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>Next.js 16 App Router</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                <span>Tailwind CSS</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                <span>Razorpay Payments Ready</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                <span>MongoDB Staging</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <span>Google OAuth Ready</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <div className="flex items-center gap-1">
            <span>© 2026 Innovist Creams. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded text-[11px] font-mono">
              Razorpay Secured
            </span>
            <span className="bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded text-[11px] font-mono">
              UPI Accepted
            </span>
            <span className="bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded text-[11px] font-mono">
              SSL 256-Bit
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
