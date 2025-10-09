import { type NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

// GET /api/admin/stats - Get admin dashboard statistics
export async function GET(request: NextRequest) {
  try {
    const client = await clientPromise
    const db = client.db("gyanjyoti")
    const coursesCollection = db.collection("courses")

    // Get total courses count
    const totalCourses = await coursesCollection.countDocuments()

    // Get courses by subject
    const coursesBySubject = await coursesCollection
      .aggregate([
        {
          $group: {
            _id: "$subject",
            count: { $sum: 1 },
          },
        },
        { $sort: { count: -1 } },
      ])
      .toArray()

    // Get courses by class level
    const coursesByClass = await coursesCollection
      .aggregate([
        {
          $group: {
            _id: "$classLevel",
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ])
      .toArray()

    // Get total videos count
    const totalVideosResult = await coursesCollection
      .aggregate([
        {
          $project: {
            videoCount: { $size: { $ifNull: ["$videos", []] } },
          },
        },
        {
          $group: {
            _id: null,
            totalVideos: { $sum: "$videoCount" },
          },
        },
      ])
      .toArray()

    const totalVideos = totalVideosResult[0]?.totalVideos || 0

    // Get average rating
    const avgRatingResult = await coursesCollection
      .aggregate([
        {
          $group: {
            _id: null,
            avgRating: { $avg: "$rating" },
          },
        },
      ])
      .toArray()

    const avgRating = avgRatingResult[0]?.avgRating || 0

    // Get recent courses
    const recentCourses = await coursesCollection
      .find(
        {},
        {
          projection: {
            title: 1,
            subject: 1,
            classLevel: 1,
            createdAt: 1,
            rating: 1,
            reviews: 1,
          },
        },
      )
      .sort({ createdAt: -1 })
      .limit(5)
      .toArray()

    return NextResponse.json({
      success: true,
      data: {
        totalCourses,
        totalVideos,
        avgRating: Math.round(avgRating * 10) / 10,
        coursesBySubject,
        coursesByClass,
        recentCourses,
      },
    })
  } catch (error) {
    console.error("Error fetching admin stats:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch statistics" }, { status: 500 })
  }
}
