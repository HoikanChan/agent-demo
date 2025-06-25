"use client"

import { useState, useEffect, useRef } from "react"
import { Send, Cpu } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import type { ViewType } from "../types"
import ChatMessages from "./ChatMessages"
// import ChatMessagesWithTimeline from "./ChatMessagesWithTimeline"

interface ChatPanelProps {
  onViewChange: (view: ViewType) => void
  currentStep: number
  userTask: string
  onToolSwitch?: (view: ViewType) => void
  onConfirmRecovery?: () => void
  analysisCompleted?: boolean
}

export default function ChatPanel({ onViewChange, currentStep, userTask, onToolSwitch, onConfirmRecovery, analysisCompleted }: ChatPanelProps) {
  const [inputValue, setInputValue] = useState("")
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      setInputValue("")
    }
  }

  const handleViewChange = (view: ViewType) => {
    // 通知父组件切换工具
    if (onToolSwitch) {
      onToolSwitch(view)
    }
    // 保持原有的onViewChange调用
    onViewChange(view)
  }

  // 当步骤变化时自动滚动到底部
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]')
      if (scrollContainer) {
        setTimeout(() => {
          scrollContainer.scrollTop = scrollContainer.scrollHeight
        }, 100) // 延迟一点时间确保DOM更新完成
      }
    }
  }, [currentStep])

  return (
    <div className="w-[600px] h-screen flex flex-col bg-white">

      {/* Chat Messages */}
      <ScrollArea ref={scrollAreaRef} className="flex-1 p-6 min-h-0">
        <ChatMessages 
          onViewChange={handleViewChange} 
          currentStep={currentStep} 
          userTask={userTask}
          onConfirmRecovery={onConfirmRecovery}
          analysisCompleted={analysisCompleted}
        />
      </ScrollArea>

      {/* Chat Input */}
      <div className="p-6 border-t border-gray-100 flex-shrink-0">
        <div className="flex gap-3">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="输入消息..."
            className="flex-1 border-gray-200 focus:border-blue-300 focus:ring-1 focus:ring-blue-200"
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <Button
            onClick={handleSendMessage}
            size="sm"
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
