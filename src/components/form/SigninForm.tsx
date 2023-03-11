import React, { useState } from "react";
import TextInput from "@/components/form/sub/TextInput";
import SubmitButton from "@/components/form/sub/SubmitButton";
import { signinFormSchema } from "@/validation/signin";
import { Form, Formik } from "formik";
import CompanyLogo from "../brand/CompanyLogo";
import { api } from "@/utils/api";
import Image from "next/image";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
export default function SigninForm() {
  const [nationalId, setNationalId] = useState("");
  const [selectedOrg, setSelectedOrg] = useState({});
  const { data } = api.user.findOrgs.useQuery({ nationalId });
  const router = useRouter();
  return (
    <>
      <CompanyLogo />
      {!data?.firstName && (
        <Formik
          initialValues={{ nationalId: "" }}
          onSubmit={(values) => {
            setNationalId(values.nationalId);
          }}
          validationSchema={signinFormSchema}
        >
          {() => (
            <Form className="flex w-full max-w-sm flex-col gap-4 lg:w-2/3">
              <TextInput
                name="nationalId"
                label="nationalId"
                placeholder="NationalId ..."
              />
              <SubmitButton message="submit" />
            </Form>
          )}
        </Formik>
      )}
      {!!data?.firstName && !Object.keys(selectedOrg).length && (
        <div>
          <div>
            Hi, {data?.firstName} {data?.lastName}
          </div>
          <div>
            What would you like to login with?
            {data?.orgs?.map(({ org_name, picture, jobTitle, org_id }) => (
              <button
                className="flex items-center gap-4 rounded-md bg-slate-400 p-3 shadow-md transition-all duration-200 hover:bg-slate-500"
                key={org_id.toString()}
                onClick={() => setSelectedOrg({ org_id })}
              >
                <Image
                  className="rounded-[50%]"
                  src={picture}
                  width={30}
                  height={30}
                  alt=""
                />
                <div>
                  <p>{org_name}</p>
                  <p>{jobTitle}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
      {!!Object.keys(selectedOrg).length && (
        <Formik
          initialValues={{ password: "" }}
          onSubmit={async (values) => {
            console.log("Selected Org AT FORM", selectedOrg);

            const response = await signIn("credentials", {
              nationalId,
              ...values,
              ...selectedOrg,
              redirect: false,
            });
            if (response?.ok) {
              void router.push("/dashboard");
              return;
            }
          }}
        >
          {() => (
            <Form className="flex w-full max-w-sm flex-col gap-4 lg:w-2/3">
              <TextInput
                name="password"
                label="password"
                placeholder="Password ..."
              />
              <SubmitButton message="submit" />
            </Form>
          )}
        </Formik>
      )}
    </>
  );
}

{
  /* <TextInput
name="password"
label="Password"
placeholder="Password ..."
type="password"
/>
<SubmitButton message="sign in" />
<InvalidCredentialsPrompt
isInvalidCredentials={isInvalidCredentials}
/> */
}
