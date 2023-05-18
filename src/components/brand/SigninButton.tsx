import { useSession, signIn, signOut } from "next-auth/react";
import React from "react";

const SigninButton = () => {
  const { data: sessionData } = useSession();

  return (
    <button
      className=" border-2 border-white px-8 py-2 text-lg font-semibold text-white no-underline  transition-all  hover:bg-gradient-to-r hover:from-[#f75e8e] hover:to-[#fc737c] hover:bg-clip-text hover:text-transparent md:px-10 md:py-3 "
      onClick={sessionData ? () => void signOut() : () => void signIn()}
    >
      {sessionData ? "Sign out" : "Sign in"}
    </button>
  );
};

export default SigninButton;
