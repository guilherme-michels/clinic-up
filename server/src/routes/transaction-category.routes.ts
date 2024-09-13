import { router, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import {
	createTransactionCategory,
	updateTransactionCategory,
} from "../zod-types/schemas";
import { getCurrentUserOrganizationId } from "../utils/current-user-organization";
import { z } from "zod";

export const transactionCategoryRouter = router({
	create: protectedProcedure
		.input(createTransactionCategory)
		.mutation(async ({ input, ctx }) => {
			const organizationId = await getCurrentUserOrganizationId(ctx);
			return ctx.prisma.transactionCategory.create({
				data: {
					...input,
					organization: { connect: { id: organizationId } },
				},
			});
		}),

	getAll: protectedProcedure.query(async ({ ctx }) => {
		const organizationId = await getCurrentUserOrganizationId(ctx);
		return ctx.prisma.transactionCategory.findMany({
			where: {
				organizationId: organizationId,
			},
		});
	}),

	getById: protectedProcedure
		.input(z.string().uuid())
		.query(async ({ input: id, ctx }) => {
			const organizationId = await getCurrentUserOrganizationId(ctx);
			const category = await ctx.prisma.transactionCategory.findFirst({
				where: { id, organizationId },
			});

			if (!category) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Categoria não encontrada",
				});
			}

			return category;
		}),

	update: protectedProcedure
		.input(
			z.object({
				id: z.string().uuid(),
				data: updateTransactionCategory,
			}),
		)
		.mutation(async ({ input, ctx }) => {
			const organizationId = await getCurrentUserOrganizationId(ctx);
			const { id, data } = input;

			const category = await ctx.prisma.transactionCategory.findFirst({
				where: { id, organizationId },
			});

			if (!category) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Categoria não encontrada",
				});
			}

			return ctx.prisma.transactionCategory.update({
				where: { id },
				data,
			});
		}),

	delete: protectedProcedure
		.input(z.string().uuid())
		.mutation(async ({ input: id, ctx }) => {
			const organizationId = await getCurrentUserOrganizationId(ctx);
			const category = await ctx.prisma.transactionCategory.findFirst({
				where: { id, organizationId },
			});

			if (!category) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Categoria não encontrada",
				});
			}

			return ctx.prisma.transactionCategory.delete({ where: { id } });
		}),
});
