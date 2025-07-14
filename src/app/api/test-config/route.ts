import { NextResponse } from "next/server"

export async function GET() {
  try {
    const config = {
      cloudinary: {
        cloud_name: !!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        using_url_format: !!process.env.CLOUDINARY_URL,
        api_key: !!process.env.CLOUDINARY_API_KEY || !!process.env.CLOUDINARY_URL,
        api_secret: !!process.env.CLOUDINARY_API_SECRET || !!process.env.CLOUDINARY_URL,
        cloud_name_preview: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME?.substring(0, 5) + '...',
        url_preview: process.env.CLOUDINARY_URL?.substring(0, 30) + '...'
      },
      supabase: {
        url: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        anon_key: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        url_preview: process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 20) + '...'
      }
    }

    const missingVars = []
    if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME) missingVars.push("NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME")
    
    // Check for either URL format or individual credentials
    if (!process.env.CLOUDINARY_URL) {
      if (!process.env.CLOUDINARY_API_KEY) missingVars.push("CLOUDINARY_API_KEY or CLOUDINARY_URL")
      if (!process.env.CLOUDINARY_API_SECRET) missingVars.push("CLOUDINARY_API_SECRET or CLOUDINARY_URL")
    }
    
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) missingVars.push("NEXT_PUBLIC_SUPABASE_URL")
    if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) missingVars.push("NEXT_PUBLIC_SUPABASE_ANON_KEY")

    return NextResponse.json({
      success: missingVars.length === 0,
      config,
      missingVars: missingVars.length > 0 ? missingVars : undefined,
      message: missingVars.length === 0 ? "All environment variables are set!" : "Some environment variables are missing",
      cloudinary_method: process.env.CLOUDINARY_URL ? "URL format" : "Individual credentials"
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Failed to check configuration",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 })
  }
}
