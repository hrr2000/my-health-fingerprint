import { useTemplateBuilder } from "@/contexts/TemplateBuilderContext";
import {api} from "@/utils/api";
import {Field, Form, Formik} from "formik";
import {createCollectionFormSchema} from "@/validation/custom-collection";
import TextInput from "@/components/form/sub/TextInput";
import {
  collectionDetailsInitialValues,
  templateDetailsInitialValues
} from "@/components/templates/TemplateBuilder/engine/RowGenerator";

export default function Toolbar() {
  const { collectionDetails, templateDetails } = useTemplateBuilder();
  const { mutate } = api.collection.create.useMutation();

  return (
    <section className="flex flex-col border-slate-200 p-5 pb-16 text-black">
      <Formik
        initialValues={{
          collection: collectionDetailsInitialValues,
          template: templateDetailsInitialValues
        }}

        onSubmit={(values , formikHelpers) => {
          console.log(values);
          mutate({
            collection: values.collection,
            template: {
              ...values.template,
              schema: JSON.stringify(values.template.schema),
            },
          });
        }}
        validationSchema={createCollectionFormSchema}>
        {({errors}) => {
          console.log(errors);
          return (
            <Form>
              <div className={`w-full py-2 px-4`}>
                <h3 className={`mb-2 border-b-[1px] border-b-slate-200 text-slate-800`}>
                  Template Details
                </h3>
                <div className={`flex flex-col items-center gap-2 py-1 text-sm`}>
                  <TextInput
                    name="collection.name"
                    label="Collection Name"
                    placeholder="Collection Name ..."
                  />
                  <TextInput
                    name="collection.description"
                    label="Description"
                    placeholder="Description ..."
                  />
                  <TextInput
                    name="template.name"
                    label="Template Name"
                    placeholder="Description ..."
                  />
                </div>
              </div>
              <div className={`w-full py-2 px-4`}>
                <h3 className={`mb-2 border-b-[1px] border-b-slate-200 text-slate-800`}>
                  Preferences
                </h3>
                <div className={`flex items-center gap-2 py-1 text-sm`}>
                  <Field
                    id={"printable"}
                    name={"template.printable"}
                    type="checkbox"
                    className={`h-3 w-3`}
                  />
                  <label htmlFor={"is_template_printable"}>Printable</label>
                </div>
                <div className={`flex items-center gap-2 py-1 text-sm`}>
                  <input
                    id={"is_template_printable"}
                    name={"is_template_printable"}
                    type="checkbox"
                    className={`h-3 w-3`}
                  />
                  <label htmlFor={"is_template_printable"}>Patient Profile</label>
                </div>
                <div className={`flex items-center gap-2 py-1 text-sm`}>
                  <input
                    id={"is_template_printable"}
                    name={"is_template_printable"}
                    type="checkbox"
                    className={`h-3 w-3`}
                  />
                  <label htmlFor={"is_template_printable"}>Public</label>
                </div>
              </div>
              <div className={`w-full py-2 px-4`}>
                <button
                  type={"submit"}
                  className="w-full rounded-md bg-black p-2 text-white transition-all disabled:bg-slate-700 hover:bg-purple-800">
                  Save
                </button>
              </div>
            </Form>
            )
        }}
      </Formik>
    </section>
  );
}
