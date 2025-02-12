export interface Message {
    content: string
    role: "user" | "assistant"
  }
  
  export interface SystemMessage {
    role: "system"
    content: string
  }
  
  export interface APIMessage {
    role: "user" | "assistant"
    content: string
  }
  
  export interface ClaudeResponse {
    id: string
    message: {
      content: string
      role: string
    }
  }