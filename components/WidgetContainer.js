import React from 'react'

export default function WidgetContainer({ 
  title, 
  children, 
  className = '', 
  headerActions 
}) {
  return (
    <div className={`
      bg-dark-50 
      rounded-xl 
      border border-white/[0.06]
      overflow-hidden
      mb-6
      ${className}
    `}>
      {/* Widget Header */}
      <div className="
        px-6 
        py-4 
        border-b border-white/[0.06]
        flex 
        justify-between 
        items-center
        bg-white/[0.02]
      ">
        <h2 className="text-lg font-semibold text-white">
          {title}
        </h2>
        {headerActions && (
          <div className="flex items-center space-x-3">
            {headerActions}
          </div>
        )}
      </div>

      {/* Widget Content */}
      <div className="p-6">
        {children}
      </div>
    </div>
  )
}
