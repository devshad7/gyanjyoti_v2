import { Clock, Play, Star, Users } from "lucide-react"

interface CourseStatsProps {
  duration: string
  totalVideos: string
  rating: number
  reviews: number
  students?: number
}

export default function CourseStats({ duration, totalVideos, rating, reviews, students = 0 }: CourseStatsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-gray-50 rounded-lg">
      <div className="flex items-center space-x-2">
        <Clock className="h-5 w-5 text-blue-500" />
        <div>
          <p className="text-sm text-gray-600">Duration</p>
          <p className="font-semibold">{duration}</p>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Play className="h-5 w-5 text-green-500" />
        <div>
          <p className="text-sm text-gray-600">Videos</p>
          <p className="font-semibold">{totalVideos}</p>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Star className="h-5 w-5 text-yellow-500" />
        <div>
          <p className="text-sm text-gray-600">Rating</p>
          <div className="flex items-center space-x-1">
            <span className="font-semibold">{rating}</span>
            <span className="text-sm text-gray-500">({reviews})</span>
          </div>
        </div>
      </div>

      {students > 0 && (
        <div className="flex items-center space-x-2">
          <Users className="h-5 w-5 text-purple-500" />
          <div>
            <p className="text-sm text-gray-600">Students</p>
            <p className="font-semibold">{students.toLocaleString()}</p>
          </div>
        </div>
      )}
    </div>
  )
}
