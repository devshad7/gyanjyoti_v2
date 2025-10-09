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
        <video className="w-full h-full" controls preload="metadata" poster="/placeholder.svg?height=400&width=600">
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
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
