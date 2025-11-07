import { type NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import type { Course } from "@/lib/types"

// Basic auth check for mutating admin operations
function requireAdmin(request: NextRequest): NextResponse | null {
  const adminUser = process.env.ADMIN_USER || ""
  const adminPass = process.env.ADMIN_PASS || ""
  if (!adminUser || !adminPass) return NextResponse.json({ success: false, error: "Admin credentials not configured" }, { status: 503 })
  const header = request.headers.get("authorization") || request.headers.get("Authorization")
  if (!header || !header.startsWith("Basic ")) return new NextResponse("Authentication required", { status: 401, headers: { "WWW-Authenticate": 'Basic realm="Admin Area"' } })
  const [user, pass] = Buffer.from(header.replace("Basic ", ""), "base64").toString("utf8").split(":")
  if (user !== adminUser || pass !== adminPass) return new NextResponse("Unauthorized", { status: 401, headers: { "WWW-Authenticate": 'Basic realm="Admin Area"' } })
  return null
}

// DELETE /api/courses?slug=... - Delete a course by slug (Admin only)
export async function DELETE(request: NextRequest) {
  const authRes = requireAdmin(request)
  if (authRes) return authRes
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

// GET /api/courses - Fetch all courses with optional filtering
export async function GET(request: NextRequest) {
  try {
    // lightweight runtime info to help debug TLS/SSL errors seen in some environments
    try {
      // mask nothing sensitive here; just versions
      console.info('[api/courses] node version', process.version)
      console.info('[api/courses] openssl', process.versions?.openssl)
      console.info('[api/courses] platform', process.platform)
    } catch (e) {
      console.warn('[api/courses] failed to read runtime versions', e)
    }
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
    // Print full error metadata to help identify SSL handshake failures
    try {
      console.error("Error fetching courses:", error)
      // print nested cause if available
      const errAny = error as any
      if (errAny?.cause) console.error('cause:', errAny.cause)
      if (errAny?.stack) console.error('stack:', errAny.stack)
    } catch (e) {
      console.error('Failed to log error details', e)
    }
    return NextResponse.json({ success: false, error: "Failed to fetch courses" }, { status: 500 })
  }
}

// POST /api/courses - Add new course (Admin only)
export async function POST(request: NextRequest) {
  const authRes = requireAdmin(request)
  if (authRes) return authRes
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
