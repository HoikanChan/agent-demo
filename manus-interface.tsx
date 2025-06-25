"use client"

import { useState, useEffect, useRef } from "react"
import type { ViewType, InterfaceState } from "./types"
import ContentPanel, { type ContentPanelRef } from "./components/ContentPanel"
import ChatPanel from "./components/ChatPanel"
import { setupCallbacks } from "./examples/CallbackExample"

setupCallbacks()

export default function ManusInterface() {
  const [interfaceState, setInterfaceState] = useState<InterfaceState>("chat-only")
  const [currentView, setCurrentView] = useState<ViewType>("plan")
  const [currentStep, setCurrentStep] = useState(-1)
  const [userTask, setUserTask] = useState("")
  const [waitingForConfirmation, setWaitingForConfirmation] = useState(false)
  const [analysisCompleted, setAnalysisCompleted] = useState(false)
  const contentPanelRef = useRef<ContentPanelRef>(null)

  const handleTaskSubmit = (task: string) => {
    setUserTask(task)
    setInterfaceState("full-interface")
    setCurrentStep(0)
    setCurrentView("plan")
    setAnalysisCompleted(false)
  }

  const handleViewChange = (view: ViewType) => {
    setCurrentView(view)
  }

  const handleToolSwitch = (view: ViewType) => {
    // 通知ContentPanel切换工具
    if (contentPanelRef.current) {
      contentPanelRef.current.switchToTool(view)
    }
  }

  const handleConfirmRecovery = () => {
    setWaitingForConfirmation(false)
    setAnalysisCompleted(false)
    // 继续到下一步
    setCurrentStep(4)
    setCurrentView("recovery")
  }

  // 自动推进步骤
  useEffect(() => {
    if (interfaceState === "full-interface" && currentStep < 6 && !waitingForConfirmation) {
      // 为每个步骤设置不同的时间间隔
      const stepDelays = [
        6000, // 计划 -> 拓扑: 5秒
        3000, // 拓扑 -> 告警: 3秒
        8000, // 告警 -> 分析: 3秒
        6000, // 分析完成 -> 等待确认: 4秒
        8000, // 修复 -> 验证: 6秒
        3000, // 验证 -> 完成: 3秒
      ]
      
      const delay = stepDelays[currentStep] || 3000
      
      const timer = setTimeout(() => {
        if (currentStep === 3) {
          // 第4步分析完成后，标记分析完成并等待用户确认
          setAnalysisCompleted(true)
          setWaitingForConfirmation(true)
        } else {
          setCurrentStep((prev) => prev + 1)

          // 根据步骤自动切换视图
          const viewMap: ViewType[] = ["plan", "topology", "alerts", "analysis", "recovery", "verification"]
          if (currentStep + 1 < viewMap.length) {
            setCurrentView(viewMap[currentStep + 1])
          }
        }
      }, delay)

      return () => clearTimeout(timer)
    }
  }, [interfaceState, currentStep, waitingForConfirmation])

  return (
    <div className="flex h-screen bg-gray-50">
      <ContentPanel 
        ref={contentPanelRef}
        currentView={currentView} 
        currentStep={currentStep}
        showInitialState={interfaceState === "chat-only"}
      />
      <ChatPanel 
        onViewChange={handleViewChange} 
        onToolSwitch={handleToolSwitch}
        onConfirmRecovery={handleConfirmRecovery}
        onTaskSubmit={handleTaskSubmit}
        analysisCompleted={analysisCompleted}
        currentStep={currentStep} 
        userTask={userTask}
        showInitialState={interfaceState === "chat-only"}
      />
    </div>
  )
}
