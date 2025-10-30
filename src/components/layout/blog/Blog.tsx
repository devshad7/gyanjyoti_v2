import React from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { options } from "@/lib/richTextType";
import { Separator } from "@/components/ui/separator";

const Blog = ({ post }: any) => {
  return (
    <>
      <div className=" max-w-6xl mx-auto pt-16 pb-10 px-6">
        <div className="">
          <img
            src={post.fields.featuredImage.fields.file.url}
            alt=""
            className="rounded-2xl"
          />
        </div>
        <section className="mt-10">
          {documentToReactComponents(post.fields.content, options)}
        </section>
        <Separator className="mt-10" />
      </div>
    </>
  );
};

export default Blog;
