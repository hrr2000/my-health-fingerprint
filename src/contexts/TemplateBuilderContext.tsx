import {
  type ReactNode,
  createContext,
  useContext,
} from "react";
import AddFieldModal, {
  AddFieldModalController,
  IAddFieldModalController
} from "@/components/templates/TemplateBuilder/modals/AddFieldModal";
import {
  IRowGeneratorController,
  RowGeneratorController
} from "@/components/templates/TemplateBuilder/engine/RowGenerator";

const TemplateBuilderContext = createContext< IRowGeneratorController & IAddFieldModalController | null>(null);

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
        ...fieldModalController
      }}
    >
      {children}
      <div>
       <AddFieldModal />
      </div>
    </TemplateBuilderContext.Provider>
  );
}

export const useTemplateBuilder = () => {
  const hook = useContext(TemplateBuilderContext);
  if(!hook) return {
    ...RowGeneratorController(),
    ...AddFieldModalController()
  }
  return hook;
}
