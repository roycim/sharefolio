// components/ui/portfolio-card.js
"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Globe2, Lock, User, ArrowRight } from "lucide-react";

export default function PortfolioCard({ portfolio, user, isSubscribed = false, onUnsubscribe }) {
  const isOwner = portfolio.creator === user?.id;
  const creatorEmail = portfolio.creatorUser?.email || "Unknown";

  let subLineText, subLineIcon;
  if (isOwner) {
    if (portfolio.visibility === "public") {
      subLineText = "Public";
      subLineIcon = <Globe2 className="h-5 w-5 mr-1" />;
    } else {
      subLineText = "Private";
      subLineIcon = <Lock className="h-5 w-5 mr-1" />;
    }
  } else {
    subLineText = creatorEmail;
    subLineIcon = <User className="h-5 w-5 mr-1" />;
  }

  return (
    <div className="relative grid grid-cols-[12rem,1fr] h-48 border border-gray-300 bg-white text-gray-900 rounded-lg p-4 overflow-hidden transition-colors hover:bg-gray-100">
      <div className="w-48 h-48 rounded-md overflow-hidden flex-shrink-0 bg-gray-200 mr-4">
        {portfolio.displaypicture ? (
          <img
            src={portfolio.displaypicture}
            alt="Portfolio"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            <span className="text-sm text-gray-500">No image</span>
          </div>
        )}
      </div>
      <div className="flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-2xl font-semibold">{portfolio.name}</h3>
            <div className="flex items-center text-lg text-gray-600 mt-1">
              {subLineIcon}
              <span>{subLineText}</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {isSubscribed && !isOwner && (
              <Button variant="outline" size="sm" onClick={() => onUnsubscribe?.(portfolio)}>
                Unsubscribe
              </Button>
            )}
            <Link href={`/portfolio/${portfolio.id}`}>
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 flex items-center gap-2"
              >
                <span>Open</span>
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
        <p className="mt-3 text-base text-gray-700 max-w-prose line-clamp-3">
          {portfolio.description || "No description provided."}
        </p>
      </div>
    </div>
  );
}
