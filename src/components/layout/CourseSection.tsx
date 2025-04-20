"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Search, Star, Filter, X } from "lucide-react"
import Link from "next/link"
// Course data
const coursesData = [
  {
    id: "acc-10",
    subject: "ACCOUNT",
    classLevel: "Class 10",
    title: "Account Class 10 @ 1 Year",
    description: "Account Class 10 videos According to Curriculum Development Centre, Nepal (Revised on 2080 BS)",
    lessons: 115,
    hours: "21+",
    language: "Nepali",
    level: "Intermediate",
    price: 9999,
    originalPrice: null,
    rating: 5,
    reviews: 1,
    imageSrc: "/placeholder.svg?height=150&width=150",
    category: "Class 10",
  },
  {
    id: "acc-11",
    subject: "ACCOUNT",
    classLevel: "Class 11",
    title: "Account Class 11",
    description: "Account Class 11 videos According to National Examinations Board(NEB) Syllabus, Nepal.",
    lessons: 51,
    hours: "16+",
    language: "Nepali",
    level: "Intermediate",
    price: 999,
    originalPrice: 1999,
    rating: 5,
    reviews: 2,
    imageSrc: "/placeholder.svg?height=150&width=150",
    category: "Class 11",
  },
  {
    id: "acc-12",
    subject: "ACCOUNT",
    classLevel: "Class 12",
    title: "Account Class 12",
    description: "After the completion of this course, students will get the complete knowledge of Class 12 Account.",
    lessons: 137,
    hours: "20+",
    language: "English",
    level: "Intermediate",
    price: 999,
    originalPrice: 1999,
    rating: 5,
    reviews: 1,
    imageSrc: "/placeholder.svg?height=150&width=150",
    category: "Class 12",
  },
  {
    id: "acc-8",
    subject: "ACCOUNT",
    classLevel: "Class 8",
    title: "Account Class 8 @ 1 Year",
    description: "Account Class 8 videos According to Curriculum Development Centre, Nepal (Revised on 2080 BS)",
    lessons: 65,
    hours: "8+",
    language: "Nepali",
    level: "Beginner",
    price: 9999,
    originalPrice: null,
    rating: 0,
    reviews: 0,
    imageSrc: "/placeholder.svg?height=150&width=150",
    category: "Class 8",
  },
  {
    id: "acc-9",
    subject: "ACCOUNT",
    classLevel: "Class 9",
    title: "Account Class 9 @ 1 Year",
    description:
      "Account Class 9 (New Syllabus) videos According to Curriculum Development Centre, Nepal (Revised on 2080 BS)",
    lessons: 181,
    hours: "26+",
    language: "Nepali",
    level: "Intermediate",
    price: 9999,
    originalPrice: null,
    rating: 0,
    reviews: 0,
    imageSrc: "/placeholder.svg?height=150&width=150",
    category: "Class 9",
  },
  {
    id: "adobe-ae",
    subject: "ADOBE AFTER EFFECTS",
    classLevel: "",
    title: "Adobe After Effects",
    description: "A complete course on Adobe After Effects.",
    lessons: 42,
    hours: "4+",
    language: "Nepali",
    level: "Beginner",
    price: 499,
    originalPrice: 999,
    rating: 5,
    reviews: 6,
    imageSrc: "/placeholder.svg?height=150&width=150",
    category: "Design and Creative Skills",
  },
]

// Categories for filter
const categories = [
  "All category",
  "Class 8",
  "Class 9",
  "Class 10",
  "Class 11",
  "Class 12",
  "Design and Creative Skills",
  "Engineering",
  "Engineering Design Courses",
  "Engineering Preparation",

]

// Levels for filter
const levels = ["All", "Beginner", "Intermediate", "Advanced"]

// Languages for filter
const languages = ["All", "English", "Nepali"]

export default function CourseSection() {
  // State for search query
  const [searchQuery, setSearchQuery] = useState("")

  // State for filters
  const [selectedCategory, setSelectedCategory] = useState("All category")
  const [selectedLevel, setSelectedLevel] = useState("All")
  const [selectedLanguage, setSelectedLanguage] = useState("All")
  const [selectedRating, setSelectedRating] = useState(0)

  // State for mobile filter visibility
  const [showMobileFilter, setShowMobileFilter] = useState(false)

  // State for filtered courses
  const [filteredCourses, setFilteredCourses] = useState(coursesData)

  // Apply filters when any filter changes
  useEffect(() => {
    let result = coursesData

    // Apply search filter
    if (searchQuery) {
      result = result.filter(
        (course) =>
          course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Apply category filter
    if (selectedCategory !== "All category") {
      result = result.filter((course) => course.category === selectedCategory)
    }

    // Apply level filter
    if (selectedLevel !== "All") {
      result = result.filter((course) => course.level === selectedLevel)
    }

    // Apply language filter
    if (selectedLanguage !== "All") {
      result = result.filter((course) => course.language === selectedLanguage)
    }

    // Apply rating filter
    if (selectedRating > 0) {
      result = result.filter((course) => course.rating >= selectedRating)
    }

    setFilteredCourses(result)
  }, [searchQuery, selectedCategory, selectedLevel, selectedLanguage, selectedRating])

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  // Toggle mobile filter visibility
  const toggleMobileFilter = () => {
    setShowMobileFilter(!showMobileFilter)
  }

  return (
    <div className="flex flex-col bg-blue-50 min-h-screen">
      {/* Header with Search */}
      <div className="p-4 shadow-sm sticky top-0 z-10 bg-blue-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="relative max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-1 container mx-auto px-4 md:px-8">
        {/* Left Sidebar - Desktop */}
        <div className="hidden md:block w-[250px] bg-white p-4 border-r border-gray-200 flex-shrink-0 h-[calc(100vh-80px)] sticky top-[80px] overflow-y-auto">
          {/* Filter Header */}
          <div className="flex justify-between items-center border border-gray-200 rounded p-2 mb-6">
            <span className="font-medium">Filter</span>
            <Filter size={20} />
          </div>

          {/* Categories */}
          <div className="mb-6">
            <h3 className="font-medium mb-2">Categories</h3>
            <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2">
              {categories.map((category) => (
                <CategoryOption
                  key={category}
                  label={category}
                  checked={selectedCategory === category}
                  onChange={() => setSelectedCategory(category)}
                />
              ))}
            </div>
          </div>

          {/* Level */}
          <div className="mb-6">
            <h3 className="font-medium mb-2">Level</h3>
            <div className="space-y-2">
              {levels.map((level) => (
                <CategoryOption
                  key={level}
                  label={level}
                  checked={selectedLevel === level}
                  onChange={() => setSelectedLevel(level)}
                />
              ))}
            </div>
          </div>

          {/* Language */}
          <div className="mb-6">
            <h3 className="font-medium mb-2">Language</h3>
            <div className="space-y-2">
              {languages.map((language) => (
                <CategoryOption
                  key={language}
                  label={language}
                  checked={selectedLanguage === language}
                  onChange={() => setSelectedLanguage(language)}
                />
              ))}
            </div>
          </div>

          {/* Ratings */}
          <div>
            <h3 className="font-medium mb-2">Ratings</h3>
            <div className="space-y-2">
              <CategoryOption label="All" checked={selectedRating === 0} onChange={() => setSelectedRating(0)} />
              {[1, 2, 3, 4, 5].map((stars) => (
                <RatingOption
                  key={stars}
                  stars={stars}
                  checked={selectedRating === stars}
                  onChange={() => setSelectedRating(stars)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Filter Sidebar */}
        {showMobileFilter && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
            <div className="absolute right-0 top-0 h-full w-[280px] bg-white p-4 overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-bold text-lg">Filters</h2>
                <button onClick={toggleMobileFilter}>
                  <X size={24} />
                </button>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Categories</h3>
                <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2">
                  {categories.map((category) => (
                    <CategoryOption
                      key={category}
                      label={category}
                      checked={selectedCategory === category}
                      onChange={() => {
                        setSelectedCategory(category)
                        toggleMobileFilter()
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Level */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Level</h3>
                <div className="space-y-2">
                  {levels.map((level) => (
                    <CategoryOption
                      key={level}
                      label={level}
                      checked={selectedLevel === level}
                      onChange={() => {
                        setSelectedLevel(level)
                        toggleMobileFilter()
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Language */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Language</h3>
                <div className="space-y-2">
                  {languages.map((language) => (
                    <CategoryOption
                      key={language}
                      label={language}
                      checked={selectedLanguage === language}
                      onChange={() => {
                        setSelectedLanguage(language)
                        toggleMobileFilter()
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Ratings */}
              <div>
                <h3 className="font-medium mb-2">Ratings</h3>
                <div className="space-y-2">
                  <CategoryOption
                    label="All"
                    checked={selectedRating === 0}
                    onChange={() => {
                      setSelectedRating(0)
                      toggleMobileFilter()
                    }}
                  />
                  {[1, 2, 3, 4, 5].map((stars) => (
                    <RatingOption
                      key={stars}
                      stars={stars}
                      checked={selectedRating === stars}
                      onChange={() => {
                        setSelectedRating(stars)
                        toggleMobileFilter()
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 py-6 pl-4 md:pl-6 lg:pl-8">
          {/* Results count and active filters */}
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="font-medium bg-blue-50 text-blue-700 px-4 py-2 rounded-md shadow-sm border border-blue-100">
              {filteredCourses.length} courses found
            </span>

            {selectedCategory !== "All category" && (
              <div className="flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                {selectedCategory}
                <button
                  onClick={() => setSelectedCategory("All category")}
                  className="ml-1 text-blue-600 hover:text-blue-800"
                >
                  <X size={14} />
                </button>
              </div>
            )}

            {selectedLevel !== "All" && (
              <div className="flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                {selectedLevel}
                <button onClick={() => setSelectedLevel("All")} className="ml-1 text-blue-600 hover:text-blue-800">
                  <X size={14} />
                </button>
              </div>
            )}

            {selectedLanguage !== "All" && (
              <div className="flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                {selectedLanguage}
                <button onClick={() => setSelectedLanguage("All")} className="ml-1 text-blue-600 hover:text-blue-800">
                  <X size={14} />
                </button>
              </div>
            )}

            {selectedRating > 0 && (
              <div className="flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                {selectedRating}+ Stars
                <button onClick={() => setSelectedRating(0)} className="ml-1 text-blue-600 hover:text-blue-800">
                  <X size={14} />
                </button>
              </div>
            )}

            {(selectedCategory !== "All category" ||
              selectedLevel !== "All" ||
              selectedLanguage !== "All" ||
              selectedRating > 0) && (
              <button
                onClick={() => {
                  setSelectedCategory("All category")
                  setSelectedLevel("All")
                  setSelectedLanguage("All")
                  setSelectedRating(0)
                }}
                className="text-sm text-blue-600 hover:text-blue-800 underline ml-2"
              >
                Clear all filters
              </button>
            )}
          </div>

          {/* Course cards */}
          <div className="space-y-4">
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  subject={course.subject}
                  classLevel={course.classLevel}
                  title={course.title}
                  description={course.description}
                  lessons={course.lessons}
                  hours={course.hours}
                  language={course.language}
                  level={course.level}
                  price={course.price}
                  originalPrice={course.originalPrice}
                  rating={course.rating}
                  reviews={course.reviews}
                  imageSrc={course.imageSrc}
                />
              ))
            ) : (
              <div className="bg-white rounded-lg p-8 text-center">
                <p className="text-lg text-gray-600">No courses found matching your criteria.</p>
                <button
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory("All category")
                    setSelectedLevel("All")
                    setSelectedLanguage("All")
                    setSelectedRating(0)
                  }}
                  className="mt-4 text-blue-600 hover:text-blue-800 underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function CategoryOption({
  label,
  checked = false,
  onChange,
}: {
  label: string
  checked?: boolean
  onChange: () => void
}) {
  return (
    <div className="flex items-center cursor-pointer" onClick={onChange}>
      <div className="h-4 w-4 rounded-full border border-gray-300 flex items-center justify-center mr-2 relative">
        {checked && <div className="h-2 w-2 rounded-full bg-red-500 absolute"></div>}
      </div>
      <span className="text-sm">{label}</span>
    </div>
  )
}

function RatingOption({
  stars,
  checked = false,
  onChange,
}: {
  stars: number
  checked?: boolean
  onChange: () => void
}) {
  return (
    <div className="flex items-center cursor-pointer" onClick={onChange}>
      <div className="h-4 w-4 rounded-full border border-gray-300 flex items-center justify-center mr-2 relative">
        {checked && <div className="h-2 w-2 rounded-full bg-red-500 absolute"></div>}
      </div>
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={`h-4 w-4 ${i < stars ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
        ))}
      </div>
    </div>
  )
}

interface CourseCardProps {
  subject: string
  classLevel: string
  title: string
  description: string
  lessons: number
  hours: string
  language: string
  level: string
  price: number
  originalPrice?: number | null
  rating: number
  reviews: number
  imageSrc: string
}

function CourseCard({
  subject,
  classLevel,
  title,
  description,
  lessons,
  hours,
  language,
  level,
  rating,
  reviews,
  imageSrc,
}: CourseCardProps) {
  return (
    <div className="bg-white max-w-7xl  mx-auto rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow duration-200 cursor-pointer">
      <div className="flex flex-col sm:flex-row">
        {/* Left side with image */}
        <div className="relative w-full sm:w-[225px] h-[160px]">
        
          {/* Subject header */}
          <div className="absolute top-0 left-0 right-0 h-10 bg-blue-600 flex items-center justify-center">
            <span className="text-white font-bold">{subject}</span>
          </div>
          
          {/* Class level badge */}
          {classLevel && (
            <div className="absolute top-0 right-0">
              <div className="relative">
                <div className="w-0 h-0 border-t-[25px] border-t-transparent border-r-[25px] border-r-white"></div>
                <div className="absolute top-0 right-0 bg-white text-xs px-2 py-1 text-blue-600">{classLevel}</div>
              </div>
            </div>
          )}

          {/* Course image */}
          <div className="h-full w-full flex items-center justify-center pt-10 bg-blue-100">
          <Link href={"/course"}>
            <Image
              src={imageSrc || "/assets/eng.jpeg"}
              alt={title}
              width={150}
              height={150}
              className="object-contain"
            /> </Link>
          </div>
        </div>

        {/* Right side with content */}
        <div className="flex-1 p-4 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold text-red-900 mb-1">{title}</h3>
            <p className="text-sm text-gray-700 mb-3">{description}</p>

            {/* Course details */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-4">
              <div className="flex items-center">
                <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                  <span className="text-xs">•</span>
                </div>
                <span className="text-sm">{lessons} Lessons</span>
              </div>

              <div className="flex items-center">
                <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                  <span className="text-xs">•</span>
                </div>
                <span className="text-sm">{hours} Hours</span>
              </div>

              <div className="flex items-center">
                <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                  <span className="text-xs">•</span>
                </div>
                <span className="text-sm">{language}</span>
              </div>

              <div className="text-sm text-gray-600 ml-2">{level}</div>
            </div>
          </div>

          {/* Price section removed */}
          <div className="flex justify-end items-center mt-2">
            {/* Rating */}
            <div className="flex items-center">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <span className="ml-1 text-sm text-gray-600">
                {reviews} {reviews === 1 ? "Review" : "Reviews"}
              </span>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  )
}
