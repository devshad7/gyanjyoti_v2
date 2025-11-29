import { NextRequest, NextResponse } from "next/server"
import CloudinaryService from "@/lib/cloudinary"

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get("content-type") || ""
    let payload: { url?: string; folder?: string } = {}

    if (contentType.includes("application/json")) {
      payload = await request.json()
    } else {
      // try formData
      const form = await request.formData()
      payload.url = form.get("url") as string | undefined
      payload.folder = form.get("folder") as string | undefined
    }

    const { url, folder } = payload
    if (!url) {
      return NextResponse.json({ success: false, error: "Missing url" }, { status: 400 })
    }

    // Cloudinary can accept a remote URL string and fetch it
    const result = await CloudinaryService.uploadVideo(url, { folder: folder || "gyanjyoti/videos" })

    return NextResponse.json({ success: true, data: result })
  } catch (error) {
    console.error("upload-from-url error:", error)
    return NextResponse.json({ success: false, error: (error as Error)?.message || "Failed to import video" }, { status: 500 })
  }
}
