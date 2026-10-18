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
  const [loaded, setLoaded] = useState(false);

  if (hasError) {
    return (
      <div className="w-full h-full bg-[#F4F3EE] flex flex-col items-center justify-center text-neutral-400 p-4 text-center select-none">
        <div className="w-12 h-12 rounded-full bg-white shadow-xs flex items-center justify-center text-neutral-500 mb-2">
          <Sparkles className="w-5 h-5 text-neutral-400" />
        </div>
        <span className="text-[11px] font-medium tracking-wide uppercase text-neutral-500 line-clamp-1">
          {alt}
        </span>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#F7F6F2]">
      {!loaded && (
        <div className="absolute inset-0 bg-neutral-100 animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => setHasError(true)}
        className={`${className} transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
