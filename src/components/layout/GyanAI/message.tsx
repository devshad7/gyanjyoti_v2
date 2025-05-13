import { cn } from "@/lib/utils"
import { BookOpen, User } from "lucide-react"
import ReactMarkdown from "react-markdown"
const GyanLogo  = "/assets/Gyan_logo.png"
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

  return (
    <div className={cn("flex items-start gap-3 md:gap-4 group", isUser ? "justify-end" : "justify-start")}>
      {!isUser && (
        <div className="h-8 w-12 md:h-10 md:w-10 rounded-full bg-blue-200 flex items-center justify-center flex-shrink-0">
          <img src={GyanLogo} alt="Gyan Logo" className="h-6 w-14 md:h-5 md:w-8 text-blue-600" />
        </div>
      )}

      <div
        className={cn(
          "rounded-xl px-4 py-3 md:px-5 md:py-3 max-w-[85%] shadow-sm",
          isUser
            ? "bg-blue-600 text-white"
            : "bg-white border border-gray-200 text-gray-900"
        )}
      >
        {isUser ? (
          <p className="text-sm md:text-base">{message.content}</p>
        ) : (
          <div className="prose prose-sm md:prose-base max-w-none prose-headings:text-blue-600 prose-a:text-blue-600">
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </div>
        )}
        <div className={cn("text-xs mt-1", isUser ? "text-blue-100" : "text-gray-500")}>
          {new Date(message.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </div>
      </div>

      {isUser && (
        <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0">
          <User className="h-4 w-4 md:h-5 md:w-5 text-pink-600" />
        </div>
      )}
    </div>
  )
}
