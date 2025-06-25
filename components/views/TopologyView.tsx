import { Network } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useStreamingText } from "../../hooks/useStreamingText"

interface TopologyViewProps {
  shouldStart?: boolean
}

export default function TopologyView({ shouldStart = false }: TopologyViewProps) {
  const statusText = "检测到交换机 B 出现故障，影响网络连通性"
  const { displayedText } = useStreamingText(statusText, 50, shouldStart)

  return (
    <div className="h-full bg-gray-900 p-6">
      <div className="text-white">
        <h2 className="text-xl font-bold mb-4">网络拓扑图</h2>
        <div className="bg-gray-800 rounded-lg p-6 h-96 flex items-center justify-center">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-2">
                <Network className="w-8 h-8" />
              </div>
              <span className="text-sm">路由器 A</span>
              <Badge variant="secondary" className="mt-1">
                正常
              </Badge>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mb-2">
                <Network className="w-8 h-8" />
              </div>
              <span className="text-sm">交换机 B</span>
              <Badge variant="destructive" className="mt-1">
                故障
              </Badge>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mb-2">
                <Network className="w-8 h-8" />
              </div>
              <span className="text-sm">服务器 C</span>
              <Badge variant="outline" className="mt-1">
                警告
              </Badge>
            </div>
          </div>
        </div>
        <div className="mt-4 text-sm text-gray-300">
          <p>{displayedText}</p>
        </div>
      </div>
    </div>
  )
}
