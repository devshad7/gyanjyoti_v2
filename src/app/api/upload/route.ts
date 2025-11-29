import { type NextRequest, NextResponse } from "next/server"
import CloudinaryService from "@/lib/cloudinary"

// Admin Basic Auth removed for upload API; uploads are now public.

// POST /api/upload - Upload files to Cloudinary
export async function POST(request: NextRequest) {
  // previously required admin auth; now public
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const type = formData.get("type") as string // 'video' or 'image'
    const folder = formData.get("folder") as string

    if (!file) {
      return NextResponse.json({ success: false, error: "No file provided" }, { status: 400 })
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    let result

    if (type === "video") {
      result = await CloudinaryService.uploadVideo(buffer, {
        folder: folder || "gyanjyoti/videos",
        public_id: `${Date.now()}-${file.name.split(".")[0]}`,
      })
    } else {
      result = await CloudinaryService.uploadImage(buffer, {
        folder: folder || "gyanjyoti/images",
        public_id: `${Date.now()}-${file.name.split(".")[0]}`,
      })
    }

    return NextResponse.json({
      success: true,
      data: {
        url: result.secure_url,
        publicId: result.public_id,
        resourceType: result.resource_type,
        format: result.format,
        duration: result.duration,
        width: result.width,
        height: result.height,
      },
      message: "File uploaded successfully",
    })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ success: false, error: "Failed to upload file" }, { status: 500 })
  }
}
