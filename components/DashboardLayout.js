import React, { useContext, useState } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import Navbar from './Navbar';
import TopSection from './TopSection';
import DashboardSection from './DashboardSection';

export default function DashboardLayout() {
  const { isDarkMode } = useContext(ThemeContext);
  const [activeTab, setActiveTab] = useState('positions');

  return (
    <div
      className={`
        min-h-screen 
        flex 
        flex-col
        ${isDarkMode 
          ? 'dark:bg-dark-gradient' 
          : 'light:bg-light-gradient'}
      `}
    >
      <Navbar />
      <div
        className="
          flex-1
          container
          mx-auto
          max-w-[1920px]
          px-6
          pt-32
          pb-24
          space-y-6
        "
      >
        {/* Top Section with Two Bubbles (includes back button & creator info) */}
        <TopSection />

        {/* Dashboard Section with Sidebar + Main Content */}
        <DashboardSection
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>
    </div>
  );
}
