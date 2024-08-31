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
} from "../../data/schemas/index";

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

	getAll: publicProcedure.query(async () => {
		return prisma.member.findMany();
	}),

	getById: publicProcedure
		.input(MemberSchema.shape.id)
		.query(async ({ input }) => {
			return prisma.member.findUnique({ where: { id: input } });
		}),

	update: publicProcedure
		.input(MemberUpdateInputSchema)
		.mutation(async ({ input }) => {
			const { id, ...data } = input;
			return prisma.member.update({ where: { id }, data });
		}),

	delete: publicProcedure
		.input(MemberSchema.shape.id)
		.mutation(async ({ input }) => {
			return prisma.member.delete({ where: { id: input } });
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
		// Como estamos usando protectedProcedure, sabemos que ctx.user existe
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
