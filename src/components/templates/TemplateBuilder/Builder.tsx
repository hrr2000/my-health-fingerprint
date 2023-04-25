import { useTemplateBulider } from "@/contexts/TemplateBuilderContext";
import RowGenerator from "@/components/templates/TemplateBuilder/engine/RowGenerator";
import Row from "@/components/templates/TemplateBuilder/engine/Row";

export default function Builder() {
  const { templateDetails } = useTemplateBulider();

  return (
    <section className="flex border-r-[1px] border-slate-200 p-5 text-black">
      <div
        className={`flex w-full flex-col gap-3 border-[1px] border-slate-200 p-5`}
      >
        {templateDetails.schema.map((item, idx) => {
          return <Row key={`row_${idx}`} rowIndex={idx} data={item} />;
        })}
        <RowGenerator />
      </div>
    </section>
  );
}
