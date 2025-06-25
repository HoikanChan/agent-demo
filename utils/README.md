# CallbackManager 使用说明

CallbackManager 是一个用于管理步骤回调的工具类，可以在特定的UI操作步骤中触发自定义的回调函数。

## 功能特性

- 🎯 **类型安全**: 使用TypeScript提供完整的类型支持
- 🔄 **异步支持**: 支持同步和异步回调函数
- 📊 **多回调**: 每个类型可以注册多个回调函数
- 🛡️ **错误处理**: 内置错误处理，单个回调失败不影响其他回调
- 🧹 **内存管理**: 提供清理和注销功能

## 支持的回调类型

| 回调类型 | 描述 | 触发时机 |
|---------|------|---------|
| `browse-topology-analysis` | 故障分析阶段浏览网络拓扑图页面 | 第2步开始进行时自动触发或用户点击时 |
| `browse-topology-verification` | 修复验证阶段浏览网络拓扑图页面 | 第6步开始进行时自动触发或用户点击时 |
| `browse-alerts` | 浏览告警监控页面 | 告警步骤的子步骤开始时自动触发 |
| `click-alert-details` | 点击查看告警详情 | 告警详情子步骤开始时自动触发 |

## 基本用法

### 1. 注册回调函数

```typescript
import { registerCallback } from '@/utils/CallbackManager'

// 注册故障分析阶段的拓扑页面回调
registerCallback('browse-topology-analysis', async (data) => {
  console.log('用户浏览了故障分析拓扑页面:', data.stepName)
  console.log('时间戳:', data.timestamp)
  console.log('元数据:', data.metadata)
  
  // 执行自定义逻辑
  await sendAnalyticsEvent(data)
})
```

### 2. 使用CallbackManager类

```typescript
import { CallbackManager } from '@/utils/CallbackManager'

const manager = new CallbackManager()

// 注册回调
manager.register('browse-alerts', (data) => {
  console.log('告警页面被访问:', data)
})

// 触发回调
await manager.trigger('browse-alerts', '浏览告警监控页面', {
  alertCount: 5,
  severity: 'critical'
})

// 获取统计信息
const count = manager.getCallbackCount('browse-alerts')
console.log('已注册的回调数量:', count)
```

### 3. 使用全局实例

```typescript
import { callbackManager } from '@/utils/CallbackManager'

// 直接使用全局实例
callbackManager.register('click-alert-details', (data) => {
  if (data.metadata?.triggeredBy === 'user-click') {
    console.log('用户主动点击了告警详情')
  } else {
    console.log('自动触发了告警详情查看')
  }
})
```

## 回调数据结构

每个回调函数接收一个 `CallbackData` 对象：

```typescript
interface CallbackData {
  stepName: string           // 步骤名称
  timestamp: number          // 触发时间戳
  metadata?: {               // 可选的元数据
    stepIndex?: number       // 步骤索引
    conclusion?: string      // 步骤结论
    viewName?: string        // 视图名称
    triggeredBy?: string     // 触发方式 ('user-click' | 'auto')
    [key: string]: any       // 其他自定义数据
  }
}
```

## 高级用法

### 批量注册回调

```typescript
import { setupCallbacks } from '@/examples/CallbackExample'

// 一次性注册所有回调
setupCallbacks()
```

### 动态管理回调

```typescript
import { callbackManager } from '@/utils/CallbackManager'

// 创建回调函数
const myCallback = (data) => console.log('我的回调:', data)

// 注册
callbackManager.register('browse-topology', myCallback)

// 注销特定回调
callbackManager.unregister('browse-topology', myCallback)

// 清空某类型的所有回调
callbackManager.clearType('browse-topology')

// 清空所有回调
callbackManager.clear()
```

### 错误处理

```typescript
registerCallback('browse-alerts', async (data) => {
  try {
    await riskyOperation(data)
  } catch (error) {
    // 错误会被自动捕获并记录，不会影响其他回调
    console.error('回调执行失败:', error)
  }
})
```

## 实际应用场景

### 1. 用户行为分析

```typescript
registerCallback('browse-topology', async (data) => {
  // 发送用户行为数据到分析平台
  await analytics.track('topology_viewed', {
    timestamp: data.timestamp,
    step: data.stepName,
    session_id: getCurrentSessionId()
  })
})
```

### 2. 系统监控

```typescript
registerCallback('click-alert-details', async (data) => {
  // 记录告警查看行为，用于系统监控
  await monitoring.log('alert_details_viewed', {
    alert_info: data.metadata?.conclusion,
    view_time: data.timestamp,
    trigger_type: data.metadata?.triggeredBy
  })
})
```

### 3. 自动化测试

```typescript
registerCallback('browse-alerts', (data) => {
  // 在测试环境中验证步骤执行
  if (process.env.NODE_ENV === 'test') {
    window.testEvents = window.testEvents || []
    window.testEvents.push({
      type: 'browse-alerts',
      data: data
    })
  }
})
```

## 注意事项

1. **异步回调**: 回调函数可以是异步的，系统会等待所有回调完成
2. **错误隔离**: 单个回调的错误不会影响其他回调的执行
3. **内存管理**: 在组件卸载时记得清理不需要的回调
4. **性能考虑**: 避免在回调中执行耗时操作，考虑使用防抖或节流

## 调试技巧

```typescript
// 开启调试模式
registerCallback('browse-topology', (data) => {
  console.group('🌐 拓扑页面回调')
  console.log('步骤名称:', data.stepName)
  console.log('触发时间:', new Date(data.timestamp))
  console.log('元数据:', data.metadata)
  console.groupEnd()
})

// 获取所有已注册的回调类型
console.log('已注册的回调类型:', callbackManager.getRegisteredTypes())
``` 