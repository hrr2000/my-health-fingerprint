import { type ILink } from "@/types/application";

import {CiFolderOn, CiMedicalCase, CiSettings, CiViewBoard} from "react-icons/ci";

export const routes: {
  landingPages: ILink[];
  dashboardPages: ILink[];
} = {
  landingPages: [
    {
      href: "/",
      display_text: "Home",
    },
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
      href: "dashboard/home",
      image: <CiViewBoard className="h-[25px] w-[25px] shrink-0" />,
      display_text: "Dashboard",
    },
    {
      href: "dashboard/patient",
      image: <CiMedicalCase className="h-[25px] w-[25px] shrink-0" />,
      display_text: "patient",
    },
    {
      href: "dashboard/collections",
      image: <CiFolderOn className="h-[25px] w-[25px] shrink-0" />,
      display_text: "collections",
    },
    {
      href: "dashboard/settings",
      image: <CiSettings className="h-[25px] w-[25px] shrink-0" />,
      display_text: "settings",
    },
  ],
};
