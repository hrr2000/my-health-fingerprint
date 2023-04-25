import {IoIosAdd} from "react-icons/io";
import {useContext, useState} from "react";
import {TemplateBuilderContext} from "@/contexts/TemplateBuilderContext";

export default function RowGenerator() {
  const {appendRow} = useContext(TemplateBuilderContext);
  const [formDisplay, setFormDisplay] = useState(false);
  const [columnsCount, setColumnsCount] = useState(0);

  return (
    <div>
      {!formDisplay ? (
        <button
          onClick={() => setFormDisplay(true)}
          className={`border-slate-200 w-full hover:shadow-md duration-300 flex items-center justify-center border-[1px] min-h-[50px]`}>
          <IoIosAdd size={20} />
          <span className={`text-xs`}>
            Add A Row
          </span>
        </button>
      ) : (
        <div className={`p-3 bg-slate-100`}>
          <input
            onChange={(e) => setColumnsCount(parseInt(e.target.value))}
            className="text-sm max-w-xs text-black w-full border-slate-300"
            type="number"
            placeholder="number of columns..."
          />
          <div className={`flex gap-2 text-xs`}>
            <button
              onClick={() => {
                appendRow(columnsCount);
                setFormDisplay(false);
              }}
              className="rounded-md border-[1px] border-black flex max-w-fit bg-black my-2 p-2 px-4 text-white w-full"
            >
            <span>
                + Apply the Row
            </span>
            </button>
            <button
              onClick={() => setFormDisplay(false)}
              className="rounded-md border-[1px] flex max-w-fit border-black bg-white my-2 p-2 px-4 w-full"
            >
            <span>
                Cancel
            </span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}