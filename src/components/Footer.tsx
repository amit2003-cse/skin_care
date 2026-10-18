"use client";

import React, { useState } from "react";
import { ArrowRight } from "lucide-react";

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
    <footer className="bg-white text-neutral-800 pt-12 pb-10 border-t border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-neutral-100">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <span className="text-lg font-bold tracking-[0.2em] text-neutral-900">
              INNOVIST
            </span>
            <p className="text-xs text-neutral-500 max-w-sm leading-relaxed">
              Formulating clinical face moisturizers with standardized ceramides,
              time-release retinol, and oil-free water gels. Non-comedogenic,
              tested for Indian weather.
            </p>

            <div className="pt-2">
              <span className="text-xs font-medium text-neutral-700 block mb-1.5">
                Join our newsletter for 10% off your first cream:
              </span>
              <form onSubmit={handleSubscribe} className="flex max-w-xs gap-2">
                <input
                  type="email"
                  required
                  placeholder="name@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-3 py-1.5 text-xs bg-neutral-100 border border-transparent rounded-full focus:bg-white focus:border-neutral-300 focus:outline-hidden"
                />
                <button
                  type="submit"
                  className="px-3.5 py-1.5 bg-neutral-900 text-white rounded-full text-xs font-medium hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  {subscribed ? "Joined" : "Join"}
                </button>
              </form>
            </div>
          </div>

          {/* Formulations */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-900">
              Collections
            </h4>
            <ul className="space-y-1.5 text-xs text-neutral-500">
              <li>Ceramide Barrier Creams</li>
              <li>Oil-Free Salicylic Gels</li>
              <li>Vitamin C Radiance Creams</li>
              <li>0.1% Retinol Night Soufflés</li>
              <li>AM/PM Cream Duos</li>
            </ul>
          </div>

          {/* Client Services */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-900">
              Client Care
            </h4>
            <ul className="space-y-1.5 text-xs text-neutral-500">
              <li>Track Order</li>
              <li>Shipping &amp; Returns</li>
              <li>Face Cream Match Quiz</li>
              <li>Contact: care@innovist.com</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-neutral-400">
          <span>© 2026 INNOVIST CREAMS. ALL RIGHTS RESERVED.</span>
          <div className="flex items-center gap-4">
            <span>Razorpay Secured</span>
            <span>•</span>
            <span>UPI &amp; Cards Accepted</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
