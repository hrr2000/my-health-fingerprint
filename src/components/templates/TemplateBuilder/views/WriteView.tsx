import { useTemplateBuilder } from "@/components/templates/TemplateBuilder/TemplateBuilderContext";
import TextInput from "@/components/form/sub/TextInput";
import { Form, Formik } from "formik";
import GenericButton from "@/components/common/GenericButton";
import { type TemplateComponent, type TemplateDetails } from "../types";
import { api } from "@/utils/api";
import { Field } from "formik";
import { CiCircleCheck, CiEdit, CiWarning } from "react-icons/ci";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { TypeOf } from "zod";

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
  const { data: template } = api.template.getSchema.useQuery(
    { collectionName: props.collection, templateName: "main" },
    { enabled: !!props.collection }
  );

  if(props.type == "textarea") {
    return (
      <div className="column flex w-full flex-col gap-2">
        <label
          className="font-normal capitalize text-gray-500"
          htmlFor={props.name}
        >
          {props.label}
        </label>
        <Field as={"textarea"} placeholder={props.label} rows="4" name={props.name} className={`text-sm text-black border-gray-300 bg-slate-100 rounded-md`} />
      </div>
    )
  }

  if(props.type == 'select') {
    const options = !props?.is_collection ? parseOptions(props?.options || "") : data?.entries;
    const primaryField = ((): string => {
        for(const row of JSON.parse(template?.schema || "[]")) {
          for(const field of row) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
            if(field?.is_primary) return field?.name || "name";
          }
        }
        return "name";
    })();

    return (
      <div className="column flex w-full flex-col gap-2">
        <label
          className="font-normal capitalize text-gray-500"
          htmlFor={props.name}
        >
          {props.label}
        </label>
        <Field as={"select"} name={props.name} className={`text-sm text-black border-gray-300 bg-slate-100 rounded-md capitalize`}>
          <option value={props.name}>Select {props?.label}</option>
          {options?.map((option: {[k:string]: string}, idx: number) => {
            return (
              <option key={`select-${option?.[primaryField]}-${idx}`} value={option?.[primaryField]}>{option?.[primaryField]}</option>
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
  callback?: any;
}

export default function WriteView({
  collectionName = "",
  patientId = "",
  callback = () => null
}: IProps) {
  const isInCollectionsPage = !patientId;

  const {data, isLoading, isSuccess, error, schema, save, isSubmittable} = (isInCollectionsPage ? CollectionViewController(collectionName) : PatientViewController(collectionName, patientId))

  if(isSuccess) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    if(callback) callback?.();
  }

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
            className={`min-h-[50px] ${
              isInCollectionsPage ? "grid w-full" : "grid w-[800px]"
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
            {isSubmittable && (
              <button
                type="submit"
                className={`my-2 flex justify-center w-max text-md rounded-md border-[1px] border-primary bg-primary p-2 px-4 font-semibold text-white shadow-lg shadow-sky-200 transition hover:border-primary-hover hover:bg-primary-hover`}
              >
                <span>Save Details</span>
              </button>
            )}
          </div>
            <div>
              {error && (
                <div
                  className={`my-4 flex items-center gap-3 rounded-md border-[1px] border-red-500 p-2 text-red-500`}
                >
                  <span>
                    <CiWarning />
                  </span>
                  <span>Unsaved Changes!</span>
                </div>
              )}
              {isLoading && (
                <div
                  className={`my-4 flex items-center gap-3 rounded-md border-[1px] border-yellow-500 p-2 text-yellow-500`}
                >
                  <span>
                    <AiOutlineLoading3Quarters size={1} className="animate-spin" />
                  </span>
                  <span>Saving ...</span>
                </div>
              )}
              {isSuccess && (
                <div
                  className={`my-4 flex items-center gap-3 rounded-md border-[1px] border-green-500 p-2 text-green-500`}
                >
                  <span>
                    <CiCircleCheck />
                  </span>
                  <span>Up to date</span>
                </div>
              )}
            </div>
        </Form>
      )}
    </Formik>
  );
}
