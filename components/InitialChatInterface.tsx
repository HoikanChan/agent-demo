"use client"

import { useState } from "react"
import { Send, Cpu } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface InitialChatInterfaceProps {
  onTaskSubmit: (task: string) => void
}

export default function InitialChatInterface({ onTaskSubmit }: InitialChatInterfaceProps) {
  const [inputValue, setInputValue] = useState("")

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      onTaskSubmit(inputValue.trim())
      setInputValue("")
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="w-full max-w-2xl mx-auto flex flex-col bg-white">
        {/* Chat Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Cpu className="w-5 h-5 text-white" />
            </div>
            <span className="font-medium text-gray-900">UI智能体</span>
          </div>
        </div>

        {/* Chat Messages */}
        <ScrollArea className="flex-1 p-6">
          <div className="space-y-6">
            {/* Welcome Message */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <Cpu className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-gray-900 mb-2">UI智能体</div>
                <div className="text-gray-700 leading-relaxed">
                  你好！我是 UI智能体，你的智能运维助手。我可以帮助你处理各种系统故障和运维任务。
                  <br />
                  <br />
                  请告诉我你需要解决什么问题，我会为你制定详细的解决方案并执行相关操作。
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>

        {/* Chat Input */}
        <div className="p-6 border-t border-gray-100">
          <div className="flex gap-3">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="请描述你遇到的问题或需要执行的任务..."
              className="flex-1 border-gray-200 focus:border-gray-300 focus:ring-0"
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
    </div>
  )
}
