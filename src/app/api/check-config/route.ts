import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    const requiredVars = {
      'NEXT_PUBLIC_SUPABASE_URL': process.env.NEXT_PUBLIC_SUPABASE_URL,
      'NEXT_PUBLIC_SUPABASE_ANON_KEY': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      'CLOUDINARY_CLOUD_NAME': process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      'CLOUDINARY_API_KEY': process.env.CLOUDINARY_API_KEY,
      'CLOUDINARY_API_SECRET': process.env.CLOUDINARY_API_SECRET,
    }

    const status = Object.entries(requiredVars).map(([key, value]) => ({
      variable: key,
      configured: Boolean(value),
      length: value ? value.length : 0
    }))

    const missing = status.filter(item => !item.configured)
    const allConfigured = missing.length === 0

    return NextResponse.json({
      success: true,
      allConfigured,
      environment: process.env.NODE_ENV,
      status,
      missing: missing.map(item => item.variable),
      message: allConfigured 
        ? 'All environment variables are configured!' 
        : `Missing ${missing.length} environment variable(s)`
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to check configuration'
      },
      { status: 500 }
    )
  }
}
