import {useContext} from "react";
import {TemplateBuilderContext} from "@/contexts/TemplateBuilderContext";

export default function Toolbar() {
  const {collectionDetails} = useContext(TemplateBuilderContext);

  return (
    <section className="flex flex-col border-slate-200 text-black p-5">
      <div className={`w-full py-2 px-4`}>
        <h3 className={`text-slate-800 mb-2 border-b-slate-200 border-b-[1px]`}>Template Details</h3>
        <div className={`flex flex-col gap-2 text-sm items-center py-1`}>
          <select className="text-sm text-black w-full border-slate-300">
            <option>select icon</option>
          </select>
          <input
            className="text-sm text-black w-full border-slate-300"
            type="text"
            placeholder="name..."
          />
          <textarea
            className="text-sm text-black w-full border-slate-300"
            rows={3}
            placeholder="short description..."
          />
        </div>
      </div>
      <div className={`w-full py-2 px-4`}>
        <h3 className={`text-slate-800 mb-2 border-b-slate-200 border-b-[1px]`}>Preferences</h3>
        <div className={`flex gap-2 text-sm items-center py-1`}>
          <input id={'is_template_printable'} name={'is_template_printable'} type="checkbox" className={`w-3 h-3`} />
          <label htmlFor={'is_template_printable'} >Printable</label>
        </div>
        <div className={`flex gap-2 text-sm items-center py-1`}>
          <input id={'is_template_printable'} name={'is_template_printable'} type="checkbox" className={`w-3 h-3`} />
          <label htmlFor={'is_template_printable'} >Patient Profile</label>
        </div>
        <div className={`flex gap-2 text-sm items-center py-1`}>
          <input id={'is_template_printable'} name={'is_template_printable'} type="checkbox" className={`w-3 h-3`} />
          <label htmlFor={'is_template_printable'} >Public</label>
        </div>
      </div>
      <div className={`w-full py-2 px-4`}>
        <button
          className="rounded-md bg-black p-2 text-white disabled:bg-slate-700 w-full"
        >
          Save
        </button>
      </div>
    </section>
  )
}