"use client";

import React from "react";
import { Sparkles, Shield, Award, Droplets, ArrowRight, CheckCircle2 } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function Hero({ onExploreClick }: { onExploreClick: () => void }) {
  const { setIsQuizOpen } = useCart();

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-rose-50/60 via-white to-neutral-50/80 border-b border-neutral-100">
      {/* Decorative blurred background blobs */}
      <div className="absolute top-0 right-1/4 -mt-12 w-96 h-96 bg-rose-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-white/90 border border-rose-200/80 px-3.5 py-1.5 rounded-full shadow-xs">
              <span className="flex h-2 w-2 rounded-full bg-rose-500 animate-ping" />
              <span className="text-xs font-bold text-neutral-800 tracking-wide uppercase">
                Specialist Lab for Clinical Face Creams
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-neutral-900 tracking-tight leading-[1.1]">
              Targeted Face Creams For{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-amber-600">
                Every Skin Barrier
              </span>
            </h1>

            <p className="text-base sm:text-lg text-neutral-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              No generic lotions. We formulate medical-grade facial creams engineered for Indian weather—from{" "}
              <strong className="text-neutral-900">5-Ceramide Deep Barrier Creams</strong>,{" "}
              <strong className="text-blue-700">Zero-Shine Salicylic Gels</strong>, to{" "}
              <strong className="text-purple-700">0.1% Retinol Night Soufflés</strong>.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onExploreClick}
                className="w-full sm:w-auto px-8 py-3.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-full font-bold text-sm tracking-wide transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Shop Face Creams</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => setIsQuizOpen(true)}
                className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-rose-50 text-rose-700 border border-rose-200 rounded-full font-bold text-sm tracking-wide transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-rose-500" />
                <span>Find My Face Cream (Quiz)</span>
              </button>
            </div>

            {/* Quick Face Cream Guarantees */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4 text-xs font-semibold text-neutral-600">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Non-Comedogenic (Won&apos;t Clog Pores)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>72-Hour Transepidermal Moisture</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>100% Fragrance-Free</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Face Cream Visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="bg-white rounded-3xl p-6 shadow-xl border border-neutral-100 relative overflow-hidden">
                <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500" />
                    <span className="text-xs font-bold text-neutral-800">
                      #1 Ceramide Barrier Cream
                    </span>
                  </div>
                  <span className="text-[11px] bg-rose-100 text-rose-700 font-bold px-2 py-0.5 rounded-full">
                    Saves 25% Today
                  </span>
                </div>

                <div className="my-5 relative rounded-2xl overflow-hidden bg-neutral-100 aspect-square flex items-center justify-center">
                  <img
                    src="https://cdn.shopify.com/s/files/1/0039/6073/3763/files/1_Website.png?v=1750070736"
                    alt="Ceramide Deep Barrier Restorative Face Cream"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-3 left-3 bg-neutral-900/80 backdrop-blur-md text-white text-[11px] px-3 py-1 rounded-full font-medium">
                    💧 5 Identical Skin Ceramides
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                    Barrier Restorative
                  </div>
                  <h3 className="text-base font-bold text-neutral-900">
                    Ceramide Deep Barrier Face Cream (50g)
                  </h3>
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-black text-neutral-900">₹449</span>
                      <span className="text-xs text-neutral-400 line-through">₹599</span>
                    </div>
                    <button
                      onClick={onExploreClick}
                      className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1 cursor-pointer"
                    >
                      <span>Explore Creams</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Floating Badge 1 */}
              <div className="absolute -top-4 -left-4 bg-white/90 backdrop-blur-md border border-neutral-200/80 rounded-2xl p-3 shadow-lg flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Droplets className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-neutral-900">Zero Greasy Film</div>
                  <div className="text-[10px] text-neutral-500">Fast Skin Absorption</div>
                </div>
              </div>

              {/* Floating Badge 2 */}
              <div className="absolute -bottom-4 -right-4 bg-white/90 backdrop-blur-md border border-neutral-200/80 rounded-2xl p-3 shadow-lg flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-neutral-900">Indian Weather Proof</div>
                  <div className="text-[10px] text-neutral-500">Humidity Tested Formula</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
