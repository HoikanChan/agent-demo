import { useStreamingText } from "../../hooks/useStreamingText"

interface PlanViewProps {
  shouldStart?: boolean
}

export default function PlanView({ shouldStart = false }: PlanViewProps) {
  const planContent = `故障修复计划

故障概述
检测到网络服务异常，影响用户访问。需要进行系统性的故障排查和修复。

修复步骤
1. 查看网络拓扑，了解当前网络状态
2. 检查系统告警，识别异常组件
3. 分析故障根因，确定修复方案
4. 自动生成恢复策略
5. 执行恢复操作
6. 验证修复效果

预期结果
完成修复后，网络服务应恢复正常，所有告警清除，用户可正常访问系统。`

  const { displayedText } = useStreamingText(planContent, 30, shouldStart)

  return (
    <div className="h-full bg-white p-4">
      <div className="prose prose-sm max-w-none">
        <div className="whitespace-pre-line text-gray-700">
          {displayedText}
          {shouldStart && displayedText && <span className="animate-pulse">|</span>}
        </div>
      </div>
    </div>
  )
}
