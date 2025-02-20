// components/finalPortfolio/PortfolioOverview.js
"use client";

import React from "react";
import PortfolioHeader from "./PortfolioHeader";
import PerformanceStats from "./PerformanceStats";
import PremiumCTA from "./PremiumCTA";

export default function PortfolioOverview({ stats, ctaFeatures }) {
  return (
    <div className="bg-dark-50 rounded-xl border border-white/[0.06] p-6 flex flex-col justify-between">
      <div className="grid grid-cols-[minmax(0,1fr)_320px] gap-6 items-stretch">
        <div className="flex flex-col space-y-6">
          <PortfolioHeader />
          <PerformanceStats stats={stats} />
        </div>
        <PremiumCTA ctaFeatures={ctaFeatures} />
      </div>
    </div>
  );
}
