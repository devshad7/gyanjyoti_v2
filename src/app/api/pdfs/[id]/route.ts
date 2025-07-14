import { NextRequest, NextResponse } from "next/server"
import { SupabasePDFService } from "@/lib/supabase-pdf-service"

// GET /api/pdfs/[id] - Get a specific PDF
export async function GET(
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
    
    return NextResponse.json(pdf)
  } catch (error) {
    console.error("Error fetching PDF:", error)
    return NextResponse.json(
      { error: "Failed to fetch PDF" },
      { status: 500 }
    )
  }
}

// PUT /api/pdfs/[id] - Update a PDF
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    
    const input = {
      id: params.id,
      ...body
    }
    
    const pdf = await SupabasePDFService.updatePDF(params.id, body)
    
    if (!pdf) {
      return NextResponse.json(
        { error: "PDF not found" },
        { status: 404 }
      )
    }
    
    return NextResponse.json(pdf)
  } catch (error) {
    console.error("Error updating PDF:", error)
    return NextResponse.json(
      { error: "Failed to update PDF" },
      { status: 500 }
    )
  }
}

// DELETE /api/pdfs/[id] - Delete a PDF
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await SupabasePDFService.deletePDF(params.id)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting PDF:", error)
    return NextResponse.json(
      { error: "Failed to delete PDF" },
      { status: 500 }
    )
  }
}
