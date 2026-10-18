"use client";

import React from "react";
import SafeImage from "./SafeImage";
import { ArrowRight, Sparkles } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function Hero({ onExploreClick }: { onExploreClick: () => void }) {
  const { setIsQuizOpen } = useCart();

  return (
    <section className="bg-[#FAF9F5] border-b border-neutral-100 py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-neutral-500">
              Clinical Barrier Care
            </span>

            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-neutral-900 leading-[1.15]">
              Targeted Face Creams. <br />
              <span className="font-normal text-neutral-500">
                Engineered for Skin Barrier Health.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-neutral-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              High-potency facial moisturizers formulated with 5 essential ceramides,
              time-release retinol, and oil-free water gels. Non-comedogenic,
              fragrance-free, and calibrated for Indian weather.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={onExploreClick}
                className="w-full sm:w-auto px-7 py-3 bg-neutral-900 hover:bg-neutral-800 text-white rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Shop All Creams</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setIsQuizOpen(true)}
                className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-neutral-50 text-neutral-800 border border-neutral-200 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Cream Advisor Quiz</span>
              </button>
            </div>

            {/* Subtle Minimalist Guarantees */}
            <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 text-[11px] text-neutral-500">
              <span>• Non-Comedogenic</span>
              <span>• 72H Deep Moisture</span>
              <span>• Fragrance-Free</span>
            </div>
          </div>

          {/* Right Column: Clean Editorial Product Image */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-sm aspect-4/5 rounded-3xl overflow-hidden shadow-sm border border-neutral-200/60 bg-white">
              <SafeImage
                src="https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80"
                alt="Signature Ceramide Barrier Restorative Cream"
                className="w-full h-full object-cover"
              />

              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3 rounded-2xl border border-neutral-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-bold block">
                    Signature Formulation
                  </span>
                  <span className="text-xs font-bold text-neutral-900">
                    Ceramide Deep Barrier Cream
                  </span>
                </div>
                <button
                  onClick={onExploreClick}
                  className="text-xs font-bold text-neutral-900 underline underline-offset-2 cursor-pointer"
                >
                  ₹449
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
