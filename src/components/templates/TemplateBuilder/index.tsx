import Builder from "@/components/templates/TemplateBuilder/Builder";
import Toolbar from "@/components/templates/TemplateBuilder/Toolbar";
import {
  TemplateBuilderContextProvider,
  useTemplateBuilder,
} from "@/components/templates/TemplateBuilder/TemplateBuilderContext";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import WriteView from "@/components/templates/TemplateBuilder/views/WriteView";
import { api } from "@/utils/api";
import ReadView from "./views/ReadView";

function TemplateBuilderComponent() {
  const { collectionDetails, templateDetails, mutationState, builderView } =
  useTemplateBuilder();
  
  const { data } = api.collection.getEntries.useQuery(
    { collectionName: collectionDetails.name },
    { enabled: !!collectionDetails.name }
  );

  return (
    <>
      {!collectionDetails.name && mutationState.current == "update" && (
        <div className={"text-primary"}>
          <LoadingSpinner />
        </div>
      )}
      {builderView ? (
        <>
          <div>
            <Builder />
            <div>
              <h2>Preview</h2>
            </div>
          </div>
          <Toolbar />
        </>
      ) : (
        <>
          <div className={`p-10`}>
            <WriteView collectionName={collectionDetails.name} />
            <div className="my-5">
              <h2 className="capitalize text-primary text-xl font-bold py-5">
                {collectionDetails.name}
              </h2>
              <ReadView data={data?.entries as unknown as { _id: string }[]} />
            </div>
          </div>
          <Toolbar />
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
  );
}
