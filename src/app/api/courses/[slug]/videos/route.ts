import { type NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import type { Course, Video } from "@/lib/types"

// POST /api/courses/[slug]/videos - Add video to course
export async function POST(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const { slug } = params
    const body = await request.json()

    // Validate required fields
    const requiredFields = ["title", "url", "duration"]
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ success: false, error: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    const client = await clientPromise
    const db = client.db("gyanjyoti")
    const collection = db.collection<Course>("courses")

    const newVideo: Video = {
      title: body.title,
      url: body.url,
      duration: body.duration,
      description: body.description || "",
    }

    const result = await collection.updateOne(
      { slug },
      {
        $push: { videos: newVideo },
        $set: { updatedAt: new Date() },
      },
    )

    if (result.matchedCount === 0) {
      return NextResponse.json({ success: false, error: "Course not found" }, { status: 404 })
    }

    return NextResponse.json(
      {
        success: true,
        data: newVideo,
        message: "Video added successfully",
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error adding video:", error)
    return NextResponse.json({ success: false, error: "Failed to add video" }, { status: 500 })
  }
}

// GET /api/courses/[slug]/videos - Get all videos for a course
export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const { slug } = params

    const client = await clientPromise
    const db = client.db("gyanjyoti")
    const collection = db.collection<Course>("courses")

    const course = await collection.findOne({ slug }, { projection: { videos: 1, title: 1 } })

    if (!course) {
      return NextResponse.json({ success: false, error: "Course not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: {
        courseTitle: course.title,
        videos: course.videos || [],
      },
    })
  } catch (error) {
    console.error("Error fetching videos:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch videos" }, { status: 500 })
  }
}
