import Column from "@/components/templates/TemplateBuilder/engine/Column";
import {TemplateComponent} from "@/components/templates/TemplateBuilder/types";

export default function Row({
  data,
  rowIndex,
}: {
  data: Partial<TemplateComponent>[];
  rowIndex: number;
}) {
  return (
    <div
      className={`grid min-h-[50px] w-full grid-cols-12 justify-center border-[1px] border-slate-200`}
    >
      {data.map((item, idx) => {
        return (
          <Column
            key={`row_${rowIndex}-col_${idx}`}
            rowIndex={rowIndex}
            columnIndex={idx}
            item={item}
            gridSpan={12 / data.length}
          />
        );
      })}
    </div>
  );
}
