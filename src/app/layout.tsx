import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Devin Emmanuel Morgan | Portfolio",
  description:
    "Personal portfolio website showcasing my work, skills, and experience as a software developer and game creator.",
  keywords: [
    "portfolio",
    "software developer",
    "game developer",
    "Devin Morgan",
    "web development",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
