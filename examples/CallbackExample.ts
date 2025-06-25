import { registerCallback, callbackManager, type CallbackData } from '../utils/CallbackManager'

// 示例：注册回调函数
export function setupCallbacks() {
  // 故障分析阶段的拓扑查看回调
  registerCallback('browse-topology-analysis', async (data: CallbackData) => {
    alert(`browse-topology-analysis: 故障分析阶段查看拓扑 (触发方式: ${data.metadata?.triggeredBy || 'unknown'})`)
  })

  // 修复验证阶段的拓扑查看回调
  registerCallback('browse-topology-verification', async (data: CallbackData) => {
    alert(`browse-topology-verification: 修复验证阶段查看拓扑 (触发方式: ${data.metadata?.triggeredBy || 'unknown'})`)
  })

  // 浏览告警监控页面的回调
  registerCallback('browse-alerts', async (data: CallbackData) => {
    alert(`browse-alerts: 浏览告警监控页面 (触发方式: ${data.metadata?.triggeredBy || 'unknown'})`)
  })

  // 点击查看告警详情的回调
  registerCallback('click-alert-details', async (data: CallbackData) => {
    alert(`click-alert-details: 点击查看告警详情 (触发方式: ${data.metadata?.triggeredBy || 'unknown'})`)
  })
}

// 示例：清理回调
export function cleanupCallbacks() {
  callbackManager.clear()
  console.log('🧹 所有回调已清理')
}

// 示例：获取回调统计信息
export function getCallbackStats() {
  const stats = {
    browseTopologyAnalysis: callbackManager.getCallbackCount('browse-topology-analysis'),
    browseTopologyVerification: callbackManager.getCallbackCount('browse-topology-verification'),
    browseAlerts: callbackManager.getCallbackCount('browse-alerts'),
    clickAlertDetails: callbackManager.getCallbackCount('click-alert-details')
  }
  
  console.log('📊 回调统计:', stats)
  return stats
}

// 示例：动态添加回调
export function addCustomCallback() {
  const customCallback = (data: CallbackData) => {
    console.log('🎯 自定义回调被触发:', data.stepName)
  }
  
  // 为所有类型注册同一个回调
  callbackManager.register('browse-topology-analysis', customCallback)
  callbackManager.register('browse-topology-verification', customCallback)
  callbackManager.register('browse-alerts', customCallback)
  callbackManager.register('click-alert-details', customCallback)
} 