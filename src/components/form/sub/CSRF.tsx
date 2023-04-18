import React from "react";
import TextInput from "./TextInput";
import { type GenericProps } from "@/types/application";
interface LocalProps extends GenericProps {
  csrfToken: string;
}
export default function CSRF({ csrfToken }: LocalProps) {
  return <TextInput name="csrfToken" type="hidden" defaultValue={csrfToken} />;
}
