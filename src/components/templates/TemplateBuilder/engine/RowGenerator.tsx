import { IoIosAdd } from "react-icons/io";
import { useState, useRef, useEffect } from "react";
import { useTemplateBuilder } from "@/contexts/TemplateBuilderContext";
import { api } from "@/utils/api";

export interface TemplateDetails {
  name: string;
  schema: Partial<TemplateComponent>[][];
  isPrintable: boolean;
}

export interface CollectionDetails {
  name: string;
  description: string;
  isPublic: boolean;
  isPatientProfile: boolean;
}

export interface TemplateComponent {
  _id: string;
  type: string;
  collection?: string;
  label: string;
}

export const templateDetailsInitialValues = {
  name: "",
  schema: [],
  isPrintable: false,
};

export const collectionDetailsInitialValues = {
  name: "",
  description: "",
  isPublic: false,
  isPatientProfile: false,
};

export function BuilderController({ slug }: { slug: string | null }) {
  // check if slug is null
  // if null then state is create -> call create mutation endpoint
  // if not then state is update -> call update mutation endpoint

  const [templateDetails, setTemplateDetails] = useState<TemplateDetails>(
    templateDetailsInitialValues
  );
  const [collectionDetails, setCollectionDetails] = useState<CollectionDetails>(
    collectionDetailsInitialValues
  );

  const { mutate: createCollection, isLoading: isCreating } =
    api.collection.create.useMutation();
  const { mutate: updateCollection, isLoading: isUpdating } =
    api.collection.update.useMutation();
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
    setTemplateDetails({
      ...template,
      schema: JSON.parse(
        template?.schema || "[]"
      ) as Partial<TemplateComponent>[][],
      isPrintable: template.is_printable || false,
      name: template.name || "",
    });
    setCollectionDetails({
      ...collection,
      isPatientProfile: collection.is_patient_profile,
      isPublic: collection.is_public,
    });
  }, [status]);

  const isSaving = isCreating || isUpdating;

  const appendRow = (columnsCount: number) => {
    if (!columnsCount || columnsCount > 4 || columnsCount < 1) return;
    const row = [];
    for (let i = 0; i < columnsCount; i++) row.push({});
    setTemplateDetails({
      ...templateDetails,
      schema: [...templateDetails.schema, row],
    });
  };
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

  return {
    templateDetails,
    collectionDetails,
    saveData,
    setCollectionDetails,
    setTemplateDetails,
    appendRow,
    removeRow,
    isUpdating,
    isCreating,
    isSaving,
    updateColumn,
  };
}

export type IBuilderController = ReturnType<typeof BuilderController>;

export default function RowGenerator() {
  const { appendRow } = useTemplateBuilder();
  const [formDisplay, setFormDisplay] = useState(false);
  const [columnsCount, setColumnsCount] = useState(0);

  return (
    <div>
      {!formDisplay ? (
        <button
          onClick={() => setFormDisplay(true)}
          className={`flex min-h-[50px] w-full items-center justify-center border-[1px] border-slate-200 duration-300 hover:shadow-md`}
        >
          <IoIosAdd size={20} />
          <span className={`text-xs`}>Add A Row</span>
        </button>
      ) : (
        <div className={`bg-slate-100 p-3`}>
          <input
            onChange={(e) => setColumnsCount(parseInt(e.target.value))}
            className="w-full max-w-xs border-slate-300 text-sm text-black"
            type="number"
            placeholder="number of columns..."
          />
          <div className={`flex gap-2 text-xs`}>
            <button
              onClick={() => {
                appendRow(columnsCount);
                setFormDisplay(false);
              }}
              className="my-2 flex w-full max-w-fit rounded-md border-[1px] border-black bg-black p-2 px-4 text-white"
            >
              <span>+ Apply the Row</span>
            </button>
            <button
              onClick={() => setFormDisplay(false)}
              className="my-2 flex w-full max-w-fit rounded-md border-[1px] border-black bg-white p-2 px-4"
            >
              <span>Cancel</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
