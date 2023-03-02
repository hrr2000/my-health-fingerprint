import React from "react";
import Image from "next/image";
import { useFormikContext } from "formik";
import { areAnyValuesEmpty } from "@/utils/helpers";

const SubmitButton = () => {
  const { values, isSubmitting, isValidating } =
    useFormikContext<Record<string, string>>();
  const isLoading = isSubmitting || isValidating;
  const isValueEmpty = areAnyValuesEmpty(values);

  return (
    <button
      className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-400 px-5 py-2 text-xl text-white  transition-all hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-600  "
      type="submit"
      disabled={isLoading || isValueEmpty}
    >
      <span>Sign in</span>
      {isLoading && (
        <Image
          width={22}
          height={22}
          src="/loading-spinner.svg"
          className="mx-1 animate-spin delay-300 "
          alt=""
        />
      )}
    </button>
  );
};

export default SubmitButton;
