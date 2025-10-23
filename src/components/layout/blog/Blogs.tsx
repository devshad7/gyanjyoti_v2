import { BlogPost, blogs } from "@/data/blogs";
import { Clock } from "lucide-react";
import Link from "next/link";
import React from "react";

const Blogs = () => {
  return (
    <div className="max-w-7xl mx-auto py-16 px-6 flex items-center justify-between">
      <div className="flex md:grid md:grid-cols-3 flex-wrap gap-x-8 gap-8 md:gap-y-12">
        {blogs.map((blog: BlogPost) => (
          <div className="flex flex-col xl:w-[400px] gap-3" key={blog.id}>
            <Link
              href={`/blogs/${blog.slug}`}
              className="group relative xl:w-[400px] h-[225px] rounded-xl overflow-hidden"
            >
              <img
                src={blog.image}
                alt=""
                className="w-full h-full object-cover mask-b-from-40% mask-b-to-100%"
              />
              <div className="absolute inset-0 flex">
                <div className="pt-4 px-4 flex justify-between w-full">
                  <div className="flex gap-2 text-xs tracking-widest font-bold">
                    <div className="h-2 rounded-lg flex justify-center items-center py-3 px-3 bg-white">
                      <span>{blog.category}</span>
                    </div>
                  </div>
                  <div className="hidden group-hover:block">
                    <div className="text-white text-sm bg-primary-read h-2 py-4 px-4 flex justify-center items-center rounded-full gap-2">
                      <Clock size={18} />
                      <span>5 Min Read</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-semibold text-gray-500">
                <Link href={""} className="text-indigo-500">
                  {blog.author.name}
                </Link>{" "}
                on {blog.publishedAt}
              </span>
              <Link href={`/blogs/${blog.slug}`} className="text-xl font-bold">
                {blog.title}
              </Link>
              <p className="text-gray-500">{blog.excerpt}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
