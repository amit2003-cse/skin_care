import React from "react";
import { ShieldCheck, Sparkles, HeartHandshake, Leaf, Truck } from "lucide-react";

export default function TrustBadges() {
  const perks = [
    {
      icon: ShieldCheck,
      title: "Dermatologist Tested",
      desc: "Proven safety on all Indian skin & hair types",
    },
    {
      icon: Leaf,
      title: "Clean & Toxin Free",
      desc: "Zero Parabens, Sulphates, and Mineral oils",
    },
    {
      icon: Sparkles,
      title: "Clinical Actives",
      desc: "Standardized active potencies for visible change",
    },
    {
      icon: Truck,
      title: "Free Express Shipping",
      desc: "On orders above ₹499 across all India pin codes",
    },
  ];

  return (
    <div className="bg-neutral-900 text-white py-12 border-y border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {perks.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div key={idx} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-neutral-800 text-rose-400 flex items-center justify-center shrink-0 border border-neutral-700">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white tracking-wide">
                    {p.title}
                  </h4>
                  <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
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
