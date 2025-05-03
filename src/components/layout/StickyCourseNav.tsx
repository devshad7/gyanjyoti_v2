import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
const StickyCourseNav = () => {
  return (
    <div className="fixed bottom-5 w-full flex justify-center z-50 px-4">
      <div className="w-full max-w-3xl mx-auto bg-white/80 backdrop-blur-sm shadow_custom rounded-full px-6 md:px-8 py-4 flex items-center justify-between gap-4">
        <div className="text-center sm:text-left">
          <h1 className="font-semibold text-base sm:text-2xl">
            Get this course
          </h1>
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <span className="text-gray-500 md:text-lg font-semibold">
              For Free
            </span>
          </div>
        </div>
        <Link href={"/1"}>
          <Button className="rounded-full py-6 md:px-8 cursor-pointer"> 
           Join now
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default StickyCourseNav;
