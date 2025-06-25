import { useStreamingText } from "../../hooks/useStreamingText"
import { Terminal, Minimize2, Square, X, Calendar, User, Clock } from "lucide-react"

interface RecoveryViewProps {
  shouldStart?: boolean
}

export default function RecoveryView({ shouldStart = false }: RecoveryViewProps) {
  const recoveryContent = `$ curl -X POST https://api.network.com/v1/failover/execute
{"status": "success", "task_id": "failover_20240115_143045"}

$ ./network_failover_script.sh --primary-down --switch-to-backup
[INFO] 网络倒换脚本启动
[INFO] 检测主链路状态: PRIMARY_LINK_DOWN
[INFO] 启动自动倒换流程...
[INFO] 关闭主链路接口 eth0
[SUCCESS] 主接口已安全关闭
[INFO] 激活备用链路 eth1
[SUCCESS] 备用接口已启用
[INFO] 更新路由表配置
[SUCCESS] 路由已切换至备用路径
[INFO] 应用流量倒换策略
[SUCCESS] 流量已重定向至备用链路
$ ping -c 2 8.8.8.8
PING 8.8.8.8: 56 data bytes
64 bytes from 8.8.8.8: icmp_seq=0 ttl=118 time=15.2 ms
64 bytes from 8.8.8.8: icmp_seq=1 ttl=118 time=14.8 ms
[SUCCESS] 网络连通性验证通过
[INFO] 倒换操作完成，服务已恢复`

  const { displayedText } = useStreamingText(recoveryContent, 16, shouldStart)

  return (
    <div className="h-full bg-gray-50 p-4 overflow-hidden">
      {/* 终端窗口 */}
      <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-200 mb-4 h-168 flex flex-col">
        {/* 终端头部 */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700 bg-gray-800 rounded-t-lg">
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-green-400" />
            <span className="font-medium text-gray-200">recovery_terminal.sh</span>
            {shouldStart && (
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                正在执行...
              </div>
            )}
          </div>
          <div className="flex items-center gap-4 text-xs text-gray-400">
            <div className="flex items-center gap-1">
              <User className="w-3 h-3" />
              root@recovery-server
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {new Date().toLocaleDateString()}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {new Date().toLocaleTimeString()}
            </div>
            <div className="flex items-center gap-1">
              <Minimize2 className="w-3 h-3 text-gray-500 hover:text-gray-300 cursor-pointer" />
              <Square className="w-3 h-3 text-gray-500 hover:text-gray-300 cursor-pointer" />
              <X className="w-3 h-3 text-gray-500 hover:text-red-400 cursor-pointer" />
            </div>
          </div>
        </div>
        
        {/* 终端内容区域 */}
        <div className="flex-1 p-4 bg-gray-900 overflow-hidden">
          <div className="h-full overflow-y-auto">
            <div className="font-mono text-sm leading-relaxed">
              <div className="whitespace-pre-line text-gray-100">
                {displayedText}
                {shouldStart && displayedText && (
                  <span className="inline-block w-2 h-5 bg-green-400 animate-pulse ml-0.5"></span>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* 终端状态栏 */}
        <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-t border-gray-700 rounded-b-lg text-xs text-gray-400 flex-shrink-0">
          <div className="flex items-center gap-4">
            <span>行 {displayedText.split('\n').length}</span>
            <span>字符 {displayedText.length}</span>
            <span>bash</span>
          </div>
          <div className="flex items-center gap-2">
            {shouldStart && displayedText && (
              <>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                  运行中
                </div>
                <span>exit code: 0</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
