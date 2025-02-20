// components/finalPortfolio/CTAFeature.js
"use client";

import React from "react";
import { CheckIcon } from "@heroicons/react/24/solid";

export default function CTAFeature({ feature }) {
  return (
    <div className="flex items-center text-white/80">
      <CheckIcon className="h-4 w-4 mr-2 text-accent" />
      <span className="text-xs">{feature}</span>
    </div>
  );
}
