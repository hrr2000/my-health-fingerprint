import { useField } from "formik";
import { type GenericProps } from "@/types/application";
import FieldErrorMessage from "@/components/form/sub/FieldErrorMessage";

interface LocalProps extends GenericProps {
  label?: string;
  name: string;
  type?: string;
  required?: boolean;
}

const TextInput = ({
  label,
  name,
  type = "text",
  required = false,
  ...props
}: LocalProps) => {
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
          className={`rounded-sm bg-slate-100 text-sm disabled:cursor-not-allowed disabled:bg-gray-200 disabled:font-semibold disabled:text-gray-500 ${
            meta.touched && meta.error ? "border-1 border-red-500" : "border-0"
          }`}
          id={name}
          type={type}
          {...field}
          {...props}
        />
      </div>
      <FieldErrorMessage name={name} />
    </div>
  );
};

export default TextInput;
