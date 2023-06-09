import { Field } from "formik";
import FieldErrorMessage from "./FieldErrorMessage";
import { type GenericProps } from "@/types/application";

interface LocalProps extends GenericProps {
  label?: string;
  name: string;
  value: string;
  required?: boolean;
}

export default function CheckboxInput({
  label,
  name,
  required = false,
  value,
  ...props
}: LocalProps) {
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex items-center gap-10 ">
        <label
          className="flex items-center text-2xl font-normal capitalize text-gray-500 "
          htmlFor={name}
        >
          <span>{label}</span>
          {required && <span className="mx-1 text-xl text-red-700">*</span>}
        </label>

        <Field
          type="checkbox"
          className={`before:content[''] form-checkbox relative h-6 w-10 appearance-none rounded-full border-0 bg-slate-200 transition before:absolute before:left-[-1px] before:top-[-3px] before:h-7 before:w-7 before:rounded-full before:bg-white before:shadow-md before:transition checked:bg-primary checked:before:left-1/2`}
          name={name}
          value={value}
          {...props}
        />
      </div>
      <FieldErrorMessage name={name} />
    </div>
  );
}
