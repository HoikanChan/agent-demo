import { useStreamingText } from "../../hooks/useStreamingText"

interface RecoveryViewProps {
  shouldStart?: boolean
}

export default function RecoveryView({ shouldStart = false }: RecoveryViewProps) {
  const recoveryContent = `$ 执行自动恢复策略...
步骤 1: 生成恢复脚本
✓ 恢复脚本已生成

步骤 2: 执行恢复操作
正在执行: switch_to_backup_link.sh

#!/bin/bash
# 启用备用链路
ifconfig eth1 up
route add default gw 192.168.1.1 eth1
# 重新配置路由表
iptables -t nat -A POSTROUTING -o eth1 -j MASQUERADE

✓ 备用链路已启用
✓ 路由表已更新
正在验证连接...`

  const { displayedText } = useStreamingText(recoveryContent, 60, shouldStart)

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
