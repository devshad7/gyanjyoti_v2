"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 md:px-10 py-10 flex items-center justify-center bg-white relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-purple-100 opacity-50"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 rounded-full bg-purple-100 opacity-50"></div>
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-purple-100 opacity-30"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-purple-100 opacity-30"></div>

        <div className="w-full px-4 py-8 flex flex-col md:flex-row items-center justify-between relative z-10">
          {/* Login Form */}
          <div className="w-full md:w-1/2 max-w-md">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome</h1>
              <p className="text-gray-500">Please create your account</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-gray-700">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="abc@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="block text-gray-700">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="enter your password"
                  className="w-full px-4 py-2 border rounded-md pr-10"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="block text-gray-700">
                  Confirm Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={confPassword}
                    onChange={(e) => setConfPassword(e.target.value)}
                    placeholder="enter your password"
                    className="w-full px-4 py-2 border rounded-md pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <Button className="w-full py-2 bg-blue-600 hover:bg-blue-700 cursor-pointer text-white rounded-md">
                Sign Up
              </Button>

              <div className="relative flex items-center justify-center">
                <div className="border-t border-gray-300 w-full"></div>
                <span className="bg-white px-3 text-gray-500 text-sm">OR</span>
                <div className="border-t border-gray-300 w-full"></div>
              </div>

              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 py-2 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer"
              >
                <Image
                  src="/assets/google.png"
                  alt="Google logo"
                  width={20}
                  height={20}
                />
                Continue with Google
              </button>

              <div className="text-center text-gray-500 text-sm">
                Already have an Account?{" "}
                <Link href="/login" className="text-blue-500 hover:underline">
                  Login
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile Preview */}
          <div className="hidden md:block w-full md:w-1/2 relative mt-10 md:mt-0">
            <div className="relative mx-auto">
              <img src="/assets/1.svg" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
