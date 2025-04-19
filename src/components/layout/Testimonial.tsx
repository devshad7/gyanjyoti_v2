"use client";

import React from "react";

const Testimonial = () => {
  const testimonials = [
    {
      id: 1,
      name: "Priyanka Baniya",
      school: "Khowpa Secondary School, Grade 12",
      content:
        "Thank you for this app. Most needed app in Nepal right now. I really find it so useful for me. The quizzes and notes in such simple language made it even easier to understand. I am using it daily to study and practice more MCQ-based questions.",
    },
    {
      id: 2,
      name: "Hacked Gamer",
      school: "Elite Grand School, Grade 8",
      content:
        "Words cannot describe how grateful I am for this application that helps me with my homework.",
    },
    {
      id: 3,
      name: "Aarav",
      school: "Kathmadnu World School, Grade 12",
      content:
        "Extraordinary Learning App! I highly recommend all students to utilize this app if they wish to achieve better results in their subjects. It provides ample knowledge that is truly beneficial. Give it a try, and I assure you, you won't be disappointed. Trust me, it's worth it.",
    },
    {
      id: 4,
      name: "Rinjin Gurung",
      school: "A Levels, British College",
      content:
        "I feel so fortunate to have been one of the first test users of MeroSiksha. First, I was so amazed to find all the resources I needed for my ALevels - from subject notes, videos to past papers and quizzes. So, it's been a friend to me. Now, I read and practice whatever and whenever I like. It's like playing a game. But, you also get to ace your exams with it. Haha!",
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
            <span className="text-blue-600">GyanJyoti</span>?
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
              <img
                src="https://kzmnj56rdh5jn041q15d.lite.vusercontent.net/placeholder.svg?height=400&width=500"
                alt="Student video testimonial"
                className="w-full h-full object-cover"
              />
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
