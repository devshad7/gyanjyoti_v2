import { NextRequest, NextResponse } from "next/server"

// Dynamic import to avoid module evaluation during build
async function getSupabasePDFService() {
  const { SupabasePDFService } = await import("@/lib/supabase-pdf-service")
  return SupabasePDFService
}

// POST /api/pdfs/[id]/download - Track download and return PDF URL
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Validate environment variables at runtime
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.error('Supabase environment variables missing')
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      )
    }

    const SupabasePDFService = await getSupabasePDFService()
    const pdf = await SupabasePDFService.getPDFById(params.id)
    
    if (!pdf) {
      return NextResponse.json(
        { error: "PDF not found" },
        { status: 404 }
      )
    }
    
    // Increment download count
    await SupabasePDFService.incrementDownloadCount(params.id)
    
    return NextResponse.json({ 
      url: pdf.url,
      title: pdf.title 
    })
  } catch (error) {
    console.error("Error handling download:", error)
    return NextResponse.json(
      { error: "Failed to process download" },
      { status: 500 }
    )
  }
}
