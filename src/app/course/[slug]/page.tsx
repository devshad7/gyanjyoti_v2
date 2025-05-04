// src/app/course/[slug]/page.tsx

import Course from "@/components/layout/Course";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Newsletter from "@/components/layout/Newsletter";
import { createClient } from "contentful";
import { notFound } from "next/navigation";
import React from "react";

// Correct client setup
const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN!,
  environment: "master",
});

interface PageProps {
  params: {
    slug: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const { slug } = await params;

  const entries = await client.getEntries({
    content_type: "coursePost",
    "fields.slug": slug,
  });

  const course = entries.items.length > 0 ? entries.items[0] : null;

  if (!course) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <Course course={course} />
      <Newsletter />
      <Footer />
    </>
  );
};

export default Page;
