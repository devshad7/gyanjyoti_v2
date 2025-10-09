import clientPromise from "@/lib/mongodb";
import type { Course } from "@/lib/types";

export async function getCourseBySlug(slug: string): Promise<Course | null> {
  const client = await clientPromise;
  const db = client.db("gyanjyoti");
  const collection = db.collection<Course>("courses");
  const course = await collection.findOne({ slug });
  return course || null;
}
