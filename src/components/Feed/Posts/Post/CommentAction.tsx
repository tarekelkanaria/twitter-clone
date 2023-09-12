"use client";

import { setPostInfo, toggleCommentModal } from "@/redux/features/commentSlice";
import { useAppDispatch } from "@/redux/store";
import type { CommentActionProps, PostInfoPayload } from "@/types";
import { HiOutlineChatBubbleOvalLeft } from "react-icons/hi2";

const CommentAction = (props: CommentActionProps) => {
  const dispatch = useAppDispatch();
  const { count } = props;

  const handleCommentModal = () => {
    const postInfo: PostInfoPayload = {
      ...props,
      timestamp: JSON.stringify(props.timestamp),
    };
    dispatch(setPostInfo(postInfo));
    dispatch(toggleCommentModal());
  };

  return (
    <div className="flex items-center select-none">
      <HiOutlineChatBubbleOvalLeft
        onClick={handleCommentModal}
        className="post-icon hover:bg-sky-100 hover:text-sky-600"
      />
      {count > 0 && <span className="text-sm text-sky-600">{count}</span>}
    </div>
  );
};

export default CommentAction;
