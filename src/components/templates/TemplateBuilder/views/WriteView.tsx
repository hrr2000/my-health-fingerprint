import {useTemplateBuilder} from "@/components/templates/TemplateBuilder/TemplateBuilderContext";
import TextInput from "@/components/form/sub/TextInput";
import {Formik} from "formik";

function GenericField(props: any) {
  return (
    <TextInput className={`w-full`} placeholder={props.label} label={props.label} name={props.name} type={props.type} />
  );
}

export default function WriteView({schema}: {
  schema: any[][]
}) {
  const {collectionDetails, templateDetails, mutationState} = useTemplateBuilder();
  return (
    <Formik initialValues={{}} onSubmit={() => {}}>
      <div
        className={`grid min-h-[50px] w-full grid-cols-12 justify-center border-[1px] p-10 border-slate-200`}
      >
        {templateDetails.schema.map((row) => {
          return (
            <>
              {row.map((col) => {
                return (
                  <div
                    className={``}
                    style={{
                      gridColumn: `span ${12 / row.length} / span ${12 / row.length}`,
                    }}
                  >
                    {!col.type ? (<></>) : (<GenericField {...col} />) }
                  </div>
                )
              })}
            </>
          );
        })}
      </div>
    </Formik>
  )
}