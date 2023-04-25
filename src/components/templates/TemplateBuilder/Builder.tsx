import {useContext} from "react";
import {TemplateBuilderContext} from "@/contexts/TemplateBuilderContext";
import RowGenerator from "@/components/templates/TemplateBuilder/engine/RowGenerator";
import Row from "@/components/templates/TemplateBuilder/engine/Row";

export default function Builder() {
  const {templateDetails} = useContext(TemplateBuilderContext);

  return (
      <section className="flex p-5 border-r-[1px] border-slate-200 text-black">
        <div className={`w-full border-slate-200 border-[1px] p-5 gap-3 flex flex-col`}>
          {templateDetails.schema.map((item, idx) => {
            return (
              <Row key={`row_${idx}`} rowIndex={idx} data={item} />
            )
          })}
          <RowGenerator />
        </div>
    </section>
  )
}