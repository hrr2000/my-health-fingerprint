import Modal from "react-modal";
import {AiOutlineClose} from "react-icons/ai";
import {useState} from "react";
import GenericButton from "@/components/common/GenericButton";
import {useTemplateBuilder} from "@/contexts/TemplateBuilderContext";

type FieldType = 'text' | 'number' | 'select';

interface IField {
  type: FieldType,
  name: string,
}

const fields: IField[] = [
  {
    type: 'text',
    name: 'Text Field',
  },
  {
    type: 'number',
    name: 'Number Field',
  },
  {
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


  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
  }

  return {
    modalStep,
    setModalStep,
    modalIsOpen,
    setIsOpen,
    openModal,
    afterOpenModal,
    closeModal
  }
}

export type IAddFieldModalController = ReturnType<typeof AddFieldModalController>

export default function AddFieldModal() {

  const [activeField, setActiveField] = useState<FieldType>('text');
  const [fieldObject, setFieldObject] = useState({});
  const {
    modalStep,
    setModalStep,
    modalIsOpen,
    setIsOpen,
    openModal,
    afterOpenModal,
    closeModal
  } = useTemplateBuilder();

  return (
    <Modal
      isOpen={modalIsOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div className={`w-[600px]`}>
        <h2 className={`flex justify-between`}>
          <span className={`font-bold text-slate-800`}>Primary Fields</span>
          <button
            onClick={() => closeModal()}
            className={`text-slate-500 cursor-pointer`}>
            <AiOutlineClose size={15} />
          </button>
        </h2>
        <div className={`my-3 grid grid-cols-3 gap-3 text-sm text-slate-600`}>
          {fields.map((field, idx) => {
            return (
              <div key={`primary_field-${idx}`}
                   className={`border-2 w-fit p-3 duration-300 hover:border-black hover:text-black font-bold ${field.type == activeField ? "border-black text-black" : "text-slate-500"} cursor-pointer w-full`}
                   onClick={() => setActiveField(field.type)}
              >
                {field.name}
              </div>
            )
          })}
        </div>
        <div className={`flex justify-between`}>
          {modalStep > 0 ? (
            <GenericButton
              theme={'secondary'}
              text={'Back'}
              onClick={() => {
                setModalStep(step => Math.min(2, step - 1));
              }}
            />
          ) : (
            <span></span>
          )}
          <GenericButton
            theme={'primary'}
            text={'Next'}
            onClick={() => {
              setModalStep(step => Math.min(2, step + 1));
            }}
          />
        </div>
      </div>
    </Modal>
  )
}