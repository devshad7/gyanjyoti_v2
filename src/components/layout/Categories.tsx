import React from "react";
import {
  BarChart2,
  BookOpen,
  DollarSign,
  MessageSquare,
  User,
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
            title="Design & Development"
            url="/courses/design-and-development"
            count="250+ courses available"
            bgColor="bg-blue-50"
          />
          <CategoryCard
            icon={<MessageSquare className="w-6 h-6" />}
            title="Marketing & Communication"
            url="/courses/marketing-and-communication"
            count="300+ courses available"
            bgColor="bg-indigo-50"
          />
          <CategoryCard
            icon={<BarChart2 className="w-6 h-6 text-orange-600" />}
            title="Digital Marketing"
            url="/courses/digital-marketing"
            count="150+ courses available"
            bgColor="bg-orange-50"
          />
          <CategoryCard
            icon={<BarChart2 className="w-6 h-6 text-orange-600" />}
            title="Business & Accounting"
            url="/courses/business-accounting"
            count="170+ courses available"
            bgColor="bg-orange-50"
          />
          <CategoryCard
            icon={<DollarSign className="w-6 h-6 text-indigo-600" />}
            title="Finance Management"
            url="/courses/finance-management"
            count="300+ courses available"
            bgColor="bg-purple-50"
          />
          <CategoryCard
            icon={<User className="w-6 h-6 text-green-600" />}
            title="Self Development"
            url="/courses/self-development"
            count="50+ courses available"
            bgColor="bg-green-50"
          />
        </div>
      </section>
    </>
  );
};

export default Categories;
