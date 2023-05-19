import { useField } from "formik";
import { type GenericProps } from "@/types/application";
import FieldErrorMessage from "@/components/form/sub/FieldErrorMessage";

interface LocalProps extends GenericProps {
  label?: string;
  name: string;
  type?: string;
}

const TextInput = ({ label, name, type = "text", ...props }: LocalProps) => {
  const [field, meta] = useField(name);

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="column flex flex-col gap-2 ">
        <label className="font-normal capitalize text-gray-500 " htmlFor={name}>
          {label}
        </label>
        <input
          className={`rounded-sm  bg-slate-100 text-sm ${
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
