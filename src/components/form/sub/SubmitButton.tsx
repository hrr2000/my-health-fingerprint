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
      className="my-2 cursor-pointer disabled:cursor-not-allowed w-full flex shadow-lg text-center items-center justify-center shadow-sky-200 w-full rounded-md border-[1px] transition hover:bg-primary-hover hover:border-primary-hover border-primary bg-primary p-2 px-4 text-white font-semibold text-lg"
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
