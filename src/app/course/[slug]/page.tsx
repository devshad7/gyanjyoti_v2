import Course from "@/components/layout/Course";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Newsletter from "@/components/layout/Newsletter";
import { course } from "@/data/course";
import { createClient } from "contentful";
import { notFound } from "next/navigation";
import React from "react";

type ParamsProps = {
  params: { slug: string };
};

const Page = ({ params }: ParamsProps) => {
  const slug = params.slug;
  const courseData = course.find((p) => p.slug === slug);

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
