"use client"

import Link from "next/link"
import { Button } from "../ui/button"
import Image from "next/image"
import { useEffect, useState } from "react"
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    // Add event listener
    window.addEventListener("scroll", handleScroll, { passive: true })

    // Call once to set initial state
    handleScroll()

    // Clean up
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [scrolled])

  return (
    <>
      <div
        className={`sticky top-0 z-50 transition-all duration-300 will-change-transform ${inter.variable} font-sans ${
          scrolled
            ? "bg-white/15 backdrop-blur-xl border-b border-white/10 shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
            : "bg-transparent backdrop-blur-[6px]"
        }`}
      >
        <nav className="max-w-7xl mx-auto py-4 px-6 flex items-center justify-between">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-lg md:text-xl font-bold flex items-center gap-3 group relative"
              aria-label="GyanJyoti Home"
            >
              <div className="relative overflow-hidden rounded-lg group-hover:shadow-md transition-shadow duration-300">
                <Image
                  src="/assets/Gyan_logo.png"
                  alt=""
                  width={36}
                  height={36}
                  className="w-auto h-9 md:h-10 transition-transform duration-500 group-hover:scale-110"
                  priority
                />
              </div>
              <span className="tracking-tight">
                <span className="text-blue-600 font-extrabold">Gyan</span>
                <span className="text-pink-600 font-extrabold">Jyoti</span>
              </span>

              {/* Subtle hover effect line */}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-pink-600 group-hover:w-full transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100"></span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center">
            <div className="flex space-x-1">
              {[
                { name: "Home", href: "/", active: true },
                { name: "Courses", href: "/Course-section", active: false },
                { name: "Mentors", href: "/mentors", active: false },
                { name: "About", href: "/about", active: false },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative px-4 py-2 text-sm font-medium rounded-md transition-all duration-300 ease-in-out ${
                    item.active ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                  } hover:bg-blue-50/50`}
                >
                  {item.name}
                  {item.active && (
                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-blue-600 rounded-full"></span>
                  )}
                </Link>
              ))}
            </div>
          </nav>

          <div className="flex items-center space-x-3">
            <Button
              variant="link"
              className="text-sm text-gray-700 hover:text-pink-600 font-medium cursor-pointer transition-colors duration-300 relative overflow-hidden group"
            >
              <span className="relative z-10">Sign In</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-600 group-hover:w-full transition-all duration-300 ease-in-out"></span>
            </Button>

            <Button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-5 py-2 rounded-md font-medium cursor-pointer shadow-sm hover:shadow-md transition-all duration-300 transform-gpu relative overflow-hidden group">
              <span className="relative z-10">Register</span>
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-blue-700 group-hover:scale-105 transition-transform duration-300 ease-out"></span>
              <span className="absolute inset-0 w-0 h-full bg-gradient-to-r from-pink-600 to-blue-600 group-hover:w-full transition-all duration-500 ease-out"></span>
            </Button>
          </div>
        </nav>
      </div>
    </>
  )
}

export default Navbar
