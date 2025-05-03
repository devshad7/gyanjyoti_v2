import React from "react";
import { Button } from "../../ui/button";
import CourseCard from "../../ui/popularCoursesCard";
import Link from "next/link";
const PopularCourses = () => {
  return (
    <>
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold mb-2">Class 10 Science</h2>
            <p className="text-gray-600">
              Get the best course with best class tutors - GyanJyoti
            </p>
          </div>
          <Button variant="link" className="text-indigo-600">
            See All Ads
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/v1" className="block">
            <CourseCard
              image="/assets/course_preview.webp"
              title="Learn app development in 30 days"
              category="Web Design"
              students="500+"
            />
          </Link>
          <CourseCard
            image="/assets/course_preview.webp"
            title="Advance motion graphics"
            category="Animation Design"
            students="400+"
          />
          <CourseCard
            image="/assets/course_preview.webp"
            title="Learn CMS Development"
            category="Web Design"
            students="300+"
          />
          <CourseCard
            image="/assets/course_preview.webp"
            title="Learn Complete Web Design course"
            category="Web Design"
            students="500+"
          />
          <CourseCard
            image="/assets/course_preview.webp"
            title="Advance Drawing"
            category="Illustration"
            students="400+"
          />
          <CourseCard
            image="/assets/course_preview.webp"
            title="Advance videography course"
            category="Video Editing"
            students="300+"
          />
        </div>
      </section>
    </>
  );
};

export default PopularCourses;
