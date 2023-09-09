"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { GoSignOut, GoSignIn } from "react-icons/go";

const SideBarActions = () => {
  const { data: session } = useSession();
  return (
    <>
      {session ? (
        <div className="menuItem-container" onClick={() => signOut()}>
          <GoSignOut className="text-3xl" />
          <button type="button" className="menuItem-text">
            Sign out
          </button>
        </div>
      ) : (
        <div className="menuItem-container" onClick={() => signIn()}>
          <GoSignIn className="text-3xl" />
          <button type="button" className="menuItem-text">
            Sign in
          </button>
        </div>
      )}
    </>
  );
};

export default SideBarActions;
