import Login from "@/components/layout/auth/Login";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Login | Gyan Jyoti",
  description:
    "Gyanjoti is a multiple award-winning academic platform developed in Nepal and used globally by students, parents and educators.",
};

function Page() {
  return (
    <>
      <Navbar />
      <Login />
      <Footer />
    </>
  );
}

export default Page;
