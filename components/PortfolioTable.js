import Image from 'next/image'
import { PORTFOLIO_POSITIONS } from '../data/mockData'

export default function PortfolioTable() {
  return (
    <div className="
      rounded-lg
      bg-dark-50
      border border-white/[0.06]
      overflow-hidden
      shadow-md
    ">
      <table className="w-full">
        <thead className="bg-dark-100">
          <tr>
            {['Asset', 'Symbol', 'Price', 'Entry', 'P/L %', '24h', 'Allocation'].map((header) => (
              <th 
                key={header}
                className="
                  px-6 py-4
                  text-left text-xs font-bold
                  text-white/50
                  tracking-wider
                  uppercase
                "
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {PORTFOLIO_POSITIONS.map((position, index) => (
            <tr 
              key={index}
              className="
                group
                border-b border-white/[0.06]
                hover:bg-white/[0.02]
                transition-colors duration-200
              "
            >
              <td className="px-6 py-5">
                <div className="flex items-center space-x-4">
                  <div className="
                    w-10 h-10
                    rounded-lg
                    bg-white/[0.04]
                    border border-white/[0.06]
                    flex items-center justify-center
                    overflow-hidden
                  ">
                    <Image
                      src={position.logo}
                      alt={`${position.asset} logo`}
                      width={28}
                      height={28}
                      className="object-contain"
                    />
                  </div>
                  <span className="font-medium text-white">
                    {position.asset}
                  </span>
                </div>
              </td>
              <td className="px-6 py-5 text-white/60 font-medium">
                {position.symbol}
              </td>
              <td className="px-6 py-5 font-semibold text-white">
                ${position.price.toLocaleString()}
              </td>
              <td className="px-6 py-5 text-white/60">
                ${position.entry.toLocaleString()}
              </td>
              <td className={`
                px-6 py-5 font-semibold
                ${position.pl > 0 ? 'text-green-400' : 'text-red-400'}
              `}>
                {position.pl}%
              </td>
              <td className={`
                px-6 py-5
                ${position.change24h > 0 ? 'text-green-400' : 'text-red-400'}
              `}>
                {position.change24h}%
              </td>
              <td className="px-6 py-5">
                <div className="
                  w-full 
                  bg-white/[0.04] 
                  rounded-full 
                  h-2
                  overflow-hidden
                  relative
                ">
                  <div
                    className="
                      h-full 
                      rounded-full 
                      bg-accent 
                      absolute 
                      top-0 
                      left-0
                      transition-all 
                      duration-500
                      group-hover:animate-pulse
                    "
                    style={{ 
                      width: `${position.allocation}%`,
                      backgroundImage: 'linear-gradient(90deg, #2D9CDB 0%, #4DABDD 100%)'
                    }}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
