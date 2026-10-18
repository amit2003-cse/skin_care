"use client";

import React, { useMemo } from "react";
import { Product } from "@/types";
import ProductCard from "./ProductCard";
import { RotateCcw } from "lucide-react";

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
    <section id="products-catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Title & Count Row */}
      <div className="flex items-center justify-between pb-6 border-b border-neutral-100">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900">
            {selectedCategory === "All" ? "All Formulations" : selectedCategory}
          </h2>
          <p className="text-xs text-neutral-500 mt-0.5">
            Showing {filteredProducts.length} clinical face moisturizers
          </p>
        </div>

        {/* Clear Filters */}
        {(selectedCategory !== "All" || selectedSkinType !== "All" || searchQuery) && (
          <button
            onClick={onResetFilters}
            className="flex items-center gap-1.5 text-xs text-neutral-500 hover:text-neutral-900 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset filters</span>
          </button>
        )}
      </div>

      {/* Responsive Grid: 2 columns on mobile, 3 on tablet, 4 on desktop */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 pt-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 bg-neutral-50 rounded-2xl border border-neutral-100 my-6">
          <h3 className="text-base font-semibold text-neutral-900">
            No matching face creams
          </h3>
          <p className="text-xs text-neutral-500 max-w-xs mx-auto mt-1 mb-4">
            Try resetting your search query or skin type filter.
          </p>
          <button
            onClick={onResetFilters}
            className="px-4 py-2 bg-neutral-900 text-white rounded-full text-xs font-medium cursor-pointer"
          >
            View All Creams
          </button>
        </div>
      )}
    </section>
  );
}
