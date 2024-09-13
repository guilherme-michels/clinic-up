import { z } from "zod";
import { prisma } from "..";
import { protectedProcedure, router } from "../trpc";
import { getCurrentUserOrganizationId } from "../utils/current-user-organization";
import { createAppointment, updateAppointment } from "../zod-types/schemas";

export // Rotas para Appointment
const appointmentRouter = router({
	create: protectedProcedure
		.input(createAppointment)
		.mutation(async ({ input, ctx }) => {
			const organizationId = await getCurrentUserOrganizationId(ctx);

			const consultationDate = new Date(input.consultationDate);
			const [startHours, startMinutes] = input.consultationStartTime.split(":");
			const [endHours, endMinutes] = input.consultationEndTime.split(":");

			const startDateTime = new Date(consultationDate);
			startDateTime.setHours(
				Number.parseInt(startHours),
				Number.parseInt(startMinutes),
			);

			const endDateTime = new Date(consultationDate);
			endDateTime.setHours(
				Number.parseInt(endHours),
				Number.parseInt(endMinutes),
			);

			return prisma.appointment.create({
				data: {
					type: input.type,
					description: input.description,
					consultationDate: input.consultationDate,
					consultationStartTime: startDateTime.toISOString(),
					consultationEndTime: endDateTime.toISOString(),
					patient: {
						connect: { id: input.patientId },
					},
					member: {
						connect: { id: input.memberId },
					},
					organization: {
						connect: { id: organizationId },
					},
					createdBy: {
						connect: { id: ctx.user.id },
					},
				},
			});
		}),

	getAll: protectedProcedure.query(async ({ ctx }) => {
		const organizationId = await getCurrentUserOrganizationId(ctx);
		return prisma.appointment.findMany({
			where: { organizationId },
			include: { patient: true },
		});
	}),

	getById: protectedProcedure
		.input(z.string())
		.query(async ({ input, ctx }) => {
			const organizationId = await getCurrentUserOrganizationId(ctx);
			return prisma.appointment.findFirst({
				where: { id: input, organizationId },
				include: { patient: true },
			});
		}),

	update: protectedProcedure
		.input(z.object({ id: z.string(), ...updateAppointment.shape }))
		.mutation(async ({ input, ctx }) => {
			const { id, ...data } = input;
			const organizationId = await getCurrentUserOrganizationId(ctx);
			return prisma.appointment.update({
				where: { id, organizationId },
				data,
			});
		}),

	delete: protectedProcedure
		.input(z.string())
		.mutation(async ({ input, ctx }) => {
			const organizationId = await getCurrentUserOrganizationId(ctx);
			return prisma.appointment.delete({
				where: { id: input, organizationId },
			});
		}),

	// Dentro do appointmentRouter, adicione a seguinte rota:

	getCompletedAppointmentsLast6Months: protectedProcedure.query(
		async ({ ctx }) => {
			const organizationId = await getCurrentUserOrganizationId(ctx);
			const endDate = new Date();
			const startDate = new Date(endDate);
			startDate.setMonth(startDate.getMonth() - 5);

			const appointments = await prisma.appointment.groupBy({
				by: ["consultationDate"],
				where: {
					organizationId,
					status: "COMPLETED",
					consultationDate: {
						gte: startDate,
						lte: endDate,
					},
				},
				_count: {
					id: true,
				},
			});

			const monthNames = [
				"Janeiro",
				"Fevereiro",
				"Março",
				"Abril",
				"Maio",
				"Junho",
				"Julho",
				"Agosto",
				"Setembro",
				"Outubro",
				"Novembro",
				"Dezembro",
			];

			const result = new Array(6)
				.fill(null)
				.map((_, index) => {
					const date = new Date(endDate);
					date.setMonth(date.getMonth() - index);
					const month = date.getMonth();
					const year = date.getFullYear();

					const appointmentsInMonth = appointments.filter((a) => {
						const appointmentDate = new Date(a.consultationDate);
						return (
							appointmentDate.getMonth() === month &&
							appointmentDate.getFullYear() === year
						);
					});

					const count = appointmentsInMonth.reduce(
						(sum, a) => sum + a._count.id,
						0,
					);

					return {
						month: monthNames[month],
						appointments: count,
					};
				})
				.reverse();

			return result;
		},
	),
});
