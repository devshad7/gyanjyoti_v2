import { NextRequest, NextResponse } from "next/server"

export async function GET() {
  try {
    // Check Supabase environment variables
    const supabaseConfig = {
      url: process.env.NEXT_PUBLIC_SUPABASE_URL,
      anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    }

    // Check Cloudinary environment variables
    const cloudinaryConfig = {
      cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.CLOUDINARY_API_KEY,
      apiSecret: process.env.CLOUDINARY_API_SECRET,
    }

    const missingVars = []
    if (!supabaseConfig.url) missingVars.push("NEXT_PUBLIC_SUPABASE_URL")
    if (!supabaseConfig.anonKey) missingVars.push("NEXT_PUBLIC_SUPABASE_ANON_KEY")
    if (!cloudinaryConfig.cloudName) missingVars.push("NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME")
    if (!cloudinaryConfig.apiKey) missingVars.push("CLOUDINARY_API_KEY")
    if (!cloudinaryConfig.apiSecret) missingVars.push("CLOUDINARY_API_SECRET")

    if (missingVars.length > 0) {
      return NextResponse.json({
        success: false,
        error: "Missing environment variables",
        missingVars,
        help: "Please check your .env.local file and ensure all Supabase and Cloudinary variables are set"
      }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: "All environment variables are configured",
      config: {
        supabaseUrl: supabaseConfig.url ? "✓ Set" : "✗ Missing",
        cloudinaryName: cloudinaryConfig.cloudName ? "✓ Set" : "✗ Missing"
      }
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Error checking environment variables",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 })
  }
}
