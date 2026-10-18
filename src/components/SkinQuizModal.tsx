"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { PRODUCTS } from "@/data/products";
import { X, Sparkles, Check, ArrowRight, RotateCcw } from "lucide-react";

export default function SkinQuizModal() {
  const { isQuizOpen, setIsQuizOpen, addToCart } = useCart();
  const [step, setStep] = useState(1);
  const [skinType, setSkinType] = useState<string>("Dry");
  const [goal, setGoal] = useState<string>("Barrier Repair");
  const [quizFinished, setQuizFinished] = useState(false);

  if (!isQuizOpen) return null;

  const skinTypes = [
    { id: "Dry", title: "Dry / Flaky Skin", desc: "Feels tight, needs deep ceramide barrier moisture" },
    { id: "Oily", title: "Oily / Acne Prone", desc: "Greasy T-zone, frequent breakouts, needs oil-free gel" },
    { id: "Sensitive", title: "Sensitive / Easily Irritated", desc: "Redness, stinging, reacts easily to fragrance" },
    { id: "Combination", title: "Combination Skin", desc: "Oily forehead & nose, but dry on cheeks" },
  ];

  const goals = [
    { id: "Barrier Repair", title: "Rebuild Damaged Barrier & Hydrate", category: "Barrier Repair" },
    { id: "Oil-Free Gel", title: "Control Sebum & Clear Breakouts", category: "Oil-Free Gel" },
    { id: "Glow & Brightening", title: "Fade Dark Spots & Sun Pigmentation", category: "Glow & Brightening" },
    { id: "Night & Anti-Aging", title: "Smooth Fine Lines & Boost Collagen", category: "Night & Anti-Aging" },
  ];

  const getRecommendedCream = () => {
    const matched = PRODUCTS.find((p) => p.category === goal);
    return matched || PRODUCTS[0];
  };

  const recommendedCream = getRecommendedCream();
  const duoBundle = PRODUCTS.find((p) => p.id === "am-pm-cream-duo-bundle") || PRODUCTS[0];

  const handleAddCream = () => {
    addToCart(recommendedCream);
    setIsQuizOpen(false);
  };

  const handleAddDuo = () => {
    addToCart(duoBundle);
    setIsQuizOpen(false);
  };

  const resetQuiz = () => {
    setStep(1);
    setQuizFinished(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={() => setIsQuizOpen(false)}
        className="absolute inset-0 bg-neutral-950/70 backdrop-blur-xs"
      />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-neutral-100 z-10 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={() => setIsQuizOpen(false)}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-neutral-900 rounded-full hover:bg-neutral-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-rose-600">
            Face Cream Match Quiz
          </span>
        </div>

        {!quizFinished ? (
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-neutral-900 mb-1">
              {step === 1 ? "What is your Facial Skin Type?" : "What is your Primary Face Goal?"}
            </h2>
            <p className="text-xs text-neutral-500 mb-6">
              Step {step} of 2 • Customized cream texture in 30 seconds
            </p>

            {step === 1 && (
              <div className="space-y-3">
                {skinTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => {
                      setSkinType(type.id);
                      setStep(2);
                    }}
                    className="w-full p-4 rounded-2xl border border-neutral-200 hover:border-rose-500 hover:bg-rose-50/40 text-left flex items-center justify-between transition-all cursor-pointer"
                  >
                    <div>
                      <div className="text-sm font-bold text-neutral-900">{type.title}</div>
                      <div className="text-xs text-neutral-500">{type.desc}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-neutral-400" />
                  </button>
                ))}
              </div>
            )}

            {step === 2 && (
              <div className="space-y-3">
                {goals.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => {
                      setGoal(g.category);
                      setQuizFinished(true);
                    }}
                    className="w-full p-4 rounded-2xl border border-neutral-200 hover:border-rose-500 hover:bg-rose-50/40 text-left flex items-center justify-between transition-all cursor-pointer"
                  >
                    <span className="text-sm font-bold text-neutral-900">{g.title}</span>
                    <ArrowRight className="w-4 h-4 text-neutral-400" />
                  </button>
                ))}

                <button
                  onClick={() => setStep(1)}
                  className="mt-4 text-xs font-semibold text-neutral-500 hover:text-neutral-900 underline block cursor-pointer"
                >
                  ← Go back to skin type
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Results View */
          <div>
            <div className="inline-block bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-md mb-2">
              99% DERMA MATCH FOUND
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-neutral-900 mb-1">
              Your Prescribed Face Cream
            </h2>
            <p className="text-xs text-neutral-500 mb-5">
              Ideal for {skinType} skin seeking targeted {goal}.
            </p>

            <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200 mb-5 flex items-center gap-3">
              <img
                src={recommendedCream.image}
                alt={recommendedCream.title}
                className="w-16 h-16 object-cover rounded-xl bg-white border border-neutral-200 shrink-0"
              />
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-bold uppercase text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
                  {recommendedCream.texture}
                </span>
                <div className="text-xs font-bold text-neutral-900 truncate mt-1">
                  {recommendedCream.title}
                </div>
                <div className="text-xs font-black text-neutral-900 mt-0.5">
                  ₹{recommendedCream.price}{" "}
                  <span className="text-[10px] text-neutral-400 line-through">
                    ₹{recommendedCream.compareAtPrice}
                  </span>
                </div>
              </div>
              <Check className="w-5 h-5 text-emerald-600 shrink-0" />
            </div>

            <div className="space-y-2.5">
              <button
                onClick={handleAddCream}
                className="w-full py-3.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-2xl font-bold text-xs sm:text-sm tracking-wide transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Add Prescribed Cream to Bag (₹{recommendedCream.price})</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleAddDuo}
                className="w-full py-3 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-2xl font-bold text-xs tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Upgrade to AM/PM Day &amp; Night Duo (Save 40%)</span>
              </button>

              <button
                onClick={resetQuiz}
                className="w-full py-2 text-xs font-bold text-neutral-400 hover:text-neutral-700 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Quiz</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
