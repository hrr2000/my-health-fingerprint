import { useField } from "formik";
import { type GenericProps } from "../toolbox/types";
import React from "react";

interface LocalProps extends GenericProps {
  label: string;
  name: string;
  type?: string;
}

const TextInput = ({ label, name, type = "text", ...props }: LocalProps) => {
  const [field, meta] = useField(name);

  return (
    <div className="flex flex-col gap-2">
      <div className="column flex flex-col gap-2 ">
        <label className="font-normal capitalize " htmlFor={name}>
          {label}
        </label>
        <input
          className={`rounded-md  bg-slate-100 ${
            meta.touched && meta.error ? "border-1 border-red-500" : "border-0"
          }`}
          id={name}
          type={type}
          {...field}
          {...props}
        />
      </div>
      {meta.touched && meta.error ? (
        <div className="font-semibold capitalize text-red-500">
          this is field is {meta.error}
        </div>
      ) : null}
    </div>
  );
};

export default TextInput;
