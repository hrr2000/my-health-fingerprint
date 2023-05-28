import {
  CollectionDetails,
  collectionDetailsInitialValues,
  TemplateComponent,
  TemplateDetails,
  templateDetailsInitialValues,
} from "@/components/templates/TemplateBuilder/types";
import { api } from "@/utils/api";
import { useEffect, useRef, useState } from "react";

export type IBuilderController = ReturnType<typeof BuilderController>;

export default function BuilderController({ slug }: { slug: string | null }) {
  // check if slug is null
  // if null then state is create -> call create mutation endpoint
  // if not then state is update -> call update mutation endpoint

  const [templateDetails, setTemplateDetails] = useState<TemplateDetails>(
    templateDetailsInitialValues
  );
  const [collectionDetails, setCollectionDetails] = useState<CollectionDetails>(
    collectionDetailsInitialValues
  );
  const [builderView, setBuilderView] = useState(false);

  const mutationState = useRef<"update" | "create">(slug ? "update" : "create");

  const { data, status, error } = api.collection.findOne.useQuery(
    { slug: slug || "" },
    { enabled: mutationState.current == "update", retry: 1 }
  );

  useEffect(() => {
    if (status != "success") return;
    if (!data) return;
    const { template, collection } = data;
    if (!template || !collection) return;
    console.log(template);
    setTemplateDetails({
      ...template,
      schema: JSON.parse(
        template.schema || "[]"
      ) as Partial<TemplateComponent>[][],
      isPrintable: template.is_printable,
      name: template.name || "",
    });
    setCollectionDetails({
      ...collection,
      isPatientSpecific: collection.is_patient_specific,
      isPatientProfile: collection.is_patient_profile,
      isPublic: collection.is_public,
    });
  }, [status]);

  // builder actions
  const removeRow = (index: number) => {
    setTemplateDetails({
      ...templateDetails,
      schema: templateDetails.schema.filter((_, idx) => idx != index),
    });
  };

  const updateColumn = (
    rowIndex: number,
    columnIndex: number,
    updateQuery: Partial<TemplateComponent>
  ) => {
    const tmpSchema = templateDetails.schema;
    if (tmpSchema[rowIndex]) {
      const columns = tmpSchema[rowIndex];
      if (columns) {
        columns[columnIndex] = {
          ...tmpSchema?.[rowIndex]?.[columnIndex],
          ...updateQuery,
        };
      }
    }
    setTemplateDetails({
      ...templateDetails,
      schema: tmpSchema,
    });
  };

  const appendRow = (columnsCount: number) => {
    if (!columnsCount || columnsCount > 4 || columnsCount < 1) return;
    const row = [];
    for (let i = 0; i < columnsCount; i++) row.push({});
    setTemplateDetails({
      ...templateDetails,
      schema: [...templateDetails.schema, row],
    });
  };

  return {
    builderView,
    setBuilderView,
    templateDetails,
    collectionDetails,
    mutationState,
    setCollectionDetails,
    setTemplateDetails,
    appendRow,
    removeRow,
    slug,
    updateColumn,
  };
}
