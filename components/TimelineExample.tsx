import { Timeline, TimelineItem } from "@/components/ui/timeline"
import { FileText, Network, AlertTriangle, Search, Terminal, Shield, CheckCircle, Clock, XCircle } from "lucide-react"

export default function TimelineExample() {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">故障修复时间线</h2>
      
      <Timeline>
        <TimelineItem
          title="制定修复计划"
          description="分析故障范围和影响，制定详细的修复计划"
          time="14:30"
          status="completed"
          icon={<CheckCircle className="w-4 h-4" />}
        />
        
        <TimelineItem
          title="网络拓扑分析"
          description="查看网络拓扑结构，识别故障节点和影响范围"
          time="14:32"
          status="completed"
          icon={<Network className="w-4 h-4" />}
        />
        
        <TimelineItem
          title="告警信息检查"
          description="检查系统告警信息，确认故障类型和严重程度"
          time="14:35"
          status="completed"
          icon={<AlertTriangle className="w-4 h-4" />}
        />
        
        <TimelineItem
          title="故障根因分析"
          description="进行故障根因分析，确定最佳修复方案"
          time="14:38"
          status="in-progress"
          icon={<Clock className="w-4 h-4" />}
        >
          <div className="mt-2 text-sm text-blue-600">
            正在执行诊断命令，分析日志文件...
          </div>
        </TimelineItem>
        
        <TimelineItem
          title="执行恢复策略"
          description="生成并执行自动恢复策略，修复网络故障"
          time="预计 14:45"
          status="pending"
          icon={<Terminal className="w-4 h-4" />}
        />
        
        <TimelineItem
          title="验证修复效果"
          description="验证修复效果，确认网络服务恢复正常"
          time="预计 14:50"
          status="pending"
          icon={<Shield className="w-4 h-4" />}
        />
      </Timeline>
    </div>
  )
} 