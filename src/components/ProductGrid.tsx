"use client";

import React, { useMemo } from "react";
import { Product } from "@/types";
import ProductCard from "./ProductCard";
import { Sparkles, RotateCcw } from "lucide-react";

interface ProductGridProps {
  products: Product[];
  selectedCategory: string;
  selectedSkinType: string;
  searchQuery: string;
  onResetFilters: () => void;
}

export default function ProductGrid({
  products,
  selectedCategory,
  selectedSkinType,
  searchQuery,
  onResetFilters,
}: ProductGridProps) {
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category filter
      if (selectedCategory !== "All" && p.category !== selectedCategory) {
        return false;
      }
      // Skin Type filter
      if (
        selectedSkinType !== "All" &&
        !p.skinType.includes("All") &&
        !p.skinType.includes(selectedSkinType as "Dry" | "Oily" | "Combination" | "Sensitive")
      ) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = p.title.toLowerCase().includes(query);
        const matchesSubtitle = p.subtitle.toLowerCase().includes(query);
        const matchesTexture = p.texture.toLowerCase().includes(query);
        const matchesIngredient = p.keyIngredients.some((i) =>
          i.toLowerCase().includes(query)
        );
        if (!matchesTitle && !matchesSubtitle && !matchesTexture && !matchesIngredient) {
          return false;
        }
      }
      return true;
    });
  }, [products, selectedCategory, selectedSkinType, searchQuery]);

  return (
    <section id="products-catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Title & Filter Badges */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-neutral-200 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
              {selectedCategory === "All" ? "Clinical Face Creams" : selectedCategory}
            </h2>
            <span className="bg-rose-100 text-rose-700 text-xs font-bold px-2.5 py-0.5 rounded-full">
              {filteredProducts.length} Creams
            </span>
          </div>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1">
            Engineered with standardized actives. Non-comedogenic, 100% fragrance-free.
          </p>
        </div>

        {/* Clear Filters Button */}
        {(selectedCategory !== "All" || selectedSkinType !== "All" || searchQuery) && (
          <button
            onClick={onResetFilters}
            className="self-start sm:self-auto flex items-center gap-1.5 text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-full border border-rose-200 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Clear Filters</span>
          </button>
        )}
      </div>

      {/* Grid of Face Creams */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 bg-neutral-50 rounded-3xl border border-dashed border-neutral-200 my-8">
          <div className="w-14 h-14 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-3">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-neutral-900">
            No face creams match your filter
          </h3>
          <p className="text-xs text-neutral-500 max-w-sm mx-auto mt-1 mb-5">
            Try choosing &quot;All Face Creams&quot; or selecting &quot;All Skin Types&quot;.
          </p>
          <button
            onClick={onResetFilters}
            className="px-5 py-2.5 bg-neutral-900 text-white rounded-full text-xs font-bold hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}
    </section>
  );
}
