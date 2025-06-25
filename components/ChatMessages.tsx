import { FileText, Globe, AlertTriangle, Search, Terminal, Shield, Cpu, CheckCircle, Clock, BookOpen, Play, User, MousePointerClick } from "lucide-react"
import type { ViewType } from "../types"
import { Timeline, TimelineItem } from "@/components/ui/timeline"
import { LoadingPulse } from "@/components/ui/loading-dots"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useState, useEffect } from 'react'

interface ChatMessagesProps {
  onViewChange: (view: ViewType) => void
  currentStep: number
  userTask: string
  onConfirmRecovery?: () => void
  analysisCompleted?: boolean
}

// 子步骤组件
function SubSteps({ substeps, onViewChange, stepViewName, stepStatus }: {
  substeps: any[],
  onViewChange: (view: ViewType) => void,
  stepViewName: ViewType,
  stepStatus: string
}) {
  const [substepStates, setSubstepStates] = useState<('pending' | 'in-progress' | 'completed')[]>([])
  const [timersStarted, setTimersStarted] = useState(false)

  useEffect(() => {
    // 初始化所有子步骤状态为pending
    if (substepStates.length === 0) {
      setSubstepStates(new Array(substeps.length).fill('pending'))
    }
  }, [substeps.length, substepStates.length])

  useEffect(() => {
    // 当步骤状态为in-progress或completed时，开始执行子步骤序列
    if ((stepStatus === "in-progress" || stepStatus === "completed") && !timersStarted && substepStates.length > 0) {
      setTimersStarted(true)

      substeps.forEach((substep, index) => {
        // 开始执行子步骤
        setTimeout(() => {
          setSubstepStates(prev => {
            const newStates = [...prev]
            newStates[index] = 'in-progress'
            return newStates
          })
        }, substep.startDelay || 0)

        // 完成子步骤
        setTimeout(() => {
          setSubstepStates(prev => {
            const newStates = [...prev]
            newStates[index] = 'completed'
            return newStates
          })
        }, (substep.startDelay || 0) + (substep.duration || 2000))
      })
    }
  }, [stepStatus, substeps, timersStarted, substepStates.length])

  return (
    <div className="space-y-3">
      {substeps.map((substep, index) => {
        const substepStatus = substepStates[index] || 'pending'

        if (substepStatus === 'pending') {
          return null // 不显示还未开始的子步骤
        }

        return (
          <div key={index} className="space-y-2">
            {substepStatus === 'in-progress' && (
              <div className="flex items-center gap-2 text-sm text-blue-600">
                <LoadingPulse size="sm" />
                <span>{substep.statusText}</span>
              </div>
            )}

            {substepStatus === 'completed' && (
              <>
                <button
                  onClick={() => onViewChange(stepViewName)}
                  className="flex items-center gap-1.5 px-2 py-1 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-md transition-all duration-150 group"
                >
                  <substep.toolIcon className="w-3.5 h-3.5 text-gray-500 group-hover:text-gray-600" />
                  <span className="text-xs text-gray-600 group-hover:text-gray-700">
                    {substep.toolName}
                  </span>
                  <svg className="w-2.5 h-2.5 text-gray-400 group-hover:text-gray-500 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                <div className="text-sm text-gray-600">
                  {substep.conclusion}
                </div>
              </>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default function ChatMessages({ onViewChange, currentStep, userTask, onConfirmRecovery, analysisCompleted }: ChatMessagesProps) {
  // 倒换前后网络质量数据变化
  const networkQualityData = [
    { time: '14:40', delay: 2.5, packetLoss: 0, availability: 99.9, status: '正常运行' },
    { time: '14:42', delay: 15.8, packetLoss: 2.1, availability: 85.2, status: '故障检测' },
    { time: '14:44', delay: 45.2, packetLoss: 8.5, availability: 45.0, status: '倒换中' },
    { time: '14:46', delay: 3.2, packetLoss: 0.1, availability: 98.5, status: '倒换完成' },
    { time: '14:48', delay: 2.8, packetLoss: 0, availability: 99.2, status: '验证中' },
    { time: '14:50', delay: 2.3, packetLoss: 0, availability: 99.8, status: '完全恢复' },
  ]

  const steps = [
    {
      title: "制定详细的故障修复计划，分析故障范围和影响",
      toolName: "故障修复计划文档",
      toolIcon: FileText,
      statusText: "正在生成故障修复计划文档",
      icon: FileText,
      viewName: "plan" as ViewType,
      time: "14:30",
      conclusion: "已生成完整故障修复计划，确定影响范围为核心交换机链路故障，预计修复时间20分钟"
    },
    {
      title: "查看网络拓扑结构，识别故障节点和影响范围",
      toolName: "浏览网络拓扑图页面",
      toolIcon: Globe,
      statusText: "正在加载网络拓扑图，分析节点状态",
      icon: Globe,
      viewName: "topology" as ViewType,
      time: "14:32",
      conclusion: "识别故障节点：核心交换机SW-CORE-01主链路断开，备用链路可用，已标记故障路径"
    },
    {
      title: "检查系统告警信息，确认故障类型和严重程度",
      toolName: "浏览告警监控页面",
      toolIcon: Globe,
      statusText: "正在查看系统告警页面，筛选相关告警",
      icon: Globe,
      viewName: "alerts" as ViewType,
      time: "14:35",
      conclusion: "确认告警类型：链路故障（CRITICAL级别），影响3个业务区域，无服务中断风险",
      substeps: [
        {
          title: "浏览告警监控页面",
          toolName: "浏览告警监控页面",
          toolIcon: Globe,
          statusText: "正在查看系统告警页面，筛选相关告警",
          conclusion: "确认告警类型：链路故障（CRITICAL级别），影响3个业务区域，无服务中断风险",
          startDelay: 0,    // 立即开始
          duration: 3000    // 运行3秒
        },
        {
          title: "点击查看告警详情",
          toolName: "点击查看告警详情",
          toolIcon: MousePointerClick,
          statusText: "正在点击查看告警详情，获取更多故障信息",
          conclusion: "获取详细告警信息：SW-CORE-01端口eth0/1物理层故障，故障时间14:28:45，影响路由条目127条",
          startDelay: 3000, // 3秒后开始
          duration: 2000    // 运行2秒
        }
      ]
    },
    {
      title: "进行故障根因分析，确定最佳修复方案",
      toolName: "故障分析工具",
      toolIcon: Search,
      statusText: "加载故障定位修复知识库",
      icon: Search,
      viewName: "analysis" as ViewType,
      time: "14:38",
      conclusion: "根因分析完成：SW-CORE-01主链路交换机HW-CORE-01-01端口故障，建议立即切换至备用链路并安排现场检修",
      requiresConfirmation: true,
      recoveryPlan: {
        title: "自动修复方案",
        steps: [
          "1. 立即切换至备用链路（预计耗时：30秒）",
          "2. 验证备用链路连通性（预计耗时：1分钟）",
          "3. 重新路由网络流量（预计耗时：2分钟）",
          "4. 监控网络状态稳定性（预计耗时：5分钟）"
        ],
        expectedResult: "网络连通性将在3分钟内完全恢复，服务中断时间最小化，所有业务区域恢复正常访问"
      }
    },
    {
      title: "生成并执行自动恢复策略，修复网络故障",
      toolName: "执行倒换命令",
      toolIcon: Terminal,
      statusText: "正在执行倒换命令：switch_to_backup_link.sh",
      icon: Terminal,
      viewName: "recovery" as ViewType,
      time: "预计 14:45",
      conclusion: "自动恢复脚本执行成功，已切换至备用链路，网络连通性恢复，流量正常转发"
    },
    {
      title: "验证修复效果，确认网络服务恢复正常",
      toolName: "浏览查看拓扑情况",
      toolIcon: Globe,
      statusText: "正在查看网络拓扑，验证倒换效果",
      icon: Globe,
      viewName: "topology" as ViewType,
      time: "预计 14:50",
      conclusion: "验证完成：所有业务区域连通性正常，延迟<5ms，丢包率0%，服务全面恢复。折线图显示倒换前后数据变化：流量从主链路(故障)成功切换至备用链路，网络吞吐量恢复至正常水平95%以上"
    },
  ]

  const getStepStatus = (index: number) => {
    if (index < currentStep) return "completed"
    if (index === currentStep) {
      if (index === 3 && analysisCompleted) return "completed"
      return "in-progress"
    }
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

  const renderStepContent = (step: any, index: number) => {
    const status = getStepStatus(index)

    if (status === "in-progress") {
      // 特殊处理第4步 - 显示调用工具加载修复知识
      if (index === 3) {
        return (
          <div className="mt-2 space-y-3">
            <div className="flex items-center gap-2 text-sm text-blue-600">
              <LoadingPulse size="sm" />
              <span>{step.statusText}</span>
            </div>
          </div>
        )
      }

      // 如果有子步骤，显示子步骤；否则显示默认的进行中状态
      if (step.substeps) {
        return (
          <div className="mt-2 space-y-2">
            <SubSteps substeps={step.substeps} onViewChange={onViewChange} stepViewName={step.viewName} stepStatus={status} />
          </div>
        )
      }

      return (
        <div className="flex items-center gap-2 mt-2 text-sm text-blue-600">
          <LoadingPulse size="sm" />
          <span>{step.statusText}</span>
        </div>
      )
    }

    if (status === "completed") {
      // 特殊处理第4步 - 显示修复方案和确认按钮
      if (index === 3 && step.recoveryPlan) {
        return (
          <div className="mt-2 space-y-3">
            <div className="text-sm text-gray-600">
              {step.conclusion}
            </div>

            {/* 修复方案展示 */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Terminal className="w-4 h-4 text-green-600" />
                <span className="font-medium text-green-800">{step.recoveryPlan.title}</span>
              </div>
              <div className="space-y-1 mb-3">
                {step.recoveryPlan.steps.map((planStep: string, stepIndex: number) => (
                  <div key={stepIndex} className="text-sm text-green-700">{planStep}</div>
                ))}
              </div>
              <div className="text-sm text-green-600 font-medium">
                预期效果：{step.recoveryPlan.expectedResult}
              </div>
            </div>

            {/* 确认按钮 */}
            {currentStep === 3 && onConfirmRecovery && (
              <button
                onClick={onConfirmRecovery}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <Play className="w-4 h-4" />
                <span>确认执行修复方案</span>
              </button>
            )}
          </div>
        )
      }

      return (
        <div className="mt-2 space-y-2">
          {/* 如果有子步骤，只渲染子步骤；否则渲染原来的工具和结论 */}
          {step.substeps ? (
            <SubSteps substeps={step.substeps} onViewChange={onViewChange} stepViewName={step.viewName} stepStatus={status} />
          ) : (
            <>
              <button
                onClick={() => onViewChange(step.viewName)}
                className="flex items-center gap-1.5 px-2 py-1 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-md transition-all duration-150 group"
              >
                <step.toolIcon className="w-3.5 h-3.5 text-gray-500 group-hover:text-gray-600" />
                <span className="text-xs text-gray-600 group-hover:text-gray-700">
                  {step.toolName}
                </span>
                <svg className="w-2.5 h-2.5 text-gray-400 group-hover:text-gray-500 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <div className="text-sm text-gray-600">
                {step.conclusion}
              </div>
            </>
          )}

          {/* 如果是最后一步验证修复效果，显示折线图 */}
          {index === 5 && (
            <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <h4 className="text-sm font-medium text-gray-800 mb-3">网络质量指标变化</h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={networkQualityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="time"
                      tick={{ fontSize: 12 }}
                      tickLine={{ stroke: '#666' }}
                    />
                    <YAxis
                      tick={{ fontSize: 12 }}
                      tickLine={{ stroke: '#666' }}
                      label={{ value: '数值', angle: -90, position: 'insideLeft' }}
                    />
                    <Tooltip
                      formatter={(value: any, name: any) => {
                        if (name === 'delay') return [`${value}ms`, '网络延迟']
                        if (name === 'packetLoss') return [`${value}%`, '丢包率']
                        if (name === 'availability') return [`${value}%`, '可用性']
                        return [value, name]
                      }}
                      labelFormatter={(label: any) => `时间: ${label}`}
                    />
                    <Line
                      type="monotone"
                      dataKey="delay"
                      stroke="#ef4444"
                      strokeWidth={2}
                      name="网络延迟"
                      dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="packetLoss"
                      stroke="#f59e0b"
                      strokeWidth={2}
                      name="丢包率"
                      dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="availability"
                      stroke="#22c55e"
                      strokeWidth={2}
                      name="可用性"
                      dot={{ fill: '#22c55e', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-2 flex items-center gap-6 text-xs text-gray-600">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-0.5 bg-red-500"></div>
                  <span>网络延迟 (ms)</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-0.5 bg-amber-500"></div>
                  <span>丢包率 (%)</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-0.5 bg-green-500"></div>
                  <span>可用性 (%)</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )
    }

    return (
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
    )
  }

  return (
    <div>
      {/* User Message */}
      <div className="flex items-start justify-end gap-3 mb-6">
        <div className="flex-1 max-w-2xl">
          <div className="bg-gray-100 text-gray-800 rounded-2xl rounded-tr-md px-4 py-3 shadow-sm">
            <div className="text-sm leading-relaxed">{userTask}</div>
          </div>
          <div className="flex items-center justify-end gap-2 mt-2">
            <span className="text-xs text-gray-500">User</span>
            <span className="text-xs text-gray-400">•</span>
            <span className="text-xs text-gray-500">刚刚</span>
          </div>
        </div>
        <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center flex-shrink-0">
          <User className="w-4 h-4 text-white" />
        </div>
      </div>

      {/* Assistant Response */}
      <div className="flex items-start content-center gap-3">
        <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0 ">
          <Cpu className="w-4 h-4 text-white" />
        </div>
        <div className="font-medium text-gray-900 mb-2">UI智能体</div>
      </div>
      <div className="text-gray-700 leading-relaxed mb-2 text-sm">
        我将协助您通过自动化故障响应系统解决网络故障。我将分析当前网络拓扑，
        审查活跃告警，执行全面故障诊断，并实施自动化恢复策略。现在您可以通过点击上方的工具按钮来使用各种分析和修复工具。
      </div>

      {/* Timeline Section */}
      {currentStep >= 0 && (
        <div className="ml-1">
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
                  {renderStepContent(step, index)}
                </TimelineItem>
              ))}
            </Timeline>
          </div>
        </div>
      )}

      {/* Task Completion Badge - only show after all steps including chart */}
      {currentStep > 5 && (
        <div className="flex items-center justify-center mt-6">
          <div className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-full">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-green-800 font-medium">故障修复任务已完成</span>
          </div>
        </div>
      )}
    </div>
  )
} 