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
  onTaskSubmit?: (task: string) => void
  showInitialState?: boolean
}

export default function ChatPanel({ onViewChange, currentStep, userTask, onToolSwitch, onConfirmRecovery, analysisCompleted, onTaskSubmit, showInitialState = false }: ChatPanelProps) {
  const [inputValue, setInputValue] = useState("")
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      if (showInitialState && onTaskSubmit) {
        onTaskSubmit(inputValue.trim())
      }
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
        {showInitialState ? (
          // 初始状态显示欢迎页面
          <div className="h-full flex flex-col">
            {/* 头部欢迎区域 */}
            <div className="text-center py-8 px-6 bg-gradient-to-br from-blue-50 to-purple-50 border-b border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Cpu className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">欢迎使用 UI智能体</h1>
              <p className="text-gray-600">你的智能运维助手</p>
            </div>
            
            {/* 功能介绍区域 */}
            <div className="flex-1 p-6 space-y-6">
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-900">我可以帮助你：</h2>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="text-gray-700">
                      <div className="font-medium">系统故障诊断</div>
                      <div className="text-sm text-gray-600">快速定位和分析系统问题</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="text-gray-700">
                      <div className="font-medium">自动化运维</div>
                      <div className="text-sm text-gray-600">执行各种运维任务和操作</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="text-gray-700">
                      <div className="font-medium">问题修复</div>
                      <div className="text-sm text-gray-600">提供详细的解决方案并执行修复</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600 text-center">
                  💡 请在下方输入框中描述你遇到的问题或需要执行的任务
                </div>
              </div>
            </div>
          </div>
        ) : (
          // 任务执行状态显示聊天消息
          <ChatMessages 
            onViewChange={handleViewChange} 
            currentStep={currentStep} 
            userTask={userTask}
            onConfirmRecovery={onConfirmRecovery}
            analysisCompleted={analysisCompleted}
          />
        )}
      </ScrollArea>

      {/* Chat Input */}
      <div className="p-6 border-t border-gray-100 flex-shrink-0">
        <div className="flex gap-3">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={showInitialState ? "请描述你遇到的问题或需要执行的任务..." : "输入消息..."}
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
