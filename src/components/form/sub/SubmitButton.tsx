import Image from "next/image";
import { type GenericProps } from "@/types/application";

interface LocalProps extends GenericProps {
  message: string;
  isSubmitting: boolean;
  isValidating: boolean;
  values: Record<string, string>;
  areAnyValuesEmptyHandler: (values: LocalProps["values"]) => boolean;
}
const SubmitButton = ({
  message,
  isSubmitting,
  isValidating,
  values,
  areAnyValuesEmptyHandler,
}: LocalProps) => {
  const isLoading = isSubmitting || isValidating;
  const isValueEmpty = areAnyValuesEmptyHandler(values);

  return (
    <button
      className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-400 px-5 py-2 text-xl text-white  transition-all disabled:cursor-not-allowed disabled:bg-slate-600 hover:bg-blue-700  "
      type="submit"
      disabled={isLoading || isValueEmpty}
    >
      <span className="capitalize">{message}</span>
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
