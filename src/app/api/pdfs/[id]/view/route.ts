import { NextRequest, NextResponse } from "next/server"
import { SupabasePDFService } from "@/lib/supabase-pdf-service"

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id

    // Get PDF details from Supabase
    const pdf = await SupabasePDFService.getPDFById(id)
    
    if (!pdf) {
      return NextResponse.json(
        { error: "PDF not found" },
        { status: 404 }
      )
    }

    // Extract public_id from the Cloudinary URL
    const publicId = SupabasePDFService.extractPublicIdFromUrl(pdf.url)
    
    // Generate a signed URL for secure access
    const signedUrl = SupabasePDFService.generateSignedUrl(publicId)
    
    if (!signedUrl) {
      // Fallback to original URL if signing fails
      return NextResponse.json({ url: pdf.url })
    }

    return NextResponse.json({ url: signedUrl })
  } catch (error) {
    console.error("Error generating view URL:", error)
    return NextResponse.json(
      { error: "Failed to generate view URL" },
      { status: 500 }
    )
  }
}
