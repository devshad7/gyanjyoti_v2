import { NextRequest, NextResponse } from "next/server"
import { SupabasePDFService } from "@/lib/supabase-pdf-service"

// POST /api/pdfs/[id]/download - Track download and return PDF URL
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
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
