import { UserModel } from "@/server/models";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";
import { createUserSchema } from "@/validation/user";
import { supabase } from "@/server/db";
import { TRPCError } from "@trpc/server";
export const userRouter = createTRPCRouter({
  create: publicProcedure
    .input(createUserSchema)
    .mutation(async ({ input }) => {
      const userStarterImage = await fetch(
        `https://ui-avatars.com/api/?name=${input.name}&size=128`
      )
        .then((res) => res.blob())
        .then((res) => res.arrayBuffer());

      const { data, error } = await supabase.storage
        .from("mhfp")
        .upload(`avatars/${input.name}.png`, userStarterImage, {
          cacheControl: "3600",
          upsert: false,
          contentType: "image/png",
        });

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

        await UserModel.create({
          ...input,
          image: imagePublicURL.data.publicUrl,
        });
      }
    }),
});
