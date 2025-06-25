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
}

export interface ContentPanelRef {
  switchToTool: (view: ViewType) => void
}

const ContentPanel = forwardRef<ContentPanelRef, ContentPanelProps>(
  ({ currentView, currentStep }, ref) => {
    const [showToolPopup, setShowToolPopup] = useState(false)
    const [toolView, setToolView] = useState<ViewType>("plan")

    // 暴露方法给父组件
    useImperativeHandle(ref, () => ({
      switchToTool: (view: ViewType) => {
        setToolView(view)
        setShowToolPopup(true)
      }
    }))

    // 自动弹出工具逻辑
    useEffect(() => {
      if (currentStep >= 0) {
        const viewMap: ViewType[] = ["plan", "topology", "alerts", "analysis", "recovery", "verification"]
        const currentToolView = viewMap[currentStep]
        if (currentToolView) {
          setToolView(currentToolView)
          setShowToolPopup(true)
        }
      }
    }, [currentStep])

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
        {/* Main Content Area - iframe */}
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
          <div className="absolute bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 shadow-lg"
               style={{ height: '40vh' }}>
            {/* Popup Header */}
            <div className="flex items-center justify-between px-3 py-1 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center gap-2">
                  {getToolDisplayName(toolView)}
              </div>
              <div className="flex items-center gap-1">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowToolPopup(false)}
                >
                  <Minimize2 className="w-4 h-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowToolPopup(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            {/* Popup Content */}
            <div className="h-full overflow-hidden" style={{ height: 'calc(40vh - 44px)' }}>
              <ScrollArea className="h-full w-full">
                <div className="h-full">
                  {renderToolView()}
                </div>
              </ScrollArea>
            </div>
          </div>
        )}
      </div>
    )
  }
)

ContentPanel.displayName = "ContentPanel"

export default ContentPanel
