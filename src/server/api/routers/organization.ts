import { OrganizationModel, UserModel } from "@/server/models";
import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";

import { TRPCError } from "@trpc/server";

export const organizationRouter = createTRPCRouter({
  addRole: protectedProcedure
    .input(
      z.object({
        org_name: z.string(),
        role_name: z.string().min(5).max(25),
      })
    )
    .mutation(async ({ input: { org_name, role_name } }) => {
      const isUpdated = await OrganizationModel.updateOne(
        { name: org_name },
        {
          $push: {
            roles: {
              name: role_name,
              permissions: [],
            },
          },
        }
      );
      if (!isUpdated.acknowledged) {
        throw new TRPCError({
          message: `Failed to add role to organization: ${org_name}`,
          code: "BAD_REQUEST",
        });
      }
    }),

  getRoleDetails: protectedProcedure
    .input(z.object({ org_name: z.string() }))
    .query(async ({ input: { org_name } }) => {
      const doc = await OrganizationModel.find(
        { name: org_name },
        { "roles.name": true, "roles.permissions": true }
      );
      if (!doc) {
        throw new TRPCError({
          message: `no records found regarding org name : ${org_name}`,
          code: "BAD_REQUEST",
        });
      }

      return doc;
    }),

  listRoles: protectedProcedure
    .input(z.object({ org_name: z.string() }))
    .query(async ({ input: { org_name } }) => {
      const doc = await OrganizationModel.findOne(
        { name: org_name },
        { "roles.name": true, "roles.permissions": true }
      );

      if (!doc) {
        throw new TRPCError({
          message: `no records found regarding org name : ${org_name}`,
          code: "BAD_REQUEST",
        });
      }

      return { roles: doc.roles };
    }),

  updateRole: protectedProcedure
    .input(
      z.object({
        orgName: z.string(),
        name: z.string(),
        data: z.object({
          name: z.string(),
          permissions: z.array(z.string()),
        }),
      })
    )
    .mutation(async ({ input: { name, orgName, data } }) => {
      const isUpdated = await OrganizationModel.updateOne(
        { name: orgName, "roles.name": name },
        {
          $set: {
            "roles.$.name": data.name,
            "roles.$.permissions": data.permissions,
          },
        }
      );

      if (!isUpdated.acknowledged) {
        throw new TRPCError({
          message: `Failed to update role with name :  ${name}`,
          code: "BAD_REQUEST",
        });
      }
    }),
  deleteRole: protectedProcedure
    .input(
      z.object({
        orgName: z.string(),
        name: z.string(),
      })
    )
    .mutation(async ({ input: { name, orgName } }) => {
      const isDeleted = await OrganizationModel.updateOne(
        { name: orgName },
        {
          $pull: {
            roles: { name },
          },
        }
      );
      if (!isDeleted.acknowledged) {
        throw new TRPCError({
          message: `Failed to delete role with name :  ${name}`,
          code: "BAD_REQUEST",
        });
      }
    }),

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
