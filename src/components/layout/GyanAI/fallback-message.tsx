"use client"

import { Button } from "@/components/ui/button"
import { AlertTriangle, Clock } from "lucide-react"

interface FallbackMessageProps {
  onRetry: () => void
  error?: string
  isRateLimit?: boolean
}

export function FallbackMessage({ onRetry, error, isRateLimit }: FallbackMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center p-6 text-center rounded-xl border border-gray-200 bg-white shadow-sm">
      {isRateLimit ? (
        <Clock className="h-10 w-10 text-yellow-500 mb-4" />
      ) : (
        <AlertTriangle className="h-10 w-10 text-yellow-500 mb-4" />
      )}

      <h3 className="text-lg font-semibold mb-2">
        {isRateLimit ? "Service Temporarily Busy" : "Connection Error"}
      </h3>

      <p className="text-gray-600 mb-4 max-w-md">
        {isRateLimit
          ? "The AI service is currently experiencing high demand. This happens because we're using the free tier of the API which has usage limits."
          : error || "We couldn't connect to the AI service. This could be due to API limits or network issues."}
      </p>

      <div className="flex gap-4">
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
        >
          Try Again
        </button>

        {isRateLimit && (
          <button
            onClick={() => window.open("https://ai.google.dev/gemini-api/docs/rate-limits", "_blank")}
            className="px-4 py-2 border border-blue-600 text-blue-600 hover:bg-blue-50 rounded-md"
          >
            Learn More
          </button>
        )}
      </div>

      {isRateLimit && (
        <div className="mt-4 text-sm text-gray-500">
          Try asking a simpler question or wait a minute before trying again.
        </div>
      )}
    </div>
  )
}
