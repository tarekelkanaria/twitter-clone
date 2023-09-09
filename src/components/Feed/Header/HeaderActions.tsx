"use client";

import { GoSignOut, GoSignIn } from "react-icons/go";
import { useSession, signIn, signOut } from "next-auth/react";

export default function HeaderActions() {
  const { data: session } = useSession();

  return (
    <>
      {session ? (
        <GoSignOut className="text-2xl sm:hidden" onClick={() => signOut()} />
      ) : (
        <GoSignIn className="text-2xl sm:hidden" onClick={() => signIn()} />
      )}
    </>
  );
}
