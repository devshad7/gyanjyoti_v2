import CourseDetailPage from "@/components/CourseDetailPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Course | Gyan Jyoti",
  description:
    "GyanJyoti is a leading Nepali e-learning platform offering high-quality video courses, interactive quizzes, downloadable PDFs, and the intelligent Gyan AI Assistant to help secondary-level students improve academic performance and achieve excellence.",
};

export default function Page() {
  return <CourseDetailPage />;
}
