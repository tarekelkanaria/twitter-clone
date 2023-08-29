import Image from "next/image";
import { HiOutlinePhotograph, HiOutlineEmojiHappy } from "react-icons/hi";

export default function FormSection() {
  return (
    <section className="flex border-b border-gray-200 space-x-3 p-3">
      <Image
        src="https://avatars.githubusercontent.com/u/101680180?v=4"
        alt="User profile"
        width={44}
        height={44}
        style={{ maxWidth: "44px", height: "auto" }}
        className="rounded-full cursor-pointer hover:brightness-95 transition-colors duration-150 self-start"
      />
      <form className="flex-grow divide-y divide-gray-200">
        <textarea
          rows={2}
          placeholder="What's happening"
          className="w-full min-h-[50px] border-none text-gray-700 focus:ring-0 text-lg placeholder-gray-700 tracking-wide"
        />
        <div className="flex justify-between items-center pt-2.5">
          <div className="flex">
            <HiOutlinePhotograph className="form-icon" />
            <HiOutlineEmojiHappy className="form-icon" />
          </div>
          <button
            type="submit"
            className=" px-4 py-1.5 main-btn text-base disabled:opacity-50 "
          >
            Post
          </button>
        </div>
      </form>
    </section>
  );
}
