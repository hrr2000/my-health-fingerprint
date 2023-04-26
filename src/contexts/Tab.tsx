import React from "react";
import { useTabsContext } from "./TabsContext";
import { type GenericProps } from "@/types/application";

interface LocalProps extends GenericProps {
  value: string;
  className: string;
  textContext: string;
}
export const Tab = ({ value, className, textContext }: LocalProps) => {
  const { setCurrentTab } = useTabsContext();
  return (
    <button onClick={() => setCurrentTab?.(value)} className={className}>
      {textContext}
    </button>
  );
};
