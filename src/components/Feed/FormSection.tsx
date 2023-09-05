"use client";

import { sendPost } from "@/firebase/send-post";
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
      setSelectedFile(readerEvent.target?.result as string | undefined);
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
        <section className="flex border-b border-gray-200 space-x-3 p-3">
          <Image
            src={session?.user?.image!}
            alt={session?.user?.name!}
            width={44}
            height={44}
            style={{ maxWidth: "44px", height: "auto" }}
            className="rounded-full cursor-pointer hover:brightness-95 transition-colors duration-150 self-start"
          />
          <form
            onSubmit={uploadPost}
            className="flex-grow divide-y divide-gray-200"
          >
            <textarea
              rows={2}
              placeholder="What's happening"
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              className="w-full min-h-[50px] border-none text-gray-700 focus:ring-0 text-lg placeholder-gray-700 tracking-wide"
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
                className="px-4 py-1.5 min-w-[68px] max-h-[36px] main-btn text-base disabled:opacity-50 disabled:cursor-not-allowed"
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