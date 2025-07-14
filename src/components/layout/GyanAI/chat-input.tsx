"use client"

import { useState, type FormEvent, type KeyboardEvent } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Send, Loader2, Sparkles } from "lucide-react"

interface ChatInputProps {
  onSendMessage: (message: string) => void
  isLoading: boolean
  disabled?: boolean
}

export function ChatInput({ onSendMessage, isLoading, disabled }: ChatInputProps) {
  const [message, setMessage] = useState("")

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (message.trim() && !isLoading && !disabled) {
      onSendMessage(message)
      setMessage("")
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const getPlaceholder = () => {
    if (disabled) return "Service temporarily unavailable due to high demand..."
    return "Ask any educational question... (Press Enter to send)"
  }

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="flex items-end gap-3">
        <div className="relative flex-1">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={getPlaceholder()}
            className="min-h-[56px] pr-12 resize-none rounded-2xl border-gray-200 bg-white/90 backdrop-blur-sm focus:border-[#275cc3] focus:ring-2 focus:ring-[#275cc3]/20 focus:ring-opacity-50 transition-all duration-200 shadow-sm hover:shadow-md"
            disabled={isLoading || disabled}
          />
          <div className="absolute right-3 bottom-3 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-[#f1ab0f]" />
            <span className="text-xs text-gray-400 hidden sm:inline">AI powered</span>
          </div>
        </div>
        <Button
          type="submit"
          size="icon"
          disabled={isLoading || !message.trim() || disabled}
          className="h-14 w-14 rounded-2xl bg-gradient-to-br from-[#275cc3] to-[#e20869] text-white shadow-lg shadow-[#275cc3]/25 hover:shadow-xl hover:shadow-[#275cc3]/30 transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Send className="h-5 w-5" />
          )}
        </Button>
      </form>
      
      {/* Hint text */}
      <div className="flex items-center justify-between mt-2 px-1">
        <p className="text-xs text-gray-500">
          {message.length > 0 && !disabled && (
            <span>Press Shift + Enter for new line</span>
          )}
        </p>
        <p className="text-xs text-gray-400">
          {message.length}/2000
        </p>
      </div>
    </div>
  )
}
