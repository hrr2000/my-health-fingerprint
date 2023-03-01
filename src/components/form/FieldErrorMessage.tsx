import { useField } from "formik";
import React from "react";
import { type GenericProps } from "../toolbox/types";
interface LocalProps extends GenericProps {
  name: string;
}
const FieldErrorMessage = ({ name }: LocalProps) => {
  const [_, meta] = useField(name);
  return meta.touched && meta.error ? (
    <div className="text-sm font-semibold capitalize text-red-500">
      this is field is {meta.error}
    </div>
  ) : null;
};

export default FieldErrorMessage;
