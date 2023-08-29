import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SideBar from "@/components/SideBar";
import Widgets from "@/components/Widgets";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Twitter Clone",
  description:
    "Social media app like twitter to share your ideas and images with the community, only for learning purposes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex min-h-screen mx-auto`}>
        {children}
      </body>
    </html>
  );
}
