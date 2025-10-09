"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, X, Upload } from "lucide-react";
import Image from "next/image";

export default function ManagePlaylistsPage() {
  const router = useRouter();
  const [courses, setCourses] = useState<any[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState<number | null>(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/courses");
      const json = await res.json();
      if (json.success) {
        setCourses(json.data);
      }
    } finally {
      setLoading(false);
    }
  };

  const selectCourse = (course: any) => {
    setSelectedCourse(course);
    setVideos(course.videos || []);
  };

  const addVideo = () => {
    setVideos((prev) => [...prev, { title: "", url: "", duration: "", description: "" }]);
  };

  const removeVideo = (index: number) => {
    setVideos((prev) => prev.filter((_, i) => i !== index));
  };

  const updateVideo = (index: number, field: string, value: string) => {
    setVideos((prev) => prev.map((video, i) => (i === index ? { ...video, [field]: value } : video)));
  };

  const handleVideoUpload = async (file: File, videoIndex: number) => {
    setUploadingVideo(videoIndex);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", "video");
      formData.append("folder", "gyanjyoti/videos");
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        updateVideo(videoIndex, "url", data.data.url);
        if (data.data.duration) {
          const minutes = Math.floor(data.data.duration / 60);
          const seconds = Math.floor(data.data.duration % 60);
          updateVideo(videoIndex, "duration", `${minutes}:${seconds.toString().padStart(2, "0")}`);
        }
      } else {
        alert("Failed to upload video");
      }
    } catch (error) {
      alert("Failed to upload video");
    } finally {
      setUploadingVideo(null);
    }
  };

  const savePlaylist = async () => {
    if (!selectedCourse) return;
    setLoading(true);
    try {
      const response = await fetch(`/api/courses/${selectedCourse.slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...selectedCourse, videos }),
      });
      const data = await response.json();
      if (data.success) {
        alert("Playlist updated!");
        fetchCourses();
      } else {
        alert("Failed to update playlist");
      }
    } catch {
      alert("Failed to update playlist");
    } finally {
      setLoading(false);
    }
  };
interface Video {
  title: string;
  url: string;
  duration: string;
  description: string;
}

interface Course {
  slug: string;
  title: string;
  subject: string;
  classLevel: string;
  videos?: Video[];
}
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-blue-700">Manage Course Playlists</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <div>
            <h2 className="font-semibold text-lg mb-4">Courses</h2>
            <div className="space-y-2">
              {courses.map((course) => (
                <Card key={course.slug} className={`cursor-pointer ${selectedCourse?.slug === course.slug ? "border-blue-500" : "border-gray-200"}`} onClick={() => selectCourse(course)}>
                  <CardHeader>
                    <CardTitle>{course.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-gray-600">{course.subject} | {course.classLevel}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          <div className="md:col-span-2">
            {selectedCourse ? (
              <div>
                <h2 className="font-bold text-xl mb-4 text-blue-700">Playlist for {selectedCourse.title}</h2>
                <div className="space-y-6">
                  {videos.map((video, index) => (
                    <Card key={index} className="p-4">
                      <CardHeader className="flex flex-row justify-between items-center">
                        <CardTitle>Video {index + 1}</CardTitle>
                        <Button type="button" variant="outline" size="sm" onClick={() => removeVideo(index)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <Input placeholder="Video title" value={video.title} onChange={(e) => updateVideo(index, "title", e.target.value)} />
                          <Input placeholder="Duration (e.g., 45:30)" value={video.duration} onChange={(e) => updateVideo(index, "duration", e.target.value)} />
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-4">
                            <div className="flex-1">
                              <label htmlFor={`video-${index}`}>Upload Video File</label>
                              <Input id={`video-${index}`} type="file" accept="video/*" onChange={(e) => { const file = e.target.files?.[0]; if (file) handleVideoUpload(file, index); }} disabled={uploadingVideo === index} />
                            </div>
                            {uploadingVideo === index && <Upload className="animate-spin" />}
                          </div>
                          <div className="text-center text-gray-500">or</div>
                          <div>
                            <label htmlFor={`video-url-${index}`}>Video URL (if already uploaded)</label>
                            <Input id={`video-url-${index}`} placeholder="Cloudinary video URL or direct video link" value={video.url} onChange={(e) => updateVideo(index, "url", e.target.value)} />
                          </div>
                        </div>
                        <Textarea placeholder="Video description (optional)" value={video.description} onChange={(e) => updateVideo(index, "description", e.target.value)} rows={2} />
                        {video.url && (
                          <div className="mt-3">
                            <label>Video Preview</label>
                            <div className="mt-2 aspect-video bg-gray-100 rounded-lg overflow-hidden">
                              <video src={video.url} controls className="w-full h-full object-cover" preload="metadata">
                                Your browser does not support the video tag.
                              </video>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                  <Button type="button" variant="outline" onClick={addVideo} className="mt-2">
                    <Plus className="h-4 w-4 mr-2" /> Add Video
                  </Button>
                  <div className="flex justify-end mt-6">
                    <Button type="button" variant="default" onClick={savePlaylist} disabled={loading}>
                      {loading ? "Saving..." : "Save Playlist"}
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-gray-500 text-center mt-20">Select a course to manage its playlist.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
