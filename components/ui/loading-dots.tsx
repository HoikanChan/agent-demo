import * as React from "react"
import { cn } from "@/lib/utils"

interface LoadingDotsProps {
  className?: string
  size?: "sm" | "md" | "lg"
}

export function LoadingDots({ className, size = "sm" }: LoadingDotsProps) {
  const sizeClasses = {
    sm: "w-1 h-1",
    md: "w-1.5 h-1.5", 
    lg: "w-2 h-2"
  }

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div 
        className={cn(
          "bg-blue-500 rounded-full animate-pulse",
          sizeClasses[size]
        )}
        style={{
          animationDelay: "0ms",
          animationDuration: "1400ms"
        }}
      />
      <div 
        className={cn(
          "bg-blue-500 rounded-full animate-pulse",
          sizeClasses[size]
        )}
        style={{
          animationDelay: "200ms", 
          animationDuration: "1400ms"
        }}
      />
      <div 
        className={cn(
          "bg-blue-500 rounded-full animate-pulse",
          sizeClasses[size]
        )}
        style={{
          animationDelay: "400ms",
          animationDuration: "1400ms"
        }}
      />
    </div>
  )
}

export function LoadingSpinner({ className, size = "sm" }: LoadingDotsProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6"
  }

  return (
    <div className={cn("animate-spin", className)}>
      <svg 
        className={cn("text-blue-500", sizeClasses[size])} 
        fill="none" 
        viewBox="0 0 24 24"
      >
        <circle 
          className="opacity-25" 
          cx="12" 
          cy="12" 
          r="10" 
          stroke="currentColor" 
          strokeWidth="4"
        />
        <path 
          className="opacity-75" 
          fill="currentColor" 
          d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  )
}

export function LoadingPulse({ className, size = "sm" }: LoadingDotsProps) {
  const sizeClasses = {
    sm: "w-2 h-2",
    md: "w-3 h-3",
    lg: "w-4 h-4"
  }

  return (
    <div className={cn("relative", className)}>
      <div 
        className={cn(
          "bg-blue-500 rounded-full animate-ping",
          sizeClasses[size]
        )}
      />
      <div 
        className={cn(
          "absolute inset-0 bg-blue-500 rounded-full animate-pulse",
          sizeClasses[size]
        )}
      />
    </div>
  )
} 