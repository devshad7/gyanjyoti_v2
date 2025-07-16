import { NextRequest, NextResponse } from "next/server"
import { SupabasePDFService } from "@/lib/supabase-pdf-service"

// Configure runtime for handling large file uploads
export const maxDuration = 120; // 2 minutes
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

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
  let formData: FormData;
  
  try {
    console.log("PDF upload started...")
    console.log("Request headers:", {
      contentType: request.headers.get('content-type'),
      contentLength: request.headers.get('content-length'),
      userAgent: request.headers.get('user-agent')?.substring(0, 50) + '...'
    });
    
    // Parse form data with error handling
    try {
      formData = await request.formData();
      console.log("Form data parsed successfully");
    } catch (formError) {
      console.error("Error parsing form data:", formError);
      return NextResponse.json(
        { 
          error: "Failed to parse upload data. Please check your file size and try again.",
          details: process.env.NODE_ENV === 'development' ? formError?.toString() : undefined
        },
        { status: 400 }
      );
    }
    
    const title = formData.get("title") as string
    const subject = formData.get("subject") as string
    const className = formData.get("class") as string
    const description = formData.get("description") as string
    const tags = formData.get("tags") as string
    const file = formData.get("file") as File
    const thumbnail = formData.get("thumbnail") as File | null
    
    console.log("Form data received:", { 
      title, 
      subject, 
      className, 
      fileSize: file?.size,
      fileName: file?.name,
      thumbnailSize: thumbnail?.size 
    })
    
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
    
    console.log("Calling SupabasePDFService.createPDF...")
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
    
    // Ensure we always return a JSON response with proper error message
    let errorMessage = "Failed to create PDF"
    let statusCode = 500
    
    if (error instanceof Error) {
      errorMessage = error.message
      
      // Handle specific error types
      if (error.message.includes("File size too large") || 
          error.message.includes("too large for Cloudinary") ||
          error.message.includes("Request Entity Too Large")) {
        statusCode = 413 // Payload Too Large
        errorMessage = "File size too large. Please compress your PDF and try again."
      } else if (error.message.includes("timeout") || 
                 error.message.includes("TIMEOUT") ||
                 error.message.includes("ECONNRESET")) {
        statusCode = 408 // Request Timeout
        errorMessage = "Upload timeout. Please try again with a smaller file."
      } else if (error.message.includes("Missing required fields")) {
        statusCode = 400 // Bad Request
      } else if (error.message.includes("CLOUDINARY") ||
                 error.message.includes("environment variables")) {
        statusCode = 503 // Service Unavailable
        errorMessage = "Upload service temporarily unavailable. Please try again later."
      }
    }
    
    return NextResponse.json(
      { 
        error: errorMessage,
        details: process.env.NODE_ENV === 'development' ? error?.toString() : undefined
      },
      { status: statusCode }
    )
  }
}
