import Signup from "@/components/layout/auth/Signup";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Sign Up | Gyan Jyoti",
  description:
    "Gyanjoti is a multiple award-winning academic platform developed in Nepal and used globally by students, parents and educators.",
};

function Page() {
  return (
    <>
      <Navbar />
      <Signup />
      <Footer />
    </>
  );
}

export default Page;
