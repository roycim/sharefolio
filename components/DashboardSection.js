// components/DashboardSection.js
"use client";

import React from "react";
import Sidebar from "./Sidebar";
import WidgetContainer from "./WidgetContainer";
import PositionsTable from "./PositionsTable";
import SocialFeed from "./SocialFeed";

export default function DashboardSection({ activeTab, onTabChange }) {
  return (
    <div className="bg-card rounded-xl border border-border flex min-h-[calc(100vh-22rem)] overflow-hidden">
      {/* Sidebar */}
      <div className="w-[320px] border-r border-border bg-muted">
        <Sidebar activeTab={activeTab} onTabChange={onTabChange} />
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
            <div className="text-center text-muted-foreground py-12">
              Charts coming soon
            </div>
          </WidgetContainer>
        )}
        {activeTab === "trades" && (
          <WidgetContainer title="Trade History">
            <div className="text-center text-muted-foreground py-12">
              Trade history coming soon
            </div>
          </WidgetContainer>
        )}
        {activeTab === "community" && (
          <WidgetContainer title="Community Discussions">
            <div className="text-center text-muted-foreground py-12">
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
