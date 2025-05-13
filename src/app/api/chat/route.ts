import { NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

// Initialize the Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || "")

// Simple in-memory cache for responses
const responseCache = new Map()

export async function POST(req: Request) {
  try {
    const { message } = await req.json()

    if (!process.env.GOOGLE_AI_API_KEY) {
      console.error("GOOGLE_AI_API_KEY is not defined")
      return NextResponse.json({ error: "API key is not configured" }, { status: 500 })
    }

    // Generate a cache key based on the message
    const cacheKey = message.trim().toLowerCase()

    // Check if we have a cached response
    if (responseCache.has(cacheKey)) {
      console.log("Using cached response")
      return NextResponse.json({ response: responseCache.get(cacheKey) })
    }

    // Create a model instance - using gemini-1.5-flash which should be available
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    // Create a chat session
    const chat = model.startChat({
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 800,
      },
      history: [
        {
          role: "user",
          parts: [
            {
              text: `You are Gyanjyoti AI, an educational assistant designed to help students learn and understand various subjects.
          Your responses should be:
          - Educational and informative
          - Accurate and fact-based
          - Clear and easy to understand
          - Helpful for learning
          - Formatted with markdown for better readability when appropriate
          - Concise and to the point
          
          You specialize in all educational subjects including mathematics, science, history, literature, languages, and more.
          Always provide explanations that help the student understand the concepts, not just the answers.
          If you're unsure about something, acknowledge it rather than providing incorrect information.`,
            },
          ],
        },
        {
          role: "model",
          parts: [
            {
              text: "I understand my role as Gyanjyoti AI, an educational assistant. I'll provide informative, accurate, clear, and helpful responses on various educational subjects, using markdown formatting when appropriate. I'll focus on explaining concepts thoroughly and will acknowledge when I'm uncertain about something rather than providing incorrect information.",
            },
          ],
        },
      ],
    })

    // Send the message and get a response
    const result = await chat.sendMessage(message)
    const text = result.response.text()

    // Cache the response
    responseCache.set(cacheKey, text)

    // Limit cache size to prevent memory issues
    if (responseCache.size > 100) {
      const oldestKey = responseCache.keys().next().value
      responseCache.delete(oldestKey)
    }

    return NextResponse.json({ response: text })
  } catch (error) {
    console.error("Error in chat API:", error)

    // Check if it's a rate limit error
    const isRateLimit =
      typeof error === "object" && error !== null && "message" in error &&
      (typeof error === "object" && error !== null && "message" in error && 
      typeof (error as { message: string }).message === "string" && 
      ((error as { message: string }).message.includes("quota") || 
      (error as { message: string }).message.includes("429") || 
      (error as { message: string }).message.includes("rate limit")))

    if (isRateLimit) {
      return NextResponse.json(
        {
          error: "Rate limit exceeded",
          message: "The AI service is currently experiencing high demand. Please try again in a few moments.",
          details: error instanceof Error ? error.message : "An unknown error occurred",
        },
        { status: 429 },
      )
    }

    return NextResponse.json(
      {
        error: "Failed to process your request",
        details: error instanceof Error ? error.message : "An unknown error occurred",
      },
      { status: 500 },
    )
  }
}
