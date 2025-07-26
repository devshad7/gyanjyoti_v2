import Course from "@/components/layout/Course";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Newsletter from "@/components/layout/Newsletter";
import { course } from "@/data/course";
import { createClient } from "contentful";
import { notFound } from "next/navigation";
import React from "react";

<<<<<<< HEAD
type ParamsProps = {
  params: { slug: string };
};

const Page = ({ params }: ParamsProps) => {
  const slug = params.slug;
  const courseData = course.find((p) => p.slug === slug);
=======
const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN!,
  environment: "master",
});

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const Page = async ({ params }: PageProps) => {
  const { slug } = await params;
>>>>>>> a1c263a7b28174b6f7ffed72b9f18c9a55414f33

  if (!courseData) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <Course courseData={courseData} />
      <Newsletter />
      <Footer />
    </>
  );
};

export default Page;
