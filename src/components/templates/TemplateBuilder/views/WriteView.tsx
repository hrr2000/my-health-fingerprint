import { useTemplateBuilder } from "@/components/templates/TemplateBuilder/TemplateBuilderContext";
import TextInput from "@/components/form/sub/TextInput";
import { Form, Formik } from "formik";
import GenericButton from "@/components/common/GenericButton";
import { type TemplateComponent, type TemplateDetails } from "../types";
import { api } from "@/utils/api";
import { Field } from "formik";

function parseOptions(options: string) {
  return options.split(';').map((option: string) => {
    return {
      name: option
    }
  });
}

function GenericField(props: { label?: string; name?: string; type?: string, collection?: string, options?: string, is_collection?: string }) {
  
  const { data } = api.collection.getEntries.useQuery(
    { collectionName: props.collection },
    { enabled: (props?.type === 'select') }
  );

  if(props.type == "textarea") {
    return (
      <div className="column flex w-full flex-col gap-2">
        <label
          className="font-normal capitalize text-gray-500"
          htmlFor={props.name}
        >
          {props.name}
        </label>
        <Field as={"textarea"} placeholder={props.label} rows="4" name={props.name} className={`text-sm text-black border-gray-300 bg-slate-100 rounded-md`} />
      </div>
    )
  }

  if(props.type == 'select') {
    const options = !props?.is_collection ? parseOptions(props?.options || "") : data?.entries;

    return (
      <div className="column flex w-full flex-col gap-2">
        <label
          className="font-normal capitalize text-gray-500"
          htmlFor={props.name}
        >
          {props.name}
        </label>
        <Field as={"select"} name={props.name} className={`text-sm text-black border-gray-300 bg-slate-100 rounded-md capitalize`}>
          <option value={props.name}>Select {props?.name}</option>
          {options?.map((option: {[k:string]: string}, idx: number) => {
            return (
              <option key={`select-${option?.name}-${idx}`} value={option?.name}>{option.name}</option>
            )
          })}
        </Field>
      </div>
    )
  }

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

function PatientViewController(collectionName: string, patientId: string) {

  const { data } = api.template.getSchema.useQuery(
    { collectionName, templateName: "patient" },
    { enabled: !!collectionName }
  );

  const {
    mutate: save,
    isLoading,
    isSuccess,
    error,
  } = api.patient.addEntryToCollection.useMutation();

  return {
    data,
    isLoading,
    save: (obj) => save({collectionName, patientId, data: obj as object}),
    schema: (JSON.parse(data?.schema || "[]") || []) as Partial<TemplateComponent>[][],
    isSuccess,
    error,
    isSubmittable: true
  }
}

function CollectionViewController(collectionName: string) {

  const { templateDetails, mutationState } = useTemplateBuilder();
  const { data } = api.template.getSchema.useQuery(
    { collectionName, templateName: templateDetails.name },
    { enabled: !!collectionName }
  );

  const {
    mutate: save,
    isLoading,
    isSuccess,
    error,
  } = api.collection.addEntry.useMutation();

  return {
    data,
    isLoading,
    save: (obj) => save({collectionName, data: obj as object}),
    schema: templateDetails.schema as Partial<TemplateComponent>[][],
    isSuccess,
    error,
    isSubmittable: templateDetails.name == 'main' && mutationState.current == 'update'
  }
}


interface IProps {
  collectionName?: string;
  patientId?: string;
}

export default function WriteView({
  collectionName = "",
  patientId = "",
}: IProps) {
  const isInCollectionsPage = !patientId;

  const {data, isLoading, schema, save, isSubmittable} = (isInCollectionsPage ? CollectionViewController(collectionName) : PatientViewController(collectionName, patientId))


  return (
    <Formik
      initialValues={
        schemaToObject(
          JSON.parse(data?.schema || "[]") as TemplateDetails["schema"]
        ) || {}
      }
      onSubmit={(x) => {
        save(x);
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
            {schema?.map((row) => {
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
            {isSubmittable && (
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
