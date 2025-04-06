import Navbar from "@/components/layout/Navbar";
import React from "react";

const NotFound = () => {
  return (
    <>
      <Navbar />
      <div className="h-[90vh] w-full flex justify-center items-center">
        404 | Not Found
      </div>
    </>
  );
};

export default NotFound;
