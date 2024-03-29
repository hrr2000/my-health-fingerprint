import { type ILink } from "@/types/application";

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
      display_text: "Dashboard",
    },

    {
      entity: "patients",
      href: "dashboard/patients",
      display_text: "Patients",
    },
    {
      entity: "collections",
      href: "dashboard/collections",
      display_text: "Collections",
    },
    {
      entity: "organizations",
      href: "dashboard/organizations",
      display_text: "Organizations",
    },
    {
      entity: "users",
      href: "dashboard/users",
      display_text: "Users",
    },
    {
      entity: "roles",
      href: "dashboard/roles",
      display_text: "Roles",
    },
    {
      entity: "settings",
      href: "dashboard/settings",
      display_text: "Settings",
    },
  ],
};
