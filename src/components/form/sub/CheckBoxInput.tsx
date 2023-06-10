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
          className="flex items-center text-md font-normal capitalize text-gray-500 min-w-max"
          htmlFor={name}
        >
          <span>{label}</span>
          {required && <span className="mx-1 text-xl text-red-700">*</span>}
        </label>

        <Field
          type="checkbox"
          style={{
            backgroundImage: "none"
          }}
          className={`checked:bg-primary before:content[''] focus:outline-0 cursor-pointer form-checkbox relative h-5 w-10 before:scale-125 focus:ring-0 before:h-full before:w-1/2 before:translate-x-0 checked:before:translate-x-full appearance-none rounded-full border-0 bg-slate-200 transition before:absolute before:rounded-full before:bg-white before:shadow-md before:transition`}
          name={name}
          value={value}
          {...props}
        />
      </div>
      <FieldErrorMessage name={name} />
    </div>
  );
}
