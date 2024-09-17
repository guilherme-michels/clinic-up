import { publicProcedure, router } from "../trpc";

import { prisma } from "..";
import { PatientSchema, UserSchema } from "../schemas";
import { createUser, updateUser } from "../zod-types/schemas";

export const userRouter = router({
	create: publicProcedure.input(createUser).mutation(async ({ input }) => {
		return prisma.user.create({ data: input });
	}),

	getAll: publicProcedure.query(async () => {
		return prisma.user.findMany();
	}),

	getById: publicProcedure
		.input(UserSchema.shape.id)
		.query(async ({ input }) => {
			return prisma.user.findUnique({ where: { id: input } });
		}),

	update: publicProcedure.input(updateUser).mutation(async ({ input }) => {
		const { id, ...data } = input;
		return prisma.user.update({ where: { id }, data });
	}),

	delete: publicProcedure
		.input(UserSchema.shape.id)
		.mutation(async ({ input }) => {
			return prisma.user.delete({ where: { id: input } });
		}),
});
