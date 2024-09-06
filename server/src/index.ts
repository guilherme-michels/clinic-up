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
	UserUpdateInputSchema,
	OrganizationCreateInputSchema,
	UserCreateInputSchema,
	OrganizationUpdateInputSchema,
	MemberCreateInputSchema,
	MemberUpdateInputSchema,
	PatientSchema,
	PatientCreateInputSchema,
	PatientUpdateInputSchema,
	AppointmentSchema,
	AppointmentCreateInputSchema,
	AppointmentUpdateInputSchema,
	PatientAnamnesisUpdateInputSchema,
	PatientAnamnesisCreateInputSchema,
} from "./schemas/index";
import { getCurrentUserOrganizationId } from "./utils/current-user-organization";
import {
	createAnamneseTemplate,
	updateAnamneseTemplate,
	createAnamneseQuestion,
	updateAnamneseQuestion,
	createPatient,
	updatePatient,
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
	create: publicProcedure
		.input(UserCreateInputSchema)
		.mutation(async ({ input }) => {
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

	update: publicProcedure
		.input(UserUpdateInputSchema)
		.mutation(async ({ input }) => {
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
		.input(OrganizationCreateInputSchema)
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

	update: publicProcedure
		.input(OrganizationUpdateInputSchema)
		.mutation(async ({ input }) => {
			const { id, ...data } = input;
			return prisma.organization.update({ where: { id }, data });
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
	create: publicProcedure
		.input(MemberCreateInputSchema)
		.mutation(async ({ input }) => {
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

	update: publicProcedure
		.input(MemberUpdateInputSchema)
		.mutation(async ({ input }) => {
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
			return prisma.patient.create({ data: { ...input, organizationId } });
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
			return prisma.patient.update({ where: { id, organizationId }, data });
		}),

	delete: protectedProcedure
		.input(PatientSchema.shape.id)
		.mutation(async ({ input, ctx }) => {
			const organizationId = await getCurrentUserOrganizationId(ctx);
			return prisma.patient.delete({ where: { id: input, organizationId } });
		}),
});

// Rotas para Appointment
const appointmentRouter = router({
	create: protectedProcedure
		.input(AppointmentCreateInputSchema)
		.mutation(async ({ input, ctx }) => {
			const organizationId = await getCurrentUserOrganizationId(ctx);
			const member = await prisma.member.findFirst({
				where: { userId: ctx.user.id, organizationId },
			});
			if (!member) {
				throw new TRPCError({
					code: "FORBIDDEN",
					message: "Usuário não é membro da organização",
				});
			}
			return prisma.appointment.create({
				data: { ...input, memberId: member.id, patientId: input.patientId },
			});
		}),

	getAll: protectedProcedure.query(async ({ ctx }) => {
		const organizationId = await getCurrentUserOrganizationId(ctx);
		const member = await prisma.member.findFirst({
			where: { userId: ctx.user.id, organizationId },
		});
		if (!member) {
			throw new TRPCError({
				code: "FORBIDDEN",
				message: "Usuário não é membro da organização",
			});
		}
		return prisma.appointment.findMany({
			where: { memberId: member.id },
			include: { patient: true },
		});
	}),

	getById: protectedProcedure
		.input(AppointmentSchema.shape.id)
		.query(async ({ input, ctx }) => {
			const organizationId = await getCurrentUserOrganizationId(ctx);
			const member = await prisma.member.findFirst({
				where: { userId: ctx.user.id, organizationId },
			});
			if (!member) {
				throw new TRPCError({
					code: "FORBIDDEN",
					message: "Usuário não é membro da organização",
				});
			}
			return prisma.appointment.findFirst({
				where: { id: input, memberId: member.id },
				include: { patient: true },
			});
		}),

	update: protectedProcedure
		.input(AppointmentUpdateInputSchema)
		.mutation(async ({ input, ctx }) => {
			const { id, ...data } = input;
			const organizationId = await getCurrentUserOrganizationId(ctx);
			const member = await prisma.member.findFirst({
				where: { userId: ctx.user.id, organizationId },
			});
			if (!member) {
				throw new TRPCError({
					code: "FORBIDDEN",
					message: "Usuário não é membro da organização",
				});
			}
			return prisma.appointment.update({
				where: { id, memberId: member.id },
				data,
			});
		}),

	delete: protectedProcedure
		.input(AppointmentSchema.shape.id)
		.mutation(async ({ input, ctx }) => {
			const organizationId = await getCurrentUserOrganizationId(ctx);
			const member = await prisma.member.findFirst({
				where: { userId: ctx.user.id, organizationId },
			});
			if (!member) {
				throw new TRPCError({
					code: "FORBIDDEN",
					message: "Usuário não é membro da organização",
				});
			}
			return prisma.appointment.delete({
				where: { id: input, memberId: member.id },
			});
		}),
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
		.input(PatientAnamnesisCreateInputSchema)
		.mutation(async ({ input, ctx }) => {
			const organizationId = await getCurrentUserOrganizationId(ctx);
			return prisma.patientAnamnesis.create({
				data: {
					...input,
					template: { connect: { id: input.templateId, organizationId } },
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
		.input(PatientAnamnesisUpdateInputSchema)
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
			const { anamneseId, ...questionData } = input;

			const anamnese = await ctx.prisma.anamnesisTemplate.findUnique({
				where: { id: anamneseId },
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
					anamnesisTemplate: { connect: { id: anamneseId } },
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
