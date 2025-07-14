import { NextRequest, NextResponse } from "next/server"
import { SupabasePDFService } from "@/lib/supabase-pdf-service"

// GET /api/pdfs - Fetch PDFs with optional filters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    const filters = {
      subject: searchParams.get("subject") || undefined,
      class: searchParams.get("class") || undefined,
      searchTerm: searchParams.get("search") || undefined,
      favoriteOnly: searchParams.get("favoriteOnly") === "true",
      isActive: searchParams.get("isActive") !== "false" // Default to true
    }
    
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "12")
    
    const result = await SupabasePDFService.getPDFs(filters, page, limit)
    
    return NextResponse.json(result)
  } catch (error) {
    console.error("Error fetching PDFs:", error)
    return NextResponse.json(
      { error: "Failed to fetch PDFs" },
      { status: 500 }
    )
  }
}

// POST /api/pdfs - Create a new PDF
export async function POST(request: NextRequest) {
  try {
    console.log("PDF upload started...")
    
    const formData = await request.formData()
    
    const title = formData.get("title") as string
    const subject = formData.get("subject") as string
    const className = formData.get("class") as string
    const description = formData.get("description") as string
    const tags = formData.get("tags") as string
    const file = formData.get("file") as File
    const thumbnail = formData.get("thumbnail") as File | null
    
    console.log("Form data received:", { title, subject, className, fileSize: file?.size })
    
    if (!title || !subject || !className || !file) {
      console.log("Missing required fields:", { title: !!title, subject: !!subject, className: !!className, file: !!file })
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }
    
    const input = {
      title,
      subject,
      class: className,
      description: description || undefined,
      tags: tags ? tags.split(",").map(tag => tag.trim()) : undefined,
      file,
      thumbnail: thumbnail || undefined
    }
    
    console.log("Calling LocalPDFService.createPDF...")
    const pdf = await SupabasePDFService.createPDF(input)
    console.log("PDF created successfully:", pdf.id)
    
    return NextResponse.json(pdf, { status: 201 })
  } catch (error) {
    console.error("Error creating PDF:", error)
    
    // More detailed error logging
    if (error instanceof Error) {
      console.error("Error message:", error.message)
      console.error("Error stack:", error.stack)
    }
    
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create PDF" },
      { status: 500 }
    )
  }
}
