import Image from "next/image"
import React from "react"
import Course from "@/components/layout/CourseSection"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"

export default function page() {

  return (
   <>
   <Navbar />
   <Course />
   <Footer />
    </>
  )
}
