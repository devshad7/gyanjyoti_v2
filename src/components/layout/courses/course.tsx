import { ArrowRight, Clock, Monitor, Play, Shield, Star } from "lucide-react"
import Image from "next/image"
import React from "react"
import { Badge } from "@/components/ui/badge"
import StickyCourseNav from "./StickyCourseNav"
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, Key } from "react"
import { useRouter } from "next/navigation"

  // Back button handler
  function handleBack() {
    if (typeof window !== 'undefined') {
      window.history.back();
    }
  }
// Use a more professional font for headings and body
const headingFont = "font-sans font-extrabold tracking-tight text-gray-900"
const bodyFont = "font-sans text-gray-700"

type CourseProps = {
  courseData: any; // Replace 'any' with a more specific type if available
};

const Course = ({ courseData }: CourseProps) => {
  const router = useRouter();
  const handleJoin = () => {
    router.push(`/course/${courseData.slug}/joined`);
  };
  return (
    <>
  <div className="max-w-7xl mx-auto min-h-screen bg-white font-sans">
        {/* Header Section */}
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
  <div className="relative px-1 sm:px-2 py-4 md:py-8 overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute top-10 left-10 w-8 h-8 rounded-full bg-purple-400 opacity-60" />
          <div className="absolute top-10 right-10 w-8 h-8 rounded-full bg-blue-200 opacity-60" />
          <div className="absolute top-40 left-24 w-6 h-6 rounded-full bg-red-300 opacity-60" />
          <div className="absolute bottom-24 left-10 w-7 h-7 rounded-full bg-blue-400 opacity-60" />
          <div className="absolute bottom-24 right-10 w-7 h-7 rounded-full bg-yellow-300 opacity-60" />

          <div className="max-w-3xl mx-auto text-center relative z-10">
            <div className="flex flex-wrap justify-center items-center gap-2 mb-4">
              <Badge
                variant="outline"
                className="bg-yellow-400/90 text-black border-none px-4 py-1 text-xs sm:text-sm font-semibold tracking-wide"
              >
                {courseData.category}
              </Badge>
              <div className="flex items-center gap-1 bg-gray-100 rounded-full px-2 py-1">
                <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">
                  J
                </div>
                <span className="text-xs sm:text-sm font-medium">{courseData.teacherInfo.name}</span>
              </div>
            </div>

            <h1 className={`text-3xl sm:text-4xl md:text-5xl font-bold ${headingFont} mb-2 sm:mb-3`}>{courseData.title}</h1>

            <p className="text-gray-600 max-w-xl mx-auto mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed font-normal">{courseData.subtitle}</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-1 sm:px-2 py-4 sm:py-6">
          <div className="grid md:grid-cols-3 gap-4 md:gap-8">
            {/* Left Column - About the course */}
            <div className="md:col-span-2 space-y-5 sm:space-y-8">
              <section>
                <h2 className={`text-lg sm:text-xl font-bold mb-2 sm:mb-3 ${headingFont}`}>About the course</h2>
                <p className={`mb-3 text-sm sm:text-base leading-relaxed ${bodyFont}`}>{courseData.aboutCourse}</p>
              </section>

              <section>
                <h2 className={`text-lg sm:text-xl font-bold mb-2 sm:mb-3 ${headingFont}`}>In this course you will be able to:</h2>
                <ul className="list-disc pl-4 space-y-1 text-sm sm:text-base">
                  {courseData.whatYouWillLearn.map((item: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined, idx: Key | null | undefined) => (
                    <li key={idx} className={bodyFont}>
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            {/* Right Column - Course details and teacher */}
            <div className="space-y-5 sm:space-y-8">
              <div className="border rounded-2xl p-4 sm:p-5 shadow-md bg-gray-50">
                <h3 className={`text-base sm:text-lg font-bold mb-3 sm:mb-4 ${headingFont}`}>Course details</h3>

                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-center">
                    <div className="w-6 mr-3">
                      <Star className="h-5 w-5 text-red-500" />
                    </div>
                    <div>
                      <span className="text-gray-700 font-medium">Level: </span>
                      <span className="font-semibold text-gray-900">{courseData.courseDetails.level}</span>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-6 mr-3">
                      <Clock className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <span className="text-gray-700 font-medium">Duration: </span>
                      <span className="font-semibold text-gray-900">{courseData.courseDetails.duration}</span>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-6 mr-3">
                      <Play className="h-5 w-5 text-orange-500" />
                    </div>
                    <div>
                      <span className="text-gray-700 font-medium">Videos: </span>
                      <span className="font-semibold text-gray-900">{courseData.courseDetails.totalVideos}</span>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-6 mr-3">
                      <Star className="h-5 w-5 text-yellow-500" />
                    </div>
                    <div>
                      <span className="text-gray-700 font-medium">Access: </span>
                      <span className="font-semibold text-gray-900">{courseData.courseDetails.access}</span>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-6 mr-3">
                      <Monitor className="h-5 w-5 text-purple-500" />
                    </div>
                    <div>
                      <span className="text-gray-700 font-medium">Compatibility: </span>
                      <span className="font-semibold text-gray-900">{courseData.courseDetails.compatibility}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border rounded-2xl p-4 sm:p-5 shadow-md bg-gray-50">
                <h3 className={`text-base sm:text-lg font-bold mb-3 sm:mb-4 ${headingFont}`}>Course teacher</h3>

                <div className="flex items-center mb-3">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden mr-3 border-2 border-gray-200">
                    <Image
                      src={courseData.teacherInfo.profileUrl || "/placeholder.svg"}
                      alt={courseData.teacherInfo.name || "Teacher"}
                      width={56}
                      height={56}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm sm:text-base text-gray-900">{courseData.teacherInfo.name}</h4>
                    <p className="text-gray-500 text-xs sm:text-sm">Instructor</p>
                  </div>
                </div>

                <p className="text-gray-700 text-xs sm:text-sm mb-2 sm:mb-3 leading-relaxed">{courseData.teacherInfo.bio}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky nav at bottom using component, aligned left */}
        <StickyCourseNav onJoin={handleJoin} />
      </div>
    </>
  )
}

export default Course
