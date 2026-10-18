"use client";

import React, { useState } from "react";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import SafeImage from "./SafeImage";
import { Heart, Plus, Check, Star } from "lucide-react";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart, wishlist, toggleWishlist } = useCart();
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "Standard");
  const [added, setAdded] = useState(false);

  const isWishlisted = wishlist.includes(product.id);
  const discountPercent = Math.round(
    ((product.compareAtPrice - product.price) / product.compareAtPrice) * 100
  );

  const handleAdd = () => {
    addToCart(product, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div className="group flex flex-col bg-white rounded-2xl border border-neutral-100 overflow-hidden hover:border-neutral-300/80 transition-all duration-300">
      {/* Product Image Area */}
      <div className="relative aspect-square w-full overflow-hidden bg-[#F7F6F2]">
        <SafeImage
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Minimal Discount Tag */}
        {discountPercent > 0 && (
          <div className="absolute top-2.5 left-2.5 bg-neutral-900 text-white text-[10px] font-semibold tracking-wider px-2 py-0.5 rounded-full">
            -{discountPercent}%
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={() => toggleWishlist(product.id)}
          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer ${
            isWishlisted
              ? "bg-white text-rose-600 shadow-sm"
              : "bg-white/80 hover:bg-white text-neutral-400 hover:text-neutral-900"
          }`}
          title="Save to Wishlist"
        >
          <Heart
            className={`w-3.5 h-3.5 ${
              isWishlisted ? "fill-rose-600 stroke-rose-600" : ""
            }`}
          />
        </button>

        {/* Subtle Texture & Usage indicator */}
        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between pointer-events-none">
          <span className="bg-white/90 backdrop-blur-xs text-[10px] font-medium text-neutral-700 px-2 py-0.5 rounded-full border border-neutral-100/80">
            {product.texture}
          </span>
          <span className="bg-white/90 backdrop-blur-xs text-[10px] font-medium text-neutral-600 px-2 py-0.5 rounded-full border border-neutral-100/80">
            {product.usageTime}
          </span>
        </div>
      </div>

      {/* Details Area */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-1">
        {/* Rating */}
        <div className="flex items-center gap-1 text-[11px] font-semibold text-neutral-700 mb-1">
          <Star className="w-3 h-3 fill-amber-400 stroke-amber-400" />
          <span>{product.rating}</span>
          <span className="text-neutral-400 font-normal">({product.reviewCount})</span>
        </div>

        {/* Title */}
        <h3 className="text-xs sm:text-sm font-semibold text-neutral-900 leading-snug line-clamp-1 group-hover:text-neutral-600 transition-colors">
          {product.title}
        </h3>

        {/* Subtitle / Key Actives */}
        <p className="text-[11px] text-neutral-500 mt-1 line-clamp-1 leading-relaxed">
          {product.keyIngredients.join(" • ")}
        </p>

        {/* Size Selection (if multiple) */}
        {product.sizes.length > 1 && (
          <div className="flex items-center gap-1.5 mt-2.5">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`text-[10px] px-2 py-0.5 rounded-md font-medium transition-all cursor-pointer ${
                  selectedSize === size
                    ? "bg-neutral-900 text-white"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        )}

        {/* Price & Add Action */}
        <div className="pt-3 border-t border-neutral-100 flex items-center justify-between gap-2 mt-auto">
          <div className="flex items-baseline gap-1.5">
            <span className="text-sm sm:text-base font-bold text-neutral-900">
              ₹{product.price}
            </span>
            <span className="text-xs text-neutral-400 line-through">
              ₹{product.compareAtPrice}
            </span>
          </div>

          <button
            onClick={handleAdd}
            className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-1 cursor-pointer ${
              added
                ? "bg-emerald-600 text-white"
                : "bg-neutral-900 hover:bg-neutral-800 text-white"
            }`}
          >
            {added ? (
              <>
                <Check className="w-3 h-3" />
                <span className="hidden sm:inline">Added</span>
              </>
            ) : (
              <>
                <Plus className="w-3 h-3" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
