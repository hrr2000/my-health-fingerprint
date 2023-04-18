import React, { useEffect } from "react";
import { type GenericProps } from "@/types/application";
interface LocalProps extends GenericProps {
  errorMessage?: string;
  errorCode?: string;
  formReset?: () => void;
}

const FormErrorMessage = ({
  errorMessage,
  errorCode,
  formReset,
}: LocalProps) => {
  useEffect(() => {
    formReset?.();
  }, []);
  return (
    <>
      {!!errorMessage && (
        <div className="text-sm font-semibold capitalize text-red-500">
          {errorMessage}
          <br />
          {errorCode}
        </div>
      )}
    </>
  );
};

export default FormErrorMessage;
