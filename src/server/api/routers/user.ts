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
            {
              org_id: "640c5bdb238a36ee26f1ffb4",
              org_name: "helwan university hospital",
              jobTitle: "doctor",
              password: "123456788",
              roles: ["640c5bd134f906d943702634", "640c5bd6f0a2e0bbd3c68aeb"],
              email: "kokp.amged@gmail.com",
              picture:
                "https://nflqlknmqitbrxqkxtbl.supabase.co/storage/v1/object/public/mhfp/avatars/640c5be3fdfa9afd47546dff-41224d776a326fb40f000001.png",
            },
          ],
        });

        const userStarterImage = await fetch(
          `https://ui-avatars.com/api/?name=${input.first_name}+${input.last_name}&size=50`
        )
          .then((res) => res.blob())
          .then((res) => res.arrayBuffer());

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
