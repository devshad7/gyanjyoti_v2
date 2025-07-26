"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import CourseCard from "../ui/popularCoursesCard";
import { course } from "@/data/course";
const PopularCourses = () => {
  const [posts, setPosts] = useState(course);

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold mb-2">Popular courses for you</h2>
          <p className="text-gray-600">
            Get the best course with the best price with world-class tutors
          </p>
        </div>
        <Button variant="link" className="text-indigo-600">
          See All Courses
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((course) => (
          <CourseCard
            key={course.slug}
            slug={course.slug}
            image={course.videoThumbnailUrl}
            title={course.title}
            category={course.category}
            students="500+"
            rating={course.rating}
            price={course.price}
          />
        ))}
      </div>
    </section>
  );
};

export default PopularCourses;
