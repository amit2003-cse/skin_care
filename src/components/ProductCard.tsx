"use client";

import React, { useState } from "react";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { Star, Heart, Check, Plus, Droplets, Sun, Moon, Sparkles } from "lucide-react";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart, wishlist, toggleWishlist } = useCart();
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "Standard");
  const [addedAnimation, setAddedAnimation] = useState(false);

  const isWishlisted = wishlist.includes(product.id);
  const discountPercent = Math.round(
    ((product.compareAtPrice - product.price) / product.compareAtPrice) * 100
  );

  const handleAdd = () => {
    addToCart(product, selectedSize);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  const getUsageIcon = (usage: string) => {
    switch (usage) {
      case "AM":
        return <Sun className="w-3 h-3 text-amber-500" />;
      case "PM":
        return <Moon className="w-3 h-3 text-indigo-400" />;
      default:
        return (
          <div className="flex items-center gap-0.5">
            <Sun className="w-2.5 h-2.5 text-amber-500" />
            <Moon className="w-2.5 h-2.5 text-indigo-400" />
          </div>
        );
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-neutral-200/80 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group">
      {/* Product Image Area */}
      <div className="relative aspect-square bg-neutral-50 overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start">
          {product.badge && (
            <span className="bg-neutral-900 text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded shadow-xs">
              {product.badge}
            </span>
          )}
          {discountPercent > 0 && (
            <span className="bg-rose-600 text-white text-[10px] font-black px-1.5 py-0.5 rounded shadow-xs">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={() => toggleWishlist(product.id)}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full transition-all duration-200 cursor-pointer ${
            isWishlisted
              ? "bg-rose-50 text-rose-600 shadow-md scale-110"
              : "bg-white/80 hover:bg-white text-neutral-500 hover:text-rose-600 shadow-xs"
          }`}
          title="Save to Wishlist"
        >
          <Heart
            className={`w-4 h-4 transition-transform ${
              isWishlisted ? "fill-rose-600 stroke-rose-600" : ""
            }`}
          />
        </button>

        {/* Texture & Usage Tag */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
          <span className="bg-white/95 backdrop-blur-md text-neutral-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-neutral-200/60 shadow-xs">
            {product.texture}
          </span>
          <span className="bg-neutral-900/90 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
            {getUsageIcon(product.usageTime)}
            <span>{product.usageTime}</span>
          </span>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4 flex flex-col flex-1">
        {/* Rating and category */}
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200/50">
            {product.category}
          </span>
          <div className="flex items-center gap-1 text-[11px] font-bold text-neutral-800">
            <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
            <span>{product.rating}</span>
            <span className="text-neutral-400 font-normal">({product.reviewCount})</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-sm font-bold text-neutral-900 group-hover:text-rose-600 transition-colors line-clamp-1">
          {product.title}
        </h3>

        {/* Subtitle */}
        <p className="text-xs text-neutral-500 mt-1 line-clamp-2 leading-relaxed flex-1">
          {product.subtitle}
        </p>

        {/* Clinical Result Pill */}
        <div className="flex items-center gap-1.5 text-[10px] text-emerald-800 font-semibold my-2.5 bg-emerald-50/80 px-2.5 py-1 rounded-md border border-emerald-100">
          <Sparkles className="w-3 h-3 text-emerald-600 shrink-0" />
          <span className="truncate">{product.clinicalResults}</span>
        </div>

        {/* Size Selection */}
        {product.sizes.length > 1 && (
          <div className="flex items-center gap-1.5 mb-3">
            <span className="text-[10px] font-semibold text-neutral-400">Size:</span>
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`text-[11px] px-2 py-0.5 rounded-md font-semibold transition-all cursor-pointer ${
                  selectedSize === size
                    ? "bg-neutral-900 text-white shadow-xs"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        )}

        {/* Price & Add to Cart button */}
        <div className="pt-2 border-t border-neutral-100 flex items-center justify-between gap-2 mt-auto">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-black text-neutral-900">
                ₹{product.price}
              </span>
              <span className="text-xs text-neutral-400 line-through">
                ₹{product.compareAtPrice}
              </span>
            </div>
            <span className="text-[10px] text-emerald-600 font-semibold">
              Inclusive of taxes
            </span>
          </div>

          <button
            onClick={handleAdd}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
              addedAnimation
                ? "bg-emerald-600 text-white shadow-md"
                : "bg-neutral-900 hover:bg-rose-600 text-white shadow-xs hover:shadow-md"
            }`}
          >
            {addedAnimation ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added!</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Add to Bag</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
