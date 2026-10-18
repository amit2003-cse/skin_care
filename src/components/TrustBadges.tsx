import React from "react";
import { ShieldCheck, Leaf, Sparkles, Truck } from "lucide-react";

export default function TrustBadges() {
  const perks = [
    {
      icon: ShieldCheck,
      title: "Dermatologist Tested",
      desc: "Safe for sensitive skin barriers",
    },
    {
      icon: Leaf,
      title: "Clean Formulations",
      desc: "Zero parabens or harsh fragrances",
    },
    {
      icon: Sparkles,
      title: "Standardized Actives",
      desc: "Verified clinical potencies",
    },
    {
      icon: Truck,
      title: "Complimentary Delivery",
      desc: "On orders above ₹499 in India",
    },
  ];

  return (
    <div className="bg-[#FAF9F5] border-y border-neutral-100 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {perks.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div key={idx} className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3">
                <div className="w-9 h-9 rounded-full bg-white shadow-xs text-neutral-800 flex items-center justify-center shrink-0 border border-neutral-100">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-neutral-900 tracking-wide">
                    {p.title}
                  </h4>
                  <p className="text-[11px] text-neutral-500 mt-0.5 leading-snug">
                    {p.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
