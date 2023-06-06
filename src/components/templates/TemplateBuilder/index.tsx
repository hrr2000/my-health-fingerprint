import Builder from "@/components/templates/TemplateBuilder/Builder";
import Toolbar from "@/components/templates/TemplateBuilder/Toolbar";
import {
  TemplateBuilderContextProvider,
  useTemplateBuilder
} from "@/components/templates/TemplateBuilder/TemplateBuilderContext";
import {LoadingSpinner} from "@/components/common/LoadingSpinner";
import WriteView from "@/components/templates/TemplateBuilder/views/WriteView";

function TemplateBuilderComponent() {
  const {collectionDetails, templateDetails, mutationState, builderView} = useTemplateBuilder();
  return (
    <>
      {!collectionDetails.name && mutationState.current == 'update' && (
        <div className={'text-primary'}>
          <LoadingSpinner/>
        </div>
      )}
      {builderView ? (
        <>
          <div>
            <Builder/>
            <div>
              <h2>
                Preview
              </h2>
            </div>
          </div>
          <Toolbar/>
        </>
      ) : (
        <>
          <div className={`p-10`}>
            <WriteView />
          </div>
          <Toolbar/>
        </>
      )}
    </>
  );
}

export default function TemplateBuilder() {
  return (
    <TemplateBuilderContextProvider>
      <TemplateBuilderComponent />
    </TemplateBuilderContextProvider>
  )
}
