import { IoIosAdd } from "react-icons/io";
import { useState, useRef, useEffect } from "react";
import { useTemplateBuilder } from "@/components/templates/TemplateBuilder/TemplateBuilderContext";

export default function RowGenerator() {
  const { appendRow } = useTemplateBuilder();
  const [formDisplay, setFormDisplay] = useState(false);
  const [columnsCount, setColumnsCount] = useState(0);

  return (
    <div>
      {!formDisplay ? (
        <button
          onClick={() => setFormDisplay(true)}
          className={`flex min-h-[50px] w-full items-center justify-center duration-300 hover:shadow-md`}
        >
          <IoIosAdd size={20} />
          <span className={`text-xs`}>Add A Row</span>
        </button>
      ) : (
        <div className={`bg-slate-100 p-3`}>
          <input
            onChange={(e) => setColumnsCount(parseInt(e.target.value))}
            className="w-full max-w-xs border-slate-300 text-sm text-black"
            type="number"
            min={0}
            max={5}
            placeholder="number of columns..."
          />
          <div className={`flex gap-2 text-xs`}>
            <button
              onClick={() => {
                appendRow(columnsCount);
                setFormDisplay(false);
              }}
              className="my-2 flex w-full max-w-fit rounded-md bg-black p-2 px-4 text-white"
            >
              <span>+ Apply the Row</span>
            </button>
            <button
              onClick={() => setFormDisplay(false)}
              className="my-2 flex w-full max-w-fit rounded-md bg-white p-2 px-4"
            >
              <span>Cancel</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
