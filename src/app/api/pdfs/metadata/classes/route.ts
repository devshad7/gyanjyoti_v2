import { NextRequest, NextResponse } from "next/server"
import { SupabasePDFService } from "@/lib/supabase-pdf-service"

// GET /api/pdfs/metadata/classes - Get all unique classes
export async function GET() {
  try {
    const classes = await SupabasePDFService.getClasses()
    return NextResponse.json({ classes })
  } catch (error) {
    console.error("Error fetching classes:", error)
    return NextResponse.json(
      { error: "Failed to fetch classes" },
      { status: 500 }
    )
  }
}
