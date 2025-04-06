import { BookOpen, Users } from "lucide-react";
import React from "react";

const Stats = () => {
  return (
    <>
      <section className="max-w-7xl mx-auto px-4 py-6 bg-gray-50 rounded-md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center">
            <div className="text-indigo-300 mb-2">
              <BookOpen className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-indigo-600">10k+</h2>
            <p className="text-gray-600 uppercase text-sm font-medium">
              Total Courses
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="text-indigo-300 mb-2">
              <Users className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-indigo-600">500+</h2>
            <p className="text-gray-600 uppercase text-sm font-medium">
              Expert Mentors
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="text-indigo-300 mb-2">
              <Users className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-indigo-600">300k+</h2>
            <p className="text-gray-600 uppercase text-sm font-medium">
              Students Globally
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Stats;
