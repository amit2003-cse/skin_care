import React from "react";
import { Star, CheckCircle, Quote } from "lucide-react";

export default function ReviewsSection() {
  const reviews = [
    {
      name: "Dr. Kritika Mehra",
      city: "Delhi",
      product: "Ceramide Deep Barrier Restorative Cream",
      rating: 5,
      review:
        "As a dermatologist, I love that this contains all 5 essential skin ceramides with zero drying fragrances. It calmed my patient's peeling steroid-damaged skin in less than a week without clogging pores.",
      verified: true,
    },
    {
      name: "Tanvi Kapoor",
      city: "Mumbai",
      product: "Oil-Free Hydro Gel Cream",
      rating: 5,
      review:
        "Finally a face cream that doesn't make Mumbai humidity turn my T-zone into an oil slick! The 1% salicylic acid kept my chin breakouts completely clear all month.",
      verified: true,
    },
    {
      name: "Sneha Reddy",
      city: "Hyderabad",
      product: "0.1% Retinol & Multi-Peptide Night Cream",
      rating: 5,
      review:
        "The night soufflé texture is divine. It doesn't flake or sting like standard retinols. My smile lines and forehead texture look visibly plumped every morning.",
      verified: true,
    },
  ];

  return (
    <section className="bg-neutral-50 py-16 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 bg-rose-50 border border-rose-200 px-3 py-1 rounded-full text-xs font-bold text-rose-700 mb-3">
            <Star className="w-3.5 h-3.5 fill-rose-500 stroke-rose-500" />
            <span>Over 500,000+ Jars Shipped</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
            Loved By Dermatologists &amp; Skincare Enthusiasts
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 mt-2">
            Clinical face cream reviews tested on Indian skin barriers and climates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl p-6 sm:p-7 shadow-xs border border-neutral-200/80 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-neutral-200" />
                </div>

                <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-normal mb-6">
                  &ldquo;{rev.review}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-neutral-900 flex items-center gap-1.5">
                    <span>{rev.name}</span>
                    {rev.verified && (
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    )}
                  </h4>
                  <div className="text-[11px] text-neutral-400">
                    Verified Buyer, {rev.city}
                  </div>
                </div>
                <span className="text-[10px] font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md truncate max-w-36">
                  {rev.product}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
