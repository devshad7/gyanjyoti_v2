import Blogs from "@/components/layout/blog/Blogs";
import { getBlogs } from "@/helper/getBlogs";
import React from "react";
import type { Metadata } from "next";

export const revalidate = 10;

export const metadata: Metadata = {
  title: "Blogs | Gyan Jyoti",
  description: "GyanJyoti is a leading Nepali e-learning platform offering high-quality video courses, interactive quizzes, downloadable PDFs, and the intelligent Gyan AI Assistant to help secondary-level students improve academic performance and achieve excellence.",
};
const Page = async () => {
  const blogs = await getBlogs();
  console.log(blogs);
  return (
    <>
      <Blogs blogs={blogs} />
    </>
  );
};

export default Page;
