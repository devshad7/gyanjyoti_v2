"use client"

import { BookOpen, Users, GraduationCap } from "lucide-react"

export default function Stats() {
  const stats = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      value: "10k+",
      label: "Total Courses",
      color: "bg-amber-50",
      iconColor: "text-amber-500",
      valueColor: "text-amber-600",
    },
    {
      icon: <Users className="w-6 h-6" />,
      value: "500+",
      label: "Expert Mentors",
      color: "bg-emerald-50",
      iconColor: "text-emerald-500",
      valueColor: "text-emerald-600",
    },
    {
      icon: <GraduationCap className="w-6 h-6" />,
      value: "300k+",
      label: "Students Globally",
      color: "bg-rose-50",
      iconColor: "text-rose-500",
      valueColor: "text-rose-600",
    },
  ]

  return (
    <section className="max-w-7xl mx-auto py-12 px-4 sm:px-6">

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`flex flex-col items-center text-center p-6 rounded-xl ${stat.color} transition-all duration-300 hover:shadow-md hover:-translate-y-1`}
          >
            <div className={`p-3 rounded-full ${stat.iconColor} bg-white shadow-sm mb-4`}>{stat.icon}</div>
            <h2 className={`text-3xl font-bold ${stat.valueColor} mb-1`}>{stat.value}</h2>
            <p className="text-gray-700 uppercase text-sm font-medium tracking-wider">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
