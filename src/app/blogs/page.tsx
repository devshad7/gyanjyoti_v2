import Blogs from "@/components/layout/blog/Blogs";
import { getBlogs } from "@/helper/getBlogs";
import React from "react";

export const revalidate = 10;

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
