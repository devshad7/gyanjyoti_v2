import { NextRequest, NextResponse } from "next/server"
import { SupabasePDFService } from "@/lib/supabase-pdf-service"

// GET /api/pdfs/[id] - Get a specific PDF
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const pdf = await SupabasePDFService.getPDFById(id)
    
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
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    
    const input = {
      id,
      ...body
    }
    
    const pdf = await SupabasePDFService.updatePDF(id, body)
    
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
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await SupabasePDFService.deletePDF(id)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting PDF:", error)
    return NextResponse.json(
      { error: "Failed to delete PDF" },
      { status: 500 }
    )
  }
}
