import { z } from "zod";
import { QuestionTypeSchema } from "../schemas";

// AnamneseTemplate
export const anamneseTemplateSchema = z.object({
	title: z.string(),
	description: z.string().optional().nullable(),
	createdAt: z.date().optional(),
	updatedAt: z.date().optional(),
});

export const createAnamneseTemplate = anamneseTemplateSchema.omit({
	createdAt: true,
	updatedAt: true,
});

export const updateAnamneseTemplate = anamneseTemplateSchema
	.extend({
		id: z.string(),
	})
	.omit({ createdAt: true });

export type AnamneseTemplateForm = z.infer<typeof anamneseTemplateSchema>;

// AnamneseQuestion
export const anamneseQuestionSchema = z.object({
	question: z.string(),
	questionType: QuestionTypeSchema,
	templateId: z.string(),
	createdAt: z.date().optional(),
	updatedAt: z.date().optional(),
});

export const createAnamneseQuestion = anamneseQuestionSchema.omit({
	createdAt: true,
	updatedAt: true,
});

export const updateAnamneseQuestion = anamneseQuestionSchema
	.extend({
		id: z.string(),
	})
	.omit({ createdAt: true });

export type AnamneseQuestionForm = z.infer<typeof anamneseQuestionSchema>;

// Patient
export const patientSchema = z.object({
	name: z.string(),
	email: z.string().nullable(),
	phone: z.string().nullable(),
	birthDate: z.coerce.date(),
	address: z.string().nullable(),
	createdAt: z.date().optional(),
	updatedAt: z.date().optional(),
});

export const createPatient = patientSchema.omit({
	createdAt: true,
	updatedAt: true,
});

export const updatePatient = patientSchema
	.extend({
		id: z.string(),
	})
	.omit({ createdAt: true });

export type PatientForm = z.infer<typeof patientSchema>;
