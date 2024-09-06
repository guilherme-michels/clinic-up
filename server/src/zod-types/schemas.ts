import { z } from "zod";
import { QuestionTypeSchema } from "../schemas";

// AnamneseTemplate
export const anamneseTemplateSchema = z.object({
	title: z.string(),
	description: z.string().optional().nullable(),
});

export const createAnamneseTemplate = anamneseTemplateSchema;

export const updateAnamneseTemplate = anamneseTemplateSchema.extend({
	id: z.string(),
});

export type AnamneseTemplateForm = z.infer<typeof anamneseTemplateSchema>;

// AnamneseQuestion
export const anamneseQuestionSchema = z.object({
	question: z.string(),
	questionType: QuestionTypeSchema,
	templateId: z.string(),
});

export const createAnamneseQuestion = anamneseQuestionSchema;

export const updateAnamneseQuestion = anamneseQuestionSchema.extend({
	id: z.string(),
});

export type AnamneseQuestionForm = z.infer<typeof anamneseQuestionSchema>;
