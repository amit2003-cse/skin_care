"use client";

import React, { useState } from "react";
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Sparkles,
  Menu,
  X,
  ShieldCheck,
  ChevronRight,
  Droplet,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { CREAM_CATEGORIES, SKIN_TYPES } from "@/data/products";

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedSkinType: string;
  setSelectedSkinType: (type: string) => void;
}

export default function Header({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedSkinType,
  setSelectedSkinType,
}: HeaderProps) {
  const { totalItemCount, setIsCartOpen, setIsAuthOpen, setIsQuizOpen, wishlist } =
    useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-100 shadow-xs">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-neutral-900 via-rose-950 to-neutral-900 text-white text-xs py-2 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2">
        <span className="inline-block animate-pulse">✨</span>
        <span>FLAT 20% OFF ON ALL CLINICAL FACE CREAMS</span>
        <span className="hidden sm:inline text-rose-300">|</span>
        <span className="hidden sm:inline bg-rose-500/30 px-2 py-0.5 rounded text-[11px] font-mono border border-rose-400/30">
          CODE: FIRST20
        </span>
        <span className="hidden md:inline">| Free Shipping above ₹499 🚚</span>
      </div>

      {/* Sub-header for Skin Type filter */}
      <div className="bg-neutral-50 border-b border-neutral-200/60 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-1.5 text-xs font-medium text-neutral-600">
          <div className="flex items-center gap-4">
            <span className="text-neutral-400 font-semibold tracking-wider uppercase text-[10px]">
              Shop By Skin Type:
            </span>
            {SKIN_TYPES.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedSkinType(type.id)}
                className={`transition-all duration-200 pb-0.5 border-b-2 cursor-pointer ${
                  selectedSkinType === type.id
                    ? "border-rose-600 text-rose-600 font-bold"
                    : "border-transparent hover:text-neutral-950"
                }`}
              >
                {type.name}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsQuizOpen(true)}
            className="flex items-center gap-1.5 text-rose-600 hover:text-rose-700 font-semibold bg-rose-50 px-3 py-1 rounded-full border border-rose-200/60 transition-all hover:shadow-xs cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-rose-500" />
            <span>Face Cream Match Quiz</span>
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-neutral-700 hover:text-neutral-950"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSelectedSkinType("All");
                setSearchQuery("");
              }}
              className="text-left cursor-pointer"
            >
              <div className="flex items-center gap-1.5">
                <span className="text-2xl sm:text-3xl font-black tracking-tight text-neutral-950">
                  INNOVIST
                </span>
                <span className="bg-rose-100 text-rose-700 font-extrabold text-[10px] px-1.5 py-0.5 rounded tracking-wider uppercase">
                  CREAMS
                </span>
              </div>
              <span className="block text-[9px] uppercase tracking-widest text-neutral-500 font-semibold -mt-1">
                Clinical Face Moisturizers
              </span>
            </button>
          </div>

          {/* Search bar */}
          <div className="flex-1 max-w-lg hidden sm:block relative">
            <div className="relative">
              <input
                type="text"
                placeholder="Search Ceramide Barrier, Retinol Night Cream, Oil-Free Gel..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-neutral-100/80 border border-neutral-200 rounded-full focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all"
              />
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-2.5 text-xs text-neutral-400 hover:text-neutral-600 bg-neutral-200 rounded-full w-5 h-5 flex items-center justify-center cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setIsQuizOpen(true)}
              className="md:hidden p-2 text-rose-600 hover:bg-rose-50 rounded-full"
              title="Cream Quiz"
            >
              <Sparkles className="w-5 h-5" />
            </button>

            {/* Wishlist */}
            <button
              onClick={() => {
                alert(
                  wishlist.length > 0
                    ? `You have saved ${wishlist.length} face cream(s) in your wishlist!`
                    : "Your wishlist is empty. Tap the heart icon on any face cream to save it!"
                );
              }}
              className="relative p-2 text-neutral-700 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-colors cursor-pointer"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* User Account / Google Sign-in */}
            <button
              onClick={() => setIsAuthOpen(true)}
              className="flex items-center gap-1.5 p-2 text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100 rounded-full transition-colors cursor-pointer"
              title="Login / Account"
            >
              <User className="w-5 h-5" />
              <span className="hidden lg:inline text-xs font-medium">Account</span>
            </button>

            {/* Shopping Bag Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all shadow-xs hover:shadow-md cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Bag</span>
              {totalItemCount > 0 && (
                <span className="bg-rose-500 text-white text-[11px] font-bold px-1.5 py-0.2 rounded-full min-w-5 text-center">
                  {totalItemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search input */}
        <div className="sm:hidden pb-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search face creams & gels..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-neutral-100 border border-neutral-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-rose-500"
            />
            <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-2.5" />
          </div>
        </div>

        {/* Cream Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto py-2.5 no-scrollbar border-t border-neutral-100 text-xs">
          {CREAM_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full font-medium whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                selectedCategory === cat.id
                  ? "bg-neutral-900 text-white shadow-xs"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          ))}
          <div className="ml-auto flex items-center gap-2 pl-4 text-[11px] text-emerald-600 font-semibold hidden lg:flex">
            <ShieldCheck className="w-4 h-4" />
            <span>Non-Comedogenic &amp; Fragrance Free</span>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-neutral-200 p-4 space-y-4">
          <div>
            <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">
              Filter by Skin Type
            </div>
            <div className="grid grid-cols-2 gap-2">
              {SKIN_TYPES.map((type) => (
                <button
                  key={type.id}
                  onClick={() => {
                    setSelectedSkinType(type.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`p-2.5 rounded-lg text-left text-xs font-semibold border ${
                    selectedSkinType === type.id
                      ? "border-rose-500 bg-rose-50 text-rose-700"
                      : "border-neutral-200 bg-neutral-50 text-neutral-800"
                  }`}
                >
                  {type.name}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => {
              setIsQuizOpen(true);
              setMobileMenuOpen(false);
            }}
            className="w-full py-2.5 px-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-lg text-xs font-bold flex items-center justify-between cursor-pointer"
          >
            <span>Take Face Cream Match Quiz</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </header>
  );
}
