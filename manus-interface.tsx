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
      const timer = setTimeout(() => {
        setCurrentStep((prev) => prev + 1)

        // 根据步骤自动切换视图
        const viewMap: ViewType[] = ["plan", "topology", "alerts", "analysis", "recovery", "verification"]
        if (currentStep + 1 < viewMap.length) {
          setCurrentView(viewMap[currentStep + 1])
        }
      }, 3000) // 每3秒推进一步

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
