"use client";

import React from "react";
import HeroVideoDialog from "../magicui/hero-video-dialog";
const Testimonial = () => {
  const testimonials = [
    {
      id: 1,
      name: "Amit Kafle",
      school: "Everest English Boarding School",
      content:
        "Absolutely love this website! It's like a study buddy that's always there to help me. The MCQs, notes, and videos are super helpful. It's like having a teacher with me 24/7. Highly recommended!",
    },
    {
      id: 2,
      name: "Sakhxyam Pangeni",
      school: "New Horizon English Boarding School",
      content:
        "This website has changed the way I study. The notes are so easy to understand, and the quizzes help me prepare for exams. I love how I can practice whenever I want, and it's so much fun too!",
    },
    {
      id: 3,
      name: "Aaditya Dhakal",
      school: "Shree Sharada Secondary School",
      content:
        "Learning through this platform is easy as a breeze! The notes and quizzes are very straightforward and easy to comprehend. I use it every day to study and practice my skills. This is an awesome application that I would most definitely endorse!!",
    },
    {
      id: 4,
      name: "Jinisha Basyal",
      school: "Polestar Wisdom Boarding School",
      content:
        "Your site on education is very helpful for understanding the difficult topics very easily-as this comprises a lot more resources in the form of videos and quizzes, and notes. I feel much more at ease with my studies now because of that. Thank you very much to the team.",
      featured: true,
    },
  ];
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-12 overflow-hidden">
        {/* Main heading */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold">
            Why Students <span className="text-red-500">❤️</span>{" "}
            <span className="tracking-tight md:block hidden">
                <span className="text-[#275cc3] font-extrabold">Gyan</span>
                <span className="text-[#e20869] font-extrabold">Jyoti{" "}? </span>
              </span>
          </h1>
        </div>

        {/* Testimonials grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Left column testimonials */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <p className="mb-6">{testimonials[0].content}</p>
              <div>
                <h3 className="font-bold text-lg">{testimonials[0].name}</h3>
                <p className="text-gray-700">{testimonials[0].school}</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <p className="mb-6">{testimonials[1].content}</p>
              <div>
                <h3 className="font-bold text-lg">{testimonials[1].name}</h3>
                <p className="text-gray-700">{testimonials[1].school}</p>
              </div>
            </div>
          </div>

          {/* Middle column - video testimonial */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="relative aspect-[6/3] bg-gray-100">
              <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                GyanJyoti
              </div>
              <HeroVideoDialog
                className="block "
                animationStyle="from-center"
                videoSrc="/assets/video/gyanjyoti.mp4"
                thumbnailAlt="Hero Video" 
                thumbnailSrc={"/assets/testimonialthumbnail.jpg"}              />
            </div>
            <div className="p-6">
              <p className="mb-2">{testimonials[2].content}</p>
              <div>
                <h3 className="font-bold text-lg">{testimonials[2].name}</h3>
                <p className="text-gray-700">{testimonials[2].school}</p>
              </div>
            </div>
          </div>

          {/* Right column - featured testimonial */}
          <div className="bg-orange-50 text-black rounded-xl shadow-md p-6 relative overflow-hidden">
            <p className="mb-6">{testimonials[3].content}</p>
            <div>
              <h3 className="font-bold text-lg">{testimonials[3].name}</h3>
              <p className="text-blue-500">{testimonials[3].school}</p>
            </div>
            <div className="absolute bottom-0 right-0">
              <img
                src="/assets/student4.png"
                alt="Student with tablet"
                className="w-32 h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Testimonial;
