import { NextRequest, NextResponse } from "next/server"
import { SupabasePDFService } from "@/lib/supabase-pdf-service"

// GET /api/pdfs/metadata/subjects - Get all unique subjects
export async function GET() {
  try {
    const subjects = await SupabasePDFService.getSubjects()
    return NextResponse.json({ subjects })
  } catch (error) {
    console.error("Error fetching subjects:", error)
    return NextResponse.json(
      { error: "Failed to fetch subjects" },
      { status: 500 }
    )
  }
}
