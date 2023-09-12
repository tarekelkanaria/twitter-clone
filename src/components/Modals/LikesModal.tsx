"use client";

import { toggleLikesModal } from "@/redux/features/likesSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useEffect } from "react";
import Image from "next/image";
import Modal from "react-modal";
import { GrClose } from "react-icons/gr";

const LikesModal = () => {
  const isVisible = useAppSelector((state) => state.likes.isVisible);
  const likes = useAppSelector((state) => state.likes.likesList);
  const dispatch = useAppDispatch();

  useEffect(() => {
    Modal.setAppElement("#modals");
  }, []);

  return (
    <Modal
      isOpen={isVisible}
      onRequestClose={() => dispatch(toggleLikesModal())}
      className="modal"
    >
      <section className="p-1">
        <header className="modal-head">
          <div
            className="modal-close"
            onClick={() => dispatch(toggleLikesModal())}
          >
            <GrClose className="text-xl text-gray-700" />
          </div>
        </header>
        {likes.map((like) => (
          <article
            key={like.id}
            className="p-3 flex justify-between items-center border-b border-gray-200 hover:bg-gray-200 transition-colors duration-200 cursor-pointer mb-1"
          >
            <Image
              src={like.userImg}
              alt={like.userName}
              width={44}
              height={44}
              className="user-image"
            />
            <h3 className="font-semibold text-sm sm:text-base text-gray-700">
              {like.userName}
            </h3>
          </article>
        ))}
      </section>
    </Modal>
  );
};

export default LikesModal;
