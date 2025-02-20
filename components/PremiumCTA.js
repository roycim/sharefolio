// components/finalPortfolio/PremiumCTA.js
"use client";

import React from "react";
import { LockOpenIcon } from "@heroicons/react/24/solid";
import CTAFeature from "./CTAFeature";

export default function PremiumCTA({ ctaFeatures }) {
  return (
    <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5 flex flex-col justify-between min-h-[240px]">
      <div className="flex flex-col space-y-3">
        <div className="flex items-center">
          <LockOpenIcon className="h-5 w-5 mr-2 text-accent" />
          <h3 className="text-xl font-semibold text-white">Unlock Premium</h3>
        </div>
        <div>
          <p className="text-xl font-bold text-white">
            $14.99<span className="text-sm text-white/60 ml-2">/ month</span>
          </p>
        </div>
        <div className="space-y-2">
          {ctaFeatures.map((feature) => (
            <CTAFeature key={feature} feature={feature} />
          ))}
        </div>
      </div>
      <button
        className="w-full mt-4 px-4 py-2 rounded-lg bg-accent hover:bg-accent-light text-white font-medium transition-all duration-200"
      >
        Unlock Now
      </button>
    </div>
  );
}
