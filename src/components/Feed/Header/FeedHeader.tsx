import Link from "next/link";
import type { FeedHeaderProps } from "@/types";
import { HiOutlineSparkles } from "react-icons/hi";
import { HiArrowLeft } from "react-icons/hi";
import HeaderActions from "./HeaderActions";

export default function FeedHeader({ isInPost }: FeedHeaderProps) {
  return (
    <header
      className={`flex items-center py-2 px-3 ${
        isInPost ? "space-x-2" : "justify-between"
      } sticky top-0 z-10 bg-white border-b border-gray-200`}
    >
      {isInPost && (
        <Link href="/" className="header-icon">
          <HiArrowLeft className="text-2xl" />
        </Link>
      )}
      <h2 className="font-bold text-lg sm:text-xl cursor-pointer">
        {isInPost ? "Post" : "Home"}
      </h2>
      {!isInPost && (
        <div className="header-icon">
          <HiOutlineSparkles className="hidden sm:inline text-2xl" />
          <HeaderActions />
        </div>
      )}
    </header>
  );
}
