import { useStreamingText } from "../../hooks/useStreamingText"

interface AnalysisViewProps {
  shouldStart?: boolean
}

export default function AnalysisView({ shouldStart = false }: AnalysisViewProps) {
  const analysisContent = `$ 开始故障诊断分析...
正在检查网络连通性...
✓ 路由器 A: 连接正常
✗ 交换机 B: 连接失败
⚠ 服务器 C: 连接不稳定

正在分析故障根因...
检查硬件状态...
检查配置文件...
检查日志文件...

诊断结果:
• 交换机 B 端口故障
• 备用链路可用
• 建议切换到备用路径

生成修复建议...
推荐修复方案: 启用备用链路并重新路由流量`

  const { displayedText } = useStreamingText(analysisContent, 80, shouldStart)

  return (
    <div className="h-full bg-gray-900 text-white font-mono text-sm p-4">
      <div className="space-y-2">
        <div className="whitespace-pre-line">
          {displayedText}
          {shouldStart && displayedText && <span className="animate-pulse">|</span>}
        </div>
      </div>
    </div>
  )
}
