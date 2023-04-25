import { TemplateBuilderContextProvider } from "@/contexts/TemplateBuilderContext";
import Builder from "@/components/templates/TemplateBuilder/Builder";
import Toolbar from "@/components/templates/TemplateBuilder/Toolbar";

export default function TemplateBuilder() {
  return (
    <TemplateBuilderContextProvider>
      <Builder />
      <Toolbar />
    </TemplateBuilderContextProvider>
  );
}
