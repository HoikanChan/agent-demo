import { FileText, Network, AlertTriangle, Search, Wrench, Shield } from "lucide-react"
import type { Step } from "../types"

export const STEPS: Step[] = [
  {
    id: 1,
    title: "Plan Detail",
    description: "制定故障修复计划",
    icon: FileText,
    status: "completed",
    view: "plan",
  },
  {
    id: 2,
    title: "打开拓扑",
    description: "查看网络拓扑结构",
    icon: Network,
    status: "completed",
    view: "topology",
  },
  {
    id: 3,
    title: "打开告警",
    description: "检查系统告警信息",
    icon: AlertTriangle,
    status: "completed",
    view: "alerts",
  },
  {
    id: 4,
    title: "分析故障情况",
    description: "故障诊断和根因分析",
    icon: Search,
    status: "completed",
    view: "analysis",
  },
  {
    id: 5,
    title: "自动恢复",
    description: "生成并执行恢复策略",
    icon: Wrench,
    status: "in-progress",
    view: "recovery",
    substeps: [
      { title: "生成恢复策略", status: "completed" },
      { title: "执行恢复策略", status: "in-progress" },
    ],
  },
  {
    id: 6,
    title: "检测网络恢复",
    description: "验证修复效果",
    icon: Shield,
    status: "pending",
    view: "verification",
  },
]
