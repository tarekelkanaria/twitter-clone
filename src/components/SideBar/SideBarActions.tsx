"use client";

import { useSession, signIn, signOut } from "next-auth/react";

const SideBarActions = () => {
  const { data: session } = useSession();
  return (
    <>
      {session ? (
        <>
          <button
            type="button"
            className="w-56 h-12 hidden xl:inline main-btn mb-2"
          >
            Post
          </button>
          <div className="hidden xl:block xl:ml-10">
            <button
              type="button"
              onClick={() => signOut()}
              className="w-36 h-12 main-btn"
            >
              Sign out
            </button>
          </div>
        </>
      ) : (
        <button
          type="button"
          onClick={() => signIn()}
          className="w-36 h-12 hidden xl:inline main-btn"
        >
          Sign in
        </button>
      )}
    </>
  );
};

export default SideBarActions;
