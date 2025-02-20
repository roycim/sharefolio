// components/DashboardSection.js
"use client";

import React from "react";
import Sidebar from "./Sidebar"; // Changed from AppSidebar
import WidgetContainer from "./WidgetContainer";
import PositionsTable from "./PositionsTable"; // Removed unnecessary ../
import SocialFeed from "./SocialFeed"; // Removed unnecessary ../

export default function DashboardSection({ activeTab, onTabChange }) {
  return (
    <div className="bg-dark-50 rounded-xl border border-white/[0.06] flex min-h-[calc(100vh-22rem)]">
      {/* Sidebar */}
      <div className="w-[320px] border-r border-white/[0.06] bg-white/[0.02]">
        <Sidebar activeTab={activeTab} onTabChange={onTabChange} /> {/* Changed from AppSidebar to Sidebar */}
      </div>
      
      {/* Main content area */}
      <div className="flex-1 p-6">
        {activeTab === "positions" && (
          <WidgetContainer title="Positions">
            <PositionsTable />
          </WidgetContainer>
        )}
        {activeTab === "charts" && (
          <WidgetContainer title="Performance Charts">
            <div className="text-center text-white/60 py-12">
              Charts coming soon
            </div>
          </WidgetContainer>
        )}
        {activeTab === "trades" && (
          <WidgetContainer title="Trade History">
            <div className="text-center text-white/60 py-12">
              Trade history coming soon
            </div>
          </WidgetContainer>
        )}
        {activeTab === "community" && (
          <WidgetContainer title="Community Discussions">
            <div className="text-center text-white/60 py-12">
              Community discussions coming soon
            </div>
          </WidgetContainer>
        )}
        {activeTab === "social" && (
          <WidgetContainer title="Social Feed">
            <SocialFeed />
          </WidgetContainer>
        )}
      </div>
    </div>
  );
}
