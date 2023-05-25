import Builder from "@/components/templates/TemplateBuilder/Builder";
import Toolbar from "@/components/templates/TemplateBuilder/Toolbar";
import {
  TemplateBuilderContextProvider,
  useTemplateBuilder
} from "@/components/templates/TemplateBuilder/TemplateBuilderContext";
import {LoadingSpinner} from "@/components/common/LoadingSpinner";

export default function TemplateBuilder() {
  const {collectionDetails, mutationState} = useTemplateBuilder();

  return (
    <TemplateBuilderContextProvider>
      {!collectionDetails.name && mutationState.current == 'update' && (
        <div className={'text-primary'}>
          <LoadingSpinner />
        </div>
      )}
      <Builder />
      <Toolbar />
    </TemplateBuilderContextProvider>
  );
}
