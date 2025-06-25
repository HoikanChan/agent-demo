import { FileText, Globe, AlertTriangle, Search, Terminal, Shield, Cpu, CheckCircle, Clock } from "lucide-react"
import type { ViewType } from "../types"
import { Timeline, TimelineItem } from "@/components/ui/timeline"
import { LoadingPulse } from "@/components/ui/loading-dots"

interface ChatMessagesProps {
    onViewChange: (view: ViewType) => void
    currentStep: number
    userTask: string
}

export default function ChatMessages({ onViewChange, currentStep, userTask }: ChatMessagesProps) {
    const steps = [
        {
            title: "查看计划详情 - 制定详细的故障修复计划，分析故障范围和影响",
            toolName: "计划文档工具",
            toolIcon: FileText,
            statusText: "正在生成故障修复计划文档",
            icon: FileText,
            viewName: "plan" as ViewType,
            time: "14:30",
        },
        {
            title: "查看网络拓扑结构，识别故障节点和影响范围",
            toolName: "浏览网络拓扑图页面",
            toolIcon: Globe,
            statusText: "正在加载网络拓扑图，分析节点状态",
            icon: Globe,
            viewName: "topology" as ViewType,
            time: "14:32",
        },
        {
            title: "检查系统告警信息，确认故障类型和严重程度",
            toolName: "浏览告警监控页面",
            toolIcon: Globe,
            statusText: "正在查看系统告警页面，筛选相关告警",
            icon: Globe,
            viewName: "alerts" as ViewType,
            time: "14:35",
        },
        {
            title: "进行故障根因分析，确定最佳修复方案",
            toolName: "故障分析工具",
            toolIcon: Search,
            statusText: "正在执行诊断命令，分析日志文件",
            icon: Search,
            viewName: "analysis" as ViewType,
            time: "14:38",
        },
        {
            title: "生成并执行自动恢复策略，修复网络故障",
            toolName: "Shell脚本执行工具",
            toolIcon: Terminal,
            statusText: "正在执行恢复脚本：switch_to_backup_link.sh",
            icon: Terminal,
            viewName: "recovery" as ViewType,
            time: "预计 14:45",
        },
        {
            title: "验证修复效果，确认网络服务恢复正常",
            toolName: "验证测试工具",
            toolIcon: Shield,
            statusText: "等待恢复完成后执行连通性测试",
            icon: Shield,
            viewName: "verification" as ViewType,
            time: "预计 14:50",
        },
    ]

    const getStepStatus = (index: number) => {
        if (index < currentStep) return "completed"
        if (index === currentStep) return "in-progress"
        return "pending"
    }

    const getStepIcon = (step: any, index: number) => {
        const status = getStepStatus(index)
        if (status === "completed") {
            return <CheckCircle className="w-4 h-4" />
        }
        if (status === "in-progress") {
            return <Clock className="w-4 h-4" />
        }
        return <step.icon className="w-4 h-4" />
    }

    return (
        <div className="space-y-6">
            {/* User Message */}
            <div className="text-right">
                <div className="text-sm text-gray-500 mb-2">{userTask}</div>
            </div>

            {/* Assistant Response */}
            <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Cpu className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-900 mb-2">UI智能体</div>
                    <div className="text-gray-700 leading-relaxed mb-4">
                        我将协助您通过自动化故障响应系统解决XXX网络故障。我将分析当前网络拓扑，
                        审查活跃告警，执行全面故障诊断，并实施自动化恢复策略。
                    </div>
                </div>
            </div>

            {/* Timeline Section */}
            {currentStep >= 0 && (
                <div className="ml-11">
                    <div className="ml-0">
                        <Timeline>
                            {steps.slice(0, Math.max(currentStep + 1, 1)).map((step, index) => (
                                <TimelineItem
                                    key={index}
                                    title={step.title}
                                    time={step.time}
                                    status={getStepStatus(index)}
                                    icon={getStepIcon(step, index)}
                                >
                                    {getStepStatus(index) === "in-progress" ? (
                                        <div className="flex items-center gap-2 mt-2 text-sm text-blue-600">
                                            <LoadingPulse size="sm" />
                                            <span>正在{step.statusText}...</span>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => onViewChange(step.viewName)}
                                            className="flex items-center gap-1.5 mt-2 px-2 py-1 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-md transition-all duration-150 group"
                                        >
                                            <step.toolIcon className="w-3.5 h-3.5 text-gray-500 group-hover:text-gray-600" />
                                            <span className="text-xs text-gray-600 group-hover:text-gray-700">
                                                {step.toolName}
                                            </span>
                                            <svg className="w-2.5 h-2.5 text-gray-400 group-hover:text-gray-500 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    )}
                                </TimelineItem>
                            ))}
                        </Timeline>
                    </div>
                </div>
            )}

            {/* Additional Messages - only show after certain steps */}
            {currentStep >= 4 && (
                <>
                    <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Cpu className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="font-medium text-gray-900 mb-2">UI智能体</div>
                            <div className="text-gray-700 leading-relaxed">
                                UI智能体 正在查看路径于{" "}
                                <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">/home/ubuntu/fault-recovery</code>{" "}
                                的服务修复到公网网路上。请点击确认按钮完成恢复。
                            </div>
                        </div>
                    </div>

                    <div className="ml-11">
                        <div className="flex items-center gap-3 mb-3 cursor-pointer hover:bg-blue-50 p-2 rounded-lg transition-colors">
                            <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-xs">▼</span>
                            </div>
                            <span className="text-gray-700 font-medium">执行故障恢复</span>
                        </div>
                        <div className="ml-9 text-sm text-gray-600">等待用户确认以完成故障修复和网络恢复验证。</div>
                    </div>
                </>
            )}

            {/* Final Message - only show after all steps */}
            {currentStep >= 5 && (
                <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Cpu className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-900 mb-2">UI智能体</div>
                        <div className="text-gray-700 leading-relaxed mb-3">
                            我已经为故障恢复准备好了所有工具并启动了修复流程。要完成恢复，请点击界面中出现的确认按钮。
                        </div>
                        <div className="text-gray-700 leading-relaxed">
                            确认后，系统将执行自动恢复策略，修复网络故障并恢复正常服务。完成后，我将为您提供详细的修复报告和验证结果。
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
} 