import { type ReactNode, createContext, useContext } from "react";
import AddFieldModal, {
  AddFieldModalController,
  type IAddFieldModalController,
} from "@/components/templates/TemplateBuilder/modals/AddFieldModal";
import {
  type IRowGeneratorController,
  RowGeneratorController,
} from "@/components/templates/TemplateBuilder/engine/RowGenerator";

const TemplateBuilderContext = createContext<
  (IRowGeneratorController & IAddFieldModalController) | null
>(null);

export function TemplateBuilderContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const rowGeneratorController = RowGeneratorController();
  const fieldModalController = AddFieldModalController();

  return (
    <TemplateBuilderContext.Provider
      value={{
        ...rowGeneratorController,
        ...fieldModalController,
      }}
    >
      {children}

      <AddFieldModal />
    </TemplateBuilderContext.Provider>
  );
}

export const useTemplateBuilderContext = () =>
  useContext(TemplateBuilderContext);

export const useTemplateBuilder = () => {
  const hook = useTemplateBuilderContext();
  if (!hook)
    return {
      ...RowGeneratorController(),
      ...AddFieldModalController(),
    };
  return hook;
};
