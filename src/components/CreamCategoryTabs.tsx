"use client";

import React from "react";
import { CREAM_CATEGORIES } from "@/data/products";
import { ArrowUpRight } from "lucide-react";

interface CreamCategoryTabsProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export default function CreamCategoryTabs({
  selectedCategory,
  setSelectedCategory,
}: CreamCategoryTabsProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight">
            Targeted Face Cream Formulations
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500">
            Select your specific facial concern to find the exact formulation
          </p>
        </div>
        <span className="text-xs font-bold text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-200 hidden sm:inline-block">
          Click category to filter
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {CREAM_CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`p-4 rounded-2xl text-left transition-all duration-300 relative border flex flex-col justify-between cursor-pointer ${
                isSelected
                  ? "bg-neutral-900 text-white border-neutral-900 shadow-lg scale-[1.03]"
                  : "bg-white hover:bg-neutral-50 text-neutral-900 border-neutral-200/80 shadow-xs"
              }`}
            >
              <div className="flex items-center justify-between mb-2 w-full">
                <span className="text-xl">{cat.icon}</span>
                <ArrowUpRight
                  className={`w-3.5 h-3.5 transition-transform ${
                    isSelected
                      ? "text-rose-400 translate-x-0.5 -translate-y-0.5"
                      : "text-neutral-400"
                  }`}
                />
              </div>

              <div>
                <h3 className="text-xs font-black tracking-tight leading-tight line-clamp-2">
                  {cat.name}
                </h3>
                <p
                  className={`text-[10px] mt-1 leading-tight line-clamp-1 ${
                    isSelected ? "text-neutral-300" : "text-neutral-400"
                  }`}
                >
                  {cat.desc}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
