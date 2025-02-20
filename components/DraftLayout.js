// components/DraftLayout.js
import React, { useContext, useState } from 'react'
import { ThemeContext } from '../context/ThemeContext'
import Navbar from './Navbar'
import TopSection from './TopSection'
import DashboardSection from './DashboardSection'

export default function DraftLayout({ children }) {
  const { isDarkMode } = useContext(ThemeContext)
  const [activeTab, setActiveTab] = useState('positions')

  return (
    <div
      className={`
        min-h-screen 
        flex dark
        flex-col
        ${isDarkMode 
          ? 'dark:bg-dark-gradient' 
          : 'light:bg-light-gradient'}
      `}
    >
      <Navbar />
      
      {/* Main Content Area */}
      <div className="
        flex-1 
        container 
        mx-auto 
        max-w-[1920px] 
        px-6 
        pt-32
        pb-24 
        space-y-6
      ">
        {/* Top Section with Two Bubbles */}
        <TopSection />
        
        {/* Dashboard Section - Single Unified Bubble */}
        <DashboardSection 
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        {children}
      </div>
    </div>
  )
}
