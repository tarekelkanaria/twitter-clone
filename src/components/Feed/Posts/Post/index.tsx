import Image from "next/image";
import { RetrievedPostType } from "@/types";
import { BiDotsHorizontalRounded, BiBarChart } from "react-icons/bi";
import { HiOutlineTrash, HiOutlineShare } from "react-icons/hi";
import { HiOutlineChatBubbleOvalLeft } from "react-icons/hi2";
import { AiOutlineHeart } from "react-icons/ai";

export default function Post({
  name,
  userName,
  userImg,
  postText,
  postImg,
  timestamp,
}: RetrievedPostType) {
  return (
    <article className="flex p-3 space-x-4 cursor-pointer border-b border-gray-200 mb-2">
      <Image
        src={userImg}
        alt={name}
        width={44}
        height={44}
        style={{ maxWidth: "44px", height: "auto" }}
        className="rounded-full self-start"
      />
      <div className="flex-grow">
        <header className="flex justify-between items-center mb-2">
          <div className="flex space-x-1 whitespace-nowrap">
            <h2 className="font-bold text-sm sm:text-base hover:underline transition-colors duration-150">
              {name}
            </h2>
            <h3 className="text-sm sm:text-base text-gray-500">
              @{userName} -
            </h3>
            <h3 className="text-sm sm:text-base text-gray-500 hover:underline transition-colors duration-150">
              {timestamp}
            </h3>
          </div>
          <BiDotsHorizontalRounded className="post-icon text-gray-500 hover:bg-sky-100 hover:text-sky-500" />
        </header>
        <p className="text-sm sm:text-base mb-2 text-gray-800">{postText}</p>
        <div className="relative w-full min-h-[300px] lg:max-h-[600px] mb-2">
          <Image
            src={postImg}
            alt={postText}
            fill
            sizes="(max-width: 639px) 96%, (min-width: 640px) 100%"
            placeholder="blur"
            blurDataURL={postImg}
            className="object-cover object-center rounded-2xl mr-2"
          />
        </div>
        <footer className="flex justify-around items-center text-gray-500">
          <HiOutlineChatBubbleOvalLeft className="post-icon hover:bg-sky-100 hover:text-sky-600" />
          <AiOutlineHeart className="post-icon hover:bg-rose-100 hover:text-rose-600" />
          <HiOutlineShare className="post-icon hover:bg-green-100 hover:text-green-600" />
          <HiOutlineTrash className="post-icon hover:text-sky-600 hover:bg-sky-100" />
          <BiBarChart className="post-icon hover:bg-sky-100 hover:text-sky-600" />
        </footer>
      </div>
    </article>
  );
}
