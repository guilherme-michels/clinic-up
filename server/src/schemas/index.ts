import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','name','email','passwordHash','avatarUrl','createdAt','updatedAt']);

export const TokenScalarFieldEnumSchema = z.enum(['id','type','createdAt','userId']);

export const AccountScalarFieldEnumSchema = z.enum(['id','provider','providerAccountId','userId']);

export const InviteScalarFieldEnumSchema = z.enum(['id','email','role','createdAt','authorId','organizationId']);

export const MemberScalarFieldEnumSchema = z.enum(['id','role','specialty','organizationId','userId']);

export const PatientScalarFieldEnumSchema = z.enum(['id','name','email','phone','birthDate','gender','cpf','rg','healthPlan','profession','responsibleName','responsiblePhone','createdAt','updatedAt','cep','street','number','complement','neighborhood','city','state','organizationId']);

export const MedicalRecordScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','patientId']);

export const AnamnesisScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','medicalRecordId','templateId']);

export const AnamnesisTemplateScalarFieldEnumSchema = z.enum(['id','title','description','createdAt','updatedAt','organizationId']);

export const AnamnesisQuestionScalarFieldEnumSchema = z.enum(['id','question','type','templateId']);

export const PatientAnamnesisScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','patientId','templateId']);

export const AnamnesisAnswerScalarFieldEnumSchema = z.enum(['id','answer','questionId','patientAnamnesisId','anamnesisId']);

export const AppointmentScalarFieldEnumSchema = z.enum(['id','startTime','endTime','description','status','createdAt','updatedAt','patientId','memberId']);

export const OrganizationScalarFieldEnumSchema = z.enum(['id','name','slug','domain','shouldAttachUsersByDomain','avatarUrl','createdAt','updatedAt','ownerId']);

export const FinancialTransactionScalarFieldEnumSchema = z.enum(['id','description','amount','type','paymentMethod','date','createdAt','updatedAt','organizationId','patientId']);

export const CustomerSatisfactionScalarFieldEnumSchema = z.enum(['id','rating','comment','createdAt','patientId','organizationId']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const TokenTypeSchema = z.enum(['PASSWORD_RECOVER']);

export type TokenTypeType = `${z.infer<typeof TokenTypeSchema>}`

export const AccountProviderSchema = z.enum(['GMAIL','GITHUB']);

export type AccountProviderType = `${z.infer<typeof AccountProviderSchema>}`

export const RoleSchema = z.enum(['ADMIN','MEMBER','BILLING']);

export type RoleType = `${z.infer<typeof RoleSchema>}`

export const GenderSchema = z.enum(['MALE','FEMALE','OTHER']);

export type GenderType = `${z.infer<typeof GenderSchema>}`

export const QuestionTypeSchema = z.enum(['TEXT','BOOLEAN','MULTIPLE_CHOICE','SINGLE_CHOICE','NUMBER','DATE']);

export type QuestionTypeType = `${z.infer<typeof QuestionTypeSchema>}`

export const AppointmentStatusSchema = z.enum(['SCHEDULED','CONFIRMED','CANCELLED','COMPLETED']);

export type AppointmentStatusType = `${z.infer<typeof AppointmentStatusSchema>}`

export const TransactionTypeSchema = z.enum(['INCOME','EXPENSE']);

export type TransactionTypeType = `${z.infer<typeof TransactionTypeSchema>}`

export const PaymentMethodSchema = z.enum(['CASH','CREDIT_CARD','DEBIT_CARD','BANK_TRANSFER','PIX','OTHER']);

export type PaymentMethodType = `${z.infer<typeof PaymentMethodSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string(),
  name: z.string().nullable(),
  email: z.string(),
  passwordHash: z.string().nullable(),
  avatarUrl: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// TOKEN SCHEMA
/////////////////////////////////////////

export const TokenSchema = z.object({
  type: TokenTypeSchema,
  id: z.string(),
  createdAt: z.coerce.date(),
  userId: z.string(),
})

export type Token = z.infer<typeof TokenSchema>

/////////////////////////////////////////
// ACCOUNT SCHEMA
/////////////////////////////////////////

export const AccountSchema = z.object({
  provider: AccountProviderSchema,
  id: z.string(),
  providerAccountId: z.string(),
  userId: z.string(),
})

export type Account = z.infer<typeof AccountSchema>

/////////////////////////////////////////
// INVITE SCHEMA
/////////////////////////////////////////

export const InviteSchema = z.object({
  role: RoleSchema,
  id: z.string(),
  email: z.string(),
  createdAt: z.coerce.date(),
  authorId: z.string().nullable(),
  organizationId: z.string(),
})

export type Invite = z.infer<typeof InviteSchema>

/////////////////////////////////////////
// MEMBER SCHEMA
/////////////////////////////////////////

export const MemberSchema = z.object({
  role: RoleSchema,
  id: z.string(),
  specialty: z.string().nullable(),
  organizationId: z.string(),
  userId: z.string(),
})

export type Member = z.infer<typeof MemberSchema>

/////////////////////////////////////////
// PATIENT SCHEMA
/////////////////////////////////////////

export const PatientSchema = z.object({
  gender: GenderSchema.nullable(),
  id: z.string(),
  name: z.string(),
  email: z.string().nullable(),
  phone: z.string().nullable(),
  birthDate: z.coerce.date(),
  cpf: z.string().nullable(),
  rg: z.string().nullable(),
  healthPlan: z.string().nullable(),
  profession: z.string().nullable(),
  responsibleName: z.string().nullable(),
  responsiblePhone: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  cep: z.string().nullable(),
  street: z.string().nullable(),
  number: z.string().nullable(),
  complement: z.string().nullable(),
  neighborhood: z.string().nullable(),
  city: z.string().nullable(),
  state: z.string().nullable(),
  organizationId: z.string(),
})

export type Patient = z.infer<typeof PatientSchema>

/////////////////////////////////////////
// MEDICAL RECORD SCHEMA
/////////////////////////////////////////

export const MedicalRecordSchema = z.object({
  id: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  patientId: z.string(),
})

export type MedicalRecord = z.infer<typeof MedicalRecordSchema>

/////////////////////////////////////////
// ANAMNESIS SCHEMA
/////////////////////////////////////////

export const AnamnesisSchema = z.object({
  id: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  medicalRecordId: z.string(),
  templateId: z.string(),
})

export type Anamnesis = z.infer<typeof AnamnesisSchema>

/////////////////////////////////////////
// ANAMNESIS TEMPLATE SCHEMA
/////////////////////////////////////////

export const AnamnesisTemplateSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  organizationId: z.string(),
})

export type AnamnesisTemplate = z.infer<typeof AnamnesisTemplateSchema>

/////////////////////////////////////////
// ANAMNESIS QUESTION SCHEMA
/////////////////////////////////////////

export const AnamnesisQuestionSchema = z.object({
  type: QuestionTypeSchema,
  id: z.string(),
  question: z.string(),
  templateId: z.string(),
})

export type AnamnesisQuestion = z.infer<typeof AnamnesisQuestionSchema>

/////////////////////////////////////////
// PATIENT ANAMNESIS SCHEMA
/////////////////////////////////////////

export const PatientAnamnesisSchema = z.object({
  id: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  patientId: z.string(),
  templateId: z.string(),
})

export type PatientAnamnesis = z.infer<typeof PatientAnamnesisSchema>

/////////////////////////////////////////
// ANAMNESIS ANSWER SCHEMA
/////////////////////////////////////////

export const AnamnesisAnswerSchema = z.object({
  id: z.string(),
  answer: z.string(),
  questionId: z.string(),
  patientAnamnesisId: z.string(),
  anamnesisId: z.string().nullable(),
})

export type AnamnesisAnswer = z.infer<typeof AnamnesisAnswerSchema>

/////////////////////////////////////////
// APPOINTMENT SCHEMA
/////////////////////////////////////////

export const AppointmentSchema = z.object({
  status: AppointmentStatusSchema,
  id: z.string(),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  description: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  patientId: z.string(),
  memberId: z.string(),
})

export type Appointment = z.infer<typeof AppointmentSchema>

/////////////////////////////////////////
// ORGANIZATION SCHEMA
/////////////////////////////////////////

export const OrganizationSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  domain: z.string().nullable(),
  shouldAttachUsersByDomain: z.boolean(),
  avatarUrl: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  ownerId: z.string(),
})

export type Organization = z.infer<typeof OrganizationSchema>

/////////////////////////////////////////
// FINANCIAL TRANSACTION SCHEMA
/////////////////////////////////////////

export const FinancialTransactionSchema = z.object({
  type: TransactionTypeSchema,
  paymentMethod: PaymentMethodSchema,
  id: z.string(),
  description: z.string(),
  amount: z.string(),
  date: z.coerce.date(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  organizationId: z.string(),
  patientId: z.string().nullable(),
})

export type FinancialTransaction = z.infer<typeof FinancialTransactionSchema>

/////////////////////////////////////////
// CUSTOMER SATISFACTION SCHEMA
/////////////////////////////////////////

export const CustomerSatisfactionSchema = z.object({
  id: z.string(),
  rating: z.number().int(),
  comment: z.string().nullable(),
  createdAt: z.coerce.date(),
  patientId: z.string(),
  organizationId: z.string(),
})

export type CustomerSatisfaction = z.infer<typeof CustomerSatisfactionSchema>
