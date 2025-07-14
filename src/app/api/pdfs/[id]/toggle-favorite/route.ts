import { NextRequest, NextResponse } from "next/server"
import { SupabasePDFService } from "@/lib/supabase-pdf-service"

// POST /api/pdfs/[id]/toggle-favorite - Toggle PDF favorite status
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const pdf = await SupabasePDFService.toggleFavorite(params.id)
    
    if (!pdf) {
      return NextResponse.json(
        { error: "PDF not found" },
        { status: 404 }
      )
    }
    
    return NextResponse.json(pdf)
  } catch (error) {
    console.error("Error toggling favorite:", error)
    return NextResponse.json(
      { error: "Failed to toggle favorite" },
      { status: 500 }
    )
  }
}
