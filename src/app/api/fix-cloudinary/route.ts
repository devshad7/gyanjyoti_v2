import { NextRequest, NextResponse } from "next/server"
import { updateExistingPDFsAccess } from "@/lib/fix-cloudinary-access"

export async function POST() {
  try {
    console.log("Starting Cloudinary access fix...")
    const result = await updateExistingPDFsAccess()
    
    if (result.success) {
      return NextResponse.json({
        message: `Successfully updated access for ${result.updated} PDF files`,
        success: true
      })
    } else {
      return NextResponse.json({
        error: "Failed to update PDF access",
        details: result.error
      }, { status: 500 })
    }
  } catch (error) {
    console.error("Error in fix-cloudinary endpoint:", error)
    return NextResponse.json({
      error: "Internal server error",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 })
  }
}
