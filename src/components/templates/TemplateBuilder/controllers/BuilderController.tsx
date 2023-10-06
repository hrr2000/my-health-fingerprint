import {
  type CollectionDetails,
  collectionDetailsInitialValues,
  type TemplateComponent,
  type TemplateDetails,
  templateDetailsInitialValues,
} from "@/components/templates/TemplateBuilder/types";
import { api } from "@/utils/api";
import { useEffect, useRef, useState } from "react";

export type IBuilderController = ReturnType<typeof BuilderController>;

export function parseTemplate(template: TemplateDetails): TemplateDetails {
  const templateSchema = template.schema;
  if (typeof templateSchema === "string") {
    return {
      ...template,
      schema: JSON.parse(templateSchema) as Partial<TemplateComponent>[][],
      isPrintable: template.isPrintable,
      name: template.name || "",
    };
  }
  return templateDetailsInitialValues;
}

export default function BuilderController({ slug }: { slug: string | null }) {
  // check if slug is null
  // if null then state is create -> call create mutation endpoint
  // if not then state is update -> call update mutation endpoint
  const [builderView, setBuilderView] = useState(false);

  const mutationState = useRef<"update" | "create">(slug ? "update" : "create");

  const { data, status, error } = api.collection.findOne.useQuery(
    { slug: slug || "" },
    { enabled: mutationState.current == "update", retry: 1 }
  );

  const [templateDetails, setTemplateDetails] = useState<TemplateDetails>(
    {
      ...templateDetailsInitialValues,
      name: data?.template?.name || ""
    }
  );
  const [collectionDetails, setCollectionDetails] = useState<CollectionDetails>(
    collectionDetailsInitialValues
  );

  useEffect(() => {
    if (status != "success") return;
    if (!data) return;
    const { template, collection } = data;
    if (!template || !collection) return;

    setTemplateDetails(parseTemplate(template));
    setCollectionDetails({
      ...collection,
      displayNameAr: collection.display_name_ar,
      displayNameEn: collection.display_name_en,
      isPatientSpecific: collection.is_patient_specific,
      isPatientProfile: collection.is_patient_profile,
      isPublic: collection.is_public,
    });
  }, [status]);

  // builder actions
  const removeRow = (index: number) => {
    const row = templateDetails.schema;
    if (row && Array.isArray(row)) {
      setTemplateDetails({
        ...templateDetails,
        schema: row.filter((_, idx) => idx != index),
      });
    }
  };

  const updateColumn = (
    rowIndex: number,
    columnIndex: number,
    updateQuery: Partial<TemplateComponent>
  ) => {
    const tmpSchema = templateDetails.schema;
    if (tmpSchema?.[rowIndex]) {
      const columns = tmpSchema[rowIndex];
      let column = columns?.[columnIndex];
      if (columns && column) {
        column = {
          ...(tmpSchema?.[rowIndex]?.[
            columnIndex
          ] as Partial<TemplateComponent>[][]),
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
    const schema = templateDetails.schema;
    if (schema && Array.isArray(schema)) {
      setTemplateDetails({
        ...templateDetails,
        schema: [...schema, row],
      });
    }
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
