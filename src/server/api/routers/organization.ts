import { UserModel } from "@/server/models";
import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";

import { TRPCError } from "@trpc/server";

export const organizationRouter = createTRPCRouter({
  find: publicProcedure
    .input(z.object({ nationalId: z.string() }))
    .query(async ({ input: { nationalId } }) => {
      const user = await UserModel.findOne(
        {
          nationalId,
        },
        { last_name: true, first_name: true, organizations: true }
      );

      if (!user) {
        throw new TRPCError({
          message: "no national information",
          code: "NOT_FOUND",
        });
      }

      const userAccounts = user?.organizations.map(
        ({ jobTitle, picture, org_id, org_name }) => ({
          jobTitle,
          picture,
          org_id,
          org_name,
        })
      );

      return {
        firstName: user?.first_name,
        lastName: user?.last_name,
        orgs: userAccounts,
      };
    }),
});
