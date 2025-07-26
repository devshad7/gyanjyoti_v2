import { useState } from "react"

export interface Toast {
  id?: string
  title?: string
  description?: string
  variant?: "default" | "destructive"
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = ({ title, description, variant = "default" }: Toast) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newToast = { id, title, description, variant }
    
    setToasts(prev => [...prev, newToast])
    
    // Show browser notification for now (you can replace with a proper toast system)
    if (title || description) {
      if (variant === "destructive") {
        console.error(`Error: ${title}`, description)
        alert(`Error: ${title}\n${description}`)
      } else {
        console.log(`Success: ${title}`, description)
        alert(`Success: ${title}\n${description}`)
      }
    }
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 5000)
    
    return id
  }

  const dismiss = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }

  return {
    toast,
    dismiss,
    toasts
  }
}
