"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import TrustBadges from "@/components/TrustBadges";
import ReviewsSection from "@/components/ReviewsSection";
import CartDrawer from "@/components/CartDrawer";
import SkinQuizModal from "@/components/SkinQuizModal";
import AuthModal from "@/components/AuthModal";
import Footer from "@/components/Footer";
import { PRODUCTS } from "@/data/products";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedSkinType, setSelectedSkinType] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const scrollToCatalog = () => {
    const el = document.getElementById("products-catalog");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleResetFilters = () => {
    setSelectedCategory("All");
    setSelectedSkinType("All");
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header & Navigation */}
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedSkinType={selectedSkinType}
        setSelectedSkinType={setSelectedSkinType}
      />

      <main className="flex-1 bg-[#F7F5F0]">
        {/* Minimal Hero */}
        <Hero onExploreClick={scrollToCatalog} />

        {/* Minimal Product Catalog Section (Mobile 2-column) */}
        <ProductGrid
          products={PRODUCTS}
          selectedCategory={selectedCategory}
          selectedSkinType={selectedSkinType}
          searchQuery={searchQuery}
          onResetFilters={handleResetFilters}
        />

        {/* Clean Trust Strip */}
        <TrustBadges />

        {/* Client Reviews */}
        <ReviewsSection />
      </main>

      {/* Clean Footer */}
      <Footer />

      {/* Global Modals & Drawers */}
      <CartDrawer />
      <SkinQuizModal />
      <AuthModal />
    </div>
  );
}
