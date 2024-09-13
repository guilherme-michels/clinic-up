import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { router, publicProcedure, protectedProcedure } from "./trpc";
import { createContext } from "./trpc";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import cors from "cors";
import dotenv from "dotenv";

import {
	UserSchema,
	OrganizationSchema,
	MemberSchema,
	PatientSchema,
	AppointmentSchema,
} from "./schemas/index";
import { getCurrentUserOrganizationId } from "./utils/current-user-organization";
import {
	createAnamneseTemplate,
	updateAnamneseTemplate,
	createAnamneseQuestion,
	updateAnamneseQuestion,
	createPatient,
	updatePatient,
	createUser,
	updateUser,
	createOrganization,
	updateOrganization,
	createMember,
	updateMember,
	createAppointment,
	updateAppointment,
	updatePatientAnamnesis,
	createPatientAnamnesis,
	createFinancialTransaction,
	updateFinancialTransaction,
	createTransactionCategory,
	updateTransactionCategory,
} from "./zod-types/schemas";

// Criando schemas para signIn e signUp
const SignUpSchema = z.object({
	organizationName: z.string(),
	managerName: z.string(),
	email: z.string().email(),
	password: z.string().min(6),
});

const SignInSchema = z.object({
	email: z.string().email(),
	password: z.string(),
});

const prisma = new PrismaClient();
dotenv.config();

// Rotas para User
const userRouter = router({
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

// Rotas para Organization
const organizationRouter = router({
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

// Rotas para Member
const memberRouter = router({
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

// Rotas para Patient
const patientRouter = router({
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
		const currentMonth = currentDate.getMonth() + 1; // Mês atual (1-12)
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

// Rotas para Appointment
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

// Rotas para AnamnesisTemplate
const anamnesisTemplateRouter = router({
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

// Rotas para PatientAnamnesis
const patientAnamnesisRouter = router({
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

// Rotas de autenticação
const authRouter = router({
	signUp: publicProcedure.input(SignUpSchema).mutation(async ({ input }) => {
		const { organizationName, managerName, email, password } = input;

		const userExists = await prisma.user.findUnique({
			where: { email },
		});

		if (userExists) {
			throw new TRPCError({
				code: "CONFLICT",
				message: "Usuário já existe com este e-mail.",
			});
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const user = await prisma.user.create({
			data: {
				name: managerName,
				email,
				passwordHash: hashedPassword,
			},
		});

		const organization = await prisma.organization.create({
			data: {
				name: organizationName,
				slug: organizationName.toLowerCase().replace(/\s+/g, "-"),
				ownerId: user.id,
			},
		});

		await prisma.member.create({
			data: {
				role: "ADMIN",
				userId: user.id,
				organizationId: organization.id,
			},
		});

		const token = jwt.sign(
			{ userId: user.id },
			process.env.JWT_SECRET as string,
			{
				expiresIn: "7d",
			},
		);

		return {
			token,
			user: {
				id: user.id,
				name: user.name,
				email: user.email,
			},
		};
	}),

	signIn: publicProcedure
		.input(SignInSchema)
		.mutation(async ({ input, ctx }) => {
			const { email, password } = input;

			const user = await ctx.prisma.user.findUnique({
				where: { email },
			});

			if (!user || !user.passwordHash) {
				throw new TRPCError({
					code: "UNAUTHORIZED",
					message: "Credenciais inválidas.",
				});
			}

			const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

			if (!isPasswordValid) {
				throw new TRPCError({
					code: "UNAUTHORIZED",
					message: "Credenciais inválidas.",
				});
			}

			const token = jwt.sign(
				{ userId: user.id },
				process.env.JWT_SECRET as string,
				{
					expiresIn: "7d",
				},
			);

			return {
				token,
				user: {
					id: user.id,
					name: user.name,
					email: user.email,
				},
			};
		}),

	signOut: publicProcedure.mutation(async ({ ctx }) => {
		return {
			success: true,
			message: "Sessão encerrada com sucesso",
		};
	}),

	profile: protectedProcedure.query(async ({ ctx }) => {
		return {
			id: ctx.user.id,
			name: ctx.user.name,
			email: ctx.user.email,
		};
	}),
});

// Rotas para AnamnesisQuestion
const anamnesisQuestionRouter = router({
	create: protectedProcedure
		.input(createAnamneseQuestion)
		.mutation(async ({ input, ctx }) => {
			const { templateId, ...questionData } = input;

			const anamnese = await ctx.prisma.anamnesisTemplate.findUnique({
				where: { id: templateId },
				include: { organization: true },
			});

			if (!anamnese || anamnese.organization.id !== ctx.user.organizationId) {
				throw new TRPCError({
					code: "FORBIDDEN",
					message:
						"Você não tem permissão para adicionar perguntas a esta anamnese.",
				});
			}

			return ctx.prisma.anamnesisQuestion.create({
				data: {
					...questionData,
					anamnesisTemplate: { connect: { id: templateId } },
				},
			});
		}),

	update: protectedProcedure
		.input(updateAnamneseQuestion)
		.mutation(async ({ input, ctx }) => {
			const { id, ...updateData } = input;

			const question = await ctx.prisma.anamnesisQuestion.findUnique({
				where: { id },
				include: { anamnesisTemplate: { include: { organization: true } } },
			});

			if (
				!question ||
				question.anamnesisTemplate.organization.id !== ctx.user.organizationId
			) {
				throw new TRPCError({
					code: "FORBIDDEN",
					message: "Você não tem permissão para atualizar esta pergunta.",
				});
			}

			return ctx.prisma.anamnesisQuestion.update({
				where: { id },
				data: updateData,
			});
		}),

	delete: protectedProcedure
		.input(z.string())
		.mutation(async ({ input: id, ctx }) => {
			const question = await ctx.prisma.anamnesisQuestion.findUnique({
				where: { id },
				include: { anamnesisTemplate: { include: { organization: true } } },
			});

			if (
				!question ||
				question.anamnesisTemplate.organization.id !== ctx.user.organizationId
			) {
				throw new TRPCError({
					code: "FORBIDDEN",
					message: "Você não tem permissão para deletar esta pergunta.",
				});
			}

			return ctx.prisma.anamnesisQuestion.delete({ where: { id } });
		}),

	getById: protectedProcedure
		.input(z.string())
		.query(async ({ input: id, ctx }) => {
			const question = await ctx.prisma.anamnesisQuestion.findUnique({
				where: { id },
				include: { anamnesisTemplate: { include: { organization: true } } },
			});

			if (
				!question ||
				question.anamnesisTemplate.organization.id !== ctx.user.organizationId
			) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message:
						"Pergunta não encontrada ou você não tem permissão para visualizá-la.",
				});
			}

			return question;
		}),

	getAllByAnamneseId: protectedProcedure
		.input(z.string())
		.query(async ({ input: anamneseId, ctx }) => {
			const anamnese = await ctx.prisma.anamnesisTemplate.findUnique({
				where: { id: anamneseId },
				include: { organization: true },
			});

			if (!anamnese || anamnese.organization.id !== ctx.user.organizationId) {
				throw new TRPCError({
					code: "FORBIDDEN",
					message:
						"Você não tem permissão para visualizar as perguntas desta anamnese.",
				});
			}

			return ctx.prisma.anamnesisQuestion.findMany({
				where: { anamnesisTemplateId: anamneseId },
				orderBy: { createdAt: "asc" },
			});
		}),
});

// Rotas para FinancialTransaction
const financialTransactionRouter = router({
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

const transactionCategoryRouter = router({
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

const appRouter = router({
	auth: authRouter,
	user: userRouter,
	organization: organizationRouter,
	member: memberRouter,
	patient: patientRouter,
	appointment: appointmentRouter,
	anamnesisTemplate: anamnesisTemplateRouter,
	patientAnamnesis: patientAnamnesisRouter,
	anamnesisQuestion: anamnesisQuestionRouter,
	financialTransaction: financialTransactionRouter,
	transactionCategory: transactionCategoryRouter,
});

const server = createHTTPServer({
	router: appRouter,
	createContext,
	middleware: cors({
		origin: ["http://localhost:3000", "http://localhost:5173"],
		credentials: true,
	}),
});

server.listen(3000);

console.log("Servidor TRPC rodando na porta 3000");

export type AppRouter = typeof appRouter;
