"use client";

import Navbar from "@/components/layout/Navbar";
import Link from "next/link";
import { FileQuestion, Home, MoveLeft } from "lucide-react";

const NotFound = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-[90vh] w-full flex flex-col justify-center items-center px-4 text-center">
        <div className="max-w-md flex flex-col items-center">
          <FileQuestion className="h-32 w-32 text-primary mb-6 animate-pulse" />

          <h1 className="text-6xl font-bold mb-2">404</h1>
          <div className="h-1 w-20 bg-primary my-6"></div>
          <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>

          <p className="text-muted-foreground mb-8">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/"
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <Home className="h-4 w-4" />
              <span>Go to Homepage</span>
            </Link>

            <button
              onClick={() => window.history.back()}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <MoveLeft className="h-4 w-4" />
              <span>Go Back</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
