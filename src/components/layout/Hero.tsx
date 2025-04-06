import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";

const Hero = () => {
  return (
    <>
      <section className="max-w-7xl mx-auto px-4 py-12 md:py-20 relative overflow-hidden">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Getting <span className="text-indigo-600">Quality</span> Education
              Is Now More <span className="text-indigo-600">Easy</span>
            </h1>
            <p className="text-gray-600 mb-8 max-w-md">
              Provides you with the latest online learning system and material
              that help your knowledge growing.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button className="bg-indigo-600 hover:bg-indigo-700 cursor-pointer">
                Get Started
              </Button>
              <Button
                variant="outline"
                className="border-indigo-600 text-indigo-600 hover:bg-indigo-50 cursor-pointer"
              >
                Get free trial
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="relative z-10">
              <div className="relative w-full h-[500px] rounded-full overflow-hidden">
                <Image
                  src="/assets/hero.webp"
                  alt="Student with books"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute top-0 right-14 w-64 h-64 bg-indigo-600 rounded-full opacity-20 -translate-y-1/4 translate-x-1/4"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-600 rounded-full opacity-20 translate-y-1/4 -translate-x-1/4"></div>
            <div className="absolute top-1/2 right-10 w-16 h-16 bg-indigo-600 rounded-full opacity-70 -translate-y-1/2 translate-x-1/2"></div>
          </div>
        </div>
        {/* Decorative circles */}
        <div className="absolute left-1/4 bottom-12 w-6 h-6 bg-indigo-300 rounded-full"></div>
        <div className="absolute right-1/4 bottom-24 w-6 h-6 bg-indigo-600 rounded-full"></div>
      </section>
    </>
  );
};

export default Hero;
