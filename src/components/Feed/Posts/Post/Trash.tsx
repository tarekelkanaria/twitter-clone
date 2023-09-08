"use client";

import deletePost from "@/firebase/delete-post";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { TrashProps } from "@/types";
import { HiOutlineTrash } from "react-icons/hi";

const Trash = ({ postId, postImg, commentId }: TrashProps) => {
  const [deleteLoading, setDeleteLoading] = useState(false);
  const router = useRouter();

  const removePost = async () => {
    setDeleteLoading(true);
    if (
      window.confirm(
        `Are you sure you want to delete this ${
          commentId ? "comment" : "post"
        }?`
      )
    ) {
      await deletePost({
        postId,
        postImg: postImg ? postImg : undefined,
        commentId,
      });
    }
    if (!commentId) router.push("/");

    setDeleteLoading(false);
  };

  return (
    <HiOutlineTrash
      className={`${
        deleteLoading && "animate-pulse cursor-wait"
      } post-icon hover:text-sky-600 hover:bg-sky-100`}
      onClick={removePost}
    />
  );
};

export default Trash;
