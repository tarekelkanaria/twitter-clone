import Image from "next/image";
import { MenuItemType } from "@/types";
import { BiSolidHomeCircle, BiSearch } from "react-icons/bi";
import { PiBell, PiClipboardTextLight } from "react-icons/pi";
import { HiOutlineUsers, HiOutlineDotsCircleHorizontal } from "react-icons/hi";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { FaRegUser } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import MenuItem from "./MenuItem";

const menuList: MenuItemType[] = [
  { id: "1", text: "Home", Icon: BiSolidHomeCircle },
  { id: "2", text: "Explore", Icon: BiSearch },
  { id: "3", text: "Notifications", Icon: PiBell },
  { id: "4", text: "Messages", Icon: HiOutlineEnvelope },
  { id: "5", text: "Lists", Icon: PiClipboardTextLight },
  { id: "6", text: "Communities", Icon: HiOutlineUsers },
  { id: "7", text: "Profile", Icon: FaRegUser },
  { id: "8", text: "More", Icon: HiOutlineDotsCircleHorizontal },
];

export default function SideBar() {
  return (
    <aside className="hidden fixed h-full p-2 sm:flex sm:flex-col sm:items-center xl:items-start xl:ml-6">
      <div className="hover-effect p-0 hover:bg-blue-100 xl:px-1 mb-4">
        <Image
          src="https://help.twitter.com/content/dam/help-twitter/brand/logo.png"
          alt="Twitter Logo"
          width="50"
          height="50"
          priority={true}
          style={{ maxWidth: "50px", height: "auto" }}
        />
      </div>
      <nav className="mb-2.5">
        {menuList.map((item) => (
          <MenuItem
            key={item.id}
            {...item}
            active={item.text === "Home" ? true : false}
          />
        ))}
      </nav>
      <button type="button" className="w-56 h-12 hidden xl:inline main-btn">
        Post
      </button>
      <div className="hover-effect text-gray-700 flex items-center justify-center xl:justify-start mt-auto">
        <Image
          src="https://avatars.githubusercontent.com/u/101680180?v=4"
          alt="User image"
          width="40"
          height="40"
          style={{ maxWidth: "40px", height: "auto" }}
          className="rounded-full xl:mr-2"
        />
        <div className="leading-5 hidden xl:inline">
          <h3 className="font-bold">Tarek Elkanaria</h3>
          <p className="text-gray-500">@ElkanariaTarek</p>
        </div>
        <BsThreeDots className="text-2xl xl:ml-8 hidden xl:inline-flex" />
      </div>
    </aside>
  );
}
