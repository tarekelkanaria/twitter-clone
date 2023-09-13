"use client";

import sendComment from "@/firebase/send-comment";
import { toggleCommentModal } from "@/redux/features/commentSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Modal from "react-modal";
import { motion } from "framer-motion";
import EmojiPicker, { EmojiClickData, EmojiStyle } from "emoji-picker-react";
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
  const [isImojiPickerVisible, setIsImojiPickerVisible] =
    useState<boolean>(false);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    Modal.setAppElement("#modals");
  }, []);

  const timestamp = postInfo.timestamp && JSON.parse(postInfo?.timestamp);

  const toggleImojiPickerVisibility = () => {
    setIsImojiPickerVisible(!isImojiPickerVisible);
  };

  const handleSelectEmoji = (emojiData: EmojiClickData, _event: MouseEvent) => {
    setCommentText((prevText) => prevText + emojiData.emoji);
  };

  const closeModal = () => {
    setIsImojiPickerVisible(false);
    setCommentText("");
    dispatch(toggleCommentModal());
  };
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
    setIsImojiPickerVisible(false);
    dispatch(toggleCommentModal());
    router.push(`/posts/${postInfo.postId}`);
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} className="modal">
      <section className="sm:p-1">
        <header className="modal-head">
          <div onClick={closeModal} className="modal-close">
            <GrClose className="text-xl text-gray-700" />
          </div>
        </header>
        <div className="p-1 sm:p-2 flex space-x-1 items-center relative select-none whitespace-nowrap">
          <span className="w-0.5 h-full -z-[1] absolute left-8 top-11 bg-gray-300"></span>
          <Image
            src={postInfo.userImg}
            alt={postInfo.name}
            width={44}
            height={44}
            className="hidden sm:block user-poster"
          />
          <h2 className="user-name cursor-pointer">{postInfo.name}</h2>
          <h3 className="hidden sm:block userName">@{postInfo.userName} -</h3>
          <Moment className="time cursor-pointer" fromNow>
            {timestamp}
          </Moment>
        </div>
        <p className="text-sm sm:text-base text-gray-500 ml-16 mb-0.5 sm:mb-2">
          {postInfo.postText}
        </p>
        <div className="flex flex-col sm:flex-row gap-y-0.5 sm:gap-y-0 sm: space-x-3 p-1 sm:p-3">
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
            <div className="flex justify-between items-center pt-0.5 sm:pt-2.5">
              <div className="m-1">
                <HiOutlineEmojiHappy
                  onClick={toggleImojiPickerVisibility}
                  className="form-icon"
                />
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
            {isImojiPickerVisible && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="emoji-picker left-0 h-[300px] sm:h-80"
              >
                <EmojiPicker
                  onEmojiClick={handleSelectEmoji}
                  emojiStyle={EmojiStyle.TWITTER}
                  lazyLoadEmojis={true}
                  width="100%"
                  height="100%"
                />
              </motion.div>
            )}
          </form>
        </div>
      </section>
    </Modal>
  );
};

export default CommentModal;
