import React, { useState } from 'react';
import PortfolioHeader from './PortfolioHeader';
import PortfolioTable from './PortfolioTable';

export default function DashboardContent() {
  const [activeTab, setActiveTab] = useState('positions');

  return (
    <div className="flex h-full">
      <div className="flex-1 p-6">
        <div className="mb-6">
          <PortfolioHeader />
        </div>
        
        <div className="rounded-lg bg-dark-50 border border-white/[0.06] overflow-hidden">
          {/* Tab Content Header */}
          <div className="px-6 py-4 border-b border-white/[0.06] bg-dark-100/50 flex justify-between items-center">
            <h2 className="text-lg font-medium text-white">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </h2>
            <button className="px-5 py-2 rounded-lg bg-accent hover:bg-accent-light text-white font-medium transition-all duration-200">
              Unlock for $14.99/month
            </button>
          </div>
          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'positions' && <PortfolioTable />}
            {/* Future tab contents can be added here */}
          </div>
        </div>
      </div>
    </div>
  );
}
