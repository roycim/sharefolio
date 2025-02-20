import { PORTFOLIO_POSITIONS } from '../data/mockData'

export default function PositionsTable() {
  return (
    <div className="
      bg-sharefolio-dark-50/60 
      backdrop-blur-md 
      rounded-lg 
      overflow-hidden 
      shadow-premium-shadow
      border 
      border-white/5
    ">
      <table className="w-full">
        <thead className="bg-white/5 border-b border-white/10">
          <tr>
            {['Asset', 'Symbol', 'Price', 'Entry', 'P/L %', '24h', 'Allocation'].map((header) => (
              <th 
                key={header} 
                className="
                  text-left 
                  text-xs 
                  text-white/50 
                  font-semibold 
                  uppercase 
                  tracking-wider 
                  px-4 
                  py-3
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
                hover:bg-white/5 
                transition-colors 
                duration-200 
                border-b 
                border-white/5 
                last:border-b-0
                group
              "
            >
              <td className="px-4 py-4 flex items-center space-x-3">
                <span className="
                  w-8 
                  h-8 
                  rounded-full 
                  bg-fintech-blue-50/10 
                  flex 
                  items-center 
                  justify-center 
                  font-bold
                  text-white
                  group-hover:bg-fintech-blue-50/20
                  transition-all
                  border 
                  border-fintech-blue-50/30
                ">
                  {position.symbol[0]}
                </span>
                <span className="font-medium text-white">
                  {position.asset}
                </span>
              </td>
              <td className="px-4 py-4 text-white/70">
                {position.symbol}
              </td>
              <td className="px-4 py-4 font-semibold text-white">
                ${position.price.toLocaleString()}
              </td>
              <td className="px-4 py-4 text-white/70">
                ${position.entry.toLocaleString()}
              </td>
              <td className={`
                px-4 
                py-4 
                font-semibold 
                ${position.pl > 0 ? 'text-green-400' : 'text-red-400'}
              `}>
                {position.pl}%
              </td>
              <td className={`
                px-4 
                py-4 
                ${position.change24h > 0 ? 'text-green-400' : 'text-red-400'}
              `}>
                {position.change24h}%
              </td>
              <td className="px-4 py-4">
                <div className="
                  w-full 
                  bg-white/10 
                  rounded-full 
                  h-2 
                  overflow-hidden
                  group-hover:bg-white/20
                  transition-all
                ">
                  <div 
                    className="
                      h-full 
                      bg-fintech-gradient 
                      rounded-full
                    " 
                    style={{ width: `${position.allocation}%` }}
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
