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

export const PatientScalarFieldEnumSchema = z.enum(['id','name','email','phone','birthDate','address','createdAt','updatedAt','organizationId']);

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
  id: z.string(),
  name: z.string(),
  email: z.string().nullable(),
  phone: z.string().nullable(),
  birthDate: z.coerce.date(),
  address: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
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

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  tokens: z.union([z.boolean(),z.lazy(() => TokenFindManyArgsSchema)]).optional(),
  accounts: z.union([z.boolean(),z.lazy(() => AccountFindManyArgsSchema)]).optional(),
  invites: z.union([z.boolean(),z.lazy(() => InviteFindManyArgsSchema)]).optional(),
  member_on: z.union([z.boolean(),z.lazy(() => MemberFindManyArgsSchema)]).optional(),
  owns_organizations: z.union([z.boolean(),z.lazy(() => OrganizationFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  tokens: z.boolean().optional(),
  accounts: z.boolean().optional(),
  invites: z.boolean().optional(),
  member_on: z.boolean().optional(),
  owns_organizations: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  email: z.boolean().optional(),
  passwordHash: z.boolean().optional(),
  avatarUrl: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  tokens: z.union([z.boolean(),z.lazy(() => TokenFindManyArgsSchema)]).optional(),
  accounts: z.union([z.boolean(),z.lazy(() => AccountFindManyArgsSchema)]).optional(),
  invites: z.union([z.boolean(),z.lazy(() => InviteFindManyArgsSchema)]).optional(),
  member_on: z.union([z.boolean(),z.lazy(() => MemberFindManyArgsSchema)]).optional(),
  owns_organizations: z.union([z.boolean(),z.lazy(() => OrganizationFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// TOKEN
//------------------------------------------------------

export const TokenIncludeSchema: z.ZodType<Prisma.TokenInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const TokenArgsSchema: z.ZodType<Prisma.TokenDefaultArgs> = z.object({
  select: z.lazy(() => TokenSelectSchema).optional(),
  include: z.lazy(() => TokenIncludeSchema).optional(),
}).strict();

export const TokenSelectSchema: z.ZodType<Prisma.TokenSelect> = z.object({
  id: z.boolean().optional(),
  type: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// ACCOUNT
//------------------------------------------------------

export const AccountIncludeSchema: z.ZodType<Prisma.AccountInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const AccountArgsSchema: z.ZodType<Prisma.AccountDefaultArgs> = z.object({
  select: z.lazy(() => AccountSelectSchema).optional(),
  include: z.lazy(() => AccountIncludeSchema).optional(),
}).strict();

export const AccountSelectSchema: z.ZodType<Prisma.AccountSelect> = z.object({
  id: z.boolean().optional(),
  provider: z.boolean().optional(),
  providerAccountId: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// INVITE
//------------------------------------------------------

export const InviteIncludeSchema: z.ZodType<Prisma.InviteInclude> = z.object({
  author: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  organization: z.union([z.boolean(),z.lazy(() => OrganizationArgsSchema)]).optional(),
}).strict()

export const InviteArgsSchema: z.ZodType<Prisma.InviteDefaultArgs> = z.object({
  select: z.lazy(() => InviteSelectSchema).optional(),
  include: z.lazy(() => InviteIncludeSchema).optional(),
}).strict();

export const InviteSelectSchema: z.ZodType<Prisma.InviteSelect> = z.object({
  id: z.boolean().optional(),
  email: z.boolean().optional(),
  role: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  authorId: z.boolean().optional(),
  organizationId: z.boolean().optional(),
  author: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  organization: z.union([z.boolean(),z.lazy(() => OrganizationArgsSchema)]).optional(),
}).strict()

// MEMBER
//------------------------------------------------------

export const MemberIncludeSchema: z.ZodType<Prisma.MemberInclude> = z.object({
  organization: z.union([z.boolean(),z.lazy(() => OrganizationArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  appointments: z.union([z.boolean(),z.lazy(() => AppointmentFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => MemberCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const MemberArgsSchema: z.ZodType<Prisma.MemberDefaultArgs> = z.object({
  select: z.lazy(() => MemberSelectSchema).optional(),
  include: z.lazy(() => MemberIncludeSchema).optional(),
}).strict();

export const MemberCountOutputTypeArgsSchema: z.ZodType<Prisma.MemberCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => MemberCountOutputTypeSelectSchema).nullish(),
}).strict();

export const MemberCountOutputTypeSelectSchema: z.ZodType<Prisma.MemberCountOutputTypeSelect> = z.object({
  appointments: z.boolean().optional(),
}).strict();

export const MemberSelectSchema: z.ZodType<Prisma.MemberSelect> = z.object({
  id: z.boolean().optional(),
  role: z.boolean().optional(),
  specialty: z.boolean().optional(),
  organizationId: z.boolean().optional(),
  userId: z.boolean().optional(),
  organization: z.union([z.boolean(),z.lazy(() => OrganizationArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  appointments: z.union([z.boolean(),z.lazy(() => AppointmentFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => MemberCountOutputTypeArgsSchema)]).optional(),
}).strict()

// PATIENT
//------------------------------------------------------

export const PatientIncludeSchema: z.ZodType<Prisma.PatientInclude> = z.object({
  organization: z.union([z.boolean(),z.lazy(() => OrganizationArgsSchema)]).optional(),
  medicalRecord: z.union([z.boolean(),z.lazy(() => MedicalRecordArgsSchema)]).optional(),
  appointments: z.union([z.boolean(),z.lazy(() => AppointmentFindManyArgsSchema)]).optional(),
  FinancialTransaction: z.union([z.boolean(),z.lazy(() => FinancialTransactionFindManyArgsSchema)]).optional(),
  CustomerSatisfaction: z.union([z.boolean(),z.lazy(() => CustomerSatisfactionFindManyArgsSchema)]).optional(),
  PatientAnamnesis: z.union([z.boolean(),z.lazy(() => PatientAnamnesisFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PatientCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const PatientArgsSchema: z.ZodType<Prisma.PatientDefaultArgs> = z.object({
  select: z.lazy(() => PatientSelectSchema).optional(),
  include: z.lazy(() => PatientIncludeSchema).optional(),
}).strict();

export const PatientCountOutputTypeArgsSchema: z.ZodType<Prisma.PatientCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => PatientCountOutputTypeSelectSchema).nullish(),
}).strict();

export const PatientCountOutputTypeSelectSchema: z.ZodType<Prisma.PatientCountOutputTypeSelect> = z.object({
  appointments: z.boolean().optional(),
  FinancialTransaction: z.boolean().optional(),
  CustomerSatisfaction: z.boolean().optional(),
  PatientAnamnesis: z.boolean().optional(),
}).strict();

export const PatientSelectSchema: z.ZodType<Prisma.PatientSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  email: z.boolean().optional(),
  phone: z.boolean().optional(),
  birthDate: z.boolean().optional(),
  address: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  organizationId: z.boolean().optional(),
  organization: z.union([z.boolean(),z.lazy(() => OrganizationArgsSchema)]).optional(),
  medicalRecord: z.union([z.boolean(),z.lazy(() => MedicalRecordArgsSchema)]).optional(),
  appointments: z.union([z.boolean(),z.lazy(() => AppointmentFindManyArgsSchema)]).optional(),
  FinancialTransaction: z.union([z.boolean(),z.lazy(() => FinancialTransactionFindManyArgsSchema)]).optional(),
  CustomerSatisfaction: z.union([z.boolean(),z.lazy(() => CustomerSatisfactionFindManyArgsSchema)]).optional(),
  PatientAnamnesis: z.union([z.boolean(),z.lazy(() => PatientAnamnesisFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PatientCountOutputTypeArgsSchema)]).optional(),
}).strict()

// MEDICAL RECORD
//------------------------------------------------------

export const MedicalRecordIncludeSchema: z.ZodType<Prisma.MedicalRecordInclude> = z.object({
  patient: z.union([z.boolean(),z.lazy(() => PatientArgsSchema)]).optional(),
  anamneses: z.union([z.boolean(),z.lazy(() => AnamnesisFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => MedicalRecordCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const MedicalRecordArgsSchema: z.ZodType<Prisma.MedicalRecordDefaultArgs> = z.object({
  select: z.lazy(() => MedicalRecordSelectSchema).optional(),
  include: z.lazy(() => MedicalRecordIncludeSchema).optional(),
}).strict();

export const MedicalRecordCountOutputTypeArgsSchema: z.ZodType<Prisma.MedicalRecordCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => MedicalRecordCountOutputTypeSelectSchema).nullish(),
}).strict();

export const MedicalRecordCountOutputTypeSelectSchema: z.ZodType<Prisma.MedicalRecordCountOutputTypeSelect> = z.object({
  anamneses: z.boolean().optional(),
}).strict();

export const MedicalRecordSelectSchema: z.ZodType<Prisma.MedicalRecordSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  patientId: z.boolean().optional(),
  patient: z.union([z.boolean(),z.lazy(() => PatientArgsSchema)]).optional(),
  anamneses: z.union([z.boolean(),z.lazy(() => AnamnesisFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => MedicalRecordCountOutputTypeArgsSchema)]).optional(),
}).strict()

// ANAMNESIS
//------------------------------------------------------

export const AnamnesisIncludeSchema: z.ZodType<Prisma.AnamnesisInclude> = z.object({
  medicalRecord: z.union([z.boolean(),z.lazy(() => MedicalRecordArgsSchema)]).optional(),
  template: z.union([z.boolean(),z.lazy(() => AnamnesisTemplateArgsSchema)]).optional(),
  answers: z.union([z.boolean(),z.lazy(() => AnamnesisAnswerFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => AnamnesisCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const AnamnesisArgsSchema: z.ZodType<Prisma.AnamnesisDefaultArgs> = z.object({
  select: z.lazy(() => AnamnesisSelectSchema).optional(),
  include: z.lazy(() => AnamnesisIncludeSchema).optional(),
}).strict();

export const AnamnesisCountOutputTypeArgsSchema: z.ZodType<Prisma.AnamnesisCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => AnamnesisCountOutputTypeSelectSchema).nullish(),
}).strict();

export const AnamnesisCountOutputTypeSelectSchema: z.ZodType<Prisma.AnamnesisCountOutputTypeSelect> = z.object({
  answers: z.boolean().optional(),
}).strict();

export const AnamnesisSelectSchema: z.ZodType<Prisma.AnamnesisSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  medicalRecordId: z.boolean().optional(),
  templateId: z.boolean().optional(),
  medicalRecord: z.union([z.boolean(),z.lazy(() => MedicalRecordArgsSchema)]).optional(),
  template: z.union([z.boolean(),z.lazy(() => AnamnesisTemplateArgsSchema)]).optional(),
  answers: z.union([z.boolean(),z.lazy(() => AnamnesisAnswerFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => AnamnesisCountOutputTypeArgsSchema)]).optional(),
}).strict()

// ANAMNESIS TEMPLATE
//------------------------------------------------------

export const AnamnesisTemplateIncludeSchema: z.ZodType<Prisma.AnamnesisTemplateInclude> = z.object({
  organization: z.union([z.boolean(),z.lazy(() => OrganizationArgsSchema)]).optional(),
  questions: z.union([z.boolean(),z.lazy(() => AnamnesisQuestionFindManyArgsSchema)]).optional(),
  patientAnamneses: z.union([z.boolean(),z.lazy(() => PatientAnamnesisFindManyArgsSchema)]).optional(),
  Anamnesis: z.union([z.boolean(),z.lazy(() => AnamnesisFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => AnamnesisTemplateCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const AnamnesisTemplateArgsSchema: z.ZodType<Prisma.AnamnesisTemplateDefaultArgs> = z.object({
  select: z.lazy(() => AnamnesisTemplateSelectSchema).optional(),
  include: z.lazy(() => AnamnesisTemplateIncludeSchema).optional(),
}).strict();

export const AnamnesisTemplateCountOutputTypeArgsSchema: z.ZodType<Prisma.AnamnesisTemplateCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => AnamnesisTemplateCountOutputTypeSelectSchema).nullish(),
}).strict();

export const AnamnesisTemplateCountOutputTypeSelectSchema: z.ZodType<Prisma.AnamnesisTemplateCountOutputTypeSelect> = z.object({
  questions: z.boolean().optional(),
  patientAnamneses: z.boolean().optional(),
  Anamnesis: z.boolean().optional(),
}).strict();

export const AnamnesisTemplateSelectSchema: z.ZodType<Prisma.AnamnesisTemplateSelect> = z.object({
  id: z.boolean().optional(),
  title: z.boolean().optional(),
  description: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  organizationId: z.boolean().optional(),
  organization: z.union([z.boolean(),z.lazy(() => OrganizationArgsSchema)]).optional(),
  questions: z.union([z.boolean(),z.lazy(() => AnamnesisQuestionFindManyArgsSchema)]).optional(),
  patientAnamneses: z.union([z.boolean(),z.lazy(() => PatientAnamnesisFindManyArgsSchema)]).optional(),
  Anamnesis: z.union([z.boolean(),z.lazy(() => AnamnesisFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => AnamnesisTemplateCountOutputTypeArgsSchema)]).optional(),
}).strict()

// ANAMNESIS QUESTION
//------------------------------------------------------

export const AnamnesisQuestionIncludeSchema: z.ZodType<Prisma.AnamnesisQuestionInclude> = z.object({
  template: z.union([z.boolean(),z.lazy(() => AnamnesisTemplateArgsSchema)]).optional(),
  answers: z.union([z.boolean(),z.lazy(() => AnamnesisAnswerFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => AnamnesisQuestionCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const AnamnesisQuestionArgsSchema: z.ZodType<Prisma.AnamnesisQuestionDefaultArgs> = z.object({
  select: z.lazy(() => AnamnesisQuestionSelectSchema).optional(),
  include: z.lazy(() => AnamnesisQuestionIncludeSchema).optional(),
}).strict();

export const AnamnesisQuestionCountOutputTypeArgsSchema: z.ZodType<Prisma.AnamnesisQuestionCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => AnamnesisQuestionCountOutputTypeSelectSchema).nullish(),
}).strict();

export const AnamnesisQuestionCountOutputTypeSelectSchema: z.ZodType<Prisma.AnamnesisQuestionCountOutputTypeSelect> = z.object({
  answers: z.boolean().optional(),
}).strict();

export const AnamnesisQuestionSelectSchema: z.ZodType<Prisma.AnamnesisQuestionSelect> = z.object({
  id: z.boolean().optional(),
  question: z.boolean().optional(),
  type: z.boolean().optional(),
  templateId: z.boolean().optional(),
  template: z.union([z.boolean(),z.lazy(() => AnamnesisTemplateArgsSchema)]).optional(),
  answers: z.union([z.boolean(),z.lazy(() => AnamnesisAnswerFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => AnamnesisQuestionCountOutputTypeArgsSchema)]).optional(),
}).strict()

// PATIENT ANAMNESIS
//------------------------------------------------------

export const PatientAnamnesisIncludeSchema: z.ZodType<Prisma.PatientAnamnesisInclude> = z.object({
  patient: z.union([z.boolean(),z.lazy(() => PatientArgsSchema)]).optional(),
  template: z.union([z.boolean(),z.lazy(() => AnamnesisTemplateArgsSchema)]).optional(),
  answers: z.union([z.boolean(),z.lazy(() => AnamnesisAnswerFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PatientAnamnesisCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const PatientAnamnesisArgsSchema: z.ZodType<Prisma.PatientAnamnesisDefaultArgs> = z.object({
  select: z.lazy(() => PatientAnamnesisSelectSchema).optional(),
  include: z.lazy(() => PatientAnamnesisIncludeSchema).optional(),
}).strict();

export const PatientAnamnesisCountOutputTypeArgsSchema: z.ZodType<Prisma.PatientAnamnesisCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => PatientAnamnesisCountOutputTypeSelectSchema).nullish(),
}).strict();

export const PatientAnamnesisCountOutputTypeSelectSchema: z.ZodType<Prisma.PatientAnamnesisCountOutputTypeSelect> = z.object({
  answers: z.boolean().optional(),
}).strict();

export const PatientAnamnesisSelectSchema: z.ZodType<Prisma.PatientAnamnesisSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  patientId: z.boolean().optional(),
  templateId: z.boolean().optional(),
  patient: z.union([z.boolean(),z.lazy(() => PatientArgsSchema)]).optional(),
  template: z.union([z.boolean(),z.lazy(() => AnamnesisTemplateArgsSchema)]).optional(),
  answers: z.union([z.boolean(),z.lazy(() => AnamnesisAnswerFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PatientAnamnesisCountOutputTypeArgsSchema)]).optional(),
}).strict()

// ANAMNESIS ANSWER
//------------------------------------------------------

export const AnamnesisAnswerIncludeSchema: z.ZodType<Prisma.AnamnesisAnswerInclude> = z.object({
  question: z.union([z.boolean(),z.lazy(() => AnamnesisQuestionArgsSchema)]).optional(),
  patientAnamnesis: z.union([z.boolean(),z.lazy(() => PatientAnamnesisArgsSchema)]).optional(),
  Anamnesis: z.union([z.boolean(),z.lazy(() => AnamnesisArgsSchema)]).optional(),
}).strict()

export const AnamnesisAnswerArgsSchema: z.ZodType<Prisma.AnamnesisAnswerDefaultArgs> = z.object({
  select: z.lazy(() => AnamnesisAnswerSelectSchema).optional(),
  include: z.lazy(() => AnamnesisAnswerIncludeSchema).optional(),
}).strict();

export const AnamnesisAnswerSelectSchema: z.ZodType<Prisma.AnamnesisAnswerSelect> = z.object({
  id: z.boolean().optional(),
  answer: z.boolean().optional(),
  questionId: z.boolean().optional(),
  patientAnamnesisId: z.boolean().optional(),
  anamnesisId: z.boolean().optional(),
  question: z.union([z.boolean(),z.lazy(() => AnamnesisQuestionArgsSchema)]).optional(),
  patientAnamnesis: z.union([z.boolean(),z.lazy(() => PatientAnamnesisArgsSchema)]).optional(),
  Anamnesis: z.union([z.boolean(),z.lazy(() => AnamnesisArgsSchema)]).optional(),
}).strict()

// APPOINTMENT
//------------------------------------------------------

export const AppointmentIncludeSchema: z.ZodType<Prisma.AppointmentInclude> = z.object({
  patient: z.union([z.boolean(),z.lazy(() => PatientArgsSchema)]).optional(),
  member: z.union([z.boolean(),z.lazy(() => MemberArgsSchema)]).optional(),
}).strict()

export const AppointmentArgsSchema: z.ZodType<Prisma.AppointmentDefaultArgs> = z.object({
  select: z.lazy(() => AppointmentSelectSchema).optional(),
  include: z.lazy(() => AppointmentIncludeSchema).optional(),
}).strict();

export const AppointmentSelectSchema: z.ZodType<Prisma.AppointmentSelect> = z.object({
  id: z.boolean().optional(),
  startTime: z.boolean().optional(),
  endTime: z.boolean().optional(),
  description: z.boolean().optional(),
  status: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  patientId: z.boolean().optional(),
  memberId: z.boolean().optional(),
  patient: z.union([z.boolean(),z.lazy(() => PatientArgsSchema)]).optional(),
  member: z.union([z.boolean(),z.lazy(() => MemberArgsSchema)]).optional(),
}).strict()

// ORGANIZATION
//------------------------------------------------------

export const OrganizationIncludeSchema: z.ZodType<Prisma.OrganizationInclude> = z.object({
  owner: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  invites: z.union([z.boolean(),z.lazy(() => InviteFindManyArgsSchema)]).optional(),
  members: z.union([z.boolean(),z.lazy(() => MemberFindManyArgsSchema)]).optional(),
  patients: z.union([z.boolean(),z.lazy(() => PatientFindManyArgsSchema)]).optional(),
  financialTransactions: z.union([z.boolean(),z.lazy(() => FinancialTransactionFindManyArgsSchema)]).optional(),
  customerSatisfactions: z.union([z.boolean(),z.lazy(() => CustomerSatisfactionFindManyArgsSchema)]).optional(),
  AnamnesisTemplate: z.union([z.boolean(),z.lazy(() => AnamnesisTemplateFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => OrganizationCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const OrganizationArgsSchema: z.ZodType<Prisma.OrganizationDefaultArgs> = z.object({
  select: z.lazy(() => OrganizationSelectSchema).optional(),
  include: z.lazy(() => OrganizationIncludeSchema).optional(),
}).strict();

export const OrganizationCountOutputTypeArgsSchema: z.ZodType<Prisma.OrganizationCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => OrganizationCountOutputTypeSelectSchema).nullish(),
}).strict();

export const OrganizationCountOutputTypeSelectSchema: z.ZodType<Prisma.OrganizationCountOutputTypeSelect> = z.object({
  invites: z.boolean().optional(),
  members: z.boolean().optional(),
  patients: z.boolean().optional(),
  financialTransactions: z.boolean().optional(),
  customerSatisfactions: z.boolean().optional(),
  AnamnesisTemplate: z.boolean().optional(),
}).strict();

export const OrganizationSelectSchema: z.ZodType<Prisma.OrganizationSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  slug: z.boolean().optional(),
  domain: z.boolean().optional(),
  shouldAttachUsersByDomain: z.boolean().optional(),
  avatarUrl: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  ownerId: z.boolean().optional(),
  owner: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  invites: z.union([z.boolean(),z.lazy(() => InviteFindManyArgsSchema)]).optional(),
  members: z.union([z.boolean(),z.lazy(() => MemberFindManyArgsSchema)]).optional(),
  patients: z.union([z.boolean(),z.lazy(() => PatientFindManyArgsSchema)]).optional(),
  financialTransactions: z.union([z.boolean(),z.lazy(() => FinancialTransactionFindManyArgsSchema)]).optional(),
  customerSatisfactions: z.union([z.boolean(),z.lazy(() => CustomerSatisfactionFindManyArgsSchema)]).optional(),
  AnamnesisTemplate: z.union([z.boolean(),z.lazy(() => AnamnesisTemplateFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => OrganizationCountOutputTypeArgsSchema)]).optional(),
}).strict()

// FINANCIAL TRANSACTION
//------------------------------------------------------

export const FinancialTransactionIncludeSchema: z.ZodType<Prisma.FinancialTransactionInclude> = z.object({
  organization: z.union([z.boolean(),z.lazy(() => OrganizationArgsSchema)]).optional(),
  patient: z.union([z.boolean(),z.lazy(() => PatientArgsSchema)]).optional(),
}).strict()

export const FinancialTransactionArgsSchema: z.ZodType<Prisma.FinancialTransactionDefaultArgs> = z.object({
  select: z.lazy(() => FinancialTransactionSelectSchema).optional(),
  include: z.lazy(() => FinancialTransactionIncludeSchema).optional(),
}).strict();

export const FinancialTransactionSelectSchema: z.ZodType<Prisma.FinancialTransactionSelect> = z.object({
  id: z.boolean().optional(),
  description: z.boolean().optional(),
  amount: z.boolean().optional(),
  type: z.boolean().optional(),
  paymentMethod: z.boolean().optional(),
  date: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  organizationId: z.boolean().optional(),
  patientId: z.boolean().optional(),
  organization: z.union([z.boolean(),z.lazy(() => OrganizationArgsSchema)]).optional(),
  patient: z.union([z.boolean(),z.lazy(() => PatientArgsSchema)]).optional(),
}).strict()

// CUSTOMER SATISFACTION
//------------------------------------------------------

export const CustomerSatisfactionIncludeSchema: z.ZodType<Prisma.CustomerSatisfactionInclude> = z.object({
  patient: z.union([z.boolean(),z.lazy(() => PatientArgsSchema)]).optional(),
  organization: z.union([z.boolean(),z.lazy(() => OrganizationArgsSchema)]).optional(),
}).strict()

export const CustomerSatisfactionArgsSchema: z.ZodType<Prisma.CustomerSatisfactionDefaultArgs> = z.object({
  select: z.lazy(() => CustomerSatisfactionSelectSchema).optional(),
  include: z.lazy(() => CustomerSatisfactionIncludeSchema).optional(),
}).strict();

export const CustomerSatisfactionSelectSchema: z.ZodType<Prisma.CustomerSatisfactionSelect> = z.object({
  id: z.boolean().optional(),
  rating: z.boolean().optional(),
  comment: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  patientId: z.boolean().optional(),
  organizationId: z.boolean().optional(),
  patient: z.union([z.boolean(),z.lazy(() => PatientArgsSchema)]).optional(),
  organization: z.union([z.boolean(),z.lazy(() => OrganizationArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  passwordHash: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  avatarUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  tokens: z.lazy(() => TokenListRelationFilterSchema).optional(),
  accounts: z.lazy(() => AccountListRelationFilterSchema).optional(),
  invites: z.lazy(() => InviteListRelationFilterSchema).optional(),
  member_on: z.lazy(() => MemberListRelationFilterSchema).optional(),
  owns_organizations: z.lazy(() => OrganizationListRelationFilterSchema).optional()
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  passwordHash: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  avatarUrl: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  tokens: z.lazy(() => TokenOrderByRelationAggregateInputSchema).optional(),
  accounts: z.lazy(() => AccountOrderByRelationAggregateInputSchema).optional(),
  invites: z.lazy(() => InviteOrderByRelationAggregateInputSchema).optional(),
  member_on: z.lazy(() => MemberOrderByRelationAggregateInputSchema).optional(),
  owns_organizations: z.lazy(() => OrganizationOrderByRelationAggregateInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    email: z.string()
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    email: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  email: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  passwordHash: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  avatarUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  tokens: z.lazy(() => TokenListRelationFilterSchema).optional(),
  accounts: z.lazy(() => AccountListRelationFilterSchema).optional(),
  invites: z.lazy(() => InviteListRelationFilterSchema).optional(),
  member_on: z.lazy(() => MemberListRelationFilterSchema).optional(),
  owns_organizations: z.lazy(() => OrganizationListRelationFilterSchema).optional()
}).strict());

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  passwordHash: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  avatarUrl: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  passwordHash: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  avatarUrl: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const TokenWhereInputSchema: z.ZodType<Prisma.TokenWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TokenWhereInputSchema),z.lazy(() => TokenWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TokenWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TokenWhereInputSchema),z.lazy(() => TokenWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumTokenTypeFilterSchema),z.lazy(() => TokenTypeSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const TokenOrderByWithRelationInputSchema: z.ZodType<Prisma.TokenOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const TokenWhereUniqueInputSchema: z.ZodType<Prisma.TokenWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => TokenWhereInputSchema),z.lazy(() => TokenWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TokenWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TokenWhereInputSchema),z.lazy(() => TokenWhereInputSchema).array() ]).optional(),
  type: z.union([ z.lazy(() => EnumTokenTypeFilterSchema),z.lazy(() => TokenTypeSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const TokenOrderByWithAggregationInputSchema: z.ZodType<Prisma.TokenOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => TokenCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => TokenMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => TokenMinOrderByAggregateInputSchema).optional()
}).strict();

export const TokenScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TokenScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => TokenScalarWhereWithAggregatesInputSchema),z.lazy(() => TokenScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => TokenScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TokenScalarWhereWithAggregatesInputSchema),z.lazy(() => TokenScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumTokenTypeWithAggregatesFilterSchema),z.lazy(() => TokenTypeSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const AccountWhereInputSchema: z.ZodType<Prisma.AccountWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  provider: z.union([ z.lazy(() => EnumAccountProviderFilterSchema),z.lazy(() => AccountProviderSchema) ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const AccountOrderByWithRelationInputSchema: z.ZodType<Prisma.AccountOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const AccountWhereUniqueInputSchema: z.ZodType<Prisma.AccountWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    providerAccountId: z.string(),
    provider_userId: z.lazy(() => AccountProviderUserIdCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.string(),
    providerAccountId: z.string(),
  }),
  z.object({
    id: z.string(),
    provider_userId: z.lazy(() => AccountProviderUserIdCompoundUniqueInputSchema),
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    providerAccountId: z.string(),
    provider_userId: z.lazy(() => AccountProviderUserIdCompoundUniqueInputSchema),
  }),
  z.object({
    providerAccountId: z.string(),
  }),
  z.object({
    provider_userId: z.lazy(() => AccountProviderUserIdCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.string().optional(),
  providerAccountId: z.string().optional(),
  provider_userId: z.lazy(() => AccountProviderUserIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  provider: z.union([ z.lazy(() => EnumAccountProviderFilterSchema),z.lazy(() => AccountProviderSchema) ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const AccountOrderByWithAggregationInputSchema: z.ZodType<Prisma.AccountOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => AccountCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AccountMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AccountMinOrderByAggregateInputSchema).optional()
}).strict();

export const AccountScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AccountScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => AccountScalarWhereWithAggregatesInputSchema),z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountScalarWhereWithAggregatesInputSchema),z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  provider: z.union([ z.lazy(() => EnumAccountProviderWithAggregatesFilterSchema),z.lazy(() => AccountProviderSchema) ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const InviteWhereInputSchema: z.ZodType<Prisma.InviteWhereInput> = z.object({
  AND: z.union([ z.lazy(() => InviteWhereInputSchema),z.lazy(() => InviteWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => InviteWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => InviteWhereInputSchema),z.lazy(() => InviteWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  role: z.union([ z.lazy(() => EnumRoleFilterSchema),z.lazy(() => RoleSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  authorId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  organizationId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  author: z.union([ z.lazy(() => UserNullableRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
  organization: z.union([ z.lazy(() => OrganizationRelationFilterSchema),z.lazy(() => OrganizationWhereInputSchema) ]).optional(),
}).strict();

export const InviteOrderByWithRelationInputSchema: z.ZodType<Prisma.InviteOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  organizationId: z.lazy(() => SortOrderSchema).optional(),
  author: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  organization: z.lazy(() => OrganizationOrderByWithRelationInputSchema).optional()
}).strict();

export const InviteWhereUniqueInputSchema: z.ZodType<Prisma.InviteWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    email_organizationId: z.lazy(() => InviteEmailOrganizationIdCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    email_organizationId: z.lazy(() => InviteEmailOrganizationIdCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.string().optional(),
  email_organizationId: z.lazy(() => InviteEmailOrganizationIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => InviteWhereInputSchema),z.lazy(() => InviteWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => InviteWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => InviteWhereInputSchema),z.lazy(() => InviteWhereInputSchema).array() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  role: z.union([ z.lazy(() => EnumRoleFilterSchema),z.lazy(() => RoleSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  authorId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  organizationId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  author: z.union([ z.lazy(() => UserNullableRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
  organization: z.union([ z.lazy(() => OrganizationRelationFilterSchema),z.lazy(() => OrganizationWhereInputSchema) ]).optional(),
}).strict());

export const InviteOrderByWithAggregationInputSchema: z.ZodType<Prisma.InviteOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  organizationId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => InviteCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => InviteMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => InviteMinOrderByAggregateInputSchema).optional()
}).strict();

export const InviteScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.InviteScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => InviteScalarWhereWithAggregatesInputSchema),z.lazy(() => InviteScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => InviteScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => InviteScalarWhereWithAggregatesInputSchema),z.lazy(() => InviteScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  role: z.union([ z.lazy(() => EnumRoleWithAggregatesFilterSchema),z.lazy(() => RoleSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  authorId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  organizationId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const MemberWhereInputSchema: z.ZodType<Prisma.MemberWhereInput> = z.object({
  AND: z.union([ z.lazy(() => MemberWhereInputSchema),z.lazy(() => MemberWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MemberWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MemberWhereInputSchema),z.lazy(() => MemberWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  role: z.union([ z.lazy(() => EnumRoleFilterSchema),z.lazy(() => RoleSchema) ]).optional(),
  specialty: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  organizationId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  organization: z.union([ z.lazy(() => OrganizationRelationFilterSchema),z.lazy(() => OrganizationWhereInputSchema) ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  appointments: z.lazy(() => AppointmentListRelationFilterSchema).optional()
}).strict();

export const MemberOrderByWithRelationInputSchema: z.ZodType<Prisma.MemberOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  specialty: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  organizationId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  organization: z.lazy(() => OrganizationOrderByWithRelationInputSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  appointments: z.lazy(() => AppointmentOrderByRelationAggregateInputSchema).optional()
}).strict();

export const MemberWhereUniqueInputSchema: z.ZodType<Prisma.MemberWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    organizationId_userId: z.lazy(() => MemberOrganizationIdUserIdCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    organizationId_userId: z.lazy(() => MemberOrganizationIdUserIdCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.string().optional(),
  organizationId_userId: z.lazy(() => MemberOrganizationIdUserIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => MemberWhereInputSchema),z.lazy(() => MemberWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MemberWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MemberWhereInputSchema),z.lazy(() => MemberWhereInputSchema).array() ]).optional(),
  role: z.union([ z.lazy(() => EnumRoleFilterSchema),z.lazy(() => RoleSchema) ]).optional(),
  specialty: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  organizationId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  organization: z.union([ z.lazy(() => OrganizationRelationFilterSchema),z.lazy(() => OrganizationWhereInputSchema) ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  appointments: z.lazy(() => AppointmentListRelationFilterSchema).optional()
}).strict());

export const MemberOrderByWithAggregationInputSchema: z.ZodType<Prisma.MemberOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  specialty: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  organizationId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => MemberCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => MemberMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => MemberMinOrderByAggregateInputSchema).optional()
}).strict();

export const MemberScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.MemberScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => MemberScalarWhereWithAggregatesInputSchema),z.lazy(() => MemberScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => MemberScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MemberScalarWhereWithAggregatesInputSchema),z.lazy(() => MemberScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  role: z.union([ z.lazy(() => EnumRoleWithAggregatesFilterSchema),z.lazy(() => RoleSchema) ]).optional(),
  specialty: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  organizationId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const PatientWhereInputSchema: z.ZodType<Prisma.PatientWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PatientWhereInputSchema),z.lazy(() => PatientWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PatientWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PatientWhereInputSchema),z.lazy(() => PatientWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  phone: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  birthDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  address: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  organizationId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  organization: z.union([ z.lazy(() => OrganizationRelationFilterSchema),z.lazy(() => OrganizationWhereInputSchema) ]).optional(),
  medicalRecord: z.union([ z.lazy(() => MedicalRecordNullableRelationFilterSchema),z.lazy(() => MedicalRecordWhereInputSchema) ]).optional().nullable(),
  appointments: z.lazy(() => AppointmentListRelationFilterSchema).optional(),
  FinancialTransaction: z.lazy(() => FinancialTransactionListRelationFilterSchema).optional(),
  CustomerSatisfaction: z.lazy(() => CustomerSatisfactionListRelationFilterSchema).optional(),
  PatientAnamnesis: z.lazy(() => PatientAnamnesisListRelationFilterSchema).optional()
}).strict();

export const PatientOrderByWithRelationInputSchema: z.ZodType<Prisma.PatientOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  phone: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  birthDate: z.lazy(() => SortOrderSchema).optional(),
  address: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  organizationId: z.lazy(() => SortOrderSchema).optional(),
  organization: z.lazy(() => OrganizationOrderByWithRelationInputSchema).optional(),
  medicalRecord: z.lazy(() => MedicalRecordOrderByWithRelationInputSchema).optional(),
  appointments: z.lazy(() => AppointmentOrderByRelationAggregateInputSchema).optional(),
  FinancialTransaction: z.lazy(() => FinancialTransactionOrderByRelationAggregateInputSchema).optional(),
  CustomerSatisfaction: z.lazy(() => CustomerSatisfactionOrderByRelationAggregateInputSchema).optional(),
  PatientAnamnesis: z.lazy(() => PatientAnamnesisOrderByRelationAggregateInputSchema).optional()
}).strict();

export const PatientWhereUniqueInputSchema: z.ZodType<Prisma.PatientWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    email: z.string()
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    email: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  email: z.string().optional(),
  AND: z.union([ z.lazy(() => PatientWhereInputSchema),z.lazy(() => PatientWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PatientWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PatientWhereInputSchema),z.lazy(() => PatientWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  phone: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  birthDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  address: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  organizationId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  organization: z.union([ z.lazy(() => OrganizationRelationFilterSchema),z.lazy(() => OrganizationWhereInputSchema) ]).optional(),
  medicalRecord: z.union([ z.lazy(() => MedicalRecordNullableRelationFilterSchema),z.lazy(() => MedicalRecordWhereInputSchema) ]).optional().nullable(),
  appointments: z.lazy(() => AppointmentListRelationFilterSchema).optional(),
  FinancialTransaction: z.lazy(() => FinancialTransactionListRelationFilterSchema).optional(),
  CustomerSatisfaction: z.lazy(() => CustomerSatisfactionListRelationFilterSchema).optional(),
  PatientAnamnesis: z.lazy(() => PatientAnamnesisListRelationFilterSchema).optional()
}).strict());

export const PatientOrderByWithAggregationInputSchema: z.ZodType<Prisma.PatientOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  phone: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  birthDate: z.lazy(() => SortOrderSchema).optional(),
  address: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  organizationId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => PatientCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PatientMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PatientMinOrderByAggregateInputSchema).optional()
}).strict();

export const PatientScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PatientScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PatientScalarWhereWithAggregatesInputSchema),z.lazy(() => PatientScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PatientScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PatientScalarWhereWithAggregatesInputSchema),z.lazy(() => PatientScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  phone: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  birthDate: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  address: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  organizationId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const MedicalRecordWhereInputSchema: z.ZodType<Prisma.MedicalRecordWhereInput> = z.object({
  AND: z.union([ z.lazy(() => MedicalRecordWhereInputSchema),z.lazy(() => MedicalRecordWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MedicalRecordWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MedicalRecordWhereInputSchema),z.lazy(() => MedicalRecordWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  patientId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  patient: z.union([ z.lazy(() => PatientRelationFilterSchema),z.lazy(() => PatientWhereInputSchema) ]).optional(),
  anamneses: z.lazy(() => AnamnesisListRelationFilterSchema).optional()
}).strict();

export const MedicalRecordOrderByWithRelationInputSchema: z.ZodType<Prisma.MedicalRecordOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  patientId: z.lazy(() => SortOrderSchema).optional(),
  patient: z.lazy(() => PatientOrderByWithRelationInputSchema).optional(),
  anamneses: z.lazy(() => AnamnesisOrderByRelationAggregateInputSchema).optional()
}).strict();

export const MedicalRecordWhereUniqueInputSchema: z.ZodType<Prisma.MedicalRecordWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    patientId: z.string()
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    patientId: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  patientId: z.string().optional(),
  AND: z.union([ z.lazy(() => MedicalRecordWhereInputSchema),z.lazy(() => MedicalRecordWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MedicalRecordWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MedicalRecordWhereInputSchema),z.lazy(() => MedicalRecordWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  patient: z.union([ z.lazy(() => PatientRelationFilterSchema),z.lazy(() => PatientWhereInputSchema) ]).optional(),
  anamneses: z.lazy(() => AnamnesisListRelationFilterSchema).optional()
}).strict());

export const MedicalRecordOrderByWithAggregationInputSchema: z.ZodType<Prisma.MedicalRecordOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  patientId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => MedicalRecordCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => MedicalRecordMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => MedicalRecordMinOrderByAggregateInputSchema).optional()
}).strict();

export const MedicalRecordScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.MedicalRecordScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => MedicalRecordScalarWhereWithAggregatesInputSchema),z.lazy(() => MedicalRecordScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => MedicalRecordScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MedicalRecordScalarWhereWithAggregatesInputSchema),z.lazy(() => MedicalRecordScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  patientId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const AnamnesisWhereInputSchema: z.ZodType<Prisma.AnamnesisWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AnamnesisWhereInputSchema),z.lazy(() => AnamnesisWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AnamnesisWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AnamnesisWhereInputSchema),z.lazy(() => AnamnesisWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  medicalRecordId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  templateId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  medicalRecord: z.union([ z.lazy(() => MedicalRecordRelationFilterSchema),z.lazy(() => MedicalRecordWhereInputSchema) ]).optional(),
  template: z.union([ z.lazy(() => AnamnesisTemplateRelationFilterSchema),z.lazy(() => AnamnesisTemplateWhereInputSchema) ]).optional(),
  answers: z.lazy(() => AnamnesisAnswerListRelationFilterSchema).optional()
}).strict();

export const AnamnesisOrderByWithRelationInputSchema: z.ZodType<Prisma.AnamnesisOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  medicalRecordId: z.lazy(() => SortOrderSchema).optional(),
  templateId: z.lazy(() => SortOrderSchema).optional(),
  medicalRecord: z.lazy(() => MedicalRecordOrderByWithRelationInputSchema).optional(),
  template: z.lazy(() => AnamnesisTemplateOrderByWithRelationInputSchema).optional(),
  answers: z.lazy(() => AnamnesisAnswerOrderByRelationAggregateInputSchema).optional()
}).strict();

export const AnamnesisWhereUniqueInputSchema: z.ZodType<Prisma.AnamnesisWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => AnamnesisWhereInputSchema),z.lazy(() => AnamnesisWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AnamnesisWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AnamnesisWhereInputSchema),z.lazy(() => AnamnesisWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  medicalRecordId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  templateId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  medicalRecord: z.union([ z.lazy(() => MedicalRecordRelationFilterSchema),z.lazy(() => MedicalRecordWhereInputSchema) ]).optional(),
  template: z.union([ z.lazy(() => AnamnesisTemplateRelationFilterSchema),z.lazy(() => AnamnesisTemplateWhereInputSchema) ]).optional(),
  answers: z.lazy(() => AnamnesisAnswerListRelationFilterSchema).optional()
}).strict());

export const AnamnesisOrderByWithAggregationInputSchema: z.ZodType<Prisma.AnamnesisOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  medicalRecordId: z.lazy(() => SortOrderSchema).optional(),
  templateId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => AnamnesisCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AnamnesisMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AnamnesisMinOrderByAggregateInputSchema).optional()
}).strict();

export const AnamnesisScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AnamnesisScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => AnamnesisScalarWhereWithAggregatesInputSchema),z.lazy(() => AnamnesisScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AnamnesisScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AnamnesisScalarWhereWithAggregatesInputSchema),z.lazy(() => AnamnesisScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  medicalRecordId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  templateId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const AnamnesisTemplateWhereInputSchema: z.ZodType<Prisma.AnamnesisTemplateWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AnamnesisTemplateWhereInputSchema),z.lazy(() => AnamnesisTemplateWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AnamnesisTemplateWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AnamnesisTemplateWhereInputSchema),z.lazy(() => AnamnesisTemplateWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  organizationId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  organization: z.union([ z.lazy(() => OrganizationRelationFilterSchema),z.lazy(() => OrganizationWhereInputSchema) ]).optional(),
  questions: z.lazy(() => AnamnesisQuestionListRelationFilterSchema).optional(),
  patientAnamneses: z.lazy(() => PatientAnamnesisListRelationFilterSchema).optional(),
  Anamnesis: z.lazy(() => AnamnesisListRelationFilterSchema).optional()
}).strict();

export const AnamnesisTemplateOrderByWithRelationInputSchema: z.ZodType<Prisma.AnamnesisTemplateOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  organizationId: z.lazy(() => SortOrderSchema).optional(),
  organization: z.lazy(() => OrganizationOrderByWithRelationInputSchema).optional(),
  questions: z.lazy(() => AnamnesisQuestionOrderByRelationAggregateInputSchema).optional(),
  patientAnamneses: z.lazy(() => PatientAnamnesisOrderByRelationAggregateInputSchema).optional(),
  Anamnesis: z.lazy(() => AnamnesisOrderByRelationAggregateInputSchema).optional()
}).strict();

export const AnamnesisTemplateWhereUniqueInputSchema: z.ZodType<Prisma.AnamnesisTemplateWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => AnamnesisTemplateWhereInputSchema),z.lazy(() => AnamnesisTemplateWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AnamnesisTemplateWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AnamnesisTemplateWhereInputSchema),z.lazy(() => AnamnesisTemplateWhereInputSchema).array() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  organizationId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  organization: z.union([ z.lazy(() => OrganizationRelationFilterSchema),z.lazy(() => OrganizationWhereInputSchema) ]).optional(),
  questions: z.lazy(() => AnamnesisQuestionListRelationFilterSchema).optional(),
  patientAnamneses: z.lazy(() => PatientAnamnesisListRelationFilterSchema).optional(),
  Anamnesis: z.lazy(() => AnamnesisListRelationFilterSchema).optional()
}).strict());

export const AnamnesisTemplateOrderByWithAggregationInputSchema: z.ZodType<Prisma.AnamnesisTemplateOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  organizationId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => AnamnesisTemplateCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AnamnesisTemplateMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AnamnesisTemplateMinOrderByAggregateInputSchema).optional()
}).strict();

export const AnamnesisTemplateScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AnamnesisTemplateScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => AnamnesisTemplateScalarWhereWithAggregatesInputSchema),z.lazy(() => AnamnesisTemplateScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AnamnesisTemplateScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AnamnesisTemplateScalarWhereWithAggregatesInputSchema),z.lazy(() => AnamnesisTemplateScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  organizationId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const AnamnesisQuestionWhereInputSchema: z.ZodType<Prisma.AnamnesisQuestionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AnamnesisQuestionWhereInputSchema),z.lazy(() => AnamnesisQuestionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AnamnesisQuestionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AnamnesisQuestionWhereInputSchema),z.lazy(() => AnamnesisQuestionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  question: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumQuestionTypeFilterSchema),z.lazy(() => QuestionTypeSchema) ]).optional(),
  templateId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  template: z.union([ z.lazy(() => AnamnesisTemplateRelationFilterSchema),z.lazy(() => AnamnesisTemplateWhereInputSchema) ]).optional(),
  answers: z.lazy(() => AnamnesisAnswerListRelationFilterSchema).optional()
}).strict();

export const AnamnesisQuestionOrderByWithRelationInputSchema: z.ZodType<Prisma.AnamnesisQuestionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  question: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  templateId: z.lazy(() => SortOrderSchema).optional(),
  template: z.lazy(() => AnamnesisTemplateOrderByWithRelationInputSchema).optional(),
  answers: z.lazy(() => AnamnesisAnswerOrderByRelationAggregateInputSchema).optional()
}).strict();

export const AnamnesisQuestionWhereUniqueInputSchema: z.ZodType<Prisma.AnamnesisQuestionWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => AnamnesisQuestionWhereInputSchema),z.lazy(() => AnamnesisQuestionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AnamnesisQuestionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AnamnesisQuestionWhereInputSchema),z.lazy(() => AnamnesisQuestionWhereInputSchema).array() ]).optional(),
  question: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumQuestionTypeFilterSchema),z.lazy(() => QuestionTypeSchema) ]).optional(),
  templateId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  template: z.union([ z.lazy(() => AnamnesisTemplateRelationFilterSchema),z.lazy(() => AnamnesisTemplateWhereInputSchema) ]).optional(),
  answers: z.lazy(() => AnamnesisAnswerListRelationFilterSchema).optional()
}).strict());

export const AnamnesisQuestionOrderByWithAggregationInputSchema: z.ZodType<Prisma.AnamnesisQuestionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  question: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  templateId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => AnamnesisQuestionCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AnamnesisQuestionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AnamnesisQuestionMinOrderByAggregateInputSchema).optional()
}).strict();

export const AnamnesisQuestionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AnamnesisQuestionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => AnamnesisQuestionScalarWhereWithAggregatesInputSchema),z.lazy(() => AnamnesisQuestionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AnamnesisQuestionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AnamnesisQuestionScalarWhereWithAggregatesInputSchema),z.lazy(() => AnamnesisQuestionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  question: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumQuestionTypeWithAggregatesFilterSchema),z.lazy(() => QuestionTypeSchema) ]).optional(),
  templateId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const PatientAnamnesisWhereInputSchema: z.ZodType<Prisma.PatientAnamnesisWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PatientAnamnesisWhereInputSchema),z.lazy(() => PatientAnamnesisWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PatientAnamnesisWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PatientAnamnesisWhereInputSchema),z.lazy(() => PatientAnamnesisWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  patientId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  templateId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  patient: z.union([ z.lazy(() => PatientRelationFilterSchema),z.lazy(() => PatientWhereInputSchema) ]).optional(),
  template: z.union([ z.lazy(() => AnamnesisTemplateRelationFilterSchema),z.lazy(() => AnamnesisTemplateWhereInputSchema) ]).optional(),
  answers: z.lazy(() => AnamnesisAnswerListRelationFilterSchema).optional()
}).strict();

export const PatientAnamnesisOrderByWithRelationInputSchema: z.ZodType<Prisma.PatientAnamnesisOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  patientId: z.lazy(() => SortOrderSchema).optional(),
  templateId: z.lazy(() => SortOrderSchema).optional(),
  patient: z.lazy(() => PatientOrderByWithRelationInputSchema).optional(),
  template: z.lazy(() => AnamnesisTemplateOrderByWithRelationInputSchema).optional(),
  answers: z.lazy(() => AnamnesisAnswerOrderByRelationAggregateInputSchema).optional()
}).strict();

export const PatientAnamnesisWhereUniqueInputSchema: z.ZodType<Prisma.PatientAnamnesisWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => PatientAnamnesisWhereInputSchema),z.lazy(() => PatientAnamnesisWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PatientAnamnesisWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PatientAnamnesisWhereInputSchema),z.lazy(() => PatientAnamnesisWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  patientId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  templateId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  patient: z.union([ z.lazy(() => PatientRelationFilterSchema),z.lazy(() => PatientWhereInputSchema) ]).optional(),
  template: z.union([ z.lazy(() => AnamnesisTemplateRelationFilterSchema),z.lazy(() => AnamnesisTemplateWhereInputSchema) ]).optional(),
  answers: z.lazy(() => AnamnesisAnswerListRelationFilterSchema).optional()
}).strict());

export const PatientAnamnesisOrderByWithAggregationInputSchema: z.ZodType<Prisma.PatientAnamnesisOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  patientId: z.lazy(() => SortOrderSchema).optional(),
  templateId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => PatientAnamnesisCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PatientAnamnesisMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PatientAnamnesisMinOrderByAggregateInputSchema).optional()
}).strict();

export const PatientAnamnesisScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PatientAnamnesisScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PatientAnamnesisScalarWhereWithAggregatesInputSchema),z.lazy(() => PatientAnamnesisScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PatientAnamnesisScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PatientAnamnesisScalarWhereWithAggregatesInputSchema),z.lazy(() => PatientAnamnesisScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  patientId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  templateId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const AnamnesisAnswerWhereInputSchema: z.ZodType<Prisma.AnamnesisAnswerWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AnamnesisAnswerWhereInputSchema),z.lazy(() => AnamnesisAnswerWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AnamnesisAnswerWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AnamnesisAnswerWhereInputSchema),z.lazy(() => AnamnesisAnswerWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  answer: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  questionId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  patientAnamnesisId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  anamnesisId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  question: z.union([ z.lazy(() => AnamnesisQuestionRelationFilterSchema),z.lazy(() => AnamnesisQuestionWhereInputSchema) ]).optional(),
  patientAnamnesis: z.union([ z.lazy(() => PatientAnamnesisRelationFilterSchema),z.lazy(() => PatientAnamnesisWhereInputSchema) ]).optional(),
  Anamnesis: z.union([ z.lazy(() => AnamnesisNullableRelationFilterSchema),z.lazy(() => AnamnesisWhereInputSchema) ]).optional().nullable(),
}).strict();

export const AnamnesisAnswerOrderByWithRelationInputSchema: z.ZodType<Prisma.AnamnesisAnswerOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  answer: z.lazy(() => SortOrderSchema).optional(),
  questionId: z.lazy(() => SortOrderSchema).optional(),
  patientAnamnesisId: z.lazy(() => SortOrderSchema).optional(),
  anamnesisId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  question: z.lazy(() => AnamnesisQuestionOrderByWithRelationInputSchema).optional(),
  patientAnamnesis: z.lazy(() => PatientAnamnesisOrderByWithRelationInputSchema).optional(),
  Anamnesis: z.lazy(() => AnamnesisOrderByWithRelationInputSchema).optional()
}).strict();

export const AnamnesisAnswerWhereUniqueInputSchema: z.ZodType<Prisma.AnamnesisAnswerWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => AnamnesisAnswerWhereInputSchema),z.lazy(() => AnamnesisAnswerWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AnamnesisAnswerWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AnamnesisAnswerWhereInputSchema),z.lazy(() => AnamnesisAnswerWhereInputSchema).array() ]).optional(),
  answer: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  questionId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  patientAnamnesisId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  anamnesisId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  question: z.union([ z.lazy(() => AnamnesisQuestionRelationFilterSchema),z.lazy(() => AnamnesisQuestionWhereInputSchema) ]).optional(),
  patientAnamnesis: z.union([ z.lazy(() => PatientAnamnesisRelationFilterSchema),z.lazy(() => PatientAnamnesisWhereInputSchema) ]).optional(),
  Anamnesis: z.union([ z.lazy(() => AnamnesisNullableRelationFilterSchema),z.lazy(() => AnamnesisWhereInputSchema) ]).optional().nullable(),
}).strict());

export const AnamnesisAnswerOrderByWithAggregationInputSchema: z.ZodType<Prisma.AnamnesisAnswerOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  answer: z.lazy(() => SortOrderSchema).optional(),
  questionId: z.lazy(() => SortOrderSchema).optional(),
  patientAnamnesisId: z.lazy(() => SortOrderSchema).optional(),
  anamnesisId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => AnamnesisAnswerCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AnamnesisAnswerMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AnamnesisAnswerMinOrderByAggregateInputSchema).optional()
}).strict();

export const AnamnesisAnswerScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AnamnesisAnswerScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => AnamnesisAnswerScalarWhereWithAggregatesInputSchema),z.lazy(() => AnamnesisAnswerScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AnamnesisAnswerScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AnamnesisAnswerScalarWhereWithAggregatesInputSchema),z.lazy(() => AnamnesisAnswerScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  answer: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  questionId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  patientAnamnesisId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  anamnesisId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const AppointmentWhereInputSchema: z.ZodType<Prisma.AppointmentWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AppointmentWhereInputSchema),z.lazy(() => AppointmentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AppointmentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AppointmentWhereInputSchema),z.lazy(() => AppointmentWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  startTime: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  endTime: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumAppointmentStatusFilterSchema),z.lazy(() => AppointmentStatusSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  patientId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  memberId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  patient: z.union([ z.lazy(() => PatientRelationFilterSchema),z.lazy(() => PatientWhereInputSchema) ]).optional(),
  member: z.union([ z.lazy(() => MemberRelationFilterSchema),z.lazy(() => MemberWhereInputSchema) ]).optional(),
}).strict();

export const AppointmentOrderByWithRelationInputSchema: z.ZodType<Prisma.AppointmentOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  startTime: z.lazy(() => SortOrderSchema).optional(),
  endTime: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  patientId: z.lazy(() => SortOrderSchema).optional(),
  memberId: z.lazy(() => SortOrderSchema).optional(),
  patient: z.lazy(() => PatientOrderByWithRelationInputSchema).optional(),
  member: z.lazy(() => MemberOrderByWithRelationInputSchema).optional()
}).strict();

export const AppointmentWhereUniqueInputSchema: z.ZodType<Prisma.AppointmentWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => AppointmentWhereInputSchema),z.lazy(() => AppointmentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AppointmentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AppointmentWhereInputSchema),z.lazy(() => AppointmentWhereInputSchema).array() ]).optional(),
  startTime: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  endTime: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumAppointmentStatusFilterSchema),z.lazy(() => AppointmentStatusSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  patientId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  memberId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  patient: z.union([ z.lazy(() => PatientRelationFilterSchema),z.lazy(() => PatientWhereInputSchema) ]).optional(),
  member: z.union([ z.lazy(() => MemberRelationFilterSchema),z.lazy(() => MemberWhereInputSchema) ]).optional(),
}).strict());

export const AppointmentOrderByWithAggregationInputSchema: z.ZodType<Prisma.AppointmentOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  startTime: z.lazy(() => SortOrderSchema).optional(),
  endTime: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  patientId: z.lazy(() => SortOrderSchema).optional(),
  memberId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => AppointmentCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AppointmentMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AppointmentMinOrderByAggregateInputSchema).optional()
}).strict();

export const AppointmentScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AppointmentScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => AppointmentScalarWhereWithAggregatesInputSchema),z.lazy(() => AppointmentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AppointmentScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AppointmentScalarWhereWithAggregatesInputSchema),z.lazy(() => AppointmentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  startTime: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  endTime: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumAppointmentStatusWithAggregatesFilterSchema),z.lazy(() => AppointmentStatusSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  patientId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  memberId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const OrganizationWhereInputSchema: z.ZodType<Prisma.OrganizationWhereInput> = z.object({
  AND: z.union([ z.lazy(() => OrganizationWhereInputSchema),z.lazy(() => OrganizationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => OrganizationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => OrganizationWhereInputSchema),z.lazy(() => OrganizationWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  slug: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  domain: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  shouldAttachUsersByDomain: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  avatarUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  ownerId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  owner: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  invites: z.lazy(() => InviteListRelationFilterSchema).optional(),
  members: z.lazy(() => MemberListRelationFilterSchema).optional(),
  patients: z.lazy(() => PatientListRelationFilterSchema).optional(),
  financialTransactions: z.lazy(() => FinancialTransactionListRelationFilterSchema).optional(),
  customerSatisfactions: z.lazy(() => CustomerSatisfactionListRelationFilterSchema).optional(),
  AnamnesisTemplate: z.lazy(() => AnamnesisTemplateListRelationFilterSchema).optional()
}).strict();

export const OrganizationOrderByWithRelationInputSchema: z.ZodType<Prisma.OrganizationOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  domain: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  shouldAttachUsersByDomain: z.lazy(() => SortOrderSchema).optional(),
  avatarUrl: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  ownerId: z.lazy(() => SortOrderSchema).optional(),
  owner: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  invites: z.lazy(() => InviteOrderByRelationAggregateInputSchema).optional(),
  members: z.lazy(() => MemberOrderByRelationAggregateInputSchema).optional(),
  patients: z.lazy(() => PatientOrderByRelationAggregateInputSchema).optional(),
  financialTransactions: z.lazy(() => FinancialTransactionOrderByRelationAggregateInputSchema).optional(),
  customerSatisfactions: z.lazy(() => CustomerSatisfactionOrderByRelationAggregateInputSchema).optional(),
  AnamnesisTemplate: z.lazy(() => AnamnesisTemplateOrderByRelationAggregateInputSchema).optional()
}).strict();

export const OrganizationWhereUniqueInputSchema: z.ZodType<Prisma.OrganizationWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    slug: z.string(),
    domain: z.string()
  }),
  z.object({
    id: z.string(),
    slug: z.string(),
  }),
  z.object({
    id: z.string(),
    domain: z.string(),
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    slug: z.string(),
    domain: z.string(),
  }),
  z.object({
    slug: z.string(),
  }),
  z.object({
    domain: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  slug: z.string().optional(),
  domain: z.string().optional(),
  AND: z.union([ z.lazy(() => OrganizationWhereInputSchema),z.lazy(() => OrganizationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => OrganizationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => OrganizationWhereInputSchema),z.lazy(() => OrganizationWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  shouldAttachUsersByDomain: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  avatarUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  ownerId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  owner: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  invites: z.lazy(() => InviteListRelationFilterSchema).optional(),
  members: z.lazy(() => MemberListRelationFilterSchema).optional(),
  patients: z.lazy(() => PatientListRelationFilterSchema).optional(),
  financialTransactions: z.lazy(() => FinancialTransactionListRelationFilterSchema).optional(),
  customerSatisfactions: z.lazy(() => CustomerSatisfactionListRelationFilterSchema).optional(),
  AnamnesisTemplate: z.lazy(() => AnamnesisTemplateListRelationFilterSchema).optional()
}).strict());

export const OrganizationOrderByWithAggregationInputSchema: z.ZodType<Prisma.OrganizationOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  domain: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  shouldAttachUsersByDomain: z.lazy(() => SortOrderSchema).optional(),
  avatarUrl: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  ownerId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => OrganizationCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => OrganizationMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => OrganizationMinOrderByAggregateInputSchema).optional()
}).strict();

export const OrganizationScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.OrganizationScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => OrganizationScalarWhereWithAggregatesInputSchema),z.lazy(() => OrganizationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => OrganizationScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => OrganizationScalarWhereWithAggregatesInputSchema),z.lazy(() => OrganizationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  slug: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  domain: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  shouldAttachUsersByDomain: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  avatarUrl: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  ownerId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const FinancialTransactionWhereInputSchema: z.ZodType<Prisma.FinancialTransactionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => FinancialTransactionWhereInputSchema),z.lazy(() => FinancialTransactionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FinancialTransactionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FinancialTransactionWhereInputSchema),z.lazy(() => FinancialTransactionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  amount: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumTransactionTypeFilterSchema),z.lazy(() => TransactionTypeSchema) ]).optional(),
  paymentMethod: z.union([ z.lazy(() => EnumPaymentMethodFilterSchema),z.lazy(() => PaymentMethodSchema) ]).optional(),
  date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  organizationId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  patientId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  organization: z.union([ z.lazy(() => OrganizationRelationFilterSchema),z.lazy(() => OrganizationWhereInputSchema) ]).optional(),
  patient: z.union([ z.lazy(() => PatientNullableRelationFilterSchema),z.lazy(() => PatientWhereInputSchema) ]).optional().nullable(),
}).strict();

export const FinancialTransactionOrderByWithRelationInputSchema: z.ZodType<Prisma.FinancialTransactionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  paymentMethod: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  organizationId: z.lazy(() => SortOrderSchema).optional(),
  patientId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  organization: z.lazy(() => OrganizationOrderByWithRelationInputSchema).optional(),
  patient: z.lazy(() => PatientOrderByWithRelationInputSchema).optional()
}).strict();

export const FinancialTransactionWhereUniqueInputSchema: z.ZodType<Prisma.FinancialTransactionWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => FinancialTransactionWhereInputSchema),z.lazy(() => FinancialTransactionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FinancialTransactionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FinancialTransactionWhereInputSchema),z.lazy(() => FinancialTransactionWhereInputSchema).array() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  amount: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumTransactionTypeFilterSchema),z.lazy(() => TransactionTypeSchema) ]).optional(),
  paymentMethod: z.union([ z.lazy(() => EnumPaymentMethodFilterSchema),z.lazy(() => PaymentMethodSchema) ]).optional(),
  date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  organizationId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  patientId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  organization: z.union([ z.lazy(() => OrganizationRelationFilterSchema),z.lazy(() => OrganizationWhereInputSchema) ]).optional(),
  patient: z.union([ z.lazy(() => PatientNullableRelationFilterSchema),z.lazy(() => PatientWhereInputSchema) ]).optional().nullable(),
}).strict());

export const FinancialTransactionOrderByWithAggregationInputSchema: z.ZodType<Prisma.FinancialTransactionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  paymentMethod: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  organizationId: z.lazy(() => SortOrderSchema).optional(),
  patientId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => FinancialTransactionCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => FinancialTransactionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => FinancialTransactionMinOrderByAggregateInputSchema).optional()
}).strict();

export const FinancialTransactionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.FinancialTransactionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => FinancialTransactionScalarWhereWithAggregatesInputSchema),z.lazy(() => FinancialTransactionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => FinancialTransactionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FinancialTransactionScalarWhereWithAggregatesInputSchema),z.lazy(() => FinancialTransactionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  amount: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumTransactionTypeWithAggregatesFilterSchema),z.lazy(() => TransactionTypeSchema) ]).optional(),
  paymentMethod: z.union([ z.lazy(() => EnumPaymentMethodWithAggregatesFilterSchema),z.lazy(() => PaymentMethodSchema) ]).optional(),
  date: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  organizationId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  patientId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const CustomerSatisfactionWhereInputSchema: z.ZodType<Prisma.CustomerSatisfactionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CustomerSatisfactionWhereInputSchema),z.lazy(() => CustomerSatisfactionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CustomerSatisfactionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CustomerSatisfactionWhereInputSchema),z.lazy(() => CustomerSatisfactionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  rating: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  comment: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  patientId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  organizationId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  patient: z.union([ z.lazy(() => PatientRelationFilterSchema),z.lazy(() => PatientWhereInputSchema) ]).optional(),
  organization: z.union([ z.lazy(() => OrganizationRelationFilterSchema),z.lazy(() => OrganizationWhereInputSchema) ]).optional(),
}).strict();

export const CustomerSatisfactionOrderByWithRelationInputSchema: z.ZodType<Prisma.CustomerSatisfactionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  rating: z.lazy(() => SortOrderSchema).optional(),
  comment: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  patientId: z.lazy(() => SortOrderSchema).optional(),
  organizationId: z.lazy(() => SortOrderSchema).optional(),
  patient: z.lazy(() => PatientOrderByWithRelationInputSchema).optional(),
  organization: z.lazy(() => OrganizationOrderByWithRelationInputSchema).optional()
}).strict();

export const CustomerSatisfactionWhereUniqueInputSchema: z.ZodType<Prisma.CustomerSatisfactionWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => CustomerSatisfactionWhereInputSchema),z.lazy(() => CustomerSatisfactionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CustomerSatisfactionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CustomerSatisfactionWhereInputSchema),z.lazy(() => CustomerSatisfactionWhereInputSchema).array() ]).optional(),
  rating: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  comment: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  patientId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  organizationId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  patient: z.union([ z.lazy(() => PatientRelationFilterSchema),z.lazy(() => PatientWhereInputSchema) ]).optional(),
  organization: z.union([ z.lazy(() => OrganizationRelationFilterSchema),z.lazy(() => OrganizationWhereInputSchema) ]).optional(),
}).strict());

export const CustomerSatisfactionOrderByWithAggregationInputSchema: z.ZodType<Prisma.CustomerSatisfactionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  rating: z.lazy(() => SortOrderSchema).optional(),
  comment: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  patientId: z.lazy(() => SortOrderSchema).optional(),
  organizationId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CustomerSatisfactionCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => CustomerSatisfactionAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CustomerSatisfactionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CustomerSatisfactionMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => CustomerSatisfactionSumOrderByAggregateInputSchema).optional()
}).strict();

export const CustomerSatisfactionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CustomerSatisfactionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => CustomerSatisfactionScalarWhereWithAggregatesInputSchema),z.lazy(() => CustomerSatisfactionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CustomerSatisfactionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CustomerSatisfactionScalarWhereWithAggregatesInputSchema),z.lazy(() => CustomerSatisfactionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  rating: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  comment: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  patientId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  organizationId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string(),
  passwordHash: z.string().optional().nullable(),
  avatarUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tokens: z.lazy(() => TokenCreateNestedManyWithoutUserInputSchema).optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  invites: z.lazy(() => InviteCreateNestedManyWithoutAuthorInputSchema).optional(),
  member_on: z.lazy(() => MemberCreateNestedManyWithoutUserInputSchema).optional(),
  owns_organizations: z.lazy(() => OrganizationCreateNestedManyWithoutOwnerInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string(),
  passwordHash: z.string().optional().nullable(),
  avatarUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tokens: z.lazy(() => TokenUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  invites: z.lazy(() => InviteUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  member_on: z.lazy(() => MemberUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  owns_organizations: z.lazy(() => OrganizationUncheckedCreateNestedManyWithoutOwnerInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatarUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tokens: z.lazy(() => TokenUpdateManyWithoutUserNestedInputSchema).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  invites: z.lazy(() => InviteUpdateManyWithoutAuthorNestedInputSchema).optional(),
  member_on: z.lazy(() => MemberUpdateManyWithoutUserNestedInputSchema).optional(),
  owns_organizations: z.lazy(() => OrganizationUpdateManyWithoutOwnerNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatarUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tokens: z.lazy(() => TokenUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  invites: z.lazy(() => InviteUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  member_on: z.lazy(() => MemberUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  owns_organizations: z.lazy(() => OrganizationUncheckedUpdateManyWithoutOwnerNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string(),
  passwordHash: z.string().optional().nullable(),
  avatarUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatarUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatarUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TokenCreateInputSchema: z.ZodType<Prisma.TokenCreateInput> = z.object({
  id: z.string().optional(),
  type: z.lazy(() => TokenTypeSchema),
  createdAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutTokensInputSchema)
}).strict();

export const TokenUncheckedCreateInputSchema: z.ZodType<Prisma.TokenUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  type: z.lazy(() => TokenTypeSchema),
  createdAt: z.coerce.date().optional(),
  userId: z.string()
}).strict();

export const TokenUpdateInputSchema: z.ZodType<Prisma.TokenUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => TokenTypeSchema),z.lazy(() => EnumTokenTypeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutTokensNestedInputSchema).optional()
}).strict();

export const TokenUncheckedUpdateInputSchema: z.ZodType<Prisma.TokenUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => TokenTypeSchema),z.lazy(() => EnumTokenTypeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TokenCreateManyInputSchema: z.ZodType<Prisma.TokenCreateManyInput> = z.object({
  id: z.string().optional(),
  type: z.lazy(() => TokenTypeSchema),
  createdAt: z.coerce.date().optional(),
  userId: z.string()
}).strict();

export const TokenUpdateManyMutationInputSchema: z.ZodType<Prisma.TokenUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => TokenTypeSchema),z.lazy(() => EnumTokenTypeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TokenUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TokenUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => TokenTypeSchema),z.lazy(() => EnumTokenTypeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AccountCreateInputSchema: z.ZodType<Prisma.AccountCreateInput> = z.object({
  id: z.string().optional(),
  provider: z.lazy(() => AccountProviderSchema),
  providerAccountId: z.string(),
  user: z.lazy(() => UserCreateNestedOneWithoutAccountsInputSchema)
}).strict();

export const AccountUncheckedCreateInputSchema: z.ZodType<Prisma.AccountUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  provider: z.lazy(() => AccountProviderSchema),
  providerAccountId: z.string(),
  userId: z.string()
}).strict();

export const AccountUpdateInputSchema: z.ZodType<Prisma.AccountUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.lazy(() => AccountProviderSchema),z.lazy(() => EnumAccountProviderFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutAccountsNestedInputSchema).optional()
}).strict();

export const AccountUncheckedUpdateInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.lazy(() => AccountProviderSchema),z.lazy(() => EnumAccountProviderFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AccountCreateManyInputSchema: z.ZodType<Prisma.AccountCreateManyInput> = z.object({
  id: z.string().optional(),
  provider: z.lazy(() => AccountProviderSchema),
  providerAccountId: z.string(),
  userId: z.string()
}).strict();

export const AccountUpdateManyMutationInputSchema: z.ZodType<Prisma.AccountUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.lazy(() => AccountProviderSchema),z.lazy(() => EnumAccountProviderFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AccountUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.lazy(() => AccountProviderSchema),z.lazy(() => EnumAccountProviderFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const InviteCreateInputSchema: z.ZodType<Prisma.InviteCreateInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  role: z.lazy(() => RoleSchema),
  createdAt: z.coerce.date().optional(),
  author: z.lazy(() => UserCreateNestedOneWithoutInvitesInputSchema).optional(),
  organization: z.lazy(() => OrganizationCreateNestedOneWithoutInvitesInputSchema)
}).strict();

export const InviteUncheckedCreateInputSchema: z.ZodType<Prisma.InviteUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  role: z.lazy(() => RoleSchema),
  createdAt: z.coerce.date().optional(),
  authorId: z.string().optional().nullable(),
  organizationId: z.string()
}).strict();

export const InviteUpdateInputSchema: z.ZodType<Prisma.InviteUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  author: z.lazy(() => UserUpdateOneWithoutInvitesNestedInputSchema).optional(),
  organization: z.lazy(() => OrganizationUpdateOneRequiredWithoutInvitesNestedInputSchema).optional()
}).strict();

export const InviteUncheckedUpdateInputSchema: z.ZodType<Prisma.InviteUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  authorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  organizationId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const InviteCreateManyInputSchema: z.ZodType<Prisma.InviteCreateManyInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  role: z.lazy(() => RoleSchema),
  createdAt: z.coerce.date().optional(),
  authorId: z.string().optional().nullable(),
  organizationId: z.string()
}).strict();

export const InviteUpdateManyMutationInputSchema: z.ZodType<Prisma.InviteUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const InviteUncheckedUpdateManyInputSchema: z.ZodType<Prisma.InviteUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  authorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  organizationId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MemberCreateInputSchema: z.ZodType<Prisma.MemberCreateInput> = z.object({
  id: z.string().optional(),
  role: z.lazy(() => RoleSchema).optional(),
  specialty: z.string().optional().nullable(),
  organization: z.lazy(() => OrganizationCreateNestedOneWithoutMembersInputSchema),
  user: z.lazy(() => UserCreateNestedOneWithoutMember_onInputSchema),
  appointments: z.lazy(() => AppointmentCreateNestedManyWithoutMemberInputSchema).optional()
}).strict();

export const MemberUncheckedCreateInputSchema: z.ZodType<Prisma.MemberUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  role: z.lazy(() => RoleSchema).optional(),
  specialty: z.string().optional().nullable(),
  organizationId: z.string(),
  userId: z.string(),
  appointments: z.lazy(() => AppointmentUncheckedCreateNestedManyWithoutMemberInputSchema).optional()
}).strict();

export const MemberUpdateInputSchema: z.ZodType<Prisma.MemberUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  specialty: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  organization: z.lazy(() => OrganizationUpdateOneRequiredWithoutMembersNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutMember_onNestedInputSchema).optional(),
  appointments: z.lazy(() => AppointmentUpdateManyWithoutMemberNestedInputSchema).optional()
}).strict();

export const MemberUncheckedUpdateInputSchema: z.ZodType<Prisma.MemberUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  specialty: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  organizationId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  appointments: z.lazy(() => AppointmentUncheckedUpdateManyWithoutMemberNestedInputSchema).optional()
}).strict();

export const MemberCreateManyInputSchema: z.ZodType<Prisma.MemberCreateManyInput> = z.object({
  id: z.string().optional(),
  role: z.lazy(() => RoleSchema).optional(),
  specialty: z.string().optional().nullable(),
  organizationId: z.string(),
  userId: z.string()
}).strict();

export const MemberUpdateManyMutationInputSchema: z.ZodType<Prisma.MemberUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  specialty: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const MemberUncheckedUpdateManyInputSchema: z.ZodType<Prisma.MemberUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  specialty: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  organizationId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PatientCreateInputSchema: z.ZodType<Prisma.PatientCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  email: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  birthDate: z.coerce.date(),
  address: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  organization: z.lazy(() => OrganizationCreateNestedOneWithoutPatientsInputSchema),
  medicalRecord: z.lazy(() => MedicalRecordCreateNestedOneWithoutPatientInputSchema).optional(),
  appointments: z.lazy(() => AppointmentCreateNestedManyWithoutPatientInputSchema).optional(),
  FinancialTransaction: z.lazy(() => FinancialTransactionCreateNestedManyWithoutPatientInputSchema).optional(),
  CustomerSatisfaction: z.lazy(() => CustomerSatisfactionCreateNestedManyWithoutPatientInputSchema).optional(),
  PatientAnamnesis: z.lazy(() => PatientAnamnesisCreateNestedManyWithoutPatientInputSchema).optional()
}).strict();

export const PatientUncheckedCreateInputSchema: z.ZodType<Prisma.PatientUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  email: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  birthDate: z.coerce.date(),
  address: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  organizationId: z.string(),
  medicalRecord: z.lazy(() => MedicalRecordUncheckedCreateNestedOneWithoutPatientInputSchema).optional(),
  appointments: z.lazy(() => AppointmentUncheckedCreateNestedManyWithoutPatientInputSchema).optional(),
  FinancialTransaction: z.lazy(() => FinancialTransactionUncheckedCreateNestedManyWithoutPatientInputSchema).optional(),
  CustomerSatisfaction: z.lazy(() => CustomerSatisfactionUncheckedCreateNestedManyWithoutPatientInputSchema).optional(),
  PatientAnamnesis: z.lazy(() => PatientAnamnesisUncheckedCreateNestedManyWithoutPatientInputSchema).optional()
}).strict();

export const PatientUpdateInputSchema: z.ZodType<Prisma.PatientUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  birthDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  organization: z.lazy(() => OrganizationUpdateOneRequiredWithoutPatientsNestedInputSchema).optional(),
  medicalRecord: z.lazy(() => MedicalRecordUpdateOneWithoutPatientNestedInputSchema).optional(),
  appointments: z.lazy(() => AppointmentUpdateManyWithoutPatientNestedInputSchema).optional(),
  FinancialTransaction: z.lazy(() => FinancialTransactionUpdateManyWithoutPatientNestedInputSchema).optional(),
  CustomerSatisfaction: z.lazy(() => CustomerSatisfactionUpdateManyWithoutPatientNestedInputSchema).optional(),
  PatientAnamnesis: z.lazy(() => PatientAnamnesisUpdateManyWithoutPatientNestedInputSchema).optional()
}).strict();

export const PatientUncheckedUpdateInputSchema: z.ZodType<Prisma.PatientUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  birthDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  organizationId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  medicalRecord: z.lazy(() => MedicalRecordUncheckedUpdateOneWithoutPatientNestedInputSchema).optional(),
  appointments: z.lazy(() => AppointmentUncheckedUpdateManyWithoutPatientNestedInputSchema).optional(),
  FinancialTransaction: z.lazy(() => FinancialTransactionUncheckedUpdateManyWithoutPatientNestedInputSchema).optional(),
  CustomerSatisfaction: z.lazy(() => CustomerSatisfactionUncheckedUpdateManyWithoutPatientNestedInputSchema).optional(),
  PatientAnamnesis: z.lazy(() => PatientAnamnesisUncheckedUpdateManyWithoutPatientNestedInputSchema).optional()
}).strict();

export const PatientCreateManyInputSchema: z.ZodType<Prisma.PatientCreateManyInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  email: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  birthDate: z.coerce.date(),
  address: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  organizationId: z.string()
}).strict();

export const PatientUpdateManyMutationInputSchema: z.ZodType<Prisma.PatientUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  birthDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PatientUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PatientUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  birthDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  organizationId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MedicalRecordCreateInputSchema: z.ZodType<Prisma.MedicalRecordCreateInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  patient: z.lazy(() => PatientCreateNestedOneWithoutMedicalRecordInputSchema),
  anamneses: z.lazy(() => AnamnesisCreateNestedManyWithoutMedicalRecordInputSchema).optional()
}).strict();

export const MedicalRecordUncheckedCreateInputSchema: z.ZodType<Prisma.MedicalRecordUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  patientId: z.string(),
  anamneses: z.lazy(() => AnamnesisUncheckedCreateNestedManyWithoutMedicalRecordInputSchema).optional()
}).strict();

export const MedicalRecordUpdateInputSchema: z.ZodType<Prisma.MedicalRecordUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  patient: z.lazy(() => PatientUpdateOneRequiredWithoutMedicalRecordNestedInputSchema).optional(),
  anamneses: z.lazy(() => AnamnesisUpdateManyWithoutMedicalRecordNestedInputSchema).optional()
}).strict();

export const MedicalRecordUncheckedUpdateInputSchema: z.ZodType<Prisma.MedicalRecordUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  patientId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  anamneses: z.lazy(() => AnamnesisUncheckedUpdateManyWithoutMedicalRecordNestedInputSchema).optional()
}).strict();

export const MedicalRecordCreateManyInputSchema: z.ZodType<Prisma.MedicalRecordCreateManyInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  patientId: z.string()
}).strict();

export const MedicalRecordUpdateManyMutationInputSchema: z.ZodType<Prisma.MedicalRecordUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MedicalRecordUncheckedUpdateManyInputSchema: z.ZodType<Prisma.MedicalRecordUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  patientId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AnamnesisCreateInputSchema: z.ZodType<Prisma.AnamnesisCreateInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  medicalRecord: z.lazy(() => MedicalRecordCreateNestedOneWithoutAnamnesesInputSchema),
  template: z.lazy(() => AnamnesisTemplateCreateNestedOneWithoutAnamnesisInputSchema),
  answers: z.lazy(() => AnamnesisAnswerCreateNestedManyWithoutAnamnesisInputSchema).optional()
}).strict();

export const AnamnesisUncheckedCreateInputSchema: z.ZodType<Prisma.AnamnesisUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  medicalRecordId: z.string(),
  templateId: z.string(),
  answers: z.lazy(() => AnamnesisAnswerUncheckedCreateNestedManyWithoutAnamnesisInputSchema).optional()
}).strict();

export const AnamnesisUpdateInputSchema: z.ZodType<Prisma.AnamnesisUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  medicalRecord: z.lazy(() => MedicalRecordUpdateOneRequiredWithoutAnamnesesNestedInputSchema).optional(),
  template: z.lazy(() => AnamnesisTemplateUpdateOneRequiredWithoutAnamnesisNestedInputSchema).optional(),
  answers: z.lazy(() => AnamnesisAnswerUpdateManyWithoutAnamnesisNestedInputSchema).optional()
}).strict();

export const AnamnesisUncheckedUpdateInputSchema: z.ZodType<Prisma.AnamnesisUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  medicalRecordId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  templateId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  answers: z.lazy(() => AnamnesisAnswerUncheckedUpdateManyWithoutAnamnesisNestedInputSchema).optional()
}).strict();

export const AnamnesisCreateManyInputSchema: z.ZodType<Prisma.AnamnesisCreateManyInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  medicalRecordId: z.string(),
  templateId: z.string()
}).strict();

export const AnamnesisUpdateManyMutationInputSchema: z.ZodType<Prisma.AnamnesisUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AnamnesisUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AnamnesisUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  medicalRecordId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  templateId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AnamnesisTemplateCreateInputSchema: z.ZodType<Prisma.AnamnesisTemplateCreateInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  organization: z.lazy(() => OrganizationCreateNestedOneWithoutAnamnesisTemplateInputSchema),
  questions: z.lazy(() => AnamnesisQuestionCreateNestedManyWithoutTemplateInputSchema).optional(),
  patientAnamneses: z.lazy(() => PatientAnamnesisCreateNestedManyWithoutTemplateInputSchema).optional(),
  Anamnesis: z.lazy(() => AnamnesisCreateNestedManyWithoutTemplateInputSchema).optional()
}).strict();

export const AnamnesisTemplateUncheckedCreateInputSchema: z.ZodType<Prisma.AnamnesisTemplateUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  organizationId: z.string(),
  questions: z.lazy(() => AnamnesisQuestionUncheckedCreateNestedManyWithoutTemplateInputSchema).optional(),
  patientAnamneses: z.lazy(() => PatientAnamnesisUncheckedCreateNestedManyWithoutTemplateInputSchema).optional(),
  Anamnesis: z.lazy(() => AnamnesisUncheckedCreateNestedManyWithoutTemplateInputSchema).optional()
}).strict();

export const AnamnesisTemplateUpdateInputSchema: z.ZodType<Prisma.AnamnesisTemplateUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  organization: z.lazy(() => OrganizationUpdateOneRequiredWithoutAnamnesisTemplateNestedInputSchema).optional(),
  questions: z.lazy(() => AnamnesisQuestionUpdateManyWithoutTemplateNestedInputSchema).optional(),
  patientAnamneses: z.lazy(() => PatientAnamnesisUpdateManyWithoutTemplateNestedInputSchema).optional(),
  Anamnesis: z.lazy(() => AnamnesisUpdateManyWithoutTemplateNestedInputSchema).optional()
}).strict();

export const AnamnesisTemplateUncheckedUpdateInputSchema: z.ZodType<Prisma.AnamnesisTemplateUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  organizationId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  questions: z.lazy(() => AnamnesisQuestionUncheckedUpdateManyWithoutTemplateNestedInputSchema).optional(),
  patientAnamneses: z.lazy(() => PatientAnamnesisUncheckedUpdateManyWithoutTemplateNestedInputSchema).optional(),
  Anamnesis: z.lazy(() => AnamnesisUncheckedUpdateManyWithoutTemplateNestedInputSchema).optional()
}).strict();

export const AnamnesisTemplateCreateManyInputSchema: z.ZodType<Prisma.AnamnesisTemplateCreateManyInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  organizationId: z.string()
}).strict();

export const AnamnesisTemplateUpdateManyMutationInputSchema: z.ZodType<Prisma.AnamnesisTemplateUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AnamnesisTemplateUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AnamnesisTemplateUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  organizationId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AnamnesisQuestionCreateInputSchema: z.ZodType<Prisma.AnamnesisQuestionCreateInput> = z.object({
  id: z.string().optional(),
  question: z.string(),
  type: z.lazy(() => QuestionTypeSchema),
  template: z.lazy(() => AnamnesisTemplateCreateNestedOneWithoutQuestionsInputSchema),
  answers: z.lazy(() => AnamnesisAnswerCreateNestedManyWithoutQuestionInputSchema).optional()
}).strict();

export const AnamnesisQuestionUncheckedCreateInputSchema: z.ZodType<Prisma.AnamnesisQuestionUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  question: z.string(),
  type: z.lazy(() => QuestionTypeSchema),
  templateId: z.string(),
  answers: z.lazy(() => AnamnesisAnswerUncheckedCreateNestedManyWithoutQuestionInputSchema).optional()
}).strict();

export const AnamnesisQuestionUpdateInputSchema: z.ZodType<Prisma.AnamnesisQuestionUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  question: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => QuestionTypeSchema),z.lazy(() => EnumQuestionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  template: z.lazy(() => AnamnesisTemplateUpdateOneRequiredWithoutQuestionsNestedInputSchema).optional(),
  answers: z.lazy(() => AnamnesisAnswerUpdateManyWithoutQuestionNestedInputSchema).optional()
}).strict();

export const AnamnesisQuestionUncheckedUpdateInputSchema: z.ZodType<Prisma.AnamnesisQuestionUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  question: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => QuestionTypeSchema),z.lazy(() => EnumQuestionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  templateId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  answers: z.lazy(() => AnamnesisAnswerUncheckedUpdateManyWithoutQuestionNestedInputSchema).optional()
}).strict();

export const AnamnesisQuestionCreateManyInputSchema: z.ZodType<Prisma.AnamnesisQuestionCreateManyInput> = z.object({
  id: z.string().optional(),
  question: z.string(),
  type: z.lazy(() => QuestionTypeSchema),
  templateId: z.string()
}).strict();

export const AnamnesisQuestionUpdateManyMutationInputSchema: z.ZodType<Prisma.AnamnesisQuestionUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  question: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => QuestionTypeSchema),z.lazy(() => EnumQuestionTypeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AnamnesisQuestionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AnamnesisQuestionUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  question: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => QuestionTypeSchema),z.lazy(() => EnumQuestionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  templateId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PatientAnamnesisCreateInputSchema: z.ZodType<Prisma.PatientAnamnesisCreateInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  patient: z.lazy(() => PatientCreateNestedOneWithoutPatientAnamnesisInputSchema),
  template: z.lazy(() => AnamnesisTemplateCreateNestedOneWithoutPatientAnamnesesInputSchema),
  answers: z.lazy(() => AnamnesisAnswerCreateNestedManyWithoutPatientAnamnesisInputSchema).optional()
}).strict();

export const PatientAnamnesisUncheckedCreateInputSchema: z.ZodType<Prisma.PatientAnamnesisUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  patientId: z.string(),
  templateId: z.string(),
  answers: z.lazy(() => AnamnesisAnswerUncheckedCreateNestedManyWithoutPatientAnamnesisInputSchema).optional()
}).strict();

export const PatientAnamnesisUpdateInputSchema: z.ZodType<Prisma.PatientAnamnesisUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  patient: z.lazy(() => PatientUpdateOneRequiredWithoutPatientAnamnesisNestedInputSchema).optional(),
  template: z.lazy(() => AnamnesisTemplateUpdateOneRequiredWithoutPatientAnamnesesNestedInputSchema).optional(),
  answers: z.lazy(() => AnamnesisAnswerUpdateManyWithoutPatientAnamnesisNestedInputSchema).optional()
}).strict();

export const PatientAnamnesisUncheckedUpdateInputSchema: z.ZodType<Prisma.PatientAnamnesisUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  patientId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  templateId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  answers: z.lazy(() => AnamnesisAnswerUncheckedUpdateManyWithoutPatientAnamnesisNestedInputSchema).optional()
}).strict();

export const PatientAnamnesisCreateManyInputSchema: z.ZodType<Prisma.PatientAnamnesisCreateManyInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  patientId: z.string(),
  templateId: z.string()
}).strict();

export const PatientAnamnesisUpdateManyMutationInputSchema: z.ZodType<Prisma.PatientAnamnesisUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PatientAnamnesisUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PatientAnamnesisUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  patientId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  templateId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AnamnesisAnswerCreateInputSchema: z.ZodType<Prisma.AnamnesisAnswerCreateInput> = z.object({
  id: z.string().optional(),
  answer: z.string(),
  question: z.lazy(() => AnamnesisQuestionCreateNestedOneWithoutAnswersInputSchema),
  patientAnamnesis: z.lazy(() => PatientAnamnesisCreateNestedOneWithoutAnswersInputSchema),
  Anamnesis: z.lazy(() => AnamnesisCreateNestedOneWithoutAnswersInputSchema).optional()
}).strict();

export const AnamnesisAnswerUncheckedCreateInputSchema: z.ZodType<Prisma.AnamnesisAnswerUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  answer: z.string(),
  questionId: z.string(),
  patientAnamnesisId: z.string(),
  anamnesisId: z.string().optional().nullable()
}).strict();

export const AnamnesisAnswerUpdateInputSchema: z.ZodType<Prisma.AnamnesisAnswerUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  answer: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  question: z.lazy(() => AnamnesisQuestionUpdateOneRequiredWithoutAnswersNestedInputSchema).optional(),
  patientAnamnesis: z.lazy(() => PatientAnamnesisUpdateOneRequiredWithoutAnswersNestedInputSchema).optional(),
  Anamnesis: z.lazy(() => AnamnesisUpdateOneWithoutAnswersNestedInputSchema).optional()
}).strict();

export const AnamnesisAnswerUncheckedUpdateInputSchema: z.ZodType<Prisma.AnamnesisAnswerUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  answer: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  questionId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  patientAnamnesisId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  anamnesisId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AnamnesisAnswerCreateManyInputSchema: z.ZodType<Prisma.AnamnesisAnswerCreateManyInput> = z.object({
  id: z.string().optional(),
  answer: z.string(),
  questionId: z.string(),
  patientAnamnesisId: z.string(),
  anamnesisId: z.string().optional().nullable()
}).strict();

export const AnamnesisAnswerUpdateManyMutationInputSchema: z.ZodType<Prisma.AnamnesisAnswerUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  answer: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AnamnesisAnswerUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AnamnesisAnswerUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  answer: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  questionId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  patientAnamnesisId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  anamnesisId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AppointmentCreateInputSchema: z.ZodType<Prisma.AppointmentCreateInput> = z.object({
  id: z.string().optional(),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  description: z.string().optional().nullable(),
  status: z.lazy(() => AppointmentStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  patient: z.lazy(() => PatientCreateNestedOneWithoutAppointmentsInputSchema),
  member: z.lazy(() => MemberCreateNestedOneWithoutAppointmentsInputSchema)
}).strict();

export const AppointmentUncheckedCreateInputSchema: z.ZodType<Prisma.AppointmentUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  description: z.string().optional().nullable(),
  status: z.lazy(() => AppointmentStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  patientId: z.string(),
  memberId: z.string()
}).strict();

export const AppointmentUpdateInputSchema: z.ZodType<Prisma.AppointmentUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => AppointmentStatusSchema),z.lazy(() => EnumAppointmentStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  patient: z.lazy(() => PatientUpdateOneRequiredWithoutAppointmentsNestedInputSchema).optional(),
  member: z.lazy(() => MemberUpdateOneRequiredWithoutAppointmentsNestedInputSchema).optional()
}).strict();

export const AppointmentUncheckedUpdateInputSchema: z.ZodType<Prisma.AppointmentUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => AppointmentStatusSchema),z.lazy(() => EnumAppointmentStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  patientId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  memberId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AppointmentCreateManyInputSchema: z.ZodType<Prisma.AppointmentCreateManyInput> = z.object({
  id: z.string().optional(),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  description: z.string().optional().nullable(),
  status: z.lazy(() => AppointmentStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  patientId: z.string(),
  memberId: z.string()
}).strict();

export const AppointmentUpdateManyMutationInputSchema: z.ZodType<Prisma.AppointmentUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => AppointmentStatusSchema),z.lazy(() => EnumAppointmentStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AppointmentUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AppointmentUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => AppointmentStatusSchema),z.lazy(() => EnumAppointmentStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  patientId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  memberId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const OrganizationCreateInputSchema: z.ZodType<Prisma.OrganizationCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  slug: z.string(),
  domain: z.string().optional().nullable(),
  shouldAttachUsersByDomain: z.boolean().optional(),
  avatarUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  owner: z.lazy(() => UserCreateNestedOneWithoutOwns_organizationsInputSchema),
  invites: z.lazy(() => InviteCreateNestedManyWithoutOrganizationInputSchema).optional(),
  members: z.lazy(() => MemberCreateNestedManyWithoutOrganizationInputSchema).optional(),
  patients: z.lazy(() => PatientCreateNestedManyWithoutOrganizationInputSchema).optional(),
  financialTransactions: z.lazy(() => FinancialTransactionCreateNestedManyWithoutOrganizationInputSchema).optional(),
  customerSatisfactions: z.lazy(() => CustomerSatisfactionCreateNestedManyWithoutOrganizationInputSchema).optional(),
  AnamnesisTemplate: z.lazy(() => AnamnesisTemplateCreateNestedManyWithoutOrganizationInputSchema).optional()
}).strict();

export const OrganizationUncheckedCreateInputSchema: z.ZodType<Prisma.OrganizationUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  slug: z.string(),
  domain: z.string().optional().nullable(),
  shouldAttachUsersByDomain: z.boolean().optional(),
  avatarUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  ownerId: z.string(),
  invites: z.lazy(() => InviteUncheckedCreateNestedManyWithoutOrganizationInputSchema).optional(),
  members: z.lazy(() => MemberUncheckedCreateNestedManyWithoutOrganizationInputSchema).optional(),
  patients: z.lazy(() => PatientUncheckedCreateNestedManyWithoutOrganizationInputSchema).optional(),
  financialTransactions: z.lazy(() => FinancialTransactionUncheckedCreateNestedManyWithoutOrganizationInputSchema).optional(),
  customerSatisfactions: z.lazy(() => CustomerSatisfactionUncheckedCreateNestedManyWithoutOrganizationInputSchema).optional(),
  AnamnesisTemplate: z.lazy(() => AnamnesisTemplateUncheckedCreateNestedManyWithoutOrganizationInputSchema).optional()
}).strict();

export const OrganizationUpdateInputSchema: z.ZodType<Prisma.OrganizationUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  domain: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  shouldAttachUsersByDomain: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  avatarUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  owner: z.lazy(() => UserUpdateOneRequiredWithoutOwns_organizationsNestedInputSchema).optional(),
  invites: z.lazy(() => InviteUpdateManyWithoutOrganizationNestedInputSchema).optional(),
  members: z.lazy(() => MemberUpdateManyWithoutOrganizationNestedInputSchema).optional(),
  patients: z.lazy(() => PatientUpdateManyWithoutOrganizationNestedInputSchema).optional(),
  financialTransactions: z.lazy(() => FinancialTransactionUpdateManyWithoutOrganizationNestedInputSchema).optional(),
  customerSatisfactions: z.lazy(() => CustomerSatisfactionUpdateManyWithoutOrganizationNestedInputSchema).optional(),
  AnamnesisTemplate: z.lazy(() => AnamnesisTemplateUpdateManyWithoutOrganizationNestedInputSchema).optional()
}).strict();

export const OrganizationUncheckedUpdateInputSchema: z.ZodType<Prisma.OrganizationUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  domain: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  shouldAttachUsersByDomain: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  avatarUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ownerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  invites: z.lazy(() => InviteUncheckedUpdateManyWithoutOrganizationNestedInputSchema).optional(),
  members: z.lazy(() => MemberUncheckedUpdateManyWithoutOrganizationNestedInputSchema).optional(),
  patients: z.lazy(() => PatientUncheckedUpdateManyWithoutOrganizationNestedInputSchema).optional(),
  financialTransactions: z.lazy(() => FinancialTransactionUncheckedUpdateManyWithoutOrganizationNestedInputSchema).optional(),
  customerSatisfactions: z.lazy(() => CustomerSatisfactionUncheckedUpdateManyWithoutOrganizationNestedInputSchema).optional(),
  AnamnesisTemplate: z.lazy(() => AnamnesisTemplateUncheckedUpdateManyWithoutOrganizationNestedInputSchema).optional()
}).strict();

export const OrganizationCreateManyInputSchema: z.ZodType<Prisma.OrganizationCreateManyInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  slug: z.string(),
  domain: z.string().optional().nullable(),
  shouldAttachUsersByDomain: z.boolean().optional(),
  avatarUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  ownerId: z.string()
}).strict();

export const OrganizationUpdateManyMutationInputSchema: z.ZodType<Prisma.OrganizationUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  domain: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  shouldAttachUsersByDomain: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  avatarUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const OrganizationUncheckedUpdateManyInputSchema: z.ZodType<Prisma.OrganizationUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  domain: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  shouldAttachUsersByDomain: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  avatarUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ownerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FinancialTransactionCreateInputSchema: z.ZodType<Prisma.FinancialTransactionCreateInput> = z.object({
  id: z.string().optional(),
  description: z.string(),
  amount: z.string(),
  type: z.lazy(() => TransactionTypeSchema),
  paymentMethod: z.lazy(() => PaymentMethodSchema),
  date: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  organization: z.lazy(() => OrganizationCreateNestedOneWithoutFinancialTransactionsInputSchema),
  patient: z.lazy(() => PatientCreateNestedOneWithoutFinancialTransactionInputSchema).optional()
}).strict();

export const FinancialTransactionUncheckedCreateInputSchema: z.ZodType<Prisma.FinancialTransactionUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  description: z.string(),
  amount: z.string(),
  type: z.lazy(() => TransactionTypeSchema),
  paymentMethod: z.lazy(() => PaymentMethodSchema),
  date: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  organizationId: z.string(),
  patientId: z.string().optional().nullable()
}).strict();

export const FinancialTransactionUpdateInputSchema: z.ZodType<Prisma.FinancialTransactionUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => TransactionTypeSchema),z.lazy(() => EnumTransactionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  paymentMethod: z.union([ z.lazy(() => PaymentMethodSchema),z.lazy(() => EnumPaymentMethodFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  organization: z.lazy(() => OrganizationUpdateOneRequiredWithoutFinancialTransactionsNestedInputSchema).optional(),
  patient: z.lazy(() => PatientUpdateOneWithoutFinancialTransactionNestedInputSchema).optional()
}).strict();

export const FinancialTransactionUncheckedUpdateInputSchema: z.ZodType<Prisma.FinancialTransactionUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => TransactionTypeSchema),z.lazy(() => EnumTransactionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  paymentMethod: z.union([ z.lazy(() => PaymentMethodSchema),z.lazy(() => EnumPaymentMethodFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  organizationId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  patientId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const FinancialTransactionCreateManyInputSchema: z.ZodType<Prisma.FinancialTransactionCreateManyInput> = z.object({
  id: z.string().optional(),
  description: z.string(),
  amount: z.string(),
  type: z.lazy(() => TransactionTypeSchema),
  paymentMethod: z.lazy(() => PaymentMethodSchema),
  date: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  organizationId: z.string(),
  patientId: z.string().optional().nullable()
}).strict();

export const FinancialTransactionUpdateManyMutationInputSchema: z.ZodType<Prisma.FinancialTransactionUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => TransactionTypeSchema),z.lazy(() => EnumTransactionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  paymentMethod: z.union([ z.lazy(() => PaymentMethodSchema),z.lazy(() => EnumPaymentMethodFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FinancialTransactionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.FinancialTransactionUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => TransactionTypeSchema),z.lazy(() => EnumTransactionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  paymentMethod: z.union([ z.lazy(() => PaymentMethodSchema),z.lazy(() => EnumPaymentMethodFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  organizationId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  patientId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const CustomerSatisfactionCreateInputSchema: z.ZodType<Prisma.CustomerSatisfactionCreateInput> = z.object({
  id: z.string().optional(),
  rating: z.number().int(),
  comment: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  patient: z.lazy(() => PatientCreateNestedOneWithoutCustomerSatisfactionInputSchema),
  organization: z.lazy(() => OrganizationCreateNestedOneWithoutCustomerSatisfactionsInputSchema)
}).strict();

export const CustomerSatisfactionUncheckedCreateInputSchema: z.ZodType<Prisma.CustomerSatisfactionUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  rating: z.number().int(),
  comment: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  patientId: z.string(),
  organizationId: z.string()
}).strict();

export const CustomerSatisfactionUpdateInputSchema: z.ZodType<Prisma.CustomerSatisfactionUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  patient: z.lazy(() => PatientUpdateOneRequiredWithoutCustomerSatisfactionNestedInputSchema).optional(),
  organization: z.lazy(() => OrganizationUpdateOneRequiredWithoutCustomerSatisfactionsNestedInputSchema).optional()
}).strict();

export const CustomerSatisfactionUncheckedUpdateInputSchema: z.ZodType<Prisma.CustomerSatisfactionUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  patientId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  organizationId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CustomerSatisfactionCreateManyInputSchema: z.ZodType<Prisma.CustomerSatisfactionCreateManyInput> = z.object({
  id: z.string().optional(),
  rating: z.number().int(),
  comment: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  patientId: z.string(),
  organizationId: z.string()
}).strict();

export const CustomerSatisfactionUpdateManyMutationInputSchema: z.ZodType<Prisma.CustomerSatisfactionUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CustomerSatisfactionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CustomerSatisfactionUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  patientId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  organizationId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const TokenListRelationFilterSchema: z.ZodType<Prisma.TokenListRelationFilter> = z.object({
  every: z.lazy(() => TokenWhereInputSchema).optional(),
  some: z.lazy(() => TokenWhereInputSchema).optional(),
  none: z.lazy(() => TokenWhereInputSchema).optional()
}).strict();

export const AccountListRelationFilterSchema: z.ZodType<Prisma.AccountListRelationFilter> = z.object({
  every: z.lazy(() => AccountWhereInputSchema).optional(),
  some: z.lazy(() => AccountWhereInputSchema).optional(),
  none: z.lazy(() => AccountWhereInputSchema).optional()
}).strict();

export const InviteListRelationFilterSchema: z.ZodType<Prisma.InviteListRelationFilter> = z.object({
  every: z.lazy(() => InviteWhereInputSchema).optional(),
  some: z.lazy(() => InviteWhereInputSchema).optional(),
  none: z.lazy(() => InviteWhereInputSchema).optional()
}).strict();

export const MemberListRelationFilterSchema: z.ZodType<Prisma.MemberListRelationFilter> = z.object({
  every: z.lazy(() => MemberWhereInputSchema).optional(),
  some: z.lazy(() => MemberWhereInputSchema).optional(),
  none: z.lazy(() => MemberWhereInputSchema).optional()
}).strict();

export const OrganizationListRelationFilterSchema: z.ZodType<Prisma.OrganizationListRelationFilter> = z.object({
  every: z.lazy(() => OrganizationWhereInputSchema).optional(),
  some: z.lazy(() => OrganizationWhereInputSchema).optional(),
  none: z.lazy(() => OrganizationWhereInputSchema).optional()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const TokenOrderByRelationAggregateInputSchema: z.ZodType<Prisma.TokenOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountOrderByRelationAggregateInputSchema: z.ZodType<Prisma.AccountOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const InviteOrderByRelationAggregateInputSchema: z.ZodType<Prisma.InviteOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MemberOrderByRelationAggregateInputSchema: z.ZodType<Prisma.MemberOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const OrganizationOrderByRelationAggregateInputSchema: z.ZodType<Prisma.OrganizationOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  passwordHash: z.lazy(() => SortOrderSchema).optional(),
  avatarUrl: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  passwordHash: z.lazy(() => SortOrderSchema).optional(),
  avatarUrl: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  passwordHash: z.lazy(() => SortOrderSchema).optional(),
  avatarUrl: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const EnumTokenTypeFilterSchema: z.ZodType<Prisma.EnumTokenTypeFilter> = z.object({
  equals: z.lazy(() => TokenTypeSchema).optional(),
  in: z.lazy(() => TokenTypeSchema).array().optional(),
  notIn: z.lazy(() => TokenTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => TokenTypeSchema),z.lazy(() => NestedEnumTokenTypeFilterSchema) ]).optional(),
}).strict();

export const UserRelationFilterSchema: z.ZodType<Prisma.UserRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const TokenCountOrderByAggregateInputSchema: z.ZodType<Prisma.TokenCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TokenMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TokenMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TokenMinOrderByAggregateInputSchema: z.ZodType<Prisma.TokenMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumTokenTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumTokenTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => TokenTypeSchema).optional(),
  in: z.lazy(() => TokenTypeSchema).array().optional(),
  notIn: z.lazy(() => TokenTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => TokenTypeSchema),z.lazy(() => NestedEnumTokenTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumTokenTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumTokenTypeFilterSchema).optional()
}).strict();

export const EnumAccountProviderFilterSchema: z.ZodType<Prisma.EnumAccountProviderFilter> = z.object({
  equals: z.lazy(() => AccountProviderSchema).optional(),
  in: z.lazy(() => AccountProviderSchema).array().optional(),
  notIn: z.lazy(() => AccountProviderSchema).array().optional(),
  not: z.union([ z.lazy(() => AccountProviderSchema),z.lazy(() => NestedEnumAccountProviderFilterSchema) ]).optional(),
}).strict();

export const AccountProviderUserIdCompoundUniqueInputSchema: z.ZodType<Prisma.AccountProviderUserIdCompoundUniqueInput> = z.object({
  provider: z.lazy(() => AccountProviderSchema),
  userId: z.string()
}).strict();

export const AccountCountOrderByAggregateInputSchema: z.ZodType<Prisma.AccountCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AccountMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountMinOrderByAggregateInputSchema: z.ZodType<Prisma.AccountMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumAccountProviderWithAggregatesFilterSchema: z.ZodType<Prisma.EnumAccountProviderWithAggregatesFilter> = z.object({
  equals: z.lazy(() => AccountProviderSchema).optional(),
  in: z.lazy(() => AccountProviderSchema).array().optional(),
  notIn: z.lazy(() => AccountProviderSchema).array().optional(),
  not: z.union([ z.lazy(() => AccountProviderSchema),z.lazy(() => NestedEnumAccountProviderWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumAccountProviderFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumAccountProviderFilterSchema).optional()
}).strict();

export const EnumRoleFilterSchema: z.ZodType<Prisma.EnumRoleFilter> = z.object({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleSchema),z.lazy(() => NestedEnumRoleFilterSchema) ]).optional(),
}).strict();

export const UserNullableRelationFilterSchema: z.ZodType<Prisma.UserNullableRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => UserWhereInputSchema).optional().nullable()
}).strict();

export const OrganizationRelationFilterSchema: z.ZodType<Prisma.OrganizationRelationFilter> = z.object({
  is: z.lazy(() => OrganizationWhereInputSchema).optional(),
  isNot: z.lazy(() => OrganizationWhereInputSchema).optional()
}).strict();

export const InviteEmailOrganizationIdCompoundUniqueInputSchema: z.ZodType<Prisma.InviteEmailOrganizationIdCompoundUniqueInput> = z.object({
  email: z.string(),
  organizationId: z.string()
}).strict();

export const InviteCountOrderByAggregateInputSchema: z.ZodType<Prisma.InviteCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  organizationId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const InviteMaxOrderByAggregateInputSchema: z.ZodType<Prisma.InviteMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  organizationId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const InviteMinOrderByAggregateInputSchema: z.ZodType<Prisma.InviteMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  organizationId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumRoleWithAggregatesFilterSchema: z.ZodType<Prisma.EnumRoleWithAggregatesFilter> = z.object({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleSchema),z.lazy(() => NestedEnumRoleWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumRoleFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumRoleFilterSchema).optional()
}).strict();

export const AppointmentListRelationFilterSchema: z.ZodType<Prisma.AppointmentListRelationFilter> = z.object({
  every: z.lazy(() => AppointmentWhereInputSchema).optional(),
  some: z.lazy(() => AppointmentWhereInputSchema).optional(),
  none: z.lazy(() => AppointmentWhereInputSchema).optional()
}).strict();

export const AppointmentOrderByRelationAggregateInputSchema: z.ZodType<Prisma.AppointmentOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MemberOrganizationIdUserIdCompoundUniqueInputSchema: z.ZodType<Prisma.MemberOrganizationIdUserIdCompoundUniqueInput> = z.object({
  organizationId: z.string(),
  userId: z.string()
}).strict();

export const MemberCountOrderByAggregateInputSchema: z.ZodType<Prisma.MemberCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  specialty: z.lazy(() => SortOrderSchema).optional(),
  organizationId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MemberMaxOrderByAggregateInputSchema: z.ZodType<Prisma.MemberMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  specialty: z.lazy(() => SortOrderSchema).optional(),
  organizationId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MemberMinOrderByAggregateInputSchema: z.ZodType<Prisma.MemberMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  specialty: z.lazy(() => SortOrderSchema).optional(),
  organizationId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MedicalRecordNullableRelationFilterSchema: z.ZodType<Prisma.MedicalRecordNullableRelationFilter> = z.object({
  is: z.lazy(() => MedicalRecordWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => MedicalRecordWhereInputSchema).optional().nullable()
}).strict();

export const FinancialTransactionListRelationFilterSchema: z.ZodType<Prisma.FinancialTransactionListRelationFilter> = z.object({
  every: z.lazy(() => FinancialTransactionWhereInputSchema).optional(),
  some: z.lazy(() => FinancialTransactionWhereInputSchema).optional(),
  none: z.lazy(() => FinancialTransactionWhereInputSchema).optional()
}).strict();

export const CustomerSatisfactionListRelationFilterSchema: z.ZodType<Prisma.CustomerSatisfactionListRelationFilter> = z.object({
  every: z.lazy(() => CustomerSatisfactionWhereInputSchema).optional(),
  some: z.lazy(() => CustomerSatisfactionWhereInputSchema).optional(),
  none: z.lazy(() => CustomerSatisfactionWhereInputSchema).optional()
}).strict();

export const PatientAnamnesisListRelationFilterSchema: z.ZodType<Prisma.PatientAnamnesisListRelationFilter> = z.object({
  every: z.lazy(() => PatientAnamnesisWhereInputSchema).optional(),
  some: z.lazy(() => PatientAnamnesisWhereInputSchema).optional(),
  none: z.lazy(() => PatientAnamnesisWhereInputSchema).optional()
}).strict();

export const FinancialTransactionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.FinancialTransactionOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CustomerSatisfactionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.CustomerSatisfactionOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatientAnamnesisOrderByRelationAggregateInputSchema: z.ZodType<Prisma.PatientAnamnesisOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatientCountOrderByAggregateInputSchema: z.ZodType<Prisma.PatientCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  birthDate: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  organizationId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatientMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PatientMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  birthDate: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  organizationId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatientMinOrderByAggregateInputSchema: z.ZodType<Prisma.PatientMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  birthDate: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  organizationId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatientRelationFilterSchema: z.ZodType<Prisma.PatientRelationFilter> = z.object({
  is: z.lazy(() => PatientWhereInputSchema).optional(),
  isNot: z.lazy(() => PatientWhereInputSchema).optional()
}).strict();

export const AnamnesisListRelationFilterSchema: z.ZodType<Prisma.AnamnesisListRelationFilter> = z.object({
  every: z.lazy(() => AnamnesisWhereInputSchema).optional(),
  some: z.lazy(() => AnamnesisWhereInputSchema).optional(),
  none: z.lazy(() => AnamnesisWhereInputSchema).optional()
}).strict();

export const AnamnesisOrderByRelationAggregateInputSchema: z.ZodType<Prisma.AnamnesisOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MedicalRecordCountOrderByAggregateInputSchema: z.ZodType<Prisma.MedicalRecordCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  patientId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MedicalRecordMaxOrderByAggregateInputSchema: z.ZodType<Prisma.MedicalRecordMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  patientId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MedicalRecordMinOrderByAggregateInputSchema: z.ZodType<Prisma.MedicalRecordMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  patientId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MedicalRecordRelationFilterSchema: z.ZodType<Prisma.MedicalRecordRelationFilter> = z.object({
  is: z.lazy(() => MedicalRecordWhereInputSchema).optional(),
  isNot: z.lazy(() => MedicalRecordWhereInputSchema).optional()
}).strict();

export const AnamnesisTemplateRelationFilterSchema: z.ZodType<Prisma.AnamnesisTemplateRelationFilter> = z.object({
  is: z.lazy(() => AnamnesisTemplateWhereInputSchema).optional(),
  isNot: z.lazy(() => AnamnesisTemplateWhereInputSchema).optional()
}).strict();

export const AnamnesisAnswerListRelationFilterSchema: z.ZodType<Prisma.AnamnesisAnswerListRelationFilter> = z.object({
  every: z.lazy(() => AnamnesisAnswerWhereInputSchema).optional(),
  some: z.lazy(() => AnamnesisAnswerWhereInputSchema).optional(),
  none: z.lazy(() => AnamnesisAnswerWhereInputSchema).optional()
}).strict();

export const AnamnesisAnswerOrderByRelationAggregateInputSchema: z.ZodType<Prisma.AnamnesisAnswerOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AnamnesisCountOrderByAggregateInputSchema: z.ZodType<Prisma.AnamnesisCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  medicalRecordId: z.lazy(() => SortOrderSchema).optional(),
  templateId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AnamnesisMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AnamnesisMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  medicalRecordId: z.lazy(() => SortOrderSchema).optional(),
  templateId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AnamnesisMinOrderByAggregateInputSchema: z.ZodType<Prisma.AnamnesisMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  medicalRecordId: z.lazy(() => SortOrderSchema).optional(),
  templateId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AnamnesisQuestionListRelationFilterSchema: z.ZodType<Prisma.AnamnesisQuestionListRelationFilter> = z.object({
  every: z.lazy(() => AnamnesisQuestionWhereInputSchema).optional(),
  some: z.lazy(() => AnamnesisQuestionWhereInputSchema).optional(),
  none: z.lazy(() => AnamnesisQuestionWhereInputSchema).optional()
}).strict();

export const AnamnesisQuestionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.AnamnesisQuestionOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AnamnesisTemplateCountOrderByAggregateInputSchema: z.ZodType<Prisma.AnamnesisTemplateCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  organizationId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AnamnesisTemplateMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AnamnesisTemplateMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  organizationId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AnamnesisTemplateMinOrderByAggregateInputSchema: z.ZodType<Prisma.AnamnesisTemplateMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  organizationId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumQuestionTypeFilterSchema: z.ZodType<Prisma.EnumQuestionTypeFilter> = z.object({
  equals: z.lazy(() => QuestionTypeSchema).optional(),
  in: z.lazy(() => QuestionTypeSchema).array().optional(),
  notIn: z.lazy(() => QuestionTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => QuestionTypeSchema),z.lazy(() => NestedEnumQuestionTypeFilterSchema) ]).optional(),
}).strict();

export const AnamnesisQuestionCountOrderByAggregateInputSchema: z.ZodType<Prisma.AnamnesisQuestionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  question: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  templateId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AnamnesisQuestionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AnamnesisQuestionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  question: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  templateId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AnamnesisQuestionMinOrderByAggregateInputSchema: z.ZodType<Prisma.AnamnesisQuestionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  question: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  templateId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumQuestionTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumQuestionTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => QuestionTypeSchema).optional(),
  in: z.lazy(() => QuestionTypeSchema).array().optional(),
  notIn: z.lazy(() => QuestionTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => QuestionTypeSchema),z.lazy(() => NestedEnumQuestionTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumQuestionTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumQuestionTypeFilterSchema).optional()
}).strict();

export const PatientAnamnesisCountOrderByAggregateInputSchema: z.ZodType<Prisma.PatientAnamnesisCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  patientId: z.lazy(() => SortOrderSchema).optional(),
  templateId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatientAnamnesisMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PatientAnamnesisMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  patientId: z.lazy(() => SortOrderSchema).optional(),
  templateId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatientAnamnesisMinOrderByAggregateInputSchema: z.ZodType<Prisma.PatientAnamnesisMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  patientId: z.lazy(() => SortOrderSchema).optional(),
  templateId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AnamnesisQuestionRelationFilterSchema: z.ZodType<Prisma.AnamnesisQuestionRelationFilter> = z.object({
  is: z.lazy(() => AnamnesisQuestionWhereInputSchema).optional(),
  isNot: z.lazy(() => AnamnesisQuestionWhereInputSchema).optional()
}).strict();

export const PatientAnamnesisRelationFilterSchema: z.ZodType<Prisma.PatientAnamnesisRelationFilter> = z.object({
  is: z.lazy(() => PatientAnamnesisWhereInputSchema).optional(),
  isNot: z.lazy(() => PatientAnamnesisWhereInputSchema).optional()
}).strict();

export const AnamnesisNullableRelationFilterSchema: z.ZodType<Prisma.AnamnesisNullableRelationFilter> = z.object({
  is: z.lazy(() => AnamnesisWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => AnamnesisWhereInputSchema).optional().nullable()
}).strict();

export const AnamnesisAnswerCountOrderByAggregateInputSchema: z.ZodType<Prisma.AnamnesisAnswerCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  answer: z.lazy(() => SortOrderSchema).optional(),
  questionId: z.lazy(() => SortOrderSchema).optional(),
  patientAnamnesisId: z.lazy(() => SortOrderSchema).optional(),
  anamnesisId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AnamnesisAnswerMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AnamnesisAnswerMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  answer: z.lazy(() => SortOrderSchema).optional(),
  questionId: z.lazy(() => SortOrderSchema).optional(),
  patientAnamnesisId: z.lazy(() => SortOrderSchema).optional(),
  anamnesisId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AnamnesisAnswerMinOrderByAggregateInputSchema: z.ZodType<Prisma.AnamnesisAnswerMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  answer: z.lazy(() => SortOrderSchema).optional(),
  questionId: z.lazy(() => SortOrderSchema).optional(),
  patientAnamnesisId: z.lazy(() => SortOrderSchema).optional(),
  anamnesisId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumAppointmentStatusFilterSchema: z.ZodType<Prisma.EnumAppointmentStatusFilter> = z.object({
  equals: z.lazy(() => AppointmentStatusSchema).optional(),
  in: z.lazy(() => AppointmentStatusSchema).array().optional(),
  notIn: z.lazy(() => AppointmentStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => AppointmentStatusSchema),z.lazy(() => NestedEnumAppointmentStatusFilterSchema) ]).optional(),
}).strict();

export const MemberRelationFilterSchema: z.ZodType<Prisma.MemberRelationFilter> = z.object({
  is: z.lazy(() => MemberWhereInputSchema).optional(),
  isNot: z.lazy(() => MemberWhereInputSchema).optional()
}).strict();

export const AppointmentCountOrderByAggregateInputSchema: z.ZodType<Prisma.AppointmentCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  startTime: z.lazy(() => SortOrderSchema).optional(),
  endTime: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  patientId: z.lazy(() => SortOrderSchema).optional(),
  memberId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AppointmentMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AppointmentMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  startTime: z.lazy(() => SortOrderSchema).optional(),
  endTime: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  patientId: z.lazy(() => SortOrderSchema).optional(),
  memberId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AppointmentMinOrderByAggregateInputSchema: z.ZodType<Prisma.AppointmentMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  startTime: z.lazy(() => SortOrderSchema).optional(),
  endTime: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  patientId: z.lazy(() => SortOrderSchema).optional(),
  memberId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumAppointmentStatusWithAggregatesFilterSchema: z.ZodType<Prisma.EnumAppointmentStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => AppointmentStatusSchema).optional(),
  in: z.lazy(() => AppointmentStatusSchema).array().optional(),
  notIn: z.lazy(() => AppointmentStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => AppointmentStatusSchema),z.lazy(() => NestedEnumAppointmentStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumAppointmentStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumAppointmentStatusFilterSchema).optional()
}).strict();

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const PatientListRelationFilterSchema: z.ZodType<Prisma.PatientListRelationFilter> = z.object({
  every: z.lazy(() => PatientWhereInputSchema).optional(),
  some: z.lazy(() => PatientWhereInputSchema).optional(),
  none: z.lazy(() => PatientWhereInputSchema).optional()
}).strict();

export const AnamnesisTemplateListRelationFilterSchema: z.ZodType<Prisma.AnamnesisTemplateListRelationFilter> = z.object({
  every: z.lazy(() => AnamnesisTemplateWhereInputSchema).optional(),
  some: z.lazy(() => AnamnesisTemplateWhereInputSchema).optional(),
  none: z.lazy(() => AnamnesisTemplateWhereInputSchema).optional()
}).strict();

export const PatientOrderByRelationAggregateInputSchema: z.ZodType<Prisma.PatientOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AnamnesisTemplateOrderByRelationAggregateInputSchema: z.ZodType<Prisma.AnamnesisTemplateOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const OrganizationCountOrderByAggregateInputSchema: z.ZodType<Prisma.OrganizationCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  domain: z.lazy(() => SortOrderSchema).optional(),
  shouldAttachUsersByDomain: z.lazy(() => SortOrderSchema).optional(),
  avatarUrl: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  ownerId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const OrganizationMaxOrderByAggregateInputSchema: z.ZodType<Prisma.OrganizationMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  domain: z.lazy(() => SortOrderSchema).optional(),
  shouldAttachUsersByDomain: z.lazy(() => SortOrderSchema).optional(),
  avatarUrl: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  ownerId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const OrganizationMinOrderByAggregateInputSchema: z.ZodType<Prisma.OrganizationMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  domain: z.lazy(() => SortOrderSchema).optional(),
  shouldAttachUsersByDomain: z.lazy(() => SortOrderSchema).optional(),
  avatarUrl: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  ownerId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const EnumTransactionTypeFilterSchema: z.ZodType<Prisma.EnumTransactionTypeFilter> = z.object({
  equals: z.lazy(() => TransactionTypeSchema).optional(),
  in: z.lazy(() => TransactionTypeSchema).array().optional(),
  notIn: z.lazy(() => TransactionTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => TransactionTypeSchema),z.lazy(() => NestedEnumTransactionTypeFilterSchema) ]).optional(),
}).strict();

export const EnumPaymentMethodFilterSchema: z.ZodType<Prisma.EnumPaymentMethodFilter> = z.object({
  equals: z.lazy(() => PaymentMethodSchema).optional(),
  in: z.lazy(() => PaymentMethodSchema).array().optional(),
  notIn: z.lazy(() => PaymentMethodSchema).array().optional(),
  not: z.union([ z.lazy(() => PaymentMethodSchema),z.lazy(() => NestedEnumPaymentMethodFilterSchema) ]).optional(),
}).strict();

export const PatientNullableRelationFilterSchema: z.ZodType<Prisma.PatientNullableRelationFilter> = z.object({
  is: z.lazy(() => PatientWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => PatientWhereInputSchema).optional().nullable()
}).strict();

export const FinancialTransactionCountOrderByAggregateInputSchema: z.ZodType<Prisma.FinancialTransactionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  paymentMethod: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  organizationId: z.lazy(() => SortOrderSchema).optional(),
  patientId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FinancialTransactionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.FinancialTransactionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  paymentMethod: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  organizationId: z.lazy(() => SortOrderSchema).optional(),
  patientId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FinancialTransactionMinOrderByAggregateInputSchema: z.ZodType<Prisma.FinancialTransactionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  paymentMethod: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  organizationId: z.lazy(() => SortOrderSchema).optional(),
  patientId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumTransactionTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumTransactionTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => TransactionTypeSchema).optional(),
  in: z.lazy(() => TransactionTypeSchema).array().optional(),
  notIn: z.lazy(() => TransactionTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => TransactionTypeSchema),z.lazy(() => NestedEnumTransactionTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumTransactionTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumTransactionTypeFilterSchema).optional()
}).strict();

export const EnumPaymentMethodWithAggregatesFilterSchema: z.ZodType<Prisma.EnumPaymentMethodWithAggregatesFilter> = z.object({
  equals: z.lazy(() => PaymentMethodSchema).optional(),
  in: z.lazy(() => PaymentMethodSchema).array().optional(),
  notIn: z.lazy(() => PaymentMethodSchema).array().optional(),
  not: z.union([ z.lazy(() => PaymentMethodSchema),z.lazy(() => NestedEnumPaymentMethodWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumPaymentMethodFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumPaymentMethodFilterSchema).optional()
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const CustomerSatisfactionCountOrderByAggregateInputSchema: z.ZodType<Prisma.CustomerSatisfactionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  rating: z.lazy(() => SortOrderSchema).optional(),
  comment: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  patientId: z.lazy(() => SortOrderSchema).optional(),
  organizationId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CustomerSatisfactionAvgOrderByAggregateInputSchema: z.ZodType<Prisma.CustomerSatisfactionAvgOrderByAggregateInput> = z.object({
  rating: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CustomerSatisfactionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CustomerSatisfactionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  rating: z.lazy(() => SortOrderSchema).optional(),
  comment: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  patientId: z.lazy(() => SortOrderSchema).optional(),
  organizationId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CustomerSatisfactionMinOrderByAggregateInputSchema: z.ZodType<Prisma.CustomerSatisfactionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  rating: z.lazy(() => SortOrderSchema).optional(),
  comment: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  patientId: z.lazy(() => SortOrderSchema).optional(),
  organizationId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CustomerSatisfactionSumOrderByAggregateInputSchema: z.ZodType<Prisma.CustomerSatisfactionSumOrderByAggregateInput> = z.object({
  rating: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const TokenCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.TokenCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => TokenCreateWithoutUserInputSchema),z.lazy(() => TokenCreateWithoutUserInputSchema).array(),z.lazy(() => TokenUncheckedCreateWithoutUserInputSchema),z.lazy(() => TokenUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TokenCreateOrConnectWithoutUserInputSchema),z.lazy(() => TokenCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TokenCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TokenWhereUniqueInputSchema),z.lazy(() => TokenWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AccountCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const InviteCreateNestedManyWithoutAuthorInputSchema: z.ZodType<Prisma.InviteCreateNestedManyWithoutAuthorInput> = z.object({
  create: z.union([ z.lazy(() => InviteCreateWithoutAuthorInputSchema),z.lazy(() => InviteCreateWithoutAuthorInputSchema).array(),z.lazy(() => InviteUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => InviteUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InviteCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => InviteCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InviteCreateManyAuthorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => InviteWhereUniqueInputSchema),z.lazy(() => InviteWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const MemberCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.MemberCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => MemberCreateWithoutUserInputSchema),z.lazy(() => MemberCreateWithoutUserInputSchema).array(),z.lazy(() => MemberUncheckedCreateWithoutUserInputSchema),z.lazy(() => MemberUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MemberCreateOrConnectWithoutUserInputSchema),z.lazy(() => MemberCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MemberCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MemberWhereUniqueInputSchema),z.lazy(() => MemberWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const OrganizationCreateNestedManyWithoutOwnerInputSchema: z.ZodType<Prisma.OrganizationCreateNestedManyWithoutOwnerInput> = z.object({
  create: z.union([ z.lazy(() => OrganizationCreateWithoutOwnerInputSchema),z.lazy(() => OrganizationCreateWithoutOwnerInputSchema).array(),z.lazy(() => OrganizationUncheckedCreateWithoutOwnerInputSchema),z.lazy(() => OrganizationUncheckedCreateWithoutOwnerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => OrganizationCreateOrConnectWithoutOwnerInputSchema),z.lazy(() => OrganizationCreateOrConnectWithoutOwnerInputSchema).array() ]).optional(),
  createMany: z.lazy(() => OrganizationCreateManyOwnerInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => OrganizationWhereUniqueInputSchema),z.lazy(() => OrganizationWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TokenUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.TokenUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => TokenCreateWithoutUserInputSchema),z.lazy(() => TokenCreateWithoutUserInputSchema).array(),z.lazy(() => TokenUncheckedCreateWithoutUserInputSchema),z.lazy(() => TokenUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TokenCreateOrConnectWithoutUserInputSchema),z.lazy(() => TokenCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TokenCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TokenWhereUniqueInputSchema),z.lazy(() => TokenWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AccountUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const InviteUncheckedCreateNestedManyWithoutAuthorInputSchema: z.ZodType<Prisma.InviteUncheckedCreateNestedManyWithoutAuthorInput> = z.object({
  create: z.union([ z.lazy(() => InviteCreateWithoutAuthorInputSchema),z.lazy(() => InviteCreateWithoutAuthorInputSchema).array(),z.lazy(() => InviteUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => InviteUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InviteCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => InviteCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InviteCreateManyAuthorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => InviteWhereUniqueInputSchema),z.lazy(() => InviteWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const MemberUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.MemberUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => MemberCreateWithoutUserInputSchema),z.lazy(() => MemberCreateWithoutUserInputSchema).array(),z.lazy(() => MemberUncheckedCreateWithoutUserInputSchema),z.lazy(() => MemberUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MemberCreateOrConnectWithoutUserInputSchema),z.lazy(() => MemberCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MemberCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MemberWhereUniqueInputSchema),z.lazy(() => MemberWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const OrganizationUncheckedCreateNestedManyWithoutOwnerInputSchema: z.ZodType<Prisma.OrganizationUncheckedCreateNestedManyWithoutOwnerInput> = z.object({
  create: z.union([ z.lazy(() => OrganizationCreateWithoutOwnerInputSchema),z.lazy(() => OrganizationCreateWithoutOwnerInputSchema).array(),z.lazy(() => OrganizationUncheckedCreateWithoutOwnerInputSchema),z.lazy(() => OrganizationUncheckedCreateWithoutOwnerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => OrganizationCreateOrConnectWithoutOwnerInputSchema),z.lazy(() => OrganizationCreateOrConnectWithoutOwnerInputSchema).array() ]).optional(),
  createMany: z.lazy(() => OrganizationCreateManyOwnerInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => OrganizationWhereUniqueInputSchema),z.lazy(() => OrganizationWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const TokenUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.TokenUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => TokenCreateWithoutUserInputSchema),z.lazy(() => TokenCreateWithoutUserInputSchema).array(),z.lazy(() => TokenUncheckedCreateWithoutUserInputSchema),z.lazy(() => TokenUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TokenCreateOrConnectWithoutUserInputSchema),z.lazy(() => TokenCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TokenUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => TokenUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TokenCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TokenWhereUniqueInputSchema),z.lazy(() => TokenWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TokenWhereUniqueInputSchema),z.lazy(() => TokenWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TokenWhereUniqueInputSchema),z.lazy(() => TokenWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TokenWhereUniqueInputSchema),z.lazy(() => TokenWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TokenUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => TokenUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TokenUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => TokenUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TokenScalarWhereInputSchema),z.lazy(() => TokenScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AccountUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AccountUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const InviteUpdateManyWithoutAuthorNestedInputSchema: z.ZodType<Prisma.InviteUpdateManyWithoutAuthorNestedInput> = z.object({
  create: z.union([ z.lazy(() => InviteCreateWithoutAuthorInputSchema),z.lazy(() => InviteCreateWithoutAuthorInputSchema).array(),z.lazy(() => InviteUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => InviteUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InviteCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => InviteCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => InviteUpsertWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => InviteUpsertWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InviteCreateManyAuthorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => InviteWhereUniqueInputSchema),z.lazy(() => InviteWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => InviteWhereUniqueInputSchema),z.lazy(() => InviteWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => InviteWhereUniqueInputSchema),z.lazy(() => InviteWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => InviteWhereUniqueInputSchema),z.lazy(() => InviteWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => InviteUpdateWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => InviteUpdateWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => InviteUpdateManyWithWhereWithoutAuthorInputSchema),z.lazy(() => InviteUpdateManyWithWhereWithoutAuthorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => InviteScalarWhereInputSchema),z.lazy(() => InviteScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const MemberUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.MemberUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => MemberCreateWithoutUserInputSchema),z.lazy(() => MemberCreateWithoutUserInputSchema).array(),z.lazy(() => MemberUncheckedCreateWithoutUserInputSchema),z.lazy(() => MemberUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MemberCreateOrConnectWithoutUserInputSchema),z.lazy(() => MemberCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MemberUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => MemberUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MemberCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MemberWhereUniqueInputSchema),z.lazy(() => MemberWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MemberWhereUniqueInputSchema),z.lazy(() => MemberWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MemberWhereUniqueInputSchema),z.lazy(() => MemberWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MemberWhereUniqueInputSchema),z.lazy(() => MemberWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MemberUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => MemberUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MemberUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => MemberUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MemberScalarWhereInputSchema),z.lazy(() => MemberScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const OrganizationUpdateManyWithoutOwnerNestedInputSchema: z.ZodType<Prisma.OrganizationUpdateManyWithoutOwnerNestedInput> = z.object({
  create: z.union([ z.lazy(() => OrganizationCreateWithoutOwnerInputSchema),z.lazy(() => OrganizationCreateWithoutOwnerInputSchema).array(),z.lazy(() => OrganizationUncheckedCreateWithoutOwnerInputSchema),z.lazy(() => OrganizationUncheckedCreateWithoutOwnerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => OrganizationCreateOrConnectWithoutOwnerInputSchema),z.lazy(() => OrganizationCreateOrConnectWithoutOwnerInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => OrganizationUpsertWithWhereUniqueWithoutOwnerInputSchema),z.lazy(() => OrganizationUpsertWithWhereUniqueWithoutOwnerInputSchema).array() ]).optional(),
  createMany: z.lazy(() => OrganizationCreateManyOwnerInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => OrganizationWhereUniqueInputSchema),z.lazy(() => OrganizationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => OrganizationWhereUniqueInputSchema),z.lazy(() => OrganizationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => OrganizationWhereUniqueInputSchema),z.lazy(() => OrganizationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => OrganizationWhereUniqueInputSchema),z.lazy(() => OrganizationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => OrganizationUpdateWithWhereUniqueWithoutOwnerInputSchema),z.lazy(() => OrganizationUpdateWithWhereUniqueWithoutOwnerInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => OrganizationUpdateManyWithWhereWithoutOwnerInputSchema),z.lazy(() => OrganizationUpdateManyWithWhereWithoutOwnerInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => OrganizationScalarWhereInputSchema),z.lazy(() => OrganizationScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TokenUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.TokenUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => TokenCreateWithoutUserInputSchema),z.lazy(() => TokenCreateWithoutUserInputSchema).array(),z.lazy(() => TokenUncheckedCreateWithoutUserInputSchema),z.lazy(() => TokenUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TokenCreateOrConnectWithoutUserInputSchema),z.lazy(() => TokenCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TokenUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => TokenUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TokenCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TokenWhereUniqueInputSchema),z.lazy(() => TokenWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TokenWhereUniqueInputSchema),z.lazy(() => TokenWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TokenWhereUniqueInputSchema),z.lazy(() => TokenWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TokenWhereUniqueInputSchema),z.lazy(() => TokenWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TokenUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => TokenUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TokenUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => TokenUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TokenScalarWhereInputSchema),z.lazy(() => TokenScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AccountUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const InviteUncheckedUpdateManyWithoutAuthorNestedInputSchema: z.ZodType<Prisma.InviteUncheckedUpdateManyWithoutAuthorNestedInput> = z.object({
  create: z.union([ z.lazy(() => InviteCreateWithoutAuthorInputSchema),z.lazy(() => InviteCreateWithoutAuthorInputSchema).array(),z.lazy(() => InviteUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => InviteUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InviteCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => InviteCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => InviteUpsertWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => InviteUpsertWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InviteCreateManyAuthorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => InviteWhereUniqueInputSchema),z.lazy(() => InviteWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => InviteWhereUniqueInputSchema),z.lazy(() => InviteWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => InviteWhereUniqueInputSchema),z.lazy(() => InviteWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => InviteWhereUniqueInputSchema),z.lazy(() => InviteWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => InviteUpdateWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => InviteUpdateWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => InviteUpdateManyWithWhereWithoutAuthorInputSchema),z.lazy(() => InviteUpdateManyWithWhereWithoutAuthorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => InviteScalarWhereInputSchema),z.lazy(() => InviteScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const MemberUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.MemberUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => MemberCreateWithoutUserInputSchema),z.lazy(() => MemberCreateWithoutUserInputSchema).array(),z.lazy(() => MemberUncheckedCreateWithoutUserInputSchema),z.lazy(() => MemberUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MemberCreateOrConnectWithoutUserInputSchema),z.lazy(() => MemberCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MemberUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => MemberUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MemberCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MemberWhereUniqueInputSchema),z.lazy(() => MemberWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MemberWhereUniqueInputSchema),z.lazy(() => MemberWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MemberWhereUniqueInputSchema),z.lazy(() => MemberWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MemberWhereUniqueInputSchema),z.lazy(() => MemberWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MemberUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => MemberUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MemberUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => MemberUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MemberScalarWhereInputSchema),z.lazy(() => MemberScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const OrganizationUncheckedUpdateManyWithoutOwnerNestedInputSchema: z.ZodType<Prisma.OrganizationUncheckedUpdateManyWithoutOwnerNestedInput> = z.object({
  create: z.union([ z.lazy(() => OrganizationCreateWithoutOwnerInputSchema),z.lazy(() => OrganizationCreateWithoutOwnerInputSchema).array(),z.lazy(() => OrganizationUncheckedCreateWithoutOwnerInputSchema),z.lazy(() => OrganizationUncheckedCreateWithoutOwnerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => OrganizationCreateOrConnectWithoutOwnerInputSchema),z.lazy(() => OrganizationCreateOrConnectWithoutOwnerInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => OrganizationUpsertWithWhereUniqueWithoutOwnerInputSchema),z.lazy(() => OrganizationUpsertWithWhereUniqueWithoutOwnerInputSchema).array() ]).optional(),
  createMany: z.lazy(() => OrganizationCreateManyOwnerInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => OrganizationWhereUniqueInputSchema),z.lazy(() => OrganizationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => OrganizationWhereUniqueInputSchema),z.lazy(() => OrganizationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => OrganizationWhereUniqueInputSchema),z.lazy(() => OrganizationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => OrganizationWhereUniqueInputSchema),z.lazy(() => OrganizationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => OrganizationUpdateWithWhereUniqueWithoutOwnerInputSchema),z.lazy(() => OrganizationUpdateWithWhereUniqueWithoutOwnerInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => OrganizationUpdateManyWithWhereWithoutOwnerInputSchema),z.lazy(() => OrganizationUpdateManyWithWhereWithoutOwnerInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => OrganizationScalarWhereInputSchema),z.lazy(() => OrganizationScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutTokensInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutTokensInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutTokensInputSchema),z.lazy(() => UserUncheckedCreateWithoutTokensInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutTokensInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const EnumTokenTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumTokenTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => TokenTypeSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutTokensNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutTokensNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutTokensInputSchema),z.lazy(() => UserUncheckedCreateWithoutTokensInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutTokensInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutTokensInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutTokensInputSchema),z.lazy(() => UserUpdateWithoutTokensInputSchema),z.lazy(() => UserUncheckedUpdateWithoutTokensInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutAccountsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAccountsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const EnumAccountProviderFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumAccountProviderFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => AccountProviderSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutAccountsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutAccountsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAccountsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutAccountsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutAccountsInputSchema),z.lazy(() => UserUpdateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutInvitesInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutInvitesInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutInvitesInputSchema),z.lazy(() => UserUncheckedCreateWithoutInvitesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutInvitesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const OrganizationCreateNestedOneWithoutInvitesInputSchema: z.ZodType<Prisma.OrganizationCreateNestedOneWithoutInvitesInput> = z.object({
  create: z.union([ z.lazy(() => OrganizationCreateWithoutInvitesInputSchema),z.lazy(() => OrganizationUncheckedCreateWithoutInvitesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => OrganizationCreateOrConnectWithoutInvitesInputSchema).optional(),
  connect: z.lazy(() => OrganizationWhereUniqueInputSchema).optional()
}).strict();

export const EnumRoleFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumRoleFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => RoleSchema).optional()
}).strict();

export const UserUpdateOneWithoutInvitesNestedInputSchema: z.ZodType<Prisma.UserUpdateOneWithoutInvitesNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutInvitesInputSchema),z.lazy(() => UserUncheckedCreateWithoutInvitesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutInvitesInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutInvitesInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutInvitesInputSchema),z.lazy(() => UserUpdateWithoutInvitesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutInvitesInputSchema) ]).optional(),
}).strict();

export const OrganizationUpdateOneRequiredWithoutInvitesNestedInputSchema: z.ZodType<Prisma.OrganizationUpdateOneRequiredWithoutInvitesNestedInput> = z.object({
  create: z.union([ z.lazy(() => OrganizationCreateWithoutInvitesInputSchema),z.lazy(() => OrganizationUncheckedCreateWithoutInvitesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => OrganizationCreateOrConnectWithoutInvitesInputSchema).optional(),
  upsert: z.lazy(() => OrganizationUpsertWithoutInvitesInputSchema).optional(),
  connect: z.lazy(() => OrganizationWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => OrganizationUpdateToOneWithWhereWithoutInvitesInputSchema),z.lazy(() => OrganizationUpdateWithoutInvitesInputSchema),z.lazy(() => OrganizationUncheckedUpdateWithoutInvitesInputSchema) ]).optional(),
}).strict();

export const OrganizationCreateNestedOneWithoutMembersInputSchema: z.ZodType<Prisma.OrganizationCreateNestedOneWithoutMembersInput> = z.object({
  create: z.union([ z.lazy(() => OrganizationCreateWithoutMembersInputSchema),z.lazy(() => OrganizationUncheckedCreateWithoutMembersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => OrganizationCreateOrConnectWithoutMembersInputSchema).optional(),
  connect: z.lazy(() => OrganizationWhereUniqueInputSchema).optional()
}).strict();

export const UserCreateNestedOneWithoutMember_onInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutMember_onInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutMember_onInputSchema),z.lazy(() => UserUncheckedCreateWithoutMember_onInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutMember_onInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const AppointmentCreateNestedManyWithoutMemberInputSchema: z.ZodType<Prisma.AppointmentCreateNestedManyWithoutMemberInput> = z.object({
  create: z.union([ z.lazy(() => AppointmentCreateWithoutMemberInputSchema),z.lazy(() => AppointmentCreateWithoutMemberInputSchema).array(),z.lazy(() => AppointmentUncheckedCreateWithoutMemberInputSchema),z.lazy(() => AppointmentUncheckedCreateWithoutMemberInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AppointmentCreateOrConnectWithoutMemberInputSchema),z.lazy(() => AppointmentCreateOrConnectWithoutMemberInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AppointmentCreateManyMemberInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AppointmentWhereUniqueInputSchema),z.lazy(() => AppointmentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AppointmentUncheckedCreateNestedManyWithoutMemberInputSchema: z.ZodType<Prisma.AppointmentUncheckedCreateNestedManyWithoutMemberInput> = z.object({
  create: z.union([ z.lazy(() => AppointmentCreateWithoutMemberInputSchema),z.lazy(() => AppointmentCreateWithoutMemberInputSchema).array(),z.lazy(() => AppointmentUncheckedCreateWithoutMemberInputSchema),z.lazy(() => AppointmentUncheckedCreateWithoutMemberInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AppointmentCreateOrConnectWithoutMemberInputSchema),z.lazy(() => AppointmentCreateOrConnectWithoutMemberInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AppointmentCreateManyMemberInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AppointmentWhereUniqueInputSchema),z.lazy(() => AppointmentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const OrganizationUpdateOneRequiredWithoutMembersNestedInputSchema: z.ZodType<Prisma.OrganizationUpdateOneRequiredWithoutMembersNestedInput> = z.object({
  create: z.union([ z.lazy(() => OrganizationCreateWithoutMembersInputSchema),z.lazy(() => OrganizationUncheckedCreateWithoutMembersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => OrganizationCreateOrConnectWithoutMembersInputSchema).optional(),
  upsert: z.lazy(() => OrganizationUpsertWithoutMembersInputSchema).optional(),
  connect: z.lazy(() => OrganizationWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => OrganizationUpdateToOneWithWhereWithoutMembersInputSchema),z.lazy(() => OrganizationUpdateWithoutMembersInputSchema),z.lazy(() => OrganizationUncheckedUpdateWithoutMembersInputSchema) ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutMember_onNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutMember_onNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutMember_onInputSchema),z.lazy(() => UserUncheckedCreateWithoutMember_onInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutMember_onInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutMember_onInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutMember_onInputSchema),z.lazy(() => UserUpdateWithoutMember_onInputSchema),z.lazy(() => UserUncheckedUpdateWithoutMember_onInputSchema) ]).optional(),
}).strict();

export const AppointmentUpdateManyWithoutMemberNestedInputSchema: z.ZodType<Prisma.AppointmentUpdateManyWithoutMemberNestedInput> = z.object({
  create: z.union([ z.lazy(() => AppointmentCreateWithoutMemberInputSchema),z.lazy(() => AppointmentCreateWithoutMemberInputSchema).array(),z.lazy(() => AppointmentUncheckedCreateWithoutMemberInputSchema),z.lazy(() => AppointmentUncheckedCreateWithoutMemberInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AppointmentCreateOrConnectWithoutMemberInputSchema),z.lazy(() => AppointmentCreateOrConnectWithoutMemberInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AppointmentUpsertWithWhereUniqueWithoutMemberInputSchema),z.lazy(() => AppointmentUpsertWithWhereUniqueWithoutMemberInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AppointmentCreateManyMemberInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AppointmentWhereUniqueInputSchema),z.lazy(() => AppointmentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AppointmentWhereUniqueInputSchema),z.lazy(() => AppointmentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AppointmentWhereUniqueInputSchema),z.lazy(() => AppointmentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AppointmentWhereUniqueInputSchema),z.lazy(() => AppointmentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AppointmentUpdateWithWhereUniqueWithoutMemberInputSchema),z.lazy(() => AppointmentUpdateWithWhereUniqueWithoutMemberInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AppointmentUpdateManyWithWhereWithoutMemberInputSchema),z.lazy(() => AppointmentUpdateManyWithWhereWithoutMemberInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AppointmentScalarWhereInputSchema),z.lazy(() => AppointmentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AppointmentUncheckedUpdateManyWithoutMemberNestedInputSchema: z.ZodType<Prisma.AppointmentUncheckedUpdateManyWithoutMemberNestedInput> = z.object({
  create: z.union([ z.lazy(() => AppointmentCreateWithoutMemberInputSchema),z.lazy(() => AppointmentCreateWithoutMemberInputSchema).array(),z.lazy(() => AppointmentUncheckedCreateWithoutMemberInputSchema),z.lazy(() => AppointmentUncheckedCreateWithoutMemberInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AppointmentCreateOrConnectWithoutMemberInputSchema),z.lazy(() => AppointmentCreateOrConnectWithoutMemberInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AppointmentUpsertWithWhereUniqueWithoutMemberInputSchema),z.lazy(() => AppointmentUpsertWithWhereUniqueWithoutMemberInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AppointmentCreateManyMemberInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AppointmentWhereUniqueInputSchema),z.lazy(() => AppointmentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AppointmentWhereUniqueInputSchema),z.lazy(() => AppointmentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AppointmentWhereUniqueInputSchema),z.lazy(() => AppointmentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AppointmentWhereUniqueInputSchema),z.lazy(() => AppointmentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AppointmentUpdateWithWhereUniqueWithoutMemberInputSchema),z.lazy(() => AppointmentUpdateWithWhereUniqueWithoutMemberInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AppointmentUpdateManyWithWhereWithoutMemberInputSchema),z.lazy(() => AppointmentUpdateManyWithWhereWithoutMemberInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AppointmentScalarWhereInputSchema),z.lazy(() => AppointmentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const OrganizationCreateNestedOneWithoutPatientsInputSchema: z.ZodType<Prisma.OrganizationCreateNestedOneWithoutPatientsInput> = z.object({
  create: z.union([ z.lazy(() => OrganizationCreateWithoutPatientsInputSchema),z.lazy(() => OrganizationUncheckedCreateWithoutPatientsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => OrganizationCreateOrConnectWithoutPatientsInputSchema).optional(),
  connect: z.lazy(() => OrganizationWhereUniqueInputSchema).optional()
}).strict();

export const MedicalRecordCreateNestedOneWithoutPatientInputSchema: z.ZodType<Prisma.MedicalRecordCreateNestedOneWithoutPatientInput> = z.object({
  create: z.union([ z.lazy(() => MedicalRecordCreateWithoutPatientInputSchema),z.lazy(() => MedicalRecordUncheckedCreateWithoutPatientInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => MedicalRecordCreateOrConnectWithoutPatientInputSchema).optional(),
  connect: z.lazy(() => MedicalRecordWhereUniqueInputSchema).optional()
}).strict();

export const AppointmentCreateNestedManyWithoutPatientInputSchema: z.ZodType<Prisma.AppointmentCreateNestedManyWithoutPatientInput> = z.object({
  create: z.union([ z.lazy(() => AppointmentCreateWithoutPatientInputSchema),z.lazy(() => AppointmentCreateWithoutPatientInputSchema).array(),z.lazy(() => AppointmentUncheckedCreateWithoutPatientInputSchema),z.lazy(() => AppointmentUncheckedCreateWithoutPatientInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AppointmentCreateOrConnectWithoutPatientInputSchema),z.lazy(() => AppointmentCreateOrConnectWithoutPatientInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AppointmentCreateManyPatientInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AppointmentWhereUniqueInputSchema),z.lazy(() => AppointmentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FinancialTransactionCreateNestedManyWithoutPatientInputSchema: z.ZodType<Prisma.FinancialTransactionCreateNestedManyWithoutPatientInput> = z.object({
  create: z.union([ z.lazy(() => FinancialTransactionCreateWithoutPatientInputSchema),z.lazy(() => FinancialTransactionCreateWithoutPatientInputSchema).array(),z.lazy(() => FinancialTransactionUncheckedCreateWithoutPatientInputSchema),z.lazy(() => FinancialTransactionUncheckedCreateWithoutPatientInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FinancialTransactionCreateOrConnectWithoutPatientInputSchema),z.lazy(() => FinancialTransactionCreateOrConnectWithoutPatientInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FinancialTransactionCreateManyPatientInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FinancialTransactionWhereUniqueInputSchema),z.lazy(() => FinancialTransactionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CustomerSatisfactionCreateNestedManyWithoutPatientInputSchema: z.ZodType<Prisma.CustomerSatisfactionCreateNestedManyWithoutPatientInput> = z.object({
  create: z.union([ z.lazy(() => CustomerSatisfactionCreateWithoutPatientInputSchema),z.lazy(() => CustomerSatisfactionCreateWithoutPatientInputSchema).array(),z.lazy(() => CustomerSatisfactionUncheckedCreateWithoutPatientInputSchema),z.lazy(() => CustomerSatisfactionUncheckedCreateWithoutPatientInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CustomerSatisfactionCreateOrConnectWithoutPatientInputSchema),z.lazy(() => CustomerSatisfactionCreateOrConnectWithoutPatientInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CustomerSatisfactionCreateManyPatientInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CustomerSatisfactionWhereUniqueInputSchema),z.lazy(() => CustomerSatisfactionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PatientAnamnesisCreateNestedManyWithoutPatientInputSchema: z.ZodType<Prisma.PatientAnamnesisCreateNestedManyWithoutPatientInput> = z.object({
  create: z.union([ z.lazy(() => PatientAnamnesisCreateWithoutPatientInputSchema),z.lazy(() => PatientAnamnesisCreateWithoutPatientInputSchema).array(),z.lazy(() => PatientAnamnesisUncheckedCreateWithoutPatientInputSchema),z.lazy(() => PatientAnamnesisUncheckedCreateWithoutPatientInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PatientAnamnesisCreateOrConnectWithoutPatientInputSchema),z.lazy(() => PatientAnamnesisCreateOrConnectWithoutPatientInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PatientAnamnesisCreateManyPatientInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PatientAnamnesisWhereUniqueInputSchema),z.lazy(() => PatientAnamnesisWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const MedicalRecordUncheckedCreateNestedOneWithoutPatientInputSchema: z.ZodType<Prisma.MedicalRecordUncheckedCreateNestedOneWithoutPatientInput> = z.object({
  create: z.union([ z.lazy(() => MedicalRecordCreateWithoutPatientInputSchema),z.lazy(() => MedicalRecordUncheckedCreateWithoutPatientInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => MedicalRecordCreateOrConnectWithoutPatientInputSchema).optional(),
  connect: z.lazy(() => MedicalRecordWhereUniqueInputSchema).optional()
}).strict();

export const AppointmentUncheckedCreateNestedManyWithoutPatientInputSchema: z.ZodType<Prisma.AppointmentUncheckedCreateNestedManyWithoutPatientInput> = z.object({
  create: z.union([ z.lazy(() => AppointmentCreateWithoutPatientInputSchema),z.lazy(() => AppointmentCreateWithoutPatientInputSchema).array(),z.lazy(() => AppointmentUncheckedCreateWithoutPatientInputSchema),z.lazy(() => AppointmentUncheckedCreateWithoutPatientInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AppointmentCreateOrConnectWithoutPatientInputSchema),z.lazy(() => AppointmentCreateOrConnectWithoutPatientInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AppointmentCreateManyPatientInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AppointmentWhereUniqueInputSchema),z.lazy(() => AppointmentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FinancialTransactionUncheckedCreateNestedManyWithoutPatientInputSchema: z.ZodType<Prisma.FinancialTransactionUncheckedCreateNestedManyWithoutPatientInput> = z.object({
  create: z.union([ z.lazy(() => FinancialTransactionCreateWithoutPatientInputSchema),z.lazy(() => FinancialTransactionCreateWithoutPatientInputSchema).array(),z.lazy(() => FinancialTransactionUncheckedCreateWithoutPatientInputSchema),z.lazy(() => FinancialTransactionUncheckedCreateWithoutPatientInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FinancialTransactionCreateOrConnectWithoutPatientInputSchema),z.lazy(() => FinancialTransactionCreateOrConnectWithoutPatientInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FinancialTransactionCreateManyPatientInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FinancialTransactionWhereUniqueInputSchema),z.lazy(() => FinancialTransactionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CustomerSatisfactionUncheckedCreateNestedManyWithoutPatientInputSchema: z.ZodType<Prisma.CustomerSatisfactionUncheckedCreateNestedManyWithoutPatientInput> = z.object({
  create: z.union([ z.lazy(() => CustomerSatisfactionCreateWithoutPatientInputSchema),z.lazy(() => CustomerSatisfactionCreateWithoutPatientInputSchema).array(),z.lazy(() => CustomerSatisfactionUncheckedCreateWithoutPatientInputSchema),z.lazy(() => CustomerSatisfactionUncheckedCreateWithoutPatientInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CustomerSatisfactionCreateOrConnectWithoutPatientInputSchema),z.lazy(() => CustomerSatisfactionCreateOrConnectWithoutPatientInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CustomerSatisfactionCreateManyPatientInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CustomerSatisfactionWhereUniqueInputSchema),z.lazy(() => CustomerSatisfactionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PatientAnamnesisUncheckedCreateNestedManyWithoutPatientInputSchema: z.ZodType<Prisma.PatientAnamnesisUncheckedCreateNestedManyWithoutPatientInput> = z.object({
  create: z.union([ z.lazy(() => PatientAnamnesisCreateWithoutPatientInputSchema),z.lazy(() => PatientAnamnesisCreateWithoutPatientInputSchema).array(),z.lazy(() => PatientAnamnesisUncheckedCreateWithoutPatientInputSchema),z.lazy(() => PatientAnamnesisUncheckedCreateWithoutPatientInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PatientAnamnesisCreateOrConnectWithoutPatientInputSchema),z.lazy(() => PatientAnamnesisCreateOrConnectWithoutPatientInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PatientAnamnesisCreateManyPatientInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PatientAnamnesisWhereUniqueInputSchema),z.lazy(() => PatientAnamnesisWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const OrganizationUpdateOneRequiredWithoutPatientsNestedInputSchema: z.ZodType<Prisma.OrganizationUpdateOneRequiredWithoutPatientsNestedInput> = z.object({
  create: z.union([ z.lazy(() => OrganizationCreateWithoutPatientsInputSchema),z.lazy(() => OrganizationUncheckedCreateWithoutPatientsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => OrganizationCreateOrConnectWithoutPatientsInputSchema).optional(),
  upsert: z.lazy(() => OrganizationUpsertWithoutPatientsInputSchema).optional(),
  connect: z.lazy(() => OrganizationWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => OrganizationUpdateToOneWithWhereWithoutPatientsInputSchema),z.lazy(() => OrganizationUpdateWithoutPatientsInputSchema),z.lazy(() => OrganizationUncheckedUpdateWithoutPatientsInputSchema) ]).optional(),
}).strict();

export const MedicalRecordUpdateOneWithoutPatientNestedInputSchema: z.ZodType<Prisma.MedicalRecordUpdateOneWithoutPatientNestedInput> = z.object({
  create: z.union([ z.lazy(() => MedicalRecordCreateWithoutPatientInputSchema),z.lazy(() => MedicalRecordUncheckedCreateWithoutPatientInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => MedicalRecordCreateOrConnectWithoutPatientInputSchema).optional(),
  upsert: z.lazy(() => MedicalRecordUpsertWithoutPatientInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => MedicalRecordWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => MedicalRecordWhereInputSchema) ]).optional(),
  connect: z.lazy(() => MedicalRecordWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => MedicalRecordUpdateToOneWithWhereWithoutPatientInputSchema),z.lazy(() => MedicalRecordUpdateWithoutPatientInputSchema),z.lazy(() => MedicalRecordUncheckedUpdateWithoutPatientInputSchema) ]).optional(),
}).strict();

export const AppointmentUpdateManyWithoutPatientNestedInputSchema: z.ZodType<Prisma.AppointmentUpdateManyWithoutPatientNestedInput> = z.object({
  create: z.union([ z.lazy(() => AppointmentCreateWithoutPatientInputSchema),z.lazy(() => AppointmentCreateWithoutPatientInputSchema).array(),z.lazy(() => AppointmentUncheckedCreateWithoutPatientInputSchema),z.lazy(() => AppointmentUncheckedCreateWithoutPatientInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AppointmentCreateOrConnectWithoutPatientInputSchema),z.lazy(() => AppointmentCreateOrConnectWithoutPatientInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AppointmentUpsertWithWhereUniqueWithoutPatientInputSchema),z.lazy(() => AppointmentUpsertWithWhereUniqueWithoutPatientInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AppointmentCreateManyPatientInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AppointmentWhereUniqueInputSchema),z.lazy(() => AppointmentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AppointmentWhereUniqueInputSchema),z.lazy(() => AppointmentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AppointmentWhereUniqueInputSchema),z.lazy(() => AppointmentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AppointmentWhereUniqueInputSchema),z.lazy(() => AppointmentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AppointmentUpdateWithWhereUniqueWithoutPatientInputSchema),z.lazy(() => AppointmentUpdateWithWhereUniqueWithoutPatientInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AppointmentUpdateManyWithWhereWithoutPatientInputSchema),z.lazy(() => AppointmentUpdateManyWithWhereWithoutPatientInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AppointmentScalarWhereInputSchema),z.lazy(() => AppointmentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const FinancialTransactionUpdateManyWithoutPatientNestedInputSchema: z.ZodType<Prisma.FinancialTransactionUpdateManyWithoutPatientNestedInput> = z.object({
  create: z.union([ z.lazy(() => FinancialTransactionCreateWithoutPatientInputSchema),z.lazy(() => FinancialTransactionCreateWithoutPatientInputSchema).array(),z.lazy(() => FinancialTransactionUncheckedCreateWithoutPatientInputSchema),z.lazy(() => FinancialTransactionUncheckedCreateWithoutPatientInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FinancialTransactionCreateOrConnectWithoutPatientInputSchema),z.lazy(() => FinancialTransactionCreateOrConnectWithoutPatientInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FinancialTransactionUpsertWithWhereUniqueWithoutPatientInputSchema),z.lazy(() => FinancialTransactionUpsertWithWhereUniqueWithoutPatientInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FinancialTransactionCreateManyPatientInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FinancialTransactionWhereUniqueInputSchema),z.lazy(() => FinancialTransactionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FinancialTransactionWhereUniqueInputSchema),z.lazy(() => FinancialTransactionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FinancialTransactionWhereUniqueInputSchema),z.lazy(() => FinancialTransactionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FinancialTransactionWhereUniqueInputSchema),z.lazy(() => FinancialTransactionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FinancialTransactionUpdateWithWhereUniqueWithoutPatientInputSchema),z.lazy(() => FinancialTransactionUpdateWithWhereUniqueWithoutPatientInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FinancialTransactionUpdateManyWithWhereWithoutPatientInputSchema),z.lazy(() => FinancialTransactionUpdateManyWithWhereWithoutPatientInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FinancialTransactionScalarWhereInputSchema),z.lazy(() => FinancialTransactionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CustomerSatisfactionUpdateManyWithoutPatientNestedInputSchema: z.ZodType<Prisma.CustomerSatisfactionUpdateManyWithoutPatientNestedInput> = z.object({
  create: z.union([ z.lazy(() => CustomerSatisfactionCreateWithoutPatientInputSchema),z.lazy(() => CustomerSatisfactionCreateWithoutPatientInputSchema).array(),z.lazy(() => CustomerSatisfactionUncheckedCreateWithoutPatientInputSchema),z.lazy(() => CustomerSatisfactionUncheckedCreateWithoutPatientInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CustomerSatisfactionCreateOrConnectWithoutPatientInputSchema),z.lazy(() => CustomerSatisfactionCreateOrConnectWithoutPatientInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CustomerSatisfactionUpsertWithWhereUniqueWithoutPatientInputSchema),z.lazy(() => CustomerSatisfactionUpsertWithWhereUniqueWithoutPatientInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CustomerSatisfactionCreateManyPatientInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CustomerSatisfactionWhereUniqueInputSchema),z.lazy(() => CustomerSatisfactionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CustomerSatisfactionWhereUniqueInputSchema),z.lazy(() => CustomerSatisfactionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CustomerSatisfactionWhereUniqueInputSchema),z.lazy(() => CustomerSatisfactionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CustomerSatisfactionWhereUniqueInputSchema),z.lazy(() => CustomerSatisfactionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CustomerSatisfactionUpdateWithWhereUniqueWithoutPatientInputSchema),z.lazy(() => CustomerSatisfactionUpdateWithWhereUniqueWithoutPatientInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CustomerSatisfactionUpdateManyWithWhereWithoutPatientInputSchema),z.lazy(() => CustomerSatisfactionUpdateManyWithWhereWithoutPatientInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CustomerSatisfactionScalarWhereInputSchema),z.lazy(() => CustomerSatisfactionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PatientAnamnesisUpdateManyWithoutPatientNestedInputSchema: z.ZodType<Prisma.PatientAnamnesisUpdateManyWithoutPatientNestedInput> = z.object({
  create: z.union([ z.lazy(() => PatientAnamnesisCreateWithoutPatientInputSchema),z.lazy(() => PatientAnamnesisCreateWithoutPatientInputSchema).array(),z.lazy(() => PatientAnamnesisUncheckedCreateWithoutPatientInputSchema),z.lazy(() => PatientAnamnesisUncheckedCreateWithoutPatientInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PatientAnamnesisCreateOrConnectWithoutPatientInputSchema),z.lazy(() => PatientAnamnesisCreateOrConnectWithoutPatientInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PatientAnamnesisUpsertWithWhereUniqueWithoutPatientInputSchema),z.lazy(() => PatientAnamnesisUpsertWithWhereUniqueWithoutPatientInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PatientAnamnesisCreateManyPatientInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PatientAnamnesisWhereUniqueInputSchema),z.lazy(() => PatientAnamnesisWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PatientAnamnesisWhereUniqueInputSchema),z.lazy(() => PatientAnamnesisWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PatientAnamnesisWhereUniqueInputSchema),z.lazy(() => PatientAnamnesisWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PatientAnamnesisWhereUniqueInputSchema),z.lazy(() => PatientAnamnesisWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PatientAnamnesisUpdateWithWhereUniqueWithoutPatientInputSchema),z.lazy(() => PatientAnamnesisUpdateWithWhereUniqueWithoutPatientInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PatientAnamnesisUpdateManyWithWhereWithoutPatientInputSchema),z.lazy(() => PatientAnamnesisUpdateManyWithWhereWithoutPatientInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PatientAnamnesisScalarWhereInputSchema),z.lazy(() => PatientAnamnesisScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const MedicalRecordUncheckedUpdateOneWithoutPatientNestedInputSchema: z.ZodType<Prisma.MedicalRecordUncheckedUpdateOneWithoutPatientNestedInput> = z.object({
  create: z.union([ z.lazy(() => MedicalRecordCreateWithoutPatientInputSchema),z.lazy(() => MedicalRecordUncheckedCreateWithoutPatientInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => MedicalRecordCreateOrConnectWithoutPatientInputSchema).optional(),
  upsert: z.lazy(() => MedicalRecordUpsertWithoutPatientInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => MedicalRecordWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => MedicalRecordWhereInputSchema) ]).optional(),
  connect: z.lazy(() => MedicalRecordWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => MedicalRecordUpdateToOneWithWhereWithoutPatientInputSchema),z.lazy(() => MedicalRecordUpdateWithoutPatientInputSchema),z.lazy(() => MedicalRecordUncheckedUpdateWithoutPatientInputSchema) ]).optional(),
}).strict();

export const AppointmentUncheckedUpdateManyWithoutPatientNestedInputSchema: z.ZodType<Prisma.AppointmentUncheckedUpdateManyWithoutPatientNestedInput> = z.object({
  create: z.union([ z.lazy(() => AppointmentCreateWithoutPatientInputSchema),z.lazy(() => AppointmentCreateWithoutPatientInputSchema).array(),z.lazy(() => AppointmentUncheckedCreateWithoutPatientInputSchema),z.lazy(() => AppointmentUncheckedCreateWithoutPatientInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AppointmentCreateOrConnectWithoutPatientInputSchema),z.lazy(() => AppointmentCreateOrConnectWithoutPatientInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AppointmentUpsertWithWhereUniqueWithoutPatientInputSchema),z.lazy(() => AppointmentUpsertWithWhereUniqueWithoutPatientInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AppointmentCreateManyPatientInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AppointmentWhereUniqueInputSchema),z.lazy(() => AppointmentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AppointmentWhereUniqueInputSchema),z.lazy(() => AppointmentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AppointmentWhereUniqueInputSchema),z.lazy(() => AppointmentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AppointmentWhereUniqueInputSchema),z.lazy(() => AppointmentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AppointmentUpdateWithWhereUniqueWithoutPatientInputSchema),z.lazy(() => AppointmentUpdateWithWhereUniqueWithoutPatientInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AppointmentUpdateManyWithWhereWithoutPatientInputSchema),z.lazy(() => AppointmentUpdateManyWithWhereWithoutPatientInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AppointmentScalarWhereInputSchema),z.lazy(() => AppointmentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const FinancialTransactionUncheckedUpdateManyWithoutPatientNestedInputSchema: z.ZodType<Prisma.FinancialTransactionUncheckedUpdateManyWithoutPatientNestedInput> = z.object({
  create: z.union([ z.lazy(() => FinancialTransactionCreateWithoutPatientInputSchema),z.lazy(() => FinancialTransactionCreateWithoutPatientInputSchema).array(),z.lazy(() => FinancialTransactionUncheckedCreateWithoutPatientInputSchema),z.lazy(() => FinancialTransactionUncheckedCreateWithoutPatientInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FinancialTransactionCreateOrConnectWithoutPatientInputSchema),z.lazy(() => FinancialTransactionCreateOrConnectWithoutPatientInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FinancialTransactionUpsertWithWhereUniqueWithoutPatientInputSchema),z.lazy(() => FinancialTransactionUpsertWithWhereUniqueWithoutPatientInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FinancialTransactionCreateManyPatientInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FinancialTransactionWhereUniqueInputSchema),z.lazy(() => FinancialTransactionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FinancialTransactionWhereUniqueInputSchema),z.lazy(() => FinancialTransactionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FinancialTransactionWhereUniqueInputSchema),z.lazy(() => FinancialTransactionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FinancialTransactionWhereUniqueInputSchema),z.lazy(() => FinancialTransactionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FinancialTransactionUpdateWithWhereUniqueWithoutPatientInputSchema),z.lazy(() => FinancialTransactionUpdateWithWhereUniqueWithoutPatientInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FinancialTransactionUpdateManyWithWhereWithoutPatientInputSchema),z.lazy(() => FinancialTransactionUpdateManyWithWhereWithoutPatientInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FinancialTransactionScalarWhereInputSchema),z.lazy(() => FinancialTransactionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CustomerSatisfactionUncheckedUpdateManyWithoutPatientNestedInputSchema: z.ZodType<Prisma.CustomerSatisfactionUncheckedUpdateManyWithoutPatientNestedInput> = z.object({
  create: z.union([ z.lazy(() => CustomerSatisfactionCreateWithoutPatientInputSchema),z.lazy(() => CustomerSatisfactionCreateWithoutPatientInputSchema).array(),z.lazy(() => CustomerSatisfactionUncheckedCreateWithoutPatientInputSchema),z.lazy(() => CustomerSatisfactionUncheckedCreateWithoutPatientInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CustomerSatisfactionCreateOrConnectWithoutPatientInputSchema),z.lazy(() => CustomerSatisfactionCreateOrConnectWithoutPatientInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CustomerSatisfactionUpsertWithWhereUniqueWithoutPatientInputSchema),z.lazy(() => CustomerSatisfactionUpsertWithWhereUniqueWithoutPatientInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CustomerSatisfactionCreateManyPatientInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CustomerSatisfactionWhereUniqueInputSchema),z.lazy(() => CustomerSatisfactionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CustomerSatisfactionWhereUniqueInputSchema),z.lazy(() => CustomerSatisfactionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CustomerSatisfactionWhereUniqueInputSchema),z.lazy(() => CustomerSatisfactionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CustomerSatisfactionWhereUniqueInputSchema),z.lazy(() => CustomerSatisfactionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CustomerSatisfactionUpdateWithWhereUniqueWithoutPatientInputSchema),z.lazy(() => CustomerSatisfactionUpdateWithWhereUniqueWithoutPatientInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CustomerSatisfactionUpdateManyWithWhereWithoutPatientInputSchema),z.lazy(() => CustomerSatisfactionUpdateManyWithWhereWithoutPatientInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CustomerSatisfactionScalarWhereInputSchema),z.lazy(() => CustomerSatisfactionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PatientAnamnesisUncheckedUpdateManyWithoutPatientNestedInputSchema: z.ZodType<Prisma.PatientAnamnesisUncheckedUpdateManyWithoutPatientNestedInput> = z.object({
  create: z.union([ z.lazy(() => PatientAnamnesisCreateWithoutPatientInputSchema),z.lazy(() => PatientAnamnesisCreateWithoutPatientInputSchema).array(),z.lazy(() => PatientAnamnesisUncheckedCreateWithoutPatientInputSchema),z.lazy(() => PatientAnamnesisUncheckedCreateWithoutPatientInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PatientAnamnesisCreateOrConnectWithoutPatientInputSchema),z.lazy(() => PatientAnamnesisCreateOrConnectWithoutPatientInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PatientAnamnesisUpsertWithWhereUniqueWithoutPatientInputSchema),z.lazy(() => PatientAnamnesisUpsertWithWhereUniqueWithoutPatientInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PatientAnamnesisCreateManyPatientInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PatientAnamnesisWhereUniqueInputSchema),z.lazy(() => PatientAnamnesisWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PatientAnamnesisWhereUniqueInputSchema),z.lazy(() => PatientAnamnesisWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PatientAnamnesisWhereUniqueInputSchema),z.lazy(() => PatientAnamnesisWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PatientAnamnesisWhereUniqueInputSchema),z.lazy(() => PatientAnamnesisWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PatientAnamnesisUpdateWithWhereUniqueWithoutPatientInputSchema),z.lazy(() => PatientAnamnesisUpdateWithWhereUniqueWithoutPatientInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PatientAnamnesisUpdateManyWithWhereWithoutPatientInputSchema),z.lazy(() => PatientAnamnesisUpdateManyWithWhereWithoutPatientInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PatientAnamnesisScalarWhereInputSchema),z.lazy(() => PatientAnamnesisScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PatientCreateNestedOneWithoutMedicalRecordInputSchema: z.ZodType<Prisma.PatientCreateNestedOneWithoutMedicalRecordInput> = z.object({
  create: z.union([ z.lazy(() => PatientCreateWithoutMedicalRecordInputSchema),z.lazy(() => PatientUncheckedCreateWithoutMedicalRecordInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PatientCreateOrConnectWithoutMedicalRecordInputSchema).optional(),
  connect: z.lazy(() => PatientWhereUniqueInputSchema).optional()
}).strict();

export const AnamnesisCreateNestedManyWithoutMedicalRecordInputSchema: z.ZodType<Prisma.AnamnesisCreateNestedManyWithoutMedicalRecordInput> = z.object({
  create: z.union([ z.lazy(() => AnamnesisCreateWithoutMedicalRecordInputSchema),z.lazy(() => AnamnesisCreateWithoutMedicalRecordInputSchema).array(),z.lazy(() => AnamnesisUncheckedCreateWithoutMedicalRecordInputSchema),z.lazy(() => AnamnesisUncheckedCreateWithoutMedicalRecordInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AnamnesisCreateOrConnectWithoutMedicalRecordInputSchema),z.lazy(() => AnamnesisCreateOrConnectWithoutMedicalRecordInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AnamnesisCreateManyMedicalRecordInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AnamnesisWhereUniqueInputSchema),z.lazy(() => AnamnesisWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AnamnesisUncheckedCreateNestedManyWithoutMedicalRecordInputSchema: z.ZodType<Prisma.AnamnesisUncheckedCreateNestedManyWithoutMedicalRecordInput> = z.object({
  create: z.union([ z.lazy(() => AnamnesisCreateWithoutMedicalRecordInputSchema),z.lazy(() => AnamnesisCreateWithoutMedicalRecordInputSchema).array(),z.lazy(() => AnamnesisUncheckedCreateWithoutMedicalRecordInputSchema),z.lazy(() => AnamnesisUncheckedCreateWithoutMedicalRecordInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AnamnesisCreateOrConnectWithoutMedicalRecordInputSchema),z.lazy(() => AnamnesisCreateOrConnectWithoutMedicalRecordInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AnamnesisCreateManyMedicalRecordInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AnamnesisWhereUniqueInputSchema),z.lazy(() => AnamnesisWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PatientUpdateOneRequiredWithoutMedicalRecordNestedInputSchema: z.ZodType<Prisma.PatientUpdateOneRequiredWithoutMedicalRecordNestedInput> = z.object({
  create: z.union([ z.lazy(() => PatientCreateWithoutMedicalRecordInputSchema),z.lazy(() => PatientUncheckedCreateWithoutMedicalRecordInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PatientCreateOrConnectWithoutMedicalRecordInputSchema).optional(),
  upsert: z.lazy(() => PatientUpsertWithoutMedicalRecordInputSchema).optional(),
  connect: z.lazy(() => PatientWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PatientUpdateToOneWithWhereWithoutMedicalRecordInputSchema),z.lazy(() => PatientUpdateWithoutMedicalRecordInputSchema),z.lazy(() => PatientUncheckedUpdateWithoutMedicalRecordInputSchema) ]).optional(),
}).strict();

export const AnamnesisUpdateManyWithoutMedicalRecordNestedInputSchema: z.ZodType<Prisma.AnamnesisUpdateManyWithoutMedicalRecordNestedInput> = z.object({
  create: z.union([ z.lazy(() => AnamnesisCreateWithoutMedicalRecordInputSchema),z.lazy(() => AnamnesisCreateWithoutMedicalRecordInputSchema).array(),z.lazy(() => AnamnesisUncheckedCreateWithoutMedicalRecordInputSchema),z.lazy(() => AnamnesisUncheckedCreateWithoutMedicalRecordInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AnamnesisCreateOrConnectWithoutMedicalRecordInputSchema),z.lazy(() => AnamnesisCreateOrConnectWithoutMedicalRecordInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AnamnesisUpsertWithWhereUniqueWithoutMedicalRecordInputSchema),z.lazy(() => AnamnesisUpsertWithWhereUniqueWithoutMedicalRecordInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AnamnesisCreateManyMedicalRecordInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AnamnesisWhereUniqueInputSchema),z.lazy(() => AnamnesisWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AnamnesisWhereUniqueInputSchema),z.lazy(() => AnamnesisWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AnamnesisWhereUniqueInputSchema),z.lazy(() => AnamnesisWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AnamnesisWhereUniqueInputSchema),z.lazy(() => AnamnesisWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AnamnesisUpdateWithWhereUniqueWithoutMedicalRecordInputSchema),z.lazy(() => AnamnesisUpdateWithWhereUniqueWithoutMedicalRecordInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AnamnesisUpdateManyWithWhereWithoutMedicalRecordInputSchema),z.lazy(() => AnamnesisUpdateManyWithWhereWithoutMedicalRecordInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AnamnesisScalarWhereInputSchema),z.lazy(() => AnamnesisScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AnamnesisUncheckedUpdateManyWithoutMedicalRecordNestedInputSchema: z.ZodType<Prisma.AnamnesisUncheckedUpdateManyWithoutMedicalRecordNestedInput> = z.object({
  create: z.union([ z.lazy(() => AnamnesisCreateWithoutMedicalRecordInputSchema),z.lazy(() => AnamnesisCreateWithoutMedicalRecordInputSchema).array(),z.lazy(() => AnamnesisUncheckedCreateWithoutMedicalRecordInputSchema),z.lazy(() => AnamnesisUncheckedCreateWithoutMedicalRecordInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AnamnesisCreateOrConnectWithoutMedicalRecordInputSchema),z.lazy(() => AnamnesisCreateOrConnectWithoutMedicalRecordInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AnamnesisUpsertWithWhereUniqueWithoutMedicalRecordInputSchema),z.lazy(() => AnamnesisUpsertWithWhereUniqueWithoutMedicalRecordInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AnamnesisCreateManyMedicalRecordInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AnamnesisWhereUniqueInputSchema),z.lazy(() => AnamnesisWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AnamnesisWhereUniqueInputSchema),z.lazy(() => AnamnesisWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AnamnesisWhereUniqueInputSchema),z.lazy(() => AnamnesisWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AnamnesisWhereUniqueInputSchema),z.lazy(() => AnamnesisWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AnamnesisUpdateWithWhereUniqueWithoutMedicalRecordInputSchema),z.lazy(() => AnamnesisUpdateWithWhereUniqueWithoutMedicalRecordInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AnamnesisUpdateManyWithWhereWithoutMedicalRecordInputSchema),z.lazy(() => AnamnesisUpdateManyWithWhereWithoutMedicalRecordInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AnamnesisScalarWhereInputSchema),z.lazy(() => AnamnesisScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const MedicalRecordCreateNestedOneWithoutAnamnesesInputSchema: z.ZodType<Prisma.MedicalRecordCreateNestedOneWithoutAnamnesesInput> = z.object({
  create: z.union([ z.lazy(() => MedicalRecordCreateWithoutAnamnesesInputSchema),z.lazy(() => MedicalRecordUncheckedCreateWithoutAnamnesesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => MedicalRecordCreateOrConnectWithoutAnamnesesInputSchema).optional(),
  connect: z.lazy(() => MedicalRecordWhereUniqueInputSchema).optional()
}).strict();

export const AnamnesisTemplateCreateNestedOneWithoutAnamnesisInputSchema: z.ZodType<Prisma.AnamnesisTemplateCreateNestedOneWithoutAnamnesisInput> = z.object({
  create: z.union([ z.lazy(() => AnamnesisTemplateCreateWithoutAnamnesisInputSchema),z.lazy(() => AnamnesisTemplateUncheckedCreateWithoutAnamnesisInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AnamnesisTemplateCreateOrConnectWithoutAnamnesisInputSchema).optional(),
  connect: z.lazy(() => AnamnesisTemplateWhereUniqueInputSchema).optional()
}).strict();

export const AnamnesisAnswerCreateNestedManyWithoutAnamnesisInputSchema: z.ZodType<Prisma.AnamnesisAnswerCreateNestedManyWithoutAnamnesisInput> = z.object({
  create: z.union([ z.lazy(() => AnamnesisAnswerCreateWithoutAnamnesisInputSchema),z.lazy(() => AnamnesisAnswerCreateWithoutAnamnesisInputSchema).array(),z.lazy(() => AnamnesisAnswerUncheckedCreateWithoutAnamnesisInputSchema),z.lazy(() => AnamnesisAnswerUncheckedCreateWithoutAnamnesisInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AnamnesisAnswerCreateOrConnectWithoutAnamnesisInputSchema),z.lazy(() => AnamnesisAnswerCreateOrConnectWithoutAnamnesisInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AnamnesisAnswerCreateManyAnamnesisInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AnamnesisAnswerWhereUniqueInputSchema),z.lazy(() => AnamnesisAnswerWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AnamnesisAnswerUncheckedCreateNestedManyWithoutAnamnesisInputSchema: z.ZodType<Prisma.AnamnesisAnswerUncheckedCreateNestedManyWithoutAnamnesisInput> = z.object({
  create: z.union([ z.lazy(() => AnamnesisAnswerCreateWithoutAnamnesisInputSchema),z.lazy(() => AnamnesisAnswerCreateWithoutAnamnesisInputSchema).array(),z.lazy(() => AnamnesisAnswerUncheckedCreateWithoutAnamnesisInputSchema),z.lazy(() => AnamnesisAnswerUncheckedCreateWithoutAnamnesisInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AnamnesisAnswerCreateOrConnectWithoutAnamnesisInputSchema),z.lazy(() => AnamnesisAnswerCreateOrConnectWithoutAnamnesisInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AnamnesisAnswerCreateManyAnamnesisInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AnamnesisAnswerWhereUniqueInputSchema),z.lazy(() => AnamnesisAnswerWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const MedicalRecordUpdateOneRequiredWithoutAnamnesesNestedInputSchema: z.ZodType<Prisma.MedicalRecordUpdateOneRequiredWithoutAnamnesesNestedInput> = z.object({
  create: z.union([ z.lazy(() => MedicalRecordCreateWithoutAnamnesesInputSchema),z.lazy(() => MedicalRecordUncheckedCreateWithoutAnamnesesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => MedicalRecordCreateOrConnectWithoutAnamnesesInputSchema).optional(),
  upsert: z.lazy(() => MedicalRecordUpsertWithoutAnamnesesInputSchema).optional(),
  connect: z.lazy(() => MedicalRecordWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => MedicalRecordUpdateToOneWithWhereWithoutAnamnesesInputSchema),z.lazy(() => MedicalRecordUpdateWithoutAnamnesesInputSchema),z.lazy(() => MedicalRecordUncheckedUpdateWithoutAnamnesesInputSchema) ]).optional(),
}).strict();

export const AnamnesisTemplateUpdateOneRequiredWithoutAnamnesisNestedInputSchema: z.ZodType<Prisma.AnamnesisTemplateUpdateOneRequiredWithoutAnamnesisNestedInput> = z.object({
  create: z.union([ z.lazy(() => AnamnesisTemplateCreateWithoutAnamnesisInputSchema),z.lazy(() => AnamnesisTemplateUncheckedCreateWithoutAnamnesisInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AnamnesisTemplateCreateOrConnectWithoutAnamnesisInputSchema).optional(),
  upsert: z.lazy(() => AnamnesisTemplateUpsertWithoutAnamnesisInputSchema).optional(),
  connect: z.lazy(() => AnamnesisTemplateWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => AnamnesisTemplateUpdateToOneWithWhereWithoutAnamnesisInputSchema),z.lazy(() => AnamnesisTemplateUpdateWithoutAnamnesisInputSchema),z.lazy(() => AnamnesisTemplateUncheckedUpdateWithoutAnamnesisInputSchema) ]).optional(),
}).strict();

export const AnamnesisAnswerUpdateManyWithoutAnamnesisNestedInputSchema: z.ZodType<Prisma.AnamnesisAnswerUpdateManyWithoutAnamnesisNestedInput> = z.object({
  create: z.union([ z.lazy(() => AnamnesisAnswerCreateWithoutAnamnesisInputSchema),z.lazy(() => AnamnesisAnswerCreateWithoutAnamnesisInputSchema).array(),z.lazy(() => AnamnesisAnswerUncheckedCreateWithoutAnamnesisInputSchema),z.lazy(() => AnamnesisAnswerUncheckedCreateWithoutAnamnesisInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AnamnesisAnswerCreateOrConnectWithoutAnamnesisInputSchema),z.lazy(() => AnamnesisAnswerCreateOrConnectWithoutAnamnesisInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AnamnesisAnswerUpsertWithWhereUniqueWithoutAnamnesisInputSchema),z.lazy(() => AnamnesisAnswerUpsertWithWhereUniqueWithoutAnamnesisInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AnamnesisAnswerCreateManyAnamnesisInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AnamnesisAnswerWhereUniqueInputSchema),z.lazy(() => AnamnesisAnswerWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AnamnesisAnswerWhereUniqueInputSchema),z.lazy(() => AnamnesisAnswerWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AnamnesisAnswerWhereUniqueInputSchema),z.lazy(() => AnamnesisAnswerWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AnamnesisAnswerWhereUniqueInputSchema),z.lazy(() => AnamnesisAnswerWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AnamnesisAnswerUpdateWithWhereUniqueWithoutAnamnesisInputSchema),z.lazy(() => AnamnesisAnswerUpdateWithWhereUniqueWithoutAnamnesisInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AnamnesisAnswerUpdateManyWithWhereWithoutAnamnesisInputSchema),z.lazy(() => AnamnesisAnswerUpdateManyWithWhereWithoutAnamnesisInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AnamnesisAnswerScalarWhereInputSchema),z.lazy(() => AnamnesisAnswerScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AnamnesisAnswerUncheckedUpdateManyWithoutAnamnesisNestedInputSchema: z.ZodType<Prisma.AnamnesisAnswerUncheckedUpdateManyWithoutAnamnesisNestedInput> = z.object({
  create: z.union([ z.lazy(() => AnamnesisAnswerCreateWithoutAnamnesisInputSchema),z.lazy(() => AnamnesisAnswerCreateWithoutAnamnesisInputSchema).array(),z.lazy(() => AnamnesisAnswerUncheckedCreateWithoutAnamnesisInputSchema),z.lazy(() => AnamnesisAnswerUncheckedCreateWithoutAnamnesisInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AnamnesisAnswerCreateOrConnectWithoutAnamnesisInputSchema),z.lazy(() => AnamnesisAnswerCreateOrConnectWithoutAnamnesisInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AnamnesisAnswerUpsertWithWhereUniqueWithoutAnamnesisInputSchema),z.lazy(() => AnamnesisAnswerUpsertWithWhereUniqueWithoutAnamnesisInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AnamnesisAnswerCreateManyAnamnesisInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AnamnesisAnswerWhereUniqueInputSchema),z.lazy(() => AnamnesisAnswerWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AnamnesisAnswerWhereUniqueInputSchema),z.lazy(() => AnamnesisAnswerWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AnamnesisAnswerWhereUniqueInputSchema),z.lazy(() => AnamnesisAnswerWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AnamnesisAnswerWhereUniqueInputSchema),z.lazy(() => AnamnesisAnswerWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AnamnesisAnswerUpdateWithWhereUniqueWithoutAnamnesisInputSchema),z.lazy(() => AnamnesisAnswerUpdateWithWhereUniqueWithoutAnamnesisInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AnamnesisAnswerUpdateManyWithWhereWithoutAnamnesisInputSchema),z.lazy(() => AnamnesisAnswerUpdateManyWithWhereWithoutAnamnesisInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AnamnesisAnswerScalarWhereInputSchema),z.lazy(() => AnamnesisAnswerScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const OrganizationCreateNestedOneWithoutAnamnesisTemplateInputSchema: z.ZodType<Prisma.OrganizationCreateNestedOneWithoutAnamnesisTemplateInput> = z.object({
  create: z.union([ z.lazy(() => OrganizationCreateWithoutAnamnesisTemplateInputSchema),z.lazy(() => OrganizationUncheckedCreateWithoutAnamnesisTemplateInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => OrganizationCreateOrConnectWithoutAnamnesisTemplateInputSchema).optional(),
  connect: z.lazy(() => OrganizationWhereUniqueInputSchema).optional()
}).strict();

export const AnamnesisQuestionCreateNestedManyWithoutTemplateInputSchema: z.ZodType<Prisma.AnamnesisQuestionCreateNestedManyWithoutTemplateInput> = z.object({
  create: z.union([ z.lazy(() => AnamnesisQuestionCreateWithoutTemplateInputSchema),z.lazy(() => AnamnesisQuestionCreateWithoutTemplateInputSchema).array(),z.lazy(() => AnamnesisQuestionUncheckedCreateWithoutTemplateInputSchema),z.lazy(() => AnamnesisQuestionUncheckedCreateWithoutTemplateInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AnamnesisQuestionCreateOrConnectWithoutTemplateInputSchema),z.lazy(() => AnamnesisQuestionCreateOrConnectWithoutTemplateInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AnamnesisQuestionCreateManyTemplateInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AnamnesisQuestionWhereUniqueInputSchema),z.lazy(() => AnamnesisQuestionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PatientAnamnesisCreateNestedManyWithoutTemplateInputSchema: z.ZodType<Prisma.PatientAnamnesisCreateNestedManyWithoutTemplateInput> = z.object({
  create: z.union([ z.lazy(() => PatientAnamnesisCreateWithoutTemplateInputSchema),z.lazy(() => PatientAnamnesisCreateWithoutTemplateInputSchema).array(),z.lazy(() => PatientAnamnesisUncheckedCreateWithoutTemplateInputSchema),z.lazy(() => PatientAnamnesisUncheckedCreateWithoutTemplateInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PatientAnamnesisCreateOrConnectWithoutTemplateInputSchema),z.lazy(() => PatientAnamnesisCreateOrConnectWithoutTemplateInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PatientAnamnesisCreateManyTemplateInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PatientAnamnesisWhereUniqueInputSchema),z.lazy(() => PatientAnamnesisWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AnamnesisCreateNestedManyWithoutTemplateInputSchema: z.ZodType<Prisma.AnamnesisCreateNestedManyWithoutTemplateInput> = z.object({
  create: z.union([ z.lazy(() => AnamnesisCreateWithoutTemplateInputSchema),z.lazy(() => AnamnesisCreateWithoutTemplateInputSchema).array(),z.lazy(() => AnamnesisUncheckedCreateWithoutTemplateInputSchema),z.lazy(() => AnamnesisUncheckedCreateWithoutTemplateInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AnamnesisCreateOrConnectWithoutTemplateInputSchema),z.lazy(() => AnamnesisCreateOrConnectWithoutTemplateInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AnamnesisCreateManyTemplateInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AnamnesisWhereUniqueInputSchema),z.lazy(() => AnamnesisWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AnamnesisQuestionUncheckedCreateNestedManyWithoutTemplateInputSchema: z.ZodType<Prisma.AnamnesisQuestionUncheckedCreateNestedManyWithoutTemplateInput> = z.object({
  create: z.union([ z.lazy(() => AnamnesisQuestionCreateWithoutTemplateInputSchema),z.lazy(() => AnamnesisQuestionCreateWithoutTemplateInputSchema).array(),z.lazy(() => AnamnesisQuestionUncheckedCreateWithoutTemplateInputSchema),z.lazy(() => AnamnesisQuestionUncheckedCreateWithoutTemplateInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AnamnesisQuestionCreateOrConnectWithoutTemplateInputSchema),z.lazy(() => AnamnesisQuestionCreateOrConnectWithoutTemplateInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AnamnesisQuestionCreateManyTemplateInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AnamnesisQuestionWhereUniqueInputSchema),z.lazy(() => AnamnesisQuestionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PatientAnamnesisUncheckedCreateNestedManyWithoutTemplateInputSchema: z.ZodType<Prisma.PatientAnamnesisUncheckedCreateNestedManyWithoutTemplateInput> = z.object({
  create: z.union([ z.lazy(() => PatientAnamnesisCreateWithoutTemplateInputSchema),z.lazy(() => PatientAnamnesisCreateWithoutTemplateInputSchema).array(),z.lazy(() => PatientAnamnesisUncheckedCreateWithoutTemplateInputSchema),z.lazy(() => PatientAnamnesisUncheckedCreateWithoutTemplateInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PatientAnamnesisCreateOrConnectWithoutTemplateInputSchema),z.lazy(() => PatientAnamnesisCreateOrConnectWithoutTemplateInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PatientAnamnesisCreateManyTemplateInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PatientAnamnesisWhereUniqueInputSchema),z.lazy(() => PatientAnamnesisWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AnamnesisUncheckedCreateNestedManyWithoutTemplateInputSchema: z.ZodType<Prisma.AnamnesisUncheckedCreateNestedManyWithoutTemplateInput> = z.object({
  create: z.union([ z.lazy(() => AnamnesisCreateWithoutTemplateInputSchema),z.lazy(() => AnamnesisCreateWithoutTemplateInputSchema).array(),z.lazy(() => AnamnesisUncheckedCreateWithoutTemplateInputSchema),z.lazy(() => AnamnesisUncheckedCreateWithoutTemplateInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AnamnesisCreateOrConnectWithoutTemplateInputSchema),z.lazy(() => AnamnesisCreateOrConnectWithoutTemplateInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AnamnesisCreateManyTemplateInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AnamnesisWhereUniqueInputSchema),z.lazy(() => AnamnesisWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const OrganizationUpdateOneRequiredWithoutAnamnesisTemplateNestedInputSchema: z.ZodType<Prisma.OrganizationUpdateOneRequiredWithoutAnamnesisTemplateNestedInput> = z.object({
  create: z.union([ z.lazy(() => OrganizationCreateWithoutAnamnesisTemplateInputSchema),z.lazy(() => OrganizationUncheckedCreateWithoutAnamnesisTemplateInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => OrganizationCreateOrConnectWithoutAnamnesisTemplateInputSchema).optional(),
  upsert: z.lazy(() => OrganizationUpsertWithoutAnamnesisTemplateInputSchema).optional(),
  connect: z.lazy(() => OrganizationWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => OrganizationUpdateToOneWithWhereWithoutAnamnesisTemplateInputSchema),z.lazy(() => OrganizationUpdateWithoutAnamnesisTemplateInputSchema),z.lazy(() => OrganizationUncheckedUpdateWithoutAnamnesisTemplateInputSchema) ]).optional(),
}).strict();

export const AnamnesisQuestionUpdateManyWithoutTemplateNestedInputSchema: z.ZodType<Prisma.AnamnesisQuestionUpdateManyWithoutTemplateNestedInput> = z.object({
  create: z.union([ z.lazy(() => AnamnesisQuestionCreateWithoutTemplateInputSchema),z.lazy(() => AnamnesisQuestionCreateWithoutTemplateInputSchema).array(),z.lazy(() => AnamnesisQuestionUncheckedCreateWithoutTemplateInputSchema),z.lazy(() => AnamnesisQuestionUncheckedCreateWithoutTemplateInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AnamnesisQuestionCreateOrConnectWithoutTemplateInputSchema),z.lazy(() => AnamnesisQuestionCreateOrConnectWithoutTemplateInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AnamnesisQuestionUpsertWithWhereUniqueWithoutTemplateInputSchema),z.lazy(() => AnamnesisQuestionUpsertWithWhereUniqueWithoutTemplateInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AnamnesisQuestionCreateManyTemplateInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AnamnesisQuestionWhereUniqueInputSchema),z.lazy(() => AnamnesisQuestionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AnamnesisQuestionWhereUniqueInputSchema),z.lazy(() => AnamnesisQuestionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AnamnesisQuestionWhereUniqueInputSchema),z.lazy(() => AnamnesisQuestionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AnamnesisQuestionWhereUniqueInputSchema),z.lazy(() => AnamnesisQuestionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AnamnesisQuestionUpdateWithWhereUniqueWithoutTemplateInputSchema),z.lazy(() => AnamnesisQuestionUpdateWithWhereUniqueWithoutTemplateInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AnamnesisQuestionUpdateManyWithWhereWithoutTemplateInputSchema),z.lazy(() => AnamnesisQuestionUpdateManyWithWhereWithoutTemplateInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AnamnesisQuestionScalarWhereInputSchema),z.lazy(() => AnamnesisQuestionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PatientAnamnesisUpdateManyWithoutTemplateNestedInputSchema: z.ZodType<Prisma.PatientAnamnesisUpdateManyWithoutTemplateNestedInput> = z.object({
  create: z.union([ z.lazy(() => PatientAnamnesisCreateWithoutTemplateInputSchema),z.lazy(() => PatientAnamnesisCreateWithoutTemplateInputSchema).array(),z.lazy(() => PatientAnamnesisUncheckedCreateWithoutTemplateInputSchema),z.lazy(() => PatientAnamnesisUncheckedCreateWithoutTemplateInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PatientAnamnesisCreateOrConnectWithoutTemplateInputSchema),z.lazy(() => PatientAnamnesisCreateOrConnectWithoutTemplateInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PatientAnamnesisUpsertWithWhereUniqueWithoutTemplateInputSchema),z.lazy(() => PatientAnamnesisUpsertWithWhereUniqueWithoutTemplateInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PatientAnamnesisCreateManyTemplateInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PatientAnamnesisWhereUniqueInputSchema),z.lazy(() => PatientAnamnesisWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PatientAnamnesisWhereUniqueInputSchema),z.lazy(() => PatientAnamnesisWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PatientAnamnesisWhereUniqueInputSchema),z.lazy(() => PatientAnamnesisWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PatientAnamnesisWhereUniqueInputSchema),z.lazy(() => PatientAnamnesisWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PatientAnamnesisUpdateWithWhereUniqueWithoutTemplateInputSchema),z.lazy(() => PatientAnamnesisUpdateWithWhereUniqueWithoutTemplateInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PatientAnamnesisUpdateManyWithWhereWithoutTemplateInputSchema),z.lazy(() => PatientAnamnesisUpdateManyWithWhereWithoutTemplateInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PatientAnamnesisScalarWhereInputSchema),z.lazy(() => PatientAnamnesisScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AnamnesisUpdateManyWithoutTemplateNestedInputSchema: z.ZodType<Prisma.AnamnesisUpdateManyWithoutTemplateNestedInput> = z.object({
  create: z.union([ z.lazy(() => AnamnesisCreateWithoutTemplateInputSchema),z.lazy(() => AnamnesisCreateWithoutTemplateInputSchema).array(),z.lazy(() => AnamnesisUncheckedCreateWithoutTemplateInputSchema),z.lazy(() => AnamnesisUncheckedCreateWithoutTemplateInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AnamnesisCreateOrConnectWithoutTemplateInputSchema),z.lazy(() => AnamnesisCreateOrConnectWithoutTemplateInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AnamnesisUpsertWithWhereUniqueWithoutTemplateInputSchema),z.lazy(() => AnamnesisUpsertWithWhereUniqueWithoutTemplateInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AnamnesisCreateManyTemplateInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AnamnesisWhereUniqueInputSchema),z.lazy(() => AnamnesisWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AnamnesisWhereUniqueInputSchema),z.lazy(() => AnamnesisWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AnamnesisWhereUniqueInputSchema),z.lazy(() => AnamnesisWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AnamnesisWhereUniqueInputSchema),z.lazy(() => AnamnesisWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AnamnesisUpdateWithWhereUniqueWithoutTemplateInputSchema),z.lazy(() => AnamnesisUpdateWithWhereUniqueWithoutTemplateInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AnamnesisUpdateManyWithWhereWithoutTemplateInputSchema),z.lazy(() => AnamnesisUpdateManyWithWhereWithoutTemplateInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AnamnesisScalarWhereInputSchema),z.lazy(() => AnamnesisScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AnamnesisQuestionUncheckedUpdateManyWithoutTemplateNestedInputSchema: z.ZodType<Prisma.AnamnesisQuestionUncheckedUpdateManyWithoutTemplateNestedInput> = z.object({
  create: z.union([ z.lazy(() => AnamnesisQuestionCreateWithoutTemplateInputSchema),z.lazy(() => AnamnesisQuestionCreateWithoutTemplateInputSchema).array(),z.lazy(() => AnamnesisQuestionUncheckedCreateWithoutTemplateInputSchema),z.lazy(() => AnamnesisQuestionUncheckedCreateWithoutTemplateInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AnamnesisQuestionCreateOrConnectWithoutTemplateInputSchema),z.lazy(() => AnamnesisQuestionCreateOrConnectWithoutTemplateInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AnamnesisQuestionUpsertWithWhereUniqueWithoutTemplateInputSchema),z.lazy(() => AnamnesisQuestionUpsertWithWhereUniqueWithoutTemplateInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AnamnesisQuestionCreateManyTemplateInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AnamnesisQuestionWhereUniqueInputSchema),z.lazy(() => AnamnesisQuestionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AnamnesisQuestionWhereUniqueInputSchema),z.lazy(() => AnamnesisQuestionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AnamnesisQuestionWhereUniqueInputSchema),z.lazy(() => AnamnesisQuestionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AnamnesisQuestionWhereUniqueInputSchema),z.lazy(() => AnamnesisQuestionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AnamnesisQuestionUpdateWithWhereUniqueWithoutTemplateInputSchema),z.lazy(() => AnamnesisQuestionUpdateWithWhereUniqueWithoutTemplateInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AnamnesisQuestionUpdateManyWithWhereWithoutTemplateInputSchema),z.lazy(() => AnamnesisQuestionUpdateManyWithWhereWithoutTemplateInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AnamnesisQuestionScalarWhereInputSchema),z.lazy(() => AnamnesisQuestionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PatientAnamnesisUncheckedUpdateManyWithoutTemplateNestedInputSchema: z.ZodType<Prisma.PatientAnamnesisUncheckedUpdateManyWithoutTemplateNestedInput> = z.object({
  create: z.union([ z.lazy(() => PatientAnamnesisCreateWithoutTemplateInputSchema),z.lazy(() => PatientAnamnesisCreateWithoutTemplateInputSchema).array(),z.lazy(() => PatientAnamnesisUncheckedCreateWithoutTemplateInputSchema),z.lazy(() => PatientAnamnesisUncheckedCreateWithoutTemplateInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PatientAnamnesisCreateOrConnectWithoutTemplateInputSchema),z.lazy(() => PatientAnamnesisCreateOrConnectWithoutTemplateInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PatientAnamnesisUpsertWithWhereUniqueWithoutTemplateInputSchema),z.lazy(() => PatientAnamnesisUpsertWithWhereUniqueWithoutTemplateInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PatientAnamnesisCreateManyTemplateInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PatientAnamnesisWhereUniqueInputSchema),z.lazy(() => PatientAnamnesisWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PatientAnamnesisWhereUniqueInputSchema),z.lazy(() => PatientAnamnesisWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PatientAnamnesisWhereUniqueInputSchema),z.lazy(() => PatientAnamnesisWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PatientAnamnesisWhereUniqueInputSchema),z.lazy(() => PatientAnamnesisWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PatientAnamnesisUpdateWithWhereUniqueWithoutTemplateInputSchema),z.lazy(() => PatientAnamnesisUpdateWithWhereUniqueWithoutTemplateInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PatientAnamnesisUpdateManyWithWhereWithoutTemplateInputSchema),z.lazy(() => PatientAnamnesisUpdateManyWithWhereWithoutTemplateInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PatientAnamnesisScalarWhereInputSchema),z.lazy(() => PatientAnamnesisScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AnamnesisUncheckedUpdateManyWithoutTemplateNestedInputSchema: z.ZodType<Prisma.AnamnesisUncheckedUpdateManyWithoutTemplateNestedInput> = z.object({
  create: z.union([ z.lazy(() => AnamnesisCreateWithoutTemplateInputSchema),z.lazy(() => AnamnesisCreateWithoutTemplateInputSchema).array(),z.lazy(() => AnamnesisUncheckedCreateWithoutTemplateInputSchema),z.lazy(() => AnamnesisUncheckedCreateWithoutTemplateInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AnamnesisCreateOrConnectWithoutTemplateInputSchema),z.lazy(() => AnamnesisCreateOrConnectWithoutTemplateInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AnamnesisUpsertWithWhereUniqueWithoutTemplateInputSchema),z.lazy(() => AnamnesisUpsertWithWhereUniqueWithoutTemplateInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AnamnesisCreateManyTemplateInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AnamnesisWhereUniqueInputSchema),z.lazy(() => AnamnesisWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AnamnesisWhereUniqueInputSchema),z.lazy(() => AnamnesisWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AnamnesisWhereUniqueInputSchema),z.lazy(() => AnamnesisWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AnamnesisWhereUniqueInputSchema),z.lazy(() => AnamnesisWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AnamnesisUpdateWithWhereUniqueWithoutTemplateInputSchema),z.lazy(() => AnamnesisUpdateWithWhereUniqueWithoutTemplateInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AnamnesisUpdateManyWithWhereWithoutTemplateInputSchema),z.lazy(() => AnamnesisUpdateManyWithWhereWithoutTemplateInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AnamnesisScalarWhereInputSchema),z.lazy(() => AnamnesisScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AnamnesisTemplateCreateNestedOneWithoutQuestionsInputSchema: z.ZodType<Prisma.AnamnesisTemplateCreateNestedOneWithoutQuestionsInput> = z.object({
  create: z.union([ z.lazy(() => AnamnesisTemplateCreateWithoutQuestionsInputSchema),z.lazy(() => AnamnesisTemplateUncheckedCreateWithoutQuestionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AnamnesisTemplateCreateOrConnectWithoutQuestionsInputSchema).optional(),
  connect: z.lazy(() => AnamnesisTemplateWhereUniqueInputSchema).optional()
}).strict();

export const AnamnesisAnswerCreateNestedManyWithoutQuestionInputSchema: z.ZodType<Prisma.AnamnesisAnswerCreateNestedManyWithoutQuestionInput> = z.object({
  create: z.union([ z.lazy(() => AnamnesisAnswerCreateWithoutQuestionInputSchema),z.lazy(() => AnamnesisAnswerCreateWithoutQuestionInputSchema).array(),z.lazy(() => AnamnesisAnswerUncheckedCreateWithoutQuestionInputSchema),z.lazy(() => AnamnesisAnswerUncheckedCreateWithoutQuestionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AnamnesisAnswerCreateOrConnectWithoutQuestionInputSchema),z.lazy(() => AnamnesisAnswerCreateOrConnectWithoutQuestionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AnamnesisAnswerCreateManyQuestionInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AnamnesisAnswerWhereUniqueInputSchema),z.lazy(() => AnamnesisAnswerWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AnamnesisAnswerUncheckedCreateNestedManyWithoutQuestionInputSchema: z.ZodType<Prisma.AnamnesisAnswerUncheckedCreateNestedManyWithoutQuestionInput> = z.object({
  create: z.union([ z.lazy(() => AnamnesisAnswerCreateWithoutQuestionInputSchema),z.lazy(() => AnamnesisAnswerCreateWithoutQuestionInputSchema).array(),z.lazy(() => AnamnesisAnswerUncheckedCreateWithoutQuestionInputSchema),z.lazy(() => AnamnesisAnswerUncheckedCreateWithoutQuestionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AnamnesisAnswerCreateOrConnectWithoutQuestionInputSchema),z.lazy(() => AnamnesisAnswerCreateOrConnectWithoutQuestionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AnamnesisAnswerCreateManyQuestionInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AnamnesisAnswerWhereUniqueInputSchema),z.lazy(() => AnamnesisAnswerWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EnumQuestionTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumQuestionTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => QuestionTypeSchema).optional()
}).strict();

export const AnamnesisTemplateUpdateOneRequiredWithoutQuestionsNestedInputSchema: z.ZodType<Prisma.AnamnesisTemplateUpdateOneRequiredWithoutQuestionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => AnamnesisTemplateCreateWithoutQuestionsInputSchema),z.lazy(() => AnamnesisTemplateUncheckedCreateWithoutQuestionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AnamnesisTemplateCreateOrConnectWithoutQuestionsInputSchema).optional(),
  upsert: z.lazy(() => AnamnesisTemplateUpsertWithoutQuestionsInputSchema).optional(),
  connect: z.lazy(() => AnamnesisTemplateWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => AnamnesisTemplateUpdateToOneWithWhereWithoutQuestionsInputSchema),z.lazy(() => AnamnesisTemplateUpdateWithoutQuestionsInputSchema),z.lazy(() => AnamnesisTemplateUncheckedUpdateWithoutQuestionsInputSchema) ]).optional(),
}).strict();

export const AnamnesisAnswerUpdateManyWithoutQuestionNestedInputSchema: z.ZodType<Prisma.AnamnesisAnswerUpdateManyWithoutQuestionNestedInput> = z.object({
  create: z.union([ z.lazy(() => AnamnesisAnswerCreateWithoutQuestionInputSchema),z.lazy(() => AnamnesisAnswerCreateWithoutQuestionInputSchema).array(),z.lazy(() => AnamnesisAnswerUncheckedCreateWithoutQuestionInputSchema),z.lazy(() => AnamnesisAnswerUncheckedCreateWithoutQuestionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AnamnesisAnswerCreateOrConnectWithoutQuestionInputSchema),z.lazy(() => AnamnesisAnswerCreateOrConnectWithoutQuestionInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AnamnesisAnswerUpsertWithWhereUniqueWithoutQuestionInputSchema),z.lazy(() => AnamnesisAnswerUpsertWithWhereUniqueWithoutQuestionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AnamnesisAnswerCreateManyQuestionInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AnamnesisAnswerWhereUniqueInputSchema),z.lazy(() => AnamnesisAnswerWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AnamnesisAnswerWhereUniqueInputSchema),z.lazy(() => AnamnesisAnswerWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AnamnesisAnswerWhereUniqueInputSchema),z.lazy(() => AnamnesisAnswerWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AnamnesisAnswerWhereUniqueInputSchema),z.lazy(() => AnamnesisAnswerWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AnamnesisAnswerUpdateWithWhereUniqueWithoutQuestionInputSchema),z.lazy(() => AnamnesisAnswerUpdateWithWhereUniqueWithoutQuestionInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AnamnesisAnswerUpdateManyWithWhereWithoutQuestionInputSchema),z.lazy(() => AnamnesisAnswerUpdateManyWithWhereWithoutQuestionInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AnamnesisAnswerScalarWhereInputSchema),z.lazy(() => AnamnesisAnswerScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AnamnesisAnswerUncheckedUpdateManyWithoutQuestionNestedInputSchema: z.ZodType<Prisma.AnamnesisAnswerUncheckedUpdateManyWithoutQuestionNestedInput> = z.object({
  create: z.union([ z.lazy(() => AnamnesisAnswerCreateWithoutQuestionInputSchema),z.lazy(() => AnamnesisAnswerCreateWithoutQuestionInputSchema).array(),z.lazy(() => AnamnesisAnswerUncheckedCreateWithoutQuestionInputSchema),z.lazy(() => AnamnesisAnswerUncheckedCreateWithoutQuestionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AnamnesisAnswerCreateOrConnectWithoutQuestionInputSchema),z.lazy(() => AnamnesisAnswerCreateOrConnectWithoutQuestionInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AnamnesisAnswerUpsertWithWhereUniqueWithoutQuestionInputSchema),z.lazy(() => AnamnesisAnswerUpsertWithWhereUniqueWithoutQuestionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AnamnesisAnswerCreateManyQuestionInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AnamnesisAnswerWhereUniqueInputSchema),z.lazy(() => AnamnesisAnswerWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AnamnesisAnswerWhereUniqueInputSchema),z.lazy(() => AnamnesisAnswerWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AnamnesisAnswerWhereUniqueInputSchema),z.lazy(() => AnamnesisAnswerWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AnamnesisAnswerWhereUniqueInputSchema),z.lazy(() => AnamnesisAnswerWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AnamnesisAnswerUpdateWithWhereUniqueWithoutQuestionInputSchema),z.lazy(() => AnamnesisAnswerUpdateWithWhereUniqueWithoutQuestionInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AnamnesisAnswerUpdateManyWithWhereWithoutQuestionInputSchema),z.lazy(() => AnamnesisAnswerUpdateManyWithWhereWithoutQuestionInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AnamnesisAnswerScalarWhereInputSchema),z.lazy(() => AnamnesisAnswerScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PatientCreateNestedOneWithoutPatientAnamnesisInputSchema: z.ZodType<Prisma.PatientCreateNestedOneWithoutPatientAnamnesisInput> = z.object({
  create: z.union([ z.lazy(() => PatientCreateWithoutPatientAnamnesisInputSchema),z.lazy(() => PatientUncheckedCreateWithoutPatientAnamnesisInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PatientCreateOrConnectWithoutPatientAnamnesisInputSchema).optional(),
  connect: z.lazy(() => PatientWhereUniqueInputSchema).optional()
}).strict();

export const AnamnesisTemplateCreateNestedOneWithoutPatientAnamnesesInputSchema: z.ZodType<Prisma.AnamnesisTemplateCreateNestedOneWithoutPatientAnamnesesInput> = z.object({
  create: z.union([ z.lazy(() => AnamnesisTemplateCreateWithoutPatientAnamnesesInputSchema),z.lazy(() => AnamnesisTemplateUncheckedCreateWithoutPatientAnamnesesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AnamnesisTemplateCreateOrConnectWithoutPatientAnamnesesInputSchema).optional(),
  connect: z.lazy(() => AnamnesisTemplateWhereUniqueInputSchema).optional()
}).strict();

export const AnamnesisAnswerCreateNestedManyWithoutPatientAnamnesisInputSchema: z.ZodType<Prisma.AnamnesisAnswerCreateNestedManyWithoutPatientAnamnesisInput> = z.object({
  create: z.union([ z.lazy(() => AnamnesisAnswerCreateWithoutPatientAnamnesisInputSchema),z.lazy(() => AnamnesisAnswerCreateWithoutPatientAnamnesisInputSchema).array(),z.lazy(() => AnamnesisAnswerUncheckedCreateWithoutPatientAnamnesisInputSchema),z.lazy(() => AnamnesisAnswerUncheckedCreateWithoutPatientAnamnesisInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AnamnesisAnswerCreateOrConnectWithoutPatientAnamnesisInputSchema),z.lazy(() => AnamnesisAnswerCreateOrConnectWithoutPatientAnamnesisInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AnamnesisAnswerCreateManyPatientAnamnesisInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AnamnesisAnswerWhereUniqueInputSchema),z.lazy(() => AnamnesisAnswerWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AnamnesisAnswerUncheckedCreateNestedManyWithoutPatientAnamnesisInputSchema: z.ZodType<Prisma.AnamnesisAnswerUncheckedCreateNestedManyWithoutPatientAnamnesisInput> = z.object({
  create: z.union([ z.lazy(() => AnamnesisAnswerCreateWithoutPatientAnamnesisInputSchema),z.lazy(() => AnamnesisAnswerCreateWithoutPatientAnamnesisInputSchema).array(),z.lazy(() => AnamnesisAnswerUncheckedCreateWithoutPatientAnamnesisInputSchema),z.lazy(() => AnamnesisAnswerUncheckedCreateWithoutPatientAnamnesisInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AnamnesisAnswerCreateOrConnectWithoutPatientAnamnesisInputSchema),z.lazy(() => AnamnesisAnswerCreateOrConnectWithoutPatientAnamnesisInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AnamnesisAnswerCreateManyPatientAnamnesisInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AnamnesisAnswerWhereUniqueInputSchema),z.lazy(() => AnamnesisAnswerWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PatientUpdateOneRequiredWithoutPatientAnamnesisNestedInputSchema: z.ZodType<Prisma.PatientUpdateOneRequiredWithoutPatientAnamnesisNestedInput> = z.object({
  create: z.union([ z.lazy(() => PatientCreateWithoutPatientAnamnesisInputSchema),z.lazy(() => PatientUncheckedCreateWithoutPatientAnamnesisInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PatientCreateOrConnectWithoutPatientAnamnesisInputSchema).optional(),
  upsert: z.lazy(() => PatientUpsertWithoutPatientAnamnesisInputSchema).optional(),
  connect: z.lazy(() => PatientWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PatientUpdateToOneWithWhereWithoutPatientAnamnesisInputSchema),z.lazy(() => PatientUpdateWithoutPatientAnamnesisInputSchema),z.lazy(() => PatientUncheckedUpdateWithoutPatientAnamnesisInputSchema) ]).optional(),
}).strict();

export const AnamnesisTemplateUpdateOneRequiredWithoutPatientAnamnesesNestedInputSchema: z.ZodType<Prisma.AnamnesisTemplateUpdateOneRequiredWithoutPatientAnamnesesNestedInput> = z.object({
  create: z.union([ z.lazy(() => AnamnesisTemplateCreateWithoutPatientAnamnesesInputSchema),z.lazy(() => AnamnesisTemplateUncheckedCreateWithoutPatientAnamnesesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AnamnesisTemplateCreateOrConnectWithoutPatientAnamnesesInputSchema).optional(),
  upsert: z.lazy(() => AnamnesisTemplateUpsertWithoutPatientAnamnesesInputSchema).optional(),
  connect: z.lazy(() => AnamnesisTemplateWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => AnamnesisTemplateUpdateToOneWithWhereWithoutPatientAnamnesesInputSchema),z.lazy(() => AnamnesisTemplateUpdateWithoutPatientAnamnesesInputSchema),z.lazy(() => AnamnesisTemplateUncheckedUpdateWithoutPatientAnamnesesInputSchema) ]).optional(),
}).strict();

export const AnamnesisAnswerUpdateManyWithoutPatientAnamnesisNestedInputSchema: z.ZodType<Prisma.AnamnesisAnswerUpdateManyWithoutPatientAnamnesisNestedInput> = z.object({
  create: z.union([ z.lazy(() => AnamnesisAnswerCreateWithoutPatientAnamnesisInputSchema),z.lazy(() => AnamnesisAnswerCreateWithoutPatientAnamnesisInputSchema).array(),z.lazy(() => AnamnesisAnswerUncheckedCreateWithoutPatientAnamnesisInputSchema),z.lazy(() => AnamnesisAnswerUncheckedCreateWithoutPatientAnamnesisInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AnamnesisAnswerCreateOrConnectWithoutPatientAnamnesisInputSchema),z.lazy(() => AnamnesisAnswerCreateOrConnectWithoutPatientAnamnesisInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AnamnesisAnswerUpsertWithWhereUniqueWithoutPatientAnamnesisInputSchema),z.lazy(() => AnamnesisAnswerUpsertWithWhereUniqueWithoutPatientAnamnesisInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AnamnesisAnswerCreateManyPatientAnamnesisInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AnamnesisAnswerWhereUniqueInputSchema),z.lazy(() => AnamnesisAnswerWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AnamnesisAnswerWhereUniqueInputSchema),z.lazy(() => AnamnesisAnswerWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AnamnesisAnswerWhereUniqueInputSchema),z.lazy(() => AnamnesisAnswerWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AnamnesisAnswerWhereUniqueInputSchema),z.lazy(() => AnamnesisAnswerWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AnamnesisAnswerUpdateWithWhereUniqueWithoutPatientAnamnesisInputSchema),z.lazy(() => AnamnesisAnswerUpdateWithWhereUniqueWithoutPatientAnamnesisInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AnamnesisAnswerUpdateManyWithWhereWithoutPatientAnamnesisInputSchema),z.lazy(() => AnamnesisAnswerUpdateManyWithWhereWithoutPatientAnamnesisInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AnamnesisAnswerScalarWhereInputSchema),z.lazy(() => AnamnesisAnswerScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AnamnesisAnswerUncheckedUpdateManyWithoutPatientAnamnesisNestedInputSchema: z.ZodType<Prisma.AnamnesisAnswerUncheckedUpdateManyWithoutPatientAnamnesisNestedInput> = z.object({
  create: z.union([ z.lazy(() => AnamnesisAnswerCreateWithoutPatientAnamnesisInputSchema),z.lazy(() => AnamnesisAnswerCreateWithoutPatientAnamnesisInputSchema).array(),z.lazy(() => AnamnesisAnswerUncheckedCreateWithoutPatientAnamnesisInputSchema),z.lazy(() => AnamnesisAnswerUncheckedCreateWithoutPatientAnamnesisInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AnamnesisAnswerCreateOrConnectWithoutPatientAnamnesisInputSchema),z.lazy(() => AnamnesisAnswerCreateOrConnectWithoutPatientAnamnesisInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AnamnesisAnswerUpsertWithWhereUniqueWithoutPatientAnamnesisInputSchema),z.lazy(() => AnamnesisAnswerUpsertWithWhereUniqueWithoutPatientAnamnesisInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AnamnesisAnswerCreateManyPatientAnamnesisInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AnamnesisAnswerWhereUniqueInputSchema),z.lazy(() => AnamnesisAnswerWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AnamnesisAnswerWhereUniqueInputSchema),z.lazy(() => AnamnesisAnswerWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AnamnesisAnswerWhereUniqueInputSchema),z.lazy(() => AnamnesisAnswerWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AnamnesisAnswerWhereUniqueInputSchema),z.lazy(() => AnamnesisAnswerWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AnamnesisAnswerUpdateWithWhereUniqueWithoutPatientAnamnesisInputSchema),z.lazy(() => AnamnesisAnswerUpdateWithWhereUniqueWithoutPatientAnamnesisInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AnamnesisAnswerUpdateManyWithWhereWithoutPatientAnamnesisInputSchema),z.lazy(() => AnamnesisAnswerUpdateManyWithWhereWithoutPatientAnamnesisInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AnamnesisAnswerScalarWhereInputSchema),z.lazy(() => AnamnesisAnswerScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AnamnesisQuestionCreateNestedOneWithoutAnswersInputSchema: z.ZodType<Prisma.AnamnesisQuestionCreateNestedOneWithoutAnswersInput> = z.object({
  create: z.union([ z.lazy(() => AnamnesisQuestionCreateWithoutAnswersInputSchema),z.lazy(() => AnamnesisQuestionUncheckedCreateWithoutAnswersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AnamnesisQuestionCreateOrConnectWithoutAnswersInputSchema).optional(),
  connect: z.lazy(() => AnamnesisQuestionWhereUniqueInputSchema).optional()
}).strict();

export const PatientAnamnesisCreateNestedOneWithoutAnswersInputSchema: z.ZodType<Prisma.PatientAnamnesisCreateNestedOneWithoutAnswersInput> = z.object({
  create: z.union([ z.lazy(() => PatientAnamnesisCreateWithoutAnswersInputSchema),z.lazy(() => PatientAnamnesisUncheckedCreateWithoutAnswersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PatientAnamnesisCreateOrConnectWithoutAnswersInputSchema).optional(),
  connect: z.lazy(() => PatientAnamnesisWhereUniqueInputSchema).optional()
}).strict();

export const AnamnesisCreateNestedOneWithoutAnswersInputSchema: z.ZodType<Prisma.AnamnesisCreateNestedOneWithoutAnswersInput> = z.object({
  create: z.union([ z.lazy(() => AnamnesisCreateWithoutAnswersInputSchema),z.lazy(() => AnamnesisUncheckedCreateWithoutAnswersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AnamnesisCreateOrConnectWithoutAnswersInputSchema).optional(),
  connect: z.lazy(() => AnamnesisWhereUniqueInputSchema).optional()
}).strict();

export const AnamnesisQuestionUpdateOneRequiredWithoutAnswersNestedInputSchema: z.ZodType<Prisma.AnamnesisQuestionUpdateOneRequiredWithoutAnswersNestedInput> = z.object({
  create: z.union([ z.lazy(() => AnamnesisQuestionCreateWithoutAnswersInputSchema),z.lazy(() => AnamnesisQuestionUncheckedCreateWithoutAnswersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AnamnesisQuestionCreateOrConnectWithoutAnswersInputSchema).optional(),
  upsert: z.lazy(() => AnamnesisQuestionUpsertWithoutAnswersInputSchema).optional(),
  connect: z.lazy(() => AnamnesisQuestionWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => AnamnesisQuestionUpdateToOneWithWhereWithoutAnswersInputSchema),z.lazy(() => AnamnesisQuestionUpdateWithoutAnswersInputSchema),z.lazy(() => AnamnesisQuestionUncheckedUpdateWithoutAnswersInputSchema) ]).optional(),
}).strict();

export const PatientAnamnesisUpdateOneRequiredWithoutAnswersNestedInputSchema: z.ZodType<Prisma.PatientAnamnesisUpdateOneRequiredWithoutAnswersNestedInput> = z.object({
  create: z.union([ z.lazy(() => PatientAnamnesisCreateWithoutAnswersInputSchema),z.lazy(() => PatientAnamnesisUncheckedCreateWithoutAnswersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PatientAnamnesisCreateOrConnectWithoutAnswersInputSchema).optional(),
  upsert: z.lazy(() => PatientAnamnesisUpsertWithoutAnswersInputSchema).optional(),
  connect: z.lazy(() => PatientAnamnesisWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PatientAnamnesisUpdateToOneWithWhereWithoutAnswersInputSchema),z.lazy(() => PatientAnamnesisUpdateWithoutAnswersInputSchema),z.lazy(() => PatientAnamnesisUncheckedUpdateWithoutAnswersInputSchema) ]).optional(),
}).strict();

export const AnamnesisUpdateOneWithoutAnswersNestedInputSchema: z.ZodType<Prisma.AnamnesisUpdateOneWithoutAnswersNestedInput> = z.object({
  create: z.union([ z.lazy(() => AnamnesisCreateWithoutAnswersInputSchema),z.lazy(() => AnamnesisUncheckedCreateWithoutAnswersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AnamnesisCreateOrConnectWithoutAnswersInputSchema).optional(),
  upsert: z.lazy(() => AnamnesisUpsertWithoutAnswersInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => AnamnesisWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => AnamnesisWhereInputSchema) ]).optional(),
  connect: z.lazy(() => AnamnesisWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => AnamnesisUpdateToOneWithWhereWithoutAnswersInputSchema),z.lazy(() => AnamnesisUpdateWithoutAnswersInputSchema),z.lazy(() => AnamnesisUncheckedUpdateWithoutAnswersInputSchema) ]).optional(),
}).strict();

export const PatientCreateNestedOneWithoutAppointmentsInputSchema: z.ZodType<Prisma.PatientCreateNestedOneWithoutAppointmentsInput> = z.object({
  create: z.union([ z.lazy(() => PatientCreateWithoutAppointmentsInputSchema),z.lazy(() => PatientUncheckedCreateWithoutAppointmentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PatientCreateOrConnectWithoutAppointmentsInputSchema).optional(),
  connect: z.lazy(() => PatientWhereUniqueInputSchema).optional()
}).strict();

export const MemberCreateNestedOneWithoutAppointmentsInputSchema: z.ZodType<Prisma.MemberCreateNestedOneWithoutAppointmentsInput> = z.object({
  create: z.union([ z.lazy(() => MemberCreateWithoutAppointmentsInputSchema),z.lazy(() => MemberUncheckedCreateWithoutAppointmentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => MemberCreateOrConnectWithoutAppointmentsInputSchema).optional(),
  connect: z.lazy(() => MemberWhereUniqueInputSchema).optional()
}).strict();

export const EnumAppointmentStatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumAppointmentStatusFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => AppointmentStatusSchema).optional()
}).strict();

export const PatientUpdateOneRequiredWithoutAppointmentsNestedInputSchema: z.ZodType<Prisma.PatientUpdateOneRequiredWithoutAppointmentsNestedInput> = z.object({
  create: z.union([ z.lazy(() => PatientCreateWithoutAppointmentsInputSchema),z.lazy(() => PatientUncheckedCreateWithoutAppointmentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PatientCreateOrConnectWithoutAppointmentsInputSchema).optional(),
  upsert: z.lazy(() => PatientUpsertWithoutAppointmentsInputSchema).optional(),
  connect: z.lazy(() => PatientWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PatientUpdateToOneWithWhereWithoutAppointmentsInputSchema),z.lazy(() => PatientUpdateWithoutAppointmentsInputSchema),z.lazy(() => PatientUncheckedUpdateWithoutAppointmentsInputSchema) ]).optional(),
}).strict();

export const MemberUpdateOneRequiredWithoutAppointmentsNestedInputSchema: z.ZodType<Prisma.MemberUpdateOneRequiredWithoutAppointmentsNestedInput> = z.object({
  create: z.union([ z.lazy(() => MemberCreateWithoutAppointmentsInputSchema),z.lazy(() => MemberUncheckedCreateWithoutAppointmentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => MemberCreateOrConnectWithoutAppointmentsInputSchema).optional(),
  upsert: z.lazy(() => MemberUpsertWithoutAppointmentsInputSchema).optional(),
  connect: z.lazy(() => MemberWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => MemberUpdateToOneWithWhereWithoutAppointmentsInputSchema),z.lazy(() => MemberUpdateWithoutAppointmentsInputSchema),z.lazy(() => MemberUncheckedUpdateWithoutAppointmentsInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutOwns_organizationsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutOwns_organizationsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutOwns_organizationsInputSchema),z.lazy(() => UserUncheckedCreateWithoutOwns_organizationsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutOwns_organizationsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const InviteCreateNestedManyWithoutOrganizationInputSchema: z.ZodType<Prisma.InviteCreateNestedManyWithoutOrganizationInput> = z.object({
  create: z.union([ z.lazy(() => InviteCreateWithoutOrganizationInputSchema),z.lazy(() => InviteCreateWithoutOrganizationInputSchema).array(),z.lazy(() => InviteUncheckedCreateWithoutOrganizationInputSchema),z.lazy(() => InviteUncheckedCreateWithoutOrganizationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InviteCreateOrConnectWithoutOrganizationInputSchema),z.lazy(() => InviteCreateOrConnectWithoutOrganizationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InviteCreateManyOrganizationInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => InviteWhereUniqueInputSchema),z.lazy(() => InviteWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const MemberCreateNestedManyWithoutOrganizationInputSchema: z.ZodType<Prisma.MemberCreateNestedManyWithoutOrganizationInput> = z.object({
  create: z.union([ z.lazy(() => MemberCreateWithoutOrganizationInputSchema),z.lazy(() => MemberCreateWithoutOrganizationInputSchema).array(),z.lazy(() => MemberUncheckedCreateWithoutOrganizationInputSchema),z.lazy(() => MemberUncheckedCreateWithoutOrganizationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MemberCreateOrConnectWithoutOrganizationInputSchema),z.lazy(() => MemberCreateOrConnectWithoutOrganizationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MemberCreateManyOrganizationInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MemberWhereUniqueInputSchema),z.lazy(() => MemberWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PatientCreateNestedManyWithoutOrganizationInputSchema: z.ZodType<Prisma.PatientCreateNestedManyWithoutOrganizationInput> = z.object({
  create: z.union([ z.lazy(() => PatientCreateWithoutOrganizationInputSchema),z.lazy(() => PatientCreateWithoutOrganizationInputSchema).array(),z.lazy(() => PatientUncheckedCreateWithoutOrganizationInputSchema),z.lazy(() => PatientUncheckedCreateWithoutOrganizationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PatientCreateOrConnectWithoutOrganizationInputSchema),z.lazy(() => PatientCreateOrConnectWithoutOrganizationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PatientCreateManyOrganizationInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PatientWhereUniqueInputSchema),z.lazy(() => PatientWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FinancialTransactionCreateNestedManyWithoutOrganizationInputSchema: z.ZodType<Prisma.FinancialTransactionCreateNestedManyWithoutOrganizationInput> = z.object({
  create: z.union([ z.lazy(() => FinancialTransactionCreateWithoutOrganizationInputSchema),z.lazy(() => FinancialTransactionCreateWithoutOrganizationInputSchema).array(),z.lazy(() => FinancialTransactionUncheckedCreateWithoutOrganizationInputSchema),z.lazy(() => FinancialTransactionUncheckedCreateWithoutOrganizationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FinancialTransactionCreateOrConnectWithoutOrganizationInputSchema),z.lazy(() => FinancialTransactionCreateOrConnectWithoutOrganizationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FinancialTransactionCreateManyOrganizationInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FinancialTransactionWhereUniqueInputSchema),z.lazy(() => FinancialTransactionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CustomerSatisfactionCreateNestedManyWithoutOrganizationInputSchema: z.ZodType<Prisma.CustomerSatisfactionCreateNestedManyWithoutOrganizationInput> = z.object({
  create: z.union([ z.lazy(() => CustomerSatisfactionCreateWithoutOrganizationInputSchema),z.lazy(() => CustomerSatisfactionCreateWithoutOrganizationInputSchema).array(),z.lazy(() => CustomerSatisfactionUncheckedCreateWithoutOrganizationInputSchema),z.lazy(() => CustomerSatisfactionUncheckedCreateWithoutOrganizationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CustomerSatisfactionCreateOrConnectWithoutOrganizationInputSchema),z.lazy(() => CustomerSatisfactionCreateOrConnectWithoutOrganizationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CustomerSatisfactionCreateManyOrganizationInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CustomerSatisfactionWhereUniqueInputSchema),z.lazy(() => CustomerSatisfactionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AnamnesisTemplateCreateNestedManyWithoutOrganizationInputSchema: z.ZodType<Prisma.AnamnesisTemplateCreateNestedManyWithoutOrganizationInput> = z.object({
  create: z.union([ z.lazy(() => AnamnesisTemplateCreateWithoutOrganizationInputSchema),z.lazy(() => AnamnesisTemplateCreateWithoutOrganizationInputSchema).array(),z.lazy(() => AnamnesisTemplateUncheckedCreateWithoutOrganizationInputSchema),z.lazy(() => AnamnesisTemplateUncheckedCreateWithoutOrganizationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AnamnesisTemplateCreateOrConnectWithoutOrganizationInputSchema),z.lazy(() => AnamnesisTemplateCreateOrConnectWithoutOrganizationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AnamnesisTemplateCreateManyOrganizationInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AnamnesisTemplateWhereUniqueInputSchema),z.lazy(() => AnamnesisTemplateWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const InviteUncheckedCreateNestedManyWithoutOrganizationInputSchema: z.ZodType<Prisma.InviteUncheckedCreateNestedManyWithoutOrganizationInput> = z.object({
  create: z.union([ z.lazy(() => InviteCreateWithoutOrganizationInputSchema),z.lazy(() => InviteCreateWithoutOrganizationInputSchema).array(),z.lazy(() => InviteUncheckedCreateWithoutOrganizationInputSchema),z.lazy(() => InviteUncheckedCreateWithoutOrganizationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InviteCreateOrConnectWithoutOrganizationInputSchema),z.lazy(() => InviteCreateOrConnectWithoutOrganizationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InviteCreateManyOrganizationInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => InviteWhereUniqueInputSchema),z.lazy(() => InviteWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const MemberUncheckedCreateNestedManyWithoutOrganizationInputSchema: z.ZodType<Prisma.MemberUncheckedCreateNestedManyWithoutOrganizationInput> = z.object({
  create: z.union([ z.lazy(() => MemberCreateWithoutOrganizationInputSchema),z.lazy(() => MemberCreateWithoutOrganizationInputSchema).array(),z.lazy(() => MemberUncheckedCreateWithoutOrganizationInputSchema),z.lazy(() => MemberUncheckedCreateWithoutOrganizationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MemberCreateOrConnectWithoutOrganizationInputSchema),z.lazy(() => MemberCreateOrConnectWithoutOrganizationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MemberCreateManyOrganizationInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MemberWhereUniqueInputSchema),z.lazy(() => MemberWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PatientUncheckedCreateNestedManyWithoutOrganizationInputSchema: z.ZodType<Prisma.PatientUncheckedCreateNestedManyWithoutOrganizationInput> = z.object({
  create: z.union([ z.lazy(() => PatientCreateWithoutOrganizationInputSchema),z.lazy(() => PatientCreateWithoutOrganizationInputSchema).array(),z.lazy(() => PatientUncheckedCreateWithoutOrganizationInputSchema),z.lazy(() => PatientUncheckedCreateWithoutOrganizationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PatientCreateOrConnectWithoutOrganizationInputSchema),z.lazy(() => PatientCreateOrConnectWithoutOrganizationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PatientCreateManyOrganizationInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PatientWhereUniqueInputSchema),z.lazy(() => PatientWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FinancialTransactionUncheckedCreateNestedManyWithoutOrganizationInputSchema: z.ZodType<Prisma.FinancialTransactionUncheckedCreateNestedManyWithoutOrganizationInput> = z.object({
  create: z.union([ z.lazy(() => FinancialTransactionCreateWithoutOrganizationInputSchema),z.lazy(() => FinancialTransactionCreateWithoutOrganizationInputSchema).array(),z.lazy(() => FinancialTransactionUncheckedCreateWithoutOrganizationInputSchema),z.lazy(() => FinancialTransactionUncheckedCreateWithoutOrganizationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FinancialTransactionCreateOrConnectWithoutOrganizationInputSchema),z.lazy(() => FinancialTransactionCreateOrConnectWithoutOrganizationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FinancialTransactionCreateManyOrganizationInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FinancialTransactionWhereUniqueInputSchema),z.lazy(() => FinancialTransactionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CustomerSatisfactionUncheckedCreateNestedManyWithoutOrganizationInputSchema: z.ZodType<Prisma.CustomerSatisfactionUncheckedCreateNestedManyWithoutOrganizationInput> = z.object({
  create: z.union([ z.lazy(() => CustomerSatisfactionCreateWithoutOrganizationInputSchema),z.lazy(() => CustomerSatisfactionCreateWithoutOrganizationInputSchema).array(),z.lazy(() => CustomerSatisfactionUncheckedCreateWithoutOrganizationInputSchema),z.lazy(() => CustomerSatisfactionUncheckedCreateWithoutOrganizationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CustomerSatisfactionCreateOrConnectWithoutOrganizationInputSchema),z.lazy(() => CustomerSatisfactionCreateOrConnectWithoutOrganizationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CustomerSatisfactionCreateManyOrganizationInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CustomerSatisfactionWhereUniqueInputSchema),z.lazy(() => CustomerSatisfactionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AnamnesisTemplateUncheckedCreateNestedManyWithoutOrganizationInputSchema: z.ZodType<Prisma.AnamnesisTemplateUncheckedCreateNestedManyWithoutOrganizationInput> = z.object({
  create: z.union([ z.lazy(() => AnamnesisTemplateCreateWithoutOrganizationInputSchema),z.lazy(() => AnamnesisTemplateCreateWithoutOrganizationInputSchema).array(),z.lazy(() => AnamnesisTemplateUncheckedCreateWithoutOrganizationInputSchema),z.lazy(() => AnamnesisTemplateUncheckedCreateWithoutOrganizationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AnamnesisTemplateCreateOrConnectWithoutOrganizationInputSchema),z.lazy(() => AnamnesisTemplateCreateOrConnectWithoutOrganizationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AnamnesisTemplateCreateManyOrganizationInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AnamnesisTemplateWhereUniqueInputSchema),z.lazy(() => AnamnesisTemplateWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional()
}).strict();

export const UserUpdateOneRequiredWithoutOwns_organizationsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutOwns_organizationsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutOwns_organizationsInputSchema),z.lazy(() => UserUncheckedCreateWithoutOwns_organizationsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutOwns_organizationsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutOwns_organizationsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutOwns_organizationsInputSchema),z.lazy(() => UserUpdateWithoutOwns_organizationsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutOwns_organizationsInputSchema) ]).optional(),
}).strict();

export const InviteUpdateManyWithoutOrganizationNestedInputSchema: z.ZodType<Prisma.InviteUpdateManyWithoutOrganizationNestedInput> = z.object({
  create: z.union([ z.lazy(() => InviteCreateWithoutOrganizationInputSchema),z.lazy(() => InviteCreateWithoutOrganizationInputSchema).array(),z.lazy(() => InviteUncheckedCreateWithoutOrganizationInputSchema),z.lazy(() => InviteUncheckedCreateWithoutOrganizationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InviteCreateOrConnectWithoutOrganizationInputSchema),z.lazy(() => InviteCreateOrConnectWithoutOrganizationInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => InviteUpsertWithWhereUniqueWithoutOrganizationInputSchema),z.lazy(() => InviteUpsertWithWhereUniqueWithoutOrganizationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InviteCreateManyOrganizationInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => InviteWhereUniqueInputSchema),z.lazy(() => InviteWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => InviteWhereUniqueInputSchema),z.lazy(() => InviteWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => InviteWhereUniqueInputSchema),z.lazy(() => InviteWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => InviteWhereUniqueInputSchema),z.lazy(() => InviteWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => InviteUpdateWithWhereUniqueWithoutOrganizationInputSchema),z.lazy(() => InviteUpdateWithWhereUniqueWithoutOrganizationInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => InviteUpdateManyWithWhereWithoutOrganizationInputSchema),z.lazy(() => InviteUpdateManyWithWhereWithoutOrganizationInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => InviteScalarWhereInputSchema),z.lazy(() => InviteScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const MemberUpdateManyWithoutOrganizationNestedInputSchema: z.ZodType<Prisma.MemberUpdateManyWithoutOrganizationNestedInput> = z.object({
  create: z.union([ z.lazy(() => MemberCreateWithoutOrganizationInputSchema),z.lazy(() => MemberCreateWithoutOrganizationInputSchema).array(),z.lazy(() => MemberUncheckedCreateWithoutOrganizationInputSchema),z.lazy(() => MemberUncheckedCreateWithoutOrganizationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MemberCreateOrConnectWithoutOrganizationInputSchema),z.lazy(() => MemberCreateOrConnectWithoutOrganizationInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MemberUpsertWithWhereUniqueWithoutOrganizationInputSchema),z.lazy(() => MemberUpsertWithWhereUniqueWithoutOrganizationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MemberCreateManyOrganizationInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MemberWhereUniqueInputSchema),z.lazy(() => MemberWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MemberWhereUniqueInputSchema),z.lazy(() => MemberWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MemberWhereUniqueInputSchema),z.lazy(() => MemberWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MemberWhereUniqueInputSchema),z.lazy(() => MemberWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MemberUpdateWithWhereUniqueWithoutOrganizationInputSchema),z.lazy(() => MemberUpdateWithWhereUniqueWithoutOrganizationInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MemberUpdateManyWithWhereWithoutOrganizationInputSchema),z.lazy(() => MemberUpdateManyWithWhereWithoutOrganizationInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MemberScalarWhereInputSchema),z.lazy(() => MemberScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PatientUpdateManyWithoutOrganizationNestedInputSchema: z.ZodType<Prisma.PatientUpdateManyWithoutOrganizationNestedInput> = z.object({
  create: z.union([ z.lazy(() => PatientCreateWithoutOrganizationInputSchema),z.lazy(() => PatientCreateWithoutOrganizationInputSchema).array(),z.lazy(() => PatientUncheckedCreateWithoutOrganizationInputSchema),z.lazy(() => PatientUncheckedCreateWithoutOrganizationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PatientCreateOrConnectWithoutOrganizationInputSchema),z.lazy(() => PatientCreateOrConnectWithoutOrganizationInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PatientUpsertWithWhereUniqueWithoutOrganizationInputSchema),z.lazy(() => PatientUpsertWithWhereUniqueWithoutOrganizationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PatientCreateManyOrganizationInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PatientWhereUniqueInputSchema),z.lazy(() => PatientWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PatientWhereUniqueInputSchema),z.lazy(() => PatientWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PatientWhereUniqueInputSchema),z.lazy(() => PatientWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PatientWhereUniqueInputSchema),z.lazy(() => PatientWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PatientUpdateWithWhereUniqueWithoutOrganizationInputSchema),z.lazy(() => PatientUpdateWithWhereUniqueWithoutOrganizationInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PatientUpdateManyWithWhereWithoutOrganizationInputSchema),z.lazy(() => PatientUpdateManyWithWhereWithoutOrganizationInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PatientScalarWhereInputSchema),z.lazy(() => PatientScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const FinancialTransactionUpdateManyWithoutOrganizationNestedInputSchema: z.ZodType<Prisma.FinancialTransactionUpdateManyWithoutOrganizationNestedInput> = z.object({
  create: z.union([ z.lazy(() => FinancialTransactionCreateWithoutOrganizationInputSchema),z.lazy(() => FinancialTransactionCreateWithoutOrganizationInputSchema).array(),z.lazy(() => FinancialTransactionUncheckedCreateWithoutOrganizationInputSchema),z.lazy(() => FinancialTransactionUncheckedCreateWithoutOrganizationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FinancialTransactionCreateOrConnectWithoutOrganizationInputSchema),z.lazy(() => FinancialTransactionCreateOrConnectWithoutOrganizationInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FinancialTransactionUpsertWithWhereUniqueWithoutOrganizationInputSchema),z.lazy(() => FinancialTransactionUpsertWithWhereUniqueWithoutOrganizationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FinancialTransactionCreateManyOrganizationInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FinancialTransactionWhereUniqueInputSchema),z.lazy(() => FinancialTransactionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FinancialTransactionWhereUniqueInputSchema),z.lazy(() => FinancialTransactionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FinancialTransactionWhereUniqueInputSchema),z.lazy(() => FinancialTransactionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FinancialTransactionWhereUniqueInputSchema),z.lazy(() => FinancialTransactionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FinancialTransactionUpdateWithWhereUniqueWithoutOrganizationInputSchema),z.lazy(() => FinancialTransactionUpdateWithWhereUniqueWithoutOrganizationInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FinancialTransactionUpdateManyWithWhereWithoutOrganizationInputSchema),z.lazy(() => FinancialTransactionUpdateManyWithWhereWithoutOrganizationInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FinancialTransactionScalarWhereInputSchema),z.lazy(() => FinancialTransactionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CustomerSatisfactionUpdateManyWithoutOrganizationNestedInputSchema: z.ZodType<Prisma.CustomerSatisfactionUpdateManyWithoutOrganizationNestedInput> = z.object({
  create: z.union([ z.lazy(() => CustomerSatisfactionCreateWithoutOrganizationInputSchema),z.lazy(() => CustomerSatisfactionCreateWithoutOrganizationInputSchema).array(),z.lazy(() => CustomerSatisfactionUncheckedCreateWithoutOrganizationInputSchema),z.lazy(() => CustomerSatisfactionUncheckedCreateWithoutOrganizationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CustomerSatisfactionCreateOrConnectWithoutOrganizationInputSchema),z.lazy(() => CustomerSatisfactionCreateOrConnectWithoutOrganizationInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CustomerSatisfactionUpsertWithWhereUniqueWithoutOrganizationInputSchema),z.lazy(() => CustomerSatisfactionUpsertWithWhereUniqueWithoutOrganizationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CustomerSatisfactionCreateManyOrganizationInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CustomerSatisfactionWhereUniqueInputSchema),z.lazy(() => CustomerSatisfactionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CustomerSatisfactionWhereUniqueInputSchema),z.lazy(() => CustomerSatisfactionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CustomerSatisfactionWhereUniqueInputSchema),z.lazy(() => CustomerSatisfactionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CustomerSatisfactionWhereUniqueInputSchema),z.lazy(() => CustomerSatisfactionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CustomerSatisfactionUpdateWithWhereUniqueWithoutOrganizationInputSchema),z.lazy(() => CustomerSatisfactionUpdateWithWhereUniqueWithoutOrganizationInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CustomerSatisfactionUpdateManyWithWhereWithoutOrganizationInputSchema),z.lazy(() => CustomerSatisfactionUpdateManyWithWhereWithoutOrganizationInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CustomerSatisfactionScalarWhereInputSchema),z.lazy(() => CustomerSatisfactionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AnamnesisTemplateUpdateManyWithoutOrganizationNestedInputSchema: z.ZodType<Prisma.AnamnesisTemplateUpdateManyWithoutOrganizationNestedInput> = z.object({
  create: z.union([ z.lazy(() => AnamnesisTemplateCreateWithoutOrganizationInputSchema),z.lazy(() => AnamnesisTemplateCreateWithoutOrganizationInputSchema).array(),z.lazy(() => AnamnesisTemplateUncheckedCreateWithoutOrganizationInputSchema),z.lazy(() => AnamnesisTemplateUncheckedCreateWithoutOrganizationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AnamnesisTemplateCreateOrConnectWithoutOrganizationInputSchema),z.lazy(() => AnamnesisTemplateCreateOrConnectWithoutOrganizationInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AnamnesisTemplateUpsertWithWhereUniqueWithoutOrganizationInputSchema),z.lazy(() => AnamnesisTemplateUpsertWithWhereUniqueWithoutOrganizationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AnamnesisTemplateCreateManyOrganizationInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AnamnesisTemplateWhereUniqueInputSchema),z.lazy(() => AnamnesisTemplateWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AnamnesisTemplateWhereUniqueInputSchema),z.lazy(() => AnamnesisTemplateWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AnamnesisTemplateWhereUniqueInputSchema),z.lazy(() => AnamnesisTemplateWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AnamnesisTemplateWhereUniqueInputSchema),z.lazy(() => AnamnesisTemplateWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AnamnesisTemplateUpdateWithWhereUniqueWithoutOrganizationInputSchema),z.lazy(() => AnamnesisTemplateUpdateWithWhereUniqueWithoutOrganizationInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AnamnesisTemplateUpdateManyWithWhereWithoutOrganizationInputSchema),z.lazy(() => AnamnesisTemplateUpdateManyWithWhereWithoutOrganizationInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AnamnesisTemplateScalarWhereInputSchema),z.lazy(() => AnamnesisTemplateScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const InviteUncheckedUpdateManyWithoutOrganizationNestedInputSchema: z.ZodType<Prisma.InviteUncheckedUpdateManyWithoutOrganizationNestedInput> = z.object({
  create: z.union([ z.lazy(() => InviteCreateWithoutOrganizationInputSchema),z.lazy(() => InviteCreateWithoutOrganizationInputSchema).array(),z.lazy(() => InviteUncheckedCreateWithoutOrganizationInputSchema),z.lazy(() => InviteUncheckedCreateWithoutOrganizationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InviteCreateOrConnectWithoutOrganizationInputSchema),z.lazy(() => InviteCreateOrConnectWithoutOrganizationInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => InviteUpsertWithWhereUniqueWithoutOrganizationInputSchema),z.lazy(() => InviteUpsertWithWhereUniqueWithoutOrganizationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InviteCreateManyOrganizationInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => InviteWhereUniqueInputSchema),z.lazy(() => InviteWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => InviteWhereUniqueInputSchema),z.lazy(() => InviteWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => InviteWhereUniqueInputSchema),z.lazy(() => InviteWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => InviteWhereUniqueInputSchema),z.lazy(() => InviteWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => InviteUpdateWithWhereUniqueWithoutOrganizationInputSchema),z.lazy(() => InviteUpdateWithWhereUniqueWithoutOrganizationInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => InviteUpdateManyWithWhereWithoutOrganizationInputSchema),z.lazy(() => InviteUpdateManyWithWhereWithoutOrganizationInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => InviteScalarWhereInputSchema),z.lazy(() => InviteScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const MemberUncheckedUpdateManyWithoutOrganizationNestedInputSchema: z.ZodType<Prisma.MemberUncheckedUpdateManyWithoutOrganizationNestedInput> = z.object({
  create: z.union([ z.lazy(() => MemberCreateWithoutOrganizationInputSchema),z.lazy(() => MemberCreateWithoutOrganizationInputSchema).array(),z.lazy(() => MemberUncheckedCreateWithoutOrganizationInputSchema),z.lazy(() => MemberUncheckedCreateWithoutOrganizationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MemberCreateOrConnectWithoutOrganizationInputSchema),z.lazy(() => MemberCreateOrConnectWithoutOrganizationInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MemberUpsertWithWhereUniqueWithoutOrganizationInputSchema),z.lazy(() => MemberUpsertWithWhereUniqueWithoutOrganizationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MemberCreateManyOrganizationInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MemberWhereUniqueInputSchema),z.lazy(() => MemberWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MemberWhereUniqueInputSchema),z.lazy(() => MemberWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MemberWhereUniqueInputSchema),z.lazy(() => MemberWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MemberWhereUniqueInputSchema),z.lazy(() => MemberWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MemberUpdateWithWhereUniqueWithoutOrganizationInputSchema),z.lazy(() => MemberUpdateWithWhereUniqueWithoutOrganizationInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MemberUpdateManyWithWhereWithoutOrganizationInputSchema),z.lazy(() => MemberUpdateManyWithWhereWithoutOrganizationInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MemberScalarWhereInputSchema),z.lazy(() => MemberScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PatientUncheckedUpdateManyWithoutOrganizationNestedInputSchema: z.ZodType<Prisma.PatientUncheckedUpdateManyWithoutOrganizationNestedInput> = z.object({
  create: z.union([ z.lazy(() => PatientCreateWithoutOrganizationInputSchema),z.lazy(() => PatientCreateWithoutOrganizationInputSchema).array(),z.lazy(() => PatientUncheckedCreateWithoutOrganizationInputSchema),z.lazy(() => PatientUncheckedCreateWithoutOrganizationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PatientCreateOrConnectWithoutOrganizationInputSchema),z.lazy(() => PatientCreateOrConnectWithoutOrganizationInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PatientUpsertWithWhereUniqueWithoutOrganizationInputSchema),z.lazy(() => PatientUpsertWithWhereUniqueWithoutOrganizationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PatientCreateManyOrganizationInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PatientWhereUniqueInputSchema),z.lazy(() => PatientWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PatientWhereUniqueInputSchema),z.lazy(() => PatientWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PatientWhereUniqueInputSchema),z.lazy(() => PatientWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PatientWhereUniqueInputSchema),z.lazy(() => PatientWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PatientUpdateWithWhereUniqueWithoutOrganizationInputSchema),z.lazy(() => PatientUpdateWithWhereUniqueWithoutOrganizationInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PatientUpdateManyWithWhereWithoutOrganizationInputSchema),z.lazy(() => PatientUpdateManyWithWhereWithoutOrganizationInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PatientScalarWhereInputSchema),z.lazy(() => PatientScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const FinancialTransactionUncheckedUpdateManyWithoutOrganizationNestedInputSchema: z.ZodType<Prisma.FinancialTransactionUncheckedUpdateManyWithoutOrganizationNestedInput> = z.object({
  create: z.union([ z.lazy(() => FinancialTransactionCreateWithoutOrganizationInputSchema),z.lazy(() => FinancialTransactionCreateWithoutOrganizationInputSchema).array(),z.lazy(() => FinancialTransactionUncheckedCreateWithoutOrganizationInputSchema),z.lazy(() => FinancialTransactionUncheckedCreateWithoutOrganizationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FinancialTransactionCreateOrConnectWithoutOrganizationInputSchema),z.lazy(() => FinancialTransactionCreateOrConnectWithoutOrganizationInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FinancialTransactionUpsertWithWhereUniqueWithoutOrganizationInputSchema),z.lazy(() => FinancialTransactionUpsertWithWhereUniqueWithoutOrganizationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FinancialTransactionCreateManyOrganizationInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FinancialTransactionWhereUniqueInputSchema),z.lazy(() => FinancialTransactionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FinancialTransactionWhereUniqueInputSchema),z.lazy(() => FinancialTransactionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FinancialTransactionWhereUniqueInputSchema),z.lazy(() => FinancialTransactionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FinancialTransactionWhereUniqueInputSchema),z.lazy(() => FinancialTransactionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FinancialTransactionUpdateWithWhereUniqueWithoutOrganizationInputSchema),z.lazy(() => FinancialTransactionUpdateWithWhereUniqueWithoutOrganizationInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FinancialTransactionUpdateManyWithWhereWithoutOrganizationInputSchema),z.lazy(() => FinancialTransactionUpdateManyWithWhereWithoutOrganizationInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FinancialTransactionScalarWhereInputSchema),z.lazy(() => FinancialTransactionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CustomerSatisfactionUncheckedUpdateManyWithoutOrganizationNestedInputSchema: z.ZodType<Prisma.CustomerSatisfactionUncheckedUpdateManyWithoutOrganizationNestedInput> = z.object({
  create: z.union([ z.lazy(() => CustomerSatisfactionCreateWithoutOrganizationInputSchema),z.lazy(() => CustomerSatisfactionCreateWithoutOrganizationInputSchema).array(),z.lazy(() => CustomerSatisfactionUncheckedCreateWithoutOrganizationInputSchema),z.lazy(() => CustomerSatisfactionUncheckedCreateWithoutOrganizationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CustomerSatisfactionCreateOrConnectWithoutOrganizationInputSchema),z.lazy(() => CustomerSatisfactionCreateOrConnectWithoutOrganizationInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CustomerSatisfactionUpsertWithWhereUniqueWithoutOrganizationInputSchema),z.lazy(() => CustomerSatisfactionUpsertWithWhereUniqueWithoutOrganizationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CustomerSatisfactionCreateManyOrganizationInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CustomerSatisfactionWhereUniqueInputSchema),z.lazy(() => CustomerSatisfactionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CustomerSatisfactionWhereUniqueInputSchema),z.lazy(() => CustomerSatisfactionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CustomerSatisfactionWhereUniqueInputSchema),z.lazy(() => CustomerSatisfactionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CustomerSatisfactionWhereUniqueInputSchema),z.lazy(() => CustomerSatisfactionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CustomerSatisfactionUpdateWithWhereUniqueWithoutOrganizationInputSchema),z.lazy(() => CustomerSatisfactionUpdateWithWhereUniqueWithoutOrganizationInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CustomerSatisfactionUpdateManyWithWhereWithoutOrganizationInputSchema),z.lazy(() => CustomerSatisfactionUpdateManyWithWhereWithoutOrganizationInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CustomerSatisfactionScalarWhereInputSchema),z.lazy(() => CustomerSatisfactionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AnamnesisTemplateUncheckedUpdateManyWithoutOrganizationNestedInputSchema: z.ZodType<Prisma.AnamnesisTemplateUncheckedUpdateManyWithoutOrganizationNestedInput> = z.object({
  create: z.union([ z.lazy(() => AnamnesisTemplateCreateWithoutOrganizationInputSchema),z.lazy(() => AnamnesisTemplateCreateWithoutOrganizationInputSchema).array(),z.lazy(() => AnamnesisTemplateUncheckedCreateWithoutOrganizationInputSchema),z.lazy(() => AnamnesisTemplateUncheckedCreateWithoutOrganizationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AnamnesisTemplateCreateOrConnectWithoutOrganizationInputSchema),z.lazy(() => AnamnesisTemplateCreateOrConnectWithoutOrganizationInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AnamnesisTemplateUpsertWithWhereUniqueWithoutOrganizationInputSchema),z.lazy(() => AnamnesisTemplateUpsertWithWhereUniqueWithoutOrganizationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AnamnesisTemplateCreateManyOrganizationInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AnamnesisTemplateWhereUniqueInputSchema),z.lazy(() => AnamnesisTemplateWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AnamnesisTemplateWhereUniqueInputSchema),z.lazy(() => AnamnesisTemplateWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AnamnesisTemplateWhereUniqueInputSchema),z.lazy(() => AnamnesisTemplateWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AnamnesisTemplateWhereUniqueInputSchema),z.lazy(() => AnamnesisTemplateWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AnamnesisTemplateUpdateWithWhereUniqueWithoutOrganizationInputSchema),z.lazy(() => AnamnesisTemplateUpdateWithWhereUniqueWithoutOrganizationInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AnamnesisTemplateUpdateManyWithWhereWithoutOrganizationInputSchema),z.lazy(() => AnamnesisTemplateUpdateManyWithWhereWithoutOrganizationInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AnamnesisTemplateScalarWhereInputSchema),z.lazy(() => AnamnesisTemplateScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const OrganizationCreateNestedOneWithoutFinancialTransactionsInputSchema: z.ZodType<Prisma.OrganizationCreateNestedOneWithoutFinancialTransactionsInput> = z.object({
  create: z.union([ z.lazy(() => OrganizationCreateWithoutFinancialTransactionsInputSchema),z.lazy(() => OrganizationUncheckedCreateWithoutFinancialTransactionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => OrganizationCreateOrConnectWithoutFinancialTransactionsInputSchema).optional(),
  connect: z.lazy(() => OrganizationWhereUniqueInputSchema).optional()
}).strict();

export const PatientCreateNestedOneWithoutFinancialTransactionInputSchema: z.ZodType<Prisma.PatientCreateNestedOneWithoutFinancialTransactionInput> = z.object({
  create: z.union([ z.lazy(() => PatientCreateWithoutFinancialTransactionInputSchema),z.lazy(() => PatientUncheckedCreateWithoutFinancialTransactionInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PatientCreateOrConnectWithoutFinancialTransactionInputSchema).optional(),
  connect: z.lazy(() => PatientWhereUniqueInputSchema).optional()
}).strict();

export const EnumTransactionTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumTransactionTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => TransactionTypeSchema).optional()
}).strict();

export const EnumPaymentMethodFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumPaymentMethodFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => PaymentMethodSchema).optional()
}).strict();

export const OrganizationUpdateOneRequiredWithoutFinancialTransactionsNestedInputSchema: z.ZodType<Prisma.OrganizationUpdateOneRequiredWithoutFinancialTransactionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => OrganizationCreateWithoutFinancialTransactionsInputSchema),z.lazy(() => OrganizationUncheckedCreateWithoutFinancialTransactionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => OrganizationCreateOrConnectWithoutFinancialTransactionsInputSchema).optional(),
  upsert: z.lazy(() => OrganizationUpsertWithoutFinancialTransactionsInputSchema).optional(),
  connect: z.lazy(() => OrganizationWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => OrganizationUpdateToOneWithWhereWithoutFinancialTransactionsInputSchema),z.lazy(() => OrganizationUpdateWithoutFinancialTransactionsInputSchema),z.lazy(() => OrganizationUncheckedUpdateWithoutFinancialTransactionsInputSchema) ]).optional(),
}).strict();

export const PatientUpdateOneWithoutFinancialTransactionNestedInputSchema: z.ZodType<Prisma.PatientUpdateOneWithoutFinancialTransactionNestedInput> = z.object({
  create: z.union([ z.lazy(() => PatientCreateWithoutFinancialTransactionInputSchema),z.lazy(() => PatientUncheckedCreateWithoutFinancialTransactionInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PatientCreateOrConnectWithoutFinancialTransactionInputSchema).optional(),
  upsert: z.lazy(() => PatientUpsertWithoutFinancialTransactionInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => PatientWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => PatientWhereInputSchema) ]).optional(),
  connect: z.lazy(() => PatientWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PatientUpdateToOneWithWhereWithoutFinancialTransactionInputSchema),z.lazy(() => PatientUpdateWithoutFinancialTransactionInputSchema),z.lazy(() => PatientUncheckedUpdateWithoutFinancialTransactionInputSchema) ]).optional(),
}).strict();

export const PatientCreateNestedOneWithoutCustomerSatisfactionInputSchema: z.ZodType<Prisma.PatientCreateNestedOneWithoutCustomerSatisfactionInput> = z.object({
  create: z.union([ z.lazy(() => PatientCreateWithoutCustomerSatisfactionInputSchema),z.lazy(() => PatientUncheckedCreateWithoutCustomerSatisfactionInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PatientCreateOrConnectWithoutCustomerSatisfactionInputSchema).optional(),
  connect: z.lazy(() => PatientWhereUniqueInputSchema).optional()
}).strict();

export const OrganizationCreateNestedOneWithoutCustomerSatisfactionsInputSchema: z.ZodType<Prisma.OrganizationCreateNestedOneWithoutCustomerSatisfactionsInput> = z.object({
  create: z.union([ z.lazy(() => OrganizationCreateWithoutCustomerSatisfactionsInputSchema),z.lazy(() => OrganizationUncheckedCreateWithoutCustomerSatisfactionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => OrganizationCreateOrConnectWithoutCustomerSatisfactionsInputSchema).optional(),
  connect: z.lazy(() => OrganizationWhereUniqueInputSchema).optional()
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const PatientUpdateOneRequiredWithoutCustomerSatisfactionNestedInputSchema: z.ZodType<Prisma.PatientUpdateOneRequiredWithoutCustomerSatisfactionNestedInput> = z.object({
  create: z.union([ z.lazy(() => PatientCreateWithoutCustomerSatisfactionInputSchema),z.lazy(() => PatientUncheckedCreateWithoutCustomerSatisfactionInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PatientCreateOrConnectWithoutCustomerSatisfactionInputSchema).optional(),
  upsert: z.lazy(() => PatientUpsertWithoutCustomerSatisfactionInputSchema).optional(),
  connect: z.lazy(() => PatientWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PatientUpdateToOneWithWhereWithoutCustomerSatisfactionInputSchema),z.lazy(() => PatientUpdateWithoutCustomerSatisfactionInputSchema),z.lazy(() => PatientUncheckedUpdateWithoutCustomerSatisfactionInputSchema) ]).optional(),
}).strict();

export const OrganizationUpdateOneRequiredWithoutCustomerSatisfactionsNestedInputSchema: z.ZodType<Prisma.OrganizationUpdateOneRequiredWithoutCustomerSatisfactionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => OrganizationCreateWithoutCustomerSatisfactionsInputSchema),z.lazy(() => OrganizationUncheckedCreateWithoutCustomerSatisfactionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => OrganizationCreateOrConnectWithoutCustomerSatisfactionsInputSchema).optional(),
  upsert: z.lazy(() => OrganizationUpsertWithoutCustomerSatisfactionsInputSchema).optional(),
  connect: z.lazy(() => OrganizationWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => OrganizationUpdateToOneWithWhereWithoutCustomerSatisfactionsInputSchema),z.lazy(() => OrganizationUpdateWithoutCustomerSatisfactionsInputSchema),z.lazy(() => OrganizationUncheckedUpdateWithoutCustomerSatisfactionsInputSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedEnumTokenTypeFilterSchema: z.ZodType<Prisma.NestedEnumTokenTypeFilter> = z.object({
  equals: z.lazy(() => TokenTypeSchema).optional(),
  in: z.lazy(() => TokenTypeSchema).array().optional(),
  notIn: z.lazy(() => TokenTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => TokenTypeSchema),z.lazy(() => NestedEnumTokenTypeFilterSchema) ]).optional(),
}).strict();

export const NestedEnumTokenTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumTokenTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => TokenTypeSchema).optional(),
  in: z.lazy(() => TokenTypeSchema).array().optional(),
  notIn: z.lazy(() => TokenTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => TokenTypeSchema),z.lazy(() => NestedEnumTokenTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumTokenTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumTokenTypeFilterSchema).optional()
}).strict();

export const NestedEnumAccountProviderFilterSchema: z.ZodType<Prisma.NestedEnumAccountProviderFilter> = z.object({
  equals: z.lazy(() => AccountProviderSchema).optional(),
  in: z.lazy(() => AccountProviderSchema).array().optional(),
  notIn: z.lazy(() => AccountProviderSchema).array().optional(),
  not: z.union([ z.lazy(() => AccountProviderSchema),z.lazy(() => NestedEnumAccountProviderFilterSchema) ]).optional(),
}).strict();

export const NestedEnumAccountProviderWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumAccountProviderWithAggregatesFilter> = z.object({
  equals: z.lazy(() => AccountProviderSchema).optional(),
  in: z.lazy(() => AccountProviderSchema).array().optional(),
  notIn: z.lazy(() => AccountProviderSchema).array().optional(),
  not: z.union([ z.lazy(() => AccountProviderSchema),z.lazy(() => NestedEnumAccountProviderWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumAccountProviderFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumAccountProviderFilterSchema).optional()
}).strict();

export const NestedEnumRoleFilterSchema: z.ZodType<Prisma.NestedEnumRoleFilter> = z.object({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleSchema),z.lazy(() => NestedEnumRoleFilterSchema) ]).optional(),
}).strict();

export const NestedEnumRoleWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumRoleWithAggregatesFilter> = z.object({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleSchema),z.lazy(() => NestedEnumRoleWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumRoleFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumRoleFilterSchema).optional()
}).strict();

export const NestedEnumQuestionTypeFilterSchema: z.ZodType<Prisma.NestedEnumQuestionTypeFilter> = z.object({
  equals: z.lazy(() => QuestionTypeSchema).optional(),
  in: z.lazy(() => QuestionTypeSchema).array().optional(),
  notIn: z.lazy(() => QuestionTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => QuestionTypeSchema),z.lazy(() => NestedEnumQuestionTypeFilterSchema) ]).optional(),
}).strict();

export const NestedEnumQuestionTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumQuestionTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => QuestionTypeSchema).optional(),
  in: z.lazy(() => QuestionTypeSchema).array().optional(),
  notIn: z.lazy(() => QuestionTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => QuestionTypeSchema),z.lazy(() => NestedEnumQuestionTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumQuestionTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumQuestionTypeFilterSchema).optional()
}).strict();

export const NestedEnumAppointmentStatusFilterSchema: z.ZodType<Prisma.NestedEnumAppointmentStatusFilter> = z.object({
  equals: z.lazy(() => AppointmentStatusSchema).optional(),
  in: z.lazy(() => AppointmentStatusSchema).array().optional(),
  notIn: z.lazy(() => AppointmentStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => AppointmentStatusSchema),z.lazy(() => NestedEnumAppointmentStatusFilterSchema) ]).optional(),
}).strict();

export const NestedEnumAppointmentStatusWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumAppointmentStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => AppointmentStatusSchema).optional(),
  in: z.lazy(() => AppointmentStatusSchema).array().optional(),
  notIn: z.lazy(() => AppointmentStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => AppointmentStatusSchema),z.lazy(() => NestedEnumAppointmentStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumAppointmentStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumAppointmentStatusFilterSchema).optional()
}).strict();

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const NestedEnumTransactionTypeFilterSchema: z.ZodType<Prisma.NestedEnumTransactionTypeFilter> = z.object({
  equals: z.lazy(() => TransactionTypeSchema).optional(),
  in: z.lazy(() => TransactionTypeSchema).array().optional(),
  notIn: z.lazy(() => TransactionTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => TransactionTypeSchema),z.lazy(() => NestedEnumTransactionTypeFilterSchema) ]).optional(),
}).strict();

export const NestedEnumPaymentMethodFilterSchema: z.ZodType<Prisma.NestedEnumPaymentMethodFilter> = z.object({
  equals: z.lazy(() => PaymentMethodSchema).optional(),
  in: z.lazy(() => PaymentMethodSchema).array().optional(),
  notIn: z.lazy(() => PaymentMethodSchema).array().optional(),
  not: z.union([ z.lazy(() => PaymentMethodSchema),z.lazy(() => NestedEnumPaymentMethodFilterSchema) ]).optional(),
}).strict();

export const NestedEnumTransactionTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumTransactionTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => TransactionTypeSchema).optional(),
  in: z.lazy(() => TransactionTypeSchema).array().optional(),
  notIn: z.lazy(() => TransactionTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => TransactionTypeSchema),z.lazy(() => NestedEnumTransactionTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumTransactionTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumTransactionTypeFilterSchema).optional()
}).strict();

export const NestedEnumPaymentMethodWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumPaymentMethodWithAggregatesFilter> = z.object({
  equals: z.lazy(() => PaymentMethodSchema).optional(),
  in: z.lazy(() => PaymentMethodSchema).array().optional(),
  notIn: z.lazy(() => PaymentMethodSchema).array().optional(),
  not: z.union([ z.lazy(() => PaymentMethodSchema),z.lazy(() => NestedEnumPaymentMethodWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumPaymentMethodFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumPaymentMethodFilterSchema).optional()
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const TokenCreateWithoutUserInputSchema: z.ZodType<Prisma.TokenCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  type: z.lazy(() => TokenTypeSchema),
  createdAt: z.coerce.date().optional()
}).strict();

export const TokenUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.TokenUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  type: z.lazy(() => TokenTypeSchema),
  createdAt: z.coerce.date().optional()
}).strict();

export const TokenCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.TokenCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => TokenWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TokenCreateWithoutUserInputSchema),z.lazy(() => TokenUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const TokenCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.TokenCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => TokenCreateManyUserInputSchema),z.lazy(() => TokenCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const AccountCreateWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  provider: z.lazy(() => AccountProviderSchema),
  providerAccountId: z.string()
}).strict();

export const AccountUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  provider: z.lazy(() => AccountProviderSchema),
  providerAccountId: z.string()
}).strict();

export const AccountCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const AccountCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.AccountCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => AccountCreateManyUserInputSchema),z.lazy(() => AccountCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const InviteCreateWithoutAuthorInputSchema: z.ZodType<Prisma.InviteCreateWithoutAuthorInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  role: z.lazy(() => RoleSchema),
  createdAt: z.coerce.date().optional(),
  organization: z.lazy(() => OrganizationCreateNestedOneWithoutInvitesInputSchema)
}).strict();

export const InviteUncheckedCreateWithoutAuthorInputSchema: z.ZodType<Prisma.InviteUncheckedCreateWithoutAuthorInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  role: z.lazy(() => RoleSchema),
  createdAt: z.coerce.date().optional(),
  organizationId: z.string()
}).strict();

export const InviteCreateOrConnectWithoutAuthorInputSchema: z.ZodType<Prisma.InviteCreateOrConnectWithoutAuthorInput> = z.object({
  where: z.lazy(() => InviteWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => InviteCreateWithoutAuthorInputSchema),z.lazy(() => InviteUncheckedCreateWithoutAuthorInputSchema) ]),
}).strict();

export const InviteCreateManyAuthorInputEnvelopeSchema: z.ZodType<Prisma.InviteCreateManyAuthorInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => InviteCreateManyAuthorInputSchema),z.lazy(() => InviteCreateManyAuthorInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const MemberCreateWithoutUserInputSchema: z.ZodType<Prisma.MemberCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  role: z.lazy(() => RoleSchema).optional(),
  specialty: z.string().optional().nullable(),
  organization: z.lazy(() => OrganizationCreateNestedOneWithoutMembersInputSchema),
  appointments: z.lazy(() => AppointmentCreateNestedManyWithoutMemberInputSchema).optional()
}).strict();

export const MemberUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.MemberUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  role: z.lazy(() => RoleSchema).optional(),
  specialty: z.string().optional().nullable(),
  organizationId: z.string(),
  appointments: z.lazy(() => AppointmentUncheckedCreateNestedManyWithoutMemberInputSchema).optional()
}).strict();

export const MemberCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.MemberCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => MemberWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MemberCreateWithoutUserInputSchema),z.lazy(() => MemberUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const MemberCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.MemberCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => MemberCreateManyUserInputSchema),z.lazy(() => MemberCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const OrganizationCreateWithoutOwnerInputSchema: z.ZodType<Prisma.OrganizationCreateWithoutOwnerInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  slug: z.string(),
  domain: z.string().optional().nullable(),
  shouldAttachUsersByDomain: z.boolean().optional(),
  avatarUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  invites: z.lazy(() => InviteCreateNestedManyWithoutOrganizationInputSchema).optional(),
  members: z.lazy(() => MemberCreateNestedManyWithoutOrganizationInputSchema).optional(),
  patients: z.lazy(() => PatientCreateNestedManyWithoutOrganizationInputSchema).optional(),
  financialTransactions: z.lazy(() => FinancialTransactionCreateNestedManyWithoutOrganizationInputSchema).optional(),
  customerSatisfactions: z.lazy(() => CustomerSatisfactionCreateNestedManyWithoutOrganizationInputSchema).optional(),
  AnamnesisTemplate: z.lazy(() => AnamnesisTemplateCreateNestedManyWithoutOrganizationInputSchema).optional()
}).strict();

export const OrganizationUncheckedCreateWithoutOwnerInputSchema: z.ZodType<Prisma.OrganizationUncheckedCreateWithoutOwnerInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  slug: z.string(),
  domain: z.string().optional().nullable(),
  shouldAttachUsersByDomain: z.boolean().optional(),
  avatarUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  invites: z.lazy(() => InviteUncheckedCreateNestedManyWithoutOrganizationInputSchema).optional(),
  members: z.lazy(() => MemberUncheckedCreateNestedManyWithoutOrganizationInputSchema).optional(),
  patients: z.lazy(() => PatientUncheckedCreateNestedManyWithoutOrganizationInputSchema).optional(),
  financialTransactions: z.lazy(() => FinancialTransactionUncheckedCreateNestedManyWithoutOrganizationInputSchema).optional(),
  customerSatisfactions: z.lazy(() => CustomerSatisfactionUncheckedCreateNestedManyWithoutOrganizationInputSchema).optional(),
  AnamnesisTemplate: z.lazy(() => AnamnesisTemplateUncheckedCreateNestedManyWithoutOrganizationInputSchema).optional()
}).strict();

export const OrganizationCreateOrConnectWithoutOwnerInputSchema: z.ZodType<Prisma.OrganizationCreateOrConnectWithoutOwnerInput> = z.object({
  where: z.lazy(() => OrganizationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => OrganizationCreateWithoutOwnerInputSchema),z.lazy(() => OrganizationUncheckedCreateWithoutOwnerInputSchema) ]),
}).strict();

export const OrganizationCreateManyOwnerInputEnvelopeSchema: z.ZodType<Prisma.OrganizationCreateManyOwnerInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => OrganizationCreateManyOwnerInputSchema),z.lazy(() => OrganizationCreateManyOwnerInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const TokenUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.TokenUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => TokenWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => TokenUpdateWithoutUserInputSchema),z.lazy(() => TokenUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => TokenCreateWithoutUserInputSchema),z.lazy(() => TokenUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const TokenUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.TokenUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => TokenWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => TokenUpdateWithoutUserInputSchema),z.lazy(() => TokenUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const TokenUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.TokenUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => TokenScalarWhereInputSchema),
  data: z.union([ z.lazy(() => TokenUpdateManyMutationInputSchema),z.lazy(() => TokenUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const TokenScalarWhereInputSchema: z.ZodType<Prisma.TokenScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TokenScalarWhereInputSchema),z.lazy(() => TokenScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TokenScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TokenScalarWhereInputSchema),z.lazy(() => TokenScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumTokenTypeFilterSchema),z.lazy(() => TokenTypeSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const AccountUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AccountUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AccountUpdateWithoutUserInputSchema),z.lazy(() => AccountUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const AccountUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AccountUpdateWithoutUserInputSchema),z.lazy(() => AccountUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const AccountUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => AccountScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AccountUpdateManyMutationInputSchema),z.lazy(() => AccountUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const AccountScalarWhereInputSchema: z.ZodType<Prisma.AccountScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  provider: z.union([ z.lazy(() => EnumAccountProviderFilterSchema),z.lazy(() => AccountProviderSchema) ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const InviteUpsertWithWhereUniqueWithoutAuthorInputSchema: z.ZodType<Prisma.InviteUpsertWithWhereUniqueWithoutAuthorInput> = z.object({
  where: z.lazy(() => InviteWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => InviteUpdateWithoutAuthorInputSchema),z.lazy(() => InviteUncheckedUpdateWithoutAuthorInputSchema) ]),
  create: z.union([ z.lazy(() => InviteCreateWithoutAuthorInputSchema),z.lazy(() => InviteUncheckedCreateWithoutAuthorInputSchema) ]),
}).strict();

export const InviteUpdateWithWhereUniqueWithoutAuthorInputSchema: z.ZodType<Prisma.InviteUpdateWithWhereUniqueWithoutAuthorInput> = z.object({
  where: z.lazy(() => InviteWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => InviteUpdateWithoutAuthorInputSchema),z.lazy(() => InviteUncheckedUpdateWithoutAuthorInputSchema) ]),
}).strict();

export const InviteUpdateManyWithWhereWithoutAuthorInputSchema: z.ZodType<Prisma.InviteUpdateManyWithWhereWithoutAuthorInput> = z.object({
  where: z.lazy(() => InviteScalarWhereInputSchema),
  data: z.union([ z.lazy(() => InviteUpdateManyMutationInputSchema),z.lazy(() => InviteUncheckedUpdateManyWithoutAuthorInputSchema) ]),
}).strict();

export const InviteScalarWhereInputSchema: z.ZodType<Prisma.InviteScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => InviteScalarWhereInputSchema),z.lazy(() => InviteScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => InviteScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => InviteScalarWhereInputSchema),z.lazy(() => InviteScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  role: z.union([ z.lazy(() => EnumRoleFilterSchema),z.lazy(() => RoleSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  authorId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  organizationId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const MemberUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.MemberUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => MemberWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => MemberUpdateWithoutUserInputSchema),z.lazy(() => MemberUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => MemberCreateWithoutUserInputSchema),z.lazy(() => MemberUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const MemberUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.MemberUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => MemberWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => MemberUpdateWithoutUserInputSchema),z.lazy(() => MemberUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const MemberUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.MemberUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => MemberScalarWhereInputSchema),
  data: z.union([ z.lazy(() => MemberUpdateManyMutationInputSchema),z.lazy(() => MemberUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const MemberScalarWhereInputSchema: z.ZodType<Prisma.MemberScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => MemberScalarWhereInputSchema),z.lazy(() => MemberScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MemberScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MemberScalarWhereInputSchema),z.lazy(() => MemberScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  role: z.union([ z.lazy(() => EnumRoleFilterSchema),z.lazy(() => RoleSchema) ]).optional(),
  specialty: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  organizationId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const OrganizationUpsertWithWhereUniqueWithoutOwnerInputSchema: z.ZodType<Prisma.OrganizationUpsertWithWhereUniqueWithoutOwnerInput> = z.object({
  where: z.lazy(() => OrganizationWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => OrganizationUpdateWithoutOwnerInputSchema),z.lazy(() => OrganizationUncheckedUpdateWithoutOwnerInputSchema) ]),
  create: z.union([ z.lazy(() => OrganizationCreateWithoutOwnerInputSchema),z.lazy(() => OrganizationUncheckedCreateWithoutOwnerInputSchema) ]),
}).strict();

export const OrganizationUpdateWithWhereUniqueWithoutOwnerInputSchema: z.ZodType<Prisma.OrganizationUpdateWithWhereUniqueWithoutOwnerInput> = z.object({
  where: z.lazy(() => OrganizationWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => OrganizationUpdateWithoutOwnerInputSchema),z.lazy(() => OrganizationUncheckedUpdateWithoutOwnerInputSchema) ]),
}).strict();

export const OrganizationUpdateManyWithWhereWithoutOwnerInputSchema: z.ZodType<Prisma.OrganizationUpdateManyWithWhereWithoutOwnerInput> = z.object({
  where: z.lazy(() => OrganizationScalarWhereInputSchema),
  data: z.union([ z.lazy(() => OrganizationUpdateManyMutationInputSchema),z.lazy(() => OrganizationUncheckedUpdateManyWithoutOwnerInputSchema) ]),
}).strict();

export const OrganizationScalarWhereInputSchema: z.ZodType<Prisma.OrganizationScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => OrganizationScalarWhereInputSchema),z.lazy(() => OrganizationScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => OrganizationScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => OrganizationScalarWhereInputSchema),z.lazy(() => OrganizationScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  slug: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  domain: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  shouldAttachUsersByDomain: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  avatarUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  ownerId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const UserCreateWithoutTokensInputSchema: z.ZodType<Prisma.UserCreateWithoutTokensInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string(),
  passwordHash: z.string().optional().nullable(),
  avatarUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  invites: z.lazy(() => InviteCreateNestedManyWithoutAuthorInputSchema).optional(),
  member_on: z.lazy(() => MemberCreateNestedManyWithoutUserInputSchema).optional(),
  owns_organizations: z.lazy(() => OrganizationCreateNestedManyWithoutOwnerInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutTokensInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutTokensInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string(),
  passwordHash: z.string().optional().nullable(),
  avatarUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  invites: z.lazy(() => InviteUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  member_on: z.lazy(() => MemberUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  owns_organizations: z.lazy(() => OrganizationUncheckedCreateNestedManyWithoutOwnerInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutTokensInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutTokensInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutTokensInputSchema),z.lazy(() => UserUncheckedCreateWithoutTokensInputSchema) ]),
}).strict();

export const UserUpsertWithoutTokensInputSchema: z.ZodType<Prisma.UserUpsertWithoutTokensInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutTokensInputSchema),z.lazy(() => UserUncheckedUpdateWithoutTokensInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutTokensInputSchema),z.lazy(() => UserUncheckedCreateWithoutTokensInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutTokensInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutTokensInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutTokensInputSchema),z.lazy(() => UserUncheckedUpdateWithoutTokensInputSchema) ]),
}).strict();

export const UserUpdateWithoutTokensInputSchema: z.ZodType<Prisma.UserUpdateWithoutTokensInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatarUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  invites: z.lazy(() => InviteUpdateManyWithoutAuthorNestedInputSchema).optional(),
  member_on: z.lazy(() => MemberUpdateManyWithoutUserNestedInputSchema).optional(),
  owns_organizations: z.lazy(() => OrganizationUpdateManyWithoutOwnerNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutTokensInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutTokensInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatarUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  invites: z.lazy(() => InviteUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  member_on: z.lazy(() => MemberUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  owns_organizations: z.lazy(() => OrganizationUncheckedUpdateManyWithoutOwnerNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateWithoutAccountsInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string(),
  passwordHash: z.string().optional().nullable(),
  avatarUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tokens: z.lazy(() => TokenCreateNestedManyWithoutUserInputSchema).optional(),
  invites: z.lazy(() => InviteCreateNestedManyWithoutAuthorInputSchema).optional(),
  member_on: z.lazy(() => MemberCreateNestedManyWithoutUserInputSchema).optional(),
  owns_organizations: z.lazy(() => OrganizationCreateNestedManyWithoutOwnerInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutAccountsInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string(),
  passwordHash: z.string().optional().nullable(),
  avatarUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tokens: z.lazy(() => TokenUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  invites: z.lazy(() => InviteUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  member_on: z.lazy(() => MemberUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  owns_organizations: z.lazy(() => OrganizationUncheckedCreateNestedManyWithoutOwnerInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutAccountsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]),
}).strict();

export const UserUpsertWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpsertWithoutAccountsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutAccountsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema) ]),
}).strict();

export const UserUpdateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpdateWithoutAccountsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatarUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tokens: z.lazy(() => TokenUpdateManyWithoutUserNestedInputSchema).optional(),
  invites: z.lazy(() => InviteUpdateManyWithoutAuthorNestedInputSchema).optional(),
  member_on: z.lazy(() => MemberUpdateManyWithoutUserNestedInputSchema).optional(),
  owns_organizations: z.lazy(() => OrganizationUpdateManyWithoutOwnerNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutAccountsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatarUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tokens: z.lazy(() => TokenUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  invites: z.lazy(() => InviteUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  member_on: z.lazy(() => MemberUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  owns_organizations: z.lazy(() => OrganizationUncheckedUpdateManyWithoutOwnerNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutInvitesInputSchema: z.ZodType<Prisma.UserCreateWithoutInvitesInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string(),
  passwordHash: z.string().optional().nullable(),
  avatarUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tokens: z.lazy(() => TokenCreateNestedManyWithoutUserInputSchema).optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  member_on: z.lazy(() => MemberCreateNestedManyWithoutUserInputSchema).optional(),
  owns_organizations: z.lazy(() => OrganizationCreateNestedManyWithoutOwnerInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutInvitesInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutInvitesInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string(),
  passwordHash: z.string().optional().nullable(),
  avatarUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tokens: z.lazy(() => TokenUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  member_on: z.lazy(() => MemberUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  owns_organizations: z.lazy(() => OrganizationUncheckedCreateNestedManyWithoutOwnerInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutInvitesInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutInvitesInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutInvitesInputSchema),z.lazy(() => UserUncheckedCreateWithoutInvitesInputSchema) ]),
}).strict();

export const OrganizationCreateWithoutInvitesInputSchema: z.ZodType<Prisma.OrganizationCreateWithoutInvitesInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  slug: z.string(),
  domain: z.string().optional().nullable(),
  shouldAttachUsersByDomain: z.boolean().optional(),
  avatarUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  owner: z.lazy(() => UserCreateNestedOneWithoutOwns_organizationsInputSchema),
  members: z.lazy(() => MemberCreateNestedManyWithoutOrganizationInputSchema).optional(),
  patients: z.lazy(() => PatientCreateNestedManyWithoutOrganizationInputSchema).optional(),
  financialTransactions: z.lazy(() => FinancialTransactionCreateNestedManyWithoutOrganizationInputSchema).optional(),
  customerSatisfactions: z.lazy(() => CustomerSatisfactionCreateNestedManyWithoutOrganizationInputSchema).optional(),
  AnamnesisTemplate: z.lazy(() => AnamnesisTemplateCreateNestedManyWithoutOrganizationInputSchema).optional()
}).strict();

export const OrganizationUncheckedCreateWithoutInvitesInputSchema: z.ZodType<Prisma.OrganizationUncheckedCreateWithoutInvitesInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  slug: z.string(),
  domain: z.string().optional().nullable(),
  shouldAttachUsersByDomain: z.boolean().optional(),
  avatarUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  ownerId: z.string(),
  members: z.lazy(() => MemberUncheckedCreateNestedManyWithoutOrganizationInputSchema).optional(),
  patients: z.lazy(() => PatientUncheckedCreateNestedManyWithoutOrganizationInputSchema).optional(),
  financialTransactions: z.lazy(() => FinancialTransactionUncheckedCreateNestedManyWithoutOrganizationInputSchema).optional(),
  customerSatisfactions: z.lazy(() => CustomerSatisfactionUncheckedCreateNestedManyWithoutOrganizationInputSchema).optional(),
  AnamnesisTemplate: z.lazy(() => AnamnesisTemplateUncheckedCreateNestedManyWithoutOrganizationInputSchema).optional()
}).strict();

export const OrganizationCreateOrConnectWithoutInvitesInputSchema: z.ZodType<Prisma.OrganizationCreateOrConnectWithoutInvitesInput> = z.object({
  where: z.lazy(() => OrganizationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => OrganizationCreateWithoutInvitesInputSchema),z.lazy(() => OrganizationUncheckedCreateWithoutInvitesInputSchema) ]),
}).strict();

export const UserUpsertWithoutInvitesInputSchema: z.ZodType<Prisma.UserUpsertWithoutInvitesInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutInvitesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutInvitesInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutInvitesInputSchema),z.lazy(() => UserUncheckedCreateWithoutInvitesInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutInvitesInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutInvitesInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutInvitesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutInvitesInputSchema) ]),
}).strict();

export const UserUpdateWithoutInvitesInputSchema: z.ZodType<Prisma.UserUpdateWithoutInvitesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatarUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tokens: z.lazy(() => TokenUpdateManyWithoutUserNestedInputSchema).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  member_on: z.lazy(() => MemberUpdateManyWithoutUserNestedInputSchema).optional(),
  owns_organizations: z.lazy(() => OrganizationUpdateManyWithoutOwnerNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutInvitesInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutInvitesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatarUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tokens: z.lazy(() => TokenUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  member_on: z.lazy(() => MemberUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  owns_organizations: z.lazy(() => OrganizationUncheckedUpdateManyWithoutOwnerNestedInputSchema).optional()
}).strict();

export const OrganizationUpsertWithoutInvitesInputSchema: z.ZodType<Prisma.OrganizationUpsertWithoutInvitesInput> = z.object({
  update: z.union([ z.lazy(() => OrganizationUpdateWithoutInvitesInputSchema),z.lazy(() => OrganizationUncheckedUpdateWithoutInvitesInputSchema) ]),
  create: z.union([ z.lazy(() => OrganizationCreateWithoutInvitesInputSchema),z.lazy(() => OrganizationUncheckedCreateWithoutInvitesInputSchema) ]),
  where: z.lazy(() => OrganizationWhereInputSchema).optional()
}).strict();

export const OrganizationUpdateToOneWithWhereWithoutInvitesInputSchema: z.ZodType<Prisma.OrganizationUpdateToOneWithWhereWithoutInvitesInput> = z.object({
  where: z.lazy(() => OrganizationWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => OrganizationUpdateWithoutInvitesInputSchema),z.lazy(() => OrganizationUncheckedUpdateWithoutInvitesInputSchema) ]),
}).strict();

export const OrganizationUpdateWithoutInvitesInputSchema: z.ZodType<Prisma.OrganizationUpdateWithoutInvitesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  domain: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  shouldAttachUsersByDomain: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  avatarUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  owner: z.lazy(() => UserUpdateOneRequiredWithoutOwns_organizationsNestedInputSchema).optional(),
  members: z.lazy(() => MemberUpdateManyWithoutOrganizationNestedInputSchema).optional(),
  patients: z.lazy(() => PatientUpdateManyWithoutOrganizationNestedInputSchema).optional(),
  financialTransactions: z.lazy(() => FinancialTransactionUpdateManyWithoutOrganizationNestedInputSchema).optional(),
  customerSatisfactions: z.lazy(() => CustomerSatisfactionUpdateManyWithoutOrganizationNestedInputSchema).optional(),
  AnamnesisTemplate: z.lazy(() => AnamnesisTemplateUpdateManyWithoutOrganizationNestedInputSchema).optional()
}).strict();

export const OrganizationUncheckedUpdateWithoutInvitesInputSchema: z.ZodType<Prisma.OrganizationUncheckedUpdateWithoutInvitesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  domain: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  shouldAttachUsersByDomain: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  avatarUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ownerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  members: z.lazy(() => MemberUncheckedUpdateManyWithoutOrganizationNestedInputSchema).optional(),
  patients: z.lazy(() => PatientUncheckedUpdateManyWithoutOrganizationNestedInputSchema).optional(),
  financialTransactions: z.lazy(() => FinancialTransactionUncheckedUpdateManyWithoutOrganizationNestedInputSchema).optional(),
  customerSatisfactions: z.lazy(() => CustomerSatisfactionUncheckedUpdateManyWithoutOrganizationNestedInputSchema).optional(),
  AnamnesisTemplate: z.lazy(() => AnamnesisTemplateUncheckedUpdateManyWithoutOrganizationNestedInputSchema).optional()
}).strict();

export const OrganizationCreateWithoutMembersInputSchema: z.ZodType<Prisma.OrganizationCreateWithoutMembersInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  slug: z.string(),
  domain: z.string().optional().nullable(),
  shouldAttachUsersByDomain: z.boolean().optional(),
  avatarUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  owner: z.lazy(() => UserCreateNestedOneWithoutOwns_organizationsInputSchema),
  invites: z.lazy(() => InviteCreateNestedManyWithoutOrganizationInputSchema).optional(),
  patients: z.lazy(() => PatientCreateNestedManyWithoutOrganizationInputSchema).optional(),
  financialTransactions: z.lazy(() => FinancialTransactionCreateNestedManyWithoutOrganizationInputSchema).optional(),
  customerSatisfactions: z.lazy(() => CustomerSatisfactionCreateNestedManyWithoutOrganizationInputSchema).optional(),
  AnamnesisTemplate: z.lazy(() => AnamnesisTemplateCreateNestedManyWithoutOrganizationInputSchema).optional()
}).strict();

export const OrganizationUncheckedCreateWithoutMembersInputSchema: z.ZodType<Prisma.OrganizationUncheckedCreateWithoutMembersInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  slug: z.string(),
  domain: z.string().optional().nullable(),
  shouldAttachUsersByDomain: z.boolean().optional(),
  avatarUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  ownerId: z.string(),
  invites: z.lazy(() => InviteUncheckedCreateNestedManyWithoutOrganizationInputSchema).optional(),
  patients: z.lazy(() => PatientUncheckedCreateNestedManyWithoutOrganizationInputSchema).optional(),
  financialTransactions: z.lazy(() => FinancialTransactionUncheckedCreateNestedManyWithoutOrganizationInputSchema).optional(),
  customerSatisfactions: z.lazy(() => CustomerSatisfactionUncheckedCreateNestedManyWithoutOrganizationInputSchema).optional(),
  AnamnesisTemplate: z.lazy(() => AnamnesisTemplateUncheckedCreateNestedManyWithoutOrganizationInputSchema).optional()
}).strict();

export const OrganizationCreateOrConnectWithoutMembersInputSchema: z.ZodType<Prisma.OrganizationCreateOrConnectWithoutMembersInput> = z.object({
  where: z.lazy(() => OrganizationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => OrganizationCreateWithoutMembersInputSchema),z.lazy(() => OrganizationUncheckedCreateWithoutMembersInputSchema) ]),
}).strict();

export const UserCreateWithoutMember_onInputSchema: z.ZodType<Prisma.UserCreateWithoutMember_onInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string(),
  passwordHash: z.string().optional().nullable(),
  avatarUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tokens: z.lazy(() => TokenCreateNestedManyWithoutUserInputSchema).optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  invites: z.lazy(() => InviteCreateNestedManyWithoutAuthorInputSchema).optional(),
  owns_organizations: z.lazy(() => OrganizationCreateNestedManyWithoutOwnerInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutMember_onInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutMember_onInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string(),
  passwordHash: z.string().optional().nullable(),
  avatarUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tokens: z.lazy(() => TokenUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  invites: z.lazy(() => InviteUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  owns_organizations: z.lazy(() => OrganizationUncheckedCreateNestedManyWithoutOwnerInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutMember_onInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutMember_onInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutMember_onInputSchema),z.lazy(() => UserUncheckedCreateWithoutMember_onInputSchema) ]),
}).strict();

export const AppointmentCreateWithoutMemberInputSchema: z.ZodType<Prisma.AppointmentCreateWithoutMemberInput> = z.object({
  id: z.string().optional(),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  description: z.string().optional().nullable(),
  status: z.lazy(() => AppointmentStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  patient: z.lazy(() => PatientCreateNestedOneWithoutAppointmentsInputSchema)
}).strict();

export const AppointmentUncheckedCreateWithoutMemberInputSchema: z.ZodType<Prisma.AppointmentUncheckedCreateWithoutMemberInput> = z.object({
  id: z.string().optional(),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  description: z.string().optional().nullable(),
  status: z.lazy(() => AppointmentStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  patientId: z.string()
}).strict();

export const AppointmentCreateOrConnectWithoutMemberInputSchema: z.ZodType<Prisma.AppointmentCreateOrConnectWithoutMemberInput> = z.object({
  where: z.lazy(() => AppointmentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AppointmentCreateWithoutMemberInputSchema),z.lazy(() => AppointmentUncheckedCreateWithoutMemberInputSchema) ]),
}).strict();

export const AppointmentCreateManyMemberInputEnvelopeSchema: z.ZodType<Prisma.AppointmentCreateManyMemberInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => AppointmentCreateManyMemberInputSchema),z.lazy(() => AppointmentCreateManyMemberInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const OrganizationUpsertWithoutMembersInputSchema: z.ZodType<Prisma.OrganizationUpsertWithoutMembersInput> = z.object({
  update: z.union([ z.lazy(() => OrganizationUpdateWithoutMembersInputSchema),z.lazy(() => OrganizationUncheckedUpdateWithoutMembersInputSchema) ]),
  create: z.union([ z.lazy(() => OrganizationCreateWithoutMembersInputSchema),z.lazy(() => OrganizationUncheckedCreateWithoutMembersInputSchema) ]),
  where: z.lazy(() => OrganizationWhereInputSchema).optional()
}).strict();

export const OrganizationUpdateToOneWithWhereWithoutMembersInputSchema: z.ZodType<Prisma.OrganizationUpdateToOneWithWhereWithoutMembersInput> = z.object({
  where: z.lazy(() => OrganizationWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => OrganizationUpdateWithoutMembersInputSchema),z.lazy(() => OrganizationUncheckedUpdateWithoutMembersInputSchema) ]),
}).strict();

export const OrganizationUpdateWithoutMembersInputSchema: z.ZodType<Prisma.OrganizationUpdateWithoutMembersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  domain: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  shouldAttachUsersByDomain: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  avatarUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  owner: z.lazy(() => UserUpdateOneRequiredWithoutOwns_organizationsNestedInputSchema).optional(),
  invites: z.lazy(() => InviteUpdateManyWithoutOrganizationNestedInputSchema).optional(),
  patients: z.lazy(() => PatientUpdateManyWithoutOrganizationNestedInputSchema).optional(),
  financialTransactions: z.lazy(() => FinancialTransactionUpdateManyWithoutOrganizationNestedInputSchema).optional(),
  customerSatisfactions: z.lazy(() => CustomerSatisfactionUpdateManyWithoutOrganizationNestedInputSchema).optional(),
  AnamnesisTemplate: z.lazy(() => AnamnesisTemplateUpdateManyWithoutOrganizationNestedInputSchema).optional()
}).strict();

export const OrganizationUncheckedUpdateWithoutMembersInputSchema: z.ZodType<Prisma.OrganizationUncheckedUpdateWithoutMembersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  domain: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  shouldAttachUsersByDomain: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  avatarUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ownerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  invites: z.lazy(() => InviteUncheckedUpdateManyWithoutOrganizationNestedInputSchema).optional(),
  patients: z.lazy(() => PatientUncheckedUpdateManyWithoutOrganizationNestedInputSchema).optional(),
  financialTransactions: z.lazy(() => FinancialTransactionUncheckedUpdateManyWithoutOrganizationNestedInputSchema).optional(),
  customerSatisfactions: z.lazy(() => CustomerSatisfactionUncheckedUpdateManyWithoutOrganizationNestedInputSchema).optional(),
  AnamnesisTemplate: z.lazy(() => AnamnesisTemplateUncheckedUpdateManyWithoutOrganizationNestedInputSchema).optional()
}).strict();

export const UserUpsertWithoutMember_onInputSchema: z.ZodType<Prisma.UserUpsertWithoutMember_onInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutMember_onInputSchema),z.lazy(() => UserUncheckedUpdateWithoutMember_onInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutMember_onInputSchema),z.lazy(() => UserUncheckedCreateWithoutMember_onInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutMember_onInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutMember_onInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutMember_onInputSchema),z.lazy(() => UserUncheckedUpdateWithoutMember_onInputSchema) ]),
}).strict();

export const UserUpdateWithoutMember_onInputSchema: z.ZodType<Prisma.UserUpdateWithoutMember_onInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatarUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tokens: z.lazy(() => TokenUpdateManyWithoutUserNestedInputSchema).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  invites: z.lazy(() => InviteUpdateManyWithoutAuthorNestedInputSchema).optional(),
  owns_organizations: z.lazy(() => OrganizationUpdateManyWithoutOwnerNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutMember_onInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutMember_onInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatarUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tokens: z.lazy(() => TokenUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  invites: z.lazy(() => InviteUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  owns_organizations: z.lazy(() => OrganizationUncheckedUpdateManyWithoutOwnerNestedInputSchema).optional()
}).strict();

export const AppointmentUpsertWithWhereUniqueWithoutMemberInputSchema: z.ZodType<Prisma.AppointmentUpsertWithWhereUniqueWithoutMemberInput> = z.object({
  where: z.lazy(() => AppointmentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AppointmentUpdateWithoutMemberInputSchema),z.lazy(() => AppointmentUncheckedUpdateWithoutMemberInputSchema) ]),
  create: z.union([ z.lazy(() => AppointmentCreateWithoutMemberInputSchema),z.lazy(() => AppointmentUncheckedCreateWithoutMemberInputSchema) ]),
}).strict();

export const AppointmentUpdateWithWhereUniqueWithoutMemberInputSchema: z.ZodType<Prisma.AppointmentUpdateWithWhereUniqueWithoutMemberInput> = z.object({
  where: z.lazy(() => AppointmentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AppointmentUpdateWithoutMemberInputSchema),z.lazy(() => AppointmentUncheckedUpdateWithoutMemberInputSchema) ]),
}).strict();

export const AppointmentUpdateManyWithWhereWithoutMemberInputSchema: z.ZodType<Prisma.AppointmentUpdateManyWithWhereWithoutMemberInput> = z.object({
  where: z.lazy(() => AppointmentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AppointmentUpdateManyMutationInputSchema),z.lazy(() => AppointmentUncheckedUpdateManyWithoutMemberInputSchema) ]),
}).strict();

export const AppointmentScalarWhereInputSchema: z.ZodType<Prisma.AppointmentScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AppointmentScalarWhereInputSchema),z.lazy(() => AppointmentScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AppointmentScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AppointmentScalarWhereInputSchema),z.lazy(() => AppointmentScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  startTime: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  endTime: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumAppointmentStatusFilterSchema),z.lazy(() => AppointmentStatusSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  patientId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  memberId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const OrganizationCreateWithoutPatientsInputSchema: z.ZodType<Prisma.OrganizationCreateWithoutPatientsInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  slug: z.string(),
  domain: z.string().optional().nullable(),
  shouldAttachUsersByDomain: z.boolean().optional(),
  avatarUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  owner: z.lazy(() => UserCreateNestedOneWithoutOwns_organizationsInputSchema),
  invites: z.lazy(() => InviteCreateNestedManyWithoutOrganizationInputSchema).optional(),
  members: z.lazy(() => MemberCreateNestedManyWithoutOrganizationInputSchema).optional(),
  financialTransactions: z.lazy(() => FinancialTransactionCreateNestedManyWithoutOrganizationInputSchema).optional(),
  customerSatisfactions: z.lazy(() => CustomerSatisfactionCreateNestedManyWithoutOrganizationInputSchema).optional(),
  AnamnesisTemplate: z.lazy(() => AnamnesisTemplateCreateNestedManyWithoutOrganizationInputSchema).optional()
}).strict();

export const OrganizationUncheckedCreateWithoutPatientsInputSchema: z.ZodType<Prisma.OrganizationUncheckedCreateWithoutPatientsInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  slug: z.string(),
  domain: z.string().optional().nullable(),
  shouldAttachUsersByDomain: z.boolean().optional(),
  avatarUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  ownerId: z.string(),
  invites: z.lazy(() => InviteUncheckedCreateNestedManyWithoutOrganizationInputSchema).optional(),
  members: z.lazy(() => MemberUncheckedCreateNestedManyWithoutOrganizationInputSchema).optional(),
  financialTransactions: z.lazy(() => FinancialTransactionUncheckedCreateNestedManyWithoutOrganizationInputSchema).optional(),
  customerSatisfactions: z.lazy(() => CustomerSatisfactionUncheckedCreateNestedManyWithoutOrganizationInputSchema).optional(),
  AnamnesisTemplate: z.lazy(() => AnamnesisTemplateUncheckedCreateNestedManyWithoutOrganizationInputSchema).optional()
}).strict();

export const OrganizationCreateOrConnectWithoutPatientsInputSchema: z.ZodType<Prisma.OrganizationCreateOrConnectWithoutPatientsInput> = z.object({
  where: z.lazy(() => OrganizationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => OrganizationCreateWithoutPatientsInputSchema),z.lazy(() => OrganizationUncheckedCreateWithoutPatientsInputSchema) ]),
}).strict();

export const MedicalRecordCreateWithoutPatientInputSchema: z.ZodType<Prisma.MedicalRecordCreateWithoutPatientInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  anamneses: z.lazy(() => AnamnesisCreateNestedManyWithoutMedicalRecordInputSchema).optional()
}).strict();

export const MedicalRecordUncheckedCreateWithoutPatientInputSchema: z.ZodType<Prisma.MedicalRecordUncheckedCreateWithoutPatientInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  anamneses: z.lazy(() => AnamnesisUncheckedCreateNestedManyWithoutMedicalRecordInputSchema).optional()
}).strict();

export const MedicalRecordCreateOrConnectWithoutPatientInputSchema: z.ZodType<Prisma.MedicalRecordCreateOrConnectWithoutPatientInput> = z.object({
  where: z.lazy(() => MedicalRecordWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MedicalRecordCreateWithoutPatientInputSchema),z.lazy(() => MedicalRecordUncheckedCreateWithoutPatientInputSchema) ]),
}).strict();

export const AppointmentCreateWithoutPatientInputSchema: z.ZodType<Prisma.AppointmentCreateWithoutPatientInput> = z.object({
  id: z.string().optional(),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  description: z.string().optional().nullable(),
  status: z.lazy(() => AppointmentStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  member: z.lazy(() => MemberCreateNestedOneWithoutAppointmentsInputSchema)
}).strict();

export const AppointmentUncheckedCreateWithoutPatientInputSchema: z.ZodType<Prisma.AppointmentUncheckedCreateWithoutPatientInput> = z.object({
  id: z.string().optional(),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  description: z.string().optional().nullable(),
  status: z.lazy(() => AppointmentStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  memberId: z.string()
}).strict();

export const AppointmentCreateOrConnectWithoutPatientInputSchema: z.ZodType<Prisma.AppointmentCreateOrConnectWithoutPatientInput> = z.object({
  where: z.lazy(() => AppointmentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AppointmentCreateWithoutPatientInputSchema),z.lazy(() => AppointmentUncheckedCreateWithoutPatientInputSchema) ]),
}).strict();

export const AppointmentCreateManyPatientInputEnvelopeSchema: z.ZodType<Prisma.AppointmentCreateManyPatientInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => AppointmentCreateManyPatientInputSchema),z.lazy(() => AppointmentCreateManyPatientInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const FinancialTransactionCreateWithoutPatientInputSchema: z.ZodType<Prisma.FinancialTransactionCreateWithoutPatientInput> = z.object({
  id: z.string().optional(),
  description: z.string(),
  amount: z.string(),
  type: z.lazy(() => TransactionTypeSchema),
  paymentMethod: z.lazy(() => PaymentMethodSchema),
  date: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  organization: z.lazy(() => OrganizationCreateNestedOneWithoutFinancialTransactionsInputSchema)
}).strict();

export const FinancialTransactionUncheckedCreateWithoutPatientInputSchema: z.ZodType<Prisma.FinancialTransactionUncheckedCreateWithoutPatientInput> = z.object({
  id: z.string().optional(),
  description: z.string(),
  amount: z.string(),
  type: z.lazy(() => TransactionTypeSchema),
  paymentMethod: z.lazy(() => PaymentMethodSchema),
  date: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  organizationId: z.string()
}).strict();

export const FinancialTransactionCreateOrConnectWithoutPatientInputSchema: z.ZodType<Prisma.FinancialTransactionCreateOrConnectWithoutPatientInput> = z.object({
  where: z.lazy(() => FinancialTransactionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FinancialTransactionCreateWithoutPatientInputSchema),z.lazy(() => FinancialTransactionUncheckedCreateWithoutPatientInputSchema) ]),
}).strict();

export const FinancialTransactionCreateManyPatientInputEnvelopeSchema: z.ZodType<Prisma.FinancialTransactionCreateManyPatientInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => FinancialTransactionCreateManyPatientInputSchema),z.lazy(() => FinancialTransactionCreateManyPatientInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const CustomerSatisfactionCreateWithoutPatientInputSchema: z.ZodType<Prisma.CustomerSatisfactionCreateWithoutPatientInput> = z.object({
  id: z.string().optional(),
  rating: z.number().int(),
  comment: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  organization: z.lazy(() => OrganizationCreateNestedOneWithoutCustomerSatisfactionsInputSchema)
}).strict();

export const CustomerSatisfactionUncheckedCreateWithoutPatientInputSchema: z.ZodType<Prisma.CustomerSatisfactionUncheckedCreateWithoutPatientInput> = z.object({
  id: z.string().optional(),
  rating: z.number().int(),
  comment: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  organizationId: z.string()
}).strict();

export const CustomerSatisfactionCreateOrConnectWithoutPatientInputSchema: z.ZodType<Prisma.CustomerSatisfactionCreateOrConnectWithoutPatientInput> = z.object({
  where: z.lazy(() => CustomerSatisfactionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CustomerSatisfactionCreateWithoutPatientInputSchema),z.lazy(() => CustomerSatisfactionUncheckedCreateWithoutPatientInputSchema) ]),
}).strict();

export const CustomerSatisfactionCreateManyPatientInputEnvelopeSchema: z.ZodType<Prisma.CustomerSatisfactionCreateManyPatientInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => CustomerSatisfactionCreateManyPatientInputSchema),z.lazy(() => CustomerSatisfactionCreateManyPatientInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const PatientAnamnesisCreateWithoutPatientInputSchema: z.ZodType<Prisma.PatientAnamnesisCreateWithoutPatientInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  template: z.lazy(() => AnamnesisTemplateCreateNestedOneWithoutPatientAnamnesesInputSchema),
  answers: z.lazy(() => AnamnesisAnswerCreateNestedManyWithoutPatientAnamnesisInputSchema).optional()
}).strict();

export const PatientAnamnesisUncheckedCreateWithoutPatientInputSchema: z.ZodType<Prisma.PatientAnamnesisUncheckedCreateWithoutPatientInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  templateId: z.string(),
  answers: z.lazy(() => AnamnesisAnswerUncheckedCreateNestedManyWithoutPatientAnamnesisInputSchema).optional()
}).strict();

export const PatientAnamnesisCreateOrConnectWithoutPatientInputSchema: z.ZodType<Prisma.PatientAnamnesisCreateOrConnectWithoutPatientInput> = z.object({
  where: z.lazy(() => PatientAnamnesisWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PatientAnamnesisCreateWithoutPatientInputSchema),z.lazy(() => PatientAnamnesisUncheckedCreateWithoutPatientInputSchema) ]),
}).strict();

export const PatientAnamnesisCreateManyPatientInputEnvelopeSchema: z.ZodType<Prisma.PatientAnamnesisCreateManyPatientInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => PatientAnamnesisCreateManyPatientInputSchema),z.lazy(() => PatientAnamnesisCreateManyPatientInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const OrganizationUpsertWithoutPatientsInputSchema: z.ZodType<Prisma.OrganizationUpsertWithoutPatientsInput> = z.object({
  update: z.union([ z.lazy(() => OrganizationUpdateWithoutPatientsInputSchema),z.lazy(() => OrganizationUncheckedUpdateWithoutPatientsInputSchema) ]),
  create: z.union([ z.lazy(() => OrganizationCreateWithoutPatientsInputSchema),z.lazy(() => OrganizationUncheckedCreateWithoutPatientsInputSchema) ]),
  where: z.lazy(() => OrganizationWhereInputSchema).optional()
}).strict();

export const OrganizationUpdateToOneWithWhereWithoutPatientsInputSchema: z.ZodType<Prisma.OrganizationUpdateToOneWithWhereWithoutPatientsInput> = z.object({
  where: z.lazy(() => OrganizationWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => OrganizationUpdateWithoutPatientsInputSchema),z.lazy(() => OrganizationUncheckedUpdateWithoutPatientsInputSchema) ]),
}).strict();

export const OrganizationUpdateWithoutPatientsInputSchema: z.ZodType<Prisma.OrganizationUpdateWithoutPatientsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  domain: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  shouldAttachUsersByDomain: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  avatarUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  owner: z.lazy(() => UserUpdateOneRequiredWithoutOwns_organizationsNestedInputSchema).optional(),
  invites: z.lazy(() => InviteUpdateManyWithoutOrganizationNestedInputSchema).optional(),
  members: z.lazy(() => MemberUpdateManyWithoutOrganizationNestedInputSchema).optional(),
  financialTransactions: z.lazy(() => FinancialTransactionUpdateManyWithoutOrganizationNestedInputSchema).optional(),
  customerSatisfactions: z.lazy(() => CustomerSatisfactionUpdateManyWithoutOrganizationNestedInputSchema).optional(),
  AnamnesisTemplate: z.lazy(() => AnamnesisTemplateUpdateManyWithoutOrganizationNestedInputSchema).optional()
}).strict();

export const OrganizationUncheckedUpdateWithoutPatientsInputSchema: z.ZodType<Prisma.OrganizationUncheckedUpdateWithoutPatientsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  domain: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  shouldAttachUsersByDomain: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  avatarUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ownerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  invites: z.lazy(() => InviteUncheckedUpdateManyWithoutOrganizationNestedInputSchema).optional(),
  members: z.lazy(() => MemberUncheckedUpdateManyWithoutOrganizationNestedInputSchema).optional(),
  financialTransactions: z.lazy(() => FinancialTransactionUncheckedUpdateManyWithoutOrganizationNestedInputSchema).optional(),
  customerSatisfactions: z.lazy(() => CustomerSatisfactionUncheckedUpdateManyWithoutOrganizationNestedInputSchema).optional(),
  AnamnesisTemplate: z.lazy(() => AnamnesisTemplateUncheckedUpdateManyWithoutOrganizationNestedInputSchema).optional()
}).strict();

export const MedicalRecordUpsertWithoutPatientInputSchema: z.ZodType<Prisma.MedicalRecordUpsertWithoutPatientInput> = z.object({
  update: z.union([ z.lazy(() => MedicalRecordUpdateWithoutPatientInputSchema),z.lazy(() => MedicalRecordUncheckedUpdateWithoutPatientInputSchema) ]),
  create: z.union([ z.lazy(() => MedicalRecordCreateWithoutPatientInputSchema),z.lazy(() => MedicalRecordUncheckedCreateWithoutPatientInputSchema) ]),
  where: z.lazy(() => MedicalRecordWhereInputSchema).optional()
}).strict();

export const MedicalRecordUpdateToOneWithWhereWithoutPatientInputSchema: z.ZodType<Prisma.MedicalRecordUpdateToOneWithWhereWithoutPatientInput> = z.object({
  where: z.lazy(() => MedicalRecordWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => MedicalRecordUpdateWithoutPatientInputSchema),z.lazy(() => MedicalRecordUncheckedUpdateWithoutPatientInputSchema) ]),
}).strict();

export const MedicalRecordUpdateWithoutPatientInputSchema: z.ZodType<Prisma.MedicalRecordUpdateWithoutPatientInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  anamneses: z.lazy(() => AnamnesisUpdateManyWithoutMedicalRecordNestedInputSchema).optional()
}).strict();

export const MedicalRecordUncheckedUpdateWithoutPatientInputSchema: z.ZodType<Prisma.MedicalRecordUncheckedUpdateWithoutPatientInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  anamneses: z.lazy(() => AnamnesisUncheckedUpdateManyWithoutMedicalRecordNestedInputSchema).optional()
}).strict();

export const AppointmentUpsertWithWhereUniqueWithoutPatientInputSchema: z.ZodType<Prisma.AppointmentUpsertWithWhereUniqueWithoutPatientInput> = z.object({
  where: z.lazy(() => AppointmentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AppointmentUpdateWithoutPatientInputSchema),z.lazy(() => AppointmentUncheckedUpdateWithoutPatientInputSchema) ]),
  create: z.union([ z.lazy(() => AppointmentCreateWithoutPatientInputSchema),z.lazy(() => AppointmentUncheckedCreateWithoutPatientInputSchema) ]),
}).strict();

export const AppointmentUpdateWithWhereUniqueWithoutPatientInputSchema: z.ZodType<Prisma.AppointmentUpdateWithWhereUniqueWithoutPatientInput> = z.object({
  where: z.lazy(() => AppointmentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AppointmentUpdateWithoutPatientInputSchema),z.lazy(() => AppointmentUncheckedUpdateWithoutPatientInputSchema) ]),
}).strict();

export const AppointmentUpdateManyWithWhereWithoutPatientInputSchema: z.ZodType<Prisma.AppointmentUpdateManyWithWhereWithoutPatientInput> = z.object({
  where: z.lazy(() => AppointmentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AppointmentUpdateManyMutationInputSchema),z.lazy(() => AppointmentUncheckedUpdateManyWithoutPatientInputSchema) ]),
}).strict();

export const FinancialTransactionUpsertWithWhereUniqueWithoutPatientInputSchema: z.ZodType<Prisma.FinancialTransactionUpsertWithWhereUniqueWithoutPatientInput> = z.object({
  where: z.lazy(() => FinancialTransactionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => FinancialTransactionUpdateWithoutPatientInputSchema),z.lazy(() => FinancialTransactionUncheckedUpdateWithoutPatientInputSchema) ]),
  create: z.union([ z.lazy(() => FinancialTransactionCreateWithoutPatientInputSchema),z.lazy(() => FinancialTransactionUncheckedCreateWithoutPatientInputSchema) ]),
}).strict();

export const FinancialTransactionUpdateWithWhereUniqueWithoutPatientInputSchema: z.ZodType<Prisma.FinancialTransactionUpdateWithWhereUniqueWithoutPatientInput> = z.object({
  where: z.lazy(() => FinancialTransactionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => FinancialTransactionUpdateWithoutPatientInputSchema),z.lazy(() => FinancialTransactionUncheckedUpdateWithoutPatientInputSchema) ]),
}).strict();

export const FinancialTransactionUpdateManyWithWhereWithoutPatientInputSchema: z.ZodType<Prisma.FinancialTransactionUpdateManyWithWhereWithoutPatientInput> = z.object({
  where: z.lazy(() => FinancialTransactionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => FinancialTransactionUpdateManyMutationInputSchema),z.lazy(() => FinancialTransactionUncheckedUpdateManyWithoutPatientInputSchema) ]),
}).strict();

export const FinancialTransactionScalarWhereInputSchema: z.ZodType<Prisma.FinancialTransactionScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => FinancialTransactionScalarWhereInputSchema),z.lazy(() => FinancialTransactionScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FinancialTransactionScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FinancialTransactionScalarWhereInputSchema),z.lazy(() => FinancialTransactionScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  amount: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumTransactionTypeFilterSchema),z.lazy(() => TransactionTypeSchema) ]).optional(),
  paymentMethod: z.union([ z.lazy(() => EnumPaymentMethodFilterSchema),z.lazy(() => PaymentMethodSchema) ]).optional(),
  date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  organizationId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  patientId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const CustomerSatisfactionUpsertWithWhereUniqueWithoutPatientInputSchema: z.ZodType<Prisma.CustomerSatisfactionUpsertWithWhereUniqueWithoutPatientInput> = z.object({
  where: z.lazy(() => CustomerSatisfactionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CustomerSatisfactionUpdateWithoutPatientInputSchema),z.lazy(() => CustomerSatisfactionUncheckedUpdateWithoutPatientInputSchema) ]),
  create: z.union([ z.lazy(() => CustomerSatisfactionCreateWithoutPatientInputSchema),z.lazy(() => CustomerSatisfactionUncheckedCreateWithoutPatientInputSchema) ]),
}).strict();

export const CustomerSatisfactionUpdateWithWhereUniqueWithoutPatientInputSchema: z.ZodType<Prisma.CustomerSatisfactionUpdateWithWhereUniqueWithoutPatientInput> = z.object({
  where: z.lazy(() => CustomerSatisfactionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CustomerSatisfactionUpdateWithoutPatientInputSchema),z.lazy(() => CustomerSatisfactionUncheckedUpdateWithoutPatientInputSchema) ]),
}).strict();

export const CustomerSatisfactionUpdateManyWithWhereWithoutPatientInputSchema: z.ZodType<Prisma.CustomerSatisfactionUpdateManyWithWhereWithoutPatientInput> = z.object({
  where: z.lazy(() => CustomerSatisfactionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CustomerSatisfactionUpdateManyMutationInputSchema),z.lazy(() => CustomerSatisfactionUncheckedUpdateManyWithoutPatientInputSchema) ]),
}).strict();

export const CustomerSatisfactionScalarWhereInputSchema: z.ZodType<Prisma.CustomerSatisfactionScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CustomerSatisfactionScalarWhereInputSchema),z.lazy(() => CustomerSatisfactionScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CustomerSatisfactionScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CustomerSatisfactionScalarWhereInputSchema),z.lazy(() => CustomerSatisfactionScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  rating: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  comment: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  patientId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  organizationId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const PatientAnamnesisUpsertWithWhereUniqueWithoutPatientInputSchema: z.ZodType<Prisma.PatientAnamnesisUpsertWithWhereUniqueWithoutPatientInput> = z.object({
  where: z.lazy(() => PatientAnamnesisWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PatientAnamnesisUpdateWithoutPatientInputSchema),z.lazy(() => PatientAnamnesisUncheckedUpdateWithoutPatientInputSchema) ]),
  create: z.union([ z.lazy(() => PatientAnamnesisCreateWithoutPatientInputSchema),z.lazy(() => PatientAnamnesisUncheckedCreateWithoutPatientInputSchema) ]),
}).strict();

export const PatientAnamnesisUpdateWithWhereUniqueWithoutPatientInputSchema: z.ZodType<Prisma.PatientAnamnesisUpdateWithWhereUniqueWithoutPatientInput> = z.object({
  where: z.lazy(() => PatientAnamnesisWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PatientAnamnesisUpdateWithoutPatientInputSchema),z.lazy(() => PatientAnamnesisUncheckedUpdateWithoutPatientInputSchema) ]),
}).strict();

export const PatientAnamnesisUpdateManyWithWhereWithoutPatientInputSchema: z.ZodType<Prisma.PatientAnamnesisUpdateManyWithWhereWithoutPatientInput> = z.object({
  where: z.lazy(() => PatientAnamnesisScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PatientAnamnesisUpdateManyMutationInputSchema),z.lazy(() => PatientAnamnesisUncheckedUpdateManyWithoutPatientInputSchema) ]),
}).strict();

export const PatientAnamnesisScalarWhereInputSchema: z.ZodType<Prisma.PatientAnamnesisScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PatientAnamnesisScalarWhereInputSchema),z.lazy(() => PatientAnamnesisScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PatientAnamnesisScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PatientAnamnesisScalarWhereInputSchema),z.lazy(() => PatientAnamnesisScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  patientId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  templateId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const PatientCreateWithoutMedicalRecordInputSchema: z.ZodType<Prisma.PatientCreateWithoutMedicalRecordInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  email: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  birthDate: z.coerce.date(),
  address: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  organization: z.lazy(() => OrganizationCreateNestedOneWithoutPatientsInputSchema),
  appointments: z.lazy(() => AppointmentCreateNestedManyWithoutPatientInputSchema).optional(),
  FinancialTransaction: z.lazy(() => FinancialTransactionCreateNestedManyWithoutPatientInputSchema).optional(),
  CustomerSatisfaction: z.lazy(() => CustomerSatisfactionCreateNestedManyWithoutPatientInputSchema).optional(),
  PatientAnamnesis: z.lazy(() => PatientAnamnesisCreateNestedManyWithoutPatientInputSchema).optional()
}).strict();

export const PatientUncheckedCreateWithoutMedicalRecordInputSchema: z.ZodType<Prisma.PatientUncheckedCreateWithoutMedicalRecordInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  email: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  birthDate: z.coerce.date(),
  address: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  organizationId: z.string(),
  appointments: z.lazy(() => AppointmentUncheckedCreateNestedManyWithoutPatientInputSchema).optional(),
  FinancialTransaction: z.lazy(() => FinancialTransactionUncheckedCreateNestedManyWithoutPatientInputSchema).optional(),
  CustomerSatisfaction: z.lazy(() => CustomerSatisfactionUncheckedCreateNestedManyWithoutPatientInputSchema).optional(),
  PatientAnamnesis: z.lazy(() => PatientAnamnesisUncheckedCreateNestedManyWithoutPatientInputSchema).optional()
}).strict();

export const PatientCreateOrConnectWithoutMedicalRecordInputSchema: z.ZodType<Prisma.PatientCreateOrConnectWithoutMedicalRecordInput> = z.object({
  where: z.lazy(() => PatientWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PatientCreateWithoutMedicalRecordInputSchema),z.lazy(() => PatientUncheckedCreateWithoutMedicalRecordInputSchema) ]),
}).strict();

export const AnamnesisCreateWithoutMedicalRecordInputSchema: z.ZodType<Prisma.AnamnesisCreateWithoutMedicalRecordInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  template: z.lazy(() => AnamnesisTemplateCreateNestedOneWithoutAnamnesisInputSchema),
  answers: z.lazy(() => AnamnesisAnswerCreateNestedManyWithoutAnamnesisInputSchema).optional()
}).strict();

export const AnamnesisUncheckedCreateWithoutMedicalRecordInputSchema: z.ZodType<Prisma.AnamnesisUncheckedCreateWithoutMedicalRecordInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  templateId: z.string(),
  answers: z.lazy(() => AnamnesisAnswerUncheckedCreateNestedManyWithoutAnamnesisInputSchema).optional()
}).strict();

export const AnamnesisCreateOrConnectWithoutMedicalRecordInputSchema: z.ZodType<Prisma.AnamnesisCreateOrConnectWithoutMedicalRecordInput> = z.object({
  where: z.lazy(() => AnamnesisWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AnamnesisCreateWithoutMedicalRecordInputSchema),z.lazy(() => AnamnesisUncheckedCreateWithoutMedicalRecordInputSchema) ]),
}).strict();

export const AnamnesisCreateManyMedicalRecordInputEnvelopeSchema: z.ZodType<Prisma.AnamnesisCreateManyMedicalRecordInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => AnamnesisCreateManyMedicalRecordInputSchema),z.lazy(() => AnamnesisCreateManyMedicalRecordInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const PatientUpsertWithoutMedicalRecordInputSchema: z.ZodType<Prisma.PatientUpsertWithoutMedicalRecordInput> = z.object({
  update: z.union([ z.lazy(() => PatientUpdateWithoutMedicalRecordInputSchema),z.lazy(() => PatientUncheckedUpdateWithoutMedicalRecordInputSchema) ]),
  create: z.union([ z.lazy(() => PatientCreateWithoutMedicalRecordInputSchema),z.lazy(() => PatientUncheckedCreateWithoutMedicalRecordInputSchema) ]),
  where: z.lazy(() => PatientWhereInputSchema).optional()
}).strict();

export const PatientUpdateToOneWithWhereWithoutMedicalRecordInputSchema: z.ZodType<Prisma.PatientUpdateToOneWithWhereWithoutMedicalRecordInput> = z.object({
  where: z.lazy(() => PatientWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PatientUpdateWithoutMedicalRecordInputSchema),z.lazy(() => PatientUncheckedUpdateWithoutMedicalRecordInputSchema) ]),
}).strict();

export const PatientUpdateWithoutMedicalRecordInputSchema: z.ZodType<Prisma.PatientUpdateWithoutMedicalRecordInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  birthDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  organization: z.lazy(() => OrganizationUpdateOneRequiredWithoutPatientsNestedInputSchema).optional(),
  appointments: z.lazy(() => AppointmentUpdateManyWithoutPatientNestedInputSchema).optional(),
  FinancialTransaction: z.lazy(() => FinancialTransactionUpdateManyWithoutPatientNestedInputSchema).optional(),
  CustomerSatisfaction: z.lazy(() => CustomerSatisfactionUpdateManyWithoutPatientNestedInputSchema).optional(),
  PatientAnamnesis: z.lazy(() => PatientAnamnesisUpdateManyWithoutPatientNestedInputSchema).optional()
}).strict();

export const PatientUncheckedUpdateWithoutMedicalRecordInputSchema: z.ZodType<Prisma.PatientUncheckedUpdateWithoutMedicalRecordInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  birthDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  organizationId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  appointments: z.lazy(() => AppointmentUncheckedUpdateManyWithoutPatientNestedInputSchema).optional(),
  FinancialTransaction: z.lazy(() => FinancialTransactionUncheckedUpdateManyWithoutPatientNestedInputSchema).optional(),
  CustomerSatisfaction: z.lazy(() => CustomerSatisfactionUncheckedUpdateManyWithoutPatientNestedInputSchema).optional(),
  PatientAnamnesis: z.lazy(() => PatientAnamnesisUncheckedUpdateManyWithoutPatientNestedInputSchema).optional()
}).strict();

export const AnamnesisUpsertWithWhereUniqueWithoutMedicalRecordInputSchema: z.ZodType<Prisma.AnamnesisUpsertWithWhereUniqueWithoutMedicalRecordInput> = z.object({
  where: z.lazy(() => AnamnesisWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AnamnesisUpdateWithoutMedicalRecordInputSchema),z.lazy(() => AnamnesisUncheckedUpdateWithoutMedicalRecordInputSchema) ]),
  create: z.union([ z.lazy(() => AnamnesisCreateWithoutMedicalRecordInputSchema),z.lazy(() => AnamnesisUncheckedCreateWithoutMedicalRecordInputSchema) ]),
}).strict();

export const AnamnesisUpdateWithWhereUniqueWithoutMedicalRecordInputSchema: z.ZodType<Prisma.AnamnesisUpdateWithWhereUniqueWithoutMedicalRecordInput> = z.object({
  where: z.lazy(() => AnamnesisWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AnamnesisUpdateWithoutMedicalRecordInputSchema),z.lazy(() => AnamnesisUncheckedUpdateWithoutMedicalRecordInputSchema) ]),
}).strict();

export const AnamnesisUpdateManyWithWhereWithoutMedicalRecordInputSchema: z.ZodType<Prisma.AnamnesisUpdateManyWithWhereWithoutMedicalRecordInput> = z.object({
  where: z.lazy(() => AnamnesisScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AnamnesisUpdateManyMutationInputSchema),z.lazy(() => AnamnesisUncheckedUpdateManyWithoutMedicalRecordInputSchema) ]),
}).strict();

export const AnamnesisScalarWhereInputSchema: z.ZodType<Prisma.AnamnesisScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AnamnesisScalarWhereInputSchema),z.lazy(() => AnamnesisScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AnamnesisScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AnamnesisScalarWhereInputSchema),z.lazy(() => AnamnesisScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  medicalRecordId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  templateId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const MedicalRecordCreateWithoutAnamnesesInputSchema: z.ZodType<Prisma.MedicalRecordCreateWithoutAnamnesesInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  patient: z.lazy(() => PatientCreateNestedOneWithoutMedicalRecordInputSchema)
}).strict();

export const MedicalRecordUncheckedCreateWithoutAnamnesesInputSchema: z.ZodType<Prisma.MedicalRecordUncheckedCreateWithoutAnamnesesInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  patientId: z.string()
}).strict();

export const MedicalRecordCreateOrConnectWithoutAnamnesesInputSchema: z.ZodType<Prisma.MedicalRecordCreateOrConnectWithoutAnamnesesInput> = z.object({
  where: z.lazy(() => MedicalRecordWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MedicalRecordCreateWithoutAnamnesesInputSchema),z.lazy(() => MedicalRecordUncheckedCreateWithoutAnamnesesInputSchema) ]),
}).strict();

export const AnamnesisTemplateCreateWithoutAnamnesisInputSchema: z.ZodType<Prisma.AnamnesisTemplateCreateWithoutAnamnesisInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  organization: z.lazy(() => OrganizationCreateNestedOneWithoutAnamnesisTemplateInputSchema),
  questions: z.lazy(() => AnamnesisQuestionCreateNestedManyWithoutTemplateInputSchema).optional(),
  patientAnamneses: z.lazy(() => PatientAnamnesisCreateNestedManyWithoutTemplateInputSchema).optional()
}).strict();

export const AnamnesisTemplateUncheckedCreateWithoutAnamnesisInputSchema: z.ZodType<Prisma.AnamnesisTemplateUncheckedCreateWithoutAnamnesisInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  organizationId: z.string(),
  questions: z.lazy(() => AnamnesisQuestionUncheckedCreateNestedManyWithoutTemplateInputSchema).optional(),
  patientAnamneses: z.lazy(() => PatientAnamnesisUncheckedCreateNestedManyWithoutTemplateInputSchema).optional()
}).strict();

export const AnamnesisTemplateCreateOrConnectWithoutAnamnesisInputSchema: z.ZodType<Prisma.AnamnesisTemplateCreateOrConnectWithoutAnamnesisInput> = z.object({
  where: z.lazy(() => AnamnesisTemplateWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AnamnesisTemplateCreateWithoutAnamnesisInputSchema),z.lazy(() => AnamnesisTemplateUncheckedCreateWithoutAnamnesisInputSchema) ]),
}).strict();

export const AnamnesisAnswerCreateWithoutAnamnesisInputSchema: z.ZodType<Prisma.AnamnesisAnswerCreateWithoutAnamnesisInput> = z.object({
  id: z.string().optional(),
  answer: z.string(),
  question: z.lazy(() => AnamnesisQuestionCreateNestedOneWithoutAnswersInputSchema),
  patientAnamnesis: z.lazy(() => PatientAnamnesisCreateNestedOneWithoutAnswersInputSchema)
}).strict();

export const AnamnesisAnswerUncheckedCreateWithoutAnamnesisInputSchema: z.ZodType<Prisma.AnamnesisAnswerUncheckedCreateWithoutAnamnesisInput> = z.object({
  id: z.string().optional(),
  answer: z.string(),
  questionId: z.string(),
  patientAnamnesisId: z.string()
}).strict();

export const AnamnesisAnswerCreateOrConnectWithoutAnamnesisInputSchema: z.ZodType<Prisma.AnamnesisAnswerCreateOrConnectWithoutAnamnesisInput> = z.object({
  where: z.lazy(() => AnamnesisAnswerWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AnamnesisAnswerCreateWithoutAnamnesisInputSchema),z.lazy(() => AnamnesisAnswerUncheckedCreateWithoutAnamnesisInputSchema) ]),
}).strict();

export const AnamnesisAnswerCreateManyAnamnesisInputEnvelopeSchema: z.ZodType<Prisma.AnamnesisAnswerCreateManyAnamnesisInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => AnamnesisAnswerCreateManyAnamnesisInputSchema),z.lazy(() => AnamnesisAnswerCreateManyAnamnesisInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const MedicalRecordUpsertWithoutAnamnesesInputSchema: z.ZodType<Prisma.MedicalRecordUpsertWithoutAnamnesesInput> = z.object({
  update: z.union([ z.lazy(() => MedicalRecordUpdateWithoutAnamnesesInputSchema),z.lazy(() => MedicalRecordUncheckedUpdateWithoutAnamnesesInputSchema) ]),
  create: z.union([ z.lazy(() => MedicalRecordCreateWithoutAnamnesesInputSchema),z.lazy(() => MedicalRecordUncheckedCreateWithoutAnamnesesInputSchema) ]),
  where: z.lazy(() => MedicalRecordWhereInputSchema).optional()
}).strict();

export const MedicalRecordUpdateToOneWithWhereWithoutAnamnesesInputSchema: z.ZodType<Prisma.MedicalRecordUpdateToOneWithWhereWithoutAnamnesesInput> = z.object({
  where: z.lazy(() => MedicalRecordWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => MedicalRecordUpdateWithoutAnamnesesInputSchema),z.lazy(() => MedicalRecordUncheckedUpdateWithoutAnamnesesInputSchema) ]),
}).strict();

export const MedicalRecordUpdateWithoutAnamnesesInputSchema: z.ZodType<Prisma.MedicalRecordUpdateWithoutAnamnesesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  patient: z.lazy(() => PatientUpdateOneRequiredWithoutMedicalRecordNestedInputSchema).optional()
}).strict();

export const MedicalRecordUncheckedUpdateWithoutAnamnesesInputSchema: z.ZodType<Prisma.MedicalRecordUncheckedUpdateWithoutAnamnesesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  patientId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AnamnesisTemplateUpsertWithoutAnamnesisInputSchema: z.ZodType<Prisma.AnamnesisTemplateUpsertWithoutAnamnesisInput> = z.object({
  update: z.union([ z.lazy(() => AnamnesisTemplateUpdateWithoutAnamnesisInputSchema),z.lazy(() => AnamnesisTemplateUncheckedUpdateWithoutAnamnesisInputSchema) ]),
  create: z.union([ z.lazy(() => AnamnesisTemplateCreateWithoutAnamnesisInputSchema),z.lazy(() => AnamnesisTemplateUncheckedCreateWithoutAnamnesisInputSchema) ]),
  where: z.lazy(() => AnamnesisTemplateWhereInputSchema).optional()
}).strict();

export const AnamnesisTemplateUpdateToOneWithWhereWithoutAnamnesisInputSchema: z.ZodType<Prisma.AnamnesisTemplateUpdateToOneWithWhereWithoutAnamnesisInput> = z.object({
  where: z.lazy(() => AnamnesisTemplateWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => AnamnesisTemplateUpdateWithoutAnamnesisInputSchema),z.lazy(() => AnamnesisTemplateUncheckedUpdateWithoutAnamnesisInputSchema) ]),
}).strict();

export const AnamnesisTemplateUpdateWithoutAnamnesisInputSchema: z.ZodType<Prisma.AnamnesisTemplateUpdateWithoutAnamnesisInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  organization: z.lazy(() => OrganizationUpdateOneRequiredWithoutAnamnesisTemplateNestedInputSchema).optional(),
  questions: z.lazy(() => AnamnesisQuestionUpdateManyWithoutTemplateNestedInputSchema).optional(),
  patientAnamneses: z.lazy(() => PatientAnamnesisUpdateManyWithoutTemplateNestedInputSchema).optional()
}).strict();

export const AnamnesisTemplateUncheckedUpdateWithoutAnamnesisInputSchema: z.ZodType<Prisma.AnamnesisTemplateUncheckedUpdateWithoutAnamnesisInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  organizationId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  questions: z.lazy(() => AnamnesisQuestionUncheckedUpdateManyWithoutTemplateNestedInputSchema).optional(),
  patientAnamneses: z.lazy(() => PatientAnamnesisUncheckedUpdateManyWithoutTemplateNestedInputSchema).optional()
}).strict();

export const AnamnesisAnswerUpsertWithWhereUniqueWithoutAnamnesisInputSchema: z.ZodType<Prisma.AnamnesisAnswerUpsertWithWhereUniqueWithoutAnamnesisInput> = z.object({
  where: z.lazy(() => AnamnesisAnswerWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AnamnesisAnswerUpdateWithoutAnamnesisInputSchema),z.lazy(() => AnamnesisAnswerUncheckedUpdateWithoutAnamnesisInputSchema) ]),
  create: z.union([ z.lazy(() => AnamnesisAnswerCreateWithoutAnamnesisInputSchema),z.lazy(() => AnamnesisAnswerUncheckedCreateWithoutAnamnesisInputSchema) ]),
}).strict();

export const AnamnesisAnswerUpdateWithWhereUniqueWithoutAnamnesisInputSchema: z.ZodType<Prisma.AnamnesisAnswerUpdateWithWhereUniqueWithoutAnamnesisInput> = z.object({
  where: z.lazy(() => AnamnesisAnswerWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AnamnesisAnswerUpdateWithoutAnamnesisInputSchema),z.lazy(() => AnamnesisAnswerUncheckedUpdateWithoutAnamnesisInputSchema) ]),
}).strict();

export const AnamnesisAnswerUpdateManyWithWhereWithoutAnamnesisInputSchema: z.ZodType<Prisma.AnamnesisAnswerUpdateManyWithWhereWithoutAnamnesisInput> = z.object({
  where: z.lazy(() => AnamnesisAnswerScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AnamnesisAnswerUpdateManyMutationInputSchema),z.lazy(() => AnamnesisAnswerUncheckedUpdateManyWithoutAnamnesisInputSchema) ]),
}).strict();

export const AnamnesisAnswerScalarWhereInputSchema: z.ZodType<Prisma.AnamnesisAnswerScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AnamnesisAnswerScalarWhereInputSchema),z.lazy(() => AnamnesisAnswerScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AnamnesisAnswerScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AnamnesisAnswerScalarWhereInputSchema),z.lazy(() => AnamnesisAnswerScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  answer: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  questionId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  patientAnamnesisId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  anamnesisId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const OrganizationCreateWithoutAnamnesisTemplateInputSchema: z.ZodType<Prisma.OrganizationCreateWithoutAnamnesisTemplateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  slug: z.string(),
  domain: z.string().optional().nullable(),
  shouldAttachUsersByDomain: z.boolean().optional(),
  avatarUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  owner: z.lazy(() => UserCreateNestedOneWithoutOwns_organizationsInputSchema),
  invites: z.lazy(() => InviteCreateNestedManyWithoutOrganizationInputSchema).optional(),
  members: z.lazy(() => MemberCreateNestedManyWithoutOrganizationInputSchema).optional(),
  patients: z.lazy(() => PatientCreateNestedManyWithoutOrganizationInputSchema).optional(),
  financialTransactions: z.lazy(() => FinancialTransactionCreateNestedManyWithoutOrganizationInputSchema).optional(),
  customerSatisfactions: z.lazy(() => CustomerSatisfactionCreateNestedManyWithoutOrganizationInputSchema).optional()
}).strict();

export const OrganizationUncheckedCreateWithoutAnamnesisTemplateInputSchema: z.ZodType<Prisma.OrganizationUncheckedCreateWithoutAnamnesisTemplateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  slug: z.string(),
  domain: z.string().optional().nullable(),
  shouldAttachUsersByDomain: z.boolean().optional(),
  avatarUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  ownerId: z.string(),
  invites: z.lazy(() => InviteUncheckedCreateNestedManyWithoutOrganizationInputSchema).optional(),
  members: z.lazy(() => MemberUncheckedCreateNestedManyWithoutOrganizationInputSchema).optional(),
  patients: z.lazy(() => PatientUncheckedCreateNestedManyWithoutOrganizationInputSchema).optional(),
  financialTransactions: z.lazy(() => FinancialTransactionUncheckedCreateNestedManyWithoutOrganizationInputSchema).optional(),
  customerSatisfactions: z.lazy(() => CustomerSatisfactionUncheckedCreateNestedManyWithoutOrganizationInputSchema).optional()
}).strict();

export const OrganizationCreateOrConnectWithoutAnamnesisTemplateInputSchema: z.ZodType<Prisma.OrganizationCreateOrConnectWithoutAnamnesisTemplateInput> = z.object({
  where: z.lazy(() => OrganizationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => OrganizationCreateWithoutAnamnesisTemplateInputSchema),z.lazy(() => OrganizationUncheckedCreateWithoutAnamnesisTemplateInputSchema) ]),
}).strict();

export const AnamnesisQuestionCreateWithoutTemplateInputSchema: z.ZodType<Prisma.AnamnesisQuestionCreateWithoutTemplateInput> = z.object({
  id: z.string().optional(),
  question: z.string(),
  type: z.lazy(() => QuestionTypeSchema),
  answers: z.lazy(() => AnamnesisAnswerCreateNestedManyWithoutQuestionInputSchema).optional()
}).strict();

export const AnamnesisQuestionUncheckedCreateWithoutTemplateInputSchema: z.ZodType<Prisma.AnamnesisQuestionUncheckedCreateWithoutTemplateInput> = z.object({
  id: z.string().optional(),
  question: z.string(),
  type: z.lazy(() => QuestionTypeSchema),
  answers: z.lazy(() => AnamnesisAnswerUncheckedCreateNestedManyWithoutQuestionInputSchema).optional()
}).strict();

export const AnamnesisQuestionCreateOrConnectWithoutTemplateInputSchema: z.ZodType<Prisma.AnamnesisQuestionCreateOrConnectWithoutTemplateInput> = z.object({
  where: z.lazy(() => AnamnesisQuestionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AnamnesisQuestionCreateWithoutTemplateInputSchema),z.lazy(() => AnamnesisQuestionUncheckedCreateWithoutTemplateInputSchema) ]),
}).strict();

export const AnamnesisQuestionCreateManyTemplateInputEnvelopeSchema: z.ZodType<Prisma.AnamnesisQuestionCreateManyTemplateInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => AnamnesisQuestionCreateManyTemplateInputSchema),z.lazy(() => AnamnesisQuestionCreateManyTemplateInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const PatientAnamnesisCreateWithoutTemplateInputSchema: z.ZodType<Prisma.PatientAnamnesisCreateWithoutTemplateInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  patient: z.lazy(() => PatientCreateNestedOneWithoutPatientAnamnesisInputSchema),
  answers: z.lazy(() => AnamnesisAnswerCreateNestedManyWithoutPatientAnamnesisInputSchema).optional()
}).strict();

export const PatientAnamnesisUncheckedCreateWithoutTemplateInputSchema: z.ZodType<Prisma.PatientAnamnesisUncheckedCreateWithoutTemplateInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  patientId: z.string(),
  answers: z.lazy(() => AnamnesisAnswerUncheckedCreateNestedManyWithoutPatientAnamnesisInputSchema).optional()
}).strict();

export const PatientAnamnesisCreateOrConnectWithoutTemplateInputSchema: z.ZodType<Prisma.PatientAnamnesisCreateOrConnectWithoutTemplateInput> = z.object({
  where: z.lazy(() => PatientAnamnesisWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PatientAnamnesisCreateWithoutTemplateInputSchema),z.lazy(() => PatientAnamnesisUncheckedCreateWithoutTemplateInputSchema) ]),
}).strict();

export const PatientAnamnesisCreateManyTemplateInputEnvelopeSchema: z.ZodType<Prisma.PatientAnamnesisCreateManyTemplateInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => PatientAnamnesisCreateManyTemplateInputSchema),z.lazy(() => PatientAnamnesisCreateManyTemplateInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const AnamnesisCreateWithoutTemplateInputSchema: z.ZodType<Prisma.AnamnesisCreateWithoutTemplateInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  medicalRecord: z.lazy(() => MedicalRecordCreateNestedOneWithoutAnamnesesInputSchema),
  answers: z.lazy(() => AnamnesisAnswerCreateNestedManyWithoutAnamnesisInputSchema).optional()
}).strict();

export const AnamnesisUncheckedCreateWithoutTemplateInputSchema: z.ZodType<Prisma.AnamnesisUncheckedCreateWithoutTemplateInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  medicalRecordId: z.string(),
  answers: z.lazy(() => AnamnesisAnswerUncheckedCreateNestedManyWithoutAnamnesisInputSchema).optional()
}).strict();

export const AnamnesisCreateOrConnectWithoutTemplateInputSchema: z.ZodType<Prisma.AnamnesisCreateOrConnectWithoutTemplateInput> = z.object({
  where: z.lazy(() => AnamnesisWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AnamnesisCreateWithoutTemplateInputSchema),z.lazy(() => AnamnesisUncheckedCreateWithoutTemplateInputSchema) ]),
}).strict();

export const AnamnesisCreateManyTemplateInputEnvelopeSchema: z.ZodType<Prisma.AnamnesisCreateManyTemplateInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => AnamnesisCreateManyTemplateInputSchema),z.lazy(() => AnamnesisCreateManyTemplateInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const OrganizationUpsertWithoutAnamnesisTemplateInputSchema: z.ZodType<Prisma.OrganizationUpsertWithoutAnamnesisTemplateInput> = z.object({
  update: z.union([ z.lazy(() => OrganizationUpdateWithoutAnamnesisTemplateInputSchema),z.lazy(() => OrganizationUncheckedUpdateWithoutAnamnesisTemplateInputSchema) ]),
  create: z.union([ z.lazy(() => OrganizationCreateWithoutAnamnesisTemplateInputSchema),z.lazy(() => OrganizationUncheckedCreateWithoutAnamnesisTemplateInputSchema) ]),
  where: z.lazy(() => OrganizationWhereInputSchema).optional()
}).strict();

export const OrganizationUpdateToOneWithWhereWithoutAnamnesisTemplateInputSchema: z.ZodType<Prisma.OrganizationUpdateToOneWithWhereWithoutAnamnesisTemplateInput> = z.object({
  where: z.lazy(() => OrganizationWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => OrganizationUpdateWithoutAnamnesisTemplateInputSchema),z.lazy(() => OrganizationUncheckedUpdateWithoutAnamnesisTemplateInputSchema) ]),
}).strict();

export const OrganizationUpdateWithoutAnamnesisTemplateInputSchema: z.ZodType<Prisma.OrganizationUpdateWithoutAnamnesisTemplateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  domain: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  shouldAttachUsersByDomain: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  avatarUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  owner: z.lazy(() => UserUpdateOneRequiredWithoutOwns_organizationsNestedInputSchema).optional(),
  invites: z.lazy(() => InviteUpdateManyWithoutOrganizationNestedInputSchema).optional(),
  members: z.lazy(() => MemberUpdateManyWithoutOrganizationNestedInputSchema).optional(),
  patients: z.lazy(() => PatientUpdateManyWithoutOrganizationNestedInputSchema).optional(),
  financialTransactions: z.lazy(() => FinancialTransactionUpdateManyWithoutOrganizationNestedInputSchema).optional(),
  customerSatisfactions: z.lazy(() => CustomerSatisfactionUpdateManyWithoutOrganizationNestedInputSchema).optional()
}).strict();

export const OrganizationUncheckedUpdateWithoutAnamnesisTemplateInputSchema: z.ZodType<Prisma.OrganizationUncheckedUpdateWithoutAnamnesisTemplateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  domain: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  shouldAttachUsersByDomain: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  avatarUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ownerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  invites: z.lazy(() => InviteUncheckedUpdateManyWithoutOrganizationNestedInputSchema).optional(),
  members: z.lazy(() => MemberUncheckedUpdateManyWithoutOrganizationNestedInputSchema).optional(),
  patients: z.lazy(() => PatientUncheckedUpdateManyWithoutOrganizationNestedInputSchema).optional(),
  financialTransactions: z.lazy(() => FinancialTransactionUncheckedUpdateManyWithoutOrganizationNestedInputSchema).optional(),
  customerSatisfactions: z.lazy(() => CustomerSatisfactionUncheckedUpdateManyWithoutOrganizationNestedInputSchema).optional()
}).strict();

export const AnamnesisQuestionUpsertWithWhereUniqueWithoutTemplateInputSchema: z.ZodType<Prisma.AnamnesisQuestionUpsertWithWhereUniqueWithoutTemplateInput> = z.object({
  where: z.lazy(() => AnamnesisQuestionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AnamnesisQuestionUpdateWithoutTemplateInputSchema),z.lazy(() => AnamnesisQuestionUncheckedUpdateWithoutTemplateInputSchema) ]),
  create: z.union([ z.lazy(() => AnamnesisQuestionCreateWithoutTemplateInputSchema),z.lazy(() => AnamnesisQuestionUncheckedCreateWithoutTemplateInputSchema) ]),
}).strict();

export const AnamnesisQuestionUpdateWithWhereUniqueWithoutTemplateInputSchema: z.ZodType<Prisma.AnamnesisQuestionUpdateWithWhereUniqueWithoutTemplateInput> = z.object({
  where: z.lazy(() => AnamnesisQuestionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AnamnesisQuestionUpdateWithoutTemplateInputSchema),z.lazy(() => AnamnesisQuestionUncheckedUpdateWithoutTemplateInputSchema) ]),
}).strict();

export const AnamnesisQuestionUpdateManyWithWhereWithoutTemplateInputSchema: z.ZodType<Prisma.AnamnesisQuestionUpdateManyWithWhereWithoutTemplateInput> = z.object({
  where: z.lazy(() => AnamnesisQuestionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AnamnesisQuestionUpdateManyMutationInputSchema),z.lazy(() => AnamnesisQuestionUncheckedUpdateManyWithoutTemplateInputSchema) ]),
}).strict();

export const AnamnesisQuestionScalarWhereInputSchema: z.ZodType<Prisma.AnamnesisQuestionScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AnamnesisQuestionScalarWhereInputSchema),z.lazy(() => AnamnesisQuestionScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AnamnesisQuestionScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AnamnesisQuestionScalarWhereInputSchema),z.lazy(() => AnamnesisQuestionScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  question: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumQuestionTypeFilterSchema),z.lazy(() => QuestionTypeSchema) ]).optional(),
  templateId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const PatientAnamnesisUpsertWithWhereUniqueWithoutTemplateInputSchema: z.ZodType<Prisma.PatientAnamnesisUpsertWithWhereUniqueWithoutTemplateInput> = z.object({
  where: z.lazy(() => PatientAnamnesisWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PatientAnamnesisUpdateWithoutTemplateInputSchema),z.lazy(() => PatientAnamnesisUncheckedUpdateWithoutTemplateInputSchema) ]),
  create: z.union([ z.lazy(() => PatientAnamnesisCreateWithoutTemplateInputSchema),z.lazy(() => PatientAnamnesisUncheckedCreateWithoutTemplateInputSchema) ]),
}).strict();

export const PatientAnamnesisUpdateWithWhereUniqueWithoutTemplateInputSchema: z.ZodType<Prisma.PatientAnamnesisUpdateWithWhereUniqueWithoutTemplateInput> = z.object({
  where: z.lazy(() => PatientAnamnesisWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PatientAnamnesisUpdateWithoutTemplateInputSchema),z.lazy(() => PatientAnamnesisUncheckedUpdateWithoutTemplateInputSchema) ]),
}).strict();

export const PatientAnamnesisUpdateManyWithWhereWithoutTemplateInputSchema: z.ZodType<Prisma.PatientAnamnesisUpdateManyWithWhereWithoutTemplateInput> = z.object({
  where: z.lazy(() => PatientAnamnesisScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PatientAnamnesisUpdateManyMutationInputSchema),z.lazy(() => PatientAnamnesisUncheckedUpdateManyWithoutTemplateInputSchema) ]),
}).strict();

export const AnamnesisUpsertWithWhereUniqueWithoutTemplateInputSchema: z.ZodType<Prisma.AnamnesisUpsertWithWhereUniqueWithoutTemplateInput> = z.object({
  where: z.lazy(() => AnamnesisWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AnamnesisUpdateWithoutTemplateInputSchema),z.lazy(() => AnamnesisUncheckedUpdateWithoutTemplateInputSchema) ]),
  create: z.union([ z.lazy(() => AnamnesisCreateWithoutTemplateInputSchema),z.lazy(() => AnamnesisUncheckedCreateWithoutTemplateInputSchema) ]),
}).strict();

export const AnamnesisUpdateWithWhereUniqueWithoutTemplateInputSchema: z.ZodType<Prisma.AnamnesisUpdateWithWhereUniqueWithoutTemplateInput> = z.object({
  where: z.lazy(() => AnamnesisWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AnamnesisUpdateWithoutTemplateInputSchema),z.lazy(() => AnamnesisUncheckedUpdateWithoutTemplateInputSchema) ]),
}).strict();

export const AnamnesisUpdateManyWithWhereWithoutTemplateInputSchema: z.ZodType<Prisma.AnamnesisUpdateManyWithWhereWithoutTemplateInput> = z.object({
  where: z.lazy(() => AnamnesisScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AnamnesisUpdateManyMutationInputSchema),z.lazy(() => AnamnesisUncheckedUpdateManyWithoutTemplateInputSchema) ]),
}).strict();

export const AnamnesisTemplateCreateWithoutQuestionsInputSchema: z.ZodType<Prisma.AnamnesisTemplateCreateWithoutQuestionsInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  organization: z.lazy(() => OrganizationCreateNestedOneWithoutAnamnesisTemplateInputSchema),
  patientAnamneses: z.lazy(() => PatientAnamnesisCreateNestedManyWithoutTemplateInputSchema).optional(),
  Anamnesis: z.lazy(() => AnamnesisCreateNestedManyWithoutTemplateInputSchema).optional()
}).strict();

export const AnamnesisTemplateUncheckedCreateWithoutQuestionsInputSchema: z.ZodType<Prisma.AnamnesisTemplateUncheckedCreateWithoutQuestionsInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  organizationId: z.string(),
  patientAnamneses: z.lazy(() => PatientAnamnesisUncheckedCreateNestedManyWithoutTemplateInputSchema).optional(),
  Anamnesis: z.lazy(() => AnamnesisUncheckedCreateNestedManyWithoutTemplateInputSchema).optional()
}).strict();

export const AnamnesisTemplateCreateOrConnectWithoutQuestionsInputSchema: z.ZodType<Prisma.AnamnesisTemplateCreateOrConnectWithoutQuestionsInput> = z.object({
  where: z.lazy(() => AnamnesisTemplateWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AnamnesisTemplateCreateWithoutQuestionsInputSchema),z.lazy(() => AnamnesisTemplateUncheckedCreateWithoutQuestionsInputSchema) ]),
}).strict();

export const AnamnesisAnswerCreateWithoutQuestionInputSchema: z.ZodType<Prisma.AnamnesisAnswerCreateWithoutQuestionInput> = z.object({
  id: z.string().optional(),
  answer: z.string(),
  patientAnamnesis: z.lazy(() => PatientAnamnesisCreateNestedOneWithoutAnswersInputSchema),
  Anamnesis: z.lazy(() => AnamnesisCreateNestedOneWithoutAnswersInputSchema).optional()
}).strict();

export const AnamnesisAnswerUncheckedCreateWithoutQuestionInputSchema: z.ZodType<Prisma.AnamnesisAnswerUncheckedCreateWithoutQuestionInput> = z.object({
  id: z.string().optional(),
  answer: z.string(),
  patientAnamnesisId: z.string(),
  anamnesisId: z.string().optional().nullable()
}).strict();

export const AnamnesisAnswerCreateOrConnectWithoutQuestionInputSchema: z.ZodType<Prisma.AnamnesisAnswerCreateOrConnectWithoutQuestionInput> = z.object({
  where: z.lazy(() => AnamnesisAnswerWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AnamnesisAnswerCreateWithoutQuestionInputSchema),z.lazy(() => AnamnesisAnswerUncheckedCreateWithoutQuestionInputSchema) ]),
}).strict();

export const AnamnesisAnswerCreateManyQuestionInputEnvelopeSchema: z.ZodType<Prisma.AnamnesisAnswerCreateManyQuestionInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => AnamnesisAnswerCreateManyQuestionInputSchema),z.lazy(() => AnamnesisAnswerCreateManyQuestionInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const AnamnesisTemplateUpsertWithoutQuestionsInputSchema: z.ZodType<Prisma.AnamnesisTemplateUpsertWithoutQuestionsInput> = z.object({
  update: z.union([ z.lazy(() => AnamnesisTemplateUpdateWithoutQuestionsInputSchema),z.lazy(() => AnamnesisTemplateUncheckedUpdateWithoutQuestionsInputSchema) ]),
  create: z.union([ z.lazy(() => AnamnesisTemplateCreateWithoutQuestionsInputSchema),z.lazy(() => AnamnesisTemplateUncheckedCreateWithoutQuestionsInputSchema) ]),
  where: z.lazy(() => AnamnesisTemplateWhereInputSchema).optional()
}).strict();

export const AnamnesisTemplateUpdateToOneWithWhereWithoutQuestionsInputSchema: z.ZodType<Prisma.AnamnesisTemplateUpdateToOneWithWhereWithoutQuestionsInput> = z.object({
  where: z.lazy(() => AnamnesisTemplateWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => AnamnesisTemplateUpdateWithoutQuestionsInputSchema),z.lazy(() => AnamnesisTemplateUncheckedUpdateWithoutQuestionsInputSchema) ]),
}).strict();

export const AnamnesisTemplateUpdateWithoutQuestionsInputSchema: z.ZodType<Prisma.AnamnesisTemplateUpdateWithoutQuestionsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  organization: z.lazy(() => OrganizationUpdateOneRequiredWithoutAnamnesisTemplateNestedInputSchema).optional(),
  patientAnamneses: z.lazy(() => PatientAnamnesisUpdateManyWithoutTemplateNestedInputSchema).optional(),
  Anamnesis: z.lazy(() => AnamnesisUpdateManyWithoutTemplateNestedInputSchema).optional()
}).strict();

export const AnamnesisTemplateUncheckedUpdateWithoutQuestionsInputSchema: z.ZodType<Prisma.AnamnesisTemplateUncheckedUpdateWithoutQuestionsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  organizationId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  patientAnamneses: z.lazy(() => PatientAnamnesisUncheckedUpdateManyWithoutTemplateNestedInputSchema).optional(),
  Anamnesis: z.lazy(() => AnamnesisUncheckedUpdateManyWithoutTemplateNestedInputSchema).optional()
}).strict();

export const AnamnesisAnswerUpsertWithWhereUniqueWithoutQuestionInputSchema: z.ZodType<Prisma.AnamnesisAnswerUpsertWithWhereUniqueWithoutQuestionInput> = z.object({
  where: z.lazy(() => AnamnesisAnswerWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AnamnesisAnswerUpdateWithoutQuestionInputSchema),z.lazy(() => AnamnesisAnswerUncheckedUpdateWithoutQuestionInputSchema) ]),
  create: z.union([ z.lazy(() => AnamnesisAnswerCreateWithoutQuestionInputSchema),z.lazy(() => AnamnesisAnswerUncheckedCreateWithoutQuestionInputSchema) ]),
}).strict();

export const AnamnesisAnswerUpdateWithWhereUniqueWithoutQuestionInputSchema: z.ZodType<Prisma.AnamnesisAnswerUpdateWithWhereUniqueWithoutQuestionInput> = z.object({
  where: z.lazy(() => AnamnesisAnswerWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AnamnesisAnswerUpdateWithoutQuestionInputSchema),z.lazy(() => AnamnesisAnswerUncheckedUpdateWithoutQuestionInputSchema) ]),
}).strict();

export const AnamnesisAnswerUpdateManyWithWhereWithoutQuestionInputSchema: z.ZodType<Prisma.AnamnesisAnswerUpdateManyWithWhereWithoutQuestionInput> = z.object({
  where: z.lazy(() => AnamnesisAnswerScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AnamnesisAnswerUpdateManyMutationInputSchema),z.lazy(() => AnamnesisAnswerUncheckedUpdateManyWithoutQuestionInputSchema) ]),
}).strict();

export const PatientCreateWithoutPatientAnamnesisInputSchema: z.ZodType<Prisma.PatientCreateWithoutPatientAnamnesisInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  email: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  birthDate: z.coerce.date(),
  address: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  organization: z.lazy(() => OrganizationCreateNestedOneWithoutPatientsInputSchema),
  medicalRecord: z.lazy(() => MedicalRecordCreateNestedOneWithoutPatientInputSchema).optional(),
  appointments: z.lazy(() => AppointmentCreateNestedManyWithoutPatientInputSchema).optional(),
  FinancialTransaction: z.lazy(() => FinancialTransactionCreateNestedManyWithoutPatientInputSchema).optional(),
  CustomerSatisfaction: z.lazy(() => CustomerSatisfactionCreateNestedManyWithoutPatientInputSchema).optional()
}).strict();

export const PatientUncheckedCreateWithoutPatientAnamnesisInputSchema: z.ZodType<Prisma.PatientUncheckedCreateWithoutPatientAnamnesisInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  email: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  birthDate: z.coerce.date(),
  address: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  organizationId: z.string(),
  medicalRecord: z.lazy(() => MedicalRecordUncheckedCreateNestedOneWithoutPatientInputSchema).optional(),
  appointments: z.lazy(() => AppointmentUncheckedCreateNestedManyWithoutPatientInputSchema).optional(),
  FinancialTransaction: z.lazy(() => FinancialTransactionUncheckedCreateNestedManyWithoutPatientInputSchema).optional(),
  CustomerSatisfaction: z.lazy(() => CustomerSatisfactionUncheckedCreateNestedManyWithoutPatientInputSchema).optional()
}).strict();

export const PatientCreateOrConnectWithoutPatientAnamnesisInputSchema: z.ZodType<Prisma.PatientCreateOrConnectWithoutPatientAnamnesisInput> = z.object({
  where: z.lazy(() => PatientWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PatientCreateWithoutPatientAnamnesisInputSchema),z.lazy(() => PatientUncheckedCreateWithoutPatientAnamnesisInputSchema) ]),
}).strict();

export const AnamnesisTemplateCreateWithoutPatientAnamnesesInputSchema: z.ZodType<Prisma.AnamnesisTemplateCreateWithoutPatientAnamnesesInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  organization: z.lazy(() => OrganizationCreateNestedOneWithoutAnamnesisTemplateInputSchema),
  questions: z.lazy(() => AnamnesisQuestionCreateNestedManyWithoutTemplateInputSchema).optional(),
  Anamnesis: z.lazy(() => AnamnesisCreateNestedManyWithoutTemplateInputSchema).optional()
}).strict();

export const AnamnesisTemplateUncheckedCreateWithoutPatientAnamnesesInputSchema: z.ZodType<Prisma.AnamnesisTemplateUncheckedCreateWithoutPatientAnamnesesInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  organizationId: z.string(),
  questions: z.lazy(() => AnamnesisQuestionUncheckedCreateNestedManyWithoutTemplateInputSchema).optional(),
  Anamnesis: z.lazy(() => AnamnesisUncheckedCreateNestedManyWithoutTemplateInputSchema).optional()
}).strict();

export const AnamnesisTemplateCreateOrConnectWithoutPatientAnamnesesInputSchema: z.ZodType<Prisma.AnamnesisTemplateCreateOrConnectWithoutPatientAnamnesesInput> = z.object({
  where: z.lazy(() => AnamnesisTemplateWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AnamnesisTemplateCreateWithoutPatientAnamnesesInputSchema),z.lazy(() => AnamnesisTemplateUncheckedCreateWithoutPatientAnamnesesInputSchema) ]),
}).strict();

export const AnamnesisAnswerCreateWithoutPatientAnamnesisInputSchema: z.ZodType<Prisma.AnamnesisAnswerCreateWithoutPatientAnamnesisInput> = z.object({
  id: z.string().optional(),
  answer: z.string(),
  question: z.lazy(() => AnamnesisQuestionCreateNestedOneWithoutAnswersInputSchema),
  Anamnesis: z.lazy(() => AnamnesisCreateNestedOneWithoutAnswersInputSchema).optional()
}).strict();

export const AnamnesisAnswerUncheckedCreateWithoutPatientAnamnesisInputSchema: z.ZodType<Prisma.AnamnesisAnswerUncheckedCreateWithoutPatientAnamnesisInput> = z.object({
  id: z.string().optional(),
  answer: z.string(),
  questionId: z.string(),
  anamnesisId: z.string().optional().nullable()
}).strict();

export const AnamnesisAnswerCreateOrConnectWithoutPatientAnamnesisInputSchema: z.ZodType<Prisma.AnamnesisAnswerCreateOrConnectWithoutPatientAnamnesisInput> = z.object({
  where: z.lazy(() => AnamnesisAnswerWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AnamnesisAnswerCreateWithoutPatientAnamnesisInputSchema),z.lazy(() => AnamnesisAnswerUncheckedCreateWithoutPatientAnamnesisInputSchema) ]),
}).strict();

export const AnamnesisAnswerCreateManyPatientAnamnesisInputEnvelopeSchema: z.ZodType<Prisma.AnamnesisAnswerCreateManyPatientAnamnesisInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => AnamnesisAnswerCreateManyPatientAnamnesisInputSchema),z.lazy(() => AnamnesisAnswerCreateManyPatientAnamnesisInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const PatientUpsertWithoutPatientAnamnesisInputSchema: z.ZodType<Prisma.PatientUpsertWithoutPatientAnamnesisInput> = z.object({
  update: z.union([ z.lazy(() => PatientUpdateWithoutPatientAnamnesisInputSchema),z.lazy(() => PatientUncheckedUpdateWithoutPatientAnamnesisInputSchema) ]),
  create: z.union([ z.lazy(() => PatientCreateWithoutPatientAnamnesisInputSchema),z.lazy(() => PatientUncheckedCreateWithoutPatientAnamnesisInputSchema) ]),
  where: z.lazy(() => PatientWhereInputSchema).optional()
}).strict();

export const PatientUpdateToOneWithWhereWithoutPatientAnamnesisInputSchema: z.ZodType<Prisma.PatientUpdateToOneWithWhereWithoutPatientAnamnesisInput> = z.object({
  where: z.lazy(() => PatientWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PatientUpdateWithoutPatientAnamnesisInputSchema),z.lazy(() => PatientUncheckedUpdateWithoutPatientAnamnesisInputSchema) ]),
}).strict();

export const PatientUpdateWithoutPatientAnamnesisInputSchema: z.ZodType<Prisma.PatientUpdateWithoutPatientAnamnesisInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  birthDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  organization: z.lazy(() => OrganizationUpdateOneRequiredWithoutPatientsNestedInputSchema).optional(),
  medicalRecord: z.lazy(() => MedicalRecordUpdateOneWithoutPatientNestedInputSchema).optional(),
  appointments: z.lazy(() => AppointmentUpdateManyWithoutPatientNestedInputSchema).optional(),
  FinancialTransaction: z.lazy(() => FinancialTransactionUpdateManyWithoutPatientNestedInputSchema).optional(),
  CustomerSatisfaction: z.lazy(() => CustomerSatisfactionUpdateManyWithoutPatientNestedInputSchema).optional()
}).strict();

export const PatientUncheckedUpdateWithoutPatientAnamnesisInputSchema: z.ZodType<Prisma.PatientUncheckedUpdateWithoutPatientAnamnesisInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  birthDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  organizationId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  medicalRecord: z.lazy(() => MedicalRecordUncheckedUpdateOneWithoutPatientNestedInputSchema).optional(),
  appointments: z.lazy(() => AppointmentUncheckedUpdateManyWithoutPatientNestedInputSchema).optional(),
  FinancialTransaction: z.lazy(() => FinancialTransactionUncheckedUpdateManyWithoutPatientNestedInputSchema).optional(),
  CustomerSatisfaction: z.lazy(() => CustomerSatisfactionUncheckedUpdateManyWithoutPatientNestedInputSchema).optional()
}).strict();

export const AnamnesisTemplateUpsertWithoutPatientAnamnesesInputSchema: z.ZodType<Prisma.AnamnesisTemplateUpsertWithoutPatientAnamnesesInput> = z.object({
  update: z.union([ z.lazy(() => AnamnesisTemplateUpdateWithoutPatientAnamnesesInputSchema),z.lazy(() => AnamnesisTemplateUncheckedUpdateWithoutPatientAnamnesesInputSchema) ]),
  create: z.union([ z.lazy(() => AnamnesisTemplateCreateWithoutPatientAnamnesesInputSchema),z.lazy(() => AnamnesisTemplateUncheckedCreateWithoutPatientAnamnesesInputSchema) ]),
  where: z.lazy(() => AnamnesisTemplateWhereInputSchema).optional()
}).strict();

export const AnamnesisTemplateUpdateToOneWithWhereWithoutPatientAnamnesesInputSchema: z.ZodType<Prisma.AnamnesisTemplateUpdateToOneWithWhereWithoutPatientAnamnesesInput> = z.object({
  where: z.lazy(() => AnamnesisTemplateWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => AnamnesisTemplateUpdateWithoutPatientAnamnesesInputSchema),z.lazy(() => AnamnesisTemplateUncheckedUpdateWithoutPatientAnamnesesInputSchema) ]),
}).strict();

export const AnamnesisTemplateUpdateWithoutPatientAnamnesesInputSchema: z.ZodType<Prisma.AnamnesisTemplateUpdateWithoutPatientAnamnesesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  organization: z.lazy(() => OrganizationUpdateOneRequiredWithoutAnamnesisTemplateNestedInputSchema).optional(),
  questions: z.lazy(() => AnamnesisQuestionUpdateManyWithoutTemplateNestedInputSchema).optional(),
  Anamnesis: z.lazy(() => AnamnesisUpdateManyWithoutTemplateNestedInputSchema).optional()
}).strict();

export const AnamnesisTemplateUncheckedUpdateWithoutPatientAnamnesesInputSchema: z.ZodType<Prisma.AnamnesisTemplateUncheckedUpdateWithoutPatientAnamnesesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  organizationId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  questions: z.lazy(() => AnamnesisQuestionUncheckedUpdateManyWithoutTemplateNestedInputSchema).optional(),
  Anamnesis: z.lazy(() => AnamnesisUncheckedUpdateManyWithoutTemplateNestedInputSchema).optional()
}).strict();

export const AnamnesisAnswerUpsertWithWhereUniqueWithoutPatientAnamnesisInputSchema: z.ZodType<Prisma.AnamnesisAnswerUpsertWithWhereUniqueWithoutPatientAnamnesisInput> = z.object({
  where: z.lazy(() => AnamnesisAnswerWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AnamnesisAnswerUpdateWithoutPatientAnamnesisInputSchema),z.lazy(() => AnamnesisAnswerUncheckedUpdateWithoutPatientAnamnesisInputSchema) ]),
  create: z.union([ z.lazy(() => AnamnesisAnswerCreateWithoutPatientAnamnesisInputSchema),z.lazy(() => AnamnesisAnswerUncheckedCreateWithoutPatientAnamnesisInputSchema) ]),
}).strict();

export const AnamnesisAnswerUpdateWithWhereUniqueWithoutPatientAnamnesisInputSchema: z.ZodType<Prisma.AnamnesisAnswerUpdateWithWhereUniqueWithoutPatientAnamnesisInput> = z.object({
  where: z.lazy(() => AnamnesisAnswerWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AnamnesisAnswerUpdateWithoutPatientAnamnesisInputSchema),z.lazy(() => AnamnesisAnswerUncheckedUpdateWithoutPatientAnamnesisInputSchema) ]),
}).strict();

export const AnamnesisAnswerUpdateManyWithWhereWithoutPatientAnamnesisInputSchema: z.ZodType<Prisma.AnamnesisAnswerUpdateManyWithWhereWithoutPatientAnamnesisInput> = z.object({
  where: z.lazy(() => AnamnesisAnswerScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AnamnesisAnswerUpdateManyMutationInputSchema),z.lazy(() => AnamnesisAnswerUncheckedUpdateManyWithoutPatientAnamnesisInputSchema) ]),
}).strict();

export const AnamnesisQuestionCreateWithoutAnswersInputSchema: z.ZodType<Prisma.AnamnesisQuestionCreateWithoutAnswersInput> = z.object({
  id: z.string().optional(),
  question: z.string(),
  type: z.lazy(() => QuestionTypeSchema),
  template: z.lazy(() => AnamnesisTemplateCreateNestedOneWithoutQuestionsInputSchema)
}).strict();

export const AnamnesisQuestionUncheckedCreateWithoutAnswersInputSchema: z.ZodType<Prisma.AnamnesisQuestionUncheckedCreateWithoutAnswersInput> = z.object({
  id: z.string().optional(),
  question: z.string(),
  type: z.lazy(() => QuestionTypeSchema),
  templateId: z.string()
}).strict();

export const AnamnesisQuestionCreateOrConnectWithoutAnswersInputSchema: z.ZodType<Prisma.AnamnesisQuestionCreateOrConnectWithoutAnswersInput> = z.object({
  where: z.lazy(() => AnamnesisQuestionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AnamnesisQuestionCreateWithoutAnswersInputSchema),z.lazy(() => AnamnesisQuestionUncheckedCreateWithoutAnswersInputSchema) ]),
}).strict();

export const PatientAnamnesisCreateWithoutAnswersInputSchema: z.ZodType<Prisma.PatientAnamnesisCreateWithoutAnswersInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  patient: z.lazy(() => PatientCreateNestedOneWithoutPatientAnamnesisInputSchema),
  template: z.lazy(() => AnamnesisTemplateCreateNestedOneWithoutPatientAnamnesesInputSchema)
}).strict();

export const PatientAnamnesisUncheckedCreateWithoutAnswersInputSchema: z.ZodType<Prisma.PatientAnamnesisUncheckedCreateWithoutAnswersInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  patientId: z.string(),
  templateId: z.string()
}).strict();

export const PatientAnamnesisCreateOrConnectWithoutAnswersInputSchema: z.ZodType<Prisma.PatientAnamnesisCreateOrConnectWithoutAnswersInput> = z.object({
  where: z.lazy(() => PatientAnamnesisWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PatientAnamnesisCreateWithoutAnswersInputSchema),z.lazy(() => PatientAnamnesisUncheckedCreateWithoutAnswersInputSchema) ]),
}).strict();

export const AnamnesisCreateWithoutAnswersInputSchema: z.ZodType<Prisma.AnamnesisCreateWithoutAnswersInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  medicalRecord: z.lazy(() => MedicalRecordCreateNestedOneWithoutAnamnesesInputSchema),
  template: z.lazy(() => AnamnesisTemplateCreateNestedOneWithoutAnamnesisInputSchema)
}).strict();

export const AnamnesisUncheckedCreateWithoutAnswersInputSchema: z.ZodType<Prisma.AnamnesisUncheckedCreateWithoutAnswersInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  medicalRecordId: z.string(),
  templateId: z.string()
}).strict();

export const AnamnesisCreateOrConnectWithoutAnswersInputSchema: z.ZodType<Prisma.AnamnesisCreateOrConnectWithoutAnswersInput> = z.object({
  where: z.lazy(() => AnamnesisWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AnamnesisCreateWithoutAnswersInputSchema),z.lazy(() => AnamnesisUncheckedCreateWithoutAnswersInputSchema) ]),
}).strict();

export const AnamnesisQuestionUpsertWithoutAnswersInputSchema: z.ZodType<Prisma.AnamnesisQuestionUpsertWithoutAnswersInput> = z.object({
  update: z.union([ z.lazy(() => AnamnesisQuestionUpdateWithoutAnswersInputSchema),z.lazy(() => AnamnesisQuestionUncheckedUpdateWithoutAnswersInputSchema) ]),
  create: z.union([ z.lazy(() => AnamnesisQuestionCreateWithoutAnswersInputSchema),z.lazy(() => AnamnesisQuestionUncheckedCreateWithoutAnswersInputSchema) ]),
  where: z.lazy(() => AnamnesisQuestionWhereInputSchema).optional()
}).strict();

export const AnamnesisQuestionUpdateToOneWithWhereWithoutAnswersInputSchema: z.ZodType<Prisma.AnamnesisQuestionUpdateToOneWithWhereWithoutAnswersInput> = z.object({
  where: z.lazy(() => AnamnesisQuestionWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => AnamnesisQuestionUpdateWithoutAnswersInputSchema),z.lazy(() => AnamnesisQuestionUncheckedUpdateWithoutAnswersInputSchema) ]),
}).strict();

export const AnamnesisQuestionUpdateWithoutAnswersInputSchema: z.ZodType<Prisma.AnamnesisQuestionUpdateWithoutAnswersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  question: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => QuestionTypeSchema),z.lazy(() => EnumQuestionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  template: z.lazy(() => AnamnesisTemplateUpdateOneRequiredWithoutQuestionsNestedInputSchema).optional()
}).strict();

export const AnamnesisQuestionUncheckedUpdateWithoutAnswersInputSchema: z.ZodType<Prisma.AnamnesisQuestionUncheckedUpdateWithoutAnswersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  question: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => QuestionTypeSchema),z.lazy(() => EnumQuestionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  templateId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PatientAnamnesisUpsertWithoutAnswersInputSchema: z.ZodType<Prisma.PatientAnamnesisUpsertWithoutAnswersInput> = z.object({
  update: z.union([ z.lazy(() => PatientAnamnesisUpdateWithoutAnswersInputSchema),z.lazy(() => PatientAnamnesisUncheckedUpdateWithoutAnswersInputSchema) ]),
  create: z.union([ z.lazy(() => PatientAnamnesisCreateWithoutAnswersInputSchema),z.lazy(() => PatientAnamnesisUncheckedCreateWithoutAnswersInputSchema) ]),
  where: z.lazy(() => PatientAnamnesisWhereInputSchema).optional()
}).strict();

export const PatientAnamnesisUpdateToOneWithWhereWithoutAnswersInputSchema: z.ZodType<Prisma.PatientAnamnesisUpdateToOneWithWhereWithoutAnswersInput> = z.object({
  where: z.lazy(() => PatientAnamnesisWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PatientAnamnesisUpdateWithoutAnswersInputSchema),z.lazy(() => PatientAnamnesisUncheckedUpdateWithoutAnswersInputSchema) ]),
}).strict();

export const PatientAnamnesisUpdateWithoutAnswersInputSchema: z.ZodType<Prisma.PatientAnamnesisUpdateWithoutAnswersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  patient: z.lazy(() => PatientUpdateOneRequiredWithoutPatientAnamnesisNestedInputSchema).optional(),
  template: z.lazy(() => AnamnesisTemplateUpdateOneRequiredWithoutPatientAnamnesesNestedInputSchema).optional()
}).strict();

export const PatientAnamnesisUncheckedUpdateWithoutAnswersInputSchema: z.ZodType<Prisma.PatientAnamnesisUncheckedUpdateWithoutAnswersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  patientId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  templateId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AnamnesisUpsertWithoutAnswersInputSchema: z.ZodType<Prisma.AnamnesisUpsertWithoutAnswersInput> = z.object({
  update: z.union([ z.lazy(() => AnamnesisUpdateWithoutAnswersInputSchema),z.lazy(() => AnamnesisUncheckedUpdateWithoutAnswersInputSchema) ]),
  create: z.union([ z.lazy(() => AnamnesisCreateWithoutAnswersInputSchema),z.lazy(() => AnamnesisUncheckedCreateWithoutAnswersInputSchema) ]),
  where: z.lazy(() => AnamnesisWhereInputSchema).optional()
}).strict();

export const AnamnesisUpdateToOneWithWhereWithoutAnswersInputSchema: z.ZodType<Prisma.AnamnesisUpdateToOneWithWhereWithoutAnswersInput> = z.object({
  where: z.lazy(() => AnamnesisWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => AnamnesisUpdateWithoutAnswersInputSchema),z.lazy(() => AnamnesisUncheckedUpdateWithoutAnswersInputSchema) ]),
}).strict();

export const AnamnesisUpdateWithoutAnswersInputSchema: z.ZodType<Prisma.AnamnesisUpdateWithoutAnswersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  medicalRecord: z.lazy(() => MedicalRecordUpdateOneRequiredWithoutAnamnesesNestedInputSchema).optional(),
  template: z.lazy(() => AnamnesisTemplateUpdateOneRequiredWithoutAnamnesisNestedInputSchema).optional()
}).strict();

export const AnamnesisUncheckedUpdateWithoutAnswersInputSchema: z.ZodType<Prisma.AnamnesisUncheckedUpdateWithoutAnswersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  medicalRecordId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  templateId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PatientCreateWithoutAppointmentsInputSchema: z.ZodType<Prisma.PatientCreateWithoutAppointmentsInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  email: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  birthDate: z.coerce.date(),
  address: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  organization: z.lazy(() => OrganizationCreateNestedOneWithoutPatientsInputSchema),
  medicalRecord: z.lazy(() => MedicalRecordCreateNestedOneWithoutPatientInputSchema).optional(),
  FinancialTransaction: z.lazy(() => FinancialTransactionCreateNestedManyWithoutPatientInputSchema).optional(),
  CustomerSatisfaction: z.lazy(() => CustomerSatisfactionCreateNestedManyWithoutPatientInputSchema).optional(),
  PatientAnamnesis: z.lazy(() => PatientAnamnesisCreateNestedManyWithoutPatientInputSchema).optional()
}).strict();

export const PatientUncheckedCreateWithoutAppointmentsInputSchema: z.ZodType<Prisma.PatientUncheckedCreateWithoutAppointmentsInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  email: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  birthDate: z.coerce.date(),
  address: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  organizationId: z.string(),
  medicalRecord: z.lazy(() => MedicalRecordUncheckedCreateNestedOneWithoutPatientInputSchema).optional(),
  FinancialTransaction: z.lazy(() => FinancialTransactionUncheckedCreateNestedManyWithoutPatientInputSchema).optional(),
  CustomerSatisfaction: z.lazy(() => CustomerSatisfactionUncheckedCreateNestedManyWithoutPatientInputSchema).optional(),
  PatientAnamnesis: z.lazy(() => PatientAnamnesisUncheckedCreateNestedManyWithoutPatientInputSchema).optional()
}).strict();

export const PatientCreateOrConnectWithoutAppointmentsInputSchema: z.ZodType<Prisma.PatientCreateOrConnectWithoutAppointmentsInput> = z.object({
  where: z.lazy(() => PatientWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PatientCreateWithoutAppointmentsInputSchema),z.lazy(() => PatientUncheckedCreateWithoutAppointmentsInputSchema) ]),
}).strict();

export const MemberCreateWithoutAppointmentsInputSchema: z.ZodType<Prisma.MemberCreateWithoutAppointmentsInput> = z.object({
  id: z.string().optional(),
  role: z.lazy(() => RoleSchema).optional(),
  specialty: z.string().optional().nullable(),
  organization: z.lazy(() => OrganizationCreateNestedOneWithoutMembersInputSchema),
  user: z.lazy(() => UserCreateNestedOneWithoutMember_onInputSchema)
}).strict();

export const MemberUncheckedCreateWithoutAppointmentsInputSchema: z.ZodType<Prisma.MemberUncheckedCreateWithoutAppointmentsInput> = z.object({
  id: z.string().optional(),
  role: z.lazy(() => RoleSchema).optional(),
  specialty: z.string().optional().nullable(),
  organizationId: z.string(),
  userId: z.string()
}).strict();

export const MemberCreateOrConnectWithoutAppointmentsInputSchema: z.ZodType<Prisma.MemberCreateOrConnectWithoutAppointmentsInput> = z.object({
  where: z.lazy(() => MemberWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MemberCreateWithoutAppointmentsInputSchema),z.lazy(() => MemberUncheckedCreateWithoutAppointmentsInputSchema) ]),
}).strict();

export const PatientUpsertWithoutAppointmentsInputSchema: z.ZodType<Prisma.PatientUpsertWithoutAppointmentsInput> = z.object({
  update: z.union([ z.lazy(() => PatientUpdateWithoutAppointmentsInputSchema),z.lazy(() => PatientUncheckedUpdateWithoutAppointmentsInputSchema) ]),
  create: z.union([ z.lazy(() => PatientCreateWithoutAppointmentsInputSchema),z.lazy(() => PatientUncheckedCreateWithoutAppointmentsInputSchema) ]),
  where: z.lazy(() => PatientWhereInputSchema).optional()
}).strict();

export const PatientUpdateToOneWithWhereWithoutAppointmentsInputSchema: z.ZodType<Prisma.PatientUpdateToOneWithWhereWithoutAppointmentsInput> = z.object({
  where: z.lazy(() => PatientWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PatientUpdateWithoutAppointmentsInputSchema),z.lazy(() => PatientUncheckedUpdateWithoutAppointmentsInputSchema) ]),
}).strict();

export const PatientUpdateWithoutAppointmentsInputSchema: z.ZodType<Prisma.PatientUpdateWithoutAppointmentsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  birthDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  organization: z.lazy(() => OrganizationUpdateOneRequiredWithoutPatientsNestedInputSchema).optional(),
  medicalRecord: z.lazy(() => MedicalRecordUpdateOneWithoutPatientNestedInputSchema).optional(),
  FinancialTransaction: z.lazy(() => FinancialTransactionUpdateManyWithoutPatientNestedInputSchema).optional(),
  CustomerSatisfaction: z.lazy(() => CustomerSatisfactionUpdateManyWithoutPatientNestedInputSchema).optional(),
  PatientAnamnesis: z.lazy(() => PatientAnamnesisUpdateManyWithoutPatientNestedInputSchema).optional()
}).strict();

export const PatientUncheckedUpdateWithoutAppointmentsInputSchema: z.ZodType<Prisma.PatientUncheckedUpdateWithoutAppointmentsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  birthDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  organizationId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  medicalRecord: z.lazy(() => MedicalRecordUncheckedUpdateOneWithoutPatientNestedInputSchema).optional(),
  FinancialTransaction: z.lazy(() => FinancialTransactionUncheckedUpdateManyWithoutPatientNestedInputSchema).optional(),
  CustomerSatisfaction: z.lazy(() => CustomerSatisfactionUncheckedUpdateManyWithoutPatientNestedInputSchema).optional(),
  PatientAnamnesis: z.lazy(() => PatientAnamnesisUncheckedUpdateManyWithoutPatientNestedInputSchema).optional()
}).strict();

export const MemberUpsertWithoutAppointmentsInputSchema: z.ZodType<Prisma.MemberUpsertWithoutAppointmentsInput> = z.object({
  update: z.union([ z.lazy(() => MemberUpdateWithoutAppointmentsInputSchema),z.lazy(() => MemberUncheckedUpdateWithoutAppointmentsInputSchema) ]),
  create: z.union([ z.lazy(() => MemberCreateWithoutAppointmentsInputSchema),z.lazy(() => MemberUncheckedCreateWithoutAppointmentsInputSchema) ]),
  where: z.lazy(() => MemberWhereInputSchema).optional()
}).strict();

export const MemberUpdateToOneWithWhereWithoutAppointmentsInputSchema: z.ZodType<Prisma.MemberUpdateToOneWithWhereWithoutAppointmentsInput> = z.object({
  where: z.lazy(() => MemberWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => MemberUpdateWithoutAppointmentsInputSchema),z.lazy(() => MemberUncheckedUpdateWithoutAppointmentsInputSchema) ]),
}).strict();

export const MemberUpdateWithoutAppointmentsInputSchema: z.ZodType<Prisma.MemberUpdateWithoutAppointmentsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  specialty: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  organization: z.lazy(() => OrganizationUpdateOneRequiredWithoutMembersNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutMember_onNestedInputSchema).optional()
}).strict();

export const MemberUncheckedUpdateWithoutAppointmentsInputSchema: z.ZodType<Prisma.MemberUncheckedUpdateWithoutAppointmentsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  specialty: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  organizationId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserCreateWithoutOwns_organizationsInputSchema: z.ZodType<Prisma.UserCreateWithoutOwns_organizationsInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string(),
  passwordHash: z.string().optional().nullable(),
  avatarUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tokens: z.lazy(() => TokenCreateNestedManyWithoutUserInputSchema).optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  invites: z.lazy(() => InviteCreateNestedManyWithoutAuthorInputSchema).optional(),
  member_on: z.lazy(() => MemberCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutOwns_organizationsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutOwns_organizationsInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string(),
  passwordHash: z.string().optional().nullable(),
  avatarUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tokens: z.lazy(() => TokenUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  invites: z.lazy(() => InviteUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  member_on: z.lazy(() => MemberUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutOwns_organizationsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutOwns_organizationsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutOwns_organizationsInputSchema),z.lazy(() => UserUncheckedCreateWithoutOwns_organizationsInputSchema) ]),
}).strict();

export const InviteCreateWithoutOrganizationInputSchema: z.ZodType<Prisma.InviteCreateWithoutOrganizationInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  role: z.lazy(() => RoleSchema),
  createdAt: z.coerce.date().optional(),
  author: z.lazy(() => UserCreateNestedOneWithoutInvitesInputSchema).optional()
}).strict();

export const InviteUncheckedCreateWithoutOrganizationInputSchema: z.ZodType<Prisma.InviteUncheckedCreateWithoutOrganizationInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  role: z.lazy(() => RoleSchema),
  createdAt: z.coerce.date().optional(),
  authorId: z.string().optional().nullable()
}).strict();

export const InviteCreateOrConnectWithoutOrganizationInputSchema: z.ZodType<Prisma.InviteCreateOrConnectWithoutOrganizationInput> = z.object({
  where: z.lazy(() => InviteWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => InviteCreateWithoutOrganizationInputSchema),z.lazy(() => InviteUncheckedCreateWithoutOrganizationInputSchema) ]),
}).strict();

export const InviteCreateManyOrganizationInputEnvelopeSchema: z.ZodType<Prisma.InviteCreateManyOrganizationInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => InviteCreateManyOrganizationInputSchema),z.lazy(() => InviteCreateManyOrganizationInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const MemberCreateWithoutOrganizationInputSchema: z.ZodType<Prisma.MemberCreateWithoutOrganizationInput> = z.object({
  id: z.string().optional(),
  role: z.lazy(() => RoleSchema).optional(),
  specialty: z.string().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutMember_onInputSchema),
  appointments: z.lazy(() => AppointmentCreateNestedManyWithoutMemberInputSchema).optional()
}).strict();

export const MemberUncheckedCreateWithoutOrganizationInputSchema: z.ZodType<Prisma.MemberUncheckedCreateWithoutOrganizationInput> = z.object({
  id: z.string().optional(),
  role: z.lazy(() => RoleSchema).optional(),
  specialty: z.string().optional().nullable(),
  userId: z.string(),
  appointments: z.lazy(() => AppointmentUncheckedCreateNestedManyWithoutMemberInputSchema).optional()
}).strict();

export const MemberCreateOrConnectWithoutOrganizationInputSchema: z.ZodType<Prisma.MemberCreateOrConnectWithoutOrganizationInput> = z.object({
  where: z.lazy(() => MemberWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MemberCreateWithoutOrganizationInputSchema),z.lazy(() => MemberUncheckedCreateWithoutOrganizationInputSchema) ]),
}).strict();

export const MemberCreateManyOrganizationInputEnvelopeSchema: z.ZodType<Prisma.MemberCreateManyOrganizationInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => MemberCreateManyOrganizationInputSchema),z.lazy(() => MemberCreateManyOrganizationInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const PatientCreateWithoutOrganizationInputSchema: z.ZodType<Prisma.PatientCreateWithoutOrganizationInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  email: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  birthDate: z.coerce.date(),
  address: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  medicalRecord: z.lazy(() => MedicalRecordCreateNestedOneWithoutPatientInputSchema).optional(),
  appointments: z.lazy(() => AppointmentCreateNestedManyWithoutPatientInputSchema).optional(),
  FinancialTransaction: z.lazy(() => FinancialTransactionCreateNestedManyWithoutPatientInputSchema).optional(),
  CustomerSatisfaction: z.lazy(() => CustomerSatisfactionCreateNestedManyWithoutPatientInputSchema).optional(),
  PatientAnamnesis: z.lazy(() => PatientAnamnesisCreateNestedManyWithoutPatientInputSchema).optional()
}).strict();

export const PatientUncheckedCreateWithoutOrganizationInputSchema: z.ZodType<Prisma.PatientUncheckedCreateWithoutOrganizationInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  email: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  birthDate: z.coerce.date(),
  address: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  medicalRecord: z.lazy(() => MedicalRecordUncheckedCreateNestedOneWithoutPatientInputSchema).optional(),
  appointments: z.lazy(() => AppointmentUncheckedCreateNestedManyWithoutPatientInputSchema).optional(),
  FinancialTransaction: z.lazy(() => FinancialTransactionUncheckedCreateNestedManyWithoutPatientInputSchema).optional(),
  CustomerSatisfaction: z.lazy(() => CustomerSatisfactionUncheckedCreateNestedManyWithoutPatientInputSchema).optional(),
  PatientAnamnesis: z.lazy(() => PatientAnamnesisUncheckedCreateNestedManyWithoutPatientInputSchema).optional()
}).strict();

export const PatientCreateOrConnectWithoutOrganizationInputSchema: z.ZodType<Prisma.PatientCreateOrConnectWithoutOrganizationInput> = z.object({
  where: z.lazy(() => PatientWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PatientCreateWithoutOrganizationInputSchema),z.lazy(() => PatientUncheckedCreateWithoutOrganizationInputSchema) ]),
}).strict();

export const PatientCreateManyOrganizationInputEnvelopeSchema: z.ZodType<Prisma.PatientCreateManyOrganizationInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => PatientCreateManyOrganizationInputSchema),z.lazy(() => PatientCreateManyOrganizationInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const FinancialTransactionCreateWithoutOrganizationInputSchema: z.ZodType<Prisma.FinancialTransactionCreateWithoutOrganizationInput> = z.object({
  id: z.string().optional(),
  description: z.string(),
  amount: z.string(),
  type: z.lazy(() => TransactionTypeSchema),
  paymentMethod: z.lazy(() => PaymentMethodSchema),
  date: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  patient: z.lazy(() => PatientCreateNestedOneWithoutFinancialTransactionInputSchema).optional()
}).strict();

export const FinancialTransactionUncheckedCreateWithoutOrganizationInputSchema: z.ZodType<Prisma.FinancialTransactionUncheckedCreateWithoutOrganizationInput> = z.object({
  id: z.string().optional(),
  description: z.string(),
  amount: z.string(),
  type: z.lazy(() => TransactionTypeSchema),
  paymentMethod: z.lazy(() => PaymentMethodSchema),
  date: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  patientId: z.string().optional().nullable()
}).strict();

export const FinancialTransactionCreateOrConnectWithoutOrganizationInputSchema: z.ZodType<Prisma.FinancialTransactionCreateOrConnectWithoutOrganizationInput> = z.object({
  where: z.lazy(() => FinancialTransactionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FinancialTransactionCreateWithoutOrganizationInputSchema),z.lazy(() => FinancialTransactionUncheckedCreateWithoutOrganizationInputSchema) ]),
}).strict();

export const FinancialTransactionCreateManyOrganizationInputEnvelopeSchema: z.ZodType<Prisma.FinancialTransactionCreateManyOrganizationInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => FinancialTransactionCreateManyOrganizationInputSchema),z.lazy(() => FinancialTransactionCreateManyOrganizationInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const CustomerSatisfactionCreateWithoutOrganizationInputSchema: z.ZodType<Prisma.CustomerSatisfactionCreateWithoutOrganizationInput> = z.object({
  id: z.string().optional(),
  rating: z.number().int(),
  comment: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  patient: z.lazy(() => PatientCreateNestedOneWithoutCustomerSatisfactionInputSchema)
}).strict();

export const CustomerSatisfactionUncheckedCreateWithoutOrganizationInputSchema: z.ZodType<Prisma.CustomerSatisfactionUncheckedCreateWithoutOrganizationInput> = z.object({
  id: z.string().optional(),
  rating: z.number().int(),
  comment: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  patientId: z.string()
}).strict();

export const CustomerSatisfactionCreateOrConnectWithoutOrganizationInputSchema: z.ZodType<Prisma.CustomerSatisfactionCreateOrConnectWithoutOrganizationInput> = z.object({
  where: z.lazy(() => CustomerSatisfactionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CustomerSatisfactionCreateWithoutOrganizationInputSchema),z.lazy(() => CustomerSatisfactionUncheckedCreateWithoutOrganizationInputSchema) ]),
}).strict();

export const CustomerSatisfactionCreateManyOrganizationInputEnvelopeSchema: z.ZodType<Prisma.CustomerSatisfactionCreateManyOrganizationInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => CustomerSatisfactionCreateManyOrganizationInputSchema),z.lazy(() => CustomerSatisfactionCreateManyOrganizationInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const AnamnesisTemplateCreateWithoutOrganizationInputSchema: z.ZodType<Prisma.AnamnesisTemplateCreateWithoutOrganizationInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  questions: z.lazy(() => AnamnesisQuestionCreateNestedManyWithoutTemplateInputSchema).optional(),
  patientAnamneses: z.lazy(() => PatientAnamnesisCreateNestedManyWithoutTemplateInputSchema).optional(),
  Anamnesis: z.lazy(() => AnamnesisCreateNestedManyWithoutTemplateInputSchema).optional()
}).strict();

export const AnamnesisTemplateUncheckedCreateWithoutOrganizationInputSchema: z.ZodType<Prisma.AnamnesisTemplateUncheckedCreateWithoutOrganizationInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  questions: z.lazy(() => AnamnesisQuestionUncheckedCreateNestedManyWithoutTemplateInputSchema).optional(),
  patientAnamneses: z.lazy(() => PatientAnamnesisUncheckedCreateNestedManyWithoutTemplateInputSchema).optional(),
  Anamnesis: z.lazy(() => AnamnesisUncheckedCreateNestedManyWithoutTemplateInputSchema).optional()
}).strict();

export const AnamnesisTemplateCreateOrConnectWithoutOrganizationInputSchema: z.ZodType<Prisma.AnamnesisTemplateCreateOrConnectWithoutOrganizationInput> = z.object({
  where: z.lazy(() => AnamnesisTemplateWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AnamnesisTemplateCreateWithoutOrganizationInputSchema),z.lazy(() => AnamnesisTemplateUncheckedCreateWithoutOrganizationInputSchema) ]),
}).strict();

export const AnamnesisTemplateCreateManyOrganizationInputEnvelopeSchema: z.ZodType<Prisma.AnamnesisTemplateCreateManyOrganizationInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => AnamnesisTemplateCreateManyOrganizationInputSchema),z.lazy(() => AnamnesisTemplateCreateManyOrganizationInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserUpsertWithoutOwns_organizationsInputSchema: z.ZodType<Prisma.UserUpsertWithoutOwns_organizationsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutOwns_organizationsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutOwns_organizationsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutOwns_organizationsInputSchema),z.lazy(() => UserUncheckedCreateWithoutOwns_organizationsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutOwns_organizationsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutOwns_organizationsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutOwns_organizationsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutOwns_organizationsInputSchema) ]),
}).strict();

export const UserUpdateWithoutOwns_organizationsInputSchema: z.ZodType<Prisma.UserUpdateWithoutOwns_organizationsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatarUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tokens: z.lazy(() => TokenUpdateManyWithoutUserNestedInputSchema).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  invites: z.lazy(() => InviteUpdateManyWithoutAuthorNestedInputSchema).optional(),
  member_on: z.lazy(() => MemberUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutOwns_organizationsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutOwns_organizationsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatarUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tokens: z.lazy(() => TokenUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  invites: z.lazy(() => InviteUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  member_on: z.lazy(() => MemberUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const InviteUpsertWithWhereUniqueWithoutOrganizationInputSchema: z.ZodType<Prisma.InviteUpsertWithWhereUniqueWithoutOrganizationInput> = z.object({
  where: z.lazy(() => InviteWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => InviteUpdateWithoutOrganizationInputSchema),z.lazy(() => InviteUncheckedUpdateWithoutOrganizationInputSchema) ]),
  create: z.union([ z.lazy(() => InviteCreateWithoutOrganizationInputSchema),z.lazy(() => InviteUncheckedCreateWithoutOrganizationInputSchema) ]),
}).strict();

export const InviteUpdateWithWhereUniqueWithoutOrganizationInputSchema: z.ZodType<Prisma.InviteUpdateWithWhereUniqueWithoutOrganizationInput> = z.object({
  where: z.lazy(() => InviteWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => InviteUpdateWithoutOrganizationInputSchema),z.lazy(() => InviteUncheckedUpdateWithoutOrganizationInputSchema) ]),
}).strict();

export const InviteUpdateManyWithWhereWithoutOrganizationInputSchema: z.ZodType<Prisma.InviteUpdateManyWithWhereWithoutOrganizationInput> = z.object({
  where: z.lazy(() => InviteScalarWhereInputSchema),
  data: z.union([ z.lazy(() => InviteUpdateManyMutationInputSchema),z.lazy(() => InviteUncheckedUpdateManyWithoutOrganizationInputSchema) ]),
}).strict();

export const MemberUpsertWithWhereUniqueWithoutOrganizationInputSchema: z.ZodType<Prisma.MemberUpsertWithWhereUniqueWithoutOrganizationInput> = z.object({
  where: z.lazy(() => MemberWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => MemberUpdateWithoutOrganizationInputSchema),z.lazy(() => MemberUncheckedUpdateWithoutOrganizationInputSchema) ]),
  create: z.union([ z.lazy(() => MemberCreateWithoutOrganizationInputSchema),z.lazy(() => MemberUncheckedCreateWithoutOrganizationInputSchema) ]),
}).strict();

export const MemberUpdateWithWhereUniqueWithoutOrganizationInputSchema: z.ZodType<Prisma.MemberUpdateWithWhereUniqueWithoutOrganizationInput> = z.object({
  where: z.lazy(() => MemberWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => MemberUpdateWithoutOrganizationInputSchema),z.lazy(() => MemberUncheckedUpdateWithoutOrganizationInputSchema) ]),
}).strict();

export const MemberUpdateManyWithWhereWithoutOrganizationInputSchema: z.ZodType<Prisma.MemberUpdateManyWithWhereWithoutOrganizationInput> = z.object({
  where: z.lazy(() => MemberScalarWhereInputSchema),
  data: z.union([ z.lazy(() => MemberUpdateManyMutationInputSchema),z.lazy(() => MemberUncheckedUpdateManyWithoutOrganizationInputSchema) ]),
}).strict();

export const PatientUpsertWithWhereUniqueWithoutOrganizationInputSchema: z.ZodType<Prisma.PatientUpsertWithWhereUniqueWithoutOrganizationInput> = z.object({
  where: z.lazy(() => PatientWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PatientUpdateWithoutOrganizationInputSchema),z.lazy(() => PatientUncheckedUpdateWithoutOrganizationInputSchema) ]),
  create: z.union([ z.lazy(() => PatientCreateWithoutOrganizationInputSchema),z.lazy(() => PatientUncheckedCreateWithoutOrganizationInputSchema) ]),
}).strict();

export const PatientUpdateWithWhereUniqueWithoutOrganizationInputSchema: z.ZodType<Prisma.PatientUpdateWithWhereUniqueWithoutOrganizationInput> = z.object({
  where: z.lazy(() => PatientWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PatientUpdateWithoutOrganizationInputSchema),z.lazy(() => PatientUncheckedUpdateWithoutOrganizationInputSchema) ]),
}).strict();

export const PatientUpdateManyWithWhereWithoutOrganizationInputSchema: z.ZodType<Prisma.PatientUpdateManyWithWhereWithoutOrganizationInput> = z.object({
  where: z.lazy(() => PatientScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PatientUpdateManyMutationInputSchema),z.lazy(() => PatientUncheckedUpdateManyWithoutOrganizationInputSchema) ]),
}).strict();

export const PatientScalarWhereInputSchema: z.ZodType<Prisma.PatientScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PatientScalarWhereInputSchema),z.lazy(() => PatientScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PatientScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PatientScalarWhereInputSchema),z.lazy(() => PatientScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  phone: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  birthDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  address: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  organizationId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const FinancialTransactionUpsertWithWhereUniqueWithoutOrganizationInputSchema: z.ZodType<Prisma.FinancialTransactionUpsertWithWhereUniqueWithoutOrganizationInput> = z.object({
  where: z.lazy(() => FinancialTransactionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => FinancialTransactionUpdateWithoutOrganizationInputSchema),z.lazy(() => FinancialTransactionUncheckedUpdateWithoutOrganizationInputSchema) ]),
  create: z.union([ z.lazy(() => FinancialTransactionCreateWithoutOrganizationInputSchema),z.lazy(() => FinancialTransactionUncheckedCreateWithoutOrganizationInputSchema) ]),
}).strict();

export const FinancialTransactionUpdateWithWhereUniqueWithoutOrganizationInputSchema: z.ZodType<Prisma.FinancialTransactionUpdateWithWhereUniqueWithoutOrganizationInput> = z.object({
  where: z.lazy(() => FinancialTransactionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => FinancialTransactionUpdateWithoutOrganizationInputSchema),z.lazy(() => FinancialTransactionUncheckedUpdateWithoutOrganizationInputSchema) ]),
}).strict();

export const FinancialTransactionUpdateManyWithWhereWithoutOrganizationInputSchema: z.ZodType<Prisma.FinancialTransactionUpdateManyWithWhereWithoutOrganizationInput> = z.object({
  where: z.lazy(() => FinancialTransactionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => FinancialTransactionUpdateManyMutationInputSchema),z.lazy(() => FinancialTransactionUncheckedUpdateManyWithoutOrganizationInputSchema) ]),
}).strict();

export const CustomerSatisfactionUpsertWithWhereUniqueWithoutOrganizationInputSchema: z.ZodType<Prisma.CustomerSatisfactionUpsertWithWhereUniqueWithoutOrganizationInput> = z.object({
  where: z.lazy(() => CustomerSatisfactionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CustomerSatisfactionUpdateWithoutOrganizationInputSchema),z.lazy(() => CustomerSatisfactionUncheckedUpdateWithoutOrganizationInputSchema) ]),
  create: z.union([ z.lazy(() => CustomerSatisfactionCreateWithoutOrganizationInputSchema),z.lazy(() => CustomerSatisfactionUncheckedCreateWithoutOrganizationInputSchema) ]),
}).strict();

export const CustomerSatisfactionUpdateWithWhereUniqueWithoutOrganizationInputSchema: z.ZodType<Prisma.CustomerSatisfactionUpdateWithWhereUniqueWithoutOrganizationInput> = z.object({
  where: z.lazy(() => CustomerSatisfactionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CustomerSatisfactionUpdateWithoutOrganizationInputSchema),z.lazy(() => CustomerSatisfactionUncheckedUpdateWithoutOrganizationInputSchema) ]),
}).strict();

export const CustomerSatisfactionUpdateManyWithWhereWithoutOrganizationInputSchema: z.ZodType<Prisma.CustomerSatisfactionUpdateManyWithWhereWithoutOrganizationInput> = z.object({
  where: z.lazy(() => CustomerSatisfactionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CustomerSatisfactionUpdateManyMutationInputSchema),z.lazy(() => CustomerSatisfactionUncheckedUpdateManyWithoutOrganizationInputSchema) ]),
}).strict();

export const AnamnesisTemplateUpsertWithWhereUniqueWithoutOrganizationInputSchema: z.ZodType<Prisma.AnamnesisTemplateUpsertWithWhereUniqueWithoutOrganizationInput> = z.object({
  where: z.lazy(() => AnamnesisTemplateWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AnamnesisTemplateUpdateWithoutOrganizationInputSchema),z.lazy(() => AnamnesisTemplateUncheckedUpdateWithoutOrganizationInputSchema) ]),
  create: z.union([ z.lazy(() => AnamnesisTemplateCreateWithoutOrganizationInputSchema),z.lazy(() => AnamnesisTemplateUncheckedCreateWithoutOrganizationInputSchema) ]),
}).strict();

export const AnamnesisTemplateUpdateWithWhereUniqueWithoutOrganizationInputSchema: z.ZodType<Prisma.AnamnesisTemplateUpdateWithWhereUniqueWithoutOrganizationInput> = z.object({
  where: z.lazy(() => AnamnesisTemplateWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AnamnesisTemplateUpdateWithoutOrganizationInputSchema),z.lazy(() => AnamnesisTemplateUncheckedUpdateWithoutOrganizationInputSchema) ]),
}).strict();

export const AnamnesisTemplateUpdateManyWithWhereWithoutOrganizationInputSchema: z.ZodType<Prisma.AnamnesisTemplateUpdateManyWithWhereWithoutOrganizationInput> = z.object({
  where: z.lazy(() => AnamnesisTemplateScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AnamnesisTemplateUpdateManyMutationInputSchema),z.lazy(() => AnamnesisTemplateUncheckedUpdateManyWithoutOrganizationInputSchema) ]),
}).strict();

export const AnamnesisTemplateScalarWhereInputSchema: z.ZodType<Prisma.AnamnesisTemplateScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AnamnesisTemplateScalarWhereInputSchema),z.lazy(() => AnamnesisTemplateScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AnamnesisTemplateScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AnamnesisTemplateScalarWhereInputSchema),z.lazy(() => AnamnesisTemplateScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  organizationId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const OrganizationCreateWithoutFinancialTransactionsInputSchema: z.ZodType<Prisma.OrganizationCreateWithoutFinancialTransactionsInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  slug: z.string(),
  domain: z.string().optional().nullable(),
  shouldAttachUsersByDomain: z.boolean().optional(),
  avatarUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  owner: z.lazy(() => UserCreateNestedOneWithoutOwns_organizationsInputSchema),
  invites: z.lazy(() => InviteCreateNestedManyWithoutOrganizationInputSchema).optional(),
  members: z.lazy(() => MemberCreateNestedManyWithoutOrganizationInputSchema).optional(),
  patients: z.lazy(() => PatientCreateNestedManyWithoutOrganizationInputSchema).optional(),
  customerSatisfactions: z.lazy(() => CustomerSatisfactionCreateNestedManyWithoutOrganizationInputSchema).optional(),
  AnamnesisTemplate: z.lazy(() => AnamnesisTemplateCreateNestedManyWithoutOrganizationInputSchema).optional()
}).strict();

export const OrganizationUncheckedCreateWithoutFinancialTransactionsInputSchema: z.ZodType<Prisma.OrganizationUncheckedCreateWithoutFinancialTransactionsInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  slug: z.string(),
  domain: z.string().optional().nullable(),
  shouldAttachUsersByDomain: z.boolean().optional(),
  avatarUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  ownerId: z.string(),
  invites: z.lazy(() => InviteUncheckedCreateNestedManyWithoutOrganizationInputSchema).optional(),
  members: z.lazy(() => MemberUncheckedCreateNestedManyWithoutOrganizationInputSchema).optional(),
  patients: z.lazy(() => PatientUncheckedCreateNestedManyWithoutOrganizationInputSchema).optional(),
  customerSatisfactions: z.lazy(() => CustomerSatisfactionUncheckedCreateNestedManyWithoutOrganizationInputSchema).optional(),
  AnamnesisTemplate: z.lazy(() => AnamnesisTemplateUncheckedCreateNestedManyWithoutOrganizationInputSchema).optional()
}).strict();

export const OrganizationCreateOrConnectWithoutFinancialTransactionsInputSchema: z.ZodType<Prisma.OrganizationCreateOrConnectWithoutFinancialTransactionsInput> = z.object({
  where: z.lazy(() => OrganizationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => OrganizationCreateWithoutFinancialTransactionsInputSchema),z.lazy(() => OrganizationUncheckedCreateWithoutFinancialTransactionsInputSchema) ]),
}).strict();

export const PatientCreateWithoutFinancialTransactionInputSchema: z.ZodType<Prisma.PatientCreateWithoutFinancialTransactionInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  email: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  birthDate: z.coerce.date(),
  address: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  organization: z.lazy(() => OrganizationCreateNestedOneWithoutPatientsInputSchema),
  medicalRecord: z.lazy(() => MedicalRecordCreateNestedOneWithoutPatientInputSchema).optional(),
  appointments: z.lazy(() => AppointmentCreateNestedManyWithoutPatientInputSchema).optional(),
  CustomerSatisfaction: z.lazy(() => CustomerSatisfactionCreateNestedManyWithoutPatientInputSchema).optional(),
  PatientAnamnesis: z.lazy(() => PatientAnamnesisCreateNestedManyWithoutPatientInputSchema).optional()
}).strict();

export const PatientUncheckedCreateWithoutFinancialTransactionInputSchema: z.ZodType<Prisma.PatientUncheckedCreateWithoutFinancialTransactionInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  email: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  birthDate: z.coerce.date(),
  address: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  organizationId: z.string(),
  medicalRecord: z.lazy(() => MedicalRecordUncheckedCreateNestedOneWithoutPatientInputSchema).optional(),
  appointments: z.lazy(() => AppointmentUncheckedCreateNestedManyWithoutPatientInputSchema).optional(),
  CustomerSatisfaction: z.lazy(() => CustomerSatisfactionUncheckedCreateNestedManyWithoutPatientInputSchema).optional(),
  PatientAnamnesis: z.lazy(() => PatientAnamnesisUncheckedCreateNestedManyWithoutPatientInputSchema).optional()
}).strict();

export const PatientCreateOrConnectWithoutFinancialTransactionInputSchema: z.ZodType<Prisma.PatientCreateOrConnectWithoutFinancialTransactionInput> = z.object({
  where: z.lazy(() => PatientWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PatientCreateWithoutFinancialTransactionInputSchema),z.lazy(() => PatientUncheckedCreateWithoutFinancialTransactionInputSchema) ]),
}).strict();

export const OrganizationUpsertWithoutFinancialTransactionsInputSchema: z.ZodType<Prisma.OrganizationUpsertWithoutFinancialTransactionsInput> = z.object({
  update: z.union([ z.lazy(() => OrganizationUpdateWithoutFinancialTransactionsInputSchema),z.lazy(() => OrganizationUncheckedUpdateWithoutFinancialTransactionsInputSchema) ]),
  create: z.union([ z.lazy(() => OrganizationCreateWithoutFinancialTransactionsInputSchema),z.lazy(() => OrganizationUncheckedCreateWithoutFinancialTransactionsInputSchema) ]),
  where: z.lazy(() => OrganizationWhereInputSchema).optional()
}).strict();

export const OrganizationUpdateToOneWithWhereWithoutFinancialTransactionsInputSchema: z.ZodType<Prisma.OrganizationUpdateToOneWithWhereWithoutFinancialTransactionsInput> = z.object({
  where: z.lazy(() => OrganizationWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => OrganizationUpdateWithoutFinancialTransactionsInputSchema),z.lazy(() => OrganizationUncheckedUpdateWithoutFinancialTransactionsInputSchema) ]),
}).strict();

export const OrganizationUpdateWithoutFinancialTransactionsInputSchema: z.ZodType<Prisma.OrganizationUpdateWithoutFinancialTransactionsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  domain: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  shouldAttachUsersByDomain: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  avatarUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  owner: z.lazy(() => UserUpdateOneRequiredWithoutOwns_organizationsNestedInputSchema).optional(),
  invites: z.lazy(() => InviteUpdateManyWithoutOrganizationNestedInputSchema).optional(),
  members: z.lazy(() => MemberUpdateManyWithoutOrganizationNestedInputSchema).optional(),
  patients: z.lazy(() => PatientUpdateManyWithoutOrganizationNestedInputSchema).optional(),
  customerSatisfactions: z.lazy(() => CustomerSatisfactionUpdateManyWithoutOrganizationNestedInputSchema).optional(),
  AnamnesisTemplate: z.lazy(() => AnamnesisTemplateUpdateManyWithoutOrganizationNestedInputSchema).optional()
}).strict();

export const OrganizationUncheckedUpdateWithoutFinancialTransactionsInputSchema: z.ZodType<Prisma.OrganizationUncheckedUpdateWithoutFinancialTransactionsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  domain: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  shouldAttachUsersByDomain: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  avatarUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ownerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  invites: z.lazy(() => InviteUncheckedUpdateManyWithoutOrganizationNestedInputSchema).optional(),
  members: z.lazy(() => MemberUncheckedUpdateManyWithoutOrganizationNestedInputSchema).optional(),
  patients: z.lazy(() => PatientUncheckedUpdateManyWithoutOrganizationNestedInputSchema).optional(),
  customerSatisfactions: z.lazy(() => CustomerSatisfactionUncheckedUpdateManyWithoutOrganizationNestedInputSchema).optional(),
  AnamnesisTemplate: z.lazy(() => AnamnesisTemplateUncheckedUpdateManyWithoutOrganizationNestedInputSchema).optional()
}).strict();

export const PatientUpsertWithoutFinancialTransactionInputSchema: z.ZodType<Prisma.PatientUpsertWithoutFinancialTransactionInput> = z.object({
  update: z.union([ z.lazy(() => PatientUpdateWithoutFinancialTransactionInputSchema),z.lazy(() => PatientUncheckedUpdateWithoutFinancialTransactionInputSchema) ]),
  create: z.union([ z.lazy(() => PatientCreateWithoutFinancialTransactionInputSchema),z.lazy(() => PatientUncheckedCreateWithoutFinancialTransactionInputSchema) ]),
  where: z.lazy(() => PatientWhereInputSchema).optional()
}).strict();

export const PatientUpdateToOneWithWhereWithoutFinancialTransactionInputSchema: z.ZodType<Prisma.PatientUpdateToOneWithWhereWithoutFinancialTransactionInput> = z.object({
  where: z.lazy(() => PatientWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PatientUpdateWithoutFinancialTransactionInputSchema),z.lazy(() => PatientUncheckedUpdateWithoutFinancialTransactionInputSchema) ]),
}).strict();

export const PatientUpdateWithoutFinancialTransactionInputSchema: z.ZodType<Prisma.PatientUpdateWithoutFinancialTransactionInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  birthDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  organization: z.lazy(() => OrganizationUpdateOneRequiredWithoutPatientsNestedInputSchema).optional(),
  medicalRecord: z.lazy(() => MedicalRecordUpdateOneWithoutPatientNestedInputSchema).optional(),
  appointments: z.lazy(() => AppointmentUpdateManyWithoutPatientNestedInputSchema).optional(),
  CustomerSatisfaction: z.lazy(() => CustomerSatisfactionUpdateManyWithoutPatientNestedInputSchema).optional(),
  PatientAnamnesis: z.lazy(() => PatientAnamnesisUpdateManyWithoutPatientNestedInputSchema).optional()
}).strict();

export const PatientUncheckedUpdateWithoutFinancialTransactionInputSchema: z.ZodType<Prisma.PatientUncheckedUpdateWithoutFinancialTransactionInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  birthDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  organizationId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  medicalRecord: z.lazy(() => MedicalRecordUncheckedUpdateOneWithoutPatientNestedInputSchema).optional(),
  appointments: z.lazy(() => AppointmentUncheckedUpdateManyWithoutPatientNestedInputSchema).optional(),
  CustomerSatisfaction: z.lazy(() => CustomerSatisfactionUncheckedUpdateManyWithoutPatientNestedInputSchema).optional(),
  PatientAnamnesis: z.lazy(() => PatientAnamnesisUncheckedUpdateManyWithoutPatientNestedInputSchema).optional()
}).strict();

export const PatientCreateWithoutCustomerSatisfactionInputSchema: z.ZodType<Prisma.PatientCreateWithoutCustomerSatisfactionInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  email: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  birthDate: z.coerce.date(),
  address: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  organization: z.lazy(() => OrganizationCreateNestedOneWithoutPatientsInputSchema),
  medicalRecord: z.lazy(() => MedicalRecordCreateNestedOneWithoutPatientInputSchema).optional(),
  appointments: z.lazy(() => AppointmentCreateNestedManyWithoutPatientInputSchema).optional(),
  FinancialTransaction: z.lazy(() => FinancialTransactionCreateNestedManyWithoutPatientInputSchema).optional(),
  PatientAnamnesis: z.lazy(() => PatientAnamnesisCreateNestedManyWithoutPatientInputSchema).optional()
}).strict();

export const PatientUncheckedCreateWithoutCustomerSatisfactionInputSchema: z.ZodType<Prisma.PatientUncheckedCreateWithoutCustomerSatisfactionInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  email: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  birthDate: z.coerce.date(),
  address: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  organizationId: z.string(),
  medicalRecord: z.lazy(() => MedicalRecordUncheckedCreateNestedOneWithoutPatientInputSchema).optional(),
  appointments: z.lazy(() => AppointmentUncheckedCreateNestedManyWithoutPatientInputSchema).optional(),
  FinancialTransaction: z.lazy(() => FinancialTransactionUncheckedCreateNestedManyWithoutPatientInputSchema).optional(),
  PatientAnamnesis: z.lazy(() => PatientAnamnesisUncheckedCreateNestedManyWithoutPatientInputSchema).optional()
}).strict();

export const PatientCreateOrConnectWithoutCustomerSatisfactionInputSchema: z.ZodType<Prisma.PatientCreateOrConnectWithoutCustomerSatisfactionInput> = z.object({
  where: z.lazy(() => PatientWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PatientCreateWithoutCustomerSatisfactionInputSchema),z.lazy(() => PatientUncheckedCreateWithoutCustomerSatisfactionInputSchema) ]),
}).strict();

export const OrganizationCreateWithoutCustomerSatisfactionsInputSchema: z.ZodType<Prisma.OrganizationCreateWithoutCustomerSatisfactionsInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  slug: z.string(),
  domain: z.string().optional().nullable(),
  shouldAttachUsersByDomain: z.boolean().optional(),
  avatarUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  owner: z.lazy(() => UserCreateNestedOneWithoutOwns_organizationsInputSchema),
  invites: z.lazy(() => InviteCreateNestedManyWithoutOrganizationInputSchema).optional(),
  members: z.lazy(() => MemberCreateNestedManyWithoutOrganizationInputSchema).optional(),
  patients: z.lazy(() => PatientCreateNestedManyWithoutOrganizationInputSchema).optional(),
  financialTransactions: z.lazy(() => FinancialTransactionCreateNestedManyWithoutOrganizationInputSchema).optional(),
  AnamnesisTemplate: z.lazy(() => AnamnesisTemplateCreateNestedManyWithoutOrganizationInputSchema).optional()
}).strict();

export const OrganizationUncheckedCreateWithoutCustomerSatisfactionsInputSchema: z.ZodType<Prisma.OrganizationUncheckedCreateWithoutCustomerSatisfactionsInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  slug: z.string(),
  domain: z.string().optional().nullable(),
  shouldAttachUsersByDomain: z.boolean().optional(),
  avatarUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  ownerId: z.string(),
  invites: z.lazy(() => InviteUncheckedCreateNestedManyWithoutOrganizationInputSchema).optional(),
  members: z.lazy(() => MemberUncheckedCreateNestedManyWithoutOrganizationInputSchema).optional(),
  patients: z.lazy(() => PatientUncheckedCreateNestedManyWithoutOrganizationInputSchema).optional(),
  financialTransactions: z.lazy(() => FinancialTransactionUncheckedCreateNestedManyWithoutOrganizationInputSchema).optional(),
  AnamnesisTemplate: z.lazy(() => AnamnesisTemplateUncheckedCreateNestedManyWithoutOrganizationInputSchema).optional()
}).strict();

export const OrganizationCreateOrConnectWithoutCustomerSatisfactionsInputSchema: z.ZodType<Prisma.OrganizationCreateOrConnectWithoutCustomerSatisfactionsInput> = z.object({
  where: z.lazy(() => OrganizationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => OrganizationCreateWithoutCustomerSatisfactionsInputSchema),z.lazy(() => OrganizationUncheckedCreateWithoutCustomerSatisfactionsInputSchema) ]),
}).strict();

export const PatientUpsertWithoutCustomerSatisfactionInputSchema: z.ZodType<Prisma.PatientUpsertWithoutCustomerSatisfactionInput> = z.object({
  update: z.union([ z.lazy(() => PatientUpdateWithoutCustomerSatisfactionInputSchema),z.lazy(() => PatientUncheckedUpdateWithoutCustomerSatisfactionInputSchema) ]),
  create: z.union([ z.lazy(() => PatientCreateWithoutCustomerSatisfactionInputSchema),z.lazy(() => PatientUncheckedCreateWithoutCustomerSatisfactionInputSchema) ]),
  where: z.lazy(() => PatientWhereInputSchema).optional()
}).strict();

export const PatientUpdateToOneWithWhereWithoutCustomerSatisfactionInputSchema: z.ZodType<Prisma.PatientUpdateToOneWithWhereWithoutCustomerSatisfactionInput> = z.object({
  where: z.lazy(() => PatientWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PatientUpdateWithoutCustomerSatisfactionInputSchema),z.lazy(() => PatientUncheckedUpdateWithoutCustomerSatisfactionInputSchema) ]),
}).strict();

export const PatientUpdateWithoutCustomerSatisfactionInputSchema: z.ZodType<Prisma.PatientUpdateWithoutCustomerSatisfactionInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  birthDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  organization: z.lazy(() => OrganizationUpdateOneRequiredWithoutPatientsNestedInputSchema).optional(),
  medicalRecord: z.lazy(() => MedicalRecordUpdateOneWithoutPatientNestedInputSchema).optional(),
  appointments: z.lazy(() => AppointmentUpdateManyWithoutPatientNestedInputSchema).optional(),
  FinancialTransaction: z.lazy(() => FinancialTransactionUpdateManyWithoutPatientNestedInputSchema).optional(),
  PatientAnamnesis: z.lazy(() => PatientAnamnesisUpdateManyWithoutPatientNestedInputSchema).optional()
}).strict();

export const PatientUncheckedUpdateWithoutCustomerSatisfactionInputSchema: z.ZodType<Prisma.PatientUncheckedUpdateWithoutCustomerSatisfactionInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  birthDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  organizationId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  medicalRecord: z.lazy(() => MedicalRecordUncheckedUpdateOneWithoutPatientNestedInputSchema).optional(),
  appointments: z.lazy(() => AppointmentUncheckedUpdateManyWithoutPatientNestedInputSchema).optional(),
  FinancialTransaction: z.lazy(() => FinancialTransactionUncheckedUpdateManyWithoutPatientNestedInputSchema).optional(),
  PatientAnamnesis: z.lazy(() => PatientAnamnesisUncheckedUpdateManyWithoutPatientNestedInputSchema).optional()
}).strict();

export const OrganizationUpsertWithoutCustomerSatisfactionsInputSchema: z.ZodType<Prisma.OrganizationUpsertWithoutCustomerSatisfactionsInput> = z.object({
  update: z.union([ z.lazy(() => OrganizationUpdateWithoutCustomerSatisfactionsInputSchema),z.lazy(() => OrganizationUncheckedUpdateWithoutCustomerSatisfactionsInputSchema) ]),
  create: z.union([ z.lazy(() => OrganizationCreateWithoutCustomerSatisfactionsInputSchema),z.lazy(() => OrganizationUncheckedCreateWithoutCustomerSatisfactionsInputSchema) ]),
  where: z.lazy(() => OrganizationWhereInputSchema).optional()
}).strict();

export const OrganizationUpdateToOneWithWhereWithoutCustomerSatisfactionsInputSchema: z.ZodType<Prisma.OrganizationUpdateToOneWithWhereWithoutCustomerSatisfactionsInput> = z.object({
  where: z.lazy(() => OrganizationWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => OrganizationUpdateWithoutCustomerSatisfactionsInputSchema),z.lazy(() => OrganizationUncheckedUpdateWithoutCustomerSatisfactionsInputSchema) ]),
}).strict();

export const OrganizationUpdateWithoutCustomerSatisfactionsInputSchema: z.ZodType<Prisma.OrganizationUpdateWithoutCustomerSatisfactionsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  domain: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  shouldAttachUsersByDomain: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  avatarUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  owner: z.lazy(() => UserUpdateOneRequiredWithoutOwns_organizationsNestedInputSchema).optional(),
  invites: z.lazy(() => InviteUpdateManyWithoutOrganizationNestedInputSchema).optional(),
  members: z.lazy(() => MemberUpdateManyWithoutOrganizationNestedInputSchema).optional(),
  patients: z.lazy(() => PatientUpdateManyWithoutOrganizationNestedInputSchema).optional(),
  financialTransactions: z.lazy(() => FinancialTransactionUpdateManyWithoutOrganizationNestedInputSchema).optional(),
  AnamnesisTemplate: z.lazy(() => AnamnesisTemplateUpdateManyWithoutOrganizationNestedInputSchema).optional()
}).strict();

export const OrganizationUncheckedUpdateWithoutCustomerSatisfactionsInputSchema: z.ZodType<Prisma.OrganizationUncheckedUpdateWithoutCustomerSatisfactionsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  domain: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  shouldAttachUsersByDomain: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  avatarUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ownerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  invites: z.lazy(() => InviteUncheckedUpdateManyWithoutOrganizationNestedInputSchema).optional(),
  members: z.lazy(() => MemberUncheckedUpdateManyWithoutOrganizationNestedInputSchema).optional(),
  patients: z.lazy(() => PatientUncheckedUpdateManyWithoutOrganizationNestedInputSchema).optional(),
  financialTransactions: z.lazy(() => FinancialTransactionUncheckedUpdateManyWithoutOrganizationNestedInputSchema).optional(),
  AnamnesisTemplate: z.lazy(() => AnamnesisTemplateUncheckedUpdateManyWithoutOrganizationNestedInputSchema).optional()
}).strict();

export const TokenCreateManyUserInputSchema: z.ZodType<Prisma.TokenCreateManyUserInput> = z.object({
  id: z.string().optional(),
  type: z.lazy(() => TokenTypeSchema),
  createdAt: z.coerce.date().optional()
}).strict();

export const AccountCreateManyUserInputSchema: z.ZodType<Prisma.AccountCreateManyUserInput> = z.object({
  id: z.string().optional(),
  provider: z.lazy(() => AccountProviderSchema),
  providerAccountId: z.string()
}).strict();

export const InviteCreateManyAuthorInputSchema: z.ZodType<Prisma.InviteCreateManyAuthorInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  role: z.lazy(() => RoleSchema),
  createdAt: z.coerce.date().optional(),
  organizationId: z.string()
}).strict();

export const MemberCreateManyUserInputSchema: z.ZodType<Prisma.MemberCreateManyUserInput> = z.object({
  id: z.string().optional(),
  role: z.lazy(() => RoleSchema).optional(),
  specialty: z.string().optional().nullable(),
  organizationId: z.string()
}).strict();

export const OrganizationCreateManyOwnerInputSchema: z.ZodType<Prisma.OrganizationCreateManyOwnerInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  slug: z.string(),
  domain: z.string().optional().nullable(),
  shouldAttachUsersByDomain: z.boolean().optional(),
  avatarUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const TokenUpdateWithoutUserInputSchema: z.ZodType<Prisma.TokenUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => TokenTypeSchema),z.lazy(() => EnumTokenTypeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TokenUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.TokenUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => TokenTypeSchema),z.lazy(() => EnumTokenTypeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TokenUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.TokenUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => TokenTypeSchema),z.lazy(() => EnumTokenTypeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AccountUpdateWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.lazy(() => AccountProviderSchema),z.lazy(() => EnumAccountProviderFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AccountUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.lazy(() => AccountProviderSchema),z.lazy(() => EnumAccountProviderFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AccountUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.lazy(() => AccountProviderSchema),z.lazy(() => EnumAccountProviderFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const InviteUpdateWithoutAuthorInputSchema: z.ZodType<Prisma.InviteUpdateWithoutAuthorInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  organization: z.lazy(() => OrganizationUpdateOneRequiredWithoutInvitesNestedInputSchema).optional()
}).strict();

export const InviteUncheckedUpdateWithoutAuthorInputSchema: z.ZodType<Prisma.InviteUncheckedUpdateWithoutAuthorInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  organizationId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const InviteUncheckedUpdateManyWithoutAuthorInputSchema: z.ZodType<Prisma.InviteUncheckedUpdateManyWithoutAuthorInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  organizationId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MemberUpdateWithoutUserInputSchema: z.ZodType<Prisma.MemberUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  specialty: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  organization: z.lazy(() => OrganizationUpdateOneRequiredWithoutMembersNestedInputSchema).optional(),
  appointments: z.lazy(() => AppointmentUpdateManyWithoutMemberNestedInputSchema).optional()
}).strict();

export const MemberUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.MemberUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  specialty: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  organizationId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  appointments: z.lazy(() => AppointmentUncheckedUpdateManyWithoutMemberNestedInputSchema).optional()
}).strict();

export const MemberUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.MemberUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  specialty: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  organizationId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const OrganizationUpdateWithoutOwnerInputSchema: z.ZodType<Prisma.OrganizationUpdateWithoutOwnerInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  domain: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  shouldAttachUsersByDomain: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  avatarUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  invites: z.lazy(() => InviteUpdateManyWithoutOrganizationNestedInputSchema).optional(),
  members: z.lazy(() => MemberUpdateManyWithoutOrganizationNestedInputSchema).optional(),
  patients: z.lazy(() => PatientUpdateManyWithoutOrganizationNestedInputSchema).optional(),
  financialTransactions: z.lazy(() => FinancialTransactionUpdateManyWithoutOrganizationNestedInputSchema).optional(),
  customerSatisfactions: z.lazy(() => CustomerSatisfactionUpdateManyWithoutOrganizationNestedInputSchema).optional(),
  AnamnesisTemplate: z.lazy(() => AnamnesisTemplateUpdateManyWithoutOrganizationNestedInputSchema).optional()
}).strict();

export const OrganizationUncheckedUpdateWithoutOwnerInputSchema: z.ZodType<Prisma.OrganizationUncheckedUpdateWithoutOwnerInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  domain: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  shouldAttachUsersByDomain: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  avatarUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  invites: z.lazy(() => InviteUncheckedUpdateManyWithoutOrganizationNestedInputSchema).optional(),
  members: z.lazy(() => MemberUncheckedUpdateManyWithoutOrganizationNestedInputSchema).optional(),
  patients: z.lazy(() => PatientUncheckedUpdateManyWithoutOrganizationNestedInputSchema).optional(),
  financialTransactions: z.lazy(() => FinancialTransactionUncheckedUpdateManyWithoutOrganizationNestedInputSchema).optional(),
  customerSatisfactions: z.lazy(() => CustomerSatisfactionUncheckedUpdateManyWithoutOrganizationNestedInputSchema).optional(),
  AnamnesisTemplate: z.lazy(() => AnamnesisTemplateUncheckedUpdateManyWithoutOrganizationNestedInputSchema).optional()
}).strict();

export const OrganizationUncheckedUpdateManyWithoutOwnerInputSchema: z.ZodType<Prisma.OrganizationUncheckedUpdateManyWithoutOwnerInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  domain: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  shouldAttachUsersByDomain: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  avatarUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AppointmentCreateManyMemberInputSchema: z.ZodType<Prisma.AppointmentCreateManyMemberInput> = z.object({
  id: z.string().optional(),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  description: z.string().optional().nullable(),
  status: z.lazy(() => AppointmentStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  patientId: z.string()
}).strict();

export const AppointmentUpdateWithoutMemberInputSchema: z.ZodType<Prisma.AppointmentUpdateWithoutMemberInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => AppointmentStatusSchema),z.lazy(() => EnumAppointmentStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  patient: z.lazy(() => PatientUpdateOneRequiredWithoutAppointmentsNestedInputSchema).optional()
}).strict();

export const AppointmentUncheckedUpdateWithoutMemberInputSchema: z.ZodType<Prisma.AppointmentUncheckedUpdateWithoutMemberInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => AppointmentStatusSchema),z.lazy(() => EnumAppointmentStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  patientId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AppointmentUncheckedUpdateManyWithoutMemberInputSchema: z.ZodType<Prisma.AppointmentUncheckedUpdateManyWithoutMemberInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => AppointmentStatusSchema),z.lazy(() => EnumAppointmentStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  patientId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AppointmentCreateManyPatientInputSchema: z.ZodType<Prisma.AppointmentCreateManyPatientInput> = z.object({
  id: z.string().optional(),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  description: z.string().optional().nullable(),
  status: z.lazy(() => AppointmentStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  memberId: z.string()
}).strict();

export const FinancialTransactionCreateManyPatientInputSchema: z.ZodType<Prisma.FinancialTransactionCreateManyPatientInput> = z.object({
  id: z.string().optional(),
  description: z.string(),
  amount: z.string(),
  type: z.lazy(() => TransactionTypeSchema),
  paymentMethod: z.lazy(() => PaymentMethodSchema),
  date: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  organizationId: z.string()
}).strict();

export const CustomerSatisfactionCreateManyPatientInputSchema: z.ZodType<Prisma.CustomerSatisfactionCreateManyPatientInput> = z.object({
  id: z.string().optional(),
  rating: z.number().int(),
  comment: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  organizationId: z.string()
}).strict();

export const PatientAnamnesisCreateManyPatientInputSchema: z.ZodType<Prisma.PatientAnamnesisCreateManyPatientInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  templateId: z.string()
}).strict();

export const AppointmentUpdateWithoutPatientInputSchema: z.ZodType<Prisma.AppointmentUpdateWithoutPatientInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => AppointmentStatusSchema),z.lazy(() => EnumAppointmentStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  member: z.lazy(() => MemberUpdateOneRequiredWithoutAppointmentsNestedInputSchema).optional()
}).strict();

export const AppointmentUncheckedUpdateWithoutPatientInputSchema: z.ZodType<Prisma.AppointmentUncheckedUpdateWithoutPatientInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => AppointmentStatusSchema),z.lazy(() => EnumAppointmentStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  memberId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AppointmentUncheckedUpdateManyWithoutPatientInputSchema: z.ZodType<Prisma.AppointmentUncheckedUpdateManyWithoutPatientInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => AppointmentStatusSchema),z.lazy(() => EnumAppointmentStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  memberId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FinancialTransactionUpdateWithoutPatientInputSchema: z.ZodType<Prisma.FinancialTransactionUpdateWithoutPatientInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => TransactionTypeSchema),z.lazy(() => EnumTransactionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  paymentMethod: z.union([ z.lazy(() => PaymentMethodSchema),z.lazy(() => EnumPaymentMethodFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  organization: z.lazy(() => OrganizationUpdateOneRequiredWithoutFinancialTransactionsNestedInputSchema).optional()
}).strict();

export const FinancialTransactionUncheckedUpdateWithoutPatientInputSchema: z.ZodType<Prisma.FinancialTransactionUncheckedUpdateWithoutPatientInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => TransactionTypeSchema),z.lazy(() => EnumTransactionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  paymentMethod: z.union([ z.lazy(() => PaymentMethodSchema),z.lazy(() => EnumPaymentMethodFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  organizationId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FinancialTransactionUncheckedUpdateManyWithoutPatientInputSchema: z.ZodType<Prisma.FinancialTransactionUncheckedUpdateManyWithoutPatientInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => TransactionTypeSchema),z.lazy(() => EnumTransactionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  paymentMethod: z.union([ z.lazy(() => PaymentMethodSchema),z.lazy(() => EnumPaymentMethodFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  organizationId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CustomerSatisfactionUpdateWithoutPatientInputSchema: z.ZodType<Prisma.CustomerSatisfactionUpdateWithoutPatientInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  organization: z.lazy(() => OrganizationUpdateOneRequiredWithoutCustomerSatisfactionsNestedInputSchema).optional()
}).strict();

export const CustomerSatisfactionUncheckedUpdateWithoutPatientInputSchema: z.ZodType<Prisma.CustomerSatisfactionUncheckedUpdateWithoutPatientInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  organizationId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CustomerSatisfactionUncheckedUpdateManyWithoutPatientInputSchema: z.ZodType<Prisma.CustomerSatisfactionUncheckedUpdateManyWithoutPatientInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  organizationId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PatientAnamnesisUpdateWithoutPatientInputSchema: z.ZodType<Prisma.PatientAnamnesisUpdateWithoutPatientInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  template: z.lazy(() => AnamnesisTemplateUpdateOneRequiredWithoutPatientAnamnesesNestedInputSchema).optional(),
  answers: z.lazy(() => AnamnesisAnswerUpdateManyWithoutPatientAnamnesisNestedInputSchema).optional()
}).strict();

export const PatientAnamnesisUncheckedUpdateWithoutPatientInputSchema: z.ZodType<Prisma.PatientAnamnesisUncheckedUpdateWithoutPatientInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  templateId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  answers: z.lazy(() => AnamnesisAnswerUncheckedUpdateManyWithoutPatientAnamnesisNestedInputSchema).optional()
}).strict();

export const PatientAnamnesisUncheckedUpdateManyWithoutPatientInputSchema: z.ZodType<Prisma.PatientAnamnesisUncheckedUpdateManyWithoutPatientInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  templateId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AnamnesisCreateManyMedicalRecordInputSchema: z.ZodType<Prisma.AnamnesisCreateManyMedicalRecordInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  templateId: z.string()
}).strict();

export const AnamnesisUpdateWithoutMedicalRecordInputSchema: z.ZodType<Prisma.AnamnesisUpdateWithoutMedicalRecordInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  template: z.lazy(() => AnamnesisTemplateUpdateOneRequiredWithoutAnamnesisNestedInputSchema).optional(),
  answers: z.lazy(() => AnamnesisAnswerUpdateManyWithoutAnamnesisNestedInputSchema).optional()
}).strict();

export const AnamnesisUncheckedUpdateWithoutMedicalRecordInputSchema: z.ZodType<Prisma.AnamnesisUncheckedUpdateWithoutMedicalRecordInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  templateId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  answers: z.lazy(() => AnamnesisAnswerUncheckedUpdateManyWithoutAnamnesisNestedInputSchema).optional()
}).strict();

export const AnamnesisUncheckedUpdateManyWithoutMedicalRecordInputSchema: z.ZodType<Prisma.AnamnesisUncheckedUpdateManyWithoutMedicalRecordInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  templateId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AnamnesisAnswerCreateManyAnamnesisInputSchema: z.ZodType<Prisma.AnamnesisAnswerCreateManyAnamnesisInput> = z.object({
  id: z.string().optional(),
  answer: z.string(),
  questionId: z.string(),
  patientAnamnesisId: z.string()
}).strict();

export const AnamnesisAnswerUpdateWithoutAnamnesisInputSchema: z.ZodType<Prisma.AnamnesisAnswerUpdateWithoutAnamnesisInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  answer: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  question: z.lazy(() => AnamnesisQuestionUpdateOneRequiredWithoutAnswersNestedInputSchema).optional(),
  patientAnamnesis: z.lazy(() => PatientAnamnesisUpdateOneRequiredWithoutAnswersNestedInputSchema).optional()
}).strict();

export const AnamnesisAnswerUncheckedUpdateWithoutAnamnesisInputSchema: z.ZodType<Prisma.AnamnesisAnswerUncheckedUpdateWithoutAnamnesisInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  answer: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  questionId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  patientAnamnesisId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AnamnesisAnswerUncheckedUpdateManyWithoutAnamnesisInputSchema: z.ZodType<Prisma.AnamnesisAnswerUncheckedUpdateManyWithoutAnamnesisInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  answer: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  questionId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  patientAnamnesisId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AnamnesisQuestionCreateManyTemplateInputSchema: z.ZodType<Prisma.AnamnesisQuestionCreateManyTemplateInput> = z.object({
  id: z.string().optional(),
  question: z.string(),
  type: z.lazy(() => QuestionTypeSchema)
}).strict();

export const PatientAnamnesisCreateManyTemplateInputSchema: z.ZodType<Prisma.PatientAnamnesisCreateManyTemplateInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  patientId: z.string()
}).strict();

export const AnamnesisCreateManyTemplateInputSchema: z.ZodType<Prisma.AnamnesisCreateManyTemplateInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  medicalRecordId: z.string()
}).strict();

export const AnamnesisQuestionUpdateWithoutTemplateInputSchema: z.ZodType<Prisma.AnamnesisQuestionUpdateWithoutTemplateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  question: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => QuestionTypeSchema),z.lazy(() => EnumQuestionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  answers: z.lazy(() => AnamnesisAnswerUpdateManyWithoutQuestionNestedInputSchema).optional()
}).strict();

export const AnamnesisQuestionUncheckedUpdateWithoutTemplateInputSchema: z.ZodType<Prisma.AnamnesisQuestionUncheckedUpdateWithoutTemplateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  question: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => QuestionTypeSchema),z.lazy(() => EnumQuestionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  answers: z.lazy(() => AnamnesisAnswerUncheckedUpdateManyWithoutQuestionNestedInputSchema).optional()
}).strict();

export const AnamnesisQuestionUncheckedUpdateManyWithoutTemplateInputSchema: z.ZodType<Prisma.AnamnesisQuestionUncheckedUpdateManyWithoutTemplateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  question: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => QuestionTypeSchema),z.lazy(() => EnumQuestionTypeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PatientAnamnesisUpdateWithoutTemplateInputSchema: z.ZodType<Prisma.PatientAnamnesisUpdateWithoutTemplateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  patient: z.lazy(() => PatientUpdateOneRequiredWithoutPatientAnamnesisNestedInputSchema).optional(),
  answers: z.lazy(() => AnamnesisAnswerUpdateManyWithoutPatientAnamnesisNestedInputSchema).optional()
}).strict();

export const PatientAnamnesisUncheckedUpdateWithoutTemplateInputSchema: z.ZodType<Prisma.PatientAnamnesisUncheckedUpdateWithoutTemplateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  patientId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  answers: z.lazy(() => AnamnesisAnswerUncheckedUpdateManyWithoutPatientAnamnesisNestedInputSchema).optional()
}).strict();

export const PatientAnamnesisUncheckedUpdateManyWithoutTemplateInputSchema: z.ZodType<Prisma.PatientAnamnesisUncheckedUpdateManyWithoutTemplateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  patientId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AnamnesisUpdateWithoutTemplateInputSchema: z.ZodType<Prisma.AnamnesisUpdateWithoutTemplateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  medicalRecord: z.lazy(() => MedicalRecordUpdateOneRequiredWithoutAnamnesesNestedInputSchema).optional(),
  answers: z.lazy(() => AnamnesisAnswerUpdateManyWithoutAnamnesisNestedInputSchema).optional()
}).strict();

export const AnamnesisUncheckedUpdateWithoutTemplateInputSchema: z.ZodType<Prisma.AnamnesisUncheckedUpdateWithoutTemplateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  medicalRecordId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  answers: z.lazy(() => AnamnesisAnswerUncheckedUpdateManyWithoutAnamnesisNestedInputSchema).optional()
}).strict();

export const AnamnesisUncheckedUpdateManyWithoutTemplateInputSchema: z.ZodType<Prisma.AnamnesisUncheckedUpdateManyWithoutTemplateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  medicalRecordId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AnamnesisAnswerCreateManyQuestionInputSchema: z.ZodType<Prisma.AnamnesisAnswerCreateManyQuestionInput> = z.object({
  id: z.string().optional(),
  answer: z.string(),
  patientAnamnesisId: z.string(),
  anamnesisId: z.string().optional().nullable()
}).strict();

export const AnamnesisAnswerUpdateWithoutQuestionInputSchema: z.ZodType<Prisma.AnamnesisAnswerUpdateWithoutQuestionInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  answer: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  patientAnamnesis: z.lazy(() => PatientAnamnesisUpdateOneRequiredWithoutAnswersNestedInputSchema).optional(),
  Anamnesis: z.lazy(() => AnamnesisUpdateOneWithoutAnswersNestedInputSchema).optional()
}).strict();

export const AnamnesisAnswerUncheckedUpdateWithoutQuestionInputSchema: z.ZodType<Prisma.AnamnesisAnswerUncheckedUpdateWithoutQuestionInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  answer: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  patientAnamnesisId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  anamnesisId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AnamnesisAnswerUncheckedUpdateManyWithoutQuestionInputSchema: z.ZodType<Prisma.AnamnesisAnswerUncheckedUpdateManyWithoutQuestionInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  answer: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  patientAnamnesisId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  anamnesisId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AnamnesisAnswerCreateManyPatientAnamnesisInputSchema: z.ZodType<Prisma.AnamnesisAnswerCreateManyPatientAnamnesisInput> = z.object({
  id: z.string().optional(),
  answer: z.string(),
  questionId: z.string(),
  anamnesisId: z.string().optional().nullable()
}).strict();

export const AnamnesisAnswerUpdateWithoutPatientAnamnesisInputSchema: z.ZodType<Prisma.AnamnesisAnswerUpdateWithoutPatientAnamnesisInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  answer: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  question: z.lazy(() => AnamnesisQuestionUpdateOneRequiredWithoutAnswersNestedInputSchema).optional(),
  Anamnesis: z.lazy(() => AnamnesisUpdateOneWithoutAnswersNestedInputSchema).optional()
}).strict();

export const AnamnesisAnswerUncheckedUpdateWithoutPatientAnamnesisInputSchema: z.ZodType<Prisma.AnamnesisAnswerUncheckedUpdateWithoutPatientAnamnesisInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  answer: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  questionId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  anamnesisId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AnamnesisAnswerUncheckedUpdateManyWithoutPatientAnamnesisInputSchema: z.ZodType<Prisma.AnamnesisAnswerUncheckedUpdateManyWithoutPatientAnamnesisInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  answer: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  questionId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  anamnesisId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const InviteCreateManyOrganizationInputSchema: z.ZodType<Prisma.InviteCreateManyOrganizationInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  role: z.lazy(() => RoleSchema),
  createdAt: z.coerce.date().optional(),
  authorId: z.string().optional().nullable()
}).strict();

export const MemberCreateManyOrganizationInputSchema: z.ZodType<Prisma.MemberCreateManyOrganizationInput> = z.object({
  id: z.string().optional(),
  role: z.lazy(() => RoleSchema).optional(),
  specialty: z.string().optional().nullable(),
  userId: z.string()
}).strict();

export const PatientCreateManyOrganizationInputSchema: z.ZodType<Prisma.PatientCreateManyOrganizationInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  email: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  birthDate: z.coerce.date(),
  address: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const FinancialTransactionCreateManyOrganizationInputSchema: z.ZodType<Prisma.FinancialTransactionCreateManyOrganizationInput> = z.object({
  id: z.string().optional(),
  description: z.string(),
  amount: z.string(),
  type: z.lazy(() => TransactionTypeSchema),
  paymentMethod: z.lazy(() => PaymentMethodSchema),
  date: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  patientId: z.string().optional().nullable()
}).strict();

export const CustomerSatisfactionCreateManyOrganizationInputSchema: z.ZodType<Prisma.CustomerSatisfactionCreateManyOrganizationInput> = z.object({
  id: z.string().optional(),
  rating: z.number().int(),
  comment: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  patientId: z.string()
}).strict();

export const AnamnesisTemplateCreateManyOrganizationInputSchema: z.ZodType<Prisma.AnamnesisTemplateCreateManyOrganizationInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const InviteUpdateWithoutOrganizationInputSchema: z.ZodType<Prisma.InviteUpdateWithoutOrganizationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  author: z.lazy(() => UserUpdateOneWithoutInvitesNestedInputSchema).optional()
}).strict();

export const InviteUncheckedUpdateWithoutOrganizationInputSchema: z.ZodType<Prisma.InviteUncheckedUpdateWithoutOrganizationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  authorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const InviteUncheckedUpdateManyWithoutOrganizationInputSchema: z.ZodType<Prisma.InviteUncheckedUpdateManyWithoutOrganizationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  authorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const MemberUpdateWithoutOrganizationInputSchema: z.ZodType<Prisma.MemberUpdateWithoutOrganizationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  specialty: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutMember_onNestedInputSchema).optional(),
  appointments: z.lazy(() => AppointmentUpdateManyWithoutMemberNestedInputSchema).optional()
}).strict();

export const MemberUncheckedUpdateWithoutOrganizationInputSchema: z.ZodType<Prisma.MemberUncheckedUpdateWithoutOrganizationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  specialty: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  appointments: z.lazy(() => AppointmentUncheckedUpdateManyWithoutMemberNestedInputSchema).optional()
}).strict();

export const MemberUncheckedUpdateManyWithoutOrganizationInputSchema: z.ZodType<Prisma.MemberUncheckedUpdateManyWithoutOrganizationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  specialty: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PatientUpdateWithoutOrganizationInputSchema: z.ZodType<Prisma.PatientUpdateWithoutOrganizationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  birthDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  medicalRecord: z.lazy(() => MedicalRecordUpdateOneWithoutPatientNestedInputSchema).optional(),
  appointments: z.lazy(() => AppointmentUpdateManyWithoutPatientNestedInputSchema).optional(),
  FinancialTransaction: z.lazy(() => FinancialTransactionUpdateManyWithoutPatientNestedInputSchema).optional(),
  CustomerSatisfaction: z.lazy(() => CustomerSatisfactionUpdateManyWithoutPatientNestedInputSchema).optional(),
  PatientAnamnesis: z.lazy(() => PatientAnamnesisUpdateManyWithoutPatientNestedInputSchema).optional()
}).strict();

export const PatientUncheckedUpdateWithoutOrganizationInputSchema: z.ZodType<Prisma.PatientUncheckedUpdateWithoutOrganizationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  birthDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  medicalRecord: z.lazy(() => MedicalRecordUncheckedUpdateOneWithoutPatientNestedInputSchema).optional(),
  appointments: z.lazy(() => AppointmentUncheckedUpdateManyWithoutPatientNestedInputSchema).optional(),
  FinancialTransaction: z.lazy(() => FinancialTransactionUncheckedUpdateManyWithoutPatientNestedInputSchema).optional(),
  CustomerSatisfaction: z.lazy(() => CustomerSatisfactionUncheckedUpdateManyWithoutPatientNestedInputSchema).optional(),
  PatientAnamnesis: z.lazy(() => PatientAnamnesisUncheckedUpdateManyWithoutPatientNestedInputSchema).optional()
}).strict();

export const PatientUncheckedUpdateManyWithoutOrganizationInputSchema: z.ZodType<Prisma.PatientUncheckedUpdateManyWithoutOrganizationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  birthDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FinancialTransactionUpdateWithoutOrganizationInputSchema: z.ZodType<Prisma.FinancialTransactionUpdateWithoutOrganizationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => TransactionTypeSchema),z.lazy(() => EnumTransactionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  paymentMethod: z.union([ z.lazy(() => PaymentMethodSchema),z.lazy(() => EnumPaymentMethodFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  patient: z.lazy(() => PatientUpdateOneWithoutFinancialTransactionNestedInputSchema).optional()
}).strict();

export const FinancialTransactionUncheckedUpdateWithoutOrganizationInputSchema: z.ZodType<Prisma.FinancialTransactionUncheckedUpdateWithoutOrganizationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => TransactionTypeSchema),z.lazy(() => EnumTransactionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  paymentMethod: z.union([ z.lazy(() => PaymentMethodSchema),z.lazy(() => EnumPaymentMethodFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  patientId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const FinancialTransactionUncheckedUpdateManyWithoutOrganizationInputSchema: z.ZodType<Prisma.FinancialTransactionUncheckedUpdateManyWithoutOrganizationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => TransactionTypeSchema),z.lazy(() => EnumTransactionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  paymentMethod: z.union([ z.lazy(() => PaymentMethodSchema),z.lazy(() => EnumPaymentMethodFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  patientId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const CustomerSatisfactionUpdateWithoutOrganizationInputSchema: z.ZodType<Prisma.CustomerSatisfactionUpdateWithoutOrganizationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  patient: z.lazy(() => PatientUpdateOneRequiredWithoutCustomerSatisfactionNestedInputSchema).optional()
}).strict();

export const CustomerSatisfactionUncheckedUpdateWithoutOrganizationInputSchema: z.ZodType<Prisma.CustomerSatisfactionUncheckedUpdateWithoutOrganizationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  patientId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CustomerSatisfactionUncheckedUpdateManyWithoutOrganizationInputSchema: z.ZodType<Prisma.CustomerSatisfactionUncheckedUpdateManyWithoutOrganizationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  patientId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AnamnesisTemplateUpdateWithoutOrganizationInputSchema: z.ZodType<Prisma.AnamnesisTemplateUpdateWithoutOrganizationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  questions: z.lazy(() => AnamnesisQuestionUpdateManyWithoutTemplateNestedInputSchema).optional(),
  patientAnamneses: z.lazy(() => PatientAnamnesisUpdateManyWithoutTemplateNestedInputSchema).optional(),
  Anamnesis: z.lazy(() => AnamnesisUpdateManyWithoutTemplateNestedInputSchema).optional()
}).strict();

export const AnamnesisTemplateUncheckedUpdateWithoutOrganizationInputSchema: z.ZodType<Prisma.AnamnesisTemplateUncheckedUpdateWithoutOrganizationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  questions: z.lazy(() => AnamnesisQuestionUncheckedUpdateManyWithoutTemplateNestedInputSchema).optional(),
  patientAnamneses: z.lazy(() => PatientAnamnesisUncheckedUpdateManyWithoutTemplateNestedInputSchema).optional(),
  Anamnesis: z.lazy(() => AnamnesisUncheckedUpdateManyWithoutTemplateNestedInputSchema).optional()
}).strict();

export const AnamnesisTemplateUncheckedUpdateManyWithoutOrganizationInputSchema: z.ZodType<Prisma.AnamnesisTemplateUncheckedUpdateManyWithoutOrganizationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const TokenFindFirstArgsSchema: z.ZodType<Prisma.TokenFindFirstArgs> = z.object({
  select: TokenSelectSchema.optional(),
  include: TokenIncludeSchema.optional(),
  where: TokenWhereInputSchema.optional(),
  orderBy: z.union([ TokenOrderByWithRelationInputSchema.array(),TokenOrderByWithRelationInputSchema ]).optional(),
  cursor: TokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TokenScalarFieldEnumSchema,TokenScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TokenFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TokenFindFirstOrThrowArgs> = z.object({
  select: TokenSelectSchema.optional(),
  include: TokenIncludeSchema.optional(),
  where: TokenWhereInputSchema.optional(),
  orderBy: z.union([ TokenOrderByWithRelationInputSchema.array(),TokenOrderByWithRelationInputSchema ]).optional(),
  cursor: TokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TokenScalarFieldEnumSchema,TokenScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TokenFindManyArgsSchema: z.ZodType<Prisma.TokenFindManyArgs> = z.object({
  select: TokenSelectSchema.optional(),
  include: TokenIncludeSchema.optional(),
  where: TokenWhereInputSchema.optional(),
  orderBy: z.union([ TokenOrderByWithRelationInputSchema.array(),TokenOrderByWithRelationInputSchema ]).optional(),
  cursor: TokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TokenScalarFieldEnumSchema,TokenScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TokenAggregateArgsSchema: z.ZodType<Prisma.TokenAggregateArgs> = z.object({
  where: TokenWhereInputSchema.optional(),
  orderBy: z.union([ TokenOrderByWithRelationInputSchema.array(),TokenOrderByWithRelationInputSchema ]).optional(),
  cursor: TokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TokenGroupByArgsSchema: z.ZodType<Prisma.TokenGroupByArgs> = z.object({
  where: TokenWhereInputSchema.optional(),
  orderBy: z.union([ TokenOrderByWithAggregationInputSchema.array(),TokenOrderByWithAggregationInputSchema ]).optional(),
  by: TokenScalarFieldEnumSchema.array(),
  having: TokenScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TokenFindUniqueArgsSchema: z.ZodType<Prisma.TokenFindUniqueArgs> = z.object({
  select: TokenSelectSchema.optional(),
  include: TokenIncludeSchema.optional(),
  where: TokenWhereUniqueInputSchema,
}).strict() ;

export const TokenFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TokenFindUniqueOrThrowArgs> = z.object({
  select: TokenSelectSchema.optional(),
  include: TokenIncludeSchema.optional(),
  where: TokenWhereUniqueInputSchema,
}).strict() ;

export const AccountFindFirstArgsSchema: z.ZodType<Prisma.AccountFindFirstArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountScalarFieldEnumSchema,AccountScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AccountFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AccountFindFirstOrThrowArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountScalarFieldEnumSchema,AccountScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AccountFindManyArgsSchema: z.ZodType<Prisma.AccountFindManyArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountScalarFieldEnumSchema,AccountScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AccountAggregateArgsSchema: z.ZodType<Prisma.AccountAggregateArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AccountGroupByArgsSchema: z.ZodType<Prisma.AccountGroupByArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithAggregationInputSchema.array(),AccountOrderByWithAggregationInputSchema ]).optional(),
  by: AccountScalarFieldEnumSchema.array(),
  having: AccountScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AccountFindUniqueArgsSchema: z.ZodType<Prisma.AccountFindUniqueArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict() ;

export const AccountFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AccountFindUniqueOrThrowArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict() ;

export const InviteFindFirstArgsSchema: z.ZodType<Prisma.InviteFindFirstArgs> = z.object({
  select: InviteSelectSchema.optional(),
  include: InviteIncludeSchema.optional(),
  where: InviteWhereInputSchema.optional(),
  orderBy: z.union([ InviteOrderByWithRelationInputSchema.array(),InviteOrderByWithRelationInputSchema ]).optional(),
  cursor: InviteWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ InviteScalarFieldEnumSchema,InviteScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const InviteFindFirstOrThrowArgsSchema: z.ZodType<Prisma.InviteFindFirstOrThrowArgs> = z.object({
  select: InviteSelectSchema.optional(),
  include: InviteIncludeSchema.optional(),
  where: InviteWhereInputSchema.optional(),
  orderBy: z.union([ InviteOrderByWithRelationInputSchema.array(),InviteOrderByWithRelationInputSchema ]).optional(),
  cursor: InviteWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ InviteScalarFieldEnumSchema,InviteScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const InviteFindManyArgsSchema: z.ZodType<Prisma.InviteFindManyArgs> = z.object({
  select: InviteSelectSchema.optional(),
  include: InviteIncludeSchema.optional(),
  where: InviteWhereInputSchema.optional(),
  orderBy: z.union([ InviteOrderByWithRelationInputSchema.array(),InviteOrderByWithRelationInputSchema ]).optional(),
  cursor: InviteWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ InviteScalarFieldEnumSchema,InviteScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const InviteAggregateArgsSchema: z.ZodType<Prisma.InviteAggregateArgs> = z.object({
  where: InviteWhereInputSchema.optional(),
  orderBy: z.union([ InviteOrderByWithRelationInputSchema.array(),InviteOrderByWithRelationInputSchema ]).optional(),
  cursor: InviteWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const InviteGroupByArgsSchema: z.ZodType<Prisma.InviteGroupByArgs> = z.object({
  where: InviteWhereInputSchema.optional(),
  orderBy: z.union([ InviteOrderByWithAggregationInputSchema.array(),InviteOrderByWithAggregationInputSchema ]).optional(),
  by: InviteScalarFieldEnumSchema.array(),
  having: InviteScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const InviteFindUniqueArgsSchema: z.ZodType<Prisma.InviteFindUniqueArgs> = z.object({
  select: InviteSelectSchema.optional(),
  include: InviteIncludeSchema.optional(),
  where: InviteWhereUniqueInputSchema,
}).strict() ;

export const InviteFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.InviteFindUniqueOrThrowArgs> = z.object({
  select: InviteSelectSchema.optional(),
  include: InviteIncludeSchema.optional(),
  where: InviteWhereUniqueInputSchema,
}).strict() ;

export const MemberFindFirstArgsSchema: z.ZodType<Prisma.MemberFindFirstArgs> = z.object({
  select: MemberSelectSchema.optional(),
  include: MemberIncludeSchema.optional(),
  where: MemberWhereInputSchema.optional(),
  orderBy: z.union([ MemberOrderByWithRelationInputSchema.array(),MemberOrderByWithRelationInputSchema ]).optional(),
  cursor: MemberWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MemberScalarFieldEnumSchema,MemberScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const MemberFindFirstOrThrowArgsSchema: z.ZodType<Prisma.MemberFindFirstOrThrowArgs> = z.object({
  select: MemberSelectSchema.optional(),
  include: MemberIncludeSchema.optional(),
  where: MemberWhereInputSchema.optional(),
  orderBy: z.union([ MemberOrderByWithRelationInputSchema.array(),MemberOrderByWithRelationInputSchema ]).optional(),
  cursor: MemberWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MemberScalarFieldEnumSchema,MemberScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const MemberFindManyArgsSchema: z.ZodType<Prisma.MemberFindManyArgs> = z.object({
  select: MemberSelectSchema.optional(),
  include: MemberIncludeSchema.optional(),
  where: MemberWhereInputSchema.optional(),
  orderBy: z.union([ MemberOrderByWithRelationInputSchema.array(),MemberOrderByWithRelationInputSchema ]).optional(),
  cursor: MemberWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MemberScalarFieldEnumSchema,MemberScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const MemberAggregateArgsSchema: z.ZodType<Prisma.MemberAggregateArgs> = z.object({
  where: MemberWhereInputSchema.optional(),
  orderBy: z.union([ MemberOrderByWithRelationInputSchema.array(),MemberOrderByWithRelationInputSchema ]).optional(),
  cursor: MemberWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const MemberGroupByArgsSchema: z.ZodType<Prisma.MemberGroupByArgs> = z.object({
  where: MemberWhereInputSchema.optional(),
  orderBy: z.union([ MemberOrderByWithAggregationInputSchema.array(),MemberOrderByWithAggregationInputSchema ]).optional(),
  by: MemberScalarFieldEnumSchema.array(),
  having: MemberScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const MemberFindUniqueArgsSchema: z.ZodType<Prisma.MemberFindUniqueArgs> = z.object({
  select: MemberSelectSchema.optional(),
  include: MemberIncludeSchema.optional(),
  where: MemberWhereUniqueInputSchema,
}).strict() ;

export const MemberFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.MemberFindUniqueOrThrowArgs> = z.object({
  select: MemberSelectSchema.optional(),
  include: MemberIncludeSchema.optional(),
  where: MemberWhereUniqueInputSchema,
}).strict() ;

export const PatientFindFirstArgsSchema: z.ZodType<Prisma.PatientFindFirstArgs> = z.object({
  select: PatientSelectSchema.optional(),
  include: PatientIncludeSchema.optional(),
  where: PatientWhereInputSchema.optional(),
  orderBy: z.union([ PatientOrderByWithRelationInputSchema.array(),PatientOrderByWithRelationInputSchema ]).optional(),
  cursor: PatientWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PatientScalarFieldEnumSchema,PatientScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PatientFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PatientFindFirstOrThrowArgs> = z.object({
  select: PatientSelectSchema.optional(),
  include: PatientIncludeSchema.optional(),
  where: PatientWhereInputSchema.optional(),
  orderBy: z.union([ PatientOrderByWithRelationInputSchema.array(),PatientOrderByWithRelationInputSchema ]).optional(),
  cursor: PatientWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PatientScalarFieldEnumSchema,PatientScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PatientFindManyArgsSchema: z.ZodType<Prisma.PatientFindManyArgs> = z.object({
  select: PatientSelectSchema.optional(),
  include: PatientIncludeSchema.optional(),
  where: PatientWhereInputSchema.optional(),
  orderBy: z.union([ PatientOrderByWithRelationInputSchema.array(),PatientOrderByWithRelationInputSchema ]).optional(),
  cursor: PatientWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PatientScalarFieldEnumSchema,PatientScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PatientAggregateArgsSchema: z.ZodType<Prisma.PatientAggregateArgs> = z.object({
  where: PatientWhereInputSchema.optional(),
  orderBy: z.union([ PatientOrderByWithRelationInputSchema.array(),PatientOrderByWithRelationInputSchema ]).optional(),
  cursor: PatientWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PatientGroupByArgsSchema: z.ZodType<Prisma.PatientGroupByArgs> = z.object({
  where: PatientWhereInputSchema.optional(),
  orderBy: z.union([ PatientOrderByWithAggregationInputSchema.array(),PatientOrderByWithAggregationInputSchema ]).optional(),
  by: PatientScalarFieldEnumSchema.array(),
  having: PatientScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PatientFindUniqueArgsSchema: z.ZodType<Prisma.PatientFindUniqueArgs> = z.object({
  select: PatientSelectSchema.optional(),
  include: PatientIncludeSchema.optional(),
  where: PatientWhereUniqueInputSchema,
}).strict() ;

export const PatientFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PatientFindUniqueOrThrowArgs> = z.object({
  select: PatientSelectSchema.optional(),
  include: PatientIncludeSchema.optional(),
  where: PatientWhereUniqueInputSchema,
}).strict() ;

export const MedicalRecordFindFirstArgsSchema: z.ZodType<Prisma.MedicalRecordFindFirstArgs> = z.object({
  select: MedicalRecordSelectSchema.optional(),
  include: MedicalRecordIncludeSchema.optional(),
  where: MedicalRecordWhereInputSchema.optional(),
  orderBy: z.union([ MedicalRecordOrderByWithRelationInputSchema.array(),MedicalRecordOrderByWithRelationInputSchema ]).optional(),
  cursor: MedicalRecordWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MedicalRecordScalarFieldEnumSchema,MedicalRecordScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const MedicalRecordFindFirstOrThrowArgsSchema: z.ZodType<Prisma.MedicalRecordFindFirstOrThrowArgs> = z.object({
  select: MedicalRecordSelectSchema.optional(),
  include: MedicalRecordIncludeSchema.optional(),
  where: MedicalRecordWhereInputSchema.optional(),
  orderBy: z.union([ MedicalRecordOrderByWithRelationInputSchema.array(),MedicalRecordOrderByWithRelationInputSchema ]).optional(),
  cursor: MedicalRecordWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MedicalRecordScalarFieldEnumSchema,MedicalRecordScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const MedicalRecordFindManyArgsSchema: z.ZodType<Prisma.MedicalRecordFindManyArgs> = z.object({
  select: MedicalRecordSelectSchema.optional(),
  include: MedicalRecordIncludeSchema.optional(),
  where: MedicalRecordWhereInputSchema.optional(),
  orderBy: z.union([ MedicalRecordOrderByWithRelationInputSchema.array(),MedicalRecordOrderByWithRelationInputSchema ]).optional(),
  cursor: MedicalRecordWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MedicalRecordScalarFieldEnumSchema,MedicalRecordScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const MedicalRecordAggregateArgsSchema: z.ZodType<Prisma.MedicalRecordAggregateArgs> = z.object({
  where: MedicalRecordWhereInputSchema.optional(),
  orderBy: z.union([ MedicalRecordOrderByWithRelationInputSchema.array(),MedicalRecordOrderByWithRelationInputSchema ]).optional(),
  cursor: MedicalRecordWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const MedicalRecordGroupByArgsSchema: z.ZodType<Prisma.MedicalRecordGroupByArgs> = z.object({
  where: MedicalRecordWhereInputSchema.optional(),
  orderBy: z.union([ MedicalRecordOrderByWithAggregationInputSchema.array(),MedicalRecordOrderByWithAggregationInputSchema ]).optional(),
  by: MedicalRecordScalarFieldEnumSchema.array(),
  having: MedicalRecordScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const MedicalRecordFindUniqueArgsSchema: z.ZodType<Prisma.MedicalRecordFindUniqueArgs> = z.object({
  select: MedicalRecordSelectSchema.optional(),
  include: MedicalRecordIncludeSchema.optional(),
  where: MedicalRecordWhereUniqueInputSchema,
}).strict() ;

export const MedicalRecordFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.MedicalRecordFindUniqueOrThrowArgs> = z.object({
  select: MedicalRecordSelectSchema.optional(),
  include: MedicalRecordIncludeSchema.optional(),
  where: MedicalRecordWhereUniqueInputSchema,
}).strict() ;

export const AnamnesisFindFirstArgsSchema: z.ZodType<Prisma.AnamnesisFindFirstArgs> = z.object({
  select: AnamnesisSelectSchema.optional(),
  include: AnamnesisIncludeSchema.optional(),
  where: AnamnesisWhereInputSchema.optional(),
  orderBy: z.union([ AnamnesisOrderByWithRelationInputSchema.array(),AnamnesisOrderByWithRelationInputSchema ]).optional(),
  cursor: AnamnesisWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AnamnesisScalarFieldEnumSchema,AnamnesisScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AnamnesisFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AnamnesisFindFirstOrThrowArgs> = z.object({
  select: AnamnesisSelectSchema.optional(),
  include: AnamnesisIncludeSchema.optional(),
  where: AnamnesisWhereInputSchema.optional(),
  orderBy: z.union([ AnamnesisOrderByWithRelationInputSchema.array(),AnamnesisOrderByWithRelationInputSchema ]).optional(),
  cursor: AnamnesisWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AnamnesisScalarFieldEnumSchema,AnamnesisScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AnamnesisFindManyArgsSchema: z.ZodType<Prisma.AnamnesisFindManyArgs> = z.object({
  select: AnamnesisSelectSchema.optional(),
  include: AnamnesisIncludeSchema.optional(),
  where: AnamnesisWhereInputSchema.optional(),
  orderBy: z.union([ AnamnesisOrderByWithRelationInputSchema.array(),AnamnesisOrderByWithRelationInputSchema ]).optional(),
  cursor: AnamnesisWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AnamnesisScalarFieldEnumSchema,AnamnesisScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AnamnesisAggregateArgsSchema: z.ZodType<Prisma.AnamnesisAggregateArgs> = z.object({
  where: AnamnesisWhereInputSchema.optional(),
  orderBy: z.union([ AnamnesisOrderByWithRelationInputSchema.array(),AnamnesisOrderByWithRelationInputSchema ]).optional(),
  cursor: AnamnesisWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AnamnesisGroupByArgsSchema: z.ZodType<Prisma.AnamnesisGroupByArgs> = z.object({
  where: AnamnesisWhereInputSchema.optional(),
  orderBy: z.union([ AnamnesisOrderByWithAggregationInputSchema.array(),AnamnesisOrderByWithAggregationInputSchema ]).optional(),
  by: AnamnesisScalarFieldEnumSchema.array(),
  having: AnamnesisScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AnamnesisFindUniqueArgsSchema: z.ZodType<Prisma.AnamnesisFindUniqueArgs> = z.object({
  select: AnamnesisSelectSchema.optional(),
  include: AnamnesisIncludeSchema.optional(),
  where: AnamnesisWhereUniqueInputSchema,
}).strict() ;

export const AnamnesisFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AnamnesisFindUniqueOrThrowArgs> = z.object({
  select: AnamnesisSelectSchema.optional(),
  include: AnamnesisIncludeSchema.optional(),
  where: AnamnesisWhereUniqueInputSchema,
}).strict() ;

export const AnamnesisTemplateFindFirstArgsSchema: z.ZodType<Prisma.AnamnesisTemplateFindFirstArgs> = z.object({
  select: AnamnesisTemplateSelectSchema.optional(),
  include: AnamnesisTemplateIncludeSchema.optional(),
  where: AnamnesisTemplateWhereInputSchema.optional(),
  orderBy: z.union([ AnamnesisTemplateOrderByWithRelationInputSchema.array(),AnamnesisTemplateOrderByWithRelationInputSchema ]).optional(),
  cursor: AnamnesisTemplateWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AnamnesisTemplateScalarFieldEnumSchema,AnamnesisTemplateScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AnamnesisTemplateFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AnamnesisTemplateFindFirstOrThrowArgs> = z.object({
  select: AnamnesisTemplateSelectSchema.optional(),
  include: AnamnesisTemplateIncludeSchema.optional(),
  where: AnamnesisTemplateWhereInputSchema.optional(),
  orderBy: z.union([ AnamnesisTemplateOrderByWithRelationInputSchema.array(),AnamnesisTemplateOrderByWithRelationInputSchema ]).optional(),
  cursor: AnamnesisTemplateWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AnamnesisTemplateScalarFieldEnumSchema,AnamnesisTemplateScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AnamnesisTemplateFindManyArgsSchema: z.ZodType<Prisma.AnamnesisTemplateFindManyArgs> = z.object({
  select: AnamnesisTemplateSelectSchema.optional(),
  include: AnamnesisTemplateIncludeSchema.optional(),
  where: AnamnesisTemplateWhereInputSchema.optional(),
  orderBy: z.union([ AnamnesisTemplateOrderByWithRelationInputSchema.array(),AnamnesisTemplateOrderByWithRelationInputSchema ]).optional(),
  cursor: AnamnesisTemplateWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AnamnesisTemplateScalarFieldEnumSchema,AnamnesisTemplateScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AnamnesisTemplateAggregateArgsSchema: z.ZodType<Prisma.AnamnesisTemplateAggregateArgs> = z.object({
  where: AnamnesisTemplateWhereInputSchema.optional(),
  orderBy: z.union([ AnamnesisTemplateOrderByWithRelationInputSchema.array(),AnamnesisTemplateOrderByWithRelationInputSchema ]).optional(),
  cursor: AnamnesisTemplateWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AnamnesisTemplateGroupByArgsSchema: z.ZodType<Prisma.AnamnesisTemplateGroupByArgs> = z.object({
  where: AnamnesisTemplateWhereInputSchema.optional(),
  orderBy: z.union([ AnamnesisTemplateOrderByWithAggregationInputSchema.array(),AnamnesisTemplateOrderByWithAggregationInputSchema ]).optional(),
  by: AnamnesisTemplateScalarFieldEnumSchema.array(),
  having: AnamnesisTemplateScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AnamnesisTemplateFindUniqueArgsSchema: z.ZodType<Prisma.AnamnesisTemplateFindUniqueArgs> = z.object({
  select: AnamnesisTemplateSelectSchema.optional(),
  include: AnamnesisTemplateIncludeSchema.optional(),
  where: AnamnesisTemplateWhereUniqueInputSchema,
}).strict() ;

export const AnamnesisTemplateFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AnamnesisTemplateFindUniqueOrThrowArgs> = z.object({
  select: AnamnesisTemplateSelectSchema.optional(),
  include: AnamnesisTemplateIncludeSchema.optional(),
  where: AnamnesisTemplateWhereUniqueInputSchema,
}).strict() ;

export const AnamnesisQuestionFindFirstArgsSchema: z.ZodType<Prisma.AnamnesisQuestionFindFirstArgs> = z.object({
  select: AnamnesisQuestionSelectSchema.optional(),
  include: AnamnesisQuestionIncludeSchema.optional(),
  where: AnamnesisQuestionWhereInputSchema.optional(),
  orderBy: z.union([ AnamnesisQuestionOrderByWithRelationInputSchema.array(),AnamnesisQuestionOrderByWithRelationInputSchema ]).optional(),
  cursor: AnamnesisQuestionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AnamnesisQuestionScalarFieldEnumSchema,AnamnesisQuestionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AnamnesisQuestionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AnamnesisQuestionFindFirstOrThrowArgs> = z.object({
  select: AnamnesisQuestionSelectSchema.optional(),
  include: AnamnesisQuestionIncludeSchema.optional(),
  where: AnamnesisQuestionWhereInputSchema.optional(),
  orderBy: z.union([ AnamnesisQuestionOrderByWithRelationInputSchema.array(),AnamnesisQuestionOrderByWithRelationInputSchema ]).optional(),
  cursor: AnamnesisQuestionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AnamnesisQuestionScalarFieldEnumSchema,AnamnesisQuestionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AnamnesisQuestionFindManyArgsSchema: z.ZodType<Prisma.AnamnesisQuestionFindManyArgs> = z.object({
  select: AnamnesisQuestionSelectSchema.optional(),
  include: AnamnesisQuestionIncludeSchema.optional(),
  where: AnamnesisQuestionWhereInputSchema.optional(),
  orderBy: z.union([ AnamnesisQuestionOrderByWithRelationInputSchema.array(),AnamnesisQuestionOrderByWithRelationInputSchema ]).optional(),
  cursor: AnamnesisQuestionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AnamnesisQuestionScalarFieldEnumSchema,AnamnesisQuestionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AnamnesisQuestionAggregateArgsSchema: z.ZodType<Prisma.AnamnesisQuestionAggregateArgs> = z.object({
  where: AnamnesisQuestionWhereInputSchema.optional(),
  orderBy: z.union([ AnamnesisQuestionOrderByWithRelationInputSchema.array(),AnamnesisQuestionOrderByWithRelationInputSchema ]).optional(),
  cursor: AnamnesisQuestionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AnamnesisQuestionGroupByArgsSchema: z.ZodType<Prisma.AnamnesisQuestionGroupByArgs> = z.object({
  where: AnamnesisQuestionWhereInputSchema.optional(),
  orderBy: z.union([ AnamnesisQuestionOrderByWithAggregationInputSchema.array(),AnamnesisQuestionOrderByWithAggregationInputSchema ]).optional(),
  by: AnamnesisQuestionScalarFieldEnumSchema.array(),
  having: AnamnesisQuestionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AnamnesisQuestionFindUniqueArgsSchema: z.ZodType<Prisma.AnamnesisQuestionFindUniqueArgs> = z.object({
  select: AnamnesisQuestionSelectSchema.optional(),
  include: AnamnesisQuestionIncludeSchema.optional(),
  where: AnamnesisQuestionWhereUniqueInputSchema,
}).strict() ;

export const AnamnesisQuestionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AnamnesisQuestionFindUniqueOrThrowArgs> = z.object({
  select: AnamnesisQuestionSelectSchema.optional(),
  include: AnamnesisQuestionIncludeSchema.optional(),
  where: AnamnesisQuestionWhereUniqueInputSchema,
}).strict() ;

export const PatientAnamnesisFindFirstArgsSchema: z.ZodType<Prisma.PatientAnamnesisFindFirstArgs> = z.object({
  select: PatientAnamnesisSelectSchema.optional(),
  include: PatientAnamnesisIncludeSchema.optional(),
  where: PatientAnamnesisWhereInputSchema.optional(),
  orderBy: z.union([ PatientAnamnesisOrderByWithRelationInputSchema.array(),PatientAnamnesisOrderByWithRelationInputSchema ]).optional(),
  cursor: PatientAnamnesisWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PatientAnamnesisScalarFieldEnumSchema,PatientAnamnesisScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PatientAnamnesisFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PatientAnamnesisFindFirstOrThrowArgs> = z.object({
  select: PatientAnamnesisSelectSchema.optional(),
  include: PatientAnamnesisIncludeSchema.optional(),
  where: PatientAnamnesisWhereInputSchema.optional(),
  orderBy: z.union([ PatientAnamnesisOrderByWithRelationInputSchema.array(),PatientAnamnesisOrderByWithRelationInputSchema ]).optional(),
  cursor: PatientAnamnesisWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PatientAnamnesisScalarFieldEnumSchema,PatientAnamnesisScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PatientAnamnesisFindManyArgsSchema: z.ZodType<Prisma.PatientAnamnesisFindManyArgs> = z.object({
  select: PatientAnamnesisSelectSchema.optional(),
  include: PatientAnamnesisIncludeSchema.optional(),
  where: PatientAnamnesisWhereInputSchema.optional(),
  orderBy: z.union([ PatientAnamnesisOrderByWithRelationInputSchema.array(),PatientAnamnesisOrderByWithRelationInputSchema ]).optional(),
  cursor: PatientAnamnesisWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PatientAnamnesisScalarFieldEnumSchema,PatientAnamnesisScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PatientAnamnesisAggregateArgsSchema: z.ZodType<Prisma.PatientAnamnesisAggregateArgs> = z.object({
  where: PatientAnamnesisWhereInputSchema.optional(),
  orderBy: z.union([ PatientAnamnesisOrderByWithRelationInputSchema.array(),PatientAnamnesisOrderByWithRelationInputSchema ]).optional(),
  cursor: PatientAnamnesisWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PatientAnamnesisGroupByArgsSchema: z.ZodType<Prisma.PatientAnamnesisGroupByArgs> = z.object({
  where: PatientAnamnesisWhereInputSchema.optional(),
  orderBy: z.union([ PatientAnamnesisOrderByWithAggregationInputSchema.array(),PatientAnamnesisOrderByWithAggregationInputSchema ]).optional(),
  by: PatientAnamnesisScalarFieldEnumSchema.array(),
  having: PatientAnamnesisScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PatientAnamnesisFindUniqueArgsSchema: z.ZodType<Prisma.PatientAnamnesisFindUniqueArgs> = z.object({
  select: PatientAnamnesisSelectSchema.optional(),
  include: PatientAnamnesisIncludeSchema.optional(),
  where: PatientAnamnesisWhereUniqueInputSchema,
}).strict() ;

export const PatientAnamnesisFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PatientAnamnesisFindUniqueOrThrowArgs> = z.object({
  select: PatientAnamnesisSelectSchema.optional(),
  include: PatientAnamnesisIncludeSchema.optional(),
  where: PatientAnamnesisWhereUniqueInputSchema,
}).strict() ;

export const AnamnesisAnswerFindFirstArgsSchema: z.ZodType<Prisma.AnamnesisAnswerFindFirstArgs> = z.object({
  select: AnamnesisAnswerSelectSchema.optional(),
  include: AnamnesisAnswerIncludeSchema.optional(),
  where: AnamnesisAnswerWhereInputSchema.optional(),
  orderBy: z.union([ AnamnesisAnswerOrderByWithRelationInputSchema.array(),AnamnesisAnswerOrderByWithRelationInputSchema ]).optional(),
  cursor: AnamnesisAnswerWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AnamnesisAnswerScalarFieldEnumSchema,AnamnesisAnswerScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AnamnesisAnswerFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AnamnesisAnswerFindFirstOrThrowArgs> = z.object({
  select: AnamnesisAnswerSelectSchema.optional(),
  include: AnamnesisAnswerIncludeSchema.optional(),
  where: AnamnesisAnswerWhereInputSchema.optional(),
  orderBy: z.union([ AnamnesisAnswerOrderByWithRelationInputSchema.array(),AnamnesisAnswerOrderByWithRelationInputSchema ]).optional(),
  cursor: AnamnesisAnswerWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AnamnesisAnswerScalarFieldEnumSchema,AnamnesisAnswerScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AnamnesisAnswerFindManyArgsSchema: z.ZodType<Prisma.AnamnesisAnswerFindManyArgs> = z.object({
  select: AnamnesisAnswerSelectSchema.optional(),
  include: AnamnesisAnswerIncludeSchema.optional(),
  where: AnamnesisAnswerWhereInputSchema.optional(),
  orderBy: z.union([ AnamnesisAnswerOrderByWithRelationInputSchema.array(),AnamnesisAnswerOrderByWithRelationInputSchema ]).optional(),
  cursor: AnamnesisAnswerWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AnamnesisAnswerScalarFieldEnumSchema,AnamnesisAnswerScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AnamnesisAnswerAggregateArgsSchema: z.ZodType<Prisma.AnamnesisAnswerAggregateArgs> = z.object({
  where: AnamnesisAnswerWhereInputSchema.optional(),
  orderBy: z.union([ AnamnesisAnswerOrderByWithRelationInputSchema.array(),AnamnesisAnswerOrderByWithRelationInputSchema ]).optional(),
  cursor: AnamnesisAnswerWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AnamnesisAnswerGroupByArgsSchema: z.ZodType<Prisma.AnamnesisAnswerGroupByArgs> = z.object({
  where: AnamnesisAnswerWhereInputSchema.optional(),
  orderBy: z.union([ AnamnesisAnswerOrderByWithAggregationInputSchema.array(),AnamnesisAnswerOrderByWithAggregationInputSchema ]).optional(),
  by: AnamnesisAnswerScalarFieldEnumSchema.array(),
  having: AnamnesisAnswerScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AnamnesisAnswerFindUniqueArgsSchema: z.ZodType<Prisma.AnamnesisAnswerFindUniqueArgs> = z.object({
  select: AnamnesisAnswerSelectSchema.optional(),
  include: AnamnesisAnswerIncludeSchema.optional(),
  where: AnamnesisAnswerWhereUniqueInputSchema,
}).strict() ;

export const AnamnesisAnswerFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AnamnesisAnswerFindUniqueOrThrowArgs> = z.object({
  select: AnamnesisAnswerSelectSchema.optional(),
  include: AnamnesisAnswerIncludeSchema.optional(),
  where: AnamnesisAnswerWhereUniqueInputSchema,
}).strict() ;

export const AppointmentFindFirstArgsSchema: z.ZodType<Prisma.AppointmentFindFirstArgs> = z.object({
  select: AppointmentSelectSchema.optional(),
  include: AppointmentIncludeSchema.optional(),
  where: AppointmentWhereInputSchema.optional(),
  orderBy: z.union([ AppointmentOrderByWithRelationInputSchema.array(),AppointmentOrderByWithRelationInputSchema ]).optional(),
  cursor: AppointmentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AppointmentScalarFieldEnumSchema,AppointmentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AppointmentFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AppointmentFindFirstOrThrowArgs> = z.object({
  select: AppointmentSelectSchema.optional(),
  include: AppointmentIncludeSchema.optional(),
  where: AppointmentWhereInputSchema.optional(),
  orderBy: z.union([ AppointmentOrderByWithRelationInputSchema.array(),AppointmentOrderByWithRelationInputSchema ]).optional(),
  cursor: AppointmentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AppointmentScalarFieldEnumSchema,AppointmentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AppointmentFindManyArgsSchema: z.ZodType<Prisma.AppointmentFindManyArgs> = z.object({
  select: AppointmentSelectSchema.optional(),
  include: AppointmentIncludeSchema.optional(),
  where: AppointmentWhereInputSchema.optional(),
  orderBy: z.union([ AppointmentOrderByWithRelationInputSchema.array(),AppointmentOrderByWithRelationInputSchema ]).optional(),
  cursor: AppointmentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AppointmentScalarFieldEnumSchema,AppointmentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AppointmentAggregateArgsSchema: z.ZodType<Prisma.AppointmentAggregateArgs> = z.object({
  where: AppointmentWhereInputSchema.optional(),
  orderBy: z.union([ AppointmentOrderByWithRelationInputSchema.array(),AppointmentOrderByWithRelationInputSchema ]).optional(),
  cursor: AppointmentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AppointmentGroupByArgsSchema: z.ZodType<Prisma.AppointmentGroupByArgs> = z.object({
  where: AppointmentWhereInputSchema.optional(),
  orderBy: z.union([ AppointmentOrderByWithAggregationInputSchema.array(),AppointmentOrderByWithAggregationInputSchema ]).optional(),
  by: AppointmentScalarFieldEnumSchema.array(),
  having: AppointmentScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AppointmentFindUniqueArgsSchema: z.ZodType<Prisma.AppointmentFindUniqueArgs> = z.object({
  select: AppointmentSelectSchema.optional(),
  include: AppointmentIncludeSchema.optional(),
  where: AppointmentWhereUniqueInputSchema,
}).strict() ;

export const AppointmentFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AppointmentFindUniqueOrThrowArgs> = z.object({
  select: AppointmentSelectSchema.optional(),
  include: AppointmentIncludeSchema.optional(),
  where: AppointmentWhereUniqueInputSchema,
}).strict() ;

export const OrganizationFindFirstArgsSchema: z.ZodType<Prisma.OrganizationFindFirstArgs> = z.object({
  select: OrganizationSelectSchema.optional(),
  include: OrganizationIncludeSchema.optional(),
  where: OrganizationWhereInputSchema.optional(),
  orderBy: z.union([ OrganizationOrderByWithRelationInputSchema.array(),OrganizationOrderByWithRelationInputSchema ]).optional(),
  cursor: OrganizationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ OrganizationScalarFieldEnumSchema,OrganizationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const OrganizationFindFirstOrThrowArgsSchema: z.ZodType<Prisma.OrganizationFindFirstOrThrowArgs> = z.object({
  select: OrganizationSelectSchema.optional(),
  include: OrganizationIncludeSchema.optional(),
  where: OrganizationWhereInputSchema.optional(),
  orderBy: z.union([ OrganizationOrderByWithRelationInputSchema.array(),OrganizationOrderByWithRelationInputSchema ]).optional(),
  cursor: OrganizationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ OrganizationScalarFieldEnumSchema,OrganizationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const OrganizationFindManyArgsSchema: z.ZodType<Prisma.OrganizationFindManyArgs> = z.object({
  select: OrganizationSelectSchema.optional(),
  include: OrganizationIncludeSchema.optional(),
  where: OrganizationWhereInputSchema.optional(),
  orderBy: z.union([ OrganizationOrderByWithRelationInputSchema.array(),OrganizationOrderByWithRelationInputSchema ]).optional(),
  cursor: OrganizationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ OrganizationScalarFieldEnumSchema,OrganizationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const OrganizationAggregateArgsSchema: z.ZodType<Prisma.OrganizationAggregateArgs> = z.object({
  where: OrganizationWhereInputSchema.optional(),
  orderBy: z.union([ OrganizationOrderByWithRelationInputSchema.array(),OrganizationOrderByWithRelationInputSchema ]).optional(),
  cursor: OrganizationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const OrganizationGroupByArgsSchema: z.ZodType<Prisma.OrganizationGroupByArgs> = z.object({
  where: OrganizationWhereInputSchema.optional(),
  orderBy: z.union([ OrganizationOrderByWithAggregationInputSchema.array(),OrganizationOrderByWithAggregationInputSchema ]).optional(),
  by: OrganizationScalarFieldEnumSchema.array(),
  having: OrganizationScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const OrganizationFindUniqueArgsSchema: z.ZodType<Prisma.OrganizationFindUniqueArgs> = z.object({
  select: OrganizationSelectSchema.optional(),
  include: OrganizationIncludeSchema.optional(),
  where: OrganizationWhereUniqueInputSchema,
}).strict() ;

export const OrganizationFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.OrganizationFindUniqueOrThrowArgs> = z.object({
  select: OrganizationSelectSchema.optional(),
  include: OrganizationIncludeSchema.optional(),
  where: OrganizationWhereUniqueInputSchema,
}).strict() ;

export const FinancialTransactionFindFirstArgsSchema: z.ZodType<Prisma.FinancialTransactionFindFirstArgs> = z.object({
  select: FinancialTransactionSelectSchema.optional(),
  include: FinancialTransactionIncludeSchema.optional(),
  where: FinancialTransactionWhereInputSchema.optional(),
  orderBy: z.union([ FinancialTransactionOrderByWithRelationInputSchema.array(),FinancialTransactionOrderByWithRelationInputSchema ]).optional(),
  cursor: FinancialTransactionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FinancialTransactionScalarFieldEnumSchema,FinancialTransactionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const FinancialTransactionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.FinancialTransactionFindFirstOrThrowArgs> = z.object({
  select: FinancialTransactionSelectSchema.optional(),
  include: FinancialTransactionIncludeSchema.optional(),
  where: FinancialTransactionWhereInputSchema.optional(),
  orderBy: z.union([ FinancialTransactionOrderByWithRelationInputSchema.array(),FinancialTransactionOrderByWithRelationInputSchema ]).optional(),
  cursor: FinancialTransactionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FinancialTransactionScalarFieldEnumSchema,FinancialTransactionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const FinancialTransactionFindManyArgsSchema: z.ZodType<Prisma.FinancialTransactionFindManyArgs> = z.object({
  select: FinancialTransactionSelectSchema.optional(),
  include: FinancialTransactionIncludeSchema.optional(),
  where: FinancialTransactionWhereInputSchema.optional(),
  orderBy: z.union([ FinancialTransactionOrderByWithRelationInputSchema.array(),FinancialTransactionOrderByWithRelationInputSchema ]).optional(),
  cursor: FinancialTransactionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FinancialTransactionScalarFieldEnumSchema,FinancialTransactionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const FinancialTransactionAggregateArgsSchema: z.ZodType<Prisma.FinancialTransactionAggregateArgs> = z.object({
  where: FinancialTransactionWhereInputSchema.optional(),
  orderBy: z.union([ FinancialTransactionOrderByWithRelationInputSchema.array(),FinancialTransactionOrderByWithRelationInputSchema ]).optional(),
  cursor: FinancialTransactionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const FinancialTransactionGroupByArgsSchema: z.ZodType<Prisma.FinancialTransactionGroupByArgs> = z.object({
  where: FinancialTransactionWhereInputSchema.optional(),
  orderBy: z.union([ FinancialTransactionOrderByWithAggregationInputSchema.array(),FinancialTransactionOrderByWithAggregationInputSchema ]).optional(),
  by: FinancialTransactionScalarFieldEnumSchema.array(),
  having: FinancialTransactionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const FinancialTransactionFindUniqueArgsSchema: z.ZodType<Prisma.FinancialTransactionFindUniqueArgs> = z.object({
  select: FinancialTransactionSelectSchema.optional(),
  include: FinancialTransactionIncludeSchema.optional(),
  where: FinancialTransactionWhereUniqueInputSchema,
}).strict() ;

export const FinancialTransactionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.FinancialTransactionFindUniqueOrThrowArgs> = z.object({
  select: FinancialTransactionSelectSchema.optional(),
  include: FinancialTransactionIncludeSchema.optional(),
  where: FinancialTransactionWhereUniqueInputSchema,
}).strict() ;

export const CustomerSatisfactionFindFirstArgsSchema: z.ZodType<Prisma.CustomerSatisfactionFindFirstArgs> = z.object({
  select: CustomerSatisfactionSelectSchema.optional(),
  include: CustomerSatisfactionIncludeSchema.optional(),
  where: CustomerSatisfactionWhereInputSchema.optional(),
  orderBy: z.union([ CustomerSatisfactionOrderByWithRelationInputSchema.array(),CustomerSatisfactionOrderByWithRelationInputSchema ]).optional(),
  cursor: CustomerSatisfactionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CustomerSatisfactionScalarFieldEnumSchema,CustomerSatisfactionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CustomerSatisfactionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CustomerSatisfactionFindFirstOrThrowArgs> = z.object({
  select: CustomerSatisfactionSelectSchema.optional(),
  include: CustomerSatisfactionIncludeSchema.optional(),
  where: CustomerSatisfactionWhereInputSchema.optional(),
  orderBy: z.union([ CustomerSatisfactionOrderByWithRelationInputSchema.array(),CustomerSatisfactionOrderByWithRelationInputSchema ]).optional(),
  cursor: CustomerSatisfactionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CustomerSatisfactionScalarFieldEnumSchema,CustomerSatisfactionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CustomerSatisfactionFindManyArgsSchema: z.ZodType<Prisma.CustomerSatisfactionFindManyArgs> = z.object({
  select: CustomerSatisfactionSelectSchema.optional(),
  include: CustomerSatisfactionIncludeSchema.optional(),
  where: CustomerSatisfactionWhereInputSchema.optional(),
  orderBy: z.union([ CustomerSatisfactionOrderByWithRelationInputSchema.array(),CustomerSatisfactionOrderByWithRelationInputSchema ]).optional(),
  cursor: CustomerSatisfactionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CustomerSatisfactionScalarFieldEnumSchema,CustomerSatisfactionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CustomerSatisfactionAggregateArgsSchema: z.ZodType<Prisma.CustomerSatisfactionAggregateArgs> = z.object({
  where: CustomerSatisfactionWhereInputSchema.optional(),
  orderBy: z.union([ CustomerSatisfactionOrderByWithRelationInputSchema.array(),CustomerSatisfactionOrderByWithRelationInputSchema ]).optional(),
  cursor: CustomerSatisfactionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CustomerSatisfactionGroupByArgsSchema: z.ZodType<Prisma.CustomerSatisfactionGroupByArgs> = z.object({
  where: CustomerSatisfactionWhereInputSchema.optional(),
  orderBy: z.union([ CustomerSatisfactionOrderByWithAggregationInputSchema.array(),CustomerSatisfactionOrderByWithAggregationInputSchema ]).optional(),
  by: CustomerSatisfactionScalarFieldEnumSchema.array(),
  having: CustomerSatisfactionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CustomerSatisfactionFindUniqueArgsSchema: z.ZodType<Prisma.CustomerSatisfactionFindUniqueArgs> = z.object({
  select: CustomerSatisfactionSelectSchema.optional(),
  include: CustomerSatisfactionIncludeSchema.optional(),
  where: CustomerSatisfactionWhereUniqueInputSchema,
}).strict() ;

export const CustomerSatisfactionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CustomerSatisfactionFindUniqueOrThrowArgs> = z.object({
  select: CustomerSatisfactionSelectSchema.optional(),
  include: CustomerSatisfactionIncludeSchema.optional(),
  where: CustomerSatisfactionWhereUniqueInputSchema,
}).strict() ;

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict() ;

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UserCreateManyAndReturnArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
}).strict() ;

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
}).strict() ;

export const TokenCreateArgsSchema: z.ZodType<Prisma.TokenCreateArgs> = z.object({
  select: TokenSelectSchema.optional(),
  include: TokenIncludeSchema.optional(),
  data: z.union([ TokenCreateInputSchema,TokenUncheckedCreateInputSchema ]),
}).strict() ;

export const TokenUpsertArgsSchema: z.ZodType<Prisma.TokenUpsertArgs> = z.object({
  select: TokenSelectSchema.optional(),
  include: TokenIncludeSchema.optional(),
  where: TokenWhereUniqueInputSchema,
  create: z.union([ TokenCreateInputSchema,TokenUncheckedCreateInputSchema ]),
  update: z.union([ TokenUpdateInputSchema,TokenUncheckedUpdateInputSchema ]),
}).strict() ;

export const TokenCreateManyArgsSchema: z.ZodType<Prisma.TokenCreateManyArgs> = z.object({
  data: z.union([ TokenCreateManyInputSchema,TokenCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const TokenCreateManyAndReturnArgsSchema: z.ZodType<Prisma.TokenCreateManyAndReturnArgs> = z.object({
  data: z.union([ TokenCreateManyInputSchema,TokenCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const TokenDeleteArgsSchema: z.ZodType<Prisma.TokenDeleteArgs> = z.object({
  select: TokenSelectSchema.optional(),
  include: TokenIncludeSchema.optional(),
  where: TokenWhereUniqueInputSchema,
}).strict() ;

export const TokenUpdateArgsSchema: z.ZodType<Prisma.TokenUpdateArgs> = z.object({
  select: TokenSelectSchema.optional(),
  include: TokenIncludeSchema.optional(),
  data: z.union([ TokenUpdateInputSchema,TokenUncheckedUpdateInputSchema ]),
  where: TokenWhereUniqueInputSchema,
}).strict() ;

export const TokenUpdateManyArgsSchema: z.ZodType<Prisma.TokenUpdateManyArgs> = z.object({
  data: z.union([ TokenUpdateManyMutationInputSchema,TokenUncheckedUpdateManyInputSchema ]),
  where: TokenWhereInputSchema.optional(),
}).strict() ;

export const TokenDeleteManyArgsSchema: z.ZodType<Prisma.TokenDeleteManyArgs> = z.object({
  where: TokenWhereInputSchema.optional(),
}).strict() ;

export const AccountCreateArgsSchema: z.ZodType<Prisma.AccountCreateArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  data: z.union([ AccountCreateInputSchema,AccountUncheckedCreateInputSchema ]),
}).strict() ;

export const AccountUpsertArgsSchema: z.ZodType<Prisma.AccountUpsertArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
  create: z.union([ AccountCreateInputSchema,AccountUncheckedCreateInputSchema ]),
  update: z.union([ AccountUpdateInputSchema,AccountUncheckedUpdateInputSchema ]),
}).strict() ;

export const AccountCreateManyArgsSchema: z.ZodType<Prisma.AccountCreateManyArgs> = z.object({
  data: z.union([ AccountCreateManyInputSchema,AccountCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const AccountCreateManyAndReturnArgsSchema: z.ZodType<Prisma.AccountCreateManyAndReturnArgs> = z.object({
  data: z.union([ AccountCreateManyInputSchema,AccountCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const AccountDeleteArgsSchema: z.ZodType<Prisma.AccountDeleteArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict() ;

export const AccountUpdateArgsSchema: z.ZodType<Prisma.AccountUpdateArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  data: z.union([ AccountUpdateInputSchema,AccountUncheckedUpdateInputSchema ]),
  where: AccountWhereUniqueInputSchema,
}).strict() ;

export const AccountUpdateManyArgsSchema: z.ZodType<Prisma.AccountUpdateManyArgs> = z.object({
  data: z.union([ AccountUpdateManyMutationInputSchema,AccountUncheckedUpdateManyInputSchema ]),
  where: AccountWhereInputSchema.optional(),
}).strict() ;

export const AccountDeleteManyArgsSchema: z.ZodType<Prisma.AccountDeleteManyArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
}).strict() ;

export const InviteCreateArgsSchema: z.ZodType<Prisma.InviteCreateArgs> = z.object({
  select: InviteSelectSchema.optional(),
  include: InviteIncludeSchema.optional(),
  data: z.union([ InviteCreateInputSchema,InviteUncheckedCreateInputSchema ]),
}).strict() ;

export const InviteUpsertArgsSchema: z.ZodType<Prisma.InviteUpsertArgs> = z.object({
  select: InviteSelectSchema.optional(),
  include: InviteIncludeSchema.optional(),
  where: InviteWhereUniqueInputSchema,
  create: z.union([ InviteCreateInputSchema,InviteUncheckedCreateInputSchema ]),
  update: z.union([ InviteUpdateInputSchema,InviteUncheckedUpdateInputSchema ]),
}).strict() ;

export const InviteCreateManyArgsSchema: z.ZodType<Prisma.InviteCreateManyArgs> = z.object({
  data: z.union([ InviteCreateManyInputSchema,InviteCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const InviteCreateManyAndReturnArgsSchema: z.ZodType<Prisma.InviteCreateManyAndReturnArgs> = z.object({
  data: z.union([ InviteCreateManyInputSchema,InviteCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const InviteDeleteArgsSchema: z.ZodType<Prisma.InviteDeleteArgs> = z.object({
  select: InviteSelectSchema.optional(),
  include: InviteIncludeSchema.optional(),
  where: InviteWhereUniqueInputSchema,
}).strict() ;

export const InviteUpdateArgsSchema: z.ZodType<Prisma.InviteUpdateArgs> = z.object({
  select: InviteSelectSchema.optional(),
  include: InviteIncludeSchema.optional(),
  data: z.union([ InviteUpdateInputSchema,InviteUncheckedUpdateInputSchema ]),
  where: InviteWhereUniqueInputSchema,
}).strict() ;

export const InviteUpdateManyArgsSchema: z.ZodType<Prisma.InviteUpdateManyArgs> = z.object({
  data: z.union([ InviteUpdateManyMutationInputSchema,InviteUncheckedUpdateManyInputSchema ]),
  where: InviteWhereInputSchema.optional(),
}).strict() ;

export const InviteDeleteManyArgsSchema: z.ZodType<Prisma.InviteDeleteManyArgs> = z.object({
  where: InviteWhereInputSchema.optional(),
}).strict() ;

export const MemberCreateArgsSchema: z.ZodType<Prisma.MemberCreateArgs> = z.object({
  select: MemberSelectSchema.optional(),
  include: MemberIncludeSchema.optional(),
  data: z.union([ MemberCreateInputSchema,MemberUncheckedCreateInputSchema ]),
}).strict() ;

export const MemberUpsertArgsSchema: z.ZodType<Prisma.MemberUpsertArgs> = z.object({
  select: MemberSelectSchema.optional(),
  include: MemberIncludeSchema.optional(),
  where: MemberWhereUniqueInputSchema,
  create: z.union([ MemberCreateInputSchema,MemberUncheckedCreateInputSchema ]),
  update: z.union([ MemberUpdateInputSchema,MemberUncheckedUpdateInputSchema ]),
}).strict() ;

export const MemberCreateManyArgsSchema: z.ZodType<Prisma.MemberCreateManyArgs> = z.object({
  data: z.union([ MemberCreateManyInputSchema,MemberCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const MemberCreateManyAndReturnArgsSchema: z.ZodType<Prisma.MemberCreateManyAndReturnArgs> = z.object({
  data: z.union([ MemberCreateManyInputSchema,MemberCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const MemberDeleteArgsSchema: z.ZodType<Prisma.MemberDeleteArgs> = z.object({
  select: MemberSelectSchema.optional(),
  include: MemberIncludeSchema.optional(),
  where: MemberWhereUniqueInputSchema,
}).strict() ;

export const MemberUpdateArgsSchema: z.ZodType<Prisma.MemberUpdateArgs> = z.object({
  select: MemberSelectSchema.optional(),
  include: MemberIncludeSchema.optional(),
  data: z.union([ MemberUpdateInputSchema,MemberUncheckedUpdateInputSchema ]),
  where: MemberWhereUniqueInputSchema,
}).strict() ;

export const MemberUpdateManyArgsSchema: z.ZodType<Prisma.MemberUpdateManyArgs> = z.object({
  data: z.union([ MemberUpdateManyMutationInputSchema,MemberUncheckedUpdateManyInputSchema ]),
  where: MemberWhereInputSchema.optional(),
}).strict() ;

export const MemberDeleteManyArgsSchema: z.ZodType<Prisma.MemberDeleteManyArgs> = z.object({
  where: MemberWhereInputSchema.optional(),
}).strict() ;

export const PatientCreateArgsSchema: z.ZodType<Prisma.PatientCreateArgs> = z.object({
  select: PatientSelectSchema.optional(),
  include: PatientIncludeSchema.optional(),
  data: z.union([ PatientCreateInputSchema,PatientUncheckedCreateInputSchema ]),
}).strict() ;

export const PatientUpsertArgsSchema: z.ZodType<Prisma.PatientUpsertArgs> = z.object({
  select: PatientSelectSchema.optional(),
  include: PatientIncludeSchema.optional(),
  where: PatientWhereUniqueInputSchema,
  create: z.union([ PatientCreateInputSchema,PatientUncheckedCreateInputSchema ]),
  update: z.union([ PatientUpdateInputSchema,PatientUncheckedUpdateInputSchema ]),
}).strict() ;

export const PatientCreateManyArgsSchema: z.ZodType<Prisma.PatientCreateManyArgs> = z.object({
  data: z.union([ PatientCreateManyInputSchema,PatientCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const PatientCreateManyAndReturnArgsSchema: z.ZodType<Prisma.PatientCreateManyAndReturnArgs> = z.object({
  data: z.union([ PatientCreateManyInputSchema,PatientCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const PatientDeleteArgsSchema: z.ZodType<Prisma.PatientDeleteArgs> = z.object({
  select: PatientSelectSchema.optional(),
  include: PatientIncludeSchema.optional(),
  where: PatientWhereUniqueInputSchema,
}).strict() ;

export const PatientUpdateArgsSchema: z.ZodType<Prisma.PatientUpdateArgs> = z.object({
  select: PatientSelectSchema.optional(),
  include: PatientIncludeSchema.optional(),
  data: z.union([ PatientUpdateInputSchema,PatientUncheckedUpdateInputSchema ]),
  where: PatientWhereUniqueInputSchema,
}).strict() ;

export const PatientUpdateManyArgsSchema: z.ZodType<Prisma.PatientUpdateManyArgs> = z.object({
  data: z.union([ PatientUpdateManyMutationInputSchema,PatientUncheckedUpdateManyInputSchema ]),
  where: PatientWhereInputSchema.optional(),
}).strict() ;

export const PatientDeleteManyArgsSchema: z.ZodType<Prisma.PatientDeleteManyArgs> = z.object({
  where: PatientWhereInputSchema.optional(),
}).strict() ;

export const MedicalRecordCreateArgsSchema: z.ZodType<Prisma.MedicalRecordCreateArgs> = z.object({
  select: MedicalRecordSelectSchema.optional(),
  include: MedicalRecordIncludeSchema.optional(),
  data: z.union([ MedicalRecordCreateInputSchema,MedicalRecordUncheckedCreateInputSchema ]),
}).strict() ;

export const MedicalRecordUpsertArgsSchema: z.ZodType<Prisma.MedicalRecordUpsertArgs> = z.object({
  select: MedicalRecordSelectSchema.optional(),
  include: MedicalRecordIncludeSchema.optional(),
  where: MedicalRecordWhereUniqueInputSchema,
  create: z.union([ MedicalRecordCreateInputSchema,MedicalRecordUncheckedCreateInputSchema ]),
  update: z.union([ MedicalRecordUpdateInputSchema,MedicalRecordUncheckedUpdateInputSchema ]),
}).strict() ;

export const MedicalRecordCreateManyArgsSchema: z.ZodType<Prisma.MedicalRecordCreateManyArgs> = z.object({
  data: z.union([ MedicalRecordCreateManyInputSchema,MedicalRecordCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const MedicalRecordCreateManyAndReturnArgsSchema: z.ZodType<Prisma.MedicalRecordCreateManyAndReturnArgs> = z.object({
  data: z.union([ MedicalRecordCreateManyInputSchema,MedicalRecordCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const MedicalRecordDeleteArgsSchema: z.ZodType<Prisma.MedicalRecordDeleteArgs> = z.object({
  select: MedicalRecordSelectSchema.optional(),
  include: MedicalRecordIncludeSchema.optional(),
  where: MedicalRecordWhereUniqueInputSchema,
}).strict() ;

export const MedicalRecordUpdateArgsSchema: z.ZodType<Prisma.MedicalRecordUpdateArgs> = z.object({
  select: MedicalRecordSelectSchema.optional(),
  include: MedicalRecordIncludeSchema.optional(),
  data: z.union([ MedicalRecordUpdateInputSchema,MedicalRecordUncheckedUpdateInputSchema ]),
  where: MedicalRecordWhereUniqueInputSchema,
}).strict() ;

export const MedicalRecordUpdateManyArgsSchema: z.ZodType<Prisma.MedicalRecordUpdateManyArgs> = z.object({
  data: z.union([ MedicalRecordUpdateManyMutationInputSchema,MedicalRecordUncheckedUpdateManyInputSchema ]),
  where: MedicalRecordWhereInputSchema.optional(),
}).strict() ;

export const MedicalRecordDeleteManyArgsSchema: z.ZodType<Prisma.MedicalRecordDeleteManyArgs> = z.object({
  where: MedicalRecordWhereInputSchema.optional(),
}).strict() ;

export const AnamnesisCreateArgsSchema: z.ZodType<Prisma.AnamnesisCreateArgs> = z.object({
  select: AnamnesisSelectSchema.optional(),
  include: AnamnesisIncludeSchema.optional(),
  data: z.union([ AnamnesisCreateInputSchema,AnamnesisUncheckedCreateInputSchema ]),
}).strict() ;

export const AnamnesisUpsertArgsSchema: z.ZodType<Prisma.AnamnesisUpsertArgs> = z.object({
  select: AnamnesisSelectSchema.optional(),
  include: AnamnesisIncludeSchema.optional(),
  where: AnamnesisWhereUniqueInputSchema,
  create: z.union([ AnamnesisCreateInputSchema,AnamnesisUncheckedCreateInputSchema ]),
  update: z.union([ AnamnesisUpdateInputSchema,AnamnesisUncheckedUpdateInputSchema ]),
}).strict() ;

export const AnamnesisCreateManyArgsSchema: z.ZodType<Prisma.AnamnesisCreateManyArgs> = z.object({
  data: z.union([ AnamnesisCreateManyInputSchema,AnamnesisCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const AnamnesisCreateManyAndReturnArgsSchema: z.ZodType<Prisma.AnamnesisCreateManyAndReturnArgs> = z.object({
  data: z.union([ AnamnesisCreateManyInputSchema,AnamnesisCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const AnamnesisDeleteArgsSchema: z.ZodType<Prisma.AnamnesisDeleteArgs> = z.object({
  select: AnamnesisSelectSchema.optional(),
  include: AnamnesisIncludeSchema.optional(),
  where: AnamnesisWhereUniqueInputSchema,
}).strict() ;

export const AnamnesisUpdateArgsSchema: z.ZodType<Prisma.AnamnesisUpdateArgs> = z.object({
  select: AnamnesisSelectSchema.optional(),
  include: AnamnesisIncludeSchema.optional(),
  data: z.union([ AnamnesisUpdateInputSchema,AnamnesisUncheckedUpdateInputSchema ]),
  where: AnamnesisWhereUniqueInputSchema,
}).strict() ;

export const AnamnesisUpdateManyArgsSchema: z.ZodType<Prisma.AnamnesisUpdateManyArgs> = z.object({
  data: z.union([ AnamnesisUpdateManyMutationInputSchema,AnamnesisUncheckedUpdateManyInputSchema ]),
  where: AnamnesisWhereInputSchema.optional(),
}).strict() ;

export const AnamnesisDeleteManyArgsSchema: z.ZodType<Prisma.AnamnesisDeleteManyArgs> = z.object({
  where: AnamnesisWhereInputSchema.optional(),
}).strict() ;

export const AnamnesisTemplateCreateArgsSchema: z.ZodType<Prisma.AnamnesisTemplateCreateArgs> = z.object({
  select: AnamnesisTemplateSelectSchema.optional(),
  include: AnamnesisTemplateIncludeSchema.optional(),
  data: z.union([ AnamnesisTemplateCreateInputSchema,AnamnesisTemplateUncheckedCreateInputSchema ]),
}).strict() ;

export const AnamnesisTemplateUpsertArgsSchema: z.ZodType<Prisma.AnamnesisTemplateUpsertArgs> = z.object({
  select: AnamnesisTemplateSelectSchema.optional(),
  include: AnamnesisTemplateIncludeSchema.optional(),
  where: AnamnesisTemplateWhereUniqueInputSchema,
  create: z.union([ AnamnesisTemplateCreateInputSchema,AnamnesisTemplateUncheckedCreateInputSchema ]),
  update: z.union([ AnamnesisTemplateUpdateInputSchema,AnamnesisTemplateUncheckedUpdateInputSchema ]),
}).strict() ;

export const AnamnesisTemplateCreateManyArgsSchema: z.ZodType<Prisma.AnamnesisTemplateCreateManyArgs> = z.object({
  data: z.union([ AnamnesisTemplateCreateManyInputSchema,AnamnesisTemplateCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const AnamnesisTemplateCreateManyAndReturnArgsSchema: z.ZodType<Prisma.AnamnesisTemplateCreateManyAndReturnArgs> = z.object({
  data: z.union([ AnamnesisTemplateCreateManyInputSchema,AnamnesisTemplateCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const AnamnesisTemplateDeleteArgsSchema: z.ZodType<Prisma.AnamnesisTemplateDeleteArgs> = z.object({
  select: AnamnesisTemplateSelectSchema.optional(),
  include: AnamnesisTemplateIncludeSchema.optional(),
  where: AnamnesisTemplateWhereUniqueInputSchema,
}).strict() ;

export const AnamnesisTemplateUpdateArgsSchema: z.ZodType<Prisma.AnamnesisTemplateUpdateArgs> = z.object({
  select: AnamnesisTemplateSelectSchema.optional(),
  include: AnamnesisTemplateIncludeSchema.optional(),
  data: z.union([ AnamnesisTemplateUpdateInputSchema,AnamnesisTemplateUncheckedUpdateInputSchema ]),
  where: AnamnesisTemplateWhereUniqueInputSchema,
}).strict() ;

export const AnamnesisTemplateUpdateManyArgsSchema: z.ZodType<Prisma.AnamnesisTemplateUpdateManyArgs> = z.object({
  data: z.union([ AnamnesisTemplateUpdateManyMutationInputSchema,AnamnesisTemplateUncheckedUpdateManyInputSchema ]),
  where: AnamnesisTemplateWhereInputSchema.optional(),
}).strict() ;

export const AnamnesisTemplateDeleteManyArgsSchema: z.ZodType<Prisma.AnamnesisTemplateDeleteManyArgs> = z.object({
  where: AnamnesisTemplateWhereInputSchema.optional(),
}).strict() ;

export const AnamnesisQuestionCreateArgsSchema: z.ZodType<Prisma.AnamnesisQuestionCreateArgs> = z.object({
  select: AnamnesisQuestionSelectSchema.optional(),
  include: AnamnesisQuestionIncludeSchema.optional(),
  data: z.union([ AnamnesisQuestionCreateInputSchema,AnamnesisQuestionUncheckedCreateInputSchema ]),
}).strict() ;

export const AnamnesisQuestionUpsertArgsSchema: z.ZodType<Prisma.AnamnesisQuestionUpsertArgs> = z.object({
  select: AnamnesisQuestionSelectSchema.optional(),
  include: AnamnesisQuestionIncludeSchema.optional(),
  where: AnamnesisQuestionWhereUniqueInputSchema,
  create: z.union([ AnamnesisQuestionCreateInputSchema,AnamnesisQuestionUncheckedCreateInputSchema ]),
  update: z.union([ AnamnesisQuestionUpdateInputSchema,AnamnesisQuestionUncheckedUpdateInputSchema ]),
}).strict() ;

export const AnamnesisQuestionCreateManyArgsSchema: z.ZodType<Prisma.AnamnesisQuestionCreateManyArgs> = z.object({
  data: z.union([ AnamnesisQuestionCreateManyInputSchema,AnamnesisQuestionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const AnamnesisQuestionCreateManyAndReturnArgsSchema: z.ZodType<Prisma.AnamnesisQuestionCreateManyAndReturnArgs> = z.object({
  data: z.union([ AnamnesisQuestionCreateManyInputSchema,AnamnesisQuestionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const AnamnesisQuestionDeleteArgsSchema: z.ZodType<Prisma.AnamnesisQuestionDeleteArgs> = z.object({
  select: AnamnesisQuestionSelectSchema.optional(),
  include: AnamnesisQuestionIncludeSchema.optional(),
  where: AnamnesisQuestionWhereUniqueInputSchema,
}).strict() ;

export const AnamnesisQuestionUpdateArgsSchema: z.ZodType<Prisma.AnamnesisQuestionUpdateArgs> = z.object({
  select: AnamnesisQuestionSelectSchema.optional(),
  include: AnamnesisQuestionIncludeSchema.optional(),
  data: z.union([ AnamnesisQuestionUpdateInputSchema,AnamnesisQuestionUncheckedUpdateInputSchema ]),
  where: AnamnesisQuestionWhereUniqueInputSchema,
}).strict() ;

export const AnamnesisQuestionUpdateManyArgsSchema: z.ZodType<Prisma.AnamnesisQuestionUpdateManyArgs> = z.object({
  data: z.union([ AnamnesisQuestionUpdateManyMutationInputSchema,AnamnesisQuestionUncheckedUpdateManyInputSchema ]),
  where: AnamnesisQuestionWhereInputSchema.optional(),
}).strict() ;

export const AnamnesisQuestionDeleteManyArgsSchema: z.ZodType<Prisma.AnamnesisQuestionDeleteManyArgs> = z.object({
  where: AnamnesisQuestionWhereInputSchema.optional(),
}).strict() ;

export const PatientAnamnesisCreateArgsSchema: z.ZodType<Prisma.PatientAnamnesisCreateArgs> = z.object({
  select: PatientAnamnesisSelectSchema.optional(),
  include: PatientAnamnesisIncludeSchema.optional(),
  data: z.union([ PatientAnamnesisCreateInputSchema,PatientAnamnesisUncheckedCreateInputSchema ]),
}).strict() ;

export const PatientAnamnesisUpsertArgsSchema: z.ZodType<Prisma.PatientAnamnesisUpsertArgs> = z.object({
  select: PatientAnamnesisSelectSchema.optional(),
  include: PatientAnamnesisIncludeSchema.optional(),
  where: PatientAnamnesisWhereUniqueInputSchema,
  create: z.union([ PatientAnamnesisCreateInputSchema,PatientAnamnesisUncheckedCreateInputSchema ]),
  update: z.union([ PatientAnamnesisUpdateInputSchema,PatientAnamnesisUncheckedUpdateInputSchema ]),
}).strict() ;

export const PatientAnamnesisCreateManyArgsSchema: z.ZodType<Prisma.PatientAnamnesisCreateManyArgs> = z.object({
  data: z.union([ PatientAnamnesisCreateManyInputSchema,PatientAnamnesisCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const PatientAnamnesisCreateManyAndReturnArgsSchema: z.ZodType<Prisma.PatientAnamnesisCreateManyAndReturnArgs> = z.object({
  data: z.union([ PatientAnamnesisCreateManyInputSchema,PatientAnamnesisCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const PatientAnamnesisDeleteArgsSchema: z.ZodType<Prisma.PatientAnamnesisDeleteArgs> = z.object({
  select: PatientAnamnesisSelectSchema.optional(),
  include: PatientAnamnesisIncludeSchema.optional(),
  where: PatientAnamnesisWhereUniqueInputSchema,
}).strict() ;

export const PatientAnamnesisUpdateArgsSchema: z.ZodType<Prisma.PatientAnamnesisUpdateArgs> = z.object({
  select: PatientAnamnesisSelectSchema.optional(),
  include: PatientAnamnesisIncludeSchema.optional(),
  data: z.union([ PatientAnamnesisUpdateInputSchema,PatientAnamnesisUncheckedUpdateInputSchema ]),
  where: PatientAnamnesisWhereUniqueInputSchema,
}).strict() ;

export const PatientAnamnesisUpdateManyArgsSchema: z.ZodType<Prisma.PatientAnamnesisUpdateManyArgs> = z.object({
  data: z.union([ PatientAnamnesisUpdateManyMutationInputSchema,PatientAnamnesisUncheckedUpdateManyInputSchema ]),
  where: PatientAnamnesisWhereInputSchema.optional(),
}).strict() ;

export const PatientAnamnesisDeleteManyArgsSchema: z.ZodType<Prisma.PatientAnamnesisDeleteManyArgs> = z.object({
  where: PatientAnamnesisWhereInputSchema.optional(),
}).strict() ;

export const AnamnesisAnswerCreateArgsSchema: z.ZodType<Prisma.AnamnesisAnswerCreateArgs> = z.object({
  select: AnamnesisAnswerSelectSchema.optional(),
  include: AnamnesisAnswerIncludeSchema.optional(),
  data: z.union([ AnamnesisAnswerCreateInputSchema,AnamnesisAnswerUncheckedCreateInputSchema ]),
}).strict() ;

export const AnamnesisAnswerUpsertArgsSchema: z.ZodType<Prisma.AnamnesisAnswerUpsertArgs> = z.object({
  select: AnamnesisAnswerSelectSchema.optional(),
  include: AnamnesisAnswerIncludeSchema.optional(),
  where: AnamnesisAnswerWhereUniqueInputSchema,
  create: z.union([ AnamnesisAnswerCreateInputSchema,AnamnesisAnswerUncheckedCreateInputSchema ]),
  update: z.union([ AnamnesisAnswerUpdateInputSchema,AnamnesisAnswerUncheckedUpdateInputSchema ]),
}).strict() ;

export const AnamnesisAnswerCreateManyArgsSchema: z.ZodType<Prisma.AnamnesisAnswerCreateManyArgs> = z.object({
  data: z.union([ AnamnesisAnswerCreateManyInputSchema,AnamnesisAnswerCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const AnamnesisAnswerCreateManyAndReturnArgsSchema: z.ZodType<Prisma.AnamnesisAnswerCreateManyAndReturnArgs> = z.object({
  data: z.union([ AnamnesisAnswerCreateManyInputSchema,AnamnesisAnswerCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const AnamnesisAnswerDeleteArgsSchema: z.ZodType<Prisma.AnamnesisAnswerDeleteArgs> = z.object({
  select: AnamnesisAnswerSelectSchema.optional(),
  include: AnamnesisAnswerIncludeSchema.optional(),
  where: AnamnesisAnswerWhereUniqueInputSchema,
}).strict() ;

export const AnamnesisAnswerUpdateArgsSchema: z.ZodType<Prisma.AnamnesisAnswerUpdateArgs> = z.object({
  select: AnamnesisAnswerSelectSchema.optional(),
  include: AnamnesisAnswerIncludeSchema.optional(),
  data: z.union([ AnamnesisAnswerUpdateInputSchema,AnamnesisAnswerUncheckedUpdateInputSchema ]),
  where: AnamnesisAnswerWhereUniqueInputSchema,
}).strict() ;

export const AnamnesisAnswerUpdateManyArgsSchema: z.ZodType<Prisma.AnamnesisAnswerUpdateManyArgs> = z.object({
  data: z.union([ AnamnesisAnswerUpdateManyMutationInputSchema,AnamnesisAnswerUncheckedUpdateManyInputSchema ]),
  where: AnamnesisAnswerWhereInputSchema.optional(),
}).strict() ;

export const AnamnesisAnswerDeleteManyArgsSchema: z.ZodType<Prisma.AnamnesisAnswerDeleteManyArgs> = z.object({
  where: AnamnesisAnswerWhereInputSchema.optional(),
}).strict() ;

export const AppointmentCreateArgsSchema: z.ZodType<Prisma.AppointmentCreateArgs> = z.object({
  select: AppointmentSelectSchema.optional(),
  include: AppointmentIncludeSchema.optional(),
  data: z.union([ AppointmentCreateInputSchema,AppointmentUncheckedCreateInputSchema ]),
}).strict() ;

export const AppointmentUpsertArgsSchema: z.ZodType<Prisma.AppointmentUpsertArgs> = z.object({
  select: AppointmentSelectSchema.optional(),
  include: AppointmentIncludeSchema.optional(),
  where: AppointmentWhereUniqueInputSchema,
  create: z.union([ AppointmentCreateInputSchema,AppointmentUncheckedCreateInputSchema ]),
  update: z.union([ AppointmentUpdateInputSchema,AppointmentUncheckedUpdateInputSchema ]),
}).strict() ;

export const AppointmentCreateManyArgsSchema: z.ZodType<Prisma.AppointmentCreateManyArgs> = z.object({
  data: z.union([ AppointmentCreateManyInputSchema,AppointmentCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const AppointmentCreateManyAndReturnArgsSchema: z.ZodType<Prisma.AppointmentCreateManyAndReturnArgs> = z.object({
  data: z.union([ AppointmentCreateManyInputSchema,AppointmentCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const AppointmentDeleteArgsSchema: z.ZodType<Prisma.AppointmentDeleteArgs> = z.object({
  select: AppointmentSelectSchema.optional(),
  include: AppointmentIncludeSchema.optional(),
  where: AppointmentWhereUniqueInputSchema,
}).strict() ;

export const AppointmentUpdateArgsSchema: z.ZodType<Prisma.AppointmentUpdateArgs> = z.object({
  select: AppointmentSelectSchema.optional(),
  include: AppointmentIncludeSchema.optional(),
  data: z.union([ AppointmentUpdateInputSchema,AppointmentUncheckedUpdateInputSchema ]),
  where: AppointmentWhereUniqueInputSchema,
}).strict() ;

export const AppointmentUpdateManyArgsSchema: z.ZodType<Prisma.AppointmentUpdateManyArgs> = z.object({
  data: z.union([ AppointmentUpdateManyMutationInputSchema,AppointmentUncheckedUpdateManyInputSchema ]),
  where: AppointmentWhereInputSchema.optional(),
}).strict() ;

export const AppointmentDeleteManyArgsSchema: z.ZodType<Prisma.AppointmentDeleteManyArgs> = z.object({
  where: AppointmentWhereInputSchema.optional(),
}).strict() ;

export const OrganizationCreateArgsSchema: z.ZodType<Prisma.OrganizationCreateArgs> = z.object({
  select: OrganizationSelectSchema.optional(),
  include: OrganizationIncludeSchema.optional(),
  data: z.union([ OrganizationCreateInputSchema,OrganizationUncheckedCreateInputSchema ]),
}).strict() ;

export const OrganizationUpsertArgsSchema: z.ZodType<Prisma.OrganizationUpsertArgs> = z.object({
  select: OrganizationSelectSchema.optional(),
  include: OrganizationIncludeSchema.optional(),
  where: OrganizationWhereUniqueInputSchema,
  create: z.union([ OrganizationCreateInputSchema,OrganizationUncheckedCreateInputSchema ]),
  update: z.union([ OrganizationUpdateInputSchema,OrganizationUncheckedUpdateInputSchema ]),
}).strict() ;

export const OrganizationCreateManyArgsSchema: z.ZodType<Prisma.OrganizationCreateManyArgs> = z.object({
  data: z.union([ OrganizationCreateManyInputSchema,OrganizationCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const OrganizationCreateManyAndReturnArgsSchema: z.ZodType<Prisma.OrganizationCreateManyAndReturnArgs> = z.object({
  data: z.union([ OrganizationCreateManyInputSchema,OrganizationCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const OrganizationDeleteArgsSchema: z.ZodType<Prisma.OrganizationDeleteArgs> = z.object({
  select: OrganizationSelectSchema.optional(),
  include: OrganizationIncludeSchema.optional(),
  where: OrganizationWhereUniqueInputSchema,
}).strict() ;

export const OrganizationUpdateArgsSchema: z.ZodType<Prisma.OrganizationUpdateArgs> = z.object({
  select: OrganizationSelectSchema.optional(),
  include: OrganizationIncludeSchema.optional(),
  data: z.union([ OrganizationUpdateInputSchema,OrganizationUncheckedUpdateInputSchema ]),
  where: OrganizationWhereUniqueInputSchema,
}).strict() ;

export const OrganizationUpdateManyArgsSchema: z.ZodType<Prisma.OrganizationUpdateManyArgs> = z.object({
  data: z.union([ OrganizationUpdateManyMutationInputSchema,OrganizationUncheckedUpdateManyInputSchema ]),
  where: OrganizationWhereInputSchema.optional(),
}).strict() ;

export const OrganizationDeleteManyArgsSchema: z.ZodType<Prisma.OrganizationDeleteManyArgs> = z.object({
  where: OrganizationWhereInputSchema.optional(),
}).strict() ;

export const FinancialTransactionCreateArgsSchema: z.ZodType<Prisma.FinancialTransactionCreateArgs> = z.object({
  select: FinancialTransactionSelectSchema.optional(),
  include: FinancialTransactionIncludeSchema.optional(),
  data: z.union([ FinancialTransactionCreateInputSchema,FinancialTransactionUncheckedCreateInputSchema ]),
}).strict() ;

export const FinancialTransactionUpsertArgsSchema: z.ZodType<Prisma.FinancialTransactionUpsertArgs> = z.object({
  select: FinancialTransactionSelectSchema.optional(),
  include: FinancialTransactionIncludeSchema.optional(),
  where: FinancialTransactionWhereUniqueInputSchema,
  create: z.union([ FinancialTransactionCreateInputSchema,FinancialTransactionUncheckedCreateInputSchema ]),
  update: z.union([ FinancialTransactionUpdateInputSchema,FinancialTransactionUncheckedUpdateInputSchema ]),
}).strict() ;

export const FinancialTransactionCreateManyArgsSchema: z.ZodType<Prisma.FinancialTransactionCreateManyArgs> = z.object({
  data: z.union([ FinancialTransactionCreateManyInputSchema,FinancialTransactionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const FinancialTransactionCreateManyAndReturnArgsSchema: z.ZodType<Prisma.FinancialTransactionCreateManyAndReturnArgs> = z.object({
  data: z.union([ FinancialTransactionCreateManyInputSchema,FinancialTransactionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const FinancialTransactionDeleteArgsSchema: z.ZodType<Prisma.FinancialTransactionDeleteArgs> = z.object({
  select: FinancialTransactionSelectSchema.optional(),
  include: FinancialTransactionIncludeSchema.optional(),
  where: FinancialTransactionWhereUniqueInputSchema,
}).strict() ;

export const FinancialTransactionUpdateArgsSchema: z.ZodType<Prisma.FinancialTransactionUpdateArgs> = z.object({
  select: FinancialTransactionSelectSchema.optional(),
  include: FinancialTransactionIncludeSchema.optional(),
  data: z.union([ FinancialTransactionUpdateInputSchema,FinancialTransactionUncheckedUpdateInputSchema ]),
  where: FinancialTransactionWhereUniqueInputSchema,
}).strict() ;

export const FinancialTransactionUpdateManyArgsSchema: z.ZodType<Prisma.FinancialTransactionUpdateManyArgs> = z.object({
  data: z.union([ FinancialTransactionUpdateManyMutationInputSchema,FinancialTransactionUncheckedUpdateManyInputSchema ]),
  where: FinancialTransactionWhereInputSchema.optional(),
}).strict() ;

export const FinancialTransactionDeleteManyArgsSchema: z.ZodType<Prisma.FinancialTransactionDeleteManyArgs> = z.object({
  where: FinancialTransactionWhereInputSchema.optional(),
}).strict() ;

export const CustomerSatisfactionCreateArgsSchema: z.ZodType<Prisma.CustomerSatisfactionCreateArgs> = z.object({
  select: CustomerSatisfactionSelectSchema.optional(),
  include: CustomerSatisfactionIncludeSchema.optional(),
  data: z.union([ CustomerSatisfactionCreateInputSchema,CustomerSatisfactionUncheckedCreateInputSchema ]),
}).strict() ;

export const CustomerSatisfactionUpsertArgsSchema: z.ZodType<Prisma.CustomerSatisfactionUpsertArgs> = z.object({
  select: CustomerSatisfactionSelectSchema.optional(),
  include: CustomerSatisfactionIncludeSchema.optional(),
  where: CustomerSatisfactionWhereUniqueInputSchema,
  create: z.union([ CustomerSatisfactionCreateInputSchema,CustomerSatisfactionUncheckedCreateInputSchema ]),
  update: z.union([ CustomerSatisfactionUpdateInputSchema,CustomerSatisfactionUncheckedUpdateInputSchema ]),
}).strict() ;

export const CustomerSatisfactionCreateManyArgsSchema: z.ZodType<Prisma.CustomerSatisfactionCreateManyArgs> = z.object({
  data: z.union([ CustomerSatisfactionCreateManyInputSchema,CustomerSatisfactionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const CustomerSatisfactionCreateManyAndReturnArgsSchema: z.ZodType<Prisma.CustomerSatisfactionCreateManyAndReturnArgs> = z.object({
  data: z.union([ CustomerSatisfactionCreateManyInputSchema,CustomerSatisfactionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const CustomerSatisfactionDeleteArgsSchema: z.ZodType<Prisma.CustomerSatisfactionDeleteArgs> = z.object({
  select: CustomerSatisfactionSelectSchema.optional(),
  include: CustomerSatisfactionIncludeSchema.optional(),
  where: CustomerSatisfactionWhereUniqueInputSchema,
}).strict() ;

export const CustomerSatisfactionUpdateArgsSchema: z.ZodType<Prisma.CustomerSatisfactionUpdateArgs> = z.object({
  select: CustomerSatisfactionSelectSchema.optional(),
  include: CustomerSatisfactionIncludeSchema.optional(),
  data: z.union([ CustomerSatisfactionUpdateInputSchema,CustomerSatisfactionUncheckedUpdateInputSchema ]),
  where: CustomerSatisfactionWhereUniqueInputSchema,
}).strict() ;

export const CustomerSatisfactionUpdateManyArgsSchema: z.ZodType<Prisma.CustomerSatisfactionUpdateManyArgs> = z.object({
  data: z.union([ CustomerSatisfactionUpdateManyMutationInputSchema,CustomerSatisfactionUncheckedUpdateManyInputSchema ]),
  where: CustomerSatisfactionWhereInputSchema.optional(),
}).strict() ;

export const CustomerSatisfactionDeleteManyArgsSchema: z.ZodType<Prisma.CustomerSatisfactionDeleteManyArgs> = z.object({
  where: CustomerSatisfactionWhereInputSchema.optional(),
}).strict() ;