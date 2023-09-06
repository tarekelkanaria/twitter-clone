import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Image from "next/image";
import { BsThreeDots } from "react-icons/bs";

export default async function MiniProfile() {
  const session = await getServerSession(authOptions);
  return (
    <>
      {session && (
        <article className="hover-effect text-gray-700 flex items-center justify-center xl:justify-start mt-auto">
          <Image
            src={session?.user?.image!}
            alt={session?.user?.name!}
            width="40"
            height="40"
            className="max-w-[40px] h-auto rounded-full xl:mr-2"
          />
          <div className="leading-5 hidden xl:inline">
            <h3 className="font-bold">{session?.user?.name}</h3>
            <p className="text-gray-500">@{session?.user?.userName}</p>
          </div>
          <BsThreeDots className="text-2xl xl:ml-8 hidden xl:inline-flex" />
        </article>
      )}
    </>
  );
}
