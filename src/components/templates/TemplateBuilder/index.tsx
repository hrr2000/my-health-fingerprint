import Builder from "@/components/templates/TemplateBuilder/Builder";
import Toolbar from "@/components/templates/TemplateBuilder/Toolbar";
import {
  TemplateBuilderContextProvider,
  useTemplateBuilder
} from "@/components/templates/TemplateBuilder/TemplateBuilderContext";
import {LoadingSpinner} from "@/components/common/LoadingSpinner";
import WriteView from "@/components/templates/TemplateBuilder/views/WriteView";

export default function TemplateBuilder() {
  const {collectionDetails, templateDetails, mutationState} = useTemplateBuilder();

  return (
    <TemplateBuilderContextProvider>
      {!collectionDetails.name && mutationState.current == 'update' && (
        <div className={'text-primary'}>
          <LoadingSpinner />
        </div>
      )}
      <div>
        <Builder />
        <div>
          <WriteView schema={templateDetails.schema} />
        </div>
      </div>
      <Toolbar />
    </TemplateBuilderContextProvider>
  );
}
