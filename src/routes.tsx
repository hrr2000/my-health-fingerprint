import { type ILink } from "@/types/application";

import { FaHandHoldingMedical, FaFolder } from "react-icons/fa";
import { FiTool } from "react-icons/fi";

export const routes: {
  landingPages: ILink[];
  dashboardPages: ILink[];
} = {
  landingPages: [
    {
      href: "features",
      display_text: "Features",
    },
    {
      href: "how-to-apply",
      display_text: "How to Apply?",
    },
    {
      href: "vision",
      display_text: "Vision",
    },
  ],
  dashboardPages: [
    {
      href: "dashboard/patient",
      image: <FaHandHoldingMedical className="h-[30px] w-[30px] shrink-0" />,
      display_text: "patient",
    },
    {
      href: "dashboard/collections",
      image: <FaFolder className="h-[30px] w-[30px] shrink-0" />,
      display_text: "collections",
    },
    {
      href: "dashboard/settings",
      image: <FiTool className="h-[30px] w-[30px] shrink-0" />,
      display_text: "settings",
    },
  ],
};
