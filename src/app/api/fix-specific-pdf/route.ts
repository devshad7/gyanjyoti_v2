import { NextRequest, NextResponse } from "next/server"
import { v2 as cloudinary } from 'cloudinary'

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
})

export async function POST() {
  try {
    // Fix the specific PDF that's blocked
    const publicId = 'pdfs/1752399691236_Maths.pdf'
    
    console.log(`Updating access control for: ${publicId}`)
    
    const result = await cloudinary.api.update(publicId, {
      resource_type: 'raw',
      access_control: { access_type: 'anonymous' }
    })
    
    console.log('Update result:', result)
    
    return NextResponse.json({
      success: true,
      message: `Successfully updated access control for ${publicId}`,
      url: result.secure_url
    })
  } catch (error) {
    console.error("Error updating specific PDF:", error)
    return NextResponse.json({
      error: "Failed to update PDF access",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 })
  }
}
