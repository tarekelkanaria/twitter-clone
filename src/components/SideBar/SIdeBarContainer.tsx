import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Image from "next/image";
import type { MenuItemType } from "@/types";
import { BiSolidHomeCircle, BiSearch } from "react-icons/bi";
import { PiBell, PiClipboardTextLight } from "react-icons/pi";
import { HiOutlineUsers, HiOutlineDotsCircleHorizontal } from "react-icons/hi";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { FaRegUser } from "react-icons/fa";
import MenuItem from "./MenuItem";
import SideBarActions from "./SideBarActions";
import MiniProfile from "./MiniProfile";

const menuList: MenuItemType[] = [
  { id: "1", text: "Home", Icon: BiSolidHomeCircle },
  { id: "2", text: "Explore", Icon: BiSearch },
  { id: "3", text: "Notifications", Icon: PiBell },
  { id: "4", text: "Messages", Icon: HiOutlineEnvelope },
  { id: "5", text: "Lists", Icon: PiClipboardTextLight },
  { id: "6", text: "Communities", Icon: HiOutlineUsers },
  { id: "7", text: "Profile", Icon: FaRegUser },
  {
    id: "8",
    text: "More",
    Icon: HiOutlineDotsCircleHorizontal,
  },
];

export default async function SideBarContainer() {
  const session = await getServerSession(authOptions);
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
        <SideBarActions />
      </nav>
      {session && (
        <button
          type="button"
          className="w-56 h-12 hidden xl:inline main-btn mb-2"
        >
          Post
        </button>
      )}
      <MiniProfile />
    </aside>
  );
}
