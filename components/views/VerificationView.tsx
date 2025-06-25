import { CheckCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface VerificationViewProps {
  shouldStart?: boolean
}

export default function VerificationView({ shouldStart = false }: VerificationViewProps) {
  return (
    <div className="h-full bg-white p-4">
      <h2 className="text-xl font-bold text-gray-900 mb-4">恢复验证</h2>
      <div className="space-y-4">
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <div className="font-semibold text-green-800">网络连通性测试</div>
                <div className="text-sm text-green-600">所有节点连接正常</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <div className="font-semibold text-green-800">服务可用性检查</div>
                <div className="text-sm text-green-600">所有服务运行正常</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <div className="font-semibold text-green-800">告警状态</div>
                <div className="text-sm text-green-600">所有严重告警已清除</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">修复总结</h3>
          <p className="text-sm text-blue-700">
            故障已成功修复。通过启用备用链路，网络服务已恢复正常。建议后续更换故障交换机以确保系统稳定性。
          </p>
        </div>
      </div>
    </div>
  )
}
