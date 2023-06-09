import Modal from "react-modal";
import { AiOutlineClose, AiOutlineUnorderedList } from "react-icons/ai";
import {
  type ChangeEvent,
  type ReactNode,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import GenericButton from "@/components/common/GenericButton";
import { GoTextSize } from "react-icons/go";
import { TiSortNumerically } from "react-icons/ti";
import { useTemplateBuilder } from "@/components/templates/TemplateBuilder/TemplateBuilderContext";
import { type TemplateComponent } from "../types";
import { CiCalendarDate } from "react-icons/ci";

type FieldType = "text" | "number" | "select" | "date";

interface IField {
  icon?: ReactNode;
  type: FieldType;
  name: string;
}

export const fields: IField[] = [
  {
    icon: <GoTextSize size={25} />,
    type: "text",
    name: "Text Field",
  },
  {
    icon: <TiSortNumerically size={25} />,
    type: "number",
    name: "Number Field",
  },
  {
    icon: <CiCalendarDate size={25} />,
    type: "date",
    name: "Date Field",
  },
  {
    icon: <AiOutlineUnorderedList size={25} />,
    type: "select",
    name: "Select Field", 
  },
];

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export default function AddFieldModal() {
  const {
    fieldObject,
    modalStep,
    modalIsOpen,
    templateDetails,
    setTemplateDetails,
    cell,
    setModalStep,
    setFieldObject,
    afterOpenModal,
    closeModal,
  } = useTemplateBuilder();

  return (
    <Modal
      isOpen={modalIsOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
    >
      <header className={`flex justify-between`}>
        <span className={`font-bold text-slate-800`}>
          {steps[modalStep]?.title}
        </span>
        <button
          onClick={() => closeModal()}
          className={`cursor-pointer text-slate-500`}
        >
          <AiOutlineClose size={15} />
        </button>
      </header>

      {modalStep === 0 && <ChooseFieldStep setFieldObject={setFieldObject} />}
      {modalStep === 1 && <PreferencesStep setFieldObject={setFieldObject} />}

      <div className={`flex justify-between`}>
        {modalStep > 0 ? (
          <GenericButton
            theme={"secondary"}
            text={"Back"}
            onClick={() => {
              setModalStep((step) => Math.min(steps.length - 1, step - 1));
            }}
          />
        ) : (
          <span></span>
        )}
        {modalStep == steps.length - 1 ? (
          <GenericButton
            theme={"primary"}
            text={"Apply"}
            onClick={() => {
              const schema = templateDetails.schema;
              const rowVal = schema?.[cell.rowIndex];
              if (!rowVal) {
                return;
              }
              (rowVal as Partial<TemplateComponent>[])[cell.columnIndex] =
                fieldObject;
              setTemplateDetails?.((obj) => ({
                ...obj,
                schema,
              }));
              closeModal();
            }}
          />
        ) : (
          <GenericButton
            theme={"primary"}
            text={"Next"}
            onClick={() => {
              setModalStep((step) => Math.min(steps.length - 1, step + 1));
            }}
          />
        )}
      </div>
    </Modal>
  );
}

function ChooseFieldStep({
  setFieldObject,
}: {
  setFieldObject: Dispatch<SetStateAction<object>>;
}) {
  const [activeField, setActiveField] = useState<FieldType | "None">("None");
  return (
    <div className={`w-[600px]`}>
      <div className={`my-3 grid grid-cols-3 gap-3 text-sm text-slate-600`}>
        {fields.map((field, idx) => {
          return (
            <div
              key={`primary_field-${idx}`}
              className={`flex w-fit items-center justify-start gap-4 border-2 p-3 font-bold duration-300 hover:border-black hover:text-black ${
                field.type == activeField
                  ? "border-black text-black"
                  : "text-slate-500"
              } w-full cursor-pointer`}
              onClick={() => {
                setActiveField(field.type);
                setFieldObject((obj: object) => ({ ...obj, type: field.type }));
              }}
            >
              <span>{field.icon}</span>
              <span>{field.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PreferencesStep({
  setFieldObject,
}: {
  setFieldObject: Dispatch<SetStateAction<object>>;
}) {
  const { fieldObject } = useTemplateBuilder();
  const handleChange = (key: string) => {
    return (e: ChangeEvent<HTMLInputElement>) =>
      void setFieldObject((obj: object) => ({ ...obj, [key]: e.target.value }));
  };

  return (
    <div className={`w-[600px]`}>
      <form className={`my-5 grid grid-cols-2 gap-3`}>
        <input
          type="text"
          placeholder="Label"
          name="label"
          onChange={handleChange("label")}
        />
        <input
          type="text"
          placeholder="Name"
          name="name"
          onChange={handleChange("name")}
        />
        {fieldObject?.type === "select" && (
            <input
              type="text"
              placeholder="Collection"
              name="collection"
              onChange={handleChange("collection")}
            />
          )
        }
      </form>
    </div>
  );
}

const steps = [
  {
    title: "Choose Field",
  },
  {
    title: "Preferences",
  },
];
