import React from "react";
import { Button } from "@/components/ui/button";

interface StickyCourseNavProps {
  onJoin?: () => void;
}

const StickyCourseNav: React.FC<StickyCourseNavProps> = ({ onJoin }) => {
  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-[65%] sm:w-[50%] md:w-[40%] lg:w-[30%] flex justify-center z-50 px-3 sm:px-6">
      <div className="w-full max-w-sm sm:max-w-md bg-white/95 backdrop-blur-lg shadow-2xl rounded-full px-4 sm:px-6 py-2.5 sm:py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="text-center sm:text-left w-full sm:w-auto">
          <h1 className="font-bold text-base sm:text-lg">Get this course</h1>
          <div className="flex items-center justify-center sm:justify-start gap-2 mt-1">
            <span className="text-gray-700 text-sm sm:text-base font-semibold">
              For Free
            </span>
          </div>
        </div>
        <Button
          variant="black"
          className="rounded-full py-7 px-5 cursor-pointer text-sm sm:text-base font-bold transition w-full sm:w-auto"
          onClick={onJoin}
        >
          Join now
        </Button>
      </div>
    </div>
  );
};

export default StickyCourseNav;
