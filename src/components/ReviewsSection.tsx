import React from "react";
import { Star } from "lucide-react";

export default function ReviewsSection() {
  const reviews = [
    {
      name: "Dr. Kritika M.",
      city: "Dermatologist, Delhi",
      product: "Ceramide Barrier Cream",
      review:
        "Formulated with all 5 essential skin ceramides with zero drying fragrances. Calms peeling, reactive skin within days without clogging pores.",
    },
    {
      name: "Tanvi K.",
      city: "Mumbai",
      product: "Oil-Free Hydro Gel",
      review:
        "The ideal cream for Indian humidity. The 1% salicylic acid keeps my T-zone shine-free and clear all day.",
    },
    {
      name: "Sneha R.",
      city: "Bengaluru",
      product: "0.1% Retinol Night Cream",
      review:
        "The velvet night soufflé texture is lightweight and never stings. My forehead texture and fine lines look smoother every morning.",
    },
  ];

  return (
    <section className="bg-white py-12 sm:py-16 border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-neutral-400">
            Clinical Feedback
          </span>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 mt-1">
            Real Barrier Results
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, i) => (
            <div
              key={i}
              className="bg-[#FAF9F5] rounded-2xl p-6 border border-neutral-100 flex flex-col justify-between"
            >
              <div>
                <div className="flex text-amber-500 mb-3 gap-0.5">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-normal mb-6">
                  &ldquo;{rev.review}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-200/50 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-semibold text-neutral-900">{rev.name}</h4>
                  <div className="text-[11px] text-neutral-400">{rev.city}</div>
                </div>
                <span className="text-[10px] font-medium text-neutral-500 bg-white px-2 py-0.5 rounded-full border border-neutral-200/60">
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
