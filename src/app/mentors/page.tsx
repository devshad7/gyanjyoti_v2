import { MentorCard } from "@/components/layout/mentor-card";
import { mentors } from "@/components/layout/data/mentor";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function MentorsPage() {
  return (
    <>
      <Navbar />
      <main className="container mx-auto max-w-7xl px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-4 text-gray-900">
            Our <span className="text-blue-600">Expert</span> Mentors
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            Meet the dedicated educators who are committed to illuminating your
            educational journey at GyanJyoti.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mentors.map((mentor) => (
            <MentorCard key={mentor.id} mentor={mentor} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
