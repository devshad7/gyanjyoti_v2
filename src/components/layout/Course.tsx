import { ArrowRight, Clock, Monitor, Play, Shield, Star } from "lucide-react";
import Image from "next/image";
import React from "react";
import { options } from "@/lib/richTextType";
import { Badge } from "../ui/badge";
import HeroVideoDialog from "../magicui/hero-video-dialog";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import StickyCourseNav from "./StickyCourseNav";

const Course = ({ course }: any) => {
  return (
    <>
      {/* Sticky Course Nav */}
      <StickyCourseNav />
      <div className="max-w-7xl mx-auto min-h-screen bg-white">
        {/* Header Section */}
        <div className="relative px-4 py-10 md:py-16 overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute top-16 left-16 w-12 h-12 rounded-full bg-purple-500 opacity-80" />
          <div className="absolute top-16 right-16 w-12 h-12 rounded-full bg-blue-300 opacity-80" />
          <div className="absolute top-52 left-32 w-8 h-8 rounded-full bg-red-400 opacity-80" />
          <div className="absolute bottom-32 left-16 w-10 h-10 rounded-full bg-blue-500 opacity-80" />
          <div className="absolute bottom-32 right-16 w-10 h-10 rounded-full bg-yellow-400 opacity-80" />

          <div className="max-w-7xl mx-auto text-center relative z-10">
            <div className="flex justify-center mb-4">
              <Badge
                variant="outline"
                className="bg-yellow-400/90 text-black border-none px-4 py-1 text-sm font-medium"
              >
                {course.fields.caategory[0]}
              </Badge>
              <div className="flex items-center gap-1 ml-2 bg-gray-100 rounded-full px-3 py-1">
                <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">
                  J
                </div>
                <span className="text-sm">John Carter</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {course.fields.title}
            </h1>

            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              {course.fields.description}
            </p>

            <div className="rounded-lg overflow-hidden max-w-3xl mx-auto">
              {/* <Image
                src="/assets/course_preview.webp"
                alt="Course preview"
                width={800}
                height={400}
                className="w-full object-cover rounded-lg"
              /> */}
              <HeroVideoDialog
                className="block"
                animationStyle="from-center"
                videoSrc="https://www.youtube.com/embed/RVCYtPko5_Q?rel=0"
                thumbnailSrc={course.fields.thumbnail.fields.file.url}
                thumbnailAlt="Hero Video"
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Left Column - About the course */}
            <div className="md:col-span-2 space-y-8">
              <section>
                <h2 className="text-2xl font-bold mb-4">About the course</h2>
                <p className="text-gray-700 mb-4">
                  {documentToReactComponents(
                    course.fields.aboutCourse,
                    options
                  )}
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">
                  In this course you will be able to:
                </h2>
                <p className="text-gray-700 mb-4">
                  {documentToReactComponents(
                    course.fields.courseOutcome,
                    options
                  )}
                </p>
              </section>
            </div>

            {/* Right Column - Course details and teacher */}
            <div className="space-y-8">
              <div className="border rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-bold mb-6">Course details</h3>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-6 mr-3">
                      <Star className="h-5 w-5 text-red-500" />
                    </div>
                    <div>
                      <span className="text-gray-700">Level: </span>
                      <span className="font-medium">Basic</span>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-6 mr-3">
                      <Clock className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <span className="text-gray-700">Duration: </span>
                      <span className="font-medium">4hr 28m</span>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-6 mr-3">
                      <Play className="h-5 w-5 text-orange-500" />
                    </div>
                    <div>
                      <span className="text-gray-700">12 Videos</span>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-6 mr-3">
                      <Star className="h-5 w-5 text-yellow-500" />
                    </div>
                    <div>
                      <span className="text-gray-700">Lifetime Access</span>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-6 mr-3">
                      <Monitor className="h-5 w-5 text-purple-500" />
                    </div>
                    <div>
                      <span className="text-gray-700">
                        Access From Any Computer, Tablet or Mobile
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-6 mr-3">
                      <Shield className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <span className="text-gray-700">
                        30 days money guarantee
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-bold mb-6">Course teacher</h3>

                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                    <Image
                      src="/assets/confident-executive.png"
                      alt="John Carter"
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold">John Carter</h4>
                    <p className="text-gray-600">Illustration</p>
                  </div>
                </div>

                <p className="text-gray-700 text-sm mb-4">
                  Posuere quam vitae varius um est augue ullamcorper id faucibus
                  facil isis diam eget mauris et et lectus sed sit magna a eu
                  egestas nulla.
                </p>

                <a
                  href="#"
                  className="text-blue-500 inline-flex items-center text-sm"
                >
                  View full bio <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Course;
