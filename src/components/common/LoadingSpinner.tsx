import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export const LoadingSpinner = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-white">
      <AiOutlineLoading3Quarters size={60} className="animate-spin" />
    </div>
  );
};
