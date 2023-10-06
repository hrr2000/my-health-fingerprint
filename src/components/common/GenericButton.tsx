import { useTranslation } from "next-i18next";
import { type ButtonHTMLAttributes } from "react";

const PrimaryButton = ({
  text,
  children,
  full,
  ...props
}: {
  text?: string;
  full?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      className={`my-2 flex justify-center ${
        full ? "w-full" : "w-max"
      } text-md rounded-md border-[1px] border-primary bg-primary p-2 px-4 font-semibold text-white shadow-lg shadow-sky-200 transition hover:border-primary-hover hover:bg-primary-hover`}
    >
      <span>{text}</span>
      {children}
    </button>
  );
};

const SecondaryButton = ({
  text,
  children,
  full,
  ...props
}: {
  text?: string;
  full: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      className={`my-2 flex justify-center ${
        full ? "w-full" : "w-max"
      } text- text-md rounded-md border-[1px] border-dark p-2 px-4 font-semibold shadow-sky-200 transition`}
    >
      <span>{text}</span>
      {children}
    </button>
  );
};

const buttons = {
  primary: PrimaryButton,
  secondary: SecondaryButton,
};

type ButtonTheme = keyof typeof buttons;

export default function GenericButton({
  text,
  theme,
  full,
  ...props
}: {
  text?: string;
  full?: boolean;
  theme: ButtonTheme;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  const {t} = useTranslation() 

  return buttons[theme]({
    text: t(text),
    full: !!full,
    ...props,
  });
}
