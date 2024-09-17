import { PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { createHTTPServer } from "@trpc/server/adapters/standalone";
import bcrypt from "bcrypt";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { anamnesisQuestionRouter } from "./routes/anamnesis-question.routes";
import { anamnesisTemplateRouter } from "./routes/anamnesis-template.routes";
import { appointmentRouter } from "./routes/appointment.routes";
import { financialTransactionRouter } from "./routes/financial-transaction.routes";
import { memberRouter } from "./routes/member.routes";
import { organizationRouter } from "./routes/organization.routes";
import { patientAnamnesisRouter } from "./routes/patient-anamnesis.routes";
import { patientRouter } from "./routes/patient.routes";
import { transactionCategoryRouter } from "./routes/transaction-category.routes";
import { userRouter } from "./routes/user.routes";
import { protectedProcedure, publicProcedure, router } from "./trpc";
import { createContext } from "./trpc";

export const prisma = new PrismaClient();
dotenv.config();

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
