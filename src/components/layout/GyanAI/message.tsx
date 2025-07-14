import { cn } from "@/lib/utils"
import { BookOpen, User, Copy, Check } from "lucide-react"
import ReactMarkdown from "react-markdown"
import { useState, useEffect } from "react"
import { TypingIndicator } from "./typing-indicator"
const GyanLogo = "/assets/Gyan_logo.png"

interface MessageProps {
  message: {
    id: string
    role: "user" | "assistant"
    content: string
    timestamp: string
  }
}

export function Message({ message }: MessageProps) {
  const isUser = message.role === "user"
  const [copied, setCopied] = useState(false)
  const [isLoading, setIsLoading] = useState(!isUser && !message.content)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text:", err)
    }
  }

  // Remove loading state when content appears
  useEffect(() => {
    if (!isUser && message.content) {
      setIsLoading(false)
    }
  }, [message.content, isUser])

  return (
    <div className={cn("flex items-start gap-2 sm:gap-4 group animate-slide-up px-2 sm:px-0", isUser ? "justify-end" : "justify-start")}>
      {!isUser && (
        <div className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 rounded-xl bg-gradient-to-br from-[#275cc3] to-[#e20869] flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#275cc3]/25">
          <img src={GyanLogo} alt="Gyan AI Assistant" className="h-3 w-3 sm:h-4 sm:w-4 md:h-6 md:w-6 object-contain filter brightness-0 invert" />
        </div>
      )}

      <div
        className={cn(
          "rounded-2xl px-3 py-3 sm:px-5 sm:py-4 shadow-sm relative transition-all duration-200 hover:shadow-md overflow-hidden",
          isUser
            ? "bg-gradient-to-br from-[#275cc3] to-[#e20869] text-white max-w-[75%] sm:max-w-[70%] ml-2 sm:ml-12"
            : "bg-white border border-gray-100 text-gray-900 max-w-[75%] sm:max-w-[65%] md:max-w-[70%] min-w-0"
        )}
      >
        {/* Copy button for non-user messages */}
        {!isUser && !isLoading && (
          <button
            onClick={handleCopy}
            className="absolute top-2 right-2 sm:top-3 sm:right-3 opacity-0 group-hover:opacity-100 transition-opacity p-1 sm:p-1.5 rounded-lg hover:bg-gray-100"
            title="Copy message"
          >
            {copied ? (
              <Check className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
            ) : (
              <Copy className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500" />
            )}
          </button>
        )}

        {/* Loading indicator for bot messages */}
        {!isUser && isLoading && (
          <TypingIndicator />
        )}

        {isUser ? (
          <p className="text-sm sm:text-base leading-relaxed break-words overflow-wrap-anywhere">{message.content}</p>
        ) : !isLoading ? (
          <div className="prose prose-sm sm:prose-base max-w-none prose-headings:text-[#275cc3] prose-a:text-[#275cc3] prose-p:text-gray-700 prose-strong:text-gray-900 prose-code:bg-[#275cc3]/10 prose-code:text-[#275cc3] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-pre:overflow-x-auto prose-pre:max-w-full">
            <div className="break-words overflow-wrap-anywhere min-w-0">
              <ReactMarkdown 
                components={{
                  pre: ({ children }) => (
                    <pre className="overflow-x-auto whitespace-pre-wrap break-words max-w-full min-w-0">
                      {children}
                    </pre>
                  ),
                  code: ({ children, className }) => {
                    const isInline = !className;
                    return isInline ? (
                      <code className="break-words whitespace-pre-wrap">{children}</code>
                    ) : (
                      <code className="block overflow-x-auto whitespace-pre-wrap break-words min-w-0">
                        {children}
                      </code>
                    );
                  },
                  p: ({ children }) => (
                    <p className="break-words overflow-wrap-anywhere whitespace-pre-wrap">{children}</p>
                  )
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          </div>
        ) : null}
        
        <div className={cn("text-xs mt-2 flex items-center gap-2", isUser ? "text-white/80" : "text-gray-500")}>
          <span>
            {new Date(message.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </span>
        </div>
      </div>

      {isUser && (
        <div className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 rounded-xl bg-gradient-to-br from-[#f1ab0f] to-[#e20869] flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#f1ab0f]/25">
          <User className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-white" />
        </div>
      )}
    </div>
  )
}
