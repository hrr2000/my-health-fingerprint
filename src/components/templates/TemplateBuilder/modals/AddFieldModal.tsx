import Modal from "react-modal";
import {AiOutlineClose, AiOutlineUnorderedList} from "react-icons/ai";
import {ChangeEvent, ReactNode, useState} from "react";
import GenericButton from "@/components/common/GenericButton";
import {useTemplateBuilder} from "@/contexts/TemplateBuilderContext";
import {GoTextSize} from "react-icons/go";
import {TiSortNumerically} from "react-icons/ti";

type FieldType = 'text' | 'number' | 'select';

interface IField {
  icon?: ReactNode,
  type: FieldType,
  name: string,
}

export const fields: IField[] = [
  {
    icon: <GoTextSize size={25} />,
    type: 'text',
    name: 'Text Field',
  },
  {
    icon: <TiSortNumerically size={25} />,
    type: 'number',
    name: 'Number Field',
  },
  {
    icon: <AiOutlineUnorderedList size={25} />,
    type: 'select',
    name: 'Select Field',
  },
]


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

export const AddFieldModalController = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalStep, setModalStep] = useState(0);
  const [fieldObject, setFieldObject] = useState({});
  const [cell, setCell] = useState({
    rowIndex: 0,
    columnIndex: 0,
  })


  function openModal(rowIndex: number, columnIndex: number) {
    setCell({
      rowIndex,
      columnIndex
    })
    setIsOpen(true);
    setFieldObject({});
  }

  function afterOpenModal() {
  }

  function closeModal() {
    setModalStep(0);
    setIsOpen(false);
  }

  return {
    fieldObject,
    modalStep,
    modalIsOpen,
    cell,
    setCell,
    setFieldObject,
    setModalStep,
    setIsOpen,
    openModal,
    afterOpenModal,
    closeModal
  }
}

export type IAddFieldModalController = ReturnType<typeof AddFieldModalController>

function ChooseFieldStep({setFieldObject}: any) {
  const [activeField, setActiveField] = useState<FieldType | 'None'>('None');
  return (
    <div className={`w-[600px]`}>
      <div className={`my-3 grid grid-cols-3 gap-3 text-sm text-slate-600`}>
        {fields.map((field, idx) => {
          return (
            <div key={`primary_field-${idx}`}
                 className={`border-2 flex items-center justify-start gap-4 w-fit p-3 duration-300 hover:border-black hover:text-black font-bold ${field.type == activeField ? "border-black text-black" : "text-slate-500"} cursor-pointer w-full`}
                 onClick={() => {
                   setActiveField(field.type)
                   setFieldObject((obj: any) => ({...obj, type: field.type}))
                 }}
            >
              <span>{field.icon}</span>
              <span>{field.name}</span>
            </div>
          )
        })}
      </div>
    </div>
  );
}

function PreferencesStep({setFieldObject}: any) {
  const handleChange = (key: string) => {
    return (e: ChangeEvent<HTMLInputElement>) => setFieldObject((obj: any) => ({...obj, [key]: e.target.value}))
  }

  return (
    <div className={`w-[600px]`}>
        <form className={`grid grid-cols-2 gap-3 my-5`}>
          <input
            type="text"
            placeholder="Label"
            name="label"
            onChange={handleChange('label')}
          />
          <input
            type="text"
            placeholder="Name"
            name="name"
            onChange={handleChange('name')}
          />
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
    closeModal
  } = useTemplateBuilder();

  return (
    <Modal
      isOpen={modalIsOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
    >
      <h2 className={`flex justify-between`}>
        <span className={`font-bold text-slate-800`}>{steps[modalStep]?.title}</span>
        <button
          onClick={() => closeModal()}
          className={`text-slate-500 cursor-pointer`}>
          <AiOutlineClose size={15} />
        </button>
      </h2>

      {modalStep === 0 && <ChooseFieldStep setFieldObject={setFieldObject} />}
      {modalStep === 1 && <PreferencesStep setFieldObject={setFieldObject} />}

      <div className={`flex justify-between`}>
        {modalStep > 0 ? (
          <GenericButton
            theme={'secondary'}
            text={'Back'}
            onClick={() => {
              setModalStep(step => Math.min(steps.length - 1, step - 1));
            }}
          />
        ) : (
          <span></span>
        )}
        {modalStep == steps.length - 1 ? (
          <GenericButton
            theme={'primary'}
            text={'Apply'}
            onClick={() => {
              const schema = templateDetails.schema;
              if(schema?.[cell.rowIndex]?.[cell.columnIndex]) {
                // @ts-ignore
                schema[cell.rowIndex][cell.columnIndex] = fieldObject;
              }
              setTemplateDetails?.((obj) => ({
                ...obj,
                schema
              }))
              closeModal();
            }}
          />
        ) : (
          <GenericButton
            theme={'primary'}
            text={'Next'}
            onClick={() => {
              setModalStep(step => Math.min(steps.length - 1, step + 1));
            }}
          />
        )}
      </div>
    </Modal>
  )
}