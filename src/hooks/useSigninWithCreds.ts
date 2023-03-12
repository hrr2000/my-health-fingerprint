import { useState } from "react";
import { useRouter } from "next/router";
import { type SigninType } from "@/validation/signin";
import { signIn } from "next-auth/react";

type Credentials = Record<string, string>;
export function useSigninWithCreds(creds: Credentials) {
  const [isInvalidCredentials, setIsInvalidCredentials] = useState(false);
  const router = useRouter();

  const signin = async (values: { password: string }) => {
    console.log({ creds, values });
    const response = await signIn("credentials", {
      ...creds,
      ...values,
      redirect: false,
    });
    if (response?.ok) {
      void router.push("/dashboard");
      return;
    }

    setIsInvalidCredentials(true);
  };

  return { isInvalidCredentials, signin };
}
