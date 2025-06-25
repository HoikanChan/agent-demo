import { AlertTriangle, AlertCircle, Activity } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface AlertsViewProps {
  shouldStart?: boolean
}

export default function AlertsView({ shouldStart = false }: AlertsViewProps) {
  return (
    <div className="h-full bg-white p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">系统告警</h2>
      <div className="space-y-3">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <div>
                <div className="font-semibold text-red-800">严重告警</div>
                <div className="text-sm text-red-600">交换机 B 连接中断</div>
                <div className="text-xs text-red-500">2024-01-15 14:30:25</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
              <div>
                <div className="font-semibold text-yellow-800">警告</div>
                <div className="text-sm text-yellow-600">服务器 C CPU 使用率过高</div>
                <div className="text-xs text-yellow-500">2024-01-15 14:28:10</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Activity className="w-5 h-5 text-blue-600" />
              <div>
                <div className="font-semibold text-blue-800">信息</div>
                <div className="text-sm text-blue-600">路由器 A 状态正常</div>
                <div className="text-xs text-blue-500">2024-01-15 14:25:00</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
