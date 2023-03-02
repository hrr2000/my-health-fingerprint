import { useState } from "react";
import { useRouter } from "next/router";
import { type SigninType } from "@/validation/signin";
import { signIn } from "next-auth/react";
export function useSigninWithCreds() {
  const [isInvalidCredentials, setIsInvalidCredentials] = useState(false);
  const router = useRouter();

  const signin = async (values: SigninType) => {
    const response = await signIn("credentials", {
      ...values,
      redirect: false,
    });
    if (response?.ok) {
      void router.push("/");
      return;
    }
    setIsInvalidCredentials(true);
  };

  return { isInvalidCredentials, signin };
}
