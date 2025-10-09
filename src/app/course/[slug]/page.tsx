"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Course from "@/components/layout/courses/course"
import LoadingSpinner from "@/components/ui/loading-spinner"
import type { CoursePage } from "@/lib/types"

export default function CourseDetailPage() {
  const params = useParams()
  const slug = params.slug as string

  const [courseData, setCourseData] = useState<CoursePage | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (slug) {
      fetchCourse()
    }
  }, [slug])

  const fetchCourse = async () => {
    try {
      const response = await fetch(`/api/courses/${slug}`)
      const data = await response.json()

      if (data.success) {
        setCourseData(data.data)
      } else {
        setError("Course not found")
      }
    } catch (err) {
      setError("Failed to fetch course")
      console.error("Error fetching course:", err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (error || !courseData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Course Not Found</h1>
          <p className="text-gray-600 mb-4">{error || "The requested course could not be found."}</p>
          <button onClick={fetchCourse} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return <Course courseData={courseData} />
}
