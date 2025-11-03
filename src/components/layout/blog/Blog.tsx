import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { options } from "@/lib/richTextType"
import { Separator } from "@/components/ui/separator"

const Blog = ({ post }: any) => {
  return (
    <>
      <div className="max-w-4xl mx-auto pt-8 md:pt-16 pb-8 md:pb-10 px-4 sm:px-6 lg:px-8">
        <div className="w-full overflow-hidden rounded-xl md:rounded-2xl">
          <img
            src={post.fields.featuredImage.fields.file.url || "/placeholder.svg"}
            alt={post.fields.title || "Featured image"}
            className="w-full h-auto object-cover"
          />
        </div>

        <section className="mt-6 md:mt-10 prose prose-sm md:prose-base max-w-none">
          {documentToReactComponents(post.fields.content, options)}
        </section>

        <Separator className="mt-8 md:mt-10" />
      </div>
    </>
  )
}

export default Blog
