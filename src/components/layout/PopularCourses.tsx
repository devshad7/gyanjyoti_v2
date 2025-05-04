"use client";

import React, { useEffect, useState } from "react";
import { createClient, Entry, EntrySkeletonType } from "contentful";
import { Button } from "../ui/button";
import CourseCard from "../ui/popularCoursesCard";

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN!,
  environment: "master",
});

const PopularCourses = () => {
  const [posts, setPosts] = useState<
    Entry<EntrySkeletonType, undefined, string>[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);

  async function getPosts() {
    try {
      const entries = await client.getEntries({
        content_type: "coursePost",
        limit: 4,
      });
      setLoading(false);
      setPosts(entries.items);
    } catch (error) {
      console.error("Error fetching entries:", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    getPosts();
  }, []);

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
          See All Ads
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((course) => (
          <CourseCard
            key={course.sys.id}
            slug={String(course.fields.slug)}
            image={`https:${
              (course.fields.thumbnail as any)?.fields?.file?.url
            }`}
            title={String(course.fields.title)}
            category={String(course.fields.caategory)}
            students="500+"
            rating="4.8"
            price={String(course.fields.price)}
          />
        ))}
      </div>
    </section>
  );
};

export default PopularCourses;
