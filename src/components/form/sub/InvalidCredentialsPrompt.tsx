import React from "react";
import { type GenericProps } from "@/types/application";
interface LocalProps extends GenericProps {
  isInvalidCredentials: boolean;
}
export default function InvalidCredentialsPrompt({
  isInvalidCredentials,
}: LocalProps) {
  return (
    <>
      {isInvalidCredentials && (
        <div className="rounded-md bg-slate-100 p-10 text-center text-red-500 shadow-sm">
          The password that you&#39;ve entered is incorrect.
        </div>
      )}
    </>
  );
}
