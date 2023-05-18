import { UserModel } from "@/server/models";
import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const collectionRouter = createTRPCRouter({});
