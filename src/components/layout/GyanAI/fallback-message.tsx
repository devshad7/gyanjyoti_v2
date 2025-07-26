"use client"

import { Button } from "@/components/ui/button"
import { AlertTriangle, Clock, RefreshCw, ExternalLink } from "lucide-react"

interface FallbackMessageProps {
  onRetry: () => void
  error?: string
  isRateLimit?: boolean
}

export function FallbackMessage({ onRetry, error, isRateLimit }: FallbackMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center rounded-2xl border border-gray-100 bg-white/80 backdrop-blur-sm shadow-lg">
      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
        isRateLimit 
          ? "bg-gradient-to-br from-[#f1ab0f] to-[#e20869] shadow-lg shadow-[#f1ab0f]/25" 
          : "bg-gradient-to-br from-[#e20869] to-[#275cc3] shadow-lg shadow-[#e20869]/25"
      }`}>
        {isRateLimit ? (
          <Clock className="h-8 w-8 text-white" />
        ) : (
          <AlertTriangle className="h-8 w-8 text-white" />
        )}
      </div>

      <h3 className="text-xl font-bold mb-3 text-gray-900">
        {isRateLimit ? "Service Temporarily Busy" : "Connection Error"}
      </h3>

      <p className="text-gray-600 mb-6 max-w-md leading-relaxed">
        {isRateLimit
          ? "The AI service is experiencing high demand. This happens due to API usage limits on the free tier."
          : error || "We couldn't connect to the AI service. This could be due to API limits or network issues."}
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          onClick={onRetry}
          className="px-6 py-3 bg-gradient-to-r from-[#275cc3] to-[#e20869] hover:from-[#275cc3]/90 hover:to-[#e20869]/90 text-white rounded-xl shadow-lg shadow-[#275cc3]/25 hover:shadow-xl hover:shadow-[#275cc3]/30 transition-all duration-200 flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Try Again
        </Button>

        {isRateLimit && (
          <Button
            variant="outline"
            onClick={() => window.open("https://ai.google.dev/gemini-api/docs/rate-limits", "_blank")}
            className="px-6 py-3 border-[#275cc3]/30 text-[#275cc3] hover:bg-[#275cc3]/10 rounded-xl transition-all duration-200 flex items-center gap-2"
          >
            <ExternalLink className="h-4 w-4" />
            Learn More
          </Button>
        )}
      </div>

      {isRateLimit && (
        <div className="mt-6 text-sm text-gray-500 bg-[#f1ab0f]/10 px-4 py-3 rounded-xl border border-[#f1ab0f]/20">
          💡 Try asking a simpler question or wait a moment before trying again.
        </div>
      )}
    </div>
  )
}
