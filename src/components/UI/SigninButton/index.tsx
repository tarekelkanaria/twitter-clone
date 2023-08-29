"use client";

import { ClientSafeProvider, signIn } from "next-auth/react";

const SigninButton = ({ id, name }: ClientSafeProvider) => {
  return (
    <button
      type="button"
      onClick={() => signIn(id, { callbackUrl: "/" })}
      className="bg-red-400 rounded-lg p-3 text-white font-semibold hover:bg-red-500 transition-colors duration-200"
    >
      Sign in with {name}
    </button>
  );
};

export default SigninButton;
