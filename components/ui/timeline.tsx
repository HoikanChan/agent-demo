import * as React from "react"
import { cn } from "@/lib/utils"

interface TimelineItemProps {
  title: string
  description?: string
  time?: string
  status?: "completed" | "in-progress" | "pending" | "error"
  icon?: React.ReactNode
  children?: React.ReactNode
  isLast?: boolean
}

interface TimelineProps {
  children: React.ReactNode
  className?: string
}

function Timeline({ children, className }: TimelineProps) {
  const childrenArray = React.Children.toArray(children)
  
  return (
    <div className={cn("relative", className)}>
      {React.Children.map(childrenArray, (child, index) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, {
            isLast: index === childrenArray.length - 1,
          })
        }
        return child
      })}
    </div>
  )
}

function TimelineItem({ 
  title, 
  description, 
  time, 
  status = "pending", 
  icon, 
  children, 
  isLast = false 
}: TimelineItemProps) {
  const statusColors = {
    completed: "bg-green-500 border-green-200",
    "in-progress": "bg-blue-500 border-blue-200 animate-pulse",
    pending: "bg-gray-300 border-gray-200",
    error: "bg-red-500 border-red-200"
  }

  const lineColors = {
    completed: "bg-green-200",
    "in-progress": "bg-blue-200",
    pending: "bg-gray-200",
    error: "bg-red-200"
  }

  return (
    <div className="relative flex items-start gap-4 pb-6">
      {/* Timeline Line */}
      {!isLast && (
        <div 
          className={cn(
            "absolute left-4 top-6 h-full w-0.5 -translate-x-1/2",
            lineColors[status]
          )}
        />
      )}
      
      {/* Timeline Dot */}
      <div className="relative z-10 flex items-center justify-center">
        <div 
          className={cn(
            "flex h-7 w-7 items-center justify-center rounded-full border-2",
            statusColors[status]
          )}
        >
          {icon ? (
            <div className="text-white text-sm">
              {icon}
            </div>
          ) : (
            <div className="h-2 w-2 rounded-full bg-white" />
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 pt-0.5">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-900">
            {title}
          </h3>
          {time && (
            <span className="text-xs text-gray-500">
              {time}
            </span>
          )}
        </div>
        
        {description && (
          <p className="mt-1 text-sm text-gray-600">
            {description}
          </p>
        )}
        
        {children && (
          <div className="mt-2">
            {children}
          </div>
        )}
      </div>
    </div>
  )
}

export { Timeline, TimelineItem }
export type { TimelineItemProps, TimelineProps } 