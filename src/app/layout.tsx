import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "GyanJyoti | The Ultimate E-Learning Platform",
  description: "GyanJyoti is a leading Nepali e-learning platform offering high-quality video courses, interactive quizzes, downloadable PDFs, and the intelligent Gyan AI Assistant to help secondary-level students improve academic performance and achieve excellence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        layout: {
          unsafe_disableDevelopmentModeWarnings: true,
        },
      }}
    >
      <html lang="en">
        <body suppressHydrationWarning>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
