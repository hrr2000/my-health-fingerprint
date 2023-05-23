import { type ILink } from "@/types/application";

import {CiFolderOn, CiMedicalCase, CiSettings} from "react-icons/ci";

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
      image: <CiMedicalCase className="h-[30px] w-[30px] shrink-0" />,
      display_text: "patient",
    },
    {
      href: "dashboard/collections",
      image: <CiFolderOn className="h-[30px] w-[30px] shrink-0" />,
      display_text: "collections",
    },
    {
      href: "dashboard/settings",
      image: <CiSettings className="h-[30px] w-[30px] shrink-0" />,
      display_text: "settings",
    },
  ],
};
