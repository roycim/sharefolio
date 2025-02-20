import { CheckIcon, LockOpenIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'

// ------------------------------------
// Main component: TopSection
// ------------------------------------
export default function TopSection() {
  // Example data arrays (could be passed in as props if desired)
  const stats = [
    { label: 'Daily', value: '+3.123%', color: 'text-green-400' },
    { label: 'Weekly', value: '+12.5%', color: 'text-green-400' },
    { label: 'Monthly', value: '+35.7%', color: 'text-green-400' },
    { label: 'Yearly', value: '+128.3%', color: 'text-green-400' }
  ]

  const ctaFeatures = [
    'Advanced Portfolio Analytics',
    'Real-time Market Insights',
    'Personalized Investment Recommendations'
  ]

  return (
    <div className="grid grid-cols-[320px_1fr] gap-6">
      {/* Left: Back button + Creator info */}
      <ProfilePanel />

      {/* Right: Portfolio overview + CTA */}
      <PortfolioOverview stats={stats} ctaFeatures={ctaFeatures} />
    </div>
  )
}

// ------------------------------------
// Subcomponent: Left Panel
// ------------------------------------
function ProfilePanel() {
  return (
    <div className="bg-dark-50 rounded-xl border border-white/[0.06] overflow-hidden">
      {/* Back Button */}
      <div className="p-4 border-b border-white/[0.06]">
        <button
          className="
            w-full px-4 py-3
            rounded-lg
            bg-white/[0.02] hover:bg-white/[0.04]
            flex items-center
            justify-center
            transition-all
            duration-200
            group
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
    {['Instagram', 'X', 'YouTube'].map((platform) => (
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
  )
}

// ------------------------------------
// Subcomponent: Right Panel
// ------------------------------------
function PortfolioOverview({ stats, ctaFeatures }) {
  return (
    <div
      className="
        bg-dark-50
        rounded-xl
        border border-white/[0.06]
        p-6
        flex flex-col
        justify-between

      "
    >
      {/* Top: Portfolio + Stats */}
      <div className="grid grid-cols-[minmax(0,1fr)_320px] gap-6 items-stretch">
        <div className="flex flex-col space-y-6">
          <PortfolioHeader />
          <PerformanceStats stats={stats} />
        </div>

        <PremiumCTA ctaFeatures={ctaFeatures} />
      </div>
    </div>
  )
}

// ------------------------------------
// Subcomponent: Portfolio Header (image + title/description)
// ------------------------------------
function PortfolioHeader() {
  return (
    <div className="grid grid-cols-[auto_1fr] gap-6 items-start">
      {/* Profile Picture */}
      <div className="relative w-40 h-40">
        <Image
          src="/wesh.png"
          alt="Portfolio"
          layout="fill"
          className="rounded-lg object-cover ring-2 ring-white/[0.06]"
        />
      </div>

      {/* Title + Description */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Alpha Portfolio</h1>
        <p className="text-white/60 text-base leading-relaxed">
          A sophisticated, data-driven investment strategy leveraging
          advanced quantitative analysis and machine learning algorithms
          to optimize cryptocurrency portfolio performance.
        </p>
      </div>
    </div>
  )
}

// ------------------------------------
// Subcomponent: Performance Stats
// ------------------------------------
function PerformanceStats({ stats }) {
  return (
    <div className="grid grid-cols-4 gap-3 w-full">
      {stats.map((stat) => (
        <PerformanceStat key={stat.label} stat={stat} />
      ))}
    </div>
  )
}

// A single stat card
function PerformanceStat({ stat }) {
  return (
    <div
      className="
        flex-1
        px-4
        py-3
        bg-white/[0.02]
        border border-white/[0.06]
        rounded-lg
        text-center
        transition-all
        duration-200
        hover:bg-black/[0.04]
      "
    >
      <p className={`${stat.color} font-bold text-sm mb-0.5`}>
        {stat.value}
      </p>
      <p className="text-xs text-white/50 uppercase tracking-wider">
        {stat.label}
      </p>
    </div>
  )
}

// ------------------------------------
// Subcomponent: Premium CTA box
// ------------------------------------
function PremiumCTA({ ctaFeatures }) {
  return (
    <div
      className="
        bg-white/[0.02]
        border border-white/[0.06]
        rounded-xl
        p-5
        flex
        flex-col
        justify-between
        min-h-[240px]
      "
    >
      <div className="flex flex-col space-y-3">
        <div className="flex items-center">
          <LockOpenIcon className="h-5 w-5 mr-2 text-accent" />
          <h3 className="text-xl font-semibold text-white">Unlock Premium</h3>
        </div>

        <div>
          <p className="text-xl font-bold text-white">
            $14.99
            <span className="text-sm text-white/60 ml-2">/ month</span>
          </p>
        </div>

        <div className="space-y-2">
          {ctaFeatures.map((feature) => (
            <CTAFeature key={feature} feature={feature} />
          ))}
        </div>
      </div>

      <button
        className="
          w-full
          mt-4
          px-4
          py-2
          rounded-lg
          bg-accent-blue1
          hover:bg-accent-blue1
          text-white
          font-medium
          transition-all
          duration-200
        "
      >
        Unlock Now
      </button>
    </div>
  )
}

// A single bullet in the CTA list
function CTAFeature({ feature }) {
  return (
    <div className="flex items-center text-white/80">
      <CheckIcon className="h-4 w-4 mr-2 text-accent" />
      <span className="text-xs">{feature}</span>
    </div>
  )
}
