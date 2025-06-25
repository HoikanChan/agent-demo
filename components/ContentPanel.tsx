import { Maximize2, Cpu, X, Minimize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useState, useEffect, forwardRef, useImperativeHandle } from "react"
import type { ViewType } from "../types"
import PlanView from "./views/PlanView"
import TopologyView from "./views/TopologyView"
import AlertsView from "./views/AlertsView"
import AnalysisView from "./views/AnalysisView"
import RecoveryView from "./views/RecoveryView"
import VerificationView from "./views/VerificationView"

interface ContentPanelProps {
  currentView: ViewType
  currentStep: number
  showInitialState?: boolean
}

export interface ContentPanelRef {
  switchToTool: (view: ViewType) => void
}

const ContentPanel = forwardRef<ContentPanelRef, ContentPanelProps>(
  ({ currentView, currentStep, showInitialState = false }, ref) => {
    const [showToolPopup, setShowToolPopup] = useState(false)
    const [toolView, setToolView] = useState<ViewType>("plan")
    const [isAnimating, setIsAnimating] = useState(false)

    // 暴露方法给父组件
    useImperativeHandle(ref, () => ({
      switchToTool: (view: ViewType) => {
        setToolView(view)
        setShowToolPopup(true)
        setIsAnimating(true)
      }
    }))

    // 自动弹出工具逻辑
    useEffect(() => {
      if (currentStep >= 0) {
        const viewMap: ViewType[] = ["plan", "topology", "alerts", "analysis", "recovery", "verification"]
        const currentToolView = viewMap[currentStep]
        if (currentToolView) {
          // 只在plan和recovery步骤时显示工具弹出层
          if (currentToolView === "plan" || currentToolView === "recovery") {
            setToolView(currentToolView)
            setShowToolPopup(true)
            setIsAnimating(true)
          } else {
            // 其他步骤隐藏弹出层
            setShowToolPopup(false)
            setIsAnimating(false)
          }
        }
      }
    }, [currentStep])

    // 处理动画结束
    useEffect(() => {
      if (showToolPopup && isAnimating) {
        const timer = setTimeout(() => {
          setIsAnimating(false)
        }, 300)
        return () => clearTimeout(timer)
      }
    }, [showToolPopup, isAnimating])

    const getViewIndex = (view: ViewType): number => {
      const viewMap = {
        plan: 0,
        topology: 1,
        alerts: 2,
        analysis: 3,
        recovery: 4,
        verification: 5,
      }
      return viewMap[view]
    }

    const shouldStartView = currentStep >= getViewIndex(toolView)

    const renderToolView = () => {
      switch (toolView) {
        case "plan":
          return <PlanView shouldStart={shouldStartView} />
        case "topology":
          return <TopologyView shouldStart={shouldStartView} />
        case "alerts":
          return <AlertsView shouldStart={shouldStartView} />
        case "analysis":
          return <AnalysisView shouldStart={shouldStartView} />
        case "recovery":
          return <RecoveryView shouldStart={shouldStartView} />
        case "verification":
          return <VerificationView shouldStart={shouldStartView} />
        default:
          return <PlanView shouldStart={shouldStartView} />
      }
    }

    const handleToolClick = (view: ViewType) => {
      setToolView(view)
      setShowToolPopup(true)
      setIsAnimating(true)
    }

    const handleClosePopup = () => {
      setShowToolPopup(false)
      setIsAnimating(false)
    }

    const getToolDisplayName = (view: ViewType) => {
      const nameMap = {
        plan: "计划工具",
        topology: "拓扑工具", 
        alerts: "告警工具",
        analysis: "分析工具",
        recovery: "修复工具",
        verification: "验证工具"
      }
      return nameMap[view]
    }

    return (
      <div className="flex-[2] flex flex-col h-full bg-white border-r border-gray-200 relative">
        {/* Main Content Area - 始终显示iframe */}
        <div className="flex-1 min-h-0 overflow-hidden">
          <iframe
            src="https://www.baidu.com"
            className="w-full h-full border-0"
            title="主页面内容"
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
          />
        </div>

        {/* Tool Popup - 1/3 screen height */}
        {showToolPopup && (
          <div 
            className={`absolute bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 shadow-lg transition-all duration-300 ease-out ${
              isAnimating ? 'animate-slide-up' : ''
            }`}
            style={{ 
              height: '40vh',
              transform: showToolPopup ? 'translateY(0)' : 'translateY(100%)',
              opacity: showToolPopup ? 1 : 0
            }}
          >
            {/* Popup Header */}
            <div className="flex items-center justify-between px-3 py-1 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center gap-2">
                  {getToolDisplayName(toolView)}
              </div>
              <div className="flex items-center gap-1">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={handleClosePopup}
                  className="transition-all duration-200 hover:scale-105 hover:bg-gray-100"
                >
                  <Minimize2 className="w-4 h-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={handleClosePopup}
                  className="transition-all duration-200 hover:scale-105 hover:bg-gray-100"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            {/* Popup Content */}
            <div 
              className={`h-full overflow-hidden transition-all duration-500 ease-out ${
                isAnimating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
              }`}
              style={{ 
                height: 'calc(40vh - 44px)',
                transitionDelay: isAnimating ? '0ms' : '150ms'
              }}
            >
              <ScrollArea className="h-full w-full">
                <div className="h-full">
                  {renderToolView()}
                </div>
              </ScrollArea>
            </div>
          </div>
        )}
        
        {/* Global styles for animations */}
        <style jsx global>{`
          @keyframes slide-up {
            from {
              transform: translateY(100%);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
          
          .animate-slide-up {
            animation: slide-up 0.3s ease-out;
          }
        `}</style>
      </div>
    )
  }
)

ContentPanel.displayName = "ContentPanel"

export default ContentPanel
