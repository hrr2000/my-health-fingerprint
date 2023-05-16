import { useState } from "react";
import { useRouter } from "next/router";
import { type SigninType } from "@/validation/signin";
import { signIn } from "next-auth/react";

export function useSigninWithCreds() {
  const [nationalId, setNationalId] = useState(""); // state
  const [selectedOrgId, setSelectedOrgId] = useState("");
  const [isInvalidCredentials, setIsInvalidCredentials] = useState(false);
  const router = useRouter();

  const signin = async (values: { password: string }) => {
    const response = await signIn("credentials", {
      nationalId,
      selectedOrgId,
      ...values,
      redirect: false,
    });
    if (response?.ok) {
      void router.push("/dashboard");
      return;
    }

    setIsInvalidCredentials(true);
  };

  return {
    isInvalidCredentials,
    nationalId,
    selectedOrgId,
    setNationalId,
    setSelectedOrgId,
    signin,
  };
}
