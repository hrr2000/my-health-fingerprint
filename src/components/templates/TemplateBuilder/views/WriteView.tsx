import { useTemplateBuilder } from "@/components/templates/TemplateBuilder/TemplateBuilderContext";
import TextInput from "@/components/form/sub/TextInput";
import { Form, Formik } from "formik";
import GenericButton from "@/components/common/GenericButton";
import { type TemplateComponent, type TemplateDetails } from "../types";
import { api } from "@/utils/api";

function GenericField(props: { label?: string; name?: string; type?: string }) {
  return (
    <TextInput
      className={`w-full rounded-md border-[1px] border-slate-300 bg-slate-100 text-black`}
      placeholder={props.label}
      label={props.label}
      name={props.name || ""}
      type={props.type}
    />
  );
}

function schemaToObject(schema?: TemplateDetails["schema"]) {
  return (schema as Partial<TemplateComponent>[][])?.reduce<{
    [k: string]: string;
  }>((obj, row) => {
    for (const i of row) {
      const fieldName = i.name;
      if (fieldName) {
        obj[fieldName] = "";
      }
    }
    return obj;
  }, {});
}

interface IProps {
  collectionName?: string;
  patientId?: string;
}

export default function WriteView({
  collectionName = "",
  patientId = "",
}: IProps) {
  const { collectionDetails, templateDetails, mutationState } =
    useTemplateBuilder();
  const { data, isLoading } = api.template.getSchema.useQuery(
    { collectionName, templateName: "patient" },
    { enabled: !!collectionName }
  );

  const {
    mutate: addEntry,
    isLoading: isAddingEntry,
    isSuccess,
    error,
  } = api.patient.addEntryToCollection.useMutation();

  const isInCollectionsPage = !collectionName;
  const sourceSchema = (
    isInCollectionsPage ? templateDetails.schema : data?.schema
  ) as Partial<TemplateComponent>[][];
  return (
    <Formik
      initialValues={
        schemaToObject(
          JSON.parse(data?.schema || "[]") as TemplateDetails["schema"]
        ) || {}
      }
      onSubmit={(x) => {
        if (!isInCollectionsPage && !!patientId) {
          addEntry({ collectionName, patientId, data: x });
        } else {
        }
      }}
      enableReinitialize
    >
      {() => (
        <Form>
          <div
            className={`min-h-[50px] w-full  ${
              isInCollectionsPage ? "grid" : ""
            } grid-cols-12 justify-center gap-3`}
          >
            {sourceSchema?.map((row) => {
              return (
                <>
                  {row.map((col) => {
                    return (
                      <div
                        key={col.collection}
                        className={``}
                        style={{
                          gridColumn: `span ${12 / row.length} / span ${
                            12 / row.length
                          }`,
                        }}
                      >
                        {!col.type ? <></> : <GenericField {...col} />}
                      </div>
                    );
                  })}
                </>
              );
            })}
            {/*<button*/}
            {/*  className="w-32 my-2 rounded-md bg-black p-2 text-white transition-all disabled:bg-slate-700 hover:shadow-lg"*/}
            {/*>*/}
            {/*  <span>Save</span>*/}
            {/*</button>*/}
            {templateDetails.name == 'main' && mutationState.current == 'update' && (
              <GenericButton
                type="submit"
                theme={"primary"}
                text={"Save Details"}
              />
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
}
