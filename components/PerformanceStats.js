// components/finalPortfolio/PerformanceStats.js
"use client";

import React from "react";
import PerformanceStat from "./PerformanceStat";

export default function PerformanceStats({ stats }) {
  return (
    <div className="grid grid-cols-4 gap-3 w-full">
      {stats.map((stat) => (
        <PerformanceStat key={stat.label} stat={stat} />
      ))}
    </div>
  );
}
