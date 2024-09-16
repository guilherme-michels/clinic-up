import { router, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import {
	createAnamneseQuestion,
	updateAnamneseQuestion,
} from "../zod-types/schemas";
import { z } from "zod";

export const anamnesisQuestionRouter = router({
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
