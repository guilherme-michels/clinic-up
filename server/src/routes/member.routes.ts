import { prisma } from "..";
import { MemberSchema } from "../schemas";
import { protectedProcedure, publicProcedure, router } from "../trpc";
import { getCurrentUserOrganizationId } from "../utils/current-user-organization";
import { createMember, updateMember } from "../zod-types/schemas";

export const memberRouter = router({
	create: publicProcedure.input(createMember).mutation(async ({ input }) => {
		return prisma.member.create({ data: input });
	}),

	getAll: protectedProcedure.query(async ({ ctx }) => {
		const organizationId = await getCurrentUserOrganizationId(ctx);
		return prisma.member.findMany({
			where: { organizationId },
			include: {
				user: true,
				organization: true,
			},
		});
	}),

	getById: publicProcedure
		.input(MemberSchema.shape.id)
		.query(async ({ input }) => {
			return prisma.member.findUnique({
				where: { id: input },
				include: {
					user: true,
					organization: true,
				},
			});
		}),

	update: publicProcedure.input(updateMember).mutation(async ({ input }) => {
		const { id, ...data } = input;
		return prisma.member.update({
			where: { id },
			data,
			include: {
				user: true,
				organization: true,
			},
		});
	}),

	delete: publicProcedure
		.input(MemberSchema.shape.id)
		.mutation(async ({ input }) => {
			return prisma.member.delete({
				where: { id: input },
				include: {
					user: true,
					organization: true,
				},
			});
		}),
});
