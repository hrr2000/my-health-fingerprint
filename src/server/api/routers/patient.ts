import { z } from 'zod';

import {
  createTRPCRouter,
  protectedProcedure,
} from '@/server/api/trpc';

export const patientRouter = createTRPCRouter({
  findOne: protectedProcedure
  .input(z.object({
    national_id: z.string()
  }))
  .query(({ input: { national_id }, ctx }) => {
    return ctx.prisma.patient.findUnique({
      where: {national_id}
    });
  })
});