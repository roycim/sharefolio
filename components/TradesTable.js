import { TRADE_HISTORY } from '../data/mockData'

export default function TradesTable() {
  return (
    <div className="bg-sharefolio-accent/50 backdrop-blur-sm rounded-lg overflow-hidden">
      <table className="w-full">
        <thead className="bg-white/5 border-b border-white/10">
          <tr>
            {['Date', 'Asset', 'Type', 'Amount', 'Price', 'Total'].map((header) => (
              <th 
                key={header} 
                className="text-left text-xs text-gray-400 font-medium uppercase tracking-wider px-4 py-3"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TRADE_HISTORY.map((trade, index) => (
            <tr 
              key={index} 
              className="hover:bg-white/10 transition-colors duration-200 border-b border-white/5 last:border-b-0"
            >
              <td className="px-4 py-4 text-white/80">{trade.date}</td>
              <td className="px-4 py-4 font-medium">{trade.asset}</td>
              <td className={`
                px-4 py-4 font-semibold 
                ${trade.type === 'Buy' ? 'text-green-400' : 'text-red-400'}
              `}>
                {trade.type}
              </td>
              <td className="px-4 py-4 text-white/80">{trade.amount}</td>
              <td className="px-4 py-4 text-white/80">${trade.price.toLocaleString()}</td>
              <td className="px-4 py-4 font-semibold">${trade.total.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
