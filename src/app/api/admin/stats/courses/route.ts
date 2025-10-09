// DELETE /api/courses?slug=... - Delete a course by slug (Admin only)
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get("slug")
    if (!slug) {
      return NextResponse.json({ success: false, error: "Missing slug parameter" }, { status: 400 })
    }
    const client = await clientPromise
    const db = client.db("gyanjyoti")
    const collection = db.collection<Course>("courses")
    const result = await collection.deleteOne({ slug })
    if (result.deletedCount === 0) {
      return NextResponse.json({ success: false, error: "Course not found" }, { status: 404 })
    }
    return NextResponse.json({ success: true, message: "Course deleted successfully" })
  } catch (error) {
    console.error("Error deleting course:", error)
    return NextResponse.json({ success: false, error: "Failed to delete course" }, { status: 500 })
  }
}
import { type NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import type { Course } from "@/lib/types"

// GET /api/courses - Fetch all courses with optional filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const subject = searchParams.get("subject")
    const classLevel = searchParams.get("classLevel")
    const language = searchParams.get("language")
    const rating = searchParams.get("rating")
    const search = searchParams.get("search")

    const client = await clientPromise
    const db = client.db("gyanjyoti")
    const collection = db.collection<Course>("courses")

    // Build filter query
    const filter: any = {}

    if (subject && subject !== "All") {
      filter.subject = subject
    }

    if (classLevel && classLevel !== "All category") {
      filter.classLevel = classLevel
    }

    if (language && language !== "All") {
      filter.language = language
    }

    if (rating) {
      filter.rating = { $gte: Number.parseInt(rating) }
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { aboutCourse: { $regex: search, $options: "i" } },
        { subject: { $regex: search, $options: "i" } },
      ]
    }

    const courses = await collection.find(filter).sort({ createdAt: -1 }).toArray()

    return NextResponse.json({
      success: true,
      data: courses,
      count: courses.length,
    })
  } catch (error) {
    console.error("Error fetching courses:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch courses" }, { status: 500 })
  }
}

// POST /api/courses - Add new course (Admin only)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const requiredFields = ["title", "slug", "subject", "classLevel", "description"]
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ success: false, error: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    const client = await clientPromise
    const db = client.db("gyanjyoti")
    const collection = db.collection<Course>("courses")

    // Check if slug already exists
    const existingCourse = await collection.findOne({ slug: body.slug })
    if (existingCourse) {
      return NextResponse.json({ success: false, error: "Course with this slug already exists" }, { status: 409 })
    }

    // Create new course document
    const newCourse: Course = {
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
      rating: body.rating || 0,
      reviews: body.reviews || 0,
      videos: body.videos || [],
    }

    const result = await collection.insertOne(newCourse)

    return NextResponse.json(
      {
        success: true,
        data: { _id: result.insertedId, ...newCourse },
        message: "Course created successfully",
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating course:", error)
    return NextResponse.json({ success: false, error: "Failed to create course" }, { status: 500 })
  }
}
