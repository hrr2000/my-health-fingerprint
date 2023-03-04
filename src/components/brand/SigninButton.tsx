import { useSession, signIn, signOut } from "next-auth/react";
import React from "react";

const SigninButton = () => {
  const { data: sessionData } = useSession();

  return (
    <button
      className="rounded-full bg-white px-8 py-2 font-semibold text-[#0f1e57] no-underline transition md:px-10 md:py-3"
      onClick={sessionData ? () => void signOut() : () => void signIn()}
    >
      {sessionData ? "Sign out" : "Sign in"}
    </button>
  );
};

export default SigninButton;
