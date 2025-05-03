import React from "react";
import Course from "@/components/layout/class-course/coursebox";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Class 10 Science | Gyan Jyoti",
  description:
    "Gyanjoti is a multiple award-winning academic platform developed in Nepal and used globally by students, parents and educators.",
};

export default function page() {
  return (
    <>
      <Navbar />
      <Course />
      <Footer />
    </>
  );
}