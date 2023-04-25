import { useTemplateBuilder } from "@/contexts/TemplateBuilderContext";

export default function Toolbar() {
  const { collectionDetails } = useTemplateBuilder();

  return (
    <section className="flex flex-col border-slate-200 p-5 text-black">
      <div className={`w-full py-2 px-4`}>
        <h3 className={`mb-2 border-b-[1px] border-b-slate-200 text-slate-800`}>
          Template Details
        </h3>
        <div className={`flex flex-col items-center gap-2 py-1 text-sm`}>
          <select className="w-full border-slate-300 text-sm text-black">
            <option>select icon</option>
          </select>
          <input
            className="w-full border-slate-300 text-sm text-black"
            type="text"
            placeholder="name..."
          />
          <textarea
            className="w-full border-slate-300 text-sm text-black"
            rows={3}
            placeholder="short description..."
          />
        </div>
      </div>
      <div className={`w-full py-2 px-4`}>
        <h3 className={`mb-2 border-b-[1px] border-b-slate-200 text-slate-800`}>
          Preferences
        </h3>
        <div className={`flex items-center gap-2 py-1 text-sm`}>
          <input
            id={"is_template_printable"}
            name={"is_template_printable"}
            type="checkbox"
            className={`h-3 w-3`}
          />
          <label htmlFor={"is_template_printable"}>Printable</label>
        </div>
        <div className={`flex items-center gap-2 py-1 text-sm`}>
          <input
            id={"is_template_printable"}
            name={"is_template_printable"}
            type="checkbox"
            className={`h-3 w-3`}
          />
          <label htmlFor={"is_template_printable"}>Patient Profile</label>
        </div>
        <div className={`flex items-center gap-2 py-1 text-sm`}>
          <input
            id={"is_template_printable"}
            name={"is_template_printable"}
            type="checkbox"
            className={`h-3 w-3`}
          />
          <label htmlFor={"is_template_printable"}>Public</label>
        </div>
      </div>
      <div className={`w-full py-2 px-4`}>
        <button className="w-full rounded-md bg-black p-2 text-white disabled:bg-slate-700">
          Save
        </button>
      </div>
    </section>
  );
}
