import React, { useState } from "react";
import { signIn, getCsrfToken } from "next-auth/react";
import { signinFormSchema } from "@/validation/signin";
import { Form, Formik } from "formik";
import {
  type InferGetServerSidePropsType,
  type GetServerSidePropsContext,
} from "next";
import TextInput from "@/components/form/TextInput";
import SubmitButton from "@/components/form/SubmitButton";
import Image from "next/image";
import { useRouter } from "next/router";

export default function SignIn({
  csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [isInvalidCredentials, setIsInvalidCredentials] = useState(false);
  const router = useRouter();
  return (
    <main className="grid min-h-screen lg:grid-cols-2">
      <div className=" col-span-1 col-start-1 flex flex-col items-center justify-center gap-5 p-6">
        <Formik
          initialValues={{ name: "", password: "" }}
          onSubmit={async (values) => {
            const response = await signIn("credentials", {
              ...values,
              redirect: false,
            });
            if (response?.ok) {
              void router.push("/");
            }
            if (!isInvalidCredentials) {
              setIsInvalidCredentials(true);
            }
          }}
          validationSchema={signinFormSchema}
        >
          {({ isSubmitting, isValidating }) => (
            <Form className="flex w-full max-w-sm flex-col gap-5 lg:w-2/3">
              <div className="flex items-center  gap-2">
                <figure>
                  <Image
                    width={50}
                    height={50}
                    src="/virus-report.svg"
                    alt=""
                  />
                </figure>
                <h2 className="text-5xl font-semibold text-blue-500">MHFP</h2>
              </div>
              <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
              <TextInput name="name" label="Name" placeholder="Name ..." />
              <TextInput
                name="password"
                label="Password"
                placeholder="Password ..."
                type="password"
              />

              <SubmitButton isLoading={isSubmitting || isValidating} />

              {isInvalidCredentials && (
                <div className="rounded-md bg-slate-100 p-10 text-center text-red-500 shadow-sm">
                  The password that you&#39;ve entered is incorrect.
                </div>
              )}
            </Form>
          )}
        </Formik>
      </div>

      <div
        style={{
          backgroundImage: "url(/reasearch-woman.jpg)",
          backgroundPosition: "top center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        className="col-span-2 col-start-2  hidden items-center justify-center lg:flex "
      ></div>
    </main>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const csrfToken = await getCsrfToken(context);
  return {
    props: {
      csrfToken,
    },
  };
}
