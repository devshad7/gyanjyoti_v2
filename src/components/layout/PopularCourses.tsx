"use client";

import React, { useEffect, useState } from "react";
import CourseCard from "../ui/courseCard";
import Link from "next/link";
import type { CoursePage } from "../../data/course";

type PopularCoursesProps = {
  courses?: CoursePage[];
  limit?: number;
};

// The PopularCourses component will show at most 4 cards regardless of the provided `limit` prop
export default function PopularCourses({ courses: initialCourses, limit = 4 }: PopularCoursesProps) {
  const [courses, setCourses] = useState<CoursePage[] | null>(initialCourses ?? null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // If caller passed courses, don't fetch
    if (initialCourses && initialCourses.length > 0) return;

    let mounted = true;
    setLoading(true);

    // Fetch live courses from an API route as a fallback
    fetch("/api/courses")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch courses");
        return res.json();
      })
      .then((json) => {
        if (!mounted) return;
        // API returns { success: true, data: [...] }
        const payload = json?.data ?? json
        setCourses(Array.isArray(payload) ? payload : []);
      })
      .catch((err) => {
        console.error("PopularCourses fetch error:", err);
        if (mounted && !initialCourses) setCourses([]);
      })
      .finally(() => mounted && setLoading(false));

    return () => {
      mounted = false;
    };
  }, [initialCourses]);

  // enforce a hard maximum of 4 cards
  const effectiveLimit = Math.min(limit ?? 4, 4);
  const items = (courses ?? []).slice(0, effectiveLimit);

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Popular Courses</h2>
        <Link href="/courses" className="text-sm text-blue-600">
          View all
        </Link>
      </div>

      {loading && !items.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: limit }).map((_, i) => (
            <div key={i} className="h-56 bg-white rounded-lg animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((c) => (
            <CourseCard
              key={c.slug}
              slug={c.slug}
              subject={c.subject}
              classLevel={c.classLevel}
              title={c.title}
              description={c.subtitle || c.aboutCourse}
              lessons={c.courseDetails?.totalVideos}
              hours={c.courseDetails?.duration}
              language={(c as any).languauge || (c as any).language}
              rating={c.rating}
              reviews={c.reviews}
              imageSrc={c.videoThumbnailUrl}
            />
          ))}
        </div>
      )}
    </section>
  );
}
