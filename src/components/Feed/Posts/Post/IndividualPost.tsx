import getLikes from "@/firebase/get-likes";
import { getCommentsCount } from "@/firebase/get-comments";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";
import Image from "next/image";
import type { IndividualPostProps } from "@/types";
import { BiDotsHorizontalRounded, BiBarChart } from "react-icons/bi";
import { HiOutlineShare } from "react-icons/hi";
import PostTime from "./PostTime";
import CommentAction from "./CommentAction";
import LikeAction from "./LikeAction";
import Trash from "./Trash";

export default async function IndividualPost({
  id,
  uid,
  name,
  userName,
  userImg,
  postText,
  postImg,
  timestamp,
  commentId,
  hasComments,
}: IndividualPostProps) {
  const likes = await getLikes(id, commentId);
  const session = await getServerSession(authOptions);
  const commentsCount = await getCommentsCount(id);
  return (
    <article
      className={`${
        commentId && "pl-20"
      } flex p-3 space-x-4 border-b border-gray-200 mb-2`}
    >
      <Image
        src={userImg}
        alt={name}
        width={44}
        height={44}
        className="rounded-full self-start max-w-[44px] h-auto"
      />
      <div className="flex-grow">
        <header className="flex justify-between items-center mb-2">
          <div className="flex space-x-1 whitespace-nowrap select-none">
            <h2 className="user-name cursor-pointer">{name}</h2>
            <h3 className="userName">@{userName} -</h3>
            <PostTime time={timestamp?.toDate()} />
          </div>
          <BiDotsHorizontalRounded className="post-icon text-gray-500 hover:bg-sky-100 hover:text-sky-500" />
        </header>
        <Link href={`/posts/${id}`}>
          <p className="text-sm sm:text-base mb-2 text-gray-800">{postText}</p>
        </Link>
        {postImg && (
          <Link href={`/posts/${id}`}>
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
          </Link>
        )}
        {session && (
          <footer className="flex justify-around items-center text-gray-500">
            {!commentId && (
              <CommentAction
                postId={id}
                name={name}
                userName={userName}
                userImg={userImg}
                postText={postText}
                timestamp={timestamp?.toDate()}
                count={commentsCount}
              />
            )}
            <LikeAction
              postId={id}
              allLikes={likes}
              userName={userName}
              userImg={userImg}
              commentId={commentId}
            />
            <HiOutlineShare className="post-icon hover:bg-green-100 hover:text-green-600" />
            {session.user.uid === uid && (
              <Trash
                postId={id}
                postImg={postImg}
                commentId={commentId}
                hasComments={hasComments}
              />
            )}
            <BiBarChart className="post-icon hover:bg-sky-100 hover:text-sky-600" />
          </footer>
        )}
      </div>
    </article>
  );
}
