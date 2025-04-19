import Image from "next/image"
import { Button } from "../ui/button"

const Hero = () => {
  return (
    <>
   <section className="max-w-[1440px] mx-auto px-6 pt-8 md:pt-12 pb-12 md:pb-20 relative overflow-hidden font-sans rounded-md">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-yellow-400 opacity-10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-600 opacity-10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-pink-500 opacity-10 rounded-full blur-3xl"></div>

          {/* Subtle gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50 to-yellow-50"></div>
        </div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div className="relative z-10">
          <div className="inline-block px-3 py-1 mb-4 text-sm font-medium text-blue-800  bg-blue-100 rounded-full">
              Transforming Education
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight tracking-tight">
              Illuminate Your <span className="text-blue-600">Learning</span> Journey with{" "}
              <span className="text-pink-600">GyanJyoti</span>
            </h1>
            <p className="text-gray-600 mb-8 max-w-md text-lg font-normal">
              Access high-quality courses, interactive lessons, and expert mentorship to expand your knowledge and
              skills in a supportive digital learning environment.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md shadow-md hover:shadow-lg hover:shadow-blue-200/40 hover:translate-y-[-2px] transition-all duration-300 font-semibold cursor-pointer transform-gpu relative overflow-hidden group">
                <span className="relative z-10">Start Learning</span>
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-blue-700 group-hover:scale-105 transition-transform duration-300 ease-out"></span>
                <span className="absolute inset-0 w-0 h-full bg-gradient-to-r from-pink-600 to-blue-600 group-hover:w-full transition-all duration-500 ease-out"></span>
              </Button>
              <Button
                variant="outline"
                className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-md hover:bg-blue-50 hover:shadow-md hover:translate-y-[-2px] transition-all duration-300 font-semibold cursor-pointer transform-gpu"
              >
                Explore Courses
              </Button>
            </div>
          </div>
           
          <div className="relative">
            <div className="relative z-10">
              <div className="relative w-full h-[500px]">
                <Image
                  src="/assets/girl.png"
                  alt="Student with books"
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
            {/* Top right card */}
            <div className="absolute top-10 right-10 bg-white p-4 rounded-lg shadow-md z-20 hidden md:flex items-center space-x-3 hover:shadow-lg transition-all duration-300 hover:translate-y-[-2px]">
              <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838l-2.328.996.002 1.069c0 .527.213 1.028.589 1.405a.989.989 0 001.41 0l.002-.003.161.161a1.5 1.5 0 002.121 0l.161-.161.003.003a.989.989 0 001.41 0c.376-.376.589-.878.589-1.405v-1.064l.67-.287 3.356-1.437a1 1 0 000-1.84l-7-3zM8 10.93L5.173 9.763 1.357 7.967l-.171 1.81L5 11.257 8 12.74v-1.81zm1-1.383L12 7.67v1.81l-3 1.278v-1.21z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-bold">500+ Courses</p>
                <p className="text-xs text-gray-500">In various subjects</p>
              </div>
            </div>

            {/* New bottom left card */}
            <div className="absolute bottom-10 left-10 bg-white p-4 rounded-lg shadow-md z-20 hidden md:flex items-center space-x-3 hover:shadow-lg transition-all duration-300 hover:translate-y-[-2px]">
              <div className="w-10 h-10 rounded-full bg-pink-600 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z"
                    clipRule="evenodd"
                    fillRule="evenodd"
                  />
                  <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-bold">Expert Mentors</p>
                <p className="text-xs text-gray-500">Learn from professionals</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Hero
