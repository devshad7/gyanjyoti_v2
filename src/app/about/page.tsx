import React from "react";
import About from "@/components/layout/About";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Gyan Jyoti",
  description:
    "Gyanjoti is a multiple award-winning academic platform developed in Nepal and used globally by students, parents and educators.",
};

export default function page() {
  return (
    <>

      <About />

    </>
  );
}
