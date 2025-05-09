"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const Navbar = () => {
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Courses", href: "/courses" },
    { name: "Mentors", href: "/mentors" },
    { name: "About", href: "/about" },
    { name: "Study Material", href: "/material" },
    { name: "GyanQuest", href: "/gyan-quest" }
  ];

  return (
    <>
      <div
        className={`sticky top-0 z-50 transition-all duration-300 will-change-transform ${
          inter.variable
        } font-sans ${
          scrolled
            ? "bg-white/15 backdrop-blur-xl border-b border-white/10 shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
            : "bg-transparent backdrop-blur-[6px]"
        }`}
      >
        <nav className="max-w-7xl mx-auto py-4 px-6 flex items-center justify-between">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-lg md:text-xl font-bold flex items-center gap-3"
              aria-label="GyanJyoti Home"
            >
              <div className="relative overflow-hidden">
                <Image
                  src="/assets/Gyan_logo.png"
                  alt=""
                  width={36}
                  height={36}
                  className="w-auto h-9 md:h-10"
                  priority
                />
              </div>
              <span className="tracking-tight md:block hidden">
                <span className="text-blue-600 font-extrabold">Gyan</span>
                <span className="text-pink-600 font-extrabold">Jyoti</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            <div className="flex space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={
                    pathname === item.href
                      ? "group relative px-4 py-2 text-sm font-medium rounded-md transition-all duration-300 ease-in-out hover:text-blue-600 hover:bg-blue-50/50"
                      : "group relative px-4 py-2 text-sm font-medium rounded-md transition-all duration-300 ease-in-out text-gray-700 hover:text-blue-600 hover:bg-blue-50/50"
                  }
                >
                  {item.name}
                  <span
                    className={`absolute bottom-0 left-[12.5%] w-0 h-0.5 bg-blue-600 rounded-full transition-all duration-300 ease-in-out group-hover:w-3/4 ${
                      pathname === item.href ? "w-3/4 left-[12.5%]" : ""
                    }`}
                  ></span>
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <SignedOut>
              <SignInButton>
                <Link
                  href="/sign-in"
                  className="hidden md:inline-block text-sm text-gray-700 hover:text-pink-600 font-medium transition-colors duration-300"
                >
                  Sign In
                </Link>
              </SignInButton>
            </SignedOut>
            <SignedOut>
              <SignUpButton>
                <Link href="/sign-up" className="hidden md:inline-block">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-5 py-2 rounded-md font-medium cursor-pointer shadow-sm hover:shadow-md transition-all duration-300 transform-gpu hover:scale-105 hover:-translate-y-1 relative overflow-hidden group">
                    <span className="relative z-10">Register</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700"></span>
                    <span className="absolute -left-full top-0 w-full h-full bg-white/20 transform rotate-12 group-hover:left-full transition-all duration-700 ease-in-out"></span>
                  </Button>
                </Link>
              </SignUpButton>
            </SignedOut>

            <SignedIn>
              <UserButton />
            </SignedIn>

            {/* Hamburger Menu Button */}
            <button
              className="md:hidden flex items-center"
              onClick={toggleMobileMenu}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-700" />
              ) : (
                <Menu className="h-6 w-6 text-gray-700" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            mobileMenuOpen
              ? "h-auto opacity-100 border-b border-gray-100"
              : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-6 py-2 bg-white/90 backdrop-blur-sm">
            <div className="flex flex-col space-y-3 pb-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href || "/"}
                  className={
                    pathname === item.href
                      ? "px-4 py-2 text-sm font-medium rounded-md transition-all duration-300 ease-in-out text-blue-600"
                      : "px-4 py-2 text-sm font-medium rounded-md transition-all duration-300 ease-in-out hover:text-blue-600"
                  }
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              <div className="flex items-center pt-2 border-t border-gray-100">
                <SignedOut>
                  <SignInButton>
                    <Link
                      href="/sign-in"
                      className="px-4 py-2 text-sm text-gray-700 hover:text-pink-600 font-medium transition-colors duration-300"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Button className="text-white text-sm px-5 py-2 rounded-md font-medium cursor-pointer shadow-sm hover:shadow-md transition-all duration-300 transform-gpu relative overflow-hidden group">
                        Sign In
                      </Button>
                    </Link>
                  </SignInButton>
                </SignedOut>

                <SignedOut>
                  <SignUpButton>
                    <Link
                      href="/sign-up"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-5 py-2 rounded-md font-medium cursor-pointer shadow-sm hover:shadow-md transition-all duration-300 transform-gpu relative overflow-hidden group">
                        Register
                      </Button>
                    </Link>
                  </SignUpButton>
                </SignedOut>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
