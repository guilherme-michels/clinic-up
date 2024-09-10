import { z } from "zod";
import {
	AppointmentStatusSchema,
	GenderSchema,
	QuestionTypeSchema,
	RoleSchema,
} from "../schemas";

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
	.partial()
	.omit({ createdAt: true, updatedAt: true });

export type AnamneseTemplateFormSchema = z.infer<typeof anamneseTemplateSchema>;

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
	.partial()
	.omit({ createdAt: true, updatedAt: true });

export type AnamneseQuestionFormSchema = z.infer<typeof anamneseQuestionSchema>;

// Patient
export const patientSchema = z.object({
	name: z.string().min(1, "Nome é obrigatório"),
	email: z.string().email("E-mail inválido").nullable(),
	phone: z.string().nullable(),
	birthDate: z.string().optional().nullable(),
	gender: GenderSchema,
	cpf: z.string().optional(),
	rg: z.string().optional(),
	healthPlan: z.string().optional(),
	profession: z.string().optional(),
	responsibleName: z.string().optional(),
	responsiblePhone: z.string().optional(),
	cep: z.string().optional(),
	street: z.string().optional(),
	number: z.string().optional(),
	complement: z.string().optional(),
	neighborhood: z.string().optional(),
	city: z.string().optional(),
	state: z.string().optional(),
	createdAt: z.date().optional(),
	updatedAt: z.date().optional(),
});

export const createPatient = patientSchema.omit({
	createdAt: true,
	updatedAt: true,
});

export const updatePatient = patientSchema
	.partial()
	.omit({ createdAt: true, updatedAt: true });

export type PatientFormSchema = z.infer<typeof patientSchema>;

// User
export const userSchema = z.object({
	id: z.string(),
	name: z.string().nullable(),
	email: z.string(),
	passwordHash: z.string().nullable(),
	avatarUrl: z.string().nullable(),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date(),
});

export const createUser = userSchema.omit({
	createdAt: true,
	updatedAt: true,
});

export const updateUser = userSchema
	.partial()
	.omit({ createdAt: true, updatedAt: true });

export type UserFormSchema = z.infer<typeof userSchema>;

// Organization
export const organizationSchema = z.object({
	id: z.string(),
	name: z.string(),
	slug: z.string(),
	domain: z.string().nullable(),
	shouldAttachUsersByDomain: z.boolean(),
	avatarUrl: z.string().nullable(),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date(),
	ownerId: z.string(),

	cnpj: z.string().nullable(),
	email: z.string().email().nullable(),
	phone: z.string().nullable(),
	website: z.string().url().nullable(),
	description: z.string().nullable(),

	address: z.string().nullable(),
	addressNumber: z.string().nullable(),
	addressComplement: z.string().nullable(),
	neighborhood: z.string().nullable(),
	city: z.string().nullable(),
	state: z.string().nullable(),
	zipCode: z.string().nullable(),

	businessHours: z.record(z.string(), z.string()).nullable(),
	specialties: z.array(z.string()).nullable(),
	acceptedInsurances: z.array(z.string()).nullable(),

	facebookUrl: z.string().url().nullable(),
	instagramUrl: z.string().url().nullable(),
	linkedinUrl: z.string().url().nullable(),
	twitterUrl: z.string().url().nullable(),
});

export const createOrganization = organizationSchema.omit({
	id: true,
	createdAt: true,
	updatedAt: true,
});

export const updateOrganization = organizationSchema
	.partial()
	.omit({ createdAt: true, updatedAt: true });

export type OrganizationFormSchema = z.infer<typeof organizationSchema>;

// Member
export const memberSchema = z.object({
	role: RoleSchema,
	id: z.string(),
	specialty: z.string().nullable(),
	organizationId: z.string(),
	userId: z.string(),
});

export const createMember = memberSchema.omit({});

export const updateMember = memberSchema.partial().omit({ id: true });

export type MemberFormSchema = z.infer<typeof memberSchema>;

// Appointment
export const appointmentSchema = z.object({
	status: AppointmentStatusSchema,
	id: z.string(),
	startTime: z.coerce.date(),
	endTime: z.coerce.date(),
	description: z.string().nullable(),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date(),
	patientId: z.string(),
	memberId: z.string(),
});

export const createAppointment = appointmentSchema.omit({
	createdAt: true,
	updatedAt: true,
});

export const updateAppointment = appointmentSchema
	.partial()
	.omit({ createdAt: true, updatedAt: true });

export type AppointmentFormSchema = z.infer<typeof appointmentSchema>;

// PatientAnamnesis
export const PatientAnamnesisSchema = z.object({
	id: z.string(),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date(),
	patientId: z.string(),
	templateId: z.string(),
});

export const createPatientAnamnesis = PatientAnamnesisSchema.omit({
	createdAt: true,
	updatedAt: true,
});

export const updatePatientAnamnesis = PatientAnamnesisSchema.partial().omit({
	createdAt: true,
	updatedAt: true,
});

export type PatientAnamnesisFormSchema = z.infer<typeof PatientAnamnesisSchema>;
