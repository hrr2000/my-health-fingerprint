import {IoIosAdd} from "react-icons/io";
import {type TemplateComponent, useTemplateBuilder} from "@/contexts/TemplateBuilderContext";
import {fields} from "@/components/templates/TemplateBuilder/modals/AddFieldModal";

export default function Column({rowIndex, columnIndex, gridSpan}: {rowIndex: number; columnIndex: number; gridSpan: number; item: Partial<TemplateComponent>}) {
  const {openModal, templateDetails} = useTemplateBuilder();

  // @ts-ignore
  const data: any = templateDetails.schema[rowIndex][columnIndex];
  const isFilled = data && Object.keys(data).length;
  console.log(fields);

  return (
    <div  className={`border-slate-200 border-[1px]`} style={{
      gridColumn: `span ${gridSpan} / span ${gridSpan}`
    }}>
      <button
        onClick={() => {
          openModal(rowIndex, columnIndex);
        }}
        className={`gap-2 capitalize w-full hover:shadow-md duration-300 flex items-center justify-center min-h-[50px] ${isFilled ? "border-2 border-slate-700 font-bold" : "border-[1px] border-slate-200"}`}>

        {isFilled ? (
          <>
            <span className={`scale-[.8] mr-[-5px]`}>
              {fields?.find((field) => field.type === data.type)?.icon}
            </span>
            <span className={`text-xs`}>
              {data?.label}
            </span>
          </>
        ) : (
          <>
            <IoIosAdd size={20} />
            <span className={`text-xs`}>
            Add A Field
          </span>
          </>
        )}
      </button>
    </div>
  )
}