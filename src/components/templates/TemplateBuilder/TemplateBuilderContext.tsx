import { type ReactNode, createContext, useContext } from "react";
import AddFieldModal from "@/components/templates/TemplateBuilder/modals/AddFieldModal";
import {} from "@/components/templates/TemplateBuilder/engine/RowGenerator";
import { useRouter } from "next/router";
import BuilderController, {
  type IBuilderController,
} from "@/components/templates/TemplateBuilder/controllers/BuilderController";
import {
  AddFieldModalController,
  type IAddFieldModalController,
} from "@/components/templates/TemplateBuilder/controllers/AddFieldModalController";

const TemplateBuilderContext = createContext<
  (IBuilderController & IAddFieldModalController) | null
>(null);

export function TemplateBuilderContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const {
    query: { slug },
  } = useRouter();
  const builderController = BuilderController({ slug: slug as string });
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
  const {
    query: { slug },
  } = useRouter();
  const hook = useTemplateBuilderContext();
  if (!hook)
    return {
      ...BuilderController({ slug: slug as string }),
      ...AddFieldModalController(),
    };
  return hook;
};
