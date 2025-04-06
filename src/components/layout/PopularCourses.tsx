import React from "react";
import { Button } from "../ui/button";
import CourseCard from "../ui/popularCoursesCard";

const PopularCourses = () => {
  return (
    <>
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold mb-2">Popular courses for you</h2>
            <p className="text-gray-600">
              Get the best course with the best price with world-class tutors
            </p>
          </div>
          <Button variant="link" className="text-indigo-600">
            See All Ads
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CourseCard
            image="/assets/course_preview.webp"
            title="Learn app development in 30 days"
            category="Web Design"
            students="500+"
            rating="4.8"
            price="$120.00"
          />
          <CourseCard
            image="/assets/course_preview.webp"
            title="Advance motion graphics"
            category="Animation Design"
            students="400+"
            rating="4.9"
            price="$150.00"
          />
          <CourseCard
            image="/assets/course_preview.webp"
            title="Learn CMS Development"
            category="Web Design"
            students="300+"
            rating="4.8"
            price="$135.00"
          />
          <CourseCard
            image="/assets/course_preview.webp"
            title="Learn Complete Web Design course"
            category="Web Design"
            students="500+"
            rating="4.8"
            price="$120.00"
          />
          <CourseCard
            image="/assets/course_preview.webp"
            title="Advance Drawing"
            category="Illustration"
            students="400+"
            rating="4.7"
            price="$105.00"
          />
          <CourseCard
            image="/assets/course_preview.webp"
            title="Advance videography course"
            category="Video Editing"
            students="300+"
            rating="4.8"
            price="$145.00"
          />
        </div>
      </section>
    </>
  );
};

export default PopularCourses;
