"use client";

import sendLike from "@/firebase/send-like";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import type { LikeProps } from "@/types";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const Like = ({ postId, allLikes, userName, userImg }: LikeProps) => {
  const [hasLiked, setHasLiked] = useState(false);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const stringCopyOfLikes = JSON.stringify(allLikes);

  useEffect(() => {
    setHasLiked(
      allLikes.findIndex((like) => like.id === session?.user.uid) !== -1
    );
  }, [stringCopyOfLikes]);

  const handleLike = async () => {
    if (loading) return;
    else setLoading(true);
    await sendLike({
      id: postId,
      userId: session?.user.uid!,
      userName,
      userImg,
      hasLiked,
    });

    setLoading(false);
  };

  return (
    <div className="flex items-center select-none">
      {hasLiked ? (
        <AiFillHeart
          onClick={handleLike}
          className={`${
            loading && "animate-pulse cursor-wait"
          } post-icon text-red-600 hover:bg-rose-100`}
        />
      ) : (
        <AiOutlineHeart
          onClick={handleLike}
          className={`${
            loading && "animate-pulse cursor-wait"
          } post-icon hover:bg-rose-100 hover:text-rose-600`}
        />
      )}
      {allLikes.length > 0 && (
        <span className={`${hasLiked && "text-red-600"} text-sm`}>
          {allLikes.length}
        </span>
      )}
    </div>
  );
};

export default Like;
