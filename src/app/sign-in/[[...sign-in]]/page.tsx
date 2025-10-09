import Login from "@/components/layout/auth/Login";

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
   
      <Login />
     
    </>
  );
}

export default Page;
