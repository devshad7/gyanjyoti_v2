"use client"

import { useState } from "react"

interface CourseVideoPlayerProps {
  videoUrl: string
  title: string
  description?: string
}

export default function CourseVideoPlayer({ videoUrl, title, description }: CourseVideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)

  return (
    <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
      {/* Video Header */}
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {description && <p className="text-sm text-gray-600 mt-1">{description}</p>}
      </div>

      {/* Video Container */}
      <div className="relative aspect-video bg-black">
        {/(youtube\.com|youtu\.be)/i.test(videoUrl) ? (
          <iframe
            src={getYouTubeEmbedUrl(videoUrl)}
            title={title}
            className="w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <VideoWithError src={videoUrl} />
        )}
      </div>

      {/* Video Info */}
      <div className="p-4">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>HD Quality Available</span>
          <span>Playback Speed: 1x</span>
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
    <div className="w-full h-full bg-black relative flex items-center justify-center">
      {!error ? (
        <video src={src} controls className="w-full h-full object-cover" preload="metadata" onError={() => setError(true)}>
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
