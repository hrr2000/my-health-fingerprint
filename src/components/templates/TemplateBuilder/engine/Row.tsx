import {type TemplateComponent} from "@/contexts/TemplateBuilderContext";
import Column from "@/components/templates/TemplateBuilder/engine/Column";

export default function Row({data, rowIndex}: {data: Partial<TemplateComponent>[]; rowIndex: number}) {
  return (
    <div className={`border-slate-200 w-full grid grid-cols-12 justify-center border-[1px] min-h-[50px]`}>
      {data.map((item, idx) => {
        return (
          <Column
            key={`row_${rowIndex}-col_${idx}`}
            rowIndex={rowIndex}
            columnIndex={idx}
            item={item}
            gridSpan={12 / data.length}
          />
        )
      })}
    </div>
  )
}