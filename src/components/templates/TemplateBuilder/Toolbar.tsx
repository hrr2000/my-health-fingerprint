import { Field, Form, Formik } from "formik";
import { createCollectionFormSchema } from "@/validation/custom-collection";
import TextInput from "@/components/form/sub/TextInput";
import { useTemplateBuilder } from "@/components/templates/TemplateBuilder/TemplateBuilderContext";
import ToolbarController from "@/components/templates/TemplateBuilder/controllers/ToolbarController";
import { useEffect } from "react";
import {CiCircleCheck, CiEdit, CiWarning} from "react-icons/ci";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { type CollectionDetails, type TemplateDetails } from "./types";
import {BiEdit} from "react-icons/bi";
import GenericButton from "@/components/common/GenericButton";
import {api} from "@/utils/api";
import {parseTemplate} from "@/components/templates/TemplateBuilder/controllers/BuilderController";

const ToolbarForm = ({
  values,
  toolbarController
}: {
  values: {
    collection: CollectionDetails;
    template: TemplateDetails;
  };
  toolbarController: ReturnType<typeof ToolbarController>
}) => {

  const { setCollectionDetails, setTemplateDetails, mutationState, setBuilderView, builderView } =
    useTemplateBuilder();

  const { isSaving, isSaved, savingError } = toolbarController;

  useEffect(() => {
    setCollectionDetails((prevCollection) => ({
      ...prevCollection,
      ...values.collection,
    }));
    setTemplateDetails((prevTemplate) => ({
      ...prevTemplate,
      ...values.template,
    }));
  }, [values, setCollectionDetails, setTemplateDetails]);

  return (
    <Form>
      <div className={`w-full py-2 px-4`}>
        <button type={'button'} onClick={() => {
          setBuilderView(state => !state);
        }} className={`flex w-full mb-3 border-[1px] border-primary gap-1 items-center justify-center text-highlight p-2`}>
          <span>
            <BiEdit />
          </span>
          <span>
            {!builderView ? "Enable builder mode" : "Disable builder mode"}
          </span>
        </button>
        {savingError && (
          <div
            className={`my-4 flex items-center gap-3 rounded-md border-[1px] border-red-500 p-2 text-red-500`}
          >
            <span>
              <CiWarning />
            </span>
            <span>Unsaved Changes!</span>
          </div>
        )}
        {isSaving && (
          <div
            className={`my-4 flex items-center gap-3 rounded-md border-[1px] border-yellow-500 p-2 text-yellow-500`}
          >
            <span>
              <AiOutlineLoading3Quarters size={1} className="animate-spin" />
            </span>
            <span>Saving ...</span>
          </div>
        )}
        {isSaved && (
          <div
            className={`my-4 flex items-center gap-3 rounded-md border-[1px] border-green-500 p-2 text-green-500`}
          >
            <span>
              <CiCircleCheck />
            </span>
            <span>Up to date</span>
          </div>
        )}
        <h3 className={`mb-2 border-b-[1px] border-b-slate-200 text-slate-800`}>
          Template Details
        </h3>
        <div className={`flex flex-col items-center gap-2 py-1 text-sm`}>
          <TextInput
            name="collection.name"
            disabled={mutationState.current == "update"}
            label="Collection Name"
            placeholder="Collection Name ..."
          />
          <TextInput
            name="collection.description"
            label="Description"
            placeholder="Description ..."
          />
          <div className="column flex flex-col gap-2 w-full">
            <label className="font-normal capitalize text-gray-500" htmlFor={"template.name"}>
              Template Name
            </label>
            <Field
              as={"select"}
              name={"template.name"}
              className={`text-sm`}
            >
              {!values.collection.isPatientSpecific && (
                <option value={"main"}>main</option>
              )}
              {values.collection.isPatientProfile && mutationState.current != "create" && (
                <option value={"patient"}>patient</option>
              )}
            </Field>
          </div>
        </div>
      </div>
      <div className={`w-full py-2 px-4`}>
        <h3 className={`mb-2 border-b-[1px] border-b-slate-200 text-slate-800`}>
          Preferences
        </h3>
        <div className={`flex items-center gap-2 py-1 text-sm`}>
          <Field
            id={"isPrintable"}
            name={"template.isPrintable"}
            type="checkbox"
            className={`h-3 w-3`}
          />
          <label htmlFor={"isPrintable"}>Printable</label>
        </div>
        <div className={`flex items-center gap-2 py-1 text-sm`}>
          <Field
            id={"isPatientProfile"}
            name={"collection.isPatientProfile"}
            type="checkbox"
            className={`h-3 w-3`}
          />
          <label htmlFor={"isPatientProfile"}>Patient Profile</label>
        </div>
        <div className={`flex items-center gap-2 py-1 text-sm`}>
          <Field
            id={"isPatientSpecific"}
            name={"collection.isPatientSpecific"}
            type="checkbox"
            className={`h-3 w-3`}
          />
          <label htmlFor={"isPatientSpecific"}>Patient Specific</label>
        </div>
        <div className={`flex items-center gap-2 py-1 text-sm`}>
          <Field
            id={"isPublic"}
            name={"collection.isPublic"}
            type="checkbox"
            className={`h-3 w-3`}
          />
          <label htmlFor={"isPublic"}>Public</label>
        </div>
      </div>
      <div className={`w-full py-2 px-4`}>
        <GenericButton theme={'primary'} text={'Save'} full />
      </div>
    </Form>
  );
};

export default function Toolbar() {
  const { collectionDetails, templateDetails, setTemplateDetails } = useTemplateBuilder();
  const toolbarController = ToolbarController();
  const { saveData } = toolbarController;


  return (
    <section className="flex flex-col border-slate-200 p-5 pb-16 text-black bg-white">
      <Formik
        initialValues={{
          collection: collectionDetails,
          template: templateDetails,
        }}
        onSubmit={(values) => {
          console.log(values);
          saveData({
            collection: {
              ...values.collection,
            },
            template: {
              ...values.template,
              schema: values.template.schema,
            },
          });
        }}
        enableReinitialize
        validationSchema={createCollectionFormSchema}
      >
        {({ values }) => {
          const { data } = api.template.findOne.useQuery({
            collectionName: values.collection.name,
            templateName: values.template.name
          }, {
            enabled: !!values.template.name
          })

          useEffect(() => {
            if(!data) return;
            setTemplateDetails(parseTemplate(data.template));
          }, [data]);

          return <ToolbarForm toolbarController={toolbarController} values={values} />;
        }}
      </Formik>
    </section>
  );
}
