export interface Step {
  id: number
  title: string
  description: string
  icon: any
  status: "completed" | "in-progress" | "pending"
  view: string
  substeps?: { title: string; status: string }[]
}

export type ViewType = "plan" | "topology" | "alerts" | "analysis" | "recovery" | "verification"

export type InterfaceState = "chat-only" | "full-interface"

export interface StreamingContent {
  content: string
  isComplete: boolean
}
