import { UserModel } from "@/server/models";
import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";
import { createUserSchema } from "@/validation/user";
import { supabase } from "@/server/db";
import { TRPCError } from "@trpc/server";
export const userRouter = createTRPCRouter({
  createOne: publicProcedure
    .input(createUserSchema)
    .mutation(
      async ({
        input: { orgId, password, roles, email, orgName, jobTitle, ...input },
      }) => {
        const user = await UserModel.create({
          ...input,
          organizations: [
            {
              org_id: orgId,
              org_name: orgName,
              jobTitle,
              password,
              roles,
              email,
            },
          ],
        });

        const userStarterImage = await fetch(
          `https://ui-avatars.com/api/?name=${input.firstName}+${input.lastName}&size=50`
        ).then((res) => res.body);

        if (userStarterImage) {
          const { data, error } = await supabase.storage
            .from("mhfp")
            .upload(
              `avatars/${user._id.toString()}-${orgId}.png`,
              userStarterImage,
              {
                cacheControl: "3600",
                upsert: false,
                contentType: "image/png",
              }
            );
          if (error) {
            throw new TRPCError({
              message: error.message,
              code: "BAD_REQUEST",
              cause: error.cause,
            });
          }
          if (data) {
            const imagePublicURL = supabase.storage
              .from("mhfp")
              .getPublicUrl(data.path);
            const organizationAccount = user?.organizations.find(
              (organizationAccount) =>
                organizationAccount.org_id.toString() === orgId
            );
            if (organizationAccount) {
              organizationAccount.picture = imagePublicURL.data.publicUrl;
            }
            await user.save();
          }
        }
      }
    ),
  findOne: publicProcedure
    .input(z.object({ nationalId: z.string() }))
    .query(async ({ input: { nationalId } }) => {
      const user = await UserModel.findOne({
        nationalId,
      });
      return user;
    }),
  findOrgs: publicProcedure
    .input(z.object({ nationalId: z.string() }))
    .query(async ({ input: { nationalId } }) => {
      const user = await UserModel.findOne(
        {
          nationalId,
        },
        { last_name: true, first_name: true, organizations: true }
      );
      console.log(user);

      if (!user) {
        throw new TRPCError({
          message: "no national information",
          code: "NOT_FOUND",
        });
      }
      const userOrgs = user?.organizations.map(
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
        orgs: userOrgs,
      };
    }),
});
