import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import type { MenuItemProps } from "@/types";

export default async function MenuItem({
  id,
  text,
  Icon,
  active,
}: MenuItemProps) {
  const session = await getServerSession(authOptions);
  return (
    <>
      {parseInt(id) > 2 ? (
        session && (
          <div className="menuItem-container">
            <Icon className="text-3xl" />
            <h3 className={`menuItem-text ${active && "font-bold"}`}>{text}</h3>
          </div>
        )
      ) : (
        <div className="menuItem-container">
          <Icon className="text-3xl" />
          <h3 className={`menuItem-text ${active && "font-bold"}`}>{text}</h3>
        </div>
      )}
    </>
  );
}
