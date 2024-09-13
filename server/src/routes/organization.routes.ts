import { router, publicProcedure, protectedProcedure } from "../trpc";
import { prisma } from "..";
import { TRPCError } from "@trpc/server";
import { createOrganization, updateOrganization } from "../zod-types/schemas";
import { getCurrentUserOrganizationId } from "../utils/current-user-organization";
import { OrganizationSchema } from "../schemas";

export const organizationRouter = router({
	create: publicProcedure
		.input(createOrganization)
		.mutation(async ({ input }) => {
			return prisma.organization.create({ data: input });
		}),

	getAll: publicProcedure.query(async () => {
		return prisma.organization.findMany();
	}),

	getById: publicProcedure
		.input(OrganizationSchema.shape.id)
		.query(async ({ input }) => {
			return prisma.organization.findUnique({ where: { id: input } });
		}),

	update: protectedProcedure
		.input(updateOrganization)
		.mutation(async ({ input, ctx }) => {
			const organizationId = await getCurrentUserOrganizationId(ctx);

			if (!organizationId) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Organização não encontrada para o usuário atual.",
				});
			}

			return prisma.organization.update({
				where: { id: organizationId },
				data: input,
			});
		}),

	delete: publicProcedure
		.input(OrganizationSchema.shape.id)
		.mutation(async ({ input }) => {
			return prisma.organization.delete({ where: { id: input } });
		}),

	getCurrentUserOrganization: protectedProcedure.query(async ({ ctx }) => {
		const member = await prisma.member.findFirst({
			where: { userId: ctx.user.id },
			include: { organization: true },
		});

		if (!member) {
			throw new TRPCError({
				code: "NOT_FOUND",
				message: "Organização não encontrada para o usuário atual.",
			});
		}

		return member.organization;
	}),
});
