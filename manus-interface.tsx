"use client"

import { useState, useEffect } from "react"
import type { ViewType, InterfaceState } from "./types"
import ContentPanel from "./components/ContentPanel"
import ChatPanel from "./components/ChatPanel"
import InitialChatInterface from "./components/InitialChatInterface"

export default function ManusInterface() {
  const [interfaceState, setInterfaceState] = useState<InterfaceState>("chat-only")
  const [currentView, setCurrentView] = useState<ViewType>("plan")
  const [currentStep, setCurrentStep] = useState(-1)
  const [userTask, setUserTask] = useState("")

  const handleTaskSubmit = (task: string) => {
    setUserTask(task)
    setInterfaceState("full-interface")
    setCurrentStep(0)
    setCurrentView("plan")
  }

  const handleViewChange = (view: ViewType) => {
    setCurrentView(view)
  }

  // 自动推进步骤
  useEffect(() => {
    if (interfaceState === "full-interface" && currentStep < 6) {
      // 为每个步骤设置不同的时间间隔
      const stepDelays = [
        5000, // 计划 -> 拓扑: 3秒
        3000, // 拓扑 -> 告警: 3秒
        3000, // 告警 -> 分析: 3秒
        3000, // 分析 -> 修复: 3秒
        8000, // 修复 -> 验证: 6秒 (修复步骤延长)
        3000, // 验证 -> 完成: 3秒
      ]
      
      const delay = stepDelays[currentStep] || 3000
      
      const timer = setTimeout(() => {
        setCurrentStep((prev) => prev + 1)

        // 根据步骤自动切换视图
        const viewMap: ViewType[] = ["plan", "topology", "alerts", "analysis", "recovery", "verification"]
        if (currentStep + 1 < viewMap.length) {
          setCurrentView(viewMap[currentStep + 1])
        }
      }, delay)

      return () => clearTimeout(timer)
    }
  }, [interfaceState, currentStep])

  if (interfaceState === "chat-only") {
    return <InitialChatInterface onTaskSubmit={handleTaskSubmit} />
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <ContentPanel currentView={currentView} currentStep={currentStep} />
      <ChatPanel onViewChange={handleViewChange} currentStep={currentStep} userTask={userTask} />
    </div>
  )
}
