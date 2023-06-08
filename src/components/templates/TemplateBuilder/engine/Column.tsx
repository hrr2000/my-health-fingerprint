import { IoIosAdd } from "react-icons/io";

import { fields } from "@/components/templates/TemplateBuilder/modals/AddFieldModal";
import { type TemplateComponent } from "@/components/templates/TemplateBuilder/types";
import { useTemplateBuilder } from "@/components/templates/TemplateBuilder/TemplateBuilderContext";

export default function Column({
  rowIndex,
  columnIndex,
  gridSpan,
}: {
  rowIndex: number;
  columnIndex: number;
  gridSpan: number;
  item: Partial<TemplateComponent>;
}) {
  const { openModal, templateDetails } = useTemplateBuilder();

  const data = templateDetails.schema?.[rowIndex]?.[
    columnIndex
  ] as Partial<TemplateComponent>;
  const isFilled = !!data && Object.keys(data).length;

  return (
    <div
      className={`border-[1px] border-slate-200`}
      style={{
        gridColumn: `span ${gridSpan} / span ${gridSpan}`,
      }}
    >
      <button
        onClick={() => {
          openModal(rowIndex, columnIndex);
        }}
        className={`flex min-h-[50px] w-full items-center justify-center gap-2 capitalize duration-300 hover:shadow-md ${
          isFilled
            ? "border-2 border-dark font-bold text-primary"
            : "border-[1px] border-slate-200"
        }`}
      >
        {isFilled ? (
          <>
            <span className={`mr-[-5px] scale-[.8]`}>
              {fields?.find((field) => field.type === data.type)?.icon}
            </span>
            <span className={`text-xs`}>{data?.label}</span>
          </>
        ) : (
          <>
            <IoIosAdd size={20} />
            <span className={`text-xs`}>Add A Field</span>
          </>
        )}
      </button>
    </div>
  );
}
