export interface Course {
  _id?: string
  title: string
  slug: string
  subject: string
  classLevel: string
  description: string
  aboutCourse: string
  detailedDescription: string
  subtitle: string
  category: string
  language: string
  rating: number
  reviews: number
  videoThumbnailUrl: string
  videos: Video[]
  courseDetails: CourseDetails
  teacherInfo: TeacherInfo
  whatYouWillLearn: string[]
  createdAt?: Date
  updatedAt?: Date
}

export interface Video {
  title: string
  url: string
  duration: string
  description?: string
}

export interface CourseDetails {
  level: string
  duration: string
  totalVideos: string
  access: string
  compatibility: string
  guarantee: string
}

export interface TeacherInfo {
  name: string
  profileUrl: string
  bio: string
}

export interface CoursePage extends Course {
  // Additional fields for course page display
}
