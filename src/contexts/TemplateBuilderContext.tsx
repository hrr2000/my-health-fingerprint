import { type ReactNode, createContext, useContext } from "react";
import AddFieldModal, {
  AddFieldModalController,
  type IAddFieldModalController,
} from "@/components/templates/TemplateBuilder/modals/AddFieldModal";
import {
  BuilderController,
  type IBuilderController,
} from "@/components/templates/TemplateBuilder/engine/RowGenerator";

const TemplateBuilderContext = createContext<
  (IBuilderController & IAddFieldModalController) | null
>(null);

export function TemplateBuilderContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const builderController = BuilderController();
  const fieldModalController = AddFieldModalController();

  return (
    <TemplateBuilderContext.Provider
      value={{
        ...builderController,
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
      ...BuilderController(),
      ...AddFieldModalController(),
    };
  return hook;
};
