// components/finalPortfolio/ProfilePanel.js
"use client";

import React from "react";

export default function ProfilePanel() {
  return (
    <div className="bg-dark-50 rounded-xl border border-white/[0.06] overflow-hidden">
      {/* Back Button */}
      <div className="p-4 border-b border-white/[0.06]">
        <button
          className="
            w-full px-4 py-3 rounded-lg
            bg-white/[0.02] hover:bg-white/[0.04]
            flex items-center justify-center
            transition-all duration-200 group
          "
        >
          <span className="text-white/60 group-hover:text-white font-medium">
            ← Back to Explore
          </span>
        </button>
      </div>
      {/* Creator Profile */}
      <div className="p-6 flex flex-col items-center text-center">
        <div className="relative w-32 h-32 mb-4">
          <img
            src="/cryptobg.png"
            alt="CryptoBg"
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        <h3 className="text-lg font-medium text-white mb-3">CryptoBg</h3>
        <div className="flex space-x-2">
          {["Instagram", "X", "YouTube"].map((platform) => (
            <a
              key={platform}
              href="#"
              className="
                px-3 py-1.5 rounded-lg text-sm
                text-white/60 hover:text-white
                bg-white/[0.02] hover:bg-white/[0.04]
                transition-all duration-200
              "
            >
              {platform}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
