import React from "react";
import { type GenericProps } from "../toolbox/types";
interface LocalProps extends GenericProps {
  textColor: string;
}
interface textColorMap {
  [k: string]: string;
  white: string;
  blue: string;
}
export default function CompanyLogo({ textColor }: LocalProps) {
  const textColorMap: textColorMap = {
    white: "text-white",
    blue: "text-[#0f1e57]",
  };

  return (
    <h2
      className={`mb-[.2rem] text-5xl font-semibold leading-none ${textColorMap[
        textColor
      ]!}`}
    >
      MHFP
    </h2>
  );
}
