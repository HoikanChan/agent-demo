export type CallbackType = 
  | 'browse-topology-analysis'     // 故障分析阶段的拓扑查看
  | 'browse-topology-verification' // 修复验证阶段的拓扑查看
  | 'browse-alerts'
  | 'click-alert-details'

export interface CallbackData {
  stepName: string
  timestamp: number
  metadata?: Record<string, any>
}

export type CallbackFunction = (data: CallbackData) => void | Promise<void>

export class CallbackManager {
  private callbacks: Map<CallbackType, CallbackFunction[]> = new Map()

  constructor() {
    // 初始化回调类型
    this.callbacks.set('browse-topology-analysis', [])
    this.callbacks.set('browse-topology-verification', [])
    this.callbacks.set('browse-alerts', [])
    this.callbacks.set('click-alert-details', [])
  }

  /**
   * 注册回调函数
   * @param type 回调类型
   * @param callback 回调函数
   */
  register(type: CallbackType, callback: CallbackFunction): void {
    const callbacks = this.callbacks.get(type) || []
    callbacks.push(callback)
    this.callbacks.set(type, callbacks)
  }

  /**
   * 注销回调函数
   * @param type 回调类型
   * @param callback 要注销的回调函数
   */
  unregister(type: CallbackType, callback: CallbackFunction): void {
    const callbacks = this.callbacks.get(type) || []
    const filteredCallbacks = callbacks.filter(cb => cb !== callback)
    this.callbacks.set(type, filteredCallbacks)
  }

  /**
   * 触发回调
   * @param type 回调类型
   * @param stepName 步骤名称
   * @param metadata 额外的元数据
   */
  async trigger(type: CallbackType, stepName: string, metadata?: Record<string, any>): Promise<void> {
    const callbacks = this.callbacks.get(type) || []
    
    const data: CallbackData = {
      stepName,
      timestamp: Date.now(),
      metadata
    }

    // 并行执行所有回调
    const promises = callbacks.map(callback => {
      try {
        return Promise.resolve(callback(data))
      } catch (error) {
        console.error(`回调执行失败 [${type}]:`, error)
        return Promise.resolve()
      }
    })

    await Promise.allSettled(promises)
  }

  /**
   * 获取指定类型的回调数量
   * @param type 回调类型
   */
  getCallbackCount(type: CallbackType): number {
    return this.callbacks.get(type)?.length || 0
  }

  /**
   * 清空所有回调
   */
  clear(): void {
    this.callbacks.forEach((_, type) => {
      this.callbacks.set(type, [])
    })
  }

  /**
   * 清空指定类型的回调
   * @param type 回调类型
   */
  clearType(type: CallbackType): void {
    this.callbacks.set(type, [])
  }

  /**
   * 获取所有已注册的回调类型
   */
  getRegisteredTypes(): CallbackType[] {
    return Array.from(this.callbacks.keys())
  }
}

// 创建全局实例
export const callbackManager = new CallbackManager()

// 便捷方法
export const registerCallback = (type: CallbackType, callback: CallbackFunction) => {
  callbackManager.register(type, callback)
}

export const triggerCallback = (type: CallbackType, stepName: string, metadata?: Record<string, any>) => {
  return callbackManager.trigger(type, stepName, metadata)
} 