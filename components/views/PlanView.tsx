import { useStreamingText } from "../../hooks/useStreamingText"
import { FileText, Calendar, User, Clock } from "lucide-react"

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

  const { displayedText } = useStreamingText(planContent, 20, shouldStart)

  return (
    <div className="h-full bg-gray-50 p-4 overflow-hidden">
      {/* 文件头部 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-4 h-70 flex flex-col">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50 rounded-t-lg">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            <span className="font-medium text-gray-900">fault_recovery_plan.md</span>
            {shouldStart && (
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                正在编写...
              </div>
            )}
          </div>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <User className="w-3 h-3" />
              UI智能体
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {new Date().toLocaleDateString()}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {new Date().toLocaleTimeString()}
            </div>
          </div>
        </div>
        
        {/* 文件内容区域 */}
        <div className="flex-1 p-6 bg-white overflow-hidden">
          <div className="h-full overflow-y-auto">
            <div className="font-mono text-sm leading-relaxed">
              <div className="whitespace-pre-line text-gray-800">
                {displayedText}
                {shouldStart && displayedText && (
                  <span className="inline-block w-2 h-5 bg-blue-600 animate-pulse ml-0.5"></span>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* 状态栏 */}
        <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-t border-gray-100 rounded-b-lg text-xs text-gray-500 flex-shrink-0">
          <div className="flex items-center gap-4">
            <span>行 {displayedText.split('\n').length}</span>
            <span>字符 {displayedText.length}</span>
            <span>UTF-8</span>
          </div>
          <div className="flex items-center gap-2">
            {shouldStart && displayedText && (
              <>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  已保存
                </div>
                <span>Markdown</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
