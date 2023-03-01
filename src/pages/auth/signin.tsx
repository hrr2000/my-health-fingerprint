import React from "react";
import { signIn, getCsrfToken } from "next-auth/react";
import { signinFormSchema } from "@/validation/signin";
import { Form, Formik } from "formik";
import {
  type InferGetServerSidePropsType,
  type GetServerSidePropsContext,
} from "next";
import TextInput from "@/components/form/TextInput";
import Image from "next/image";
import SubmitButton from "@/components/form/SubmitButton";
export default function SignIn({
  csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="grid min-h-screen grid-cols-2">
      <div className="bg- col-span-1 col-start-1 flex flex-col items-center justify-center p-6">
        <Formik
          initialValues={{ name: "", password: "" }}
          onSubmit={(values) => {
            void signIn("credentials", {
              ...values,
              callbackUrl: "/",
            });
          }}
          validationSchema={signinFormSchema}
        >
          {() => (
            <Form className="flex w-2/3 flex-col gap-5">
              <div className="flex items-center justify-center gap-2">
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
              <SubmitButton />
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
        className="col-span-2 col-start-2 flex items-center justify-center"
      ></div>
    </div>
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
