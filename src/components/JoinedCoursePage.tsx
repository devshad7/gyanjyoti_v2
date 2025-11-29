"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { Play, Clock, CheckCircle } from "lucide-react"

export default function JoinedCoursePage() {
  // Back button handler
  function handleBack() {
    if (typeof window !== 'undefined') {
      window.history.back();
    }
  }
  const params = useParams()
  const slug = typeof params?.slug === "string" ? params.slug : Array.isArray(params?.slug) ? params.slug[0] : ""
  const [courseData, setCourseData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [selectedVideo, setSelectedVideo] = useState<any>(null)

  useEffect(() => {
    async function fetchCourse() {
      if (!slug) return
      setLoading(true)
      try {
        const res = await fetch(`/api/courses/${slug}`)
        const json = await res.json()
        if (json.success) {
          setCourseData(json.data)
        } else {
          setCourseData(null)
        }
      } catch {
        setCourseData(null)
      }
      setLoading(false)
    }
    fetchCourse()
  }, [slug])

  // Default to first video if available
  useEffect(() => {
    if (!selectedVideo && courseData?.videos?.length > 0) {
      setSelectedVideo(courseData.videos[0])
    }
  }, [courseData, selectedVideo])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900 mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">Loading your course...</p>
        </div>
      </div>
    )
  }

  if (!courseData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Course not found</h2>
          <p className="text-slate-600">The course you&apos;re looking for doesn&apos;t exist.</p>
        </div>
      </div>
    )
  }

  return (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
     {/* Back Button */}
      <button
        onClick={handleBack}
        className="fixed top-4 bg-[#275cc3] left-4 z-50 flex items-center gap-2 px-4 py-2 rounded-full cursor  text-white font-semibold shadow-lg hover:bg-[#1e469c] transition-colors"
        aria-label="Go back"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>
  <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white py-8 px-4 md:px-8 mt-16 sm:mt-0">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Play className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight">Course Playlist</h1>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-semibold border border-white/20">
              {courseData.title}
            </span>
            <span className="px-4 py-2 bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 rounded-full text-sm font-bold">
              {courseData.category}
            </span>
            <span className="text-slate-300 text-sm font-medium">{courseData.videos?.length || 0} videos</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-8 px-4 md:px-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="flex-1 w-full lg:w-2/3">
            {selectedVideo ? (
              <div className="space-y-6">
                <div className="relative group">
                        {/* Use iframe for YouTube links, otherwise try video and show a helpful message on error */}
                        {/(youtube\.com|youtu\.be)/i.test(selectedVideo.url) ? (
                          <iframe
                            src={getYouTubeEmbedUrl(selectedVideo.url)}
                            title={selectedVideo.title || 'video'}
                            className="w-full rounded-2xl shadow-2xl aspect-video bg-slate-900 border border-slate-200"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        ) : (
                          <VideoWithError src={selectedVideo.url} />
                        )}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                </div>

                <div className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight">
                    {selectedVideo.title}
                  </h2>
                  <p className="text-slate-600 text-lg leading-relaxed">{selectedVideo.description}</p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full">
                      <Clock className="w-4 h-4 text-slate-600" />
                      <span className="text-sm font-semibold text-slate-700">{selectedVideo.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-semibold text-green-700">Now Playing</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="aspect-video bg-slate-100 rounded-2xl flex items-center justify-center border-2 border-dashed border-slate-300">
                <div className="text-center">
                  <Play className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-500 font-medium">Select a video to start learning</p>
                </div>
              </div>
            )}
          </div>

          <div className="w-full lg:w-[420px] flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
              <div className="bg-gradient-to-r from-slate-800 to-slate-700 px-6 py-4">
                <h3 className="text-xl font-black text-white flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <Play className="w-4 h-4 text-white" />
                  </div>
                  Course Playlist
                </h3>
                <p className="text-slate-300 text-sm mt-1">
                  {courseData.videos?.length || 0} videos • Learn at your pace
                </p>
              </div>

              <div className="max-h-[600px] overflow-y-auto">
                {courseData.videos && courseData.videos.length > 0 ? (
                  <div className="divide-y divide-slate-100">
                    {courseData.videos.map((video: any, idx: number) => (
                      <div
                        key={idx}
                        className={`flex items-center gap-4 p-4 cursor-pointer transition-all duration-200 hover:bg-slate-50 group ${
                          selectedVideo?.url === video.url
                            ? "bg-blue-50 border-r-4 border-blue-500"
                            : "hover:bg-slate-50"
                        }`}
                        onClick={() => setSelectedVideo(video)}
                      >
                        <div className="relative flex-shrink-0">
                          <Image
                            src={(video.thumbnail || courseData.videoThumbnailUrl || "/assets/subject/science10.png") as string}
                            alt={video.title}
                            width={120}
                            height={68}
                            className="rounded-lg object-cover border border-slate-200 shadow-sm group-hover:shadow-md transition-shadow duration-200"
                          />
                          <div className="absolute inset-0 bg-black/20 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <Play className="w-6 h-6 text-white" />
                          </div>
                          {selectedVideo?.url === video.url && (
                            <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                              <Play className="w-3 h-3 text-white" />
                            </div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0 space-y-1">
                          <h4
                            className={`font-bold text-sm leading-tight line-clamp-2 ${
                              selectedVideo?.url === video.url
                                ? "text-blue-700"
                                : "text-slate-900 group-hover:text-slate-700"
                            }`}
                          >
                            {video.title}
                          </h4>
                          <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed">{video.description}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-1 rounded-full">
                              {video.duration}
                            </span>
                            <span className="text-xs text-slate-400">Video {idx + 1}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Play className="w-8 h-8 text-slate-400" />
                    </div>
                    <p className="text-slate-500 font-medium">No videos available</p>
                    <p className="text-slate-400 text-sm mt-1">Check back later for updates</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function getYouTubeEmbedUrl(url: string) {
  try {
    const u = new URL(url)
    let id = ''
    if (u.hostname.includes('youtu.be')) id = u.pathname.slice(1)
    else if (u.hostname.includes('youtube.com')) id = u.searchParams.get('v') || ''
    return id ? `https://www.youtube.com/embed/${id}` : url
  } catch (e) {
    return url
  }
}

function VideoWithError({ src }: { src: string }) {
  const [error, setError] = useState(false)
  return (
    <div className="w-full h-full bg-black relative">
      {!error ? (
        <video src={src} controls className="w-full rounded-2xl shadow-2xl aspect-video" preload="metadata" onError={() => setError(true)}>
          Your browser does not support the video tag.
        </video>
      ) : (
        <div className="p-4 text-sm text-center text-gray-200">
          No playable video found at this URL. Use a direct MP4 URL or import the video into Cloudinary.
        </div>
      )}
    </div>
  )
}
