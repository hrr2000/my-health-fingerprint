import { useState } from "react";
import { signinFormSchema } from "@/validation/signin";
import { api } from "@/utils/api";
import { Form, Formik } from "formik";
import TextInput from "@/components/form/sub/TextInput";
import SubmitButton from "@/components/form/sub/SubmitButton";
import CompanyLogo from "../brand/CompanyLogo";
import Image from "next/image";
import FormErrorMessage from "./sub/FormErrorMessage";
import { areAnyValuesEmpty } from "@/utils/helpers";
import { useSigninWithCreds } from "@/hooks/useSigninWithCreds";
import { motion } from "framer-motion";

export default function SigninForm() {
  const [nationalId, setNationalId] = useState(""); // state
  const [selectedOrgId, setSelectedOrgId] = useState("");
  const { isInvalidCredentials, signin } = useSigninWithCreds({
    nationalId,
    selectedOrgId,
  });
  const {
    data,
    error: errorNationaId,
    isFetching,
  } = api.user.findOrgs.useQuery(
    { nationalId },
    {
      enabled: !!nationalId,
    }
  );

  return (
    <div className="flex w-full max-w-sm flex-col gap-4 lg:w-2/3">
      <CompanyLogo />
      {!data && (
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
        >
          <Formik
            initialValues={{ nationalId: "" }}
            onSubmit={(values, { resetForm }) => {
              if (values.nationalId !== nationalId) {
                setNationalId(values.nationalId);
              } else {
                resetForm();
              }
            }}
            validationSchema={signinFormSchema}
          >
            {({ resetForm, isValidating, values }) => (
              <Form className="flex flex-col gap-5">
                <TextInput
                  name="nationalId"
                  label="nationalId"
                  placeholder="NationalId ..."
                />
                <SubmitButton
                  message="submit"
                  isSubmitting={isFetching}
                  isValidating={isValidating}
                  values={values}
                  areAnyValuesEmptyHandler={areAnyValuesEmpty}
                />
                {!!errorNationaId && (
                  <FormErrorMessage
                    errorCode={errorNationaId.data?.code}
                    errorMessage={errorNationaId.message}
                    formReset={() => resetForm()}
                  />
                )}
              </Form>
            )}
          </Formik>
        </motion.div>
      )}
      {!!data?.orgs?.length && !selectedOrgId && (
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
          className="group flex flex-col gap-3"
        >
          <div>
            <div>
              Hi, {data?.firstName} {data?.lastName}
            </div>
            <p>What would you like to login with?</p>
            <div className="mt-5 flex h-[170px] flex-col gap-4 overflow-auto  rounded-md bg-gray-400/10 py-3 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-transparent  group-hover:scrollbar-thumb-gray-300">
              {data?.orgs?.map(({ org_name, picture, jobTitle, org_id }) => (
                <button
                  className="relative flex items-center gap-5 rounded-md bg-gradient-to-r  from-[#f75e8e] to-[#fc737c] p-3  text-left text-white shadow-lg before:absolute  before:inset-0 before:scale-0 before:bg-slate-100/10 before:hover:scale-100"
                  key={org_id.toString()}
                  onClick={() => setSelectedOrgId(org_id.toString())}
                >
                  <Image
                    className="rounded-[50%]"
                    src={picture}
                    width={40}
                    height={40}
                    alt=""
                  />
                  <div>
                    <p className="font-semibold capitalize">{org_name}</p>
                    <p className="font-light capitalize">{jobTitle}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}
      {!!selectedOrgId && (
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
        >
          <Formik initialValues={{ password: "" }} onSubmit={signin}>
            {({ isSubmitting, isValidating, values }) => (
              <Form className="flex flex-col gap-5 ">
                <TextInput
                  name="password"
                  type="password"
                  label="password"
                  placeholder="Password ..."
                />
                <SubmitButton
                  message="submit"
                  isSubmitting={isSubmitting}
                  isValidating={isValidating}
                  values={values}
                  areAnyValuesEmptyHandler={areAnyValuesEmpty}
                />
                {isInvalidCredentials && (
                  <FormErrorMessage errorMessage="Wrong Password" />
                )}
              </Form>
            )}
          </Formik>
        </motion.div>
      )}
    </div>
  );
}
