import { type NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import type { Course } from "@/lib/types"

// GET /api/courses/[slug] - Fetch single course by slug
export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params

    const client = await clientPromise
    const db = client.db("gyanjyoti")
    const collection = db.collection<Course>("courses")

    const course = await collection.findOne({ slug })

    if (!course) {
      return NextResponse.json({ success: false, error: "Course not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: course,
    })
  } catch (error) {
    console.error("Error fetching course:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch course" }, { status: 500 })
  }
}

// PUT /api/courses/[slug] - Update course (Admin only)
export async function PUT(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params
    const body = await request.json()

    const client = await clientPromise
    const db = client.db("gyanjyoti")
    const collection = db.collection<Course>("courses")

    // Remove _id from update data if present
    const { _id, ...updateData } = body

    const result = await collection.updateOne(
      { slug },
      {
        $set: {
          ...updateData,
          updatedAt: new Date(),
        },
      },
    )

    if (result.matchedCount === 0) {
      return NextResponse.json({ success: false, error: "Course not found" }, { status: 404 })
    }

    // Fetch updated course
    const updatedCourse = await collection.findOne({ slug })

    return NextResponse.json({
      success: true,
      data: updatedCourse,
      message: "Course updated successfully",
    })
  } catch (error) {
    console.error("Error updating course:", error)
    return NextResponse.json({ success: false, error: "Failed to update course" }, { status: 500 })
  }
}

// DELETE /api/courses/[slug] - Delete course (Admin only)
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params

    const client = await clientPromise
    const db = client.db("gyanjyoti")
    const collection = db.collection<Course>("courses")

    const result = await collection.deleteOne({ slug })

    if (result.deletedCount === 0) {
      return NextResponse.json({ success: false, error: "Course not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "Course deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting course:", error)
    return NextResponse.json({ success: false, error: "Failed to delete course" }, { status: 500 })
  }
}
