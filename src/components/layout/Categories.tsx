import React from "react";
import {
  BookOpen,
  DollarSign,
  User,
  Globe,
  Atom,
} from "lucide-react";
import CategoryCard from "../ui/categoryCard";

const Categories = () => {
  return (
    <>
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-4">Explore courses by category</h2>
        <p className="text-gray-600 mb-8">
          Browse top class courses by browsing our category which will be more
          easy for you.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CategoryCard
            icon={<BookOpen className="w-6 h-6 text-indigo-600" />}
            title="General Stream Class 8-10"
            url="/courses"
            count="25+ courses available"
            bgColor="bg-blue-50"
          />
          <CategoryCard
            icon={<BookOpen className="w-6 h-6" />}
            title="Technical Stream CLass 9-10"
            url="/courses"
            count="30+ courses available"
            bgColor="bg-indigo-50"
          />
          <CategoryCard
            icon={<Globe className="w-6 h-6 text-orange-600" />}
            title="Web Development"
            url="/courses"
            count="10+ courses available"
            bgColor="bg-orange-50"
          />
          <CategoryCard
            icon={<Atom className="w-6 h-6 text-orange-600" />}
            title="Programming"
            url="/courses"
            count="7+ courses available"
            bgColor="bg-orange-50"
          />
          <CategoryCard
            icon={<DollarSign className="w-6 h-6 text-indigo-600" />}
            title="Digital Marketing"
            url="/courses"
            count="3+ courses available"
            bgColor="bg-purple-50"
          />
          <CategoryCard
            icon={<User className="w-6 h-6 text-green-600" />}
            title="Self Development"
            url="/courses"
            count="soon....."
            bgColor="bg-green-50"
          />
        </div>
      </section>
    </>
  );
};

export default Categories;
