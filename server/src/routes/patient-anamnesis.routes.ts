import { protectedProcedure, router } from "../trpc";

import { z } from "zod";
import { prisma } from "..";
import { getCurrentUserOrganizationId } from "../utils/current-user-organization";
import {
	createPatientAnamnesis,
	updatePatientAnamnesis,
} from "../zod-types/schemas";

export const patientAnamnesisRouter = router({
	create: protectedProcedure
		.input(createPatientAnamnesis)
		.mutation(async ({ input, ctx }) => {
			const organizationId = await getCurrentUserOrganizationId(ctx);
			return prisma.patientAnamnesis.create({
				data: {
					patientId: input.patientId,
					templateId: input.templateId,
				},
				include: { answers: true, template: true },
			});
		}),

	getAll: protectedProcedure.query(async ({ ctx }) => {
		const organizationId = await getCurrentUserOrganizationId(ctx);
		return prisma.patientAnamnesis.findMany({
			where: { template: { organizationId } },
			include: { answers: true, template: true },
		});
	}),

	getById: protectedProcedure
		.input(z.string())
		.query(async ({ input, ctx }) => {
			const organizationId = await getCurrentUserOrganizationId(ctx);
			return prisma.patientAnamnesis.findFirst({
				where: { id: input, template: { organizationId } },
				include: { answers: true, template: true },
			});
		}),

	update: protectedProcedure
		.input(updatePatientAnamnesis)
		.mutation(async ({ input, ctx }) => {
			const { id, ...data } = input;
			const organizationId = await getCurrentUserOrganizationId(ctx);
			return prisma.patientAnamnesis.update({
				where: { id, template: { organizationId } },
				data,
				include: { answers: true, template: true },
			});
		}),

	delete: protectedProcedure
		.input(z.string())
		.mutation(async ({ input, ctx }) => {
			const organizationId = await getCurrentUserOrganizationId(ctx);
			return prisma.patientAnamnesis.delete({
				where: { id: input, template: { organizationId } },
			});
		}),
});
