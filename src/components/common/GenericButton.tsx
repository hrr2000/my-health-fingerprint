import { type ButtonHTMLAttributes } from "react";

const PrimaryButton = ({
  text,
  children,
  full,
  ...props
}: { text?: string; full?: boolean } & ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      className={`my-2 flex justify-center ${full ? 'w-full' : 'w-max'} shadow-lg shadow-sky-200 rounded-md border-[1px] transition hover:bg-primary-hover hover:border-primary-hover border-primary bg-primary p-2 px-4 text-white font-semibold text-md`}
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
}: { text?: string; full: boolean } & ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      className={`my-2 flex justify-center ${full ? 'w-full' : 'w-max'} shadow-sky-200 rounded-md border-[1px] transition border-dark p-2 px-4 text- font-semibold text-md`}
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
  return buttons[theme]({
    text,
    full: !!full,
    ...props,
  });
}
