import Login from "@/components/layout/auth/Login";

import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Login | Gyan Jyoti",
  description: "GyanJyoti is a leading Nepali e-learning platform offering high-quality video courses, interactive quizzes, downloadable PDFs, and the intelligent Gyan AI Assistant to help secondary-level students improve academic performance and achieve excellence.",
};
function Page() {
  return (
    <>
   
      <Login />
     
    </>
  );
}

export default Page;
