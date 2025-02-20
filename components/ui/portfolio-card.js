"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Globe2, Lock, User, ArrowRight } from "lucide-react";

/**
 * PortfolioCard
 *
 * Enforces a 12rem × 12rem (192px) image on the left, 
 * with all text and buttons on the right, in a strict 192px-tall card.
 *
 * Props:
 * - portfolio: { id, name, description, displaypicture, creatorUser, visibility, creator, ... }
 * - user: current user object
 * - isSubscribed: boolean (if it's in "Subscribed" section)
 * - onUnsubscribe: callback if user can unsubscribe
 */
export default function PortfolioCard({
  portfolio,
  user,
  isSubscribed = false,
  onUnsubscribe,
}) {
  const isOwner = portfolio.creator === user?.id;
  const creatorEmail = portfolio.creatorUser?.email || "Unknown";

  // Sub-line logic
  // Owner => "Public" or "Private" with appropriate icon
  // Else => show the creator’s email with a user icon
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
    <div
      className="
        relative
        grid
        grid-cols-[12rem,1fr]
        h-48
        border
        border-border
        bg-background
        text-foreground
        rounded-lg
        p-4
        overflow-hidden
        transition-colors
        hover:bg-muted/20
      "
    >
      {/* Left: Strict 12rem x 12rem image */}
      <div className="relative w-full h-full rounded-md overflow-hidden bg-black/10">
        {portfolio.displaypicture ? (
          <img
            src={portfolio.displaypicture}
            alt="Portfolio"
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            <span className="text-sm text-muted-foreground">No image</span>
          </div>
        )}
      </div>

      {/* Right: Title, sub-line, description, top-right buttons */}
      <div className="flex flex-col ml-4">
        {/* Top row: Title & Buttons */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-3xl font-semibold">{portfolio.name}</h3>
            <div className="flex items-center text-lg text-muted-foreground mt-1">
              {subLineIcon}
              <span>{subLineText}</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {/* If user is subscribed & not owner => Unsubscribe */}
            {isSubscribed && !isOwner && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onUnsubscribe?.(portfolio)}
              >
                Unsubscribe
              </Button>
            )}
            {/* "Open" Button */}
            <Link href={`/portfolio/${portfolio.id}`}>
              <Button
                size="lg"
                className="
                  bg-blue-600 
                  hover:bg-blue-700 
                  text-white 
                  font-bold 
                  px-6 
                  py-3 
                  flex 
                  items-center 
                  gap-2
                "
              >
                <span>Open</span>
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Description */}
        <p className="mt-3 text-base text-muted-foreground line-clamp-3 max-w-[90%]">
          {portfolio.description || "No description provided."}
        </p>
      </div>
    </div>
  );
}
