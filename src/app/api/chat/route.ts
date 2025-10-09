import { NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

// ✅ Initialize Gemini (ensure latest SDK installed: npm install @google/generative-ai@latest)
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || "")

// Simple in-memory cache
const responseCache = new Map<string, string>()

export async function POST(req: Request) {
  try {
    const { message } = await req.json()

    if (!process.env.GOOGLE_AI_API_KEY) {
      console.error("GOOGLE_AI_API_KEY is not defined")
      return NextResponse.json(
        { error: "API key is not configured" },
        { status: 500 },
      )
    }

    if (!message || !message.trim()) {
      return NextResponse.json(
        { error: "Message cannot be empty" },
        { status: 400 },
      )
    }

    // Cache lookup
    const cacheKey = message.trim().toLowerCase()
    if (responseCache.has(cacheKey)) {
      console.log("✅ Using cached response")
      return NextResponse.json({ response: responseCache.get(cacheKey) })
    }

    // ✅ Use available model (gemini-1.5-flash is faster and available)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    const prompt = `
You are **Gyanjyoti AI**, an educational assistant designed to help students learn and understand various subjects.

Your responses must be:
- Educational and informative  
- Accurate and fact-based  
- Clear, easy to understand, and concise  
- Helpful for learning  
- Formatted with **markdown** when needed  

You specialize in all educational subjects (math, science, history, literature, languages, etc.).
Always explain concepts clearly and avoid giving wrong information.

Now, answer this question:
"${message}"
`

    // ✅ Generate response
    const result = await model.generateContent(prompt)
    const text = result.response.text()

    // Cache the result
    responseCache.set(cacheKey, text)
    if (responseCache.size > 100) {
      const oldestKey = responseCache.keys().next().value
      if (typeof oldestKey === "string") {
        responseCache.delete(oldestKey)
      }
    }

    return NextResponse.json({ response: text })
  } catch (error) {
    console.error("❌ Error in chat API:", error)

    const message =
      error instanceof Error ? error.message : "An unknown error occurred"

    // Handle specific error types
    if (
      message.includes("quota") ||
      message.includes("429") ||
      message.includes("rate limit")
    ) {
      return NextResponse.json(
        {
          error: "Rate limit exceeded",
          message:
            "The AI service is currently experiencing high demand. Please try again later.",
          details: message,
        },
        { status: 429 },
      )
    }

    // Handle model not found errors
    if (message.includes("404") || message.includes("not found") || message.includes("not supported")) {
      return NextResponse.json(
        {
          error: "Model unavailable",
          message: "The AI model is currently unavailable. Please try again later.",
          details: message,
        },
        { status: 503 },
      )
    }

    return NextResponse.json(
      { error: "Failed to process your request", details: message },
      { status: 500 },
    )
  }
}
