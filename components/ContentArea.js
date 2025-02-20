import { useState } from 'react'
import PositionsTable from './PositionsTable'
import TradesTable from './TradesTable'
import CommunityFeed from './CommunityFeed'
import SocialFeed from './SocialFeed'
import PerformanceCharts from './PerformanceCharts'

export default function ContentArea({ activeTab }) {
  const renderContent = () => {
    switch(activeTab) {
      case 'positions':
        return <PositionsTable />
      case 'charts':
        return <PerformanceCharts />
      case 'trades':
        return <TradesTable />
      case 'community':
        return <CommunityFeed />
      case 'social':
        return <SocialFeed />
      default:
        return <PositionsTable />
    }
  }

  return (
    <main className="flex-1 p-6">
      {renderContent()}
    </main>
  )
}
