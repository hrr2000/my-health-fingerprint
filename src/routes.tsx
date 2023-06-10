import { type ILink } from "@/types/application";

import {
  CiFolderOn,
  CiMedicalCase,
  CiSettings,
  CiViewBoard,
  CiGrid41,
  CiHospital1,
  CiUser
} from "react-icons/ci";

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
      //image: <CiViewBoard className="h-[25px] w-[25px] shrink-0" />,
      display_text: "Dashboard",
    },

    {
      href: "dashboard/patient",
      //image: <CiMedicalCase className="h-[25px] w-[25px] shrink-0" />,
      display_text: "patient",
    },
    {
      href: "dashboard/collections",
      //image: <CiFolderOn className="h-[25px] w-[25px] shrink-0" />,
      display_text: "collections",
    },
    {
      href: "dashboard/organizations",
      //image: <CiHospital1 className="h-[25px] w-[25px] shrink-0" />,
      display_text: "Organizations",
    },
    {
      href: "dashboard/users",
      image: <CiUser className="h-[25px] w-[25px] shrink-0" />,
      display_text: "Users",
    },
    {
      href: "dashboard/roles",
      //image: <CiGrid41 className="h-[25px] w-[25px] shrink-0" />,
      display_text: "Roles",
    },
    {
      href: "dashboard/settings",
      //image: <CiSettings className="h-[25px] w-[25px] shrink-0" />,
      display_text: "Settings",
    },
  ],
};
