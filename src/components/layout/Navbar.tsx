import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

const Navbar = () => {
  return (
    <>
      <div className="shadow-2xs">
        <nav className="max-w-7xl mx-auto py-4 px-4 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-xl md:text-2xl font-bold text-indigo-600 flex items-center gap-2">
              <img src="/assets/logo_2.jpg" alt="logo" className="w-auto h-7 md:h-8" />
              GyanJyoti
            </Link>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="font-medium text-indigo-600">
              Home
            </Link>
            <Link href="/courses" className="font-medium hover:text-indigo-600">
              Courses
            </Link>
            <Link href="/mentors" className="font-medium hover:text-indigo-600">
              Mentors
            </Link>
            <Link href="/about" className="font-medium hover:text-indigo-600">
              About
            </Link>
          </nav>
          <div className="flex items-center space-x-2 md:space-x-4">
            <Button variant="link" className="text-black cursor-pointer">
              Sign In
            </Button>
            <Button className="bg-indigo-600 hover:bg-indigo-700 cursor-pointer">
              Register
            </Button>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
