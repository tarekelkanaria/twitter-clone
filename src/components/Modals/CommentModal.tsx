"use client";

import sendComment from "@/firebase/send-comment";
import { toggleCommentModal } from "@/redux/features/commentSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Modal from "react-modal";
import Moment from "react-moment";
import { ClipLoader } from "react-spinners";
import { GrClose } from "react-icons/gr";
import { HiOutlineEmojiHappy } from "react-icons/hi";

const CommentModal = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.comment.isVisible);
  const postInfo = useAppSelector((state) => state.comment.info);
  const [commentText, setCommentText] = useState<string>("");
  const [pending, setPending] = useState<boolean>(false);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    Modal.setAppElement("#modals");
  }, []);

  const timestamp = postInfo.timestamp && JSON.parse(postInfo?.timestamp);

  const uploadComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (pending) return;
    else setPending(true);

    await sendComment({
      id: postInfo.postId,
      uid: session?.user.uid!,
      name: session?.user.name!,
      userName: session?.user.userName!,
      userImg: session?.user.image!,
      text: commentText,
    });

    setPending(false);
    setCommentText("");
    dispatch(toggleCommentModal());
    router.push(`/posts/${postInfo.postId}`);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => dispatch(toggleCommentModal())}
      className="modal"
    >
      <section className="p-1">
        <header className="modal-head">
          <div
            onClick={() => dispatch(toggleCommentModal())}
            className="modal-close"
          >
            <GrClose className="text-xl text-gray-700" />
          </div>
        </header>
        <div className="p-2 flex items-center space-x-1 relative select-none whitespace-nowrap">
          <span className="w-0.5 h-full -z-[1] absolute left-8 top-11 bg-gray-300"></span>
          <Image
            src={postInfo.userImg}
            alt={postInfo.name}
            width={44}
            height={44}
            className="user-poster"
          />
          <h2 className="user-name cursor-pointer">{postInfo.name}</h2>
          <h3 className="userName">@{postInfo.userName} -</h3>
          <Moment className="time cursor-pointer" fromNow>
            {timestamp}
          </Moment>
        </div>
        <p className="text-sm sm:text-base text-gray-500 ml-16 mb-2">
          {postInfo.postText}
        </p>
        <div className="flex space-x-3 p-3">
          <Image
            src={session?.user?.image!}
            alt={session?.user?.name!}
            width={44}
            height={44}
            className="user-image"
          />
          <form onSubmit={uploadComment} className="user-form">
            <textarea
              rows={2}
              placeholder="Tweet your replay"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="user-text"
            />
            <div className="flex justify-between items-center pt-2.5">
              <div className=" m-1">
                <HiOutlineEmojiHappy className="form-icon" />
              </div>
              <button
                disabled={!commentText.trim() || pending}
                type="submit"
                className="form-btn"
              >
                <ClipLoader color="#1e40af" size={20} loading={pending} />
                {!pending && "Replay"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </Modal>
  );
};

export default CommentModal;
