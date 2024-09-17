import { protectedProcedure, publicProcedure, router } from "../trpc";

import { z } from "zod";
import { prisma } from "..";
import { getCurrentUserOrganizationId } from "../utils/current-user-organization";
import {
	createAnamneseTemplate,
	updateAnamneseTemplate,
} from "../zod-types/schemas";

export const anamnesisTemplateRouter = router({
	create: protectedProcedure
		.input(createAnamneseTemplate)
		.mutation(async ({ input, ctx }) => {
			const organizationId = await getCurrentUserOrganizationId(ctx);
			return prisma.anamnesisTemplate.create({
				data: { ...input, organizationId },
			});
		}),

	getAll: protectedProcedure.query(async ({ ctx }) => {
		const organizationId = await getCurrentUserOrganizationId(ctx);
		return prisma.anamnesisTemplate.findMany({
			where: { organizationId },
			include: { questions: true },
		});
	}),

	getSummary: publicProcedure.query(async ({ ctx }) => {
		const organizationId = await getCurrentUserOrganizationId(ctx);
		const summaries = await ctx.prisma.anamnesisTemplate.findMany({
			where: { organizationId },
			select: {
				id: true,
				title: true,
				description: true,
				createdAt: true,
				updatedAt: true,
			},
			orderBy: {
				createdAt: "asc",
			},
		});
		return summaries;
	}),

	getById: protectedProcedure
		.input(z.string())
		.query(async ({ input, ctx }) => {
			const organizationId = await getCurrentUserOrganizationId(ctx);
			return prisma.anamnesisTemplate.findFirst({
				where: { id: input, organizationId },
				include: { questions: true },
			});
		}),

	update: protectedProcedure
		.input(updateAnamneseTemplate)
		.mutation(async ({ input }) => {
			const { id, ...updateData } = input;
			return prisma.anamnesisTemplate.update({
				where: { id },
				data: updateData,
			});
		}),

	delete: protectedProcedure
		.input(z.string())
		.mutation(async ({ input, ctx }) => {
			const organizationId = await getCurrentUserOrganizationId(ctx);
			return prisma.anamnesisTemplate.delete({
				where: { id: input, organizationId },
			});
		}),
});
