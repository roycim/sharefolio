// components/finalPortfolio/PerformanceStat.js
"use client";

import React from "react";

export default function PerformanceStat({ stat }) {
  return (
    <div className="flex-1 px-4 py-3 bg-white/[0.02] border border-white/[0.06] rounded-lg text-center transition-all duration-200 hover:bg-black/[0.04]">
      <p className={`${stat.color} font-bold text-sm mb-0.5`}>
        {stat.value}
      </p>
      <p className="text-xs text-white/50 uppercase tracking-wider">
        {stat.label}
      </p>
    </div>
  );
}
