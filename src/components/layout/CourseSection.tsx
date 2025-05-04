"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import { Search, Star, Filter, X } from "lucide-react"
import Link from "next/link"
import { coursesData, categories, languages, type CourseData } from "./data/courseData"

export default function CourseSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All category")
  const [selectedLanguage, setSelectedLanguage] = useState("All")
  const [selectedRating, setSelectedRating] = useState(0)
  const [showMobileFilter, setShowMobileFilter] = useState(false)
  const [filteredCourses, setFilteredCourses] = useState(coursesData)

  useEffect(() => {
    let result = coursesData

    if (searchQuery) {
      result = result.filter(
        (course) =>
          course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    if (selectedCategory !== "All category") {
      result = result.filter((course) => course.category === selectedCategory)
    }

    if (selectedLanguage !== "All") {
      result = result.filter((course) => course.language === selectedLanguage)
    }

    if (selectedRating > 0) {
      result = result.filter((course) => course.rating >= selectedRating)
    }

    setFilteredCourses(result)
  }, [searchQuery, selectedCategory, selectedLanguage, selectedRating])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

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
          <div className="flex justify-between items-center border border-gray-200 rounded p-2 mb-6">
            <span className="font-medium">Filter</span>
            <Filter size={20} />
          </div>

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

        {/* Main Content */}
        <div className="flex-1 py-6 px-4 md:px-6">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <div className="flex items-center justify-between w-full md:w-auto md:mr-2 relative">
              <span className="font-medium bg-blue-50 text-blue-700 px-4 py-2 rounded-md shadow-sm border border-blue-100">
                {filteredCourses.length} courses found
              </span>
              <button
                onClick={toggleMobileFilter}
                className="md:hidden flex items-center gap-1 bg-white px-3 py-2 rounded-md shadow-sm border border-gray-200"
              >
                <span className="text-sm font-medium">Categories</span>
                <Filter size={16} />
              </button>

              {showMobileFilter && (
                <div className="absolute top-full right-0 left-0 mt-2 bg-white rounded-md shadow-lg z-50 md:hidden border border-gray-200 max-h-[300px] overflow-y-auto">
                  <div className="p-3">
                    <div className="flex justify-between items-center mb-2">
                      <h2 className="font-medium text-base">Categories</h2>
                      <button onClick={toggleMobileFilter}>
                        <X size={18} />
                      </button>
                    </div>
                    <div className="space-y-2">
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
                </div>
              )}
            </div>

            {selectedCategory !== "All category" && (
              <FilterTag label={selectedCategory} onClear={() => setSelectedCategory("All category")} />
            )}
            {selectedLanguage !== "All" && (
              <FilterTag label={selectedLanguage} onClear={() => setSelectedLanguage("All")} />
            )}
            {selectedRating > 0 && (
              <FilterTag label={`${selectedRating}+ Stars`} onClear={() => setSelectedRating(0)} />
            )}

            {(selectedCategory !== "All category" ||
              selectedLanguage !== "All" ||
              selectedRating > 0) && (
              <button
                onClick={() => {
                  setSelectedCategory("All category")
                  setSelectedLanguage("All")
                  setSelectedRating(0)
                }}
                className="text-sm text-blue-600 hover:text-blue-800 underline ml-2"
              >
                Clear all filters
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                  rating={course.rating}
                  reviews={course.reviews}
                  imageSrc={course.imageSrc}
                  price={0}
                  originalPrice={null}
                />
              ))
            ) : (
              <div className="col-span-full bg-white rounded-lg p-8 text-center">
                <p className="text-lg text-gray-600">No courses found matching your criteria.</p>
                <button
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory("All category")
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

function FilterTag({ label, onClear }: { label: string; onClear: () => void }) {
  return (
    <div className="flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
      {label}
      <button onClick={onClear} className="ml-1 text-blue-600 hover:text-blue-800">
        <X size={14} />
      </button>
    </div>
  )
}

function CourseCard({
  subject,
  classLevel,
  title,
  description,
  lessons,
  hours,
  language,
  rating,
  reviews,
  imageSrc,
}: Omit<CourseData, "id" | "category">) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow duration-200 cursor-pointer h-full flex flex-col">
      <div className="relative h-[160px]">
        <div className="absolute top-0 left-0 right-0 h-10 bg-blue-600 flex items-center justify-center z-10">
          <span className="text-white font-bold">{subject}</span>
        </div>
        {classLevel && (
          <div className="absolute top-0 right-0 z-10">
            <div className="relative">
              <div className="w-0 h-0 border-t-[25px] border-t-transparent border-r-[25px] border-r-white"></div>
              <div className="absolute top-0 right-0 bg-white text-xs px-2 py-1 text-blue-600">{classLevel}</div>
            </div>
          </div>
        )}
        <div className="h-54 w-auto bg-blue-100">
          <Link href={"/course"} className="block h-full w-full pt-4">
            <Image
              src={"/assets/subject/science10.png"}
              alt={title}
              width={500}
              height={100}
              className="w-full h-full object-cover object-center"
            />
          </Link>
        </div>
      </div>

      <div className="p-3 mt-13 flex-1 flex flex-col">
        <div className="flex-1">
          <Link href={"/course"}>
            <h3 className="text-lg font-bold text-red-900 mb-1 line-clamp-1">{title}</h3>
          </Link>
          <p className="text-sm text-gray-700 mb-3 line-clamp-2">{description}</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-3">
            <CourseDetail label={`${lessons} Lessons`} />
            <CourseDetail label={`${hours} Hours`} />
            <CourseDetail label={language} />
          </div>
        </div>

        <div className="flex justify-end items-center mt-auto">
          <div className="flex items-center">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                />
              ))}
            </div>
            <span className="ml-1 text-xs text-gray-600">
              {reviews} {reviews === 1 ? "Review" : "Reviews"}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

function CourseDetail({ label }: { label: string }) {
  return (
    <div className="flex items-center">
      <div className="w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center mr-1">
        <span className="text-xs">•</span>
      </div>
      <span className="text-xs">{label}</span>
    </div>
  )
}
