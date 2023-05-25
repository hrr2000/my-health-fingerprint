import { type ButtonHTMLAttributes } from "react";

const PrimaryButton = ({
  text,
  children,
  ...props
}: { text?: string } & ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      className="my-2 w-full flex shadow-lg shadow-sky-200 w-full max-w-fit rounded-md border-[1px] transition hover:bg-primary-hover hover:border-primary-hover border-primary bg-primary p-2 px-4 text-white font-semibold text-lg"
    >
      <span>{text}</span>
      {children}
    </button>
  );
};

const SecondaryButton = ({
  text,
                           children,
  ...props
}: { text?: string } & ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      className="my-2 w-full flex w-full max-w-fit rounded-md border-[1px] border-black bg-white p-2 px-4"
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
  ...props
}: {
  text?: string;
  theme: ButtonTheme;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  return buttons[theme]({
    text,
    ...props,
  });
}
