import { z } from "zod";

export const anamneseTemplateSchema = z.object({
	title: z.string(),
	description: z.string().optional().nullable(),
});

export const createAnamneseTemplate = anamneseTemplateSchema;

export const updateAnamneseTemplate = anamneseTemplateSchema.extend({
	id: z.string(),
});
