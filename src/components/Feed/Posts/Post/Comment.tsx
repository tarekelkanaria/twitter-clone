"use client";

import { setPostInfo, toggleCommentModal } from "@/redux/features/commentSlice";
import { useAppDispatch } from "@/redux/store";
import type { CommentProps } from "@/types";
import { HiOutlineChatBubbleOvalLeft } from "react-icons/hi2";

const Comment = (props: CommentProps) => {
  const dispatch = useAppDispatch();

  const handleCommentModal = () => {
    dispatch(setPostInfo(props));
    dispatch(toggleCommentModal());
  };

  return (
    <div className="flex items-center select-none">
      <HiOutlineChatBubbleOvalLeft
        onClick={handleCommentModal}
        className="post-icon hover:bg-sky-100 hover:text-sky-600"
      />
      {props.count > 0 && (
        <span className="text-sm text-sky-600">{props.count}</span>
      )}
    </div>
  );
};

export default Comment;
