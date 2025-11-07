"use client"

import { BookOpen, Users, GraduationCap } from "lucide-react"

export default function Stats() {
  const stats = [
    {
      icon: <BookOpen className="w-5 h-5" />,
      value: "50+",
      label: "Total Courses",
      description: "Comprehensive learning paths",
      color: "from-blue-50 to-blue-100",
      iconBg: "bg-blue-500/10",
      iconColor: "text-blue-600",
      valueColor: "text-blue-700",
      accentColor: "border-blue-200",
    },
    {
      icon: <Users className="w-5 h-5" />,
      value: "6+",
      label: "Expert Mentors",
      description: "Industry professionals",
      color: "from-emerald-50 to-emerald-100",
      iconBg: "bg-emerald-500/10",
      iconColor: "text-emerald-600",
      valueColor: "text-emerald-700",
      accentColor: "border-emerald-200",
    },
    {
      icon: <GraduationCap className="w-5 h-5" />,
      value: "320+",
      label: "Students",
      description: "Growing community",
      color: "from-amber-50 to-amber-100",
      iconBg: "bg-amber-500/10",
      iconColor: "text-amber-600",
      valueColor: "text-amber-700",
      accentColor: "border-amber-200",
    },
  ]

  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">Growing Together</h2>
      <p className="text-gray-600 mb-6 md:mb-8 max-w-2xl">
        Join thousands of learners in our thriving community
      </p>
      {/* Background decoration */}
      {/* decorative blobs — hidden on small screens to avoid clipping */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
        <div className="absolute top-0 right-0 w-48 h-48 md:w-72 md:h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" aria-hidden></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 md:w-72 md:h-72 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" aria-hidden></div>
      </div>

      <div className="relative max-w-6xl mx-auto">
       
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 items-stretch">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-xl md:rounded-2xl border-2 ${stat.accentColor} bg-gradient-to-br ${stat.color} p-4 md:p-5 lg:p-6 transition-all duration-500 hover:shadow-lg hover:border-opacity-100 hover:-translate-y-1 md:hover:-translate-y-2 cursor-default flex flex-col md:flex-row md:items-center md:justify-between`}
            >
              {/* Hover gradient effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />

              <div className="relative flex items-start md:items-center md:space-x-4 w-full">
                {/* Icon */}
                <div
                  className={`flex-shrink-0 inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-lg md:rounded-xl ${stat.iconBg} ${stat.iconColor} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 mr-0 md:mr-3`}
                >
                  {stat.icon}
                </div>

                {/* Text block (value + label) */}
                <div className="flex-1">
                  <p className={`text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold ${stat.valueColor} mb-0 transition-colors`}>{stat.value}</p>
                  <p className="text-sm md:text-base font-semibold text-gray-800 mb-0">{stat.label}</p>
                  <p className="text-xs md:text-sm text-gray-600">{stat.description}</p>
                </div>

                {/* Optional right-side small accent on large screens */}
                <div className="hidden md:block ml-4" aria-hidden />
              </div>

              {/* Bottom accent line */}
              <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${stat.color} w-0 group-hover:w-full transition-all duration-500`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
