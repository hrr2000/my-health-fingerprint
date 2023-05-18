import { type ButtonHTMLAttributes } from "react";

const PrimaryButton = ({
  text,
  ...props
}: { text: string } & ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      className="my-2 flex w-full max-w-fit rounded-md border-[1px] border-black bg-black p-2 px-4 text-white"
    >
      <span>{text}</span>
    </button>
  );
};

const SecondaryButton = ({
  text,
  ...props
}: { text: string } & ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      className="my-2 flex w-full max-w-fit rounded-md border-[1px] border-black bg-white p-2 px-4"
    >
      <span>{text}</span>
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
  text: string;
  theme: ButtonTheme;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  return buttons[theme]({
    text,
    ...props,
  });
}
