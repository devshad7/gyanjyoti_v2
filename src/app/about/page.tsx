import React from "react";
import About from "@/components/layout/About";

import { Metadata } from "next";

export const metadata: Metadata = {
   title: "About | Gyan Jyoti",
  description: "GyanJyoti is a leading Nepali e-learning platform offering high-quality video courses, interactive quizzes, downloadable PDFs, and the intelligent Gyan AI Assistant to help secondary-level students improve academic performance and achieve excellence.",
};
export default function page() {
  return (
    <>

      <About />

    </>
  );
}
