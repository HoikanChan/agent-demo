"use client"

import type React from "react"

import { RotateCcw } from "lucide-react"
import type { ViewType } from "../types"

interface StepItemProps {
  title: string
  description: string
  toolName: string
  statusText: string
  icon: React.ComponentType<{ className?: string }>
  iconColor: string
  viewName: string
  onViewChange: (view: ViewType) => void
  substeps?: { title: string; status: string }[]
}

export default function StepItem({
  title,
  description,
  toolName,
  statusText,
  icon: Icon,
  iconColor,
  viewName,
  onViewChange,
  substeps,
}: StepItemProps) {
  return (
    <div>
      <div className="text-gray-700 leading-relaxed mb-2">
        {description}
      </div>
      <div className="flex items-center gap-3 mb-2 cursor-pointer hover:bg-blue-50 p-2 rounded-lg transition-colors">
        <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
          <span className="text-white text-xs">▼</span>
        </div>
        <span className="text-gray-700 font-medium">{toolName}</span>
      </div>
      <div className="ml-9 text-sm text-gray-600">{statusText}</div>
      <div
        className="ml-9 mt-2 flex items-center gap-2 p-2 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors group"
        onClick={() => onViewChange(viewName as ViewType)}
      >
        <Icon className={`w-4 h-4 ${iconColor}`} />
        <span className="text-gray-700 text-sm">{title}</span>
        <RotateCcw className="w-3 h-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
      </div>
      {substeps && (
        <div className="ml-9 mt-2 space-y-1">
          {substeps.map((substep, index) => (
            <div key={index} className="flex items-center gap-2 text-xs text-gray-500">
              <div
                className={`w-2 h-2 rounded-full ${
                  substep.status === "completed" ? "bg-green-400" : "bg-blue-400 animate-pulse"
                }`}
              ></div>
              <span>
                {substep.title} - {substep.status === "completed" ? "已完成" : "进行中"}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
