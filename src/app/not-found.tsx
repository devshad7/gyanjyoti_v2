import Navbar from "@/components/layout/Navbar";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "404 | Gyan Jyoti",
  description:
    "Gyanjoti is a multiple award-winning academic platform developed in Nepal and used globally by students, parents and educators.",
};


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
