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
  ChevronRight,
  ShieldCheck,
  Truck,
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

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-100">
        {/* Main Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-3">
            {/* Left: Mobile Hamburger Button */}
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden p-2 -ml-2 text-neutral-800 hover:text-neutral-950 cursor-pointer"
                aria-label="Open navigation menu"
              >
                <Menu className="w-5 h-5" />
              </button>

              {/* Brand Logo (Always 1 line) */}
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSelectedSkinType("All");
                  setSearchQuery("");
                }}
                className="text-left cursor-pointer group"
              >
                <span className="text-base sm:text-2xl font-black tracking-[0.16em] sm:tracking-[0.18em] text-neutral-950 group-hover:opacity-85 transition-opacity whitespace-nowrap block">
                  THE CREAM CO.
                </span>
                <span className="hidden sm:block text-[8px] uppercase tracking-[0.25em] text-neutral-400 font-bold -mt-0.5">
                  Clinical Face Formulations
                </span>
              </button>
            </div>

            {/* Center: Desktop Search Bar */}
            <div className="flex-1 max-w-md hidden md:block mx-4">
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

            {/* Right: Actions */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Mobile Search Toggle */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="md:hidden p-2 text-neutral-700 hover:text-neutral-900 cursor-pointer"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Desktop Quiz Button */}
              <button
                onClick={() => setIsQuizOpen(true)}
                className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Cream Quiz</span>
              </button>

              {/* Desktop Wishlist */}
              <button
                onClick={() => {
                  alert(
                    wishlist.length > 0
                      ? `You have saved ${wishlist.length} face cream(s) in your wishlist!`
                      : "Your wishlist is empty. Tap the heart on products to save them!"
                  );
                }}
                className="hidden sm:flex relative p-2 text-neutral-600 hover:text-neutral-900 rounded-full hover:bg-neutral-100 transition-colors cursor-pointer"
                aria-label="Wishlist"
              >
                <Heart className="w-4 h-4" />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 bg-neutral-900 text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Desktop User Account / Google Login */}
              {user ? (
                <div className="hidden sm:block relative">
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
                    <span className="hidden lg:inline max-w-20 truncate">{user.name}</span>
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
                  className="hidden sm:flex p-2 text-neutral-600 hover:text-neutral-900 rounded-full hover:bg-neutral-100 transition-colors cursor-pointer"
                  aria-label="Account"
                >
                  <User className="w-4 h-4" />
                </button>
              )}

              {/* Shopping Bag Button (Always visible) */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-neutral-900 hover:bg-neutral-100 rounded-full transition-colors cursor-pointer"
                aria-label="Shopping Bag"
              >
                <ShoppingBag className="w-5 h-5 sm:w-4 sm:h-4" />
                {totalItemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-neutral-900 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {totalItemCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Search Expandable Bar */}
          {searchOpen && (
            <div className="md:hidden pb-3 pt-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search ceramides, retinol, water gels..."
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

          {/* Desktop Subnav Filter Pills (Hidden on Mobile, handled via Hamburger) */}
          <div className="hidden md:flex items-center justify-between gap-3 overflow-x-auto py-2.5 no-scrollbar border-t border-neutral-100 text-xs">
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

            <div className="flex items-center gap-1.5 shrink-0 pl-4 border-l border-neutral-200">
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

      {/* Mobile Hamburger Slide-out Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden md:hidden">
          {/* Backdrop */}
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="absolute inset-0 bg-neutral-950/60 backdrop-blur-xs transition-opacity duration-300"
          />

          {/* Drawer Content */}
          <div className="absolute inset-y-0 left-0 max-w-[85%] w-80 bg-white shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-300">
            {/* Drawer Header */}
            <div className="p-5 border-b border-neutral-100 flex items-center justify-between">
              <div>
                <span className="text-lg font-black tracking-[0.16em] text-neutral-950 block">
                  THE CREAM CO.
                </span>
                <span className="text-[9px] uppercase tracking-[0.2em] text-neutral-400 font-bold">
                  Clinical Face Care
                </span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 -mr-2 text-neutral-400 hover:text-neutral-900 rounded-full cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              {/* Quiz Banner */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsQuizOpen(true);
                }}
                className="w-full p-3.5 bg-neutral-900 text-white rounded-2xl text-left flex items-center justify-between cursor-pointer shadow-xs"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-amber-400">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold">Cream Advisor Quiz</div>
                    <div className="text-[10px] text-neutral-400">Find your ideal match</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-neutral-400" />
              </button>

              {/* Collections / Categories */}
              <div>
                <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-2.5">
                  Collections
                </div>
                <div className="space-y-1">
                  {CREAM_CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategory(cat.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full px-3 py-2.5 rounded-xl text-left text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                        selectedCategory === cat.id
                          ? "bg-neutral-100 text-neutral-950 font-bold"
                          : "text-neutral-600 hover:bg-neutral-50"
                      }`}
                    >
                      <span>{cat.name}</span>
                      {selectedCategory === cat.id && (
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-900" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Skin Types */}
              <div>
                <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-2.5">
                  Filter by Skin Type
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {SKIN_TYPES.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => {
                        setSelectedSkinType(type.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-all ${
                        selectedSkinType === type.id
                          ? "bg-neutral-900 text-white font-bold"
                          : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                      }`}
                    >
                      {type.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Account & Wishlist */}
              <div className="pt-4 border-t border-neutral-100 space-y-2">
                {user ? (
                  <div className="p-3 bg-neutral-50 rounded-2xl flex items-center justify-between">
                    <div className="flex items-center gap-2.5 min-w-0">
                      {user.image ? (
                        <img
                          src={user.image}
                          alt={user.name}
                          className="w-8 h-8 rounded-full object-cover shrink-0"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-neutral-900 text-white flex items-center justify-center text-xs font-bold shrink-0">
                          {user.name.charAt(0)}
                        </div>
                      )}
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-neutral-900 truncate">
                          {user.name}
                        </div>
                        <div className="text-[10px] text-neutral-400 truncate">
                          {user.email}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        logoutUser();
                        setMobileMenuOpen(false);
                      }}
                      className="text-xs font-semibold text-rose-600 pl-2 shrink-0 cursor-pointer"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setIsAuthOpen(true);
                    }}
                    className="w-full py-3 px-4 rounded-xl border border-neutral-200 text-xs font-bold text-neutral-900 flex items-center justify-center gap-2 hover:bg-neutral-50 cursor-pointer"
                  >
                    <User className="w-4 h-4" />
                    <span>Sign In with Google</span>
                  </button>
                )}

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    alert(
                      wishlist.length > 0
                        ? `You have saved ${wishlist.length} face cream(s) in your wishlist!`
                        : "Wishlist is empty. Tap the heart on products to save them!"
                    );
                  }}
                  className="w-full py-3 px-4 rounded-xl border border-neutral-200 text-xs font-bold text-neutral-900 flex items-center justify-between hover:bg-neutral-50 cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-neutral-600" />
                    <span>My Wishlist</span>
                  </div>
                  {wishlist.length > 0 && (
                    <span className="bg-neutral-900 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                      {wishlist.length}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Drawer Footer Guarantees */}
            <div className="p-4 bg-neutral-50 border-t border-neutral-100 text-[11px] text-neutral-500 space-y-1">
              <div className="flex items-center gap-2 font-medium">
                <Truck className="w-3.5 h-3.5 text-neutral-700" />
                <span>Free shipping on all orders over ₹499</span>
              </div>
              <div className="flex items-center gap-2 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-neutral-700" />
                <span>100% Non-Comedogenic &amp; Fragrance-Free</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
