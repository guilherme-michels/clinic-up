import { z } from "zod";
import { prisma } from "..";
import { protectedProcedure, publicProcedure, router } from "../trpc";
import { getCurrentUserOrganizationId } from "../utils/current-user-organization";
import {
	createFinancialTransaction,
	updateFinancialTransaction,
} from "../zod-types/schemas";

export const financialTransactionRouter = router({
	create: protectedProcedure
		.input(createFinancialTransaction)
		.mutation(async ({ input, ctx }) => {
			const organizationId = await getCurrentUserOrganizationId(ctx);
			const { patientId, categoryId, ...restInput } = input;

			return prisma.financialTransaction.create({
				data: {
					...restInput,
					amount: restInput.amount.toString(),
					date: new Date(restInput.date),
					organization: { connect: { id: organizationId } },
					category: { connect: { id: categoryId } },
					...(patientId && patientId !== ""
						? { patient: { connect: { id: patientId } } }
						: {}),
				},
			});
		}),

	getAll: protectedProcedure.query(async ({ ctx }) => {
		const organizationId = await getCurrentUserOrganizationId(ctx);
		return prisma.financialTransaction.findMany({
			where: { organizationId },
			include: { category: true },
		});
	}),

	getById: protectedProcedure
		.input(z.string())
		.query(async ({ input, ctx }) => {
			const organizationId = await getCurrentUserOrganizationId(ctx);
			return prisma.financialTransaction.findFirst({
				where: { id: input, organizationId },
				include: { category: true },
			});
		}),

	update: protectedProcedure
		.input(updateFinancialTransaction)
		.mutation(async ({ input, ctx }) => {
			const { id, ...data } = input;
			const organizationId = await getCurrentUserOrganizationId(ctx);
			return prisma.financialTransaction.update({
				where: { id, organizationId },
				data: {
					...data,
					date: data.date ? new Date(data.date) : undefined,
				},
			});
		}),

	delete: protectedProcedure
		.input(z.string())
		.mutation(async ({ input, ctx }) => {
			const organizationId = await getCurrentUserOrganizationId(ctx);
			return prisma.financialTransaction.delete({
				where: { id: input, organizationId },
			});
		}),

	getBalance: protectedProcedure.query(async ({ ctx }) => {
		const organizationId = await getCurrentUserOrganizationId(ctx);
		const transactions = await prisma.financialTransaction.findMany({
			where: { organizationId },
		});

		const balance = transactions.reduce((acc, transaction) => {
			return transaction.type === "INCOME"
				? acc + transaction.amount
				: acc - transaction.amount;
		}, 0);

		return { balance };
	}),
});
