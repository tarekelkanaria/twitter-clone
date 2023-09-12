"use client";

import getLikes from "@/firebase/get-likes";
import getCommentsCount from "@/firebase/get-comments-count";
import { useAppDispatch } from "@/redux/store";
import { likesInit, toggleLikesModal } from "@/redux/features/likesSlice";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { IndividualPostProps, RetrievedLikeType } from "@/types";
import { BiDotsHorizontalRounded, BiBarChart } from "react-icons/bi";
import { HiOutlineShare } from "react-icons/hi";
import PostTime from "./PostTime";
import CommentAction from "./CommentAction";
import LikeAction from "./LikeAction";
import Trash from "./Trash";

const IndividualPost = ({
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
  isLast,
  postCommentsCount,
  getNewPosts,
}: IndividualPostProps) => {
  const [likes, setLikes] = useState<RetrievedLikeType[]>([]);
  const [commentsCount, setCommentsCount] = useState<number>(0);
  const [hasLiked, setHasLiked] = useState(false);
  const postRef = useRef<HTMLElement>(null);
  const { data: session } = useSession();
  const dispatch = useAppDispatch();

  const getPostLikes = useCallback(
    async (id: string, commentId?: string) => {
      const likesFromServer = await getLikes(id, commentId);
      setLikes(likesFromServer);
      setHasLiked(
        likesFromServer.findIndex((like) => like.id === session?.user.uid) !==
          -1
      );
    },
    [session?.user.uid]
  );

  const getPostCommentsCount = useCallback(
    async (id: string) => {
      if (postCommentsCount) {
        setCommentsCount(postCommentsCount);
      } else {
        const commentsCountFromServer = await getCommentsCount(id);
        setCommentsCount(commentsCountFromServer);
      }
    },
    [postCommentsCount]
  );

  useEffect(() => {
    getPostCommentsCount(id);
    getPostLikes(id, commentId);
  }, [getPostLikes, getPostCommentsCount, id, commentId]);

  useEffect(() => {
    if (!postRef?.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (isLast && entry.isIntersecting && getNewPosts) {
        getNewPosts(timestamp);
        observer.unobserve(entry.target);
      }
    });
    observer.observe(postRef.current);
  }, [isLast]);

  const populateLikesModal = () => {
    dispatch(likesInit(likes));
    dispatch(toggleLikesModal());
  };

  return (
    <article ref={postRef} className={`${commentId && "pl-4 sm:pl-16"}`}>
      <Link href={`/posts/${id}`}>
        <div className="p-1 sm:p-3 flex flex-col mb-2 gap-y-2 border-b border-gray-200 sm:gap-y-0 sm:flex-row sm:space-x-4 hover:bg-gray-200 transition-colors duration-200">
          <Image
            src={userImg}
            alt={name}
            width={44}
            height={44}
            className="rounded-full self-start max-w-[44px] h-auto"
          />
          <div className="flex-grow">
            <header className="flex justify-between items-center mb-2">
              <div className="flex flex-col sm:flex-row gap-y-1 sm:gap-y-0 sm:space-x-1 whitespace-nowrap select-none">
                <h2 className="user-name cursor-pointer">{name}</h2>
                <h3 className="userName">@{userName} -</h3>
                <PostTime time={timestamp} />
              </div>
              <BiDotsHorizontalRounded className="post-icon text-gray-500 hover:bg-sky-100 hover:text-sky-500" />
            </header>
            <p className="text-sm sm:text-base mb-2 text-gray-800">
              {postText}
            </p>
            {postImg && (
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
            )}
          </div>
        </div>
      </Link>
      {session && (
        <footer className="p-2 flex flex-wrap sm:flex-nowrap justify-around items-center text-gray-500 border-b border-gray-200">
          {!commentId && (
            <CommentAction
              postId={id}
              name={name}
              userName={userName}
              userImg={userImg}
              postText={postText}
              timestamp={timestamp}
              count={commentsCount}
            />
          )}
          <LikeAction
            postId={id}
            hasLiked={hasLiked}
            likesCount={likes?.length}
            commentId={commentId}
            updateLikes={getPostLikes}
          />
          <HiOutlineShare className="post-icon hover:bg-green-100 hover:text-green-600" />
          {session.user.uid === uid && (
            <Trash
              postId={id}
              postImg={postImg}
              commentId={commentId}
              hasComments={hasComments}
              updateCommentsCount={getPostCommentsCount}
            />
          )}
          <BiBarChart className="post-icon hover:bg-sky-100 hover:text-sky-600" />
        </footer>
      )}
      {(typeof hasComments === "boolean" || commentId) && likes?.length > 0 && (
        <div
          onClick={populateLikesModal}
          className={`flex p-1 sm:p-3 border-b border-gray-200 cursor-pointer ${
            commentId && "pl-4 sm:pl-16"
          }`}
        >
          <span className="mr-1 font-bold text-base">{likes?.length}</span>
          <p className="text-gray-500 text-sm sm:text-base hover:underline transition-all duration-150 cursor-pointer decoration-gray-500">
            Likes
          </p>
        </div>
      )}
    </article>
  );
};

export default IndividualPost;
