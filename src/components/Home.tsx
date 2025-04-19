import React from "react";
import Navbar from "./layout/Navbar";
import Hero from "./layout/Hero";
import Stats from "./ui/stats";
import Categories from "./layout/Categories";
import PopularCourses from "./layout/PopularCourses";
import Newsletter from "./layout/Newsletter";
import Footer from "./layout/Footer";
import Testimonial from "./layout/Testimonial";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Stats />
      <Categories />
      <PopularCourses />
      <Testimonial />
      <Newsletter />
      <Footer />
    </>
  );
};

export default Home;
