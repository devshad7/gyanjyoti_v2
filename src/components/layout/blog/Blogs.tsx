import { Clock, ArrowRight } from "lucide-react"
import Link from "next/link"

const Blogs = ({ blogs }: any) => {
  return (
    <div className="w-full bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 lg:py-14">
        <div className="mb-6 sm:mb-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-3 sm:mb-4">Latest Articles</h2>
          <p className="text-sm sm:text-base text-gray-600">Insights and stories from our team</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
          {blogs.map((blog: any) => (
            <Link
              href={`/blogs/${blog.fields.slug}`}
              key={blog.sys.id}
              className="group flex flex-col h-full bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="relative h-48 sm:h-52 lg:h-56 overflow-hidden bg-gray-200">
                <img
                  src={blog.fields.featuredImage.fields.file.url || "/placeholder.svg"}
                  alt={blog.fields.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Category badge */}
                <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                  <span className="inline-block px-3 sm:px-3.5 py-1.5 sm:py-2 bg-white text-black text-xs sm:text-sm font-semibold rounded-full shadow-md">
                    {blog.fields.category}
                  </span>
                </div>
                {/* Read time badge - shows on hover */}
                <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 sm:py-2 bg-blue rounded-full text-white text-xs sm:text-sm font-semibold shadow-md">
                    <Clock size={14} className="sm:w-4 sm:h-4" />
                    <span>5 min</span>
                  </span>
                </div>
              </div>

              <div className="flex flex-col flex-grow p-4 sm:p-5 lg:p-6">
                {/* Author and date */}
                <div className="mb-3 sm:mb-4">
                  <p className="text-xs sm:text-sm text-gray-500">
                    <span className="font-semibold text-blue hover:text-pink transition-colors">
                      {blog.fields.author}
                    </span>{" "}
                    <span>on</span>{" "}
                    <span className="font-medium">
                      {new Date(blog.fields.publishDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </p>
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-black mb-2 sm:mb-3 line-clamp-2 group-hover:text-blue transition-colors duration-200">
                  {blog.fields.title}
                </h3>

                {/* Excerpt */}
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-5 flex-grow line-clamp-2">
                  {blog.fields.excerpt}
                </p>

                <div className="flex items-center gap-2 text-blue font-semibold text-sm sm:text-base group-hover:gap-3 transition-all duration-200">
                  <span>Read More</span>
                  <ArrowRight size={16} className="sm:w-5 sm:h-5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Blogs
