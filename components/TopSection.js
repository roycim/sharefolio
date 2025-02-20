import { CheckIcon, LockOpenIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';

export default function TopSection() {
  const stats = [
    { label: 'Daily', value: '+3.123%', color: 'text-[#4CAF50]' },
    { label: 'Weekly', value: '+12.5%', color: 'text-[#4CAF50]' },
    { label: 'Monthly', value: '+35.7%', color: 'text-[#4CAF50]' },
    { label: 'Yearly', value: '+128.3%', color: 'text-[#4CAF50]' }
  ];

  const ctaFeatures = [
    'Advanced Portfolio Analytics',
    'Real-time Market Insights',
    'Personalized Investment Recommendations'
  ];

  return (
    <div className="grid grid-cols-[320px_1fr] gap-6">
      <ProfilePanel />
      <PortfolioOverview stats={stats} ctaFeatures={ctaFeatures} />
    </div>
  );
}

function ProfilePanel() {
  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="p-2 border-b border-border">
        <button className="w-full px-4 py-3 rounded-lg bg-muted hover:bg-muted/80 flex items-center justify-center transition-all duration-200 group">
          <span className="text-muted-foreground group-hover:text-foreground font-medium">
            ← Back to Explore
          </span>
        </button>
      </div>
      <div className="p-6 flex flex-col items-center text-center bg-card">
        <div className="relative w-32 h-32 mb-4">
          <img src="/cryptobg.png" alt="CryptoBg" className="w-full h-full rounded-full object-cover" />
        </div>
        <h3 className="text-lg font-medium text-foreground mb-3">CryptoBg</h3>
        <div className="flex space-x-2">
          {['Instagram', 'X', 'YouTube'].map((platform) => (
            <a key={platform} href="#" className="px-3 py-1.5 rounded-lg text-sm text-muted-foreground hover:text-foreground bg-muted hover:bg-muted/80 transition-all duration-200">
              {platform}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function PortfolioOverview({ stats, ctaFeatures }) {
  return (
    <div className="bg-card rounded-xl border border-border p-6 flex flex-col justify-between">
      <div className="grid grid-cols-[minmax(0,1fr)_320px] gap-6 items-stretch">
        <div className="flex flex-col space-y-6">
          <PortfolioHeader />
          <PerformanceStats stats={stats} />
        </div>
        <PremiumCTA ctaFeatures={ctaFeatures} />
      </div>
    </div>
  );
}

function PortfolioHeader() {
  return (
    <div className="grid grid-cols-[auto_1fr] gap-6 items-start">
      <div className="relative w-40 h-40">
        <Image src="/wesh.png" alt="Portfolio" layout="fill" className="rounded-lg object-cover ring-2 ring-border" />
      </div>
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Alpha Portfolio</h1>
        <p className="text-muted-foreground text-base leading-relaxed">
          A sophisticated, data-driven investment strategy leveraging advanced quantitative analysis and machine learning algorithms to optimize cryptocurrency portfolio performance.
        </p>
      </div>
    </div>
  );
}

function PerformanceStats({ stats }) {
  return (
    <div className="grid grid-cols-4 gap-3 w-full">
      {stats.map((stat) => (
        <PerformanceStat key={stat.label} stat={stat} />
      ))}
    </div>
  );
}

function PerformanceStat({ stat }) {
  return (
    <div className="flex-1 px-4 py-3 bg-muted border border-border rounded-lg text-center transition-all duration-200 hover:bg-muted/80">
      <p className={`${stat.color} font-bold text-md mb-0.5`}>{stat.value}</p>
      <p className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</p>
    </div>
  );
}

function PremiumCTA({ ctaFeatures }) {
  return (
    <div className="bg-muted border border-border rounded-xl p-5 flex flex-col justify-between min-h-[240px]">
      <div className="flex flex-col space-y-3">
        <div className="flex items-center">
          <LockOpenIcon className="h-5 w-5 mr-2 text-accent" />
          <h3 className="text-xl font-semibold text-foreground">Unlock Premium</h3>
        </div>
        <div>
          <p className="text-xl font-bold text-foreground">
            $14.99<span className="text-sm text-muted-foreground ml-2">/ month</span>
          </p>
        </div>
        <div className="space-y-2">
          {ctaFeatures.map((feature) => (
            <CTAFeature key={feature} feature={feature} />
          ))}
        </div>
      </div>
      <button className="w-full mt-4 px-4 py-2 rounded-lg bg-primary hover:bg-primary/80 text-primary-foreground font-medium transition-all duration-200">
        Unlock Now
      </button>
    </div>
  );
}

function CTAFeature({ feature }) {
  return (
    <div className="flex items-center text-foreground/80">
      <CheckIcon className="h-4 w-4 mr-2 text-accent" />
      <span className="text-xs">{feature}</span>
    </div>
  );
}
