import { useTemplateBuilder } from "@/components/templates/TemplateBuilder/TemplateBuilderContext";
import TextInput from "@/components/form/sub/TextInput";
import { Formik } from "formik";
import GenericButton from "@/components/common/GenericButton";
import { TemplateDetails } from "../types";

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

export default function WriteView({
  schema,
}: {
  schema: TemplateDetails["schema"];
}) {
  const { collectionDetails, templateDetails, mutationState } =
    useTemplateBuilder();
  const sourceSchema = schema || templateDetails.schema;
  return (
    <Formik
      initialValues={{}}
      onSubmit={() => {
        return;
      }}
    >
      <div
        className={`grid min-h-[50px] w-full grid-cols-12 justify-center gap-3 p-10`}
      >
        {sourceSchema.map((row) => {
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
        <GenericButton theme={"primary"} text={"Save Details"} />
      </div>
    </Formik>
  );
}
