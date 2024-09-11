import { z } from 'zod';
import { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

// JSON
//------------------------------------------------------

export type NullableJsonInput = Prisma.JsonValue | null | 'JsonNull' | 'DbNull' | Prisma.NullTypes.DbNull | Prisma.NullTypes.JsonNull;

export const transformJsonNull = (v?: NullableJsonInput) => {
  if (!v || v === 'DbNull') return Prisma.DbNull;
  if (v === 'JsonNull') return Prisma.JsonNull;
  return v;
};

export const JsonValueSchema: z.ZodType<Prisma.JsonValue> = z.lazy(() =>
  z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.literal(null),
    z.record(z.lazy(() => JsonValueSchema.optional())),
    z.array(z.lazy(() => JsonValueSchema)),
  ])
);

export type JsonValueType = z.infer<typeof JsonValueSchema>;

export const NullableJsonValue = z
  .union([JsonValueSchema, z.literal('DbNull'), z.literal('JsonNull')])
  .nullable()
  .transform((v) => transformJsonNull(v));

export type NullableJsonValueType = z.infer<typeof NullableJsonValue>;

export const InputJsonValueSchema: z.ZodType<Prisma.InputJsonValue> = z.lazy(() =>
  z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.object({ toJSON: z.function(z.tuple([]), z.any()) }),
    z.record(z.lazy(() => z.union([InputJsonValueSchema, z.literal(null)]))),
    z.array(z.lazy(() => z.union([InputJsonValueSchema, z.literal(null)]))),
  ])
);

export type InputJsonValueType = z.infer<typeof InputJsonValueSchema>;


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','name','email','passwordHash','avatarUrl','createdAt','updatedAt']);

export const TokenScalarFieldEnumSchema = z.enum(['id','type','createdAt','userId']);

export const AccountScalarFieldEnumSchema = z.enum(['id','provider','providerAccountId','userId']);

export const InviteScalarFieldEnumSchema = z.enum(['id','email','role','createdAt','authorId','organizationId']);

export const MemberScalarFieldEnumSchema = z.enum(['id','role','specialty','organizationId','userId']);

export const PatientScalarFieldEnumSchema = z.enum(['id','name','email','phone','birthDate','avatarUrl','gender','cpf','rg','healthPlan','profession','responsibleName','responsiblePhone','createdAt','updatedAt','cep','street','number','complement','neighborhood','city','state','organizationId']);

export const MedicalRecordScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','patientId']);

export const AnamnesisScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','medicalRecordId','templateId']);

export const AnamnesisTemplateScalarFieldEnumSchema = z.enum(['id','title','description','createdAt','updatedAt','isActive','organizationId']);

export const AnamnesisQuestionScalarFieldEnumSchema = z.enum(['id','question','type','isRequired','order','templateId']);

export const PatientAnamnesisScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','patientId','templateId']);

export const AnamnesisAnswerScalarFieldEnumSchema = z.enum(['id','answer','questionId','patientAnamnesisId','anamnesisId']);

export const AppointmentScalarFieldEnumSchema = z.enum(['id','type','description','status','createdAt','updatedAt','consultationDate','consultationStartTime','consultationEndTime','commitmentStartDate','commitmentEndDate','patientId','memberId','organizationId','createdById','userId']);

export const OrganizationScalarFieldEnumSchema = z.enum(['id','name','slug','domain','shouldAttachUsersByDomain','avatarUrl','createdAt','updatedAt','cnpj','email','phone','website','description','address','addressNumber','addressComplement','neighborhood','city','state','zipCode','businessHours','specialties','acceptedInsurances','facebookUrl','instagramUrl','linkedinUrl','twitterUrl','ownerId']);

export const FinancialTransactionScalarFieldEnumSchema = z.enum(['id','description','amount','type','paymentMethod','date','createdAt','updatedAt','organizationId','patientId','categoryId']);

export const TransactionCategoryScalarFieldEnumSchema = z.enum(['id','name']);

export const CustomerSatisfactionScalarFieldEnumSchema = z.enum(['id','rating','comment','createdAt','serviceQuality','staffProfessionalism','cleanliness','overallExperience','patientId','organizationId']);

export const TreatmentScalarFieldEnumSchema = z.enum(['id','description','startDate','endDate','status','patientId','memberId']);

export const PrescriptionScalarFieldEnumSchema = z.enum(['id','details','createdAt','patientId','memberId']);

export const NotificationScalarFieldEnumSchema = z.enum(['id','message','type','isRead','createdAt','userId']);

export const MessageScalarFieldEnumSchema = z.enum(['id','content','createdAt','senderId','receiverId']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const NullableJsonNullValueInputSchema = z.enum(['DbNull','JsonNull',]).transform((value) => value === 'JsonNull' ? Prisma.JsonNull : value === 'DbNull' ? Prisma.DbNull : value);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const JsonNullValueFilterSchema = z.enum(['DbNull','JsonNull','AnyNull',]).transform((value) => value === 'JsonNull' ? Prisma.JsonNull : value === 'DbNull' ? Prisma.JsonNull : value === 'AnyNull' ? Prisma.AnyNull : value);

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

export const AppointmentTypeSchema = z.enum(['CONSULTATION','COMMITMENT']);

export type AppointmentTypeType = `${z.infer<typeof AppointmentTypeSchema>}`

export const AppointmentStatusSchema = z.enum(['SCHEDULED','CONFIRMED','CANCELLED','COMPLETED']);

export type AppointmentStatusType = `${z.infer<typeof AppointmentStatusSchema>}`

export const TransactionTypeSchema = z.enum(['INCOME','EXPENSE']);

export type TransactionTypeType = `${z.infer<typeof TransactionTypeSchema>}`

export const PaymentMethodSchema = z.enum(['CASH','CREDIT_CARD','DEBIT_CARD','BANK_TRANSFER','PIX','OTHER']);

export type PaymentMethodType = `${z.infer<typeof PaymentMethodSchema>}`

export const TreatmentStatusSchema = z.enum(['ONGOING','COMPLETED','CANCELLED']);

export type TreatmentStatusType = `${z.infer<typeof TreatmentStatusSchema>}`

export const NotificationTypeSchema = z.enum(['APPOINTMENT_REMINDER','NEW_MESSAGE','SYSTEM_UPDATE']);

export type NotificationTypeType = `${z.infer<typeof NotificationTypeSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string().uuid(),
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
  id: z.string().uuid(),
  createdAt: z.coerce.date(),
  userId: z.string(),
})

export type Token = z.infer<typeof TokenSchema>

/////////////////////////////////////////
// ACCOUNT SCHEMA
/////////////////////////////////////////

export const AccountSchema = z.object({
  provider: AccountProviderSchema,
  id: z.string().uuid(),
  providerAccountId: z.string(),
  userId: z.string(),
})

export type Account = z.infer<typeof AccountSchema>

/////////////////////////////////////////
// INVITE SCHEMA
/////////////////////////////////////////

export const InviteSchema = z.object({
  role: RoleSchema,
  id: z.string().uuid(),
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
  id: z.string().uuid(),
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
  id: z.string().uuid(),
  name: z.string(),
  email: z.string().nullable(),
  phone: z.string().nullable(),
  birthDate: z.coerce.date(),
  avatarUrl: z.string().nullable(),
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
  id: z.string().uuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  patientId: z.string(),
})

export type MedicalRecord = z.infer<typeof MedicalRecordSchema>

/////////////////////////////////////////
// ANAMNESIS SCHEMA
/////////////////////////////////////////

export const AnamnesisSchema = z.object({
  id: z.string().uuid(),
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
  id: z.string().uuid(),
  title: z.string(),
  description: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  isActive: z.boolean(),
  organizationId: z.string(),
})

export type AnamnesisTemplate = z.infer<typeof AnamnesisTemplateSchema>

/////////////////////////////////////////
// ANAMNESIS QUESTION SCHEMA
/////////////////////////////////////////

export const AnamnesisQuestionSchema = z.object({
  type: QuestionTypeSchema,
  id: z.string().uuid(),
  question: z.string(),
  isRequired: z.boolean(),
  order: z.number().int(),
  templateId: z.string(),
})

export type AnamnesisQuestion = z.infer<typeof AnamnesisQuestionSchema>

/////////////////////////////////////////
// PATIENT ANAMNESIS SCHEMA
/////////////////////////////////////////

export const PatientAnamnesisSchema = z.object({
  id: z.string().uuid(),
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
  id: z.string().uuid(),
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
  type: AppointmentTypeSchema,
  status: AppointmentStatusSchema,
  id: z.string().uuid(),
  description: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  consultationDate: z.coerce.date().nullable(),
  consultationStartTime: z.coerce.date().nullable(),
  consultationEndTime: z.coerce.date().nullable(),
  commitmentStartDate: z.coerce.date().nullable(),
  commitmentEndDate: z.coerce.date().nullable(),
  patientId: z.string().nullable(),
  memberId: z.string(),
  organizationId: z.string(),
  createdById: z.string(),
  userId: z.string().nullable(),
})

export type Appointment = z.infer<typeof AppointmentSchema>

/////////////////////////////////////////
// ORGANIZATION SCHEMA
/////////////////////////////////////////

export const OrganizationSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  slug: z.string(),
  domain: z.string().nullable(),
  shouldAttachUsersByDomain: z.boolean(),
  avatarUrl: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  cnpj: z.string().nullable(),
  email: z.string().nullable(),
  phone: z.string().nullable(),
  website: z.string().nullable(),
  description: z.string().nullable(),
  address: z.string().nullable(),
  addressNumber: z.string().nullable(),
  addressComplement: z.string().nullable(),
  neighborhood: z.string().nullable(),
  city: z.string().nullable(),
  state: z.string().nullable(),
  zipCode: z.string().nullable(),
  businessHours: JsonValueSchema.nullable(),
  specialties: z.string().array(),
  acceptedInsurances: z.string().array(),
  facebookUrl: z.string().nullable(),
  instagramUrl: z.string().nullable(),
  linkedinUrl: z.string().nullable(),
  twitterUrl: z.string().nullable(),
  ownerId: z.string(),
})

export type Organization = z.infer<typeof OrganizationSchema>

/////////////////////////////////////////
// FINANCIAL TRANSACTION SCHEMA
/////////////////////////////////////////

export const FinancialTransactionSchema = z.object({
  type: TransactionTypeSchema,
  paymentMethod: PaymentMethodSchema,
  id: z.string().uuid(),
  description: z.string(),
  amount: z.string(),
  date: z.coerce.date(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  organizationId: z.string(),
  patientId: z.string().nullable(),
  categoryId: z.string(),
})

export type FinancialTransaction = z.infer<typeof FinancialTransactionSchema>

/////////////////////////////////////////
// TRANSACTION CATEGORY SCHEMA
/////////////////////////////////////////

export const TransactionCategorySchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
})

export type TransactionCategory = z.infer<typeof TransactionCategorySchema>

/////////////////////////////////////////
// CUSTOMER SATISFACTION SCHEMA
/////////////////////////////////////////

export const CustomerSatisfactionSchema = z.object({
  id: z.string().uuid(),
  rating: z.number().int(),
  comment: z.string().nullable(),
  createdAt: z.coerce.date(),
  serviceQuality: z.number().int(),
  staffProfessionalism: z.number().int(),
  cleanliness: z.number().int(),
  overallExperience: z.number().int(),
  patientId: z.string(),
  organizationId: z.string(),
})

export type CustomerSatisfaction = z.infer<typeof CustomerSatisfactionSchema>

/////////////////////////////////////////
// TREATMENT SCHEMA
/////////////////////////////////////////

export const TreatmentSchema = z.object({
  status: TreatmentStatusSchema,
  id: z.string().uuid(),
  description: z.string(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date().nullable(),
  patientId: z.string(),
  memberId: z.string(),
})

export type Treatment = z.infer<typeof TreatmentSchema>

/////////////////////////////////////////
// PRESCRIPTION SCHEMA
/////////////////////////////////////////

export const PrescriptionSchema = z.object({
  id: z.string().uuid(),
  details: z.string(),
  createdAt: z.coerce.date(),
  patientId: z.string(),
  memberId: z.string(),
})

export type Prescription = z.infer<typeof PrescriptionSchema>

/////////////////////////////////////////
// NOTIFICATION SCHEMA
/////////////////////////////////////////

export const NotificationSchema = z.object({
  type: NotificationTypeSchema,
  id: z.string().uuid(),
  message: z.string(),
  isRead: z.boolean(),
  createdAt: z.coerce.date(),
  userId: z.string(),
})

export type Notification = z.infer<typeof NotificationSchema>

/////////////////////////////////////////
// MESSAGE SCHEMA
/////////////////////////////////////////

export const MessageSchema = z.object({
  id: z.string().uuid(),
  content: z.string(),
  createdAt: z.coerce.date(),
  senderId: z.string(),
  receiverId: z.string(),
})

export type Message = z.infer<typeof MessageSchema>
