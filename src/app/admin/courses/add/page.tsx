"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import LoadingSpinner from "@/components/ui/loading-spinner"
import Link from "next/link"

interface Video {
  title: string
  url: string
  duration: string
  description: string
}

export default function AddCoursePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [uploadingThumbnail, setUploadingThumbnail] = useState(false)
  const [uploadingVideo, setUploadingVideo] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    subject: "",
    classLevel: "",
    description: "",
    aboutCourse: "",
    detailedDescription: "",
    subtitle: "",
    category: "",
    language: "Nepali",
    videoThumbnailUrl: "",
    level: "Beginner",
    duration: "",
    access: "Lifetime access",
    compatibility: "All devices",
    guarantee: "30-day money back",
    teacherName: "",
    teacherBio: "",
    teacherProfileUrl: "",
  })

  const [videos, setVideos] = useState<Video[]>([])
  const [learningOutcomes, setLearningOutcomes] = useState<string[]>([""])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    if (field === "title") {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim()
      setFormData((prev) => ({ ...prev, slug }))
    }
  }

  const handleThumbnailUpload = async (file: File) => {
    setUploadingThumbnail(true)
    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("type", "image")
      formData.append("folder", "gyanjyoti/thumbnails")

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()
      if (data.success) {
        setFormData((prev) => ({ ...prev, videoThumbnailUrl: data.data.url }))
      } else {
        alert("Failed to upload thumbnail")
      }
    } catch (error) {
      console.error("Upload error:", error)
      alert("Failed to upload thumbnail")
    } finally {
      setUploadingThumbnail(false)
    }
  }

  const addVideo = () => {
    setVideos((prev) => [...prev, { title: "", url: "", duration: "", description: "" }])
  }

  const removeVideo = (index: number) => {
    setVideos((prev) => prev.filter((_, i) => i !== index))
  }

  const updateVideo = (index: number, field: keyof Video, value: string) => {
    setVideos((prev) => prev.map((video, i) => (i === index ? { ...video, [field]: value } : video)))
  }

  const addLearningOutcome = () => {
    setLearningOutcomes((prev) => [...prev, ""])
  }

  const removeLearningOutcome = (index: number) => {
    setLearningOutcomes((prev) => prev.filter((_, i) => i !== index))
  }

  const updateLearningOutcome = (index: number, value: string) => {
    setLearningOutcomes((prev) => prev.map((outcome, i) => (i === index ? value : outcome)))
  }

  const handleVideoUpload = async (file: File, videoIndex: number) => {
    setUploadingVideo(videoIndex)
    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("type", "video")
      formData.append("folder", "gyanjyoti/videos")

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()
      if (data.success) {
        updateVideo(videoIndex, "url", data.data.url)
        if (data.data.duration) {
          const minutes = Math.floor(data.data.duration / 60)
          const seconds = Math.floor(data.data.duration % 60)
          updateVideo(videoIndex, "duration", `${minutes}:${seconds.toString().padStart(2, "0")}`)
        }
      } else {
        alert("Failed to upload video")
      }
    } catch (error) {
      console.error("Video upload error:", error)
      alert("Failed to upload video")
    } finally {
      setUploadingVideo(null)
    }
  }

  const importVideoFromUrl = async (videoIndex: number) => {
    const url = videos[videoIndex]?.url
    if (!url) return alert("Enter a video URL first")

    setUploadingVideo(videoIndex)
    try {
      const res = await fetch("/api/upload-from-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, folder: "gyanjyoti/videos" }),
      })
      const data = await res.json()
      if (data.success && data.data?.secure_url) {
        updateVideo(videoIndex, "url", data.data.secure_url)
        if (data.data.duration) {
          const minutes = Math.floor(data.data.duration / 60)
          const seconds = Math.floor(data.data.duration % 60)
          updateVideo(videoIndex, "duration", `${minutes}:${seconds.toString().padStart(2, "0")}`)
        }
      } else {
        alert(data.error || "Failed to import video from URL")
      }
    } catch (error) {
      console.error("Import error:", error)
      alert("Failed to import video from URL")
    } finally {
      setUploadingVideo(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const courseData = {
        ...formData,
        videos: videos.filter((v) => v.title && v.url),
        whatYouWillLearn: learningOutcomes.filter((outcome) => outcome.trim()),
        courseDetails: {
          level: formData.level,
          duration: formData.duration,
          totalVideos: `${videos.filter((v) => v.title && v.url).length} videos`,
          access: formData.access,
          compatibility: formData.compatibility,
          guarantee: formData.guarantee,
        },
        teacherInfo: {
          name: formData.teacherName,
          bio: formData.teacherBio,
          profileUrl: formData.teacherProfileUrl || "/placeholder.svg",
        },
        rating: 0,
        reviews: 0,
      }

      const response = await fetch("/api/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(courseData),
      })

      const data = await response.json()
      if (data.success) {
        router.push("/admin")
      } else {
        alert(data.error || "Failed to create course")
      }
    } catch (error) {
      console.error("Error creating course:", error)
      alert("Failed to create course")
    } finally {
      setLoading(false)
    }
  }

  // Helper to transform YouTube URL into embed URL
  function getYouTubeEmbedUrl(url: string) {
    try {
      const u = new URL(url)
      let id = ""
      if (u.hostname.includes("youtu.be")) {
        id = u.pathname.slice(1)
      } else if (u.hostname.includes("youtube.com")) {
        id = u.searchParams.get("v") || ""
      }
      return id ? `https://www.youtube.com/embed/${id}` : url
    } catch (e) {
      return url
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-6">
            <Link href="/admin" className="flex items-center text-gray-600 hover:text-gray-900 mr-4">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Dashboard
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Add New Course</h1>
              <p className="text-gray-600">Create a new course for the platform</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Enter the basic details of the course</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Course Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="e.g., Advanced Mathematics for Class 12"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="slug">URL Slug *</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => handleInputChange("slug", e.target.value)}
                    placeholder="advanced-mathematics-class-12"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="subtitle">Subtitle</Label>
                <Input
                  id="subtitle"
                  value={formData.subtitle}
                  onChange={(e) => handleInputChange("subtitle", e.target.value)}
                  placeholder="Brief description of what the course covers"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => handleInputChange("subject", e.target.value)}
                    placeholder="Mathematics, Physics, Chemistry"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="classLevel">Class Level *</Label>
                  <Select value={formData.classLevel} onValueChange={(value) => handleInputChange("classLevel", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      
                      <SelectItem value="Class 8">Class 8</SelectItem>
                      <SelectItem value="Class 9">Class 9</SelectItem>
                      <SelectItem value="Class 10">Class 10</SelectItem>
                      <SelectItem value="Class 11">Class 11</SelectItem>
                      <SelectItem value="Class 12">Class 12</SelectItem>
                      <SelectItem value="Web Development">Web Development</SelectItem>
                      <SelectItem value="Programming">Programming</SelectItem>
                      <SelectItem value="Digital Marketing">Digital Marketing</SelectItem>
                      <SelectItem value="Self Development">Self Development</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="language">Language *</Label>
                  <Select value={formData.language} onValueChange={(value) => handleInputChange("language", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="Nepali">Nepali</SelectItem>
                      <SelectItem value="Both English and Nepali">Both English and Nepali</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Short Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Brief description for course cards"
                  required
                />
              </div>

              <div>
                <Label htmlFor="aboutCourse">About Course *</Label>
                <Textarea
                  id="aboutCourse"
                  value={formData.aboutCourse}
                  onChange={(e) => handleInputChange("aboutCourse", e.target.value)}
                  placeholder="Detailed description about the course"
                  rows={4}
                  required
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Course Thumbnail</CardTitle>
              <CardDescription>Upload a thumbnail image for the course</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <Label htmlFor="thumbnail">Thumbnail Image</Label>
                  <Input
                    id="thumbnail"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) handleThumbnailUpload(file)
                    }}
                    disabled={uploadingThumbnail}
                  />
                </div>
                {uploadingThumbnail && <LoadingSpinner />}
              </div>
              {formData.videoThumbnailUrl && (
                <div className="mt-4">
                  <img
                    src={formData.videoThumbnailUrl || "/placeholder.svg"}
                    alt="Course thumbnail"
                    className="w-32 h-20 object-cover rounded-lg"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Course Videos</CardTitle>
              <CardDescription>Add videos to your course</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {videos.map((video, index) => (
                <div key={index} className="p-4 border rounded-lg space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Video {index + 1}</h4>
                    <Button type="button" variant="outline" size="sm" onClick={() => removeVideo(index)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Input
                      placeholder="Video title"
                      value={video.title}
                      onChange={(e) => updateVideo(index, "title", e.target.value)}
                    />
                    <Input
                      placeholder="Duration (e.g., 45:30)"
                      value={video.duration}
                      onChange={(e) => updateVideo(index, "duration", e.target.value)}
                    />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-4">
                      <div className="flex-1">
                        <Label htmlFor={`video-${index}`}>Upload Video File</Label>
                        <Input
                          id={`video-${index}`}
                          type="file"
                          accept="video/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) handleVideoUpload(file, index)
                          }}
                          disabled={uploadingVideo === index}
                        />
                      </div>
                      {uploadingVideo === index && <LoadingSpinner />}
                    </div>
                    <div className="text-center text-gray-500">or</div>
                    <div>
                      <Label htmlFor={`video-url-${index}`}>Video URL (YouTube or direct link)</Label>
                      <div className="flex space-x-2">
                        <Input
                          id={`video-url-${index}`}
                          placeholder="https://youtube.com/watch?v=... or direct mp4 URL"
                          value={video.url}
                          onChange={(e) => updateVideo(index, "url", e.target.value)}
                        />
                        <Button type="button" variant="outline" size="sm" onClick={() => importVideoFromUrl(index)} disabled={uploadingVideo === index}>
                          Import
                        </Button>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">Click Import to fetch this URL into Cloudinary (if supported).</div>
                    </div>
                  </div>
                  <Textarea
                    placeholder="Video description (optional)"
                    value={video.description}
                    onChange={(e) => updateVideo(index, "description", e.target.value)}
                    rows={2}
                  />
                  {video.url && (
                    <div className="mt-3">
                      <Label>Video Preview</Label>
                      <div className="mt-2 aspect-video bg-gray-100 rounded-lg overflow-hidden">
                        {/* If it's a YouTube link, show iframe embed, otherwise try video tag */}
                        {/(youtube\.com|youtu\.be)/i.test(video.url) ? (
                          <iframe
                            src={getYouTubeEmbedUrl(video.url)}
                            title={video.title || `video-${index}`}
                            className="w-full h-full"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        ) : (
                          <video src={video.url} controls className="w-full h-full object-cover" preload="metadata">
                            Your browser does not support the video tag.
                          </video>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <Button type="button" variant="outline" onClick={addVideo}>
                <Plus className="h-4 w-4 mr-2" />
                Add Video
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Learning Outcomes</CardTitle>
              <CardDescription>What will students learn from this course?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {learningOutcomes.map((outcome, index) => (
                <div key={index} className="flex space-x-2">
                  <Input
                    placeholder="Learning outcome"
                    value={outcome}
                    onChange={(e) => updateLearningOutcome(index, e.target.value)}
                    className="flex-1"
                  />
                  {learningOutcomes.length > 1 && (
                    <Button type="button" variant="outline" size="sm" onClick={() => removeLearningOutcome(index)}>
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button type="button" variant="outline" onClick={addLearningOutcome}>
                <Plus className="h-4 w-4 mr-2" />
                Add Learning Outcome
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Teacher Information</CardTitle>
              <CardDescription>Details about the course instructor</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="teacherName">Teacher Name *</Label>
                  <Input
                    id="teacherName"
                    value={formData.teacherName}
                    onChange={(e) => handleInputChange("teacherName", e.target.value)}
                    placeholder="Dr. John Doe"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="teacherProfileUrl">Profile Image URL</Label>
                  <Input
                    id="teacherProfileUrl"
                    value={formData.teacherProfileUrl}
                    onChange={(e) => handleInputChange("teacherProfileUrl", e.target.value)}
                    placeholder="https://example.com/profile.jpg"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="teacherBio">Teacher Bio *</Label>
                <Textarea
                  id="teacherBio"
                  value={formData.teacherBio}
                  onChange={(e) => handleInputChange("teacherBio", e.target.value)}
                  placeholder="Brief bio about the teacher"
                  rows={3}
                  required
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Course Details</CardTitle>
              <CardDescription>Additional course information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="level">Difficulty Level</Label>
                  <Select value={formData.level} onValueChange={(value) => handleInputChange("level", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="duration">Total Duration</Label>
                  <Input
                    id="duration"
                    value={formData.duration}
                    onChange={(e) => handleInputChange("duration", e.target.value)}
                    placeholder="e.g., 120 hours"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => handleInputChange("category", e.target.value)}
                    placeholder="e.g., Mathematics, Science"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? <LoadingSpinner size="sm" /> : "Create Course"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
