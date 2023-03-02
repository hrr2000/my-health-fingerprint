import React from "react";
import TextInput from "@/components/form/sub/TextInput";
import SubmitButton from "@/components/form/sub/SubmitButton";
import { signinFormSchema } from "@/validation/signin";
import { useSigninWithCreds } from "@/hooks/useSigninWithCreds";
import { Form, Formik } from "formik";
import CompanyLogo from "../brand/CompanyLogo";
import InvalidCredentialsPrompt from "./sub/InvalidCredentialsPrompt";

export default function SigninForm() {
  const { isInvalidCredentials, signin } = useSigninWithCreds();

  return (
    <Formik
      initialValues={{ name: "", password: "" }}
      onSubmit={signin}
      validationSchema={signinFormSchema}
    >
      {() => (
        <Form className="flex w-full max-w-sm flex-col gap-4 lg:w-2/3">
          <CompanyLogo />
          <TextInput name="name" label="Name" placeholder="Name ..." />
          <TextInput
            name="password"
            label="Password"
            placeholder="Password ..."
            type="password"
          />
          <SubmitButton message="sign in" />
          <InvalidCredentialsPrompt
            isInvalidCredentials={isInvalidCredentials}
          />
        </Form>
      )}
    </Formik>
  );
}
