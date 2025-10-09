"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Plus, BookOpen, Video, Users, TrendingUp, Upload, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import LoadingSpinner from "@/components/ui/loading-spinner"

interface AdminStats {
  totalCourses: number
  totalVideos: number
  avgRating: number
  coursesBySubject: Array<{ _id: string; count: number }>
  coursesByClass: Array<{ _id: string; count: number }>
  recentCourses: Array<{
    slug: string
    _id: string
    title: string
    subject: string
    classLevel: string
    rating: number
    reviews: number
    createdAt: string
  }>
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter();

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/admin/stats")
      const data = await response.json()

      if (data.success) {
        setStats(data.data)
      } else {
        setError(data.error || "Failed to fetch statistics")
      }
    } catch (err) {
      setError("Failed to fetch statistics")
      console.error("Error fetching stats:", err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={fetchStats}>Retry</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Manage your Gyanjyoti platform</p>
            </div>
            <div className="flex space-x-3">
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => router.push("/admin/courses/add") }>
                <Plus className="h-4 w-4 mr-2" />
                Add Course
              </Button>
              <Button variant="outline" onClick={() => router.push("/admin/courses/add") }>
                <Upload className="h-4 w-4 mr-2" />
                Upload Video
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.totalCourses || 0}</div>
              <p className="text-xs text-muted-foreground">Active courses on platform</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Videos</CardTitle>
              <Video className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.totalVideos || 0}</div>
              <p className="text-xs text-muted-foreground">Videos across all courses</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.avgRating || 0}/5</div>
              <p className="text-xs text-muted-foreground">Overall course rating</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground">Registered students</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Courses by Subject */}
          <Card>
            <CardHeader>
              <CardTitle>Courses by Subject</CardTitle>
              <CardDescription>Distribution of courses across subjects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats?.coursesBySubject.map((item) => (
                  <div key={item._id} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{item._id}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{
                            width: `${(item.count / (stats?.totalCourses || 1)) * 100}%`,
                          }}
                        />
                      </div>
                      <span className="text-sm text-gray-600">{item.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Courses */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Courses</CardTitle>
              <CardDescription>Latest courses added to the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats?.recentCourses.map((course) => (
                  <div key={course._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900 line-clamp-1">{course.title}</h4>
                      <p className="text-xs text-gray-600">
                        {course.subject} • {course.classLevel}
                      </p>
                      <div className="flex items-center mt-1">
                        <span className="text-xs text-yellow-600">
                          ★ {course.rating} ({course.reviews} reviews)
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-1 ml-4">
                      <Button size="sm" variant="outline">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600 hover:text-red-700 bg-transparent"
                        onClick={async () => {
                          if (window.confirm(`Are you sure you want to delete '${course.title}'?`)) {
                            const res = await fetch(`/api/courses?slug=${course.slug}`, { method: "DELETE" })
                            const data = await res.json()
                            if (data.success) {
                              alert("Course deleted successfully!")
                              fetchStats()
                            } else {
                              alert(data.error || "Failed to delete course.")
                            }
                          }
                        }}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-20 flex-col bg-transparent" onClick={() => router.push("/admin/courses/add") }>
                <Plus className="h-6 w-6 mb-2" />
                Create New Course
              </Button>
              <Button variant="outline" className="h-20 flex-col bg-transparent" onClick={() => router.push("/admin/courses/add") }>
                <Upload className="h-6 w-6 mb-2" />
                Upload Videos
              </Button>
              <Button variant="outline" className="h-20 flex-col bg-transparent" onClick={() => router.push("/admin/users") }>
                <Users className="h-6 w-6 mb-2" />
                Manage Users
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
