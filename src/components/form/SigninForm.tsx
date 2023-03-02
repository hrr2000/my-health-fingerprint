import React from "react";
import TextInput from "@/components/form/sub/TextInput";
import SubmitButton from "@/components/form/sub/SubmitButton";
import { signinFormSchema } from "@/validation/signin";
import { useSigninWithCreds } from "@/hooks/useSigninWithCreds";
import { Form, Formik } from "formik";
import Image from "next/image";
import { type GenericProps } from "../toolbox/types";

interface LocalProps extends GenericProps {
  csrfToken?: string;
}

export default function SigninForm({ csrfToken }: LocalProps) {
  const { isInvalidCredentials, signin } = useSigninWithCreds();
  return (
    <Formik
      initialValues={{ name: "", password: "" }}
      onSubmit={signin}
      validationSchema={signinFormSchema}
    >
      {() => (
        <Form className="flex w-full max-w-sm flex-col gap-5 lg:w-2/3">
          <div className="flex items-center  gap-2">
            <figure>
              <Image width={50} height={50} src="/virus-report.svg" alt="" />
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

          {isInvalidCredentials && (
            <div className="rounded-md bg-slate-100 p-10 text-center text-red-500 shadow-sm">
              The password that you&#39;ve entered is incorrect.
            </div>
          )}
        </Form>
      )}
    </Formik>
  );
}
