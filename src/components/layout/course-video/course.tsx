import React from "react";
import { Badge } from "../../ui/badge";
import HeroVideoDialog from "../../magicui/hero-video-dialog";

const Course = () => {
  return (
    <>
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
                Illustration
              </Badge>
              <div className="flex items-center gap-1 ml-2 bg-gray-100 rounded-full px-3 py-1">
                <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">
                  D
                </div>
                <span className="text-sm">Dr. Pandey Raj</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Introduction to lighting on illustration
            </h1>

            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua
              exercitation ullamco.
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
                videoSrc="/assets/video/video1.mp4"
                thumbnailSrc="/assets/course_preview.webp"
                thumbnailAlt="Science Video"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Course;
