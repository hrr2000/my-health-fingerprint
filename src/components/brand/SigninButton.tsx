import { useSession, signIn, signOut } from "next-auth/react";
import React from "react";
import {AiOutlineUser} from "react-icons/ai";
import GenericButton from "@/components/common/GenericButton";
import {IoIosLogOut} from "react-icons/io";

const SigninButton = () => {
  const { data: sessionData } = useSession();

  return (
    <div className={`flex gap-3`}>
      <button
        className="flex gap-3 items-center px-8 py-2 text-xl font-bold text-primary no-underline transition-all md:px-10 md:py-3"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        <span>
        {sessionData ? <IoIosLogOut /> : <AiOutlineUser />}
        </span>
        <span>
        {sessionData ? "Sign out" : "Sign in"}
        </span>
      </button>
      {sessionData ? (<></>) : (
        <GenericButton text={'Request a Demo'} theme={'primary'} />
      )}
    </div>
  );
};

export default SigninButton;
