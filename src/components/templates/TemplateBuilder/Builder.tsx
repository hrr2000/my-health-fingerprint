import {useContext} from "react";
import {TemplateBuilderContext} from "@/contexts/TemplateBuilderContext";
import {MdModeEditOutline} from "react-icons/md";
import {IoIosAdd} from "react-icons/io";

export default function Builder() {
  const {templateDetails} = useContext(TemplateBuilderContext);

  return (
      <section className="flex p-5 border-r-[1px] border-slate-200 text-black">
        <div className={`w-full border-slate-200 border-[1px] p-5 gap-3 flex flex-col`}>
          <div className={`border-slate-200 w-full grid grid-cols-12 justify-center border-[1px] min-h-[50px]`}>
            <div className={`border-slate-200 border-[1px] col-span-4`}>
              <button className={`border-slate-200 w-full hover:shadow-md duration-300 flex items-center justify-center border-[1px] min-h-[50px] gap-2`}>
                  <span className={`text-xs`}>
                    Patient Field
                  </span>
                <MdModeEditOutline size={15} />
              </button>
            </div>
            <div className={`border-slate-200 border-[1px] col-span-4`}>
              <button className={`border-slate-200 w-full hover:shadow-md duration-300 flex items-center justify-center border-[1px] min-h-[50px]`}>
                <IoIosAdd size={20} />
                <span className={`text-xs`}>
                    Add A Field
                  </span>
              </button>
            </div>
            <div className={`border-slate-200 border-[1px] col-span-4`}>
              <button className={`border-slate-200 w-full hover:shadow-md duration-300 flex items-center justify-center border-[1px] min-h-[50px]`}>
                <IoIosAdd size={20} />
                <span className={`text-xs`}>
                    Add A Field
                  </span>
              </button>
            </div>
          </div>
          <div>
            <button className={`border-slate-200 w-full hover:shadow-md duration-300 flex items-center justify-center border-[1px] min-h-[50px]`}>
              <IoIosAdd size={20} />
              <span className={`text-xs`}>
                Add A Row
              </span>
            </button>
            <div className={`p-3 bg-slate-100`}>
              <input
                className="text-sm max-w-xs text-black w-full border-slate-300"
                type="text"
                placeholder="number of columns..."
              />
              <button
                className="rounded-md flex w-fit bg-black my-2 p-2 px-4 text-white w-full"
              >
                <span className={`text-xs`}>
                  + Apply the Row
              </span>
              </button>
            </div>
          </div>
        </div>
    </section>
  )
}