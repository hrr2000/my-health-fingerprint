import { type MiddlewareCallback } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

/** Reusable middleware that enforces users are logged in before running the procedure. */
export const enforceUserIsAuthed: MiddlewareCallback = ({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      // infers the `session` as non-nullable
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
};
