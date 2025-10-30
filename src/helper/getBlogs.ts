import { client } from "@/lib/contentful";

export async function getBlogs() {
  const response = await client.getEntries({
    content_type: "gyanjyotiBlog",
  });
  return response.items;
}
