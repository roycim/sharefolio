import React from 'react'

export default function WidgetContainer({ 
  title, 
  children, 
  className = '', 
  headerActions 
}) {
  return (
    <div className={`
      bg-card 
      rounded-xl 
      border border-border
      overflow-hidden
      mb-6
      ${className}
    `}>
      {/* Widget Header */}
      <div className="
        px-6 
        py-4 
        border-b border-border
        flex 
        justify-between 
        items-center
        bg-muted
      ">
        <h2 className="text-lg font-semibold text-foreground">
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
