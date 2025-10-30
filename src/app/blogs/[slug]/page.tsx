import Blog from "@/components/layout/blog/Blog";
import { client } from "@/lib/contentful";
import React from "react";

export const revalidate = 10;

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
