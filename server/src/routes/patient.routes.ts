import { protectedProcedure, router } from "../trpc";

import { getCurrentUserOrganizationId } from "../utils/current-user-organization";

import { prisma } from "..";
import { PatientSchema } from "../schemas";
import { createPatient, updatePatient } from "../zod-types/schemas";

export const patientRouter = router({
	create: protectedProcedure
		.input(createPatient)
		.mutation(async ({ input, ctx }) => {
			const organizationId = await getCurrentUserOrganizationId(ctx);
			const patientData = {
				...input,
				birthDate: input.birthDate ? new Date(input.birthDate) : undefined,
				organizationId,
			};
			return prisma.patient.create({ data: patientData });
		}),

	getAll: protectedProcedure.query(async ({ ctx }) => {
		const organizationId = await getCurrentUserOrganizationId(ctx);
		return prisma.patient.findMany({ where: { organizationId } });
	}),

	getById: protectedProcedure
		.input(PatientSchema.shape.id)
		.query(async ({ input, ctx }) => {
			const organizationId = await getCurrentUserOrganizationId(ctx);
			return prisma.patient.findFirst({ where: { id: input, organizationId } });
		}),

	update: protectedProcedure
		.input(updatePatient)
		.mutation(async ({ input, ctx }) => {
			const { id, ...data } = input;
			const organizationId = await getCurrentUserOrganizationId(ctx);
			const patientData = {
				...data,
				birthDate: data.birthDate ? new Date(data.birthDate) : undefined,
			};
			return prisma.patient.update({
				where: { id, organizationId },
				data: patientData,
			});
		}),

	delete: protectedProcedure
		.input(PatientSchema.shape.id)
		.mutation(async ({ input, ctx }) => {
			const organizationId = await getCurrentUserOrganizationId(ctx);
			return prisma.patient.delete({ where: { id: input, organizationId } });
		}),

	getMetrics: protectedProcedure.query(async ({ ctx }) => {
		const organizationId = await getCurrentUserOrganizationId(ctx);
		const currentDate = new Date();
		const currentMonth = currentDate.getMonth() + 1;
		const sixMonthsAgo = new Date(currentDate);
		sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

		const [totalPatients, allPatients, recentlyAttended, patientsWithDebts] =
			await Promise.all([
				prisma.patient.count({ where: { organizationId } }),

				prisma.patient.findMany({
					where: { organizationId },
					select: { birthDate: true },
				}),

				prisma.appointment
					.findMany({
						where: {
							organizationId,
							consultationDate: { gte: sixMonthsAgo },
							status: "COMPLETED",
						},
						select: { patientId: true },
						distinct: ["patientId"],
					})
					.then((appointments) => appointments.length),

				prisma.patient.count({
					where: {
						organizationId,
						FinancialTransaction: {
							some: {
								type: "EXPENSE",
								status: "PENDING",
							},
						},
					},
				}),
			]);

		const birthdaysThisMonth = allPatients.filter((patient) => {
			if (patient.birthDate) {
				const birthMonth = patient.birthDate.getMonth() + 1;
				return birthMonth === currentMonth;
			}
			return false;
		}).length;

		return {
			totalPatients,
			birthdaysThisMonth,
			recentlyAttended,
			patientsWithDebts,
		};
	}),
});
