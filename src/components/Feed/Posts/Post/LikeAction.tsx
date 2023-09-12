"use client";

import sendLike from "@/firebase/send-like";
import { useSession } from "next-auth/react";
import { useState } from "react";
import type { LikeActionProps } from "@/types";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const LikeAction = ({
  postId,
  hasLiked,
  likesCount,
  commentId,
  updateLikes,
}: LikeActionProps) => {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const handleLike = async () => {
    if (loading) return;
    else setLoading(true);
    await sendLike({
      id: postId,
      userId: session?.user.uid!,
      userName: session?.user.userName!,
      userImg: session?.user.image!,
      hasLiked,
      commentId,
    });

    updateLikes(postId, commentId);
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
      {likesCount > 0 && (
        <span className={`${hasLiked && "text-red-600"} text-sm`}>
          {likesCount}
        </span>
      )}
    </div>
  );
};

export default LikeAction;
