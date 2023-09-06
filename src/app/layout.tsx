import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import ClientProviders from "@/Providers/ClientProviders";
import SideBarContainer from "@/components/SideBar/SIdeBarContainer";
import WidgetsContainer from "@/components/Widgets/WidgetsContainer";
import CommentModal from "@/components/Modals/CommentModal";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Twitter Clone",
  description:
    "Social media app like twitter to share your ideas and images with the community, only for learning purposes",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={`${inter.className} flex min-h-screen mx-auto`}>
        <ClientProviders session={session}>
          <SideBarContainer />
          <main className="sm:ml-20 xl:ml-72 flex-grow max-w-xl xl:min-w-[576px] border-r border-l border-gray-200">
            {children}
          </main>
          <WidgetsContainer />
          <div id="modals">
            <CommentModal />
          </div>
        </ClientProviders>
      </body>
    </html>
  );
}
