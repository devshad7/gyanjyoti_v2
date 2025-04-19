import Course from "@/components/layout/Course";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Newsletter from "@/components/layout/Newsletter";
import React from "react";

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
