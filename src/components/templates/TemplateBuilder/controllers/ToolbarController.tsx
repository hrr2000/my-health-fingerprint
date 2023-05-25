import {CollectionDetails, TemplateDetails} from "@/components/templates/TemplateBuilder/types";
import {useTemplateBuilder} from "@/components/templates/TemplateBuilder/TemplateBuilderContext";
import {api} from "@/utils/api";

export default function ToolbarController() {
  const {mutationState, slug} = useTemplateBuilder();

  const { mutate: createCollection, isLoading: isCreating, isSuccess: isCreated, isError: creationError } =
    api.collection.create.useMutation();
  const { mutate: updateCollection, isLoading: isUpdating, isSuccess: isUpdated, isError: updateError } =
    api.collection.update.useMutation();

  const isSaving = isCreating || isUpdating;
  const isSaved = isCreated || isUpdated;
  const savingError = creationError || updateError;

  const saveData = (values: {
    collection: CollectionDetails;
    template: TemplateDetails;
  }) => {
    const temp = {
      collection: values.collection,
      template: {
        ...values.template,
        schema: JSON.stringify(values.template.schema),
      },
    };

    if (mutationState.current === "create") {
      createCollection(temp);
      return;
    }

    updateCollection({
      ...temp,
      slug: slug ?? "",
    });
  };

  return {
    saveData,
    isSaving,
    isSaved,
    savingError
  }
}