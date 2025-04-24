import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gyan Jyoti | The Ultimate e-Learning platform",
  description:
    "Gyanjoti is a multiple award-winning academic platform developed in Nepal and used globally by students, parents and educators.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
