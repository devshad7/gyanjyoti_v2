import Blog from "@/components/layout/blog/Blog";
import { client } from "@/lib/contentful";
import React from "react";
import type { Metadata } from "next";
export const revalidate = 10;
export const metadata: Metadata = {
  title: "Blogs | Gyan Jyoti",
  description: "GyanJyoti is a leading Nepali e-learning platform offering high-quality video courses, interactive quizzes, downloadable PDFs, and the intelligent Gyan AI Assistant to help secondary-level students improve academic performance and achieve excellence.",
};
const page = async ({ params }: any) => {
  const { slug } = await params;

  const entries = await client.getEntries({
    content_type: "gyanjyotiBlog",
    "fields.slug": slug,
  });

  const post = entries.items.length > 0 ? entries.items[0] : null;

  if (!post) {
    return <div>Post not found page</div>;
  }

  return (
    <>
      <Blog post={post} />
    </>
  );
};

export default page;
