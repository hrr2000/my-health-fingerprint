import {IoIosAdd} from "react-icons/io";
import {type TemplateComponent, useTemplateBuilder} from "@/contexts/TemplateBuilderContext";

export default function Column({rowIndex, columnIndex, gridSpan}: {rowIndex: number; columnIndex: number; gridSpan: number; item: Partial<TemplateComponent>}) {
  const {openModal} = useTemplateBuilder();

  return (
    <div  className={`border-slate-200 border-[1px]`} style={{
      gridColumn: `span ${gridSpan} / span ${gridSpan}`
    }}>
      <button
        onClick={() => {
          openModal();
        }}
        className={`border-slate-200 w-full hover:shadow-md duration-300 flex items-center justify-center border-[1px] min-h-[50px]`}>
        <IoIosAdd size={20} />
        <span className={`text-xs`}>
          Add A Field
        </span>
      </button>
    </div>
  )
}