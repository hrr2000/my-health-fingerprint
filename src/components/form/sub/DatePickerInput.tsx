import React from "react";
import { useField, useFormikContext } from "formik";
import FieldErrorMessage from "./FieldErrorMessage";
import { type GenericProps } from "@/types/application";
interface LocalProps extends GenericProps {
  label?: string;
  name: string;
  required?: boolean;
}

export const DatePickerField = ({
  label,
  name,
  required = false,
  ...props
}: LocalProps) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="column flex flex-col gap-2 ">
        <label
          className="flex items-center font-normal capitalize text-gray-500 "
          htmlFor={name}
        >
          <span>{label}</span>
          {required && <span className="mx-1 text-xl text-red-700">*</span>}
        </label>
        <input
          className={`rounded-sm bg-slate-100 text-sm capitalize disabled:cursor-not-allowed disabled:bg-gray-200 disabled:font-semibold disabled:text-gray-500 ${
            meta.touched && meta.error ? "border-1 border-red-500" : "border-0"
          }`}
          {...field}
          {...props}
          type="date"
          onChange={(e) => {
            setFieldValue(
              field.name,
              new Date(e.target.value).toISOString().split("T")[0]
            );
          }}
        />
      </div>
      <FieldErrorMessage name={name} />
    </div>
  );
};
