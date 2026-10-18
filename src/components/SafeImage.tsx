"use client";

import React, { useState } from "react";
import { Sparkles } from "lucide-react";

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function SafeImage({ src, alt, className = "" }: SafeImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div className="w-full h-full bg-[#EFECE6] flex flex-col items-center justify-center text-neutral-400 p-4 text-center select-none">
        <div className="w-12 h-12 rounded-full bg-white shadow-xs flex items-center justify-center text-neutral-600 mb-2">
          <Sparkles className="w-5 h-5 text-amber-600" />
        </div>
        <span className="text-[11px] font-bold tracking-wider uppercase text-neutral-600 line-clamp-1">
          {alt}
        </span>
        <span className="text-[9px] uppercase tracking-widest text-neutral-400 mt-0.5">
          The Cream Co.
        </span>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#EFECE6]">
      <img
        src={src}
        alt={alt}
        onError={() => setHasError(true)}
        className={`${className} block`}
      />
    </div>
  );
}
