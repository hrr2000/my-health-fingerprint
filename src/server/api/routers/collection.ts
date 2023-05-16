import { UserModel } from "@/server/models";
import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";

import { TRPCError } from "@trpc/server";
import {supabase} from "@/server/db";

export const collectionRouter = createTRPCRouter({
  create: protectedProcedure
    .input()
    .mutation(
      async ({
               input: {
                 collection, template
               }: ,
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
});
