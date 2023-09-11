"use client";

import sendPost from "@/firebase/send-post";
import { useSession } from "next-auth/react";
import { useRef, useState } from "react";
import Image from "next/image";
import ClipLoader from "react-spinners/ClipLoader";
import { HiOutlinePhotograph, HiOutlineEmojiHappy } from "react-icons/hi";
import { GrClose } from "react-icons/gr";

const FormSection = () => {
  const [postText, setPostText] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<string | undefined>(
    undefined
  );
  const filePickerRef = useRef<HTMLInputElement>(null);
  const { data: session } = useSession();
  const [pending, setPending] = useState(false);

  const extractImgDataUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    if (e.target.files) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      if (readerEvent.target?.result) {
        setSelectedFile(readerEvent.target.result as string);
      }
    };
  };

  const uploadPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (pending) return;
    else setPending(true);

    await sendPost({
      uid: session?.user.uid!,
      name: session?.user.name!,
      userName: session?.user.userName!,
      userImg: session?.user.image!,
      postText,
      postImg: selectedFile ? selectedFile : null,
    });

    setPostText("");
    setSelectedFile(undefined);
    setPending(false);
  };

  return (
    <>
      {session && (
        <section className="flex flex-col p-1 gap-y-3 border-b border-gray-200 sm:flex-row sm:gap-y-0 sm:space-x-3 sm:p-3">
          <Image
            src={session?.user?.image!}
            alt={session?.user?.name!}
            width={44}
            height={44}
            className="user-image"
          />
          <form onSubmit={uploadPost} className="user-form">
            <textarea
              rows={2}
              placeholder="What's happening"
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              className="user-text"
            />
            {selectedFile && (
              <div className="bg-slate-200 w-full relative pt-1 pb-1">
                <GrClose
                  onClick={() => setSelectedFile(undefined)}
                  className="text-3xl absolute top-1 left-1 p-1 rounded-full cursor-pointer bg-gray-50 hover:bg-gray-200 transition-colors duration-200"
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selectedFile}
                  alt="Post image"
                  className={`${
                    pending && "animate-pulse"
                  } w-full max-h-80 object-contain mb-1`}
                />
              </div>
            )}
            <div className="flex justify-between items-center pt-2.5">
              <div className="flex">
                <div
                  className="m-1"
                  onClick={() => filePickerRef.current!.click()}
                >
                  <HiOutlinePhotograph className="form-icon" />
                  <input
                    type="file"
                    hidden
                    ref={filePickerRef}
                    onChange={extractImgDataUrl}
                  />
                </div>
                <HiOutlineEmojiHappy className="form-icon" />
              </div>
              <button
                type="submit"
                disabled={(!postText.trim() && !selectedFile) || pending}
                className="form-btn"
              >
                <ClipLoader color="#1e40af" size={20} loading={pending} />
                {!pending && "Post"}
              </button>
            </div>
          </form>
        </section>
      )}
    </>
  );
};

export default FormSection;
