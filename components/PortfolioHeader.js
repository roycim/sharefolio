import Image from 'next/image'

export default function PortfolioHeader() {
  const stats = [
    { label: 'Daily', value: '+3.24%', color: 'text-green-400' },
    { label: 'Weekly', value: '+12.5%', color: 'text-green-400' },
    { label: 'Monthly', value: '+35.7%', color: 'text-green-400' },
    { label: 'Yearly', value: '+128.3%', color: 'text-green-400' }
  ]

  return (
    <div className="
      bg-dark-50
      rounded-xl 
      border border-white/[0.06]
      p-6
      flex 
      flex-col
    ">
      <div className="flex items-start space-x-6 mb-6">
        <div className="relative w-24 h-24">
          <Image
            src="/portfolio-placeholder.jpg"
            alt="Portfolio"
            layout="fill"
            className="rounded-lg object-cover ring-2 ring-white/[0.06]"
          />
        </div>
        
        <div className="flex-1">
          <h1 className="text-2xl font-semibold text-white mb-2">
            okswsw Portfolio
          </h1>
          <p className="text-white/60 mb-4">
            A sophisticated, data-driven investment strategy leveraging advanced quantitative analysis and machine learning algorithms to optimize cryptocurrency portfolio performance.
          </p>
        </div>
      </div>

      <div className="
        flex 
        space-x-4 
        mt-auto 
        pt-4 
        border-t 
        border-white/[0.06]
      ">
        {stats.map((stat) => (
          <div 
            key={stat.label}
            className="
              flex-1
              px-4 
              py-2.5 
              rounded-lg
              bg-white/[0.02]
              border border-white/[0.06]
              text-center
            "
          >
            <p className={`${stat.color} font-medium`}>
              {stat.value}
            </p>
            <p className="text-sm text-white/40 mt-0.5">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      <button className="
        w-full 
        mt-4 
        px-5 
        py-2.5 
        rounded-lg
        bg-accent 
        hover:bg-accent-light
        text-white 
        font-medium
        transition-all 
        duration-200
      ">
        Unlock for $14.99/month
      </button>
    </div>
  )
}
