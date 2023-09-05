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
          <div className="hover-effect text-gray-700 flex items-center justify-center xl:justify-start xl:space-x-3 ">
            <Icon className="text-3xl" />
            <h3
              className={`text-lg hidden xl:inline-flex ${
                active && "font-bold"
              }`}
            >
              {text}
            </h3>
          </div>
        )
      ) : (
        <div className="hover-effect text-gray-700 flex items-center justify-center xl:justify-start xl:space-x-3 ">
          <Icon className="text-3xl" />
          <h3
            className={`text-lg hidden xl:inline-flex ${active && "font-bold"}`}
          >
            {text}
          </h3>
        </div>
      )}
    </>
  );
}
