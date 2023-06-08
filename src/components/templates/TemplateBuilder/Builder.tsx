import RowGenerator from "@/components/templates/TemplateBuilder/engine/RowGenerator";
import Row from "@/components/templates/TemplateBuilder/engine/Row";
import { useTemplateBuilder } from "@/components/templates/TemplateBuilder/TemplateBuilderContext";
import { type TemplateComponent } from "./types";

export default function Builder() {
  const {
    templateDetails: { schema },
  } = useTemplateBuilder();
  return (
    <section className="flex p-5 pb-16 text-black">
      <div className={`flex w-full flex-col gap-3 p-5`}>
        {(schema as Partial<TemplateComponent>[][]).map((item, idx) => {
          return <Row key={`row_${idx}`} rowIndex={idx} data={item} />;
        })}
        <RowGenerator />
      </div>
    </section>
  );
}
