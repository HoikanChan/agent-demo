import { Maximize2, Cpu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
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

export default function ContentPanel({ currentView, currentStep }: ContentPanelProps) {
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

  const shouldStartView = currentStep > getViewIndex(currentView)

  const renderCurrentView = () => {
    switch (currentView) {
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

  return (
    <div className="flex-1 flex flex-col bg-white border-r border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-md flex items-center justify-center">
            <Cpu className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-gray-900">UI智能体 控制台</span>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-white border-blue-200 text-blue-700">
            {currentView}
          </Badge>
          <Button variant="ghost" size="sm">
            <Maximize2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Content Area */}
      <ScrollArea className="flex-1">{renderCurrentView()}</ScrollArea>
    </div>
  )
}
