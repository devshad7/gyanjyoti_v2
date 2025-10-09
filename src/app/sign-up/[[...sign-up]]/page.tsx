import Signup from "@/components/layout/auth/Signup";

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

      <Signup />
  
    </>
  );
}

export default Page;
