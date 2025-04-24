import Course from "@/components/layout/Course";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Newsletter from "@/components/layout/Newsletter";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Introduction to lighting on illustration | Gyan Jyoti",
  description:
    "Gyanjoti is a multiple award-winning academic platform developed in Nepal and used globally by students, parents and educators.",
};

function page() {
  return (
    <>
      <Navbar />
      <Course />
      <Newsletter />
      <Footer />
    </>
  );
}

export default page;
