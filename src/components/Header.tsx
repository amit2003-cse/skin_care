"use client";

import React, { useState } from "react";
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Sparkles,
  X,
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
  const {
    totalItemCount,
    setIsCartOpen,
    setIsAuthOpen,
    setIsQuizOpen,
    wishlist,
    user,
    logoutUser,
  } = useCart();

  const [searchOpen, setSearchOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-100">
      {/* Minimal Announcement Bar */}
      <div className="bg-[#171717] text-white text-[11px] py-2 px-4 text-center font-normal tracking-wider flex items-center justify-center gap-2">
        <span>COMPLIMENTARY SHIPPING OVER ₹499</span>
        <span className="text-neutral-500">•</span>
        <span className="font-mono text-neutral-300">CODE: FIRST20</span>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          {/* Brand Logo */}
          <button
            onClick={() => {
              setSelectedCategory("All");
              setSelectedSkinType("All");
              setSearchQuery("");
            }}
            className="text-left cursor-pointer group"
          >
            <span className="text-xl sm:text-2xl font-bold tracking-[0.2em] text-neutral-900 group-hover:opacity-80 transition-opacity">
              INNOVIST
            </span>
            <span className="block text-[8px] uppercase tracking-[0.25em] text-neutral-400 font-medium">
              Clinical Face Creams
            </span>
          </button>

          {/* Desktop Search Bar */}
          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by ingredient (Ceramides, Retinol, Salicylic)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs bg-neutral-100/70 border border-transparent rounded-full focus:bg-white focus:border-neutral-300 focus:outline-hidden transition-all placeholder:text-neutral-400"
              />
              <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-2.5" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-2 text-[10px] text-neutral-400 hover:text-neutral-700 bg-neutral-200 rounded-full w-4 h-4 flex items-center justify-center cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Mobile Search Toggle */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="md:hidden p-2 text-neutral-600 hover:text-neutral-900 cursor-pointer"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Quiz Button */}
            <button
              onClick={() => setIsQuizOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span className="hidden sm:inline">Cream Quiz</span>
            </button>

            {/* Wishlist */}
            <button
              onClick={() => {
                alert(
                  wishlist.length > 0
                    ? `You have ${wishlist.length} item(s) in your wishlist!`
                    : "Wishlist is empty. Tap the heart on products to save them!"
                );
              }}
              className="relative p-2 text-neutral-600 hover:text-neutral-900 rounded-full hover:bg-neutral-100 transition-colors cursor-pointer"
              aria-label="Wishlist"
            >
              <Heart className="w-4 h-4" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 bg-neutral-900 text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* User Account / Google Login */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-1.5 p-1 pl-2 pr-2.5 bg-neutral-100 hover:bg-neutral-200 rounded-full transition-colors cursor-pointer text-xs font-medium text-neutral-800"
                >
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={user.name}
                      className="w-5 h-5 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-neutral-900 text-white flex items-center justify-center text-[10px] font-bold">
                      {user.name.charAt(0)}
                    </div>
                  )}
                  <span className="hidden sm:inline max-w-20 truncate">{user.name}</span>
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border border-neutral-100 py-1.5 z-50 text-xs">
                    <div className="px-3 py-1.5 border-b border-neutral-100">
                      <div className="font-semibold text-neutral-900 truncate">
                        {user.name}
                      </div>
                      <div className="text-[10px] text-neutral-400 truncate">
                        {user.email}
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        logoutUser();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-1.5 text-rose-600 hover:bg-rose-50 font-medium cursor-pointer"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setIsAuthOpen(true)}
                className="p-2 text-neutral-600 hover:text-neutral-900 rounded-full hover:bg-neutral-100 transition-colors cursor-pointer"
                aria-label="Account"
              >
                <User className="w-4 h-4" />
              </button>
            )}

            {/* Shopping Bag Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-neutral-900 hover:bg-neutral-100 rounded-full transition-colors cursor-pointer ml-1"
              aria-label="Bag"
            >
              <ShoppingBag className="w-4 h-4" />
              {totalItemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-neutral-900 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Input Drawer (Collapsible) */}
        {searchOpen && (
          <div className="md:hidden pb-3 pt-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search face creams..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2 text-xs bg-neutral-100 rounded-full focus:bg-white focus:outline-hidden"
                autoFocus
              />
              <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-2.5" />
              <button
                onClick={() => setSearchOpen(false)}
                className="absolute right-2.5 top-2 text-neutral-400 p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Minimal Category & Skin Type Filter Row */}
        <div className="flex items-center justify-between gap-3 overflow-x-auto py-2.5 no-scrollbar border-t border-neutral-100 text-xs">
          {/* Category Pills */}
          <div className="flex items-center gap-1.5 shrink-0">
            {CREAM_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat.id
                    ? "bg-neutral-900 text-white"
                    : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Skin Type selector */}
          <div className="hidden lg:flex items-center gap-1.5 shrink-0 pl-4 border-l border-neutral-200">
            <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold">
              Skin:
            </span>
            {SKIN_TYPES.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedSkinType(type.id)}
                className={`text-[11px] px-2 py-0.5 rounded font-medium cursor-pointer transition-colors ${
                  selectedSkinType === type.id
                    ? "text-neutral-900 font-bold underline underline-offset-4"
                    : "text-neutral-400 hover:text-neutral-700"
                }`}
              >
                {type.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
