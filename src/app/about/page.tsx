import React from "react";
import About from "@/components/layout/About";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Courses | Gyan Jyoti",
  description:
    "Gyanjoti is a multiple award-winning academic platform developed in Nepal and used globally by students, parents and educators.",
};

export default function page() {
  return (
    <>
      <Navbar />
      <About />
      <Footer />
    </>
  );
}
