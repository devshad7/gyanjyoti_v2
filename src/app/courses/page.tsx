"use client"

import { useState, useEffect } from "react"
import CourseSection from "@/components/layout/courses/course-section"
import LoadingSpinner from "@/components/ui/loading-spinner"
import type { Course } from "@/lib/types"

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    try {
      const response = await fetch("/api/courses")
      const data = await response.json()

      if (data.success) {
        setCourses(data.data)
      } else {
        setError(data.error || "Failed to fetch courses")
      }
    } catch (err) {
      setError("Failed to fetch courses")
      console.error("Error fetching courses:", err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button onClick={fetchCourses} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Retry
          </button>
        </div>
      </div>
    )
  }

  return <CourseSection courses={courses} />
}
