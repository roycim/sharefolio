import { 
  ChartBarIcon, 
  TableCellsIcon, 
  UserGroupIcon, 
  ChatBubbleLeftIcon, 
  ShareIcon 
} from '@heroicons/react/24/outline'

export default function Sidebar({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'positions', label: 'Positions', icon: TableCellsIcon },
    { id: 'charts', label: 'Charts', icon: ChartBarIcon },
    { id: 'trades', label: 'Trades', icon: ShareIcon },
    { id: 'community', label: 'Community', icon: UserGroupIcon },
    { id: 'social', label: 'Social Feed', icon: ChatBubbleLeftIcon }
  ]

  return (
    <nav className="p-3">
      {tabs.map((tab) => {
        const Icon = tab.icon
        const isActive = activeTab === tab.id

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              text-xl
              w-full 
              px-7 
              py-4 
              mb-2
              rounded-lg 
              text-left
              flex 
              items-center
              transition-all 
              duration-200 
              ease-out
              relative
              border
              ${isActive 
                ? 'bg-[#1E1E1E] text-white border-white shadow-[inset_0_0_8px_rgba(255,255,255,0.08)]' 
                : 'bg-transparent text-[#8F8D8E] hover:bg-[#2A2A2A] border-transparent'}
            `}
          >
            <Icon className={`
              h-6 
              w-6 
              mr-3
              transition-all 
              duration-200
              ease-out
              ${isActive 
                ? 'text-[#3C82F6]'  /* ✅ Selected icon is now blue */
                : 'text-[#8F8D8E] group-hover:text-[#FEFEFE]'}
            `} />
            {tab.label}
          </button>
        )
      })}
    </nav>
  )
}
