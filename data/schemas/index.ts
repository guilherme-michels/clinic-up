import { z } from "zod";
import type { Prisma } from "@prisma/client";

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum([
	"ReadUncommitted",
	"ReadCommitted",
	"RepeatableRead",
	"Serializable",
]);

export const UserScalarFieldEnumSchema = z.enum([
	"id",
	"name",
	"email",
	"passwordHash",
	"avatarUrl",
	"createdAt",
	"updatedAt",
]);

export const TokenScalarFieldEnumSchema = z.enum([
	"id",
	"type",
	"createdAt",
	"userId",
]);

export const AccountScalarFieldEnumSchema = z.enum([
	"id",
	"provider",
	"providerAccountId",
	"userId",
]);

export const InviteScalarFieldEnumSchema = z.enum([
	"id",
	"email",
	"role",
	"createdAt",
	"authorId",
	"organizationId",
]);

export const MemberScalarFieldEnumSchema = z.enum([
	"id",
	"role",
	"specialty",
	"organizationId",
	"userId",
]);

export const PatientScalarFieldEnumSchema = z.enum([
	"id",
	"name",
	"email",
	"phone",
	"birthDate",
	"address",
	"createdAt",
	"updatedAt",
	"organizationId",
]);

export const AppointmentScalarFieldEnumSchema = z.enum([
	"id",
	"startTime",
	"endTime",
	"description",
	"status",
	"createdAt",
	"updatedAt",
	"patientId",
	"memberId",
]);

export const OrganizationScalarFieldEnumSchema = z.enum([
	"id",
	"name",
	"slug",
	"domain",
	"shouldAttachUsersByDomain",
	"avatarUrl",
	"createdAt",
	"updatedAt",
	"ownerId",
]);

export const SortOrderSchema = z.enum(["asc", "desc"]);

export const QueryModeSchema = z.enum(["default", "insensitive"]);

export const NullsOrderSchema = z.enum(["first", "last"]);

export const TokenTypeSchema = z.enum(["PASSWORD_RECOVER"]);

export type TokenTypeType = `${z.infer<typeof TokenTypeSchema>}`;

export const AccountProviderSchema = z.enum(["GMAIL", "GITHUB"]);

export type AccountProviderType = `${z.infer<typeof AccountProviderSchema>}`;

export const RoleSchema = z.enum(["ADMIN", "MEMBER", "BILLING"]);

export type RoleType = `${z.infer<typeof RoleSchema>}`;

export const AppointmentStatusSchema = z.enum([
	"SCHEDULED",
	"CONFIRMED",
	"CANCELLED",
	"COMPLETED",
]);

export type AppointmentStatusType =
	`${z.infer<typeof AppointmentStatusSchema>}`;

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
});

export type User = z.infer<typeof UserSchema>;

// USER OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const UserOptionalDefaultsSchema = UserSchema.merge(
	z.object({
		id: z.string().optional(),
		createdAt: z.coerce.date().optional(),
		updatedAt: z.coerce.date().optional(),
	}),
);

export type UserOptionalDefaults = z.infer<typeof UserOptionalDefaultsSchema>;

/////////////////////////////////////////
// TOKEN SCHEMA
/////////////////////////////////////////

export const TokenSchema = z.object({
	type: TokenTypeSchema,
	id: z.string(),
	createdAt: z.coerce.date(),
	userId: z.string(),
});

export type Token = z.infer<typeof TokenSchema>;

// TOKEN OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const TokenOptionalDefaultsSchema = TokenSchema.merge(
	z.object({
		id: z.string().optional(),
		createdAt: z.coerce.date().optional(),
	}),
);

export type TokenOptionalDefaults = z.infer<typeof TokenOptionalDefaultsSchema>;

/////////////////////////////////////////
// ACCOUNT SCHEMA
/////////////////////////////////////////

export const AccountSchema = z.object({
	provider: AccountProviderSchema,
	id: z.string(),
	providerAccountId: z.string(),
	userId: z.string(),
});

export type Account = z.infer<typeof AccountSchema>;

// ACCOUNT OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const AccountOptionalDefaultsSchema = AccountSchema.merge(
	z.object({
		id: z.string().optional(),
	}),
);

export type AccountOptionalDefaults = z.infer<
	typeof AccountOptionalDefaultsSchema
>;

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
});

export type Invite = z.infer<typeof InviteSchema>;

// INVITE OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const InviteOptionalDefaultsSchema = InviteSchema.merge(
	z.object({
		id: z.string().optional(),
		createdAt: z.coerce.date().optional(),
	}),
);

export type InviteOptionalDefaults = z.infer<
	typeof InviteOptionalDefaultsSchema
>;

/////////////////////////////////////////
// MEMBER SCHEMA
/////////////////////////////////////////

export const MemberSchema = z.object({
	role: RoleSchema,
	id: z.string(),
	specialty: z.string().nullable(),
	organizationId: z.string(),
	userId: z.string(),
});

export type Member = z.infer<typeof MemberSchema>;

// MEMBER OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const MemberOptionalDefaultsSchema = MemberSchema.merge(
	z.object({
		role: RoleSchema.optional(),
		id: z.string().optional(),
	}),
);

export type MemberOptionalDefaults = z.infer<
	typeof MemberOptionalDefaultsSchema
>;

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
});

export type Patient = z.infer<typeof PatientSchema>;

// PATIENT OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const PatientOptionalDefaultsSchema = PatientSchema.merge(
	z.object({
		id: z.string().optional(),
		createdAt: z.coerce.date().optional(),
		updatedAt: z.coerce.date().optional(),
	}),
);

export type PatientOptionalDefaults = z.infer<
	typeof PatientOptionalDefaultsSchema
>;

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
});

export type Appointment = z.infer<typeof AppointmentSchema>;

// APPOINTMENT OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const AppointmentOptionalDefaultsSchema = AppointmentSchema.merge(
	z.object({
		status: AppointmentStatusSchema.optional(),
		id: z.string().optional(),
		createdAt: z.coerce.date().optional(),
		updatedAt: z.coerce.date().optional(),
	}),
);

export type AppointmentOptionalDefaults = z.infer<
	typeof AppointmentOptionalDefaultsSchema
>;

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
});

export type Organization = z.infer<typeof OrganizationSchema>;

// ORGANIZATION OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const OrganizationOptionalDefaultsSchema = OrganizationSchema.merge(
	z.object({
		id: z.string().optional(),
		shouldAttachUsersByDomain: z.boolean().optional(),
		createdAt: z.coerce.date().optional(),
		updatedAt: z.coerce.date().optional(),
	}),
);

export type OrganizationOptionalDefaults = z.infer<
	typeof OrganizationOptionalDefaultsSchema
>;

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z
	.object({
		tokens: z
			.union([z.boolean(), z.lazy(() => TokenFindManyArgsSchema)])
			.optional(),
		accounts: z
			.union([z.boolean(), z.lazy(() => AccountFindManyArgsSchema)])
			.optional(),
		invites: z
			.union([z.boolean(), z.lazy(() => InviteFindManyArgsSchema)])
			.optional(),
		member_on: z
			.union([z.boolean(), z.lazy(() => MemberFindManyArgsSchema)])
			.optional(),
		owns_organizations: z
			.union([z.boolean(), z.lazy(() => OrganizationFindManyArgsSchema)])
			.optional(),
		_count: z
			.union([z.boolean(), z.lazy(() => UserCountOutputTypeArgsSchema)])
			.optional(),
	})
	.strict();

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z
	.object({
		select: z.lazy(() => UserSelectSchema).optional(),
		include: z.lazy(() => UserIncludeSchema).optional(),
	})
	.strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> =
	z
		.object({
			select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
		})
		.strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> =
	z
		.object({
			tokens: z.boolean().optional(),
			accounts: z.boolean().optional(),
			invites: z.boolean().optional(),
			member_on: z.boolean().optional(),
			owns_organizations: z.boolean().optional(),
		})
		.strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z
	.object({
		id: z.boolean().optional(),
		name: z.boolean().optional(),
		email: z.boolean().optional(),
		passwordHash: z.boolean().optional(),
		avatarUrl: z.boolean().optional(),
		createdAt: z.boolean().optional(),
		updatedAt: z.boolean().optional(),
		tokens: z
			.union([z.boolean(), z.lazy(() => TokenFindManyArgsSchema)])
			.optional(),
		accounts: z
			.union([z.boolean(), z.lazy(() => AccountFindManyArgsSchema)])
			.optional(),
		invites: z
			.union([z.boolean(), z.lazy(() => InviteFindManyArgsSchema)])
			.optional(),
		member_on: z
			.union([z.boolean(), z.lazy(() => MemberFindManyArgsSchema)])
			.optional(),
		owns_organizations: z
			.union([z.boolean(), z.lazy(() => OrganizationFindManyArgsSchema)])
			.optional(),
		_count: z
			.union([z.boolean(), z.lazy(() => UserCountOutputTypeArgsSchema)])
			.optional(),
	})
	.strict();

// TOKEN
//------------------------------------------------------

export const TokenIncludeSchema: z.ZodType<Prisma.TokenInclude> = z
	.object({
		user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
	})
	.strict();

export const TokenArgsSchema: z.ZodType<Prisma.TokenDefaultArgs> = z
	.object({
		select: z.lazy(() => TokenSelectSchema).optional(),
		include: z.lazy(() => TokenIncludeSchema).optional(),
	})
	.strict();

export const TokenSelectSchema: z.ZodType<Prisma.TokenSelect> = z
	.object({
		id: z.boolean().optional(),
		type: z.boolean().optional(),
		createdAt: z.boolean().optional(),
		userId: z.boolean().optional(),
		user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
	})
	.strict();

// ACCOUNT
//------------------------------------------------------

export const AccountIncludeSchema: z.ZodType<Prisma.AccountInclude> = z
	.object({
		user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
	})
	.strict();

export const AccountArgsSchema: z.ZodType<Prisma.AccountDefaultArgs> = z
	.object({
		select: z.lazy(() => AccountSelectSchema).optional(),
		include: z.lazy(() => AccountIncludeSchema).optional(),
	})
	.strict();

export const AccountSelectSchema: z.ZodType<Prisma.AccountSelect> = z
	.object({
		id: z.boolean().optional(),
		provider: z.boolean().optional(),
		providerAccountId: z.boolean().optional(),
		userId: z.boolean().optional(),
		user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
	})
	.strict();

// INVITE
//------------------------------------------------------

export const InviteIncludeSchema: z.ZodType<Prisma.InviteInclude> = z
	.object({
		author: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
		organization: z
			.union([z.boolean(), z.lazy(() => OrganizationArgsSchema)])
			.optional(),
	})
	.strict();

export const InviteArgsSchema: z.ZodType<Prisma.InviteDefaultArgs> = z
	.object({
		select: z.lazy(() => InviteSelectSchema).optional(),
		include: z.lazy(() => InviteIncludeSchema).optional(),
	})
	.strict();

export const InviteSelectSchema: z.ZodType<Prisma.InviteSelect> = z
	.object({
		id: z.boolean().optional(),
		email: z.boolean().optional(),
		role: z.boolean().optional(),
		createdAt: z.boolean().optional(),
		authorId: z.boolean().optional(),
		organizationId: z.boolean().optional(),
		author: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
		organization: z
			.union([z.boolean(), z.lazy(() => OrganizationArgsSchema)])
			.optional(),
	})
	.strict();

// MEMBER
//------------------------------------------------------

export const MemberIncludeSchema: z.ZodType<Prisma.MemberInclude> = z
	.object({
		organization: z
			.union([z.boolean(), z.lazy(() => OrganizationArgsSchema)])
			.optional(),
		user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
		appointments: z
			.union([z.boolean(), z.lazy(() => AppointmentFindManyArgsSchema)])
			.optional(),
		_count: z
			.union([z.boolean(), z.lazy(() => MemberCountOutputTypeArgsSchema)])
			.optional(),
	})
	.strict();

export const MemberArgsSchema: z.ZodType<Prisma.MemberDefaultArgs> = z
	.object({
		select: z.lazy(() => MemberSelectSchema).optional(),
		include: z.lazy(() => MemberIncludeSchema).optional(),
	})
	.strict();

export const MemberCountOutputTypeArgsSchema: z.ZodType<Prisma.MemberCountOutputTypeDefaultArgs> =
	z
		.object({
			select: z.lazy(() => MemberCountOutputTypeSelectSchema).nullish(),
		})
		.strict();

export const MemberCountOutputTypeSelectSchema: z.ZodType<Prisma.MemberCountOutputTypeSelect> =
	z
		.object({
			appointments: z.boolean().optional(),
		})
		.strict();

export const MemberSelectSchema: z.ZodType<Prisma.MemberSelect> = z
	.object({
		id: z.boolean().optional(),
		role: z.boolean().optional(),
		specialty: z.boolean().optional(),
		organizationId: z.boolean().optional(),
		userId: z.boolean().optional(),
		organization: z
			.union([z.boolean(), z.lazy(() => OrganizationArgsSchema)])
			.optional(),
		user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
		appointments: z
			.union([z.boolean(), z.lazy(() => AppointmentFindManyArgsSchema)])
			.optional(),
		_count: z
			.union([z.boolean(), z.lazy(() => MemberCountOutputTypeArgsSchema)])
			.optional(),
	})
	.strict();

// PATIENT
//------------------------------------------------------

export const PatientIncludeSchema: z.ZodType<Prisma.PatientInclude> = z
	.object({
		appointments: z
			.union([z.boolean(), z.lazy(() => AppointmentFindManyArgsSchema)])
			.optional(),
		organization: z
			.union([z.boolean(), z.lazy(() => OrganizationArgsSchema)])
			.optional(),
		_count: z
			.union([z.boolean(), z.lazy(() => PatientCountOutputTypeArgsSchema)])
			.optional(),
	})
	.strict();

export const PatientArgsSchema: z.ZodType<Prisma.PatientDefaultArgs> = z
	.object({
		select: z.lazy(() => PatientSelectSchema).optional(),
		include: z.lazy(() => PatientIncludeSchema).optional(),
	})
	.strict();

export const PatientCountOutputTypeArgsSchema: z.ZodType<Prisma.PatientCountOutputTypeDefaultArgs> =
	z
		.object({
			select: z.lazy(() => PatientCountOutputTypeSelectSchema).nullish(),
		})
		.strict();

export const PatientCountOutputTypeSelectSchema: z.ZodType<Prisma.PatientCountOutputTypeSelect> =
	z
		.object({
			appointments: z.boolean().optional(),
		})
		.strict();

export const PatientSelectSchema: z.ZodType<Prisma.PatientSelect> = z
	.object({
		id: z.boolean().optional(),
		name: z.boolean().optional(),
		email: z.boolean().optional(),
		phone: z.boolean().optional(),
		birthDate: z.boolean().optional(),
		address: z.boolean().optional(),
		createdAt: z.boolean().optional(),
		updatedAt: z.boolean().optional(),
		organizationId: z.boolean().optional(),
		appointments: z
			.union([z.boolean(), z.lazy(() => AppointmentFindManyArgsSchema)])
			.optional(),
		organization: z
			.union([z.boolean(), z.lazy(() => OrganizationArgsSchema)])
			.optional(),
		_count: z
			.union([z.boolean(), z.lazy(() => PatientCountOutputTypeArgsSchema)])
			.optional(),
	})
	.strict();

// APPOINTMENT
//------------------------------------------------------

export const AppointmentIncludeSchema: z.ZodType<Prisma.AppointmentInclude> = z
	.object({
		patient: z.union([z.boolean(), z.lazy(() => PatientArgsSchema)]).optional(),
		member: z.union([z.boolean(), z.lazy(() => MemberArgsSchema)]).optional(),
	})
	.strict();

export const AppointmentArgsSchema: z.ZodType<Prisma.AppointmentDefaultArgs> = z
	.object({
		select: z.lazy(() => AppointmentSelectSchema).optional(),
		include: z.lazy(() => AppointmentIncludeSchema).optional(),
	})
	.strict();

export const AppointmentSelectSchema: z.ZodType<Prisma.AppointmentSelect> = z
	.object({
		id: z.boolean().optional(),
		startTime: z.boolean().optional(),
		endTime: z.boolean().optional(),
		description: z.boolean().optional(),
		status: z.boolean().optional(),
		createdAt: z.boolean().optional(),
		updatedAt: z.boolean().optional(),
		patientId: z.boolean().optional(),
		memberId: z.boolean().optional(),
		patient: z.union([z.boolean(), z.lazy(() => PatientArgsSchema)]).optional(),
		member: z.union([z.boolean(), z.lazy(() => MemberArgsSchema)]).optional(),
	})
	.strict();

// ORGANIZATION
//------------------------------------------------------

export const OrganizationIncludeSchema: z.ZodType<Prisma.OrganizationInclude> =
	z
		.object({
			owner: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
			invites: z
				.union([z.boolean(), z.lazy(() => InviteFindManyArgsSchema)])
				.optional(),
			members: z
				.union([z.boolean(), z.lazy(() => MemberFindManyArgsSchema)])
				.optional(),
			patients: z
				.union([z.boolean(), z.lazy(() => PatientFindManyArgsSchema)])
				.optional(),
			_count: z
				.union([
					z.boolean(),
					z.lazy(() => OrganizationCountOutputTypeArgsSchema),
				])
				.optional(),
		})
		.strict();

export const OrganizationArgsSchema: z.ZodType<Prisma.OrganizationDefaultArgs> =
	z
		.object({
			select: z.lazy(() => OrganizationSelectSchema).optional(),
			include: z.lazy(() => OrganizationIncludeSchema).optional(),
		})
		.strict();

export const OrganizationCountOutputTypeArgsSchema: z.ZodType<Prisma.OrganizationCountOutputTypeDefaultArgs> =
	z
		.object({
			select: z.lazy(() => OrganizationCountOutputTypeSelectSchema).nullish(),
		})
		.strict();

export const OrganizationCountOutputTypeSelectSchema: z.ZodType<Prisma.OrganizationCountOutputTypeSelect> =
	z
		.object({
			invites: z.boolean().optional(),
			members: z.boolean().optional(),
			patients: z.boolean().optional(),
		})
		.strict();

export const OrganizationSelectSchema: z.ZodType<Prisma.OrganizationSelect> = z
	.object({
		id: z.boolean().optional(),
		name: z.boolean().optional(),
		slug: z.boolean().optional(),
		domain: z.boolean().optional(),
		shouldAttachUsersByDomain: z.boolean().optional(),
		avatarUrl: z.boolean().optional(),
		createdAt: z.boolean().optional(),
		updatedAt: z.boolean().optional(),
		ownerId: z.boolean().optional(),
		owner: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
		invites: z
			.union([z.boolean(), z.lazy(() => InviteFindManyArgsSchema)])
			.optional(),
		members: z
			.union([z.boolean(), z.lazy(() => MemberFindManyArgsSchema)])
			.optional(),
		patients: z
			.union([z.boolean(), z.lazy(() => PatientFindManyArgsSchema)])
			.optional(),
		_count: z
			.union([z.boolean(), z.lazy(() => OrganizationCountOutputTypeArgsSchema)])
			.optional(),
	})
	.strict();

/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z
	.object({
		AND: z
			.union([
				z.lazy(() => UserWhereInputSchema),
				z.lazy(() => UserWhereInputSchema).array(),
			])
			.optional(),
		OR: z
			.lazy(() => UserWhereInputSchema)
			.array()
			.optional(),
		NOT: z
			.union([
				z.lazy(() => UserWhereInputSchema),
				z.lazy(() => UserWhereInputSchema).array(),
			])
			.optional(),
		id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		name: z
			.union([z.lazy(() => StringNullableFilterSchema), z.string()])
			.optional()
			.nullable(),
		email: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		passwordHash: z
			.union([z.lazy(() => StringNullableFilterSchema), z.string()])
			.optional()
			.nullable(),
		avatarUrl: z
			.union([z.lazy(() => StringNullableFilterSchema), z.string()])
			.optional()
			.nullable(),
		createdAt: z
			.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
			.optional(),
		updatedAt: z
			.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
			.optional(),
		tokens: z.lazy(() => TokenListRelationFilterSchema).optional(),
		accounts: z.lazy(() => AccountListRelationFilterSchema).optional(),
		invites: z.lazy(() => InviteListRelationFilterSchema).optional(),
		member_on: z.lazy(() => MemberListRelationFilterSchema).optional(),
		owns_organizations: z
			.lazy(() => OrganizationListRelationFilterSchema)
			.optional(),
	})
	.strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			name: z
				.union([
					z.lazy(() => SortOrderSchema),
					z.lazy(() => SortOrderInputSchema),
				])
				.optional(),
			email: z.lazy(() => SortOrderSchema).optional(),
			passwordHash: z
				.union([
					z.lazy(() => SortOrderSchema),
					z.lazy(() => SortOrderInputSchema),
				])
				.optional(),
			avatarUrl: z
				.union([
					z.lazy(() => SortOrderSchema),
					z.lazy(() => SortOrderInputSchema),
				])
				.optional(),
			createdAt: z.lazy(() => SortOrderSchema).optional(),
			updatedAt: z.lazy(() => SortOrderSchema).optional(),
			tokens: z.lazy(() => TokenOrderByRelationAggregateInputSchema).optional(),
			accounts: z
				.lazy(() => AccountOrderByRelationAggregateInputSchema)
				.optional(),
			invites: z
				.lazy(() => InviteOrderByRelationAggregateInputSchema)
				.optional(),
			member_on: z
				.lazy(() => MemberOrderByRelationAggregateInputSchema)
				.optional(),
			owns_organizations: z
				.lazy(() => OrganizationOrderByRelationAggregateInputSchema)
				.optional(),
		})
		.strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> =
	z
		.union([
			z.object({
				id: z.string(),
				email: z.string(),
			}),
			z.object({
				id: z.string(),
			}),
			z.object({
				email: z.string(),
			}),
		])
		.and(
			z
				.object({
					id: z.string().optional(),
					email: z.string().optional(),
					AND: z
						.union([
							z.lazy(() => UserWhereInputSchema),
							z.lazy(() => UserWhereInputSchema).array(),
						])
						.optional(),
					OR: z
						.lazy(() => UserWhereInputSchema)
						.array()
						.optional(),
					NOT: z
						.union([
							z.lazy(() => UserWhereInputSchema),
							z.lazy(() => UserWhereInputSchema).array(),
						])
						.optional(),
					name: z
						.union([z.lazy(() => StringNullableFilterSchema), z.string()])
						.optional()
						.nullable(),
					passwordHash: z
						.union([z.lazy(() => StringNullableFilterSchema), z.string()])
						.optional()
						.nullable(),
					avatarUrl: z
						.union([z.lazy(() => StringNullableFilterSchema), z.string()])
						.optional()
						.nullable(),
					createdAt: z
						.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
						.optional(),
					updatedAt: z
						.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
						.optional(),
					tokens: z.lazy(() => TokenListRelationFilterSchema).optional(),
					accounts: z.lazy(() => AccountListRelationFilterSchema).optional(),
					invites: z.lazy(() => InviteListRelationFilterSchema).optional(),
					member_on: z.lazy(() => MemberListRelationFilterSchema).optional(),
					owns_organizations: z
						.lazy(() => OrganizationListRelationFilterSchema)
						.optional(),
				})
				.strict(),
		);

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			name: z
				.union([
					z.lazy(() => SortOrderSchema),
					z.lazy(() => SortOrderInputSchema),
				])
				.optional(),
			email: z.lazy(() => SortOrderSchema).optional(),
			passwordHash: z
				.union([
					z.lazy(() => SortOrderSchema),
					z.lazy(() => SortOrderInputSchema),
				])
				.optional(),
			avatarUrl: z
				.union([
					z.lazy(() => SortOrderSchema),
					z.lazy(() => SortOrderInputSchema),
				])
				.optional(),
			createdAt: z.lazy(() => SortOrderSchema).optional(),
			updatedAt: z.lazy(() => SortOrderSchema).optional(),
			_count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
			_max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
			_min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional(),
		})
		.strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> =
	z
		.object({
			AND: z
				.union([
					z.lazy(() => UserScalarWhereWithAggregatesInputSchema),
					z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array(),
				])
				.optional(),
			OR: z
				.lazy(() => UserScalarWhereWithAggregatesInputSchema)
				.array()
				.optional(),
			NOT: z
				.union([
					z.lazy(() => UserScalarWhereWithAggregatesInputSchema),
					z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array(),
				])
				.optional(),
			id: z
				.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
				.optional(),
			name: z
				.union([
					z.lazy(() => StringNullableWithAggregatesFilterSchema),
					z.string(),
				])
				.optional()
				.nullable(),
			email: z
				.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
				.optional(),
			passwordHash: z
				.union([
					z.lazy(() => StringNullableWithAggregatesFilterSchema),
					z.string(),
				])
				.optional()
				.nullable(),
			avatarUrl: z
				.union([
					z.lazy(() => StringNullableWithAggregatesFilterSchema),
					z.string(),
				])
				.optional()
				.nullable(),
			createdAt: z
				.union([
					z.lazy(() => DateTimeWithAggregatesFilterSchema),
					z.coerce.date(),
				])
				.optional(),
			updatedAt: z
				.union([
					z.lazy(() => DateTimeWithAggregatesFilterSchema),
					z.coerce.date(),
				])
				.optional(),
		})
		.strict();

export const TokenWhereInputSchema: z.ZodType<Prisma.TokenWhereInput> = z
	.object({
		AND: z
			.union([
				z.lazy(() => TokenWhereInputSchema),
				z.lazy(() => TokenWhereInputSchema).array(),
			])
			.optional(),
		OR: z
			.lazy(() => TokenWhereInputSchema)
			.array()
			.optional(),
		NOT: z
			.union([
				z.lazy(() => TokenWhereInputSchema),
				z.lazy(() => TokenWhereInputSchema).array(),
			])
			.optional(),
		id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		type: z
			.union([
				z.lazy(() => EnumTokenTypeFilterSchema),
				z.lazy(() => TokenTypeSchema),
			])
			.optional(),
		createdAt: z
			.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
			.optional(),
		userId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		user: z
			.union([
				z.lazy(() => UserRelationFilterSchema),
				z.lazy(() => UserWhereInputSchema),
			])
			.optional(),
	})
	.strict();

export const TokenOrderByWithRelationInputSchema: z.ZodType<Prisma.TokenOrderByWithRelationInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			type: z.lazy(() => SortOrderSchema).optional(),
			createdAt: z.lazy(() => SortOrderSchema).optional(),
			userId: z.lazy(() => SortOrderSchema).optional(),
			user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
		})
		.strict();

export const TokenWhereUniqueInputSchema: z.ZodType<Prisma.TokenWhereUniqueInput> =
	z
		.object({
			id: z.string(),
		})
		.and(
			z
				.object({
					id: z.string().optional(),
					AND: z
						.union([
							z.lazy(() => TokenWhereInputSchema),
							z.lazy(() => TokenWhereInputSchema).array(),
						])
						.optional(),
					OR: z
						.lazy(() => TokenWhereInputSchema)
						.array()
						.optional(),
					NOT: z
						.union([
							z.lazy(() => TokenWhereInputSchema),
							z.lazy(() => TokenWhereInputSchema).array(),
						])
						.optional(),
					type: z
						.union([
							z.lazy(() => EnumTokenTypeFilterSchema),
							z.lazy(() => TokenTypeSchema),
						])
						.optional(),
					createdAt: z
						.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
						.optional(),
					userId: z
						.union([z.lazy(() => StringFilterSchema), z.string()])
						.optional(),
					user: z
						.union([
							z.lazy(() => UserRelationFilterSchema),
							z.lazy(() => UserWhereInputSchema),
						])
						.optional(),
				})
				.strict(),
		);

export const TokenOrderByWithAggregationInputSchema: z.ZodType<Prisma.TokenOrderByWithAggregationInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			type: z.lazy(() => SortOrderSchema).optional(),
			createdAt: z.lazy(() => SortOrderSchema).optional(),
			userId: z.lazy(() => SortOrderSchema).optional(),
			_count: z.lazy(() => TokenCountOrderByAggregateInputSchema).optional(),
			_max: z.lazy(() => TokenMaxOrderByAggregateInputSchema).optional(),
			_min: z.lazy(() => TokenMinOrderByAggregateInputSchema).optional(),
		})
		.strict();

export const TokenScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TokenScalarWhereWithAggregatesInput> =
	z
		.object({
			AND: z
				.union([
					z.lazy(() => TokenScalarWhereWithAggregatesInputSchema),
					z.lazy(() => TokenScalarWhereWithAggregatesInputSchema).array(),
				])
				.optional(),
			OR: z
				.lazy(() => TokenScalarWhereWithAggregatesInputSchema)
				.array()
				.optional(),
			NOT: z
				.union([
					z.lazy(() => TokenScalarWhereWithAggregatesInputSchema),
					z.lazy(() => TokenScalarWhereWithAggregatesInputSchema).array(),
				])
				.optional(),
			id: z
				.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
				.optional(),
			type: z
				.union([
					z.lazy(() => EnumTokenTypeWithAggregatesFilterSchema),
					z.lazy(() => TokenTypeSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.lazy(() => DateTimeWithAggregatesFilterSchema),
					z.coerce.date(),
				])
				.optional(),
			userId: z
				.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
				.optional(),
		})
		.strict();

export const AccountWhereInputSchema: z.ZodType<Prisma.AccountWhereInput> = z
	.object({
		AND: z
			.union([
				z.lazy(() => AccountWhereInputSchema),
				z.lazy(() => AccountWhereInputSchema).array(),
			])
			.optional(),
		OR: z
			.lazy(() => AccountWhereInputSchema)
			.array()
			.optional(),
		NOT: z
			.union([
				z.lazy(() => AccountWhereInputSchema),
				z.lazy(() => AccountWhereInputSchema).array(),
			])
			.optional(),
		id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		provider: z
			.union([
				z.lazy(() => EnumAccountProviderFilterSchema),
				z.lazy(() => AccountProviderSchema),
			])
			.optional(),
		providerAccountId: z
			.union([z.lazy(() => StringFilterSchema), z.string()])
			.optional(),
		userId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		user: z
			.union([
				z.lazy(() => UserRelationFilterSchema),
				z.lazy(() => UserWhereInputSchema),
			])
			.optional(),
	})
	.strict();

export const AccountOrderByWithRelationInputSchema: z.ZodType<Prisma.AccountOrderByWithRelationInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			provider: z.lazy(() => SortOrderSchema).optional(),
			providerAccountId: z.lazy(() => SortOrderSchema).optional(),
			userId: z.lazy(() => SortOrderSchema).optional(),
			user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
		})
		.strict();

export const AccountWhereUniqueInputSchema: z.ZodType<Prisma.AccountWhereUniqueInput> =
	z
		.union([
			z.object({
				id: z.string(),
				providerAccountId: z.string(),
				provider_userId: z.lazy(
					() => AccountProviderUserIdCompoundUniqueInputSchema,
				),
			}),
			z.object({
				id: z.string(),
				providerAccountId: z.string(),
			}),
			z.object({
				id: z.string(),
				provider_userId: z.lazy(
					() => AccountProviderUserIdCompoundUniqueInputSchema,
				),
			}),
			z.object({
				id: z.string(),
			}),
			z.object({
				providerAccountId: z.string(),
				provider_userId: z.lazy(
					() => AccountProviderUserIdCompoundUniqueInputSchema,
				),
			}),
			z.object({
				providerAccountId: z.string(),
			}),
			z.object({
				provider_userId: z.lazy(
					() => AccountProviderUserIdCompoundUniqueInputSchema,
				),
			}),
		])
		.and(
			z
				.object({
					id: z.string().optional(),
					providerAccountId: z.string().optional(),
					provider_userId: z
						.lazy(() => AccountProviderUserIdCompoundUniqueInputSchema)
						.optional(),
					AND: z
						.union([
							z.lazy(() => AccountWhereInputSchema),
							z.lazy(() => AccountWhereInputSchema).array(),
						])
						.optional(),
					OR: z
						.lazy(() => AccountWhereInputSchema)
						.array()
						.optional(),
					NOT: z
						.union([
							z.lazy(() => AccountWhereInputSchema),
							z.lazy(() => AccountWhereInputSchema).array(),
						])
						.optional(),
					provider: z
						.union([
							z.lazy(() => EnumAccountProviderFilterSchema),
							z.lazy(() => AccountProviderSchema),
						])
						.optional(),
					userId: z
						.union([z.lazy(() => StringFilterSchema), z.string()])
						.optional(),
					user: z
						.union([
							z.lazy(() => UserRelationFilterSchema),
							z.lazy(() => UserWhereInputSchema),
						])
						.optional(),
				})
				.strict(),
		);

export const AccountOrderByWithAggregationInputSchema: z.ZodType<Prisma.AccountOrderByWithAggregationInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			provider: z.lazy(() => SortOrderSchema).optional(),
			providerAccountId: z.lazy(() => SortOrderSchema).optional(),
			userId: z.lazy(() => SortOrderSchema).optional(),
			_count: z.lazy(() => AccountCountOrderByAggregateInputSchema).optional(),
			_max: z.lazy(() => AccountMaxOrderByAggregateInputSchema).optional(),
			_min: z.lazy(() => AccountMinOrderByAggregateInputSchema).optional(),
		})
		.strict();

export const AccountScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AccountScalarWhereWithAggregatesInput> =
	z
		.object({
			AND: z
				.union([
					z.lazy(() => AccountScalarWhereWithAggregatesInputSchema),
					z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array(),
				])
				.optional(),
			OR: z
				.lazy(() => AccountScalarWhereWithAggregatesInputSchema)
				.array()
				.optional(),
			NOT: z
				.union([
					z.lazy(() => AccountScalarWhereWithAggregatesInputSchema),
					z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array(),
				])
				.optional(),
			id: z
				.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
				.optional(),
			provider: z
				.union([
					z.lazy(() => EnumAccountProviderWithAggregatesFilterSchema),
					z.lazy(() => AccountProviderSchema),
				])
				.optional(),
			providerAccountId: z
				.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
				.optional(),
			userId: z
				.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
				.optional(),
		})
		.strict();

export const InviteWhereInputSchema: z.ZodType<Prisma.InviteWhereInput> = z
	.object({
		AND: z
			.union([
				z.lazy(() => InviteWhereInputSchema),
				z.lazy(() => InviteWhereInputSchema).array(),
			])
			.optional(),
		OR: z
			.lazy(() => InviteWhereInputSchema)
			.array()
			.optional(),
		NOT: z
			.union([
				z.lazy(() => InviteWhereInputSchema),
				z.lazy(() => InviteWhereInputSchema).array(),
			])
			.optional(),
		id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		email: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		role: z
			.union([z.lazy(() => EnumRoleFilterSchema), z.lazy(() => RoleSchema)])
			.optional(),
		createdAt: z
			.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
			.optional(),
		authorId: z
			.union([z.lazy(() => StringNullableFilterSchema), z.string()])
			.optional()
			.nullable(),
		organizationId: z
			.union([z.lazy(() => StringFilterSchema), z.string()])
			.optional(),
		author: z
			.union([
				z.lazy(() => UserNullableRelationFilterSchema),
				z.lazy(() => UserWhereInputSchema),
			])
			.optional()
			.nullable(),
		organization: z
			.union([
				z.lazy(() => OrganizationRelationFilterSchema),
				z.lazy(() => OrganizationWhereInputSchema),
			])
			.optional(),
	})
	.strict();

export const InviteOrderByWithRelationInputSchema: z.ZodType<Prisma.InviteOrderByWithRelationInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			email: z.lazy(() => SortOrderSchema).optional(),
			role: z.lazy(() => SortOrderSchema).optional(),
			createdAt: z.lazy(() => SortOrderSchema).optional(),
			authorId: z
				.union([
					z.lazy(() => SortOrderSchema),
					z.lazy(() => SortOrderInputSchema),
				])
				.optional(),
			organizationId: z.lazy(() => SortOrderSchema).optional(),
			author: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
			organization: z
				.lazy(() => OrganizationOrderByWithRelationInputSchema)
				.optional(),
		})
		.strict();

export const InviteWhereUniqueInputSchema: z.ZodType<Prisma.InviteWhereUniqueInput> =
	z
		.union([
			z.object({
				id: z.string(),
				email_organizationId: z.lazy(
					() => InviteEmailOrganizationIdCompoundUniqueInputSchema,
				),
			}),
			z.object({
				id: z.string(),
			}),
			z.object({
				email_organizationId: z.lazy(
					() => InviteEmailOrganizationIdCompoundUniqueInputSchema,
				),
			}),
		])
		.and(
			z
				.object({
					id: z.string().optional(),
					email_organizationId: z
						.lazy(() => InviteEmailOrganizationIdCompoundUniqueInputSchema)
						.optional(),
					AND: z
						.union([
							z.lazy(() => InviteWhereInputSchema),
							z.lazy(() => InviteWhereInputSchema).array(),
						])
						.optional(),
					OR: z
						.lazy(() => InviteWhereInputSchema)
						.array()
						.optional(),
					NOT: z
						.union([
							z.lazy(() => InviteWhereInputSchema),
							z.lazy(() => InviteWhereInputSchema).array(),
						])
						.optional(),
					email: z
						.union([z.lazy(() => StringFilterSchema), z.string()])
						.optional(),
					role: z
						.union([
							z.lazy(() => EnumRoleFilterSchema),
							z.lazy(() => RoleSchema),
						])
						.optional(),
					createdAt: z
						.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
						.optional(),
					authorId: z
						.union([z.lazy(() => StringNullableFilterSchema), z.string()])
						.optional()
						.nullable(),
					organizationId: z
						.union([z.lazy(() => StringFilterSchema), z.string()])
						.optional(),
					author: z
						.union([
							z.lazy(() => UserNullableRelationFilterSchema),
							z.lazy(() => UserWhereInputSchema),
						])
						.optional()
						.nullable(),
					organization: z
						.union([
							z.lazy(() => OrganizationRelationFilterSchema),
							z.lazy(() => OrganizationWhereInputSchema),
						])
						.optional(),
				})
				.strict(),
		);

export const InviteOrderByWithAggregationInputSchema: z.ZodType<Prisma.InviteOrderByWithAggregationInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			email: z.lazy(() => SortOrderSchema).optional(),
			role: z.lazy(() => SortOrderSchema).optional(),
			createdAt: z.lazy(() => SortOrderSchema).optional(),
			authorId: z
				.union([
					z.lazy(() => SortOrderSchema),
					z.lazy(() => SortOrderInputSchema),
				])
				.optional(),
			organizationId: z.lazy(() => SortOrderSchema).optional(),
			_count: z.lazy(() => InviteCountOrderByAggregateInputSchema).optional(),
			_max: z.lazy(() => InviteMaxOrderByAggregateInputSchema).optional(),
			_min: z.lazy(() => InviteMinOrderByAggregateInputSchema).optional(),
		})
		.strict();

export const InviteScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.InviteScalarWhereWithAggregatesInput> =
	z
		.object({
			AND: z
				.union([
					z.lazy(() => InviteScalarWhereWithAggregatesInputSchema),
					z.lazy(() => InviteScalarWhereWithAggregatesInputSchema).array(),
				])
				.optional(),
			OR: z
				.lazy(() => InviteScalarWhereWithAggregatesInputSchema)
				.array()
				.optional(),
			NOT: z
				.union([
					z.lazy(() => InviteScalarWhereWithAggregatesInputSchema),
					z.lazy(() => InviteScalarWhereWithAggregatesInputSchema).array(),
				])
				.optional(),
			id: z
				.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
				.optional(),
			email: z
				.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
				.optional(),
			role: z
				.union([
					z.lazy(() => EnumRoleWithAggregatesFilterSchema),
					z.lazy(() => RoleSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.lazy(() => DateTimeWithAggregatesFilterSchema),
					z.coerce.date(),
				])
				.optional(),
			authorId: z
				.union([
					z.lazy(() => StringNullableWithAggregatesFilterSchema),
					z.string(),
				])
				.optional()
				.nullable(),
			organizationId: z
				.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
				.optional(),
		})
		.strict();

export const MemberWhereInputSchema: z.ZodType<Prisma.MemberWhereInput> = z
	.object({
		AND: z
			.union([
				z.lazy(() => MemberWhereInputSchema),
				z.lazy(() => MemberWhereInputSchema).array(),
			])
			.optional(),
		OR: z
			.lazy(() => MemberWhereInputSchema)
			.array()
			.optional(),
		NOT: z
			.union([
				z.lazy(() => MemberWhereInputSchema),
				z.lazy(() => MemberWhereInputSchema).array(),
			])
			.optional(),
		id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		role: z
			.union([z.lazy(() => EnumRoleFilterSchema), z.lazy(() => RoleSchema)])
			.optional(),
		specialty: z
			.union([z.lazy(() => StringNullableFilterSchema), z.string()])
			.optional()
			.nullable(),
		organizationId: z
			.union([z.lazy(() => StringFilterSchema), z.string()])
			.optional(),
		userId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		organization: z
			.union([
				z.lazy(() => OrganizationRelationFilterSchema),
				z.lazy(() => OrganizationWhereInputSchema),
			])
			.optional(),
		user: z
			.union([
				z.lazy(() => UserRelationFilterSchema),
				z.lazy(() => UserWhereInputSchema),
			])
			.optional(),
		appointments: z.lazy(() => AppointmentListRelationFilterSchema).optional(),
	})
	.strict();

export const MemberOrderByWithRelationInputSchema: z.ZodType<Prisma.MemberOrderByWithRelationInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			role: z.lazy(() => SortOrderSchema).optional(),
			specialty: z
				.union([
					z.lazy(() => SortOrderSchema),
					z.lazy(() => SortOrderInputSchema),
				])
				.optional(),
			organizationId: z.lazy(() => SortOrderSchema).optional(),
			userId: z.lazy(() => SortOrderSchema).optional(),
			organization: z
				.lazy(() => OrganizationOrderByWithRelationInputSchema)
				.optional(),
			user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
			appointments: z
				.lazy(() => AppointmentOrderByRelationAggregateInputSchema)
				.optional(),
		})
		.strict();

export const MemberWhereUniqueInputSchema: z.ZodType<Prisma.MemberWhereUniqueInput> =
	z
		.union([
			z.object({
				id: z.string(),
				organizationId_userId: z.lazy(
					() => MemberOrganizationIdUserIdCompoundUniqueInputSchema,
				),
			}),
			z.object({
				id: z.string(),
			}),
			z.object({
				organizationId_userId: z.lazy(
					() => MemberOrganizationIdUserIdCompoundUniqueInputSchema,
				),
			}),
		])
		.and(
			z
				.object({
					id: z.string().optional(),
					organizationId_userId: z
						.lazy(() => MemberOrganizationIdUserIdCompoundUniqueInputSchema)
						.optional(),
					AND: z
						.union([
							z.lazy(() => MemberWhereInputSchema),
							z.lazy(() => MemberWhereInputSchema).array(),
						])
						.optional(),
					OR: z
						.lazy(() => MemberWhereInputSchema)
						.array()
						.optional(),
					NOT: z
						.union([
							z.lazy(() => MemberWhereInputSchema),
							z.lazy(() => MemberWhereInputSchema).array(),
						])
						.optional(),
					role: z
						.union([
							z.lazy(() => EnumRoleFilterSchema),
							z.lazy(() => RoleSchema),
						])
						.optional(),
					specialty: z
						.union([z.lazy(() => StringNullableFilterSchema), z.string()])
						.optional()
						.nullable(),
					organizationId: z
						.union([z.lazy(() => StringFilterSchema), z.string()])
						.optional(),
					userId: z
						.union([z.lazy(() => StringFilterSchema), z.string()])
						.optional(),
					organization: z
						.union([
							z.lazy(() => OrganizationRelationFilterSchema),
							z.lazy(() => OrganizationWhereInputSchema),
						])
						.optional(),
					user: z
						.union([
							z.lazy(() => UserRelationFilterSchema),
							z.lazy(() => UserWhereInputSchema),
						])
						.optional(),
					appointments: z
						.lazy(() => AppointmentListRelationFilterSchema)
						.optional(),
				})
				.strict(),
		);

export const MemberOrderByWithAggregationInputSchema: z.ZodType<Prisma.MemberOrderByWithAggregationInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			role: z.lazy(() => SortOrderSchema).optional(),
			specialty: z
				.union([
					z.lazy(() => SortOrderSchema),
					z.lazy(() => SortOrderInputSchema),
				])
				.optional(),
			organizationId: z.lazy(() => SortOrderSchema).optional(),
			userId: z.lazy(() => SortOrderSchema).optional(),
			_count: z.lazy(() => MemberCountOrderByAggregateInputSchema).optional(),
			_max: z.lazy(() => MemberMaxOrderByAggregateInputSchema).optional(),
			_min: z.lazy(() => MemberMinOrderByAggregateInputSchema).optional(),
		})
		.strict();

export const MemberScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.MemberScalarWhereWithAggregatesInput> =
	z
		.object({
			AND: z
				.union([
					z.lazy(() => MemberScalarWhereWithAggregatesInputSchema),
					z.lazy(() => MemberScalarWhereWithAggregatesInputSchema).array(),
				])
				.optional(),
			OR: z
				.lazy(() => MemberScalarWhereWithAggregatesInputSchema)
				.array()
				.optional(),
			NOT: z
				.union([
					z.lazy(() => MemberScalarWhereWithAggregatesInputSchema),
					z.lazy(() => MemberScalarWhereWithAggregatesInputSchema).array(),
				])
				.optional(),
			id: z
				.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
				.optional(),
			role: z
				.union([
					z.lazy(() => EnumRoleWithAggregatesFilterSchema),
					z.lazy(() => RoleSchema),
				])
				.optional(),
			specialty: z
				.union([
					z.lazy(() => StringNullableWithAggregatesFilterSchema),
					z.string(),
				])
				.optional()
				.nullable(),
			organizationId: z
				.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
				.optional(),
			userId: z
				.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
				.optional(),
		})
		.strict();

export const PatientWhereInputSchema: z.ZodType<Prisma.PatientWhereInput> = z
	.object({
		AND: z
			.union([
				z.lazy(() => PatientWhereInputSchema),
				z.lazy(() => PatientWhereInputSchema).array(),
			])
			.optional(),
		OR: z
			.lazy(() => PatientWhereInputSchema)
			.array()
			.optional(),
		NOT: z
			.union([
				z.lazy(() => PatientWhereInputSchema),
				z.lazy(() => PatientWhereInputSchema).array(),
			])
			.optional(),
		id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		email: z
			.union([z.lazy(() => StringNullableFilterSchema), z.string()])
			.optional()
			.nullable(),
		phone: z
			.union([z.lazy(() => StringNullableFilterSchema), z.string()])
			.optional()
			.nullable(),
		birthDate: z
			.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
			.optional(),
		address: z
			.union([z.lazy(() => StringNullableFilterSchema), z.string()])
			.optional()
			.nullable(),
		createdAt: z
			.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
			.optional(),
		updatedAt: z
			.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
			.optional(),
		organizationId: z
			.union([z.lazy(() => StringFilterSchema), z.string()])
			.optional(),
		appointments: z.lazy(() => AppointmentListRelationFilterSchema).optional(),
		organization: z
			.union([
				z.lazy(() => OrganizationRelationFilterSchema),
				z.lazy(() => OrganizationWhereInputSchema),
			])
			.optional(),
	})
	.strict();

export const PatientOrderByWithRelationInputSchema: z.ZodType<Prisma.PatientOrderByWithRelationInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			name: z.lazy(() => SortOrderSchema).optional(),
			email: z
				.union([
					z.lazy(() => SortOrderSchema),
					z.lazy(() => SortOrderInputSchema),
				])
				.optional(),
			phone: z
				.union([
					z.lazy(() => SortOrderSchema),
					z.lazy(() => SortOrderInputSchema),
				])
				.optional(),
			birthDate: z.lazy(() => SortOrderSchema).optional(),
			address: z
				.union([
					z.lazy(() => SortOrderSchema),
					z.lazy(() => SortOrderInputSchema),
				])
				.optional(),
			createdAt: z.lazy(() => SortOrderSchema).optional(),
			updatedAt: z.lazy(() => SortOrderSchema).optional(),
			organizationId: z.lazy(() => SortOrderSchema).optional(),
			appointments: z
				.lazy(() => AppointmentOrderByRelationAggregateInputSchema)
				.optional(),
			organization: z
				.lazy(() => OrganizationOrderByWithRelationInputSchema)
				.optional(),
		})
		.strict();

export const PatientWhereUniqueInputSchema: z.ZodType<Prisma.PatientWhereUniqueInput> =
	z
		.union([
			z.object({
				id: z.string(),
				email: z.string(),
			}),
			z.object({
				id: z.string(),
			}),
			z.object({
				email: z.string(),
			}),
		])
		.and(
			z
				.object({
					id: z.string().optional(),
					email: z.string().optional(),
					AND: z
						.union([
							z.lazy(() => PatientWhereInputSchema),
							z.lazy(() => PatientWhereInputSchema).array(),
						])
						.optional(),
					OR: z
						.lazy(() => PatientWhereInputSchema)
						.array()
						.optional(),
					NOT: z
						.union([
							z.lazy(() => PatientWhereInputSchema),
							z.lazy(() => PatientWhereInputSchema).array(),
						])
						.optional(),
					name: z
						.union([z.lazy(() => StringFilterSchema), z.string()])
						.optional(),
					phone: z
						.union([z.lazy(() => StringNullableFilterSchema), z.string()])
						.optional()
						.nullable(),
					birthDate: z
						.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
						.optional(),
					address: z
						.union([z.lazy(() => StringNullableFilterSchema), z.string()])
						.optional()
						.nullable(),
					createdAt: z
						.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
						.optional(),
					updatedAt: z
						.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
						.optional(),
					organizationId: z
						.union([z.lazy(() => StringFilterSchema), z.string()])
						.optional(),
					appointments: z
						.lazy(() => AppointmentListRelationFilterSchema)
						.optional(),
					organization: z
						.union([
							z.lazy(() => OrganizationRelationFilterSchema),
							z.lazy(() => OrganizationWhereInputSchema),
						])
						.optional(),
				})
				.strict(),
		);

export const PatientOrderByWithAggregationInputSchema: z.ZodType<Prisma.PatientOrderByWithAggregationInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			name: z.lazy(() => SortOrderSchema).optional(),
			email: z
				.union([
					z.lazy(() => SortOrderSchema),
					z.lazy(() => SortOrderInputSchema),
				])
				.optional(),
			phone: z
				.union([
					z.lazy(() => SortOrderSchema),
					z.lazy(() => SortOrderInputSchema),
				])
				.optional(),
			birthDate: z.lazy(() => SortOrderSchema).optional(),
			address: z
				.union([
					z.lazy(() => SortOrderSchema),
					z.lazy(() => SortOrderInputSchema),
				])
				.optional(),
			createdAt: z.lazy(() => SortOrderSchema).optional(),
			updatedAt: z.lazy(() => SortOrderSchema).optional(),
			organizationId: z.lazy(() => SortOrderSchema).optional(),
			_count: z.lazy(() => PatientCountOrderByAggregateInputSchema).optional(),
			_max: z.lazy(() => PatientMaxOrderByAggregateInputSchema).optional(),
			_min: z.lazy(() => PatientMinOrderByAggregateInputSchema).optional(),
		})
		.strict();

export const PatientScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PatientScalarWhereWithAggregatesInput> =
	z
		.object({
			AND: z
				.union([
					z.lazy(() => PatientScalarWhereWithAggregatesInputSchema),
					z.lazy(() => PatientScalarWhereWithAggregatesInputSchema).array(),
				])
				.optional(),
			OR: z
				.lazy(() => PatientScalarWhereWithAggregatesInputSchema)
				.array()
				.optional(),
			NOT: z
				.union([
					z.lazy(() => PatientScalarWhereWithAggregatesInputSchema),
					z.lazy(() => PatientScalarWhereWithAggregatesInputSchema).array(),
				])
				.optional(),
			id: z
				.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
				.optional(),
			name: z
				.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
				.optional(),
			email: z
				.union([
					z.lazy(() => StringNullableWithAggregatesFilterSchema),
					z.string(),
				])
				.optional()
				.nullable(),
			phone: z
				.union([
					z.lazy(() => StringNullableWithAggregatesFilterSchema),
					z.string(),
				])
				.optional()
				.nullable(),
			birthDate: z
				.union([
					z.lazy(() => DateTimeWithAggregatesFilterSchema),
					z.coerce.date(),
				])
				.optional(),
			address: z
				.union([
					z.lazy(() => StringNullableWithAggregatesFilterSchema),
					z.string(),
				])
				.optional()
				.nullable(),
			createdAt: z
				.union([
					z.lazy(() => DateTimeWithAggregatesFilterSchema),
					z.coerce.date(),
				])
				.optional(),
			updatedAt: z
				.union([
					z.lazy(() => DateTimeWithAggregatesFilterSchema),
					z.coerce.date(),
				])
				.optional(),
			organizationId: z
				.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
				.optional(),
		})
		.strict();

export const AppointmentWhereInputSchema: z.ZodType<Prisma.AppointmentWhereInput> =
	z
		.object({
			AND: z
				.union([
					z.lazy(() => AppointmentWhereInputSchema),
					z.lazy(() => AppointmentWhereInputSchema).array(),
				])
				.optional(),
			OR: z
				.lazy(() => AppointmentWhereInputSchema)
				.array()
				.optional(),
			NOT: z
				.union([
					z.lazy(() => AppointmentWhereInputSchema),
					z.lazy(() => AppointmentWhereInputSchema).array(),
				])
				.optional(),
			id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
			startTime: z
				.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
				.optional(),
			endTime: z
				.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
				.optional(),
			description: z
				.union([z.lazy(() => StringNullableFilterSchema), z.string()])
				.optional()
				.nullable(),
			status: z
				.union([
					z.lazy(() => EnumAppointmentStatusFilterSchema),
					z.lazy(() => AppointmentStatusSchema),
				])
				.optional(),
			createdAt: z
				.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
				.optional(),
			updatedAt: z
				.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
				.optional(),
			patientId: z
				.union([z.lazy(() => StringFilterSchema), z.string()])
				.optional(),
			memberId: z
				.union([z.lazy(() => StringFilterSchema), z.string()])
				.optional(),
			patient: z
				.union([
					z.lazy(() => PatientRelationFilterSchema),
					z.lazy(() => PatientWhereInputSchema),
				])
				.optional(),
			member: z
				.union([
					z.lazy(() => MemberRelationFilterSchema),
					z.lazy(() => MemberWhereInputSchema),
				])
				.optional(),
		})
		.strict();

export const AppointmentOrderByWithRelationInputSchema: z.ZodType<Prisma.AppointmentOrderByWithRelationInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			startTime: z.lazy(() => SortOrderSchema).optional(),
			endTime: z.lazy(() => SortOrderSchema).optional(),
			description: z
				.union([
					z.lazy(() => SortOrderSchema),
					z.lazy(() => SortOrderInputSchema),
				])
				.optional(),
			status: z.lazy(() => SortOrderSchema).optional(),
			createdAt: z.lazy(() => SortOrderSchema).optional(),
			updatedAt: z.lazy(() => SortOrderSchema).optional(),
			patientId: z.lazy(() => SortOrderSchema).optional(),
			memberId: z.lazy(() => SortOrderSchema).optional(),
			patient: z.lazy(() => PatientOrderByWithRelationInputSchema).optional(),
			member: z.lazy(() => MemberOrderByWithRelationInputSchema).optional(),
		})
		.strict();

export const AppointmentWhereUniqueInputSchema: z.ZodType<Prisma.AppointmentWhereUniqueInput> =
	z
		.object({
			id: z.string(),
		})
		.and(
			z
				.object({
					id: z.string().optional(),
					AND: z
						.union([
							z.lazy(() => AppointmentWhereInputSchema),
							z.lazy(() => AppointmentWhereInputSchema).array(),
						])
						.optional(),
					OR: z
						.lazy(() => AppointmentWhereInputSchema)
						.array()
						.optional(),
					NOT: z
						.union([
							z.lazy(() => AppointmentWhereInputSchema),
							z.lazy(() => AppointmentWhereInputSchema).array(),
						])
						.optional(),
					startTime: z
						.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
						.optional(),
					endTime: z
						.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
						.optional(),
					description: z
						.union([z.lazy(() => StringNullableFilterSchema), z.string()])
						.optional()
						.nullable(),
					status: z
						.union([
							z.lazy(() => EnumAppointmentStatusFilterSchema),
							z.lazy(() => AppointmentStatusSchema),
						])
						.optional(),
					createdAt: z
						.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
						.optional(),
					updatedAt: z
						.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
						.optional(),
					patientId: z
						.union([z.lazy(() => StringFilterSchema), z.string()])
						.optional(),
					memberId: z
						.union([z.lazy(() => StringFilterSchema), z.string()])
						.optional(),
					patient: z
						.union([
							z.lazy(() => PatientRelationFilterSchema),
							z.lazy(() => PatientWhereInputSchema),
						])
						.optional(),
					member: z
						.union([
							z.lazy(() => MemberRelationFilterSchema),
							z.lazy(() => MemberWhereInputSchema),
						])
						.optional(),
				})
				.strict(),
		);

export const AppointmentOrderByWithAggregationInputSchema: z.ZodType<Prisma.AppointmentOrderByWithAggregationInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			startTime: z.lazy(() => SortOrderSchema).optional(),
			endTime: z.lazy(() => SortOrderSchema).optional(),
			description: z
				.union([
					z.lazy(() => SortOrderSchema),
					z.lazy(() => SortOrderInputSchema),
				])
				.optional(),
			status: z.lazy(() => SortOrderSchema).optional(),
			createdAt: z.lazy(() => SortOrderSchema).optional(),
			updatedAt: z.lazy(() => SortOrderSchema).optional(),
			patientId: z.lazy(() => SortOrderSchema).optional(),
			memberId: z.lazy(() => SortOrderSchema).optional(),
			_count: z
				.lazy(() => AppointmentCountOrderByAggregateInputSchema)
				.optional(),
			_max: z.lazy(() => AppointmentMaxOrderByAggregateInputSchema).optional(),
			_min: z.lazy(() => AppointmentMinOrderByAggregateInputSchema).optional(),
		})
		.strict();

export const AppointmentScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AppointmentScalarWhereWithAggregatesInput> =
	z
		.object({
			AND: z
				.union([
					z.lazy(() => AppointmentScalarWhereWithAggregatesInputSchema),
					z.lazy(() => AppointmentScalarWhereWithAggregatesInputSchema).array(),
				])
				.optional(),
			OR: z
				.lazy(() => AppointmentScalarWhereWithAggregatesInputSchema)
				.array()
				.optional(),
			NOT: z
				.union([
					z.lazy(() => AppointmentScalarWhereWithAggregatesInputSchema),
					z.lazy(() => AppointmentScalarWhereWithAggregatesInputSchema).array(),
				])
				.optional(),
			id: z
				.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
				.optional(),
			startTime: z
				.union([
					z.lazy(() => DateTimeWithAggregatesFilterSchema),
					z.coerce.date(),
				])
				.optional(),
			endTime: z
				.union([
					z.lazy(() => DateTimeWithAggregatesFilterSchema),
					z.coerce.date(),
				])
				.optional(),
			description: z
				.union([
					z.lazy(() => StringNullableWithAggregatesFilterSchema),
					z.string(),
				])
				.optional()
				.nullable(),
			status: z
				.union([
					z.lazy(() => EnumAppointmentStatusWithAggregatesFilterSchema),
					z.lazy(() => AppointmentStatusSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.lazy(() => DateTimeWithAggregatesFilterSchema),
					z.coerce.date(),
				])
				.optional(),
			updatedAt: z
				.union([
					z.lazy(() => DateTimeWithAggregatesFilterSchema),
					z.coerce.date(),
				])
				.optional(),
			patientId: z
				.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
				.optional(),
			memberId: z
				.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
				.optional(),
		})
		.strict();

export const OrganizationWhereInputSchema: z.ZodType<Prisma.OrganizationWhereInput> =
	z
		.object({
			AND: z
				.union([
					z.lazy(() => OrganizationWhereInputSchema),
					z.lazy(() => OrganizationWhereInputSchema).array(),
				])
				.optional(),
			OR: z
				.lazy(() => OrganizationWhereInputSchema)
				.array()
				.optional(),
			NOT: z
				.union([
					z.lazy(() => OrganizationWhereInputSchema),
					z.lazy(() => OrganizationWhereInputSchema).array(),
				])
				.optional(),
			id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
			name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
			slug: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
			domain: z
				.union([z.lazy(() => StringNullableFilterSchema), z.string()])
				.optional()
				.nullable(),
			shouldAttachUsersByDomain: z
				.union([z.lazy(() => BoolFilterSchema), z.boolean()])
				.optional(),
			avatarUrl: z
				.union([z.lazy(() => StringNullableFilterSchema), z.string()])
				.optional()
				.nullable(),
			createdAt: z
				.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
				.optional(),
			updatedAt: z
				.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
				.optional(),
			ownerId: z
				.union([z.lazy(() => StringFilterSchema), z.string()])
				.optional(),
			owner: z
				.union([
					z.lazy(() => UserRelationFilterSchema),
					z.lazy(() => UserWhereInputSchema),
				])
				.optional(),
			invites: z.lazy(() => InviteListRelationFilterSchema).optional(),
			members: z.lazy(() => MemberListRelationFilterSchema).optional(),
			patients: z.lazy(() => PatientListRelationFilterSchema).optional(),
		})
		.strict();

export const OrganizationOrderByWithRelationInputSchema: z.ZodType<Prisma.OrganizationOrderByWithRelationInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			name: z.lazy(() => SortOrderSchema).optional(),
			slug: z.lazy(() => SortOrderSchema).optional(),
			domain: z
				.union([
					z.lazy(() => SortOrderSchema),
					z.lazy(() => SortOrderInputSchema),
				])
				.optional(),
			shouldAttachUsersByDomain: z.lazy(() => SortOrderSchema).optional(),
			avatarUrl: z
				.union([
					z.lazy(() => SortOrderSchema),
					z.lazy(() => SortOrderInputSchema),
				])
				.optional(),
			createdAt: z.lazy(() => SortOrderSchema).optional(),
			updatedAt: z.lazy(() => SortOrderSchema).optional(),
			ownerId: z.lazy(() => SortOrderSchema).optional(),
			owner: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
			invites: z
				.lazy(() => InviteOrderByRelationAggregateInputSchema)
				.optional(),
			members: z
				.lazy(() => MemberOrderByRelationAggregateInputSchema)
				.optional(),
			patients: z
				.lazy(() => PatientOrderByRelationAggregateInputSchema)
				.optional(),
		})
		.strict();

export const OrganizationWhereUniqueInputSchema: z.ZodType<Prisma.OrganizationWhereUniqueInput> =
	z
		.union([
			z.object({
				id: z.string(),
				slug: z.string(),
				domain: z.string(),
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
		.and(
			z
				.object({
					id: z.string().optional(),
					slug: z.string().optional(),
					domain: z.string().optional(),
					AND: z
						.union([
							z.lazy(() => OrganizationWhereInputSchema),
							z.lazy(() => OrganizationWhereInputSchema).array(),
						])
						.optional(),
					OR: z
						.lazy(() => OrganizationWhereInputSchema)
						.array()
						.optional(),
					NOT: z
						.union([
							z.lazy(() => OrganizationWhereInputSchema),
							z.lazy(() => OrganizationWhereInputSchema).array(),
						])
						.optional(),
					name: z
						.union([z.lazy(() => StringFilterSchema), z.string()])
						.optional(),
					shouldAttachUsersByDomain: z
						.union([z.lazy(() => BoolFilterSchema), z.boolean()])
						.optional(),
					avatarUrl: z
						.union([z.lazy(() => StringNullableFilterSchema), z.string()])
						.optional()
						.nullable(),
					createdAt: z
						.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
						.optional(),
					updatedAt: z
						.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
						.optional(),
					ownerId: z
						.union([z.lazy(() => StringFilterSchema), z.string()])
						.optional(),
					owner: z
						.union([
							z.lazy(() => UserRelationFilterSchema),
							z.lazy(() => UserWhereInputSchema),
						])
						.optional(),
					invites: z.lazy(() => InviteListRelationFilterSchema).optional(),
					members: z.lazy(() => MemberListRelationFilterSchema).optional(),
					patients: z.lazy(() => PatientListRelationFilterSchema).optional(),
				})
				.strict(),
		);

export const OrganizationOrderByWithAggregationInputSchema: z.ZodType<Prisma.OrganizationOrderByWithAggregationInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			name: z.lazy(() => SortOrderSchema).optional(),
			slug: z.lazy(() => SortOrderSchema).optional(),
			domain: z
				.union([
					z.lazy(() => SortOrderSchema),
					z.lazy(() => SortOrderInputSchema),
				])
				.optional(),
			shouldAttachUsersByDomain: z.lazy(() => SortOrderSchema).optional(),
			avatarUrl: z
				.union([
					z.lazy(() => SortOrderSchema),
					z.lazy(() => SortOrderInputSchema),
				])
				.optional(),
			createdAt: z.lazy(() => SortOrderSchema).optional(),
			updatedAt: z.lazy(() => SortOrderSchema).optional(),
			ownerId: z.lazy(() => SortOrderSchema).optional(),
			_count: z
				.lazy(() => OrganizationCountOrderByAggregateInputSchema)
				.optional(),
			_max: z.lazy(() => OrganizationMaxOrderByAggregateInputSchema).optional(),
			_min: z.lazy(() => OrganizationMinOrderByAggregateInputSchema).optional(),
		})
		.strict();

export const OrganizationScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.OrganizationScalarWhereWithAggregatesInput> =
	z
		.object({
			AND: z
				.union([
					z.lazy(() => OrganizationScalarWhereWithAggregatesInputSchema),
					z
						.lazy(() => OrganizationScalarWhereWithAggregatesInputSchema)
						.array(),
				])
				.optional(),
			OR: z
				.lazy(() => OrganizationScalarWhereWithAggregatesInputSchema)
				.array()
				.optional(),
			NOT: z
				.union([
					z.lazy(() => OrganizationScalarWhereWithAggregatesInputSchema),
					z
						.lazy(() => OrganizationScalarWhereWithAggregatesInputSchema)
						.array(),
				])
				.optional(),
			id: z
				.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
				.optional(),
			name: z
				.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
				.optional(),
			slug: z
				.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
				.optional(),
			domain: z
				.union([
					z.lazy(() => StringNullableWithAggregatesFilterSchema),
					z.string(),
				])
				.optional()
				.nullable(),
			shouldAttachUsersByDomain: z
				.union([z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean()])
				.optional(),
			avatarUrl: z
				.union([
					z.lazy(() => StringNullableWithAggregatesFilterSchema),
					z.string(),
				])
				.optional()
				.nullable(),
			createdAt: z
				.union([
					z.lazy(() => DateTimeWithAggregatesFilterSchema),
					z.coerce.date(),
				])
				.optional(),
			updatedAt: z
				.union([
					z.lazy(() => DateTimeWithAggregatesFilterSchema),
					z.coerce.date(),
				])
				.optional(),
			ownerId: z
				.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
				.optional(),
		})
		.strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z
	.object({
		id: z.string().optional(),
		name: z.string().optional().nullable(),
		email: z.string(),
		passwordHash: z.string().optional().nullable(),
		avatarUrl: z.string().optional().nullable(),
		createdAt: z.coerce.date().optional(),
		updatedAt: z.coerce.date().optional(),
		tokens: z
			.lazy(() => TokenCreateNestedManyWithoutUserInputSchema)
			.optional(),
		accounts: z
			.lazy(() => AccountCreateNestedManyWithoutUserInputSchema)
			.optional(),
		invites: z
			.lazy(() => InviteCreateNestedManyWithoutAuthorInputSchema)
			.optional(),
		member_on: z
			.lazy(() => MemberCreateNestedManyWithoutUserInputSchema)
			.optional(),
		owns_organizations: z
			.lazy(() => OrganizationCreateNestedManyWithoutOwnerInputSchema)
			.optional(),
	})
	.strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> =
	z
		.object({
			id: z.string().optional(),
			name: z.string().optional().nullable(),
			email: z.string(),
			passwordHash: z.string().optional().nullable(),
			avatarUrl: z.string().optional().nullable(),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
			tokens: z
				.lazy(() => TokenUncheckedCreateNestedManyWithoutUserInputSchema)
				.optional(),
			accounts: z
				.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema)
				.optional(),
			invites: z
				.lazy(() => InviteUncheckedCreateNestedManyWithoutAuthorInputSchema)
				.optional(),
			member_on: z
				.lazy(() => MemberUncheckedCreateNestedManyWithoutUserInputSchema)
				.optional(),
			owns_organizations: z
				.lazy(
					() => OrganizationUncheckedCreateNestedManyWithoutOwnerInputSchema,
				)
				.optional(),
		})
		.strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z
	.object({
		id: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		name: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		email: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		passwordHash: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		avatarUrl: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		createdAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		updatedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		tokens: z
			.lazy(() => TokenUpdateManyWithoutUserNestedInputSchema)
			.optional(),
		accounts: z
			.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema)
			.optional(),
		invites: z
			.lazy(() => InviteUpdateManyWithoutAuthorNestedInputSchema)
			.optional(),
		member_on: z
			.lazy(() => MemberUpdateManyWithoutUserNestedInputSchema)
			.optional(),
		owns_organizations: z
			.lazy(() => OrganizationUpdateManyWithoutOwnerNestedInputSchema)
			.optional(),
	})
	.strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> =
	z
		.object({
			id: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			name: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			email: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			passwordHash: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			avatarUrl: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			tokens: z
				.lazy(() => TokenUncheckedUpdateManyWithoutUserNestedInputSchema)
				.optional(),
			accounts: z
				.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema)
				.optional(),
			invites: z
				.lazy(() => InviteUncheckedUpdateManyWithoutAuthorNestedInputSchema)
				.optional(),
			member_on: z
				.lazy(() => MemberUncheckedUpdateManyWithoutUserNestedInputSchema)
				.optional(),
			owns_organizations: z
				.lazy(
					() => OrganizationUncheckedUpdateManyWithoutOwnerNestedInputSchema,
				)
				.optional(),
		})
		.strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> =
	z
		.object({
			id: z.string().optional(),
			name: z.string().optional().nullable(),
			email: z.string(),
			passwordHash: z.string().optional().nullable(),
			avatarUrl: z.string().optional().nullable(),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
		})
		.strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> =
	z
		.object({
			id: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			name: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			email: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			passwordHash: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			avatarUrl: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> =
	z
		.object({
			id: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			name: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			email: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			passwordHash: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			avatarUrl: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const TokenCreateInputSchema: z.ZodType<Prisma.TokenCreateInput> = z
	.object({
		id: z.string().optional(),
		type: z.lazy(() => TokenTypeSchema),
		createdAt: z.coerce.date().optional(),
		user: z.lazy(() => UserCreateNestedOneWithoutTokensInputSchema),
	})
	.strict();

export const TokenUncheckedCreateInputSchema: z.ZodType<Prisma.TokenUncheckedCreateInput> =
	z
		.object({
			id: z.string().optional(),
			type: z.lazy(() => TokenTypeSchema),
			createdAt: z.coerce.date().optional(),
			userId: z.string(),
		})
		.strict();

export const TokenUpdateInputSchema: z.ZodType<Prisma.TokenUpdateInput> = z
	.object({
		id: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		type: z
			.union([
				z.lazy(() => TokenTypeSchema),
				z.lazy(() => EnumTokenTypeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		createdAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		user: z
			.lazy(() => UserUpdateOneRequiredWithoutTokensNestedInputSchema)
			.optional(),
	})
	.strict();

export const TokenUncheckedUpdateInputSchema: z.ZodType<Prisma.TokenUncheckedUpdateInput> =
	z
		.object({
			id: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			type: z
				.union([
					z.lazy(() => TokenTypeSchema),
					z.lazy(() => EnumTokenTypeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			userId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const TokenCreateManyInputSchema: z.ZodType<Prisma.TokenCreateManyInput> =
	z
		.object({
			id: z.string().optional(),
			type: z.lazy(() => TokenTypeSchema),
			createdAt: z.coerce.date().optional(),
			userId: z.string(),
		})
		.strict();

export const TokenUpdateManyMutationInputSchema: z.ZodType<Prisma.TokenUpdateManyMutationInput> =
	z
		.object({
			id: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			type: z
				.union([
					z.lazy(() => TokenTypeSchema),
					z.lazy(() => EnumTokenTypeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const TokenUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TokenUncheckedUpdateManyInput> =
	z
		.object({
			id: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			type: z
				.union([
					z.lazy(() => TokenTypeSchema),
					z.lazy(() => EnumTokenTypeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			userId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const AccountCreateInputSchema: z.ZodType<Prisma.AccountCreateInput> = z
	.object({
		id: z.string().optional(),
		provider: z.lazy(() => AccountProviderSchema),
		providerAccountId: z.string(),
		user: z.lazy(() => UserCreateNestedOneWithoutAccountsInputSchema),
	})
	.strict();

export const AccountUncheckedCreateInputSchema: z.ZodType<Prisma.AccountUncheckedCreateInput> =
	z
		.object({
			id: z.string().optional(),
			provider: z.lazy(() => AccountProviderSchema),
			providerAccountId: z.string(),
			userId: z.string(),
		})
		.strict();

export const AccountUpdateInputSchema: z.ZodType<Prisma.AccountUpdateInput> = z
	.object({
		id: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		provider: z
			.union([
				z.lazy(() => AccountProviderSchema),
				z.lazy(() => EnumAccountProviderFieldUpdateOperationsInputSchema),
			])
			.optional(),
		providerAccountId: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		user: z
			.lazy(() => UserUpdateOneRequiredWithoutAccountsNestedInputSchema)
			.optional(),
	})
	.strict();

export const AccountUncheckedUpdateInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateInput> =
	z
		.object({
			id: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			provider: z
				.union([
					z.lazy(() => AccountProviderSchema),
					z.lazy(() => EnumAccountProviderFieldUpdateOperationsInputSchema),
				])
				.optional(),
			providerAccountId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			userId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const AccountCreateManyInputSchema: z.ZodType<Prisma.AccountCreateManyInput> =
	z
		.object({
			id: z.string().optional(),
			provider: z.lazy(() => AccountProviderSchema),
			providerAccountId: z.string(),
			userId: z.string(),
		})
		.strict();

export const AccountUpdateManyMutationInputSchema: z.ZodType<Prisma.AccountUpdateManyMutationInput> =
	z
		.object({
			id: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			provider: z
				.union([
					z.lazy(() => AccountProviderSchema),
					z.lazy(() => EnumAccountProviderFieldUpdateOperationsInputSchema),
				])
				.optional(),
			providerAccountId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const AccountUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyInput> =
	z
		.object({
			id: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			provider: z
				.union([
					z.lazy(() => AccountProviderSchema),
					z.lazy(() => EnumAccountProviderFieldUpdateOperationsInputSchema),
				])
				.optional(),
			providerAccountId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			userId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const InviteCreateInputSchema: z.ZodType<Prisma.InviteCreateInput> = z
	.object({
		id: z.string().optional(),
		email: z.string(),
		role: z.lazy(() => RoleSchema),
		createdAt: z.coerce.date().optional(),
		author: z
			.lazy(() => UserCreateNestedOneWithoutInvitesInputSchema)
			.optional(),
		organization: z.lazy(
			() => OrganizationCreateNestedOneWithoutInvitesInputSchema,
		),
	})
	.strict();

export const InviteUncheckedCreateInputSchema: z.ZodType<Prisma.InviteUncheckedCreateInput> =
	z
		.object({
			id: z.string().optional(),
			email: z.string(),
			role: z.lazy(() => RoleSchema),
			createdAt: z.coerce.date().optional(),
			authorId: z.string().optional().nullable(),
			organizationId: z.string(),
		})
		.strict();

export const InviteUpdateInputSchema: z.ZodType<Prisma.InviteUpdateInput> = z
	.object({
		id: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		email: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		role: z
			.union([
				z.lazy(() => RoleSchema),
				z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema),
			])
			.optional(),
		createdAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		author: z
			.lazy(() => UserUpdateOneWithoutInvitesNestedInputSchema)
			.optional(),
		organization: z
			.lazy(() => OrganizationUpdateOneRequiredWithoutInvitesNestedInputSchema)
			.optional(),
	})
	.strict();

export const InviteUncheckedUpdateInputSchema: z.ZodType<Prisma.InviteUncheckedUpdateInput> =
	z
		.object({
			id: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			email: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			role: z
				.union([
					z.lazy(() => RoleSchema),
					z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			authorId: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			organizationId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const InviteCreateManyInputSchema: z.ZodType<Prisma.InviteCreateManyInput> =
	z
		.object({
			id: z.string().optional(),
			email: z.string(),
			role: z.lazy(() => RoleSchema),
			createdAt: z.coerce.date().optional(),
			authorId: z.string().optional().nullable(),
			organizationId: z.string(),
		})
		.strict();

export const InviteUpdateManyMutationInputSchema: z.ZodType<Prisma.InviteUpdateManyMutationInput> =
	z
		.object({
			id: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			email: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			role: z
				.union([
					z.lazy(() => RoleSchema),
					z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const InviteUncheckedUpdateManyInputSchema: z.ZodType<Prisma.InviteUncheckedUpdateManyInput> =
	z
		.object({
			id: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			email: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			role: z
				.union([
					z.lazy(() => RoleSchema),
					z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			authorId: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			organizationId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const MemberCreateInputSchema: z.ZodType<Prisma.MemberCreateInput> = z
	.object({
		id: z.string().optional(),
		role: z.lazy(() => RoleSchema).optional(),
		specialty: z.string().optional().nullable(),
		organization: z.lazy(
			() => OrganizationCreateNestedOneWithoutMembersInputSchema,
		),
		user: z.lazy(() => UserCreateNestedOneWithoutMember_onInputSchema),
		appointments: z
			.lazy(() => AppointmentCreateNestedManyWithoutMemberInputSchema)
			.optional(),
	})
	.strict();

export const MemberUncheckedCreateInputSchema: z.ZodType<Prisma.MemberUncheckedCreateInput> =
	z
		.object({
			id: z.string().optional(),
			role: z.lazy(() => RoleSchema).optional(),
			specialty: z.string().optional().nullable(),
			organizationId: z.string(),
			userId: z.string(),
			appointments: z
				.lazy(
					() => AppointmentUncheckedCreateNestedManyWithoutMemberInputSchema,
				)
				.optional(),
		})
		.strict();

export const MemberUpdateInputSchema: z.ZodType<Prisma.MemberUpdateInput> = z
	.object({
		id: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		role: z
			.union([
				z.lazy(() => RoleSchema),
				z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema),
			])
			.optional(),
		specialty: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		organization: z
			.lazy(() => OrganizationUpdateOneRequiredWithoutMembersNestedInputSchema)
			.optional(),
		user: z
			.lazy(() => UserUpdateOneRequiredWithoutMember_onNestedInputSchema)
			.optional(),
		appointments: z
			.lazy(() => AppointmentUpdateManyWithoutMemberNestedInputSchema)
			.optional(),
	})
	.strict();

export const MemberUncheckedUpdateInputSchema: z.ZodType<Prisma.MemberUncheckedUpdateInput> =
	z
		.object({
			id: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			role: z
				.union([
					z.lazy(() => RoleSchema),
					z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema),
				])
				.optional(),
			specialty: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			organizationId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			userId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			appointments: z
				.lazy(
					() => AppointmentUncheckedUpdateManyWithoutMemberNestedInputSchema,
				)
				.optional(),
		})
		.strict();

export const MemberCreateManyInputSchema: z.ZodType<Prisma.MemberCreateManyInput> =
	z
		.object({
			id: z.string().optional(),
			role: z.lazy(() => RoleSchema).optional(),
			specialty: z.string().optional().nullable(),
			organizationId: z.string(),
			userId: z.string(),
		})
		.strict();

export const MemberUpdateManyMutationInputSchema: z.ZodType<Prisma.MemberUpdateManyMutationInput> =
	z
		.object({
			id: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			role: z
				.union([
					z.lazy(() => RoleSchema),
					z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema),
				])
				.optional(),
			specialty: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
		})
		.strict();

export const MemberUncheckedUpdateManyInputSchema: z.ZodType<Prisma.MemberUncheckedUpdateManyInput> =
	z
		.object({
			id: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			role: z
				.union([
					z.lazy(() => RoleSchema),
					z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema),
				])
				.optional(),
			specialty: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			organizationId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			userId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const PatientCreateInputSchema: z.ZodType<Prisma.PatientCreateInput> = z
	.object({
		id: z.string().optional(),
		name: z.string(),
		email: z.string().optional().nullable(),
		phone: z.string().optional().nullable(),
		birthDate: z.coerce.date(),
		address: z.string().optional().nullable(),
		createdAt: z.coerce.date().optional(),
		updatedAt: z.coerce.date().optional(),
		appointments: z
			.lazy(() => AppointmentCreateNestedManyWithoutPatientInputSchema)
			.optional(),
		organization: z.lazy(
			() => OrganizationCreateNestedOneWithoutPatientsInputSchema,
		),
	})
	.strict();

export const PatientUncheckedCreateInputSchema: z.ZodType<Prisma.PatientUncheckedCreateInput> =
	z
		.object({
			id: z.string().optional(),
			name: z.string(),
			email: z.string().optional().nullable(),
			phone: z.string().optional().nullable(),
			birthDate: z.coerce.date(),
			address: z.string().optional().nullable(),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
			organizationId: z.string(),
			appointments: z
				.lazy(
					() => AppointmentUncheckedCreateNestedManyWithoutPatientInputSchema,
				)
				.optional(),
		})
		.strict();

export const PatientUpdateInputSchema: z.ZodType<Prisma.PatientUpdateInput> = z
	.object({
		id: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		name: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		email: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		phone: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		birthDate: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		address: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		createdAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		updatedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		appointments: z
			.lazy(() => AppointmentUpdateManyWithoutPatientNestedInputSchema)
			.optional(),
		organization: z
			.lazy(() => OrganizationUpdateOneRequiredWithoutPatientsNestedInputSchema)
			.optional(),
	})
	.strict();

export const PatientUncheckedUpdateInputSchema: z.ZodType<Prisma.PatientUncheckedUpdateInput> =
	z
		.object({
			id: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			name: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			email: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			phone: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			birthDate: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			address: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			organizationId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			appointments: z
				.lazy(
					() => AppointmentUncheckedUpdateManyWithoutPatientNestedInputSchema,
				)
				.optional(),
		})
		.strict();

export const PatientCreateManyInputSchema: z.ZodType<Prisma.PatientCreateManyInput> =
	z
		.object({
			id: z.string().optional(),
			name: z.string(),
			email: z.string().optional().nullable(),
			phone: z.string().optional().nullable(),
			birthDate: z.coerce.date(),
			address: z.string().optional().nullable(),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
			organizationId: z.string(),
		})
		.strict();

export const PatientUpdateManyMutationInputSchema: z.ZodType<Prisma.PatientUpdateManyMutationInput> =
	z
		.object({
			id: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			name: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			email: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			phone: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			birthDate: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			address: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const PatientUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PatientUncheckedUpdateManyInput> =
	z
		.object({
			id: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			name: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			email: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			phone: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			birthDate: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			address: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			organizationId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const AppointmentCreateInputSchema: z.ZodType<Prisma.AppointmentCreateInput> =
	z
		.object({
			id: z.string().optional(),
			startTime: z.coerce.date(),
			endTime: z.coerce.date(),
			description: z.string().optional().nullable(),
			status: z.lazy(() => AppointmentStatusSchema).optional(),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
			patient: z.lazy(
				() => PatientCreateNestedOneWithoutAppointmentsInputSchema,
			),
			member: z.lazy(() => MemberCreateNestedOneWithoutAppointmentsInputSchema),
		})
		.strict();

export const AppointmentUncheckedCreateInputSchema: z.ZodType<Prisma.AppointmentUncheckedCreateInput> =
	z
		.object({
			id: z.string().optional(),
			startTime: z.coerce.date(),
			endTime: z.coerce.date(),
			description: z.string().optional().nullable(),
			status: z.lazy(() => AppointmentStatusSchema).optional(),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
			patientId: z.string(),
			memberId: z.string(),
		})
		.strict();

export const AppointmentUpdateInputSchema: z.ZodType<Prisma.AppointmentUpdateInput> =
	z
		.object({
			id: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			startTime: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			endTime: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			description: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			status: z
				.union([
					z.lazy(() => AppointmentStatusSchema),
					z.lazy(() => EnumAppointmentStatusFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			patient: z
				.lazy(
					() => PatientUpdateOneRequiredWithoutAppointmentsNestedInputSchema,
				)
				.optional(),
			member: z
				.lazy(() => MemberUpdateOneRequiredWithoutAppointmentsNestedInputSchema)
				.optional(),
		})
		.strict();

export const AppointmentUncheckedUpdateInputSchema: z.ZodType<Prisma.AppointmentUncheckedUpdateInput> =
	z
		.object({
			id: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			startTime: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			endTime: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			description: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			status: z
				.union([
					z.lazy(() => AppointmentStatusSchema),
					z.lazy(() => EnumAppointmentStatusFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			patientId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			memberId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const AppointmentCreateManyInputSchema: z.ZodType<Prisma.AppointmentCreateManyInput> =
	z
		.object({
			id: z.string().optional(),
			startTime: z.coerce.date(),
			endTime: z.coerce.date(),
			description: z.string().optional().nullable(),
			status: z.lazy(() => AppointmentStatusSchema).optional(),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
			patientId: z.string(),
			memberId: z.string(),
		})
		.strict();

export const AppointmentUpdateManyMutationInputSchema: z.ZodType<Prisma.AppointmentUpdateManyMutationInput> =
	z
		.object({
			id: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			startTime: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			endTime: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			description: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			status: z
				.union([
					z.lazy(() => AppointmentStatusSchema),
					z.lazy(() => EnumAppointmentStatusFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const AppointmentUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AppointmentUncheckedUpdateManyInput> =
	z
		.object({
			id: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			startTime: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			endTime: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			description: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			status: z
				.union([
					z.lazy(() => AppointmentStatusSchema),
					z.lazy(() => EnumAppointmentStatusFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			patientId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			memberId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const OrganizationCreateInputSchema: z.ZodType<Prisma.OrganizationCreateInput> =
	z
		.object({
			id: z.string().optional(),
			name: z.string(),
			slug: z.string(),
			domain: z.string().optional().nullable(),
			shouldAttachUsersByDomain: z.boolean().optional(),
			avatarUrl: z.string().optional().nullable(),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
			owner: z.lazy(
				() => UserCreateNestedOneWithoutOwns_organizationsInputSchema,
			),
			invites: z
				.lazy(() => InviteCreateNestedManyWithoutOrganizationInputSchema)
				.optional(),
			members: z
				.lazy(() => MemberCreateNestedManyWithoutOrganizationInputSchema)
				.optional(),
			patients: z
				.lazy(() => PatientCreateNestedManyWithoutOrganizationInputSchema)
				.optional(),
		})
		.strict();

export const OrganizationUncheckedCreateInputSchema: z.ZodType<Prisma.OrganizationUncheckedCreateInput> =
	z
		.object({
			id: z.string().optional(),
			name: z.string(),
			slug: z.string(),
			domain: z.string().optional().nullable(),
			shouldAttachUsersByDomain: z.boolean().optional(),
			avatarUrl: z.string().optional().nullable(),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
			ownerId: z.string(),
			invites: z
				.lazy(
					() => InviteUncheckedCreateNestedManyWithoutOrganizationInputSchema,
				)
				.optional(),
			members: z
				.lazy(
					() => MemberUncheckedCreateNestedManyWithoutOrganizationInputSchema,
				)
				.optional(),
			patients: z
				.lazy(
					() => PatientUncheckedCreateNestedManyWithoutOrganizationInputSchema,
				)
				.optional(),
		})
		.strict();

export const OrganizationUpdateInputSchema: z.ZodType<Prisma.OrganizationUpdateInput> =
	z
		.object({
			id: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			name: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			slug: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			domain: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			shouldAttachUsersByDomain: z
				.union([
					z.boolean(),
					z.lazy(() => BoolFieldUpdateOperationsInputSchema),
				])
				.optional(),
			avatarUrl: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			owner: z
				.lazy(
					() => UserUpdateOneRequiredWithoutOwns_organizationsNestedInputSchema,
				)
				.optional(),
			invites: z
				.lazy(() => InviteUpdateManyWithoutOrganizationNestedInputSchema)
				.optional(),
			members: z
				.lazy(() => MemberUpdateManyWithoutOrganizationNestedInputSchema)
				.optional(),
			patients: z
				.lazy(() => PatientUpdateManyWithoutOrganizationNestedInputSchema)
				.optional(),
		})
		.strict();

export const OrganizationUncheckedUpdateInputSchema: z.ZodType<Prisma.OrganizationUncheckedUpdateInput> =
	z
		.object({
			id: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			name: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			slug: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			domain: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			shouldAttachUsersByDomain: z
				.union([
					z.boolean(),
					z.lazy(() => BoolFieldUpdateOperationsInputSchema),
				])
				.optional(),
			avatarUrl: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			ownerId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			invites: z
				.lazy(
					() => InviteUncheckedUpdateManyWithoutOrganizationNestedInputSchema,
				)
				.optional(),
			members: z
				.lazy(
					() => MemberUncheckedUpdateManyWithoutOrganizationNestedInputSchema,
				)
				.optional(),
			patients: z
				.lazy(
					() => PatientUncheckedUpdateManyWithoutOrganizationNestedInputSchema,
				)
				.optional(),
		})
		.strict();

export const OrganizationCreateManyInputSchema: z.ZodType<Prisma.OrganizationCreateManyInput> =
	z
		.object({
			id: z.string().optional(),
			name: z.string(),
			slug: z.string(),
			domain: z.string().optional().nullable(),
			shouldAttachUsersByDomain: z.boolean().optional(),
			avatarUrl: z.string().optional().nullable(),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
			ownerId: z.string(),
		})
		.strict();

export const OrganizationUpdateManyMutationInputSchema: z.ZodType<Prisma.OrganizationUpdateManyMutationInput> =
	z
		.object({
			id: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			name: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			slug: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			domain: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			shouldAttachUsersByDomain: z
				.union([
					z.boolean(),
					z.lazy(() => BoolFieldUpdateOperationsInputSchema),
				])
				.optional(),
			avatarUrl: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const OrganizationUncheckedUpdateManyInputSchema: z.ZodType<Prisma.OrganizationUncheckedUpdateManyInput> =
	z
		.object({
			id: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			name: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			slug: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			domain: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			shouldAttachUsersByDomain: z
				.union([
					z.boolean(),
					z.lazy(() => BoolFieldUpdateOperationsInputSchema),
				])
				.optional(),
			avatarUrl: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			ownerId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z
	.object({
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
		not: z
			.union([z.string(), z.lazy(() => NestedStringFilterSchema)])
			.optional(),
	})
	.strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> =
	z
		.object({
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
			not: z
				.union([z.string(), z.lazy(() => NestedStringNullableFilterSchema)])
				.optional()
				.nullable(),
		})
		.strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z
	.object({
		equals: z.coerce.date().optional(),
		in: z.coerce.date().array().optional(),
		notIn: z.coerce.date().array().optional(),
		lt: z.coerce.date().optional(),
		lte: z.coerce.date().optional(),
		gt: z.coerce.date().optional(),
		gte: z.coerce.date().optional(),
		not: z
			.union([z.coerce.date(), z.lazy(() => NestedDateTimeFilterSchema)])
			.optional(),
	})
	.strict();

export const TokenListRelationFilterSchema: z.ZodType<Prisma.TokenListRelationFilter> =
	z
		.object({
			every: z.lazy(() => TokenWhereInputSchema).optional(),
			some: z.lazy(() => TokenWhereInputSchema).optional(),
			none: z.lazy(() => TokenWhereInputSchema).optional(),
		})
		.strict();

export const AccountListRelationFilterSchema: z.ZodType<Prisma.AccountListRelationFilter> =
	z
		.object({
			every: z.lazy(() => AccountWhereInputSchema).optional(),
			some: z.lazy(() => AccountWhereInputSchema).optional(),
			none: z.lazy(() => AccountWhereInputSchema).optional(),
		})
		.strict();

export const InviteListRelationFilterSchema: z.ZodType<Prisma.InviteListRelationFilter> =
	z
		.object({
			every: z.lazy(() => InviteWhereInputSchema).optional(),
			some: z.lazy(() => InviteWhereInputSchema).optional(),
			none: z.lazy(() => InviteWhereInputSchema).optional(),
		})
		.strict();

export const MemberListRelationFilterSchema: z.ZodType<Prisma.MemberListRelationFilter> =
	z
		.object({
			every: z.lazy(() => MemberWhereInputSchema).optional(),
			some: z.lazy(() => MemberWhereInputSchema).optional(),
			none: z.lazy(() => MemberWhereInputSchema).optional(),
		})
		.strict();

export const OrganizationListRelationFilterSchema: z.ZodType<Prisma.OrganizationListRelationFilter> =
	z
		.object({
			every: z.lazy(() => OrganizationWhereInputSchema).optional(),
			some: z.lazy(() => OrganizationWhereInputSchema).optional(),
			none: z.lazy(() => OrganizationWhereInputSchema).optional(),
		})
		.strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z
	.object({
		sort: z.lazy(() => SortOrderSchema),
		nulls: z.lazy(() => NullsOrderSchema).optional(),
	})
	.strict();

export const TokenOrderByRelationAggregateInputSchema: z.ZodType<Prisma.TokenOrderByRelationAggregateInput> =
	z
		.object({
			_count: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const AccountOrderByRelationAggregateInputSchema: z.ZodType<Prisma.AccountOrderByRelationAggregateInput> =
	z
		.object({
			_count: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const InviteOrderByRelationAggregateInputSchema: z.ZodType<Prisma.InviteOrderByRelationAggregateInput> =
	z
		.object({
			_count: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const MemberOrderByRelationAggregateInputSchema: z.ZodType<Prisma.MemberOrderByRelationAggregateInput> =
	z
		.object({
			_count: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const OrganizationOrderByRelationAggregateInputSchema: z.ZodType<Prisma.OrganizationOrderByRelationAggregateInput> =
	z
		.object({
			_count: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			name: z.lazy(() => SortOrderSchema).optional(),
			email: z.lazy(() => SortOrderSchema).optional(),
			passwordHash: z.lazy(() => SortOrderSchema).optional(),
			avatarUrl: z.lazy(() => SortOrderSchema).optional(),
			createdAt: z.lazy(() => SortOrderSchema).optional(),
			updatedAt: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			name: z.lazy(() => SortOrderSchema).optional(),
			email: z.lazy(() => SortOrderSchema).optional(),
			passwordHash: z.lazy(() => SortOrderSchema).optional(),
			avatarUrl: z.lazy(() => SortOrderSchema).optional(),
			createdAt: z.lazy(() => SortOrderSchema).optional(),
			updatedAt: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			name: z.lazy(() => SortOrderSchema).optional(),
			email: z.lazy(() => SortOrderSchema).optional(),
			passwordHash: z.lazy(() => SortOrderSchema).optional(),
			avatarUrl: z.lazy(() => SortOrderSchema).optional(),
			createdAt: z.lazy(() => SortOrderSchema).optional(),
			updatedAt: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> =
	z
		.object({
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
			not: z
				.union([
					z.string(),
					z.lazy(() => NestedStringWithAggregatesFilterSchema),
				])
				.optional(),
			_count: z.lazy(() => NestedIntFilterSchema).optional(),
			_min: z.lazy(() => NestedStringFilterSchema).optional(),
			_max: z.lazy(() => NestedStringFilterSchema).optional(),
		})
		.strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> =
	z
		.object({
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
			not: z
				.union([
					z.string(),
					z.lazy(() => NestedStringNullableWithAggregatesFilterSchema),
				])
				.optional()
				.nullable(),
			_count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
			_min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
			_max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
		})
		.strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> =
	z
		.object({
			equals: z.coerce.date().optional(),
			in: z.coerce.date().array().optional(),
			notIn: z.coerce.date().array().optional(),
			lt: z.coerce.date().optional(),
			lte: z.coerce.date().optional(),
			gt: z.coerce.date().optional(),
			gte: z.coerce.date().optional(),
			not: z
				.union([
					z.coerce.date(),
					z.lazy(() => NestedDateTimeWithAggregatesFilterSchema),
				])
				.optional(),
			_count: z.lazy(() => NestedIntFilterSchema).optional(),
			_min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
			_max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
		})
		.strict();

export const EnumTokenTypeFilterSchema: z.ZodType<Prisma.EnumTokenTypeFilter> =
	z
		.object({
			equals: z.lazy(() => TokenTypeSchema).optional(),
			in: z
				.lazy(() => TokenTypeSchema)
				.array()
				.optional(),
			notIn: z
				.lazy(() => TokenTypeSchema)
				.array()
				.optional(),
			not: z
				.union([
					z.lazy(() => TokenTypeSchema),
					z.lazy(() => NestedEnumTokenTypeFilterSchema),
				])
				.optional(),
		})
		.strict();

export const UserRelationFilterSchema: z.ZodType<Prisma.UserRelationFilter> = z
	.object({
		is: z.lazy(() => UserWhereInputSchema).optional(),
		isNot: z.lazy(() => UserWhereInputSchema).optional(),
	})
	.strict();

export const TokenCountOrderByAggregateInputSchema: z.ZodType<Prisma.TokenCountOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			type: z.lazy(() => SortOrderSchema).optional(),
			createdAt: z.lazy(() => SortOrderSchema).optional(),
			userId: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const TokenMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TokenMaxOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			type: z.lazy(() => SortOrderSchema).optional(),
			createdAt: z.lazy(() => SortOrderSchema).optional(),
			userId: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const TokenMinOrderByAggregateInputSchema: z.ZodType<Prisma.TokenMinOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			type: z.lazy(() => SortOrderSchema).optional(),
			createdAt: z.lazy(() => SortOrderSchema).optional(),
			userId: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const EnumTokenTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumTokenTypeWithAggregatesFilter> =
	z
		.object({
			equals: z.lazy(() => TokenTypeSchema).optional(),
			in: z
				.lazy(() => TokenTypeSchema)
				.array()
				.optional(),
			notIn: z
				.lazy(() => TokenTypeSchema)
				.array()
				.optional(),
			not: z
				.union([
					z.lazy(() => TokenTypeSchema),
					z.lazy(() => NestedEnumTokenTypeWithAggregatesFilterSchema),
				])
				.optional(),
			_count: z.lazy(() => NestedIntFilterSchema).optional(),
			_min: z.lazy(() => NestedEnumTokenTypeFilterSchema).optional(),
			_max: z.lazy(() => NestedEnumTokenTypeFilterSchema).optional(),
		})
		.strict();

export const EnumAccountProviderFilterSchema: z.ZodType<Prisma.EnumAccountProviderFilter> =
	z
		.object({
			equals: z.lazy(() => AccountProviderSchema).optional(),
			in: z
				.lazy(() => AccountProviderSchema)
				.array()
				.optional(),
			notIn: z
				.lazy(() => AccountProviderSchema)
				.array()
				.optional(),
			not: z
				.union([
					z.lazy(() => AccountProviderSchema),
					z.lazy(() => NestedEnumAccountProviderFilterSchema),
				])
				.optional(),
		})
		.strict();

export const AccountProviderUserIdCompoundUniqueInputSchema: z.ZodType<Prisma.AccountProviderUserIdCompoundUniqueInput> =
	z
		.object({
			provider: z.lazy(() => AccountProviderSchema),
			userId: z.string(),
		})
		.strict();

export const AccountCountOrderByAggregateInputSchema: z.ZodType<Prisma.AccountCountOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			provider: z.lazy(() => SortOrderSchema).optional(),
			providerAccountId: z.lazy(() => SortOrderSchema).optional(),
			userId: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const AccountMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AccountMaxOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			provider: z.lazy(() => SortOrderSchema).optional(),
			providerAccountId: z.lazy(() => SortOrderSchema).optional(),
			userId: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const AccountMinOrderByAggregateInputSchema: z.ZodType<Prisma.AccountMinOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			provider: z.lazy(() => SortOrderSchema).optional(),
			providerAccountId: z.lazy(() => SortOrderSchema).optional(),
			userId: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const EnumAccountProviderWithAggregatesFilterSchema: z.ZodType<Prisma.EnumAccountProviderWithAggregatesFilter> =
	z
		.object({
			equals: z.lazy(() => AccountProviderSchema).optional(),
			in: z
				.lazy(() => AccountProviderSchema)
				.array()
				.optional(),
			notIn: z
				.lazy(() => AccountProviderSchema)
				.array()
				.optional(),
			not: z
				.union([
					z.lazy(() => AccountProviderSchema),
					z.lazy(() => NestedEnumAccountProviderWithAggregatesFilterSchema),
				])
				.optional(),
			_count: z.lazy(() => NestedIntFilterSchema).optional(),
			_min: z.lazy(() => NestedEnumAccountProviderFilterSchema).optional(),
			_max: z.lazy(() => NestedEnumAccountProviderFilterSchema).optional(),
		})
		.strict();

export const EnumRoleFilterSchema: z.ZodType<Prisma.EnumRoleFilter> = z
	.object({
		equals: z.lazy(() => RoleSchema).optional(),
		in: z
			.lazy(() => RoleSchema)
			.array()
			.optional(),
		notIn: z
			.lazy(() => RoleSchema)
			.array()
			.optional(),
		not: z
			.union([
				z.lazy(() => RoleSchema),
				z.lazy(() => NestedEnumRoleFilterSchema),
			])
			.optional(),
	})
	.strict();

export const UserNullableRelationFilterSchema: z.ZodType<Prisma.UserNullableRelationFilter> =
	z
		.object({
			is: z
				.lazy(() => UserWhereInputSchema)
				.optional()
				.nullable(),
			isNot: z
				.lazy(() => UserWhereInputSchema)
				.optional()
				.nullable(),
		})
		.strict();

export const OrganizationRelationFilterSchema: z.ZodType<Prisma.OrganizationRelationFilter> =
	z
		.object({
			is: z.lazy(() => OrganizationWhereInputSchema).optional(),
			isNot: z.lazy(() => OrganizationWhereInputSchema).optional(),
		})
		.strict();

export const InviteEmailOrganizationIdCompoundUniqueInputSchema: z.ZodType<Prisma.InviteEmailOrganizationIdCompoundUniqueInput> =
	z
		.object({
			email: z.string(),
			organizationId: z.string(),
		})
		.strict();

export const InviteCountOrderByAggregateInputSchema: z.ZodType<Prisma.InviteCountOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			email: z.lazy(() => SortOrderSchema).optional(),
			role: z.lazy(() => SortOrderSchema).optional(),
			createdAt: z.lazy(() => SortOrderSchema).optional(),
			authorId: z.lazy(() => SortOrderSchema).optional(),
			organizationId: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const InviteMaxOrderByAggregateInputSchema: z.ZodType<Prisma.InviteMaxOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			email: z.lazy(() => SortOrderSchema).optional(),
			role: z.lazy(() => SortOrderSchema).optional(),
			createdAt: z.lazy(() => SortOrderSchema).optional(),
			authorId: z.lazy(() => SortOrderSchema).optional(),
			organizationId: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const InviteMinOrderByAggregateInputSchema: z.ZodType<Prisma.InviteMinOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			email: z.lazy(() => SortOrderSchema).optional(),
			role: z.lazy(() => SortOrderSchema).optional(),
			createdAt: z.lazy(() => SortOrderSchema).optional(),
			authorId: z.lazy(() => SortOrderSchema).optional(),
			organizationId: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const EnumRoleWithAggregatesFilterSchema: z.ZodType<Prisma.EnumRoleWithAggregatesFilter> =
	z
		.object({
			equals: z.lazy(() => RoleSchema).optional(),
			in: z
				.lazy(() => RoleSchema)
				.array()
				.optional(),
			notIn: z
				.lazy(() => RoleSchema)
				.array()
				.optional(),
			not: z
				.union([
					z.lazy(() => RoleSchema),
					z.lazy(() => NestedEnumRoleWithAggregatesFilterSchema),
				])
				.optional(),
			_count: z.lazy(() => NestedIntFilterSchema).optional(),
			_min: z.lazy(() => NestedEnumRoleFilterSchema).optional(),
			_max: z.lazy(() => NestedEnumRoleFilterSchema).optional(),
		})
		.strict();

export const AppointmentListRelationFilterSchema: z.ZodType<Prisma.AppointmentListRelationFilter> =
	z
		.object({
			every: z.lazy(() => AppointmentWhereInputSchema).optional(),
			some: z.lazy(() => AppointmentWhereInputSchema).optional(),
			none: z.lazy(() => AppointmentWhereInputSchema).optional(),
		})
		.strict();

export const AppointmentOrderByRelationAggregateInputSchema: z.ZodType<Prisma.AppointmentOrderByRelationAggregateInput> =
	z
		.object({
			_count: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const MemberOrganizationIdUserIdCompoundUniqueInputSchema: z.ZodType<Prisma.MemberOrganizationIdUserIdCompoundUniqueInput> =
	z
		.object({
			organizationId: z.string(),
			userId: z.string(),
		})
		.strict();

export const MemberCountOrderByAggregateInputSchema: z.ZodType<Prisma.MemberCountOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			role: z.lazy(() => SortOrderSchema).optional(),
			specialty: z.lazy(() => SortOrderSchema).optional(),
			organizationId: z.lazy(() => SortOrderSchema).optional(),
			userId: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const MemberMaxOrderByAggregateInputSchema: z.ZodType<Prisma.MemberMaxOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			role: z.lazy(() => SortOrderSchema).optional(),
			specialty: z.lazy(() => SortOrderSchema).optional(),
			organizationId: z.lazy(() => SortOrderSchema).optional(),
			userId: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const MemberMinOrderByAggregateInputSchema: z.ZodType<Prisma.MemberMinOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			role: z.lazy(() => SortOrderSchema).optional(),
			specialty: z.lazy(() => SortOrderSchema).optional(),
			organizationId: z.lazy(() => SortOrderSchema).optional(),
			userId: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const PatientCountOrderByAggregateInputSchema: z.ZodType<Prisma.PatientCountOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			name: z.lazy(() => SortOrderSchema).optional(),
			email: z.lazy(() => SortOrderSchema).optional(),
			phone: z.lazy(() => SortOrderSchema).optional(),
			birthDate: z.lazy(() => SortOrderSchema).optional(),
			address: z.lazy(() => SortOrderSchema).optional(),
			createdAt: z.lazy(() => SortOrderSchema).optional(),
			updatedAt: z.lazy(() => SortOrderSchema).optional(),
			organizationId: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const PatientMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PatientMaxOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			name: z.lazy(() => SortOrderSchema).optional(),
			email: z.lazy(() => SortOrderSchema).optional(),
			phone: z.lazy(() => SortOrderSchema).optional(),
			birthDate: z.lazy(() => SortOrderSchema).optional(),
			address: z.lazy(() => SortOrderSchema).optional(),
			createdAt: z.lazy(() => SortOrderSchema).optional(),
			updatedAt: z.lazy(() => SortOrderSchema).optional(),
			organizationId: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const PatientMinOrderByAggregateInputSchema: z.ZodType<Prisma.PatientMinOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			name: z.lazy(() => SortOrderSchema).optional(),
			email: z.lazy(() => SortOrderSchema).optional(),
			phone: z.lazy(() => SortOrderSchema).optional(),
			birthDate: z.lazy(() => SortOrderSchema).optional(),
			address: z.lazy(() => SortOrderSchema).optional(),
			createdAt: z.lazy(() => SortOrderSchema).optional(),
			updatedAt: z.lazy(() => SortOrderSchema).optional(),
			organizationId: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const EnumAppointmentStatusFilterSchema: z.ZodType<Prisma.EnumAppointmentStatusFilter> =
	z
		.object({
			equals: z.lazy(() => AppointmentStatusSchema).optional(),
			in: z
				.lazy(() => AppointmentStatusSchema)
				.array()
				.optional(),
			notIn: z
				.lazy(() => AppointmentStatusSchema)
				.array()
				.optional(),
			not: z
				.union([
					z.lazy(() => AppointmentStatusSchema),
					z.lazy(() => NestedEnumAppointmentStatusFilterSchema),
				])
				.optional(),
		})
		.strict();

export const PatientRelationFilterSchema: z.ZodType<Prisma.PatientRelationFilter> =
	z
		.object({
			is: z.lazy(() => PatientWhereInputSchema).optional(),
			isNot: z.lazy(() => PatientWhereInputSchema).optional(),
		})
		.strict();

export const MemberRelationFilterSchema: z.ZodType<Prisma.MemberRelationFilter> =
	z
		.object({
			is: z.lazy(() => MemberWhereInputSchema).optional(),
			isNot: z.lazy(() => MemberWhereInputSchema).optional(),
		})
		.strict();

export const AppointmentCountOrderByAggregateInputSchema: z.ZodType<Prisma.AppointmentCountOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			startTime: z.lazy(() => SortOrderSchema).optional(),
			endTime: z.lazy(() => SortOrderSchema).optional(),
			description: z.lazy(() => SortOrderSchema).optional(),
			status: z.lazy(() => SortOrderSchema).optional(),
			createdAt: z.lazy(() => SortOrderSchema).optional(),
			updatedAt: z.lazy(() => SortOrderSchema).optional(),
			patientId: z.lazy(() => SortOrderSchema).optional(),
			memberId: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const AppointmentMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AppointmentMaxOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			startTime: z.lazy(() => SortOrderSchema).optional(),
			endTime: z.lazy(() => SortOrderSchema).optional(),
			description: z.lazy(() => SortOrderSchema).optional(),
			status: z.lazy(() => SortOrderSchema).optional(),
			createdAt: z.lazy(() => SortOrderSchema).optional(),
			updatedAt: z.lazy(() => SortOrderSchema).optional(),
			patientId: z.lazy(() => SortOrderSchema).optional(),
			memberId: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const AppointmentMinOrderByAggregateInputSchema: z.ZodType<Prisma.AppointmentMinOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			startTime: z.lazy(() => SortOrderSchema).optional(),
			endTime: z.lazy(() => SortOrderSchema).optional(),
			description: z.lazy(() => SortOrderSchema).optional(),
			status: z.lazy(() => SortOrderSchema).optional(),
			createdAt: z.lazy(() => SortOrderSchema).optional(),
			updatedAt: z.lazy(() => SortOrderSchema).optional(),
			patientId: z.lazy(() => SortOrderSchema).optional(),
			memberId: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const EnumAppointmentStatusWithAggregatesFilterSchema: z.ZodType<Prisma.EnumAppointmentStatusWithAggregatesFilter> =
	z
		.object({
			equals: z.lazy(() => AppointmentStatusSchema).optional(),
			in: z
				.lazy(() => AppointmentStatusSchema)
				.array()
				.optional(),
			notIn: z
				.lazy(() => AppointmentStatusSchema)
				.array()
				.optional(),
			not: z
				.union([
					z.lazy(() => AppointmentStatusSchema),
					z.lazy(() => NestedEnumAppointmentStatusWithAggregatesFilterSchema),
				])
				.optional(),
			_count: z.lazy(() => NestedIntFilterSchema).optional(),
			_min: z.lazy(() => NestedEnumAppointmentStatusFilterSchema).optional(),
			_max: z.lazy(() => NestedEnumAppointmentStatusFilterSchema).optional(),
		})
		.strict();

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z
	.object({
		equals: z.boolean().optional(),
		not: z
			.union([z.boolean(), z.lazy(() => NestedBoolFilterSchema)])
			.optional(),
	})
	.strict();

export const PatientListRelationFilterSchema: z.ZodType<Prisma.PatientListRelationFilter> =
	z
		.object({
			every: z.lazy(() => PatientWhereInputSchema).optional(),
			some: z.lazy(() => PatientWhereInputSchema).optional(),
			none: z.lazy(() => PatientWhereInputSchema).optional(),
		})
		.strict();

export const PatientOrderByRelationAggregateInputSchema: z.ZodType<Prisma.PatientOrderByRelationAggregateInput> =
	z
		.object({
			_count: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const OrganizationCountOrderByAggregateInputSchema: z.ZodType<Prisma.OrganizationCountOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			name: z.lazy(() => SortOrderSchema).optional(),
			slug: z.lazy(() => SortOrderSchema).optional(),
			domain: z.lazy(() => SortOrderSchema).optional(),
			shouldAttachUsersByDomain: z.lazy(() => SortOrderSchema).optional(),
			avatarUrl: z.lazy(() => SortOrderSchema).optional(),
			createdAt: z.lazy(() => SortOrderSchema).optional(),
			updatedAt: z.lazy(() => SortOrderSchema).optional(),
			ownerId: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const OrganizationMaxOrderByAggregateInputSchema: z.ZodType<Prisma.OrganizationMaxOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			name: z.lazy(() => SortOrderSchema).optional(),
			slug: z.lazy(() => SortOrderSchema).optional(),
			domain: z.lazy(() => SortOrderSchema).optional(),
			shouldAttachUsersByDomain: z.lazy(() => SortOrderSchema).optional(),
			avatarUrl: z.lazy(() => SortOrderSchema).optional(),
			createdAt: z.lazy(() => SortOrderSchema).optional(),
			updatedAt: z.lazy(() => SortOrderSchema).optional(),
			ownerId: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const OrganizationMinOrderByAggregateInputSchema: z.ZodType<Prisma.OrganizationMinOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			name: z.lazy(() => SortOrderSchema).optional(),
			slug: z.lazy(() => SortOrderSchema).optional(),
			domain: z.lazy(() => SortOrderSchema).optional(),
			shouldAttachUsersByDomain: z.lazy(() => SortOrderSchema).optional(),
			avatarUrl: z.lazy(() => SortOrderSchema).optional(),
			createdAt: z.lazy(() => SortOrderSchema).optional(),
			updatedAt: z.lazy(() => SortOrderSchema).optional(),
			ownerId: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> =
	z
		.object({
			equals: z.boolean().optional(),
			not: z
				.union([
					z.boolean(),
					z.lazy(() => NestedBoolWithAggregatesFilterSchema),
				])
				.optional(),
			_count: z.lazy(() => NestedIntFilterSchema).optional(),
			_min: z.lazy(() => NestedBoolFilterSchema).optional(),
			_max: z.lazy(() => NestedBoolFilterSchema).optional(),
		})
		.strict();

export const TokenCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.TokenCreateNestedManyWithoutUserInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => TokenCreateWithoutUserInputSchema),
					z.lazy(() => TokenCreateWithoutUserInputSchema).array(),
					z.lazy(() => TokenUncheckedCreateWithoutUserInputSchema),
					z.lazy(() => TokenUncheckedCreateWithoutUserInputSchema).array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => TokenCreateOrConnectWithoutUserInputSchema),
					z.lazy(() => TokenCreateOrConnectWithoutUserInputSchema).array(),
				])
				.optional(),
			createMany: z
				.lazy(() => TokenCreateManyUserInputEnvelopeSchema)
				.optional(),
			connect: z
				.union([
					z.lazy(() => TokenWhereUniqueInputSchema),
					z.lazy(() => TokenWhereUniqueInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const AccountCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateNestedManyWithoutUserInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => AccountCreateWithoutUserInputSchema),
					z.lazy(() => AccountCreateWithoutUserInputSchema).array(),
					z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),
					z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),
					z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array(),
				])
				.optional(),
			createMany: z
				.lazy(() => AccountCreateManyUserInputEnvelopeSchema)
				.optional(),
			connect: z
				.union([
					z.lazy(() => AccountWhereUniqueInputSchema),
					z.lazy(() => AccountWhereUniqueInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const InviteCreateNestedManyWithoutAuthorInputSchema: z.ZodType<Prisma.InviteCreateNestedManyWithoutAuthorInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => InviteCreateWithoutAuthorInputSchema),
					z.lazy(() => InviteCreateWithoutAuthorInputSchema).array(),
					z.lazy(() => InviteUncheckedCreateWithoutAuthorInputSchema),
					z.lazy(() => InviteUncheckedCreateWithoutAuthorInputSchema).array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => InviteCreateOrConnectWithoutAuthorInputSchema),
					z.lazy(() => InviteCreateOrConnectWithoutAuthorInputSchema).array(),
				])
				.optional(),
			createMany: z
				.lazy(() => InviteCreateManyAuthorInputEnvelopeSchema)
				.optional(),
			connect: z
				.union([
					z.lazy(() => InviteWhereUniqueInputSchema),
					z.lazy(() => InviteWhereUniqueInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const MemberCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.MemberCreateNestedManyWithoutUserInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => MemberCreateWithoutUserInputSchema),
					z.lazy(() => MemberCreateWithoutUserInputSchema).array(),
					z.lazy(() => MemberUncheckedCreateWithoutUserInputSchema),
					z.lazy(() => MemberUncheckedCreateWithoutUserInputSchema).array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => MemberCreateOrConnectWithoutUserInputSchema),
					z.lazy(() => MemberCreateOrConnectWithoutUserInputSchema).array(),
				])
				.optional(),
			createMany: z
				.lazy(() => MemberCreateManyUserInputEnvelopeSchema)
				.optional(),
			connect: z
				.union([
					z.lazy(() => MemberWhereUniqueInputSchema),
					z.lazy(() => MemberWhereUniqueInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const OrganizationCreateNestedManyWithoutOwnerInputSchema: z.ZodType<Prisma.OrganizationCreateNestedManyWithoutOwnerInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => OrganizationCreateWithoutOwnerInputSchema),
					z.lazy(() => OrganizationCreateWithoutOwnerInputSchema).array(),
					z.lazy(() => OrganizationUncheckedCreateWithoutOwnerInputSchema),
					z
						.lazy(() => OrganizationUncheckedCreateWithoutOwnerInputSchema)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => OrganizationCreateOrConnectWithoutOwnerInputSchema),
					z
						.lazy(() => OrganizationCreateOrConnectWithoutOwnerInputSchema)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => OrganizationCreateManyOwnerInputEnvelopeSchema)
				.optional(),
			connect: z
				.union([
					z.lazy(() => OrganizationWhereUniqueInputSchema),
					z.lazy(() => OrganizationWhereUniqueInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const TokenUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.TokenUncheckedCreateNestedManyWithoutUserInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => TokenCreateWithoutUserInputSchema),
					z.lazy(() => TokenCreateWithoutUserInputSchema).array(),
					z.lazy(() => TokenUncheckedCreateWithoutUserInputSchema),
					z.lazy(() => TokenUncheckedCreateWithoutUserInputSchema).array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => TokenCreateOrConnectWithoutUserInputSchema),
					z.lazy(() => TokenCreateOrConnectWithoutUserInputSchema).array(),
				])
				.optional(),
			createMany: z
				.lazy(() => TokenCreateManyUserInputEnvelopeSchema)
				.optional(),
			connect: z
				.union([
					z.lazy(() => TokenWhereUniqueInputSchema),
					z.lazy(() => TokenWhereUniqueInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const AccountUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedCreateNestedManyWithoutUserInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => AccountCreateWithoutUserInputSchema),
					z.lazy(() => AccountCreateWithoutUserInputSchema).array(),
					z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),
					z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),
					z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array(),
				])
				.optional(),
			createMany: z
				.lazy(() => AccountCreateManyUserInputEnvelopeSchema)
				.optional(),
			connect: z
				.union([
					z.lazy(() => AccountWhereUniqueInputSchema),
					z.lazy(() => AccountWhereUniqueInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const InviteUncheckedCreateNestedManyWithoutAuthorInputSchema: z.ZodType<Prisma.InviteUncheckedCreateNestedManyWithoutAuthorInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => InviteCreateWithoutAuthorInputSchema),
					z.lazy(() => InviteCreateWithoutAuthorInputSchema).array(),
					z.lazy(() => InviteUncheckedCreateWithoutAuthorInputSchema),
					z.lazy(() => InviteUncheckedCreateWithoutAuthorInputSchema).array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => InviteCreateOrConnectWithoutAuthorInputSchema),
					z.lazy(() => InviteCreateOrConnectWithoutAuthorInputSchema).array(),
				])
				.optional(),
			createMany: z
				.lazy(() => InviteCreateManyAuthorInputEnvelopeSchema)
				.optional(),
			connect: z
				.union([
					z.lazy(() => InviteWhereUniqueInputSchema),
					z.lazy(() => InviteWhereUniqueInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const MemberUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.MemberUncheckedCreateNestedManyWithoutUserInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => MemberCreateWithoutUserInputSchema),
					z.lazy(() => MemberCreateWithoutUserInputSchema).array(),
					z.lazy(() => MemberUncheckedCreateWithoutUserInputSchema),
					z.lazy(() => MemberUncheckedCreateWithoutUserInputSchema).array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => MemberCreateOrConnectWithoutUserInputSchema),
					z.lazy(() => MemberCreateOrConnectWithoutUserInputSchema).array(),
				])
				.optional(),
			createMany: z
				.lazy(() => MemberCreateManyUserInputEnvelopeSchema)
				.optional(),
			connect: z
				.union([
					z.lazy(() => MemberWhereUniqueInputSchema),
					z.lazy(() => MemberWhereUniqueInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const OrganizationUncheckedCreateNestedManyWithoutOwnerInputSchema: z.ZodType<Prisma.OrganizationUncheckedCreateNestedManyWithoutOwnerInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => OrganizationCreateWithoutOwnerInputSchema),
					z.lazy(() => OrganizationCreateWithoutOwnerInputSchema).array(),
					z.lazy(() => OrganizationUncheckedCreateWithoutOwnerInputSchema),
					z
						.lazy(() => OrganizationUncheckedCreateWithoutOwnerInputSchema)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => OrganizationCreateOrConnectWithoutOwnerInputSchema),
					z
						.lazy(() => OrganizationCreateOrConnectWithoutOwnerInputSchema)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => OrganizationCreateManyOwnerInputEnvelopeSchema)
				.optional(),
			connect: z
				.union([
					z.lazy(() => OrganizationWhereUniqueInputSchema),
					z.lazy(() => OrganizationWhereUniqueInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> =
	z
		.object({
			set: z.string().optional(),
		})
		.strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> =
	z
		.object({
			set: z.string().optional().nullable(),
		})
		.strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> =
	z
		.object({
			set: z.coerce.date().optional(),
		})
		.strict();

export const TokenUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.TokenUpdateManyWithoutUserNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => TokenCreateWithoutUserInputSchema),
					z.lazy(() => TokenCreateWithoutUserInputSchema).array(),
					z.lazy(() => TokenUncheckedCreateWithoutUserInputSchema),
					z.lazy(() => TokenUncheckedCreateWithoutUserInputSchema).array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => TokenCreateOrConnectWithoutUserInputSchema),
					z.lazy(() => TokenCreateOrConnectWithoutUserInputSchema).array(),
				])
				.optional(),
			upsert: z
				.union([
					z.lazy(() => TokenUpsertWithWhereUniqueWithoutUserInputSchema),
					z
						.lazy(() => TokenUpsertWithWhereUniqueWithoutUserInputSchema)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => TokenCreateManyUserInputEnvelopeSchema)
				.optional(),
			set: z
				.union([
					z.lazy(() => TokenWhereUniqueInputSchema),
					z.lazy(() => TokenWhereUniqueInputSchema).array(),
				])
				.optional(),
			disconnect: z
				.union([
					z.lazy(() => TokenWhereUniqueInputSchema),
					z.lazy(() => TokenWhereUniqueInputSchema).array(),
				])
				.optional(),
			delete: z
				.union([
					z.lazy(() => TokenWhereUniqueInputSchema),
					z.lazy(() => TokenWhereUniqueInputSchema).array(),
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => TokenWhereUniqueInputSchema),
					z.lazy(() => TokenWhereUniqueInputSchema).array(),
				])
				.optional(),
			update: z
				.union([
					z.lazy(() => TokenUpdateWithWhereUniqueWithoutUserInputSchema),
					z
						.lazy(() => TokenUpdateWithWhereUniqueWithoutUserInputSchema)
						.array(),
				])
				.optional(),
			updateMany: z
				.union([
					z.lazy(() => TokenUpdateManyWithWhereWithoutUserInputSchema),
					z.lazy(() => TokenUpdateManyWithWhereWithoutUserInputSchema).array(),
				])
				.optional(),
			deleteMany: z
				.union([
					z.lazy(() => TokenScalarWhereInputSchema),
					z.lazy(() => TokenScalarWhereInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const AccountUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AccountUpdateManyWithoutUserNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => AccountCreateWithoutUserInputSchema),
					z.lazy(() => AccountCreateWithoutUserInputSchema).array(),
					z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),
					z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),
					z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array(),
				])
				.optional(),
			upsert: z
				.union([
					z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema),
					z
						.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => AccountCreateManyUserInputEnvelopeSchema)
				.optional(),
			set: z
				.union([
					z.lazy(() => AccountWhereUniqueInputSchema),
					z.lazy(() => AccountWhereUniqueInputSchema).array(),
				])
				.optional(),
			disconnect: z
				.union([
					z.lazy(() => AccountWhereUniqueInputSchema),
					z.lazy(() => AccountWhereUniqueInputSchema).array(),
				])
				.optional(),
			delete: z
				.union([
					z.lazy(() => AccountWhereUniqueInputSchema),
					z.lazy(() => AccountWhereUniqueInputSchema).array(),
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => AccountWhereUniqueInputSchema),
					z.lazy(() => AccountWhereUniqueInputSchema).array(),
				])
				.optional(),
			update: z
				.union([
					z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema),
					z
						.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema)
						.array(),
				])
				.optional(),
			updateMany: z
				.union([
					z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema),
					z
						.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema)
						.array(),
				])
				.optional(),
			deleteMany: z
				.union([
					z.lazy(() => AccountScalarWhereInputSchema),
					z.lazy(() => AccountScalarWhereInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const InviteUpdateManyWithoutAuthorNestedInputSchema: z.ZodType<Prisma.InviteUpdateManyWithoutAuthorNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => InviteCreateWithoutAuthorInputSchema),
					z.lazy(() => InviteCreateWithoutAuthorInputSchema).array(),
					z.lazy(() => InviteUncheckedCreateWithoutAuthorInputSchema),
					z.lazy(() => InviteUncheckedCreateWithoutAuthorInputSchema).array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => InviteCreateOrConnectWithoutAuthorInputSchema),
					z.lazy(() => InviteCreateOrConnectWithoutAuthorInputSchema).array(),
				])
				.optional(),
			upsert: z
				.union([
					z.lazy(() => InviteUpsertWithWhereUniqueWithoutAuthorInputSchema),
					z
						.lazy(() => InviteUpsertWithWhereUniqueWithoutAuthorInputSchema)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => InviteCreateManyAuthorInputEnvelopeSchema)
				.optional(),
			set: z
				.union([
					z.lazy(() => InviteWhereUniqueInputSchema),
					z.lazy(() => InviteWhereUniqueInputSchema).array(),
				])
				.optional(),
			disconnect: z
				.union([
					z.lazy(() => InviteWhereUniqueInputSchema),
					z.lazy(() => InviteWhereUniqueInputSchema).array(),
				])
				.optional(),
			delete: z
				.union([
					z.lazy(() => InviteWhereUniqueInputSchema),
					z.lazy(() => InviteWhereUniqueInputSchema).array(),
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => InviteWhereUniqueInputSchema),
					z.lazy(() => InviteWhereUniqueInputSchema).array(),
				])
				.optional(),
			update: z
				.union([
					z.lazy(() => InviteUpdateWithWhereUniqueWithoutAuthorInputSchema),
					z
						.lazy(() => InviteUpdateWithWhereUniqueWithoutAuthorInputSchema)
						.array(),
				])
				.optional(),
			updateMany: z
				.union([
					z.lazy(() => InviteUpdateManyWithWhereWithoutAuthorInputSchema),
					z
						.lazy(() => InviteUpdateManyWithWhereWithoutAuthorInputSchema)
						.array(),
				])
				.optional(),
			deleteMany: z
				.union([
					z.lazy(() => InviteScalarWhereInputSchema),
					z.lazy(() => InviteScalarWhereInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const MemberUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.MemberUpdateManyWithoutUserNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => MemberCreateWithoutUserInputSchema),
					z.lazy(() => MemberCreateWithoutUserInputSchema).array(),
					z.lazy(() => MemberUncheckedCreateWithoutUserInputSchema),
					z.lazy(() => MemberUncheckedCreateWithoutUserInputSchema).array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => MemberCreateOrConnectWithoutUserInputSchema),
					z.lazy(() => MemberCreateOrConnectWithoutUserInputSchema).array(),
				])
				.optional(),
			upsert: z
				.union([
					z.lazy(() => MemberUpsertWithWhereUniqueWithoutUserInputSchema),
					z
						.lazy(() => MemberUpsertWithWhereUniqueWithoutUserInputSchema)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => MemberCreateManyUserInputEnvelopeSchema)
				.optional(),
			set: z
				.union([
					z.lazy(() => MemberWhereUniqueInputSchema),
					z.lazy(() => MemberWhereUniqueInputSchema).array(),
				])
				.optional(),
			disconnect: z
				.union([
					z.lazy(() => MemberWhereUniqueInputSchema),
					z.lazy(() => MemberWhereUniqueInputSchema).array(),
				])
				.optional(),
			delete: z
				.union([
					z.lazy(() => MemberWhereUniqueInputSchema),
					z.lazy(() => MemberWhereUniqueInputSchema).array(),
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => MemberWhereUniqueInputSchema),
					z.lazy(() => MemberWhereUniqueInputSchema).array(),
				])
				.optional(),
			update: z
				.union([
					z.lazy(() => MemberUpdateWithWhereUniqueWithoutUserInputSchema),
					z
						.lazy(() => MemberUpdateWithWhereUniqueWithoutUserInputSchema)
						.array(),
				])
				.optional(),
			updateMany: z
				.union([
					z.lazy(() => MemberUpdateManyWithWhereWithoutUserInputSchema),
					z.lazy(() => MemberUpdateManyWithWhereWithoutUserInputSchema).array(),
				])
				.optional(),
			deleteMany: z
				.union([
					z.lazy(() => MemberScalarWhereInputSchema),
					z.lazy(() => MemberScalarWhereInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const OrganizationUpdateManyWithoutOwnerNestedInputSchema: z.ZodType<Prisma.OrganizationUpdateManyWithoutOwnerNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => OrganizationCreateWithoutOwnerInputSchema),
					z.lazy(() => OrganizationCreateWithoutOwnerInputSchema).array(),
					z.lazy(() => OrganizationUncheckedCreateWithoutOwnerInputSchema),
					z
						.lazy(() => OrganizationUncheckedCreateWithoutOwnerInputSchema)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => OrganizationCreateOrConnectWithoutOwnerInputSchema),
					z
						.lazy(() => OrganizationCreateOrConnectWithoutOwnerInputSchema)
						.array(),
				])
				.optional(),
			upsert: z
				.union([
					z.lazy(
						() => OrganizationUpsertWithWhereUniqueWithoutOwnerInputSchema,
					),
					z
						.lazy(
							() => OrganizationUpsertWithWhereUniqueWithoutOwnerInputSchema,
						)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => OrganizationCreateManyOwnerInputEnvelopeSchema)
				.optional(),
			set: z
				.union([
					z.lazy(() => OrganizationWhereUniqueInputSchema),
					z.lazy(() => OrganizationWhereUniqueInputSchema).array(),
				])
				.optional(),
			disconnect: z
				.union([
					z.lazy(() => OrganizationWhereUniqueInputSchema),
					z.lazy(() => OrganizationWhereUniqueInputSchema).array(),
				])
				.optional(),
			delete: z
				.union([
					z.lazy(() => OrganizationWhereUniqueInputSchema),
					z.lazy(() => OrganizationWhereUniqueInputSchema).array(),
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => OrganizationWhereUniqueInputSchema),
					z.lazy(() => OrganizationWhereUniqueInputSchema).array(),
				])
				.optional(),
			update: z
				.union([
					z.lazy(
						() => OrganizationUpdateWithWhereUniqueWithoutOwnerInputSchema,
					),
					z
						.lazy(
							() => OrganizationUpdateWithWhereUniqueWithoutOwnerInputSchema,
						)
						.array(),
				])
				.optional(),
			updateMany: z
				.union([
					z.lazy(() => OrganizationUpdateManyWithWhereWithoutOwnerInputSchema),
					z
						.lazy(() => OrganizationUpdateManyWithWhereWithoutOwnerInputSchema)
						.array(),
				])
				.optional(),
			deleteMany: z
				.union([
					z.lazy(() => OrganizationScalarWhereInputSchema),
					z.lazy(() => OrganizationScalarWhereInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const TokenUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.TokenUncheckedUpdateManyWithoutUserNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => TokenCreateWithoutUserInputSchema),
					z.lazy(() => TokenCreateWithoutUserInputSchema).array(),
					z.lazy(() => TokenUncheckedCreateWithoutUserInputSchema),
					z.lazy(() => TokenUncheckedCreateWithoutUserInputSchema).array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => TokenCreateOrConnectWithoutUserInputSchema),
					z.lazy(() => TokenCreateOrConnectWithoutUserInputSchema).array(),
				])
				.optional(),
			upsert: z
				.union([
					z.lazy(() => TokenUpsertWithWhereUniqueWithoutUserInputSchema),
					z
						.lazy(() => TokenUpsertWithWhereUniqueWithoutUserInputSchema)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => TokenCreateManyUserInputEnvelopeSchema)
				.optional(),
			set: z
				.union([
					z.lazy(() => TokenWhereUniqueInputSchema),
					z.lazy(() => TokenWhereUniqueInputSchema).array(),
				])
				.optional(),
			disconnect: z
				.union([
					z.lazy(() => TokenWhereUniqueInputSchema),
					z.lazy(() => TokenWhereUniqueInputSchema).array(),
				])
				.optional(),
			delete: z
				.union([
					z.lazy(() => TokenWhereUniqueInputSchema),
					z.lazy(() => TokenWhereUniqueInputSchema).array(),
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => TokenWhereUniqueInputSchema),
					z.lazy(() => TokenWhereUniqueInputSchema).array(),
				])
				.optional(),
			update: z
				.union([
					z.lazy(() => TokenUpdateWithWhereUniqueWithoutUserInputSchema),
					z
						.lazy(() => TokenUpdateWithWhereUniqueWithoutUserInputSchema)
						.array(),
				])
				.optional(),
			updateMany: z
				.union([
					z.lazy(() => TokenUpdateManyWithWhereWithoutUserInputSchema),
					z.lazy(() => TokenUpdateManyWithWhereWithoutUserInputSchema).array(),
				])
				.optional(),
			deleteMany: z
				.union([
					z.lazy(() => TokenScalarWhereInputSchema),
					z.lazy(() => TokenScalarWhereInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const AccountUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyWithoutUserNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => AccountCreateWithoutUserInputSchema),
					z.lazy(() => AccountCreateWithoutUserInputSchema).array(),
					z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),
					z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),
					z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array(),
				])
				.optional(),
			upsert: z
				.union([
					z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema),
					z
						.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => AccountCreateManyUserInputEnvelopeSchema)
				.optional(),
			set: z
				.union([
					z.lazy(() => AccountWhereUniqueInputSchema),
					z.lazy(() => AccountWhereUniqueInputSchema).array(),
				])
				.optional(),
			disconnect: z
				.union([
					z.lazy(() => AccountWhereUniqueInputSchema),
					z.lazy(() => AccountWhereUniqueInputSchema).array(),
				])
				.optional(),
			delete: z
				.union([
					z.lazy(() => AccountWhereUniqueInputSchema),
					z.lazy(() => AccountWhereUniqueInputSchema).array(),
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => AccountWhereUniqueInputSchema),
					z.lazy(() => AccountWhereUniqueInputSchema).array(),
				])
				.optional(),
			update: z
				.union([
					z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema),
					z
						.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema)
						.array(),
				])
				.optional(),
			updateMany: z
				.union([
					z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema),
					z
						.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema)
						.array(),
				])
				.optional(),
			deleteMany: z
				.union([
					z.lazy(() => AccountScalarWhereInputSchema),
					z.lazy(() => AccountScalarWhereInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const InviteUncheckedUpdateManyWithoutAuthorNestedInputSchema: z.ZodType<Prisma.InviteUncheckedUpdateManyWithoutAuthorNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => InviteCreateWithoutAuthorInputSchema),
					z.lazy(() => InviteCreateWithoutAuthorInputSchema).array(),
					z.lazy(() => InviteUncheckedCreateWithoutAuthorInputSchema),
					z.lazy(() => InviteUncheckedCreateWithoutAuthorInputSchema).array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => InviteCreateOrConnectWithoutAuthorInputSchema),
					z.lazy(() => InviteCreateOrConnectWithoutAuthorInputSchema).array(),
				])
				.optional(),
			upsert: z
				.union([
					z.lazy(() => InviteUpsertWithWhereUniqueWithoutAuthorInputSchema),
					z
						.lazy(() => InviteUpsertWithWhereUniqueWithoutAuthorInputSchema)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => InviteCreateManyAuthorInputEnvelopeSchema)
				.optional(),
			set: z
				.union([
					z.lazy(() => InviteWhereUniqueInputSchema),
					z.lazy(() => InviteWhereUniqueInputSchema).array(),
				])
				.optional(),
			disconnect: z
				.union([
					z.lazy(() => InviteWhereUniqueInputSchema),
					z.lazy(() => InviteWhereUniqueInputSchema).array(),
				])
				.optional(),
			delete: z
				.union([
					z.lazy(() => InviteWhereUniqueInputSchema),
					z.lazy(() => InviteWhereUniqueInputSchema).array(),
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => InviteWhereUniqueInputSchema),
					z.lazy(() => InviteWhereUniqueInputSchema).array(),
				])
				.optional(),
			update: z
				.union([
					z.lazy(() => InviteUpdateWithWhereUniqueWithoutAuthorInputSchema),
					z
						.lazy(() => InviteUpdateWithWhereUniqueWithoutAuthorInputSchema)
						.array(),
				])
				.optional(),
			updateMany: z
				.union([
					z.lazy(() => InviteUpdateManyWithWhereWithoutAuthorInputSchema),
					z
						.lazy(() => InviteUpdateManyWithWhereWithoutAuthorInputSchema)
						.array(),
				])
				.optional(),
			deleteMany: z
				.union([
					z.lazy(() => InviteScalarWhereInputSchema),
					z.lazy(() => InviteScalarWhereInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const MemberUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.MemberUncheckedUpdateManyWithoutUserNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => MemberCreateWithoutUserInputSchema),
					z.lazy(() => MemberCreateWithoutUserInputSchema).array(),
					z.lazy(() => MemberUncheckedCreateWithoutUserInputSchema),
					z.lazy(() => MemberUncheckedCreateWithoutUserInputSchema).array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => MemberCreateOrConnectWithoutUserInputSchema),
					z.lazy(() => MemberCreateOrConnectWithoutUserInputSchema).array(),
				])
				.optional(),
			upsert: z
				.union([
					z.lazy(() => MemberUpsertWithWhereUniqueWithoutUserInputSchema),
					z
						.lazy(() => MemberUpsertWithWhereUniqueWithoutUserInputSchema)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => MemberCreateManyUserInputEnvelopeSchema)
				.optional(),
			set: z
				.union([
					z.lazy(() => MemberWhereUniqueInputSchema),
					z.lazy(() => MemberWhereUniqueInputSchema).array(),
				])
				.optional(),
			disconnect: z
				.union([
					z.lazy(() => MemberWhereUniqueInputSchema),
					z.lazy(() => MemberWhereUniqueInputSchema).array(),
				])
				.optional(),
			delete: z
				.union([
					z.lazy(() => MemberWhereUniqueInputSchema),
					z.lazy(() => MemberWhereUniqueInputSchema).array(),
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => MemberWhereUniqueInputSchema),
					z.lazy(() => MemberWhereUniqueInputSchema).array(),
				])
				.optional(),
			update: z
				.union([
					z.lazy(() => MemberUpdateWithWhereUniqueWithoutUserInputSchema),
					z
						.lazy(() => MemberUpdateWithWhereUniqueWithoutUserInputSchema)
						.array(),
				])
				.optional(),
			updateMany: z
				.union([
					z.lazy(() => MemberUpdateManyWithWhereWithoutUserInputSchema),
					z.lazy(() => MemberUpdateManyWithWhereWithoutUserInputSchema).array(),
				])
				.optional(),
			deleteMany: z
				.union([
					z.lazy(() => MemberScalarWhereInputSchema),
					z.lazy(() => MemberScalarWhereInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const OrganizationUncheckedUpdateManyWithoutOwnerNestedInputSchema: z.ZodType<Prisma.OrganizationUncheckedUpdateManyWithoutOwnerNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => OrganizationCreateWithoutOwnerInputSchema),
					z.lazy(() => OrganizationCreateWithoutOwnerInputSchema).array(),
					z.lazy(() => OrganizationUncheckedCreateWithoutOwnerInputSchema),
					z
						.lazy(() => OrganizationUncheckedCreateWithoutOwnerInputSchema)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => OrganizationCreateOrConnectWithoutOwnerInputSchema),
					z
						.lazy(() => OrganizationCreateOrConnectWithoutOwnerInputSchema)
						.array(),
				])
				.optional(),
			upsert: z
				.union([
					z.lazy(
						() => OrganizationUpsertWithWhereUniqueWithoutOwnerInputSchema,
					),
					z
						.lazy(
							() => OrganizationUpsertWithWhereUniqueWithoutOwnerInputSchema,
						)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => OrganizationCreateManyOwnerInputEnvelopeSchema)
				.optional(),
			set: z
				.union([
					z.lazy(() => OrganizationWhereUniqueInputSchema),
					z.lazy(() => OrganizationWhereUniqueInputSchema).array(),
				])
				.optional(),
			disconnect: z
				.union([
					z.lazy(() => OrganizationWhereUniqueInputSchema),
					z.lazy(() => OrganizationWhereUniqueInputSchema).array(),
				])
				.optional(),
			delete: z
				.union([
					z.lazy(() => OrganizationWhereUniqueInputSchema),
					z.lazy(() => OrganizationWhereUniqueInputSchema).array(),
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => OrganizationWhereUniqueInputSchema),
					z.lazy(() => OrganizationWhereUniqueInputSchema).array(),
				])
				.optional(),
			update: z
				.union([
					z.lazy(
						() => OrganizationUpdateWithWhereUniqueWithoutOwnerInputSchema,
					),
					z
						.lazy(
							() => OrganizationUpdateWithWhereUniqueWithoutOwnerInputSchema,
						)
						.array(),
				])
				.optional(),
			updateMany: z
				.union([
					z.lazy(() => OrganizationUpdateManyWithWhereWithoutOwnerInputSchema),
					z
						.lazy(() => OrganizationUpdateManyWithWhereWithoutOwnerInputSchema)
						.array(),
				])
				.optional(),
			deleteMany: z
				.union([
					z.lazy(() => OrganizationScalarWhereInputSchema),
					z.lazy(() => OrganizationScalarWhereInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const UserCreateNestedOneWithoutTokensInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutTokensInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => UserCreateWithoutTokensInputSchema),
					z.lazy(() => UserUncheckedCreateWithoutTokensInputSchema),
				])
				.optional(),
			connectOrCreate: z
				.lazy(() => UserCreateOrConnectWithoutTokensInputSchema)
				.optional(),
			connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
		})
		.strict();

export const EnumTokenTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumTokenTypeFieldUpdateOperationsInput> =
	z
		.object({
			set: z.lazy(() => TokenTypeSchema).optional(),
		})
		.strict();

export const UserUpdateOneRequiredWithoutTokensNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutTokensNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => UserCreateWithoutTokensInputSchema),
					z.lazy(() => UserUncheckedCreateWithoutTokensInputSchema),
				])
				.optional(),
			connectOrCreate: z
				.lazy(() => UserCreateOrConnectWithoutTokensInputSchema)
				.optional(),
			upsert: z.lazy(() => UserUpsertWithoutTokensInputSchema).optional(),
			connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
			update: z
				.union([
					z.lazy(() => UserUpdateToOneWithWhereWithoutTokensInputSchema),
					z.lazy(() => UserUpdateWithoutTokensInputSchema),
					z.lazy(() => UserUncheckedUpdateWithoutTokensInputSchema),
				])
				.optional(),
		})
		.strict();

export const UserCreateNestedOneWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutAccountsInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => UserCreateWithoutAccountsInputSchema),
					z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema),
				])
				.optional(),
			connectOrCreate: z
				.lazy(() => UserCreateOrConnectWithoutAccountsInputSchema)
				.optional(),
			connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
		})
		.strict();

export const EnumAccountProviderFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumAccountProviderFieldUpdateOperationsInput> =
	z
		.object({
			set: z.lazy(() => AccountProviderSchema).optional(),
		})
		.strict();

export const UserUpdateOneRequiredWithoutAccountsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutAccountsNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => UserCreateWithoutAccountsInputSchema),
					z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema),
				])
				.optional(),
			connectOrCreate: z
				.lazy(() => UserCreateOrConnectWithoutAccountsInputSchema)
				.optional(),
			upsert: z.lazy(() => UserUpsertWithoutAccountsInputSchema).optional(),
			connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
			update: z
				.union([
					z.lazy(() => UserUpdateToOneWithWhereWithoutAccountsInputSchema),
					z.lazy(() => UserUpdateWithoutAccountsInputSchema),
					z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema),
				])
				.optional(),
		})
		.strict();

export const UserCreateNestedOneWithoutInvitesInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutInvitesInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => UserCreateWithoutInvitesInputSchema),
					z.lazy(() => UserUncheckedCreateWithoutInvitesInputSchema),
				])
				.optional(),
			connectOrCreate: z
				.lazy(() => UserCreateOrConnectWithoutInvitesInputSchema)
				.optional(),
			connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
		})
		.strict();

export const OrganizationCreateNestedOneWithoutInvitesInputSchema: z.ZodType<Prisma.OrganizationCreateNestedOneWithoutInvitesInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => OrganizationCreateWithoutInvitesInputSchema),
					z.lazy(() => OrganizationUncheckedCreateWithoutInvitesInputSchema),
				])
				.optional(),
			connectOrCreate: z
				.lazy(() => OrganizationCreateOrConnectWithoutInvitesInputSchema)
				.optional(),
			connect: z.lazy(() => OrganizationWhereUniqueInputSchema).optional(),
		})
		.strict();

export const EnumRoleFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumRoleFieldUpdateOperationsInput> =
	z
		.object({
			set: z.lazy(() => RoleSchema).optional(),
		})
		.strict();

export const UserUpdateOneWithoutInvitesNestedInputSchema: z.ZodType<Prisma.UserUpdateOneWithoutInvitesNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => UserCreateWithoutInvitesInputSchema),
					z.lazy(() => UserUncheckedCreateWithoutInvitesInputSchema),
				])
				.optional(),
			connectOrCreate: z
				.lazy(() => UserCreateOrConnectWithoutInvitesInputSchema)
				.optional(),
			upsert: z.lazy(() => UserUpsertWithoutInvitesInputSchema).optional(),
			disconnect: z
				.union([z.boolean(), z.lazy(() => UserWhereInputSchema)])
				.optional(),
			delete: z
				.union([z.boolean(), z.lazy(() => UserWhereInputSchema)])
				.optional(),
			connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
			update: z
				.union([
					z.lazy(() => UserUpdateToOneWithWhereWithoutInvitesInputSchema),
					z.lazy(() => UserUpdateWithoutInvitesInputSchema),
					z.lazy(() => UserUncheckedUpdateWithoutInvitesInputSchema),
				])
				.optional(),
		})
		.strict();

export const OrganizationUpdateOneRequiredWithoutInvitesNestedInputSchema: z.ZodType<Prisma.OrganizationUpdateOneRequiredWithoutInvitesNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => OrganizationCreateWithoutInvitesInputSchema),
					z.lazy(() => OrganizationUncheckedCreateWithoutInvitesInputSchema),
				])
				.optional(),
			connectOrCreate: z
				.lazy(() => OrganizationCreateOrConnectWithoutInvitesInputSchema)
				.optional(),
			upsert: z
				.lazy(() => OrganizationUpsertWithoutInvitesInputSchema)
				.optional(),
			connect: z.lazy(() => OrganizationWhereUniqueInputSchema).optional(),
			update: z
				.union([
					z.lazy(
						() => OrganizationUpdateToOneWithWhereWithoutInvitesInputSchema,
					),
					z.lazy(() => OrganizationUpdateWithoutInvitesInputSchema),
					z.lazy(() => OrganizationUncheckedUpdateWithoutInvitesInputSchema),
				])
				.optional(),
		})
		.strict();

export const OrganizationCreateNestedOneWithoutMembersInputSchema: z.ZodType<Prisma.OrganizationCreateNestedOneWithoutMembersInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => OrganizationCreateWithoutMembersInputSchema),
					z.lazy(() => OrganizationUncheckedCreateWithoutMembersInputSchema),
				])
				.optional(),
			connectOrCreate: z
				.lazy(() => OrganizationCreateOrConnectWithoutMembersInputSchema)
				.optional(),
			connect: z.lazy(() => OrganizationWhereUniqueInputSchema).optional(),
		})
		.strict();

export const UserCreateNestedOneWithoutMember_onInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutMember_onInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => UserCreateWithoutMember_onInputSchema),
					z.lazy(() => UserUncheckedCreateWithoutMember_onInputSchema),
				])
				.optional(),
			connectOrCreate: z
				.lazy(() => UserCreateOrConnectWithoutMember_onInputSchema)
				.optional(),
			connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
		})
		.strict();

export const AppointmentCreateNestedManyWithoutMemberInputSchema: z.ZodType<Prisma.AppointmentCreateNestedManyWithoutMemberInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => AppointmentCreateWithoutMemberInputSchema),
					z.lazy(() => AppointmentCreateWithoutMemberInputSchema).array(),
					z.lazy(() => AppointmentUncheckedCreateWithoutMemberInputSchema),
					z
						.lazy(() => AppointmentUncheckedCreateWithoutMemberInputSchema)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => AppointmentCreateOrConnectWithoutMemberInputSchema),
					z
						.lazy(() => AppointmentCreateOrConnectWithoutMemberInputSchema)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => AppointmentCreateManyMemberInputEnvelopeSchema)
				.optional(),
			connect: z
				.union([
					z.lazy(() => AppointmentWhereUniqueInputSchema),
					z.lazy(() => AppointmentWhereUniqueInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const AppointmentUncheckedCreateNestedManyWithoutMemberInputSchema: z.ZodType<Prisma.AppointmentUncheckedCreateNestedManyWithoutMemberInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => AppointmentCreateWithoutMemberInputSchema),
					z.lazy(() => AppointmentCreateWithoutMemberInputSchema).array(),
					z.lazy(() => AppointmentUncheckedCreateWithoutMemberInputSchema),
					z
						.lazy(() => AppointmentUncheckedCreateWithoutMemberInputSchema)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => AppointmentCreateOrConnectWithoutMemberInputSchema),
					z
						.lazy(() => AppointmentCreateOrConnectWithoutMemberInputSchema)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => AppointmentCreateManyMemberInputEnvelopeSchema)
				.optional(),
			connect: z
				.union([
					z.lazy(() => AppointmentWhereUniqueInputSchema),
					z.lazy(() => AppointmentWhereUniqueInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const OrganizationUpdateOneRequiredWithoutMembersNestedInputSchema: z.ZodType<Prisma.OrganizationUpdateOneRequiredWithoutMembersNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => OrganizationCreateWithoutMembersInputSchema),
					z.lazy(() => OrganizationUncheckedCreateWithoutMembersInputSchema),
				])
				.optional(),
			connectOrCreate: z
				.lazy(() => OrganizationCreateOrConnectWithoutMembersInputSchema)
				.optional(),
			upsert: z
				.lazy(() => OrganizationUpsertWithoutMembersInputSchema)
				.optional(),
			connect: z.lazy(() => OrganizationWhereUniqueInputSchema).optional(),
			update: z
				.union([
					z.lazy(
						() => OrganizationUpdateToOneWithWhereWithoutMembersInputSchema,
					),
					z.lazy(() => OrganizationUpdateWithoutMembersInputSchema),
					z.lazy(() => OrganizationUncheckedUpdateWithoutMembersInputSchema),
				])
				.optional(),
		})
		.strict();

export const UserUpdateOneRequiredWithoutMember_onNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutMember_onNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => UserCreateWithoutMember_onInputSchema),
					z.lazy(() => UserUncheckedCreateWithoutMember_onInputSchema),
				])
				.optional(),
			connectOrCreate: z
				.lazy(() => UserCreateOrConnectWithoutMember_onInputSchema)
				.optional(),
			upsert: z.lazy(() => UserUpsertWithoutMember_onInputSchema).optional(),
			connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
			update: z
				.union([
					z.lazy(() => UserUpdateToOneWithWhereWithoutMember_onInputSchema),
					z.lazy(() => UserUpdateWithoutMember_onInputSchema),
					z.lazy(() => UserUncheckedUpdateWithoutMember_onInputSchema),
				])
				.optional(),
		})
		.strict();

export const AppointmentUpdateManyWithoutMemberNestedInputSchema: z.ZodType<Prisma.AppointmentUpdateManyWithoutMemberNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => AppointmentCreateWithoutMemberInputSchema),
					z.lazy(() => AppointmentCreateWithoutMemberInputSchema).array(),
					z.lazy(() => AppointmentUncheckedCreateWithoutMemberInputSchema),
					z
						.lazy(() => AppointmentUncheckedCreateWithoutMemberInputSchema)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => AppointmentCreateOrConnectWithoutMemberInputSchema),
					z
						.lazy(() => AppointmentCreateOrConnectWithoutMemberInputSchema)
						.array(),
				])
				.optional(),
			upsert: z
				.union([
					z.lazy(
						() => AppointmentUpsertWithWhereUniqueWithoutMemberInputSchema,
					),
					z
						.lazy(
							() => AppointmentUpsertWithWhereUniqueWithoutMemberInputSchema,
						)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => AppointmentCreateManyMemberInputEnvelopeSchema)
				.optional(),
			set: z
				.union([
					z.lazy(() => AppointmentWhereUniqueInputSchema),
					z.lazy(() => AppointmentWhereUniqueInputSchema).array(),
				])
				.optional(),
			disconnect: z
				.union([
					z.lazy(() => AppointmentWhereUniqueInputSchema),
					z.lazy(() => AppointmentWhereUniqueInputSchema).array(),
				])
				.optional(),
			delete: z
				.union([
					z.lazy(() => AppointmentWhereUniqueInputSchema),
					z.lazy(() => AppointmentWhereUniqueInputSchema).array(),
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => AppointmentWhereUniqueInputSchema),
					z.lazy(() => AppointmentWhereUniqueInputSchema).array(),
				])
				.optional(),
			update: z
				.union([
					z.lazy(
						() => AppointmentUpdateWithWhereUniqueWithoutMemberInputSchema,
					),
					z
						.lazy(
							() => AppointmentUpdateWithWhereUniqueWithoutMemberInputSchema,
						)
						.array(),
				])
				.optional(),
			updateMany: z
				.union([
					z.lazy(() => AppointmentUpdateManyWithWhereWithoutMemberInputSchema),
					z
						.lazy(() => AppointmentUpdateManyWithWhereWithoutMemberInputSchema)
						.array(),
				])
				.optional(),
			deleteMany: z
				.union([
					z.lazy(() => AppointmentScalarWhereInputSchema),
					z.lazy(() => AppointmentScalarWhereInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const AppointmentUncheckedUpdateManyWithoutMemberNestedInputSchema: z.ZodType<Prisma.AppointmentUncheckedUpdateManyWithoutMemberNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => AppointmentCreateWithoutMemberInputSchema),
					z.lazy(() => AppointmentCreateWithoutMemberInputSchema).array(),
					z.lazy(() => AppointmentUncheckedCreateWithoutMemberInputSchema),
					z
						.lazy(() => AppointmentUncheckedCreateWithoutMemberInputSchema)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => AppointmentCreateOrConnectWithoutMemberInputSchema),
					z
						.lazy(() => AppointmentCreateOrConnectWithoutMemberInputSchema)
						.array(),
				])
				.optional(),
			upsert: z
				.union([
					z.lazy(
						() => AppointmentUpsertWithWhereUniqueWithoutMemberInputSchema,
					),
					z
						.lazy(
							() => AppointmentUpsertWithWhereUniqueWithoutMemberInputSchema,
						)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => AppointmentCreateManyMemberInputEnvelopeSchema)
				.optional(),
			set: z
				.union([
					z.lazy(() => AppointmentWhereUniqueInputSchema),
					z.lazy(() => AppointmentWhereUniqueInputSchema).array(),
				])
				.optional(),
			disconnect: z
				.union([
					z.lazy(() => AppointmentWhereUniqueInputSchema),
					z.lazy(() => AppointmentWhereUniqueInputSchema).array(),
				])
				.optional(),
			delete: z
				.union([
					z.lazy(() => AppointmentWhereUniqueInputSchema),
					z.lazy(() => AppointmentWhereUniqueInputSchema).array(),
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => AppointmentWhereUniqueInputSchema),
					z.lazy(() => AppointmentWhereUniqueInputSchema).array(),
				])
				.optional(),
			update: z
				.union([
					z.lazy(
						() => AppointmentUpdateWithWhereUniqueWithoutMemberInputSchema,
					),
					z
						.lazy(
							() => AppointmentUpdateWithWhereUniqueWithoutMemberInputSchema,
						)
						.array(),
				])
				.optional(),
			updateMany: z
				.union([
					z.lazy(() => AppointmentUpdateManyWithWhereWithoutMemberInputSchema),
					z
						.lazy(() => AppointmentUpdateManyWithWhereWithoutMemberInputSchema)
						.array(),
				])
				.optional(),
			deleteMany: z
				.union([
					z.lazy(() => AppointmentScalarWhereInputSchema),
					z.lazy(() => AppointmentScalarWhereInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const AppointmentCreateNestedManyWithoutPatientInputSchema: z.ZodType<Prisma.AppointmentCreateNestedManyWithoutPatientInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => AppointmentCreateWithoutPatientInputSchema),
					z.lazy(() => AppointmentCreateWithoutPatientInputSchema).array(),
					z.lazy(() => AppointmentUncheckedCreateWithoutPatientInputSchema),
					z
						.lazy(() => AppointmentUncheckedCreateWithoutPatientInputSchema)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => AppointmentCreateOrConnectWithoutPatientInputSchema),
					z
						.lazy(() => AppointmentCreateOrConnectWithoutPatientInputSchema)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => AppointmentCreateManyPatientInputEnvelopeSchema)
				.optional(),
			connect: z
				.union([
					z.lazy(() => AppointmentWhereUniqueInputSchema),
					z.lazy(() => AppointmentWhereUniqueInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const OrganizationCreateNestedOneWithoutPatientsInputSchema: z.ZodType<Prisma.OrganizationCreateNestedOneWithoutPatientsInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => OrganizationCreateWithoutPatientsInputSchema),
					z.lazy(() => OrganizationUncheckedCreateWithoutPatientsInputSchema),
				])
				.optional(),
			connectOrCreate: z
				.lazy(() => OrganizationCreateOrConnectWithoutPatientsInputSchema)
				.optional(),
			connect: z.lazy(() => OrganizationWhereUniqueInputSchema).optional(),
		})
		.strict();

export const AppointmentUncheckedCreateNestedManyWithoutPatientInputSchema: z.ZodType<Prisma.AppointmentUncheckedCreateNestedManyWithoutPatientInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => AppointmentCreateWithoutPatientInputSchema),
					z.lazy(() => AppointmentCreateWithoutPatientInputSchema).array(),
					z.lazy(() => AppointmentUncheckedCreateWithoutPatientInputSchema),
					z
						.lazy(() => AppointmentUncheckedCreateWithoutPatientInputSchema)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => AppointmentCreateOrConnectWithoutPatientInputSchema),
					z
						.lazy(() => AppointmentCreateOrConnectWithoutPatientInputSchema)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => AppointmentCreateManyPatientInputEnvelopeSchema)
				.optional(),
			connect: z
				.union([
					z.lazy(() => AppointmentWhereUniqueInputSchema),
					z.lazy(() => AppointmentWhereUniqueInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const AppointmentUpdateManyWithoutPatientNestedInputSchema: z.ZodType<Prisma.AppointmentUpdateManyWithoutPatientNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => AppointmentCreateWithoutPatientInputSchema),
					z.lazy(() => AppointmentCreateWithoutPatientInputSchema).array(),
					z.lazy(() => AppointmentUncheckedCreateWithoutPatientInputSchema),
					z
						.lazy(() => AppointmentUncheckedCreateWithoutPatientInputSchema)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => AppointmentCreateOrConnectWithoutPatientInputSchema),
					z
						.lazy(() => AppointmentCreateOrConnectWithoutPatientInputSchema)
						.array(),
				])
				.optional(),
			upsert: z
				.union([
					z.lazy(
						() => AppointmentUpsertWithWhereUniqueWithoutPatientInputSchema,
					),
					z
						.lazy(
							() => AppointmentUpsertWithWhereUniqueWithoutPatientInputSchema,
						)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => AppointmentCreateManyPatientInputEnvelopeSchema)
				.optional(),
			set: z
				.union([
					z.lazy(() => AppointmentWhereUniqueInputSchema),
					z.lazy(() => AppointmentWhereUniqueInputSchema).array(),
				])
				.optional(),
			disconnect: z
				.union([
					z.lazy(() => AppointmentWhereUniqueInputSchema),
					z.lazy(() => AppointmentWhereUniqueInputSchema).array(),
				])
				.optional(),
			delete: z
				.union([
					z.lazy(() => AppointmentWhereUniqueInputSchema),
					z.lazy(() => AppointmentWhereUniqueInputSchema).array(),
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => AppointmentWhereUniqueInputSchema),
					z.lazy(() => AppointmentWhereUniqueInputSchema).array(),
				])
				.optional(),
			update: z
				.union([
					z.lazy(
						() => AppointmentUpdateWithWhereUniqueWithoutPatientInputSchema,
					),
					z
						.lazy(
							() => AppointmentUpdateWithWhereUniqueWithoutPatientInputSchema,
						)
						.array(),
				])
				.optional(),
			updateMany: z
				.union([
					z.lazy(() => AppointmentUpdateManyWithWhereWithoutPatientInputSchema),
					z
						.lazy(() => AppointmentUpdateManyWithWhereWithoutPatientInputSchema)
						.array(),
				])
				.optional(),
			deleteMany: z
				.union([
					z.lazy(() => AppointmentScalarWhereInputSchema),
					z.lazy(() => AppointmentScalarWhereInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const OrganizationUpdateOneRequiredWithoutPatientsNestedInputSchema: z.ZodType<Prisma.OrganizationUpdateOneRequiredWithoutPatientsNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => OrganizationCreateWithoutPatientsInputSchema),
					z.lazy(() => OrganizationUncheckedCreateWithoutPatientsInputSchema),
				])
				.optional(),
			connectOrCreate: z
				.lazy(() => OrganizationCreateOrConnectWithoutPatientsInputSchema)
				.optional(),
			upsert: z
				.lazy(() => OrganizationUpsertWithoutPatientsInputSchema)
				.optional(),
			connect: z.lazy(() => OrganizationWhereUniqueInputSchema).optional(),
			update: z
				.union([
					z.lazy(
						() => OrganizationUpdateToOneWithWhereWithoutPatientsInputSchema,
					),
					z.lazy(() => OrganizationUpdateWithoutPatientsInputSchema),
					z.lazy(() => OrganizationUncheckedUpdateWithoutPatientsInputSchema),
				])
				.optional(),
		})
		.strict();

export const AppointmentUncheckedUpdateManyWithoutPatientNestedInputSchema: z.ZodType<Prisma.AppointmentUncheckedUpdateManyWithoutPatientNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => AppointmentCreateWithoutPatientInputSchema),
					z.lazy(() => AppointmentCreateWithoutPatientInputSchema).array(),
					z.lazy(() => AppointmentUncheckedCreateWithoutPatientInputSchema),
					z
						.lazy(() => AppointmentUncheckedCreateWithoutPatientInputSchema)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => AppointmentCreateOrConnectWithoutPatientInputSchema),
					z
						.lazy(() => AppointmentCreateOrConnectWithoutPatientInputSchema)
						.array(),
				])
				.optional(),
			upsert: z
				.union([
					z.lazy(
						() => AppointmentUpsertWithWhereUniqueWithoutPatientInputSchema,
					),
					z
						.lazy(
							() => AppointmentUpsertWithWhereUniqueWithoutPatientInputSchema,
						)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => AppointmentCreateManyPatientInputEnvelopeSchema)
				.optional(),
			set: z
				.union([
					z.lazy(() => AppointmentWhereUniqueInputSchema),
					z.lazy(() => AppointmentWhereUniqueInputSchema).array(),
				])
				.optional(),
			disconnect: z
				.union([
					z.lazy(() => AppointmentWhereUniqueInputSchema),
					z.lazy(() => AppointmentWhereUniqueInputSchema).array(),
				])
				.optional(),
			delete: z
				.union([
					z.lazy(() => AppointmentWhereUniqueInputSchema),
					z.lazy(() => AppointmentWhereUniqueInputSchema).array(),
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => AppointmentWhereUniqueInputSchema),
					z.lazy(() => AppointmentWhereUniqueInputSchema).array(),
				])
				.optional(),
			update: z
				.union([
					z.lazy(
						() => AppointmentUpdateWithWhereUniqueWithoutPatientInputSchema,
					),
					z
						.lazy(
							() => AppointmentUpdateWithWhereUniqueWithoutPatientInputSchema,
						)
						.array(),
				])
				.optional(),
			updateMany: z
				.union([
					z.lazy(() => AppointmentUpdateManyWithWhereWithoutPatientInputSchema),
					z
						.lazy(() => AppointmentUpdateManyWithWhereWithoutPatientInputSchema)
						.array(),
				])
				.optional(),
			deleteMany: z
				.union([
					z.lazy(() => AppointmentScalarWhereInputSchema),
					z.lazy(() => AppointmentScalarWhereInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const PatientCreateNestedOneWithoutAppointmentsInputSchema: z.ZodType<Prisma.PatientCreateNestedOneWithoutAppointmentsInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => PatientCreateWithoutAppointmentsInputSchema),
					z.lazy(() => PatientUncheckedCreateWithoutAppointmentsInputSchema),
				])
				.optional(),
			connectOrCreate: z
				.lazy(() => PatientCreateOrConnectWithoutAppointmentsInputSchema)
				.optional(),
			connect: z.lazy(() => PatientWhereUniqueInputSchema).optional(),
		})
		.strict();

export const MemberCreateNestedOneWithoutAppointmentsInputSchema: z.ZodType<Prisma.MemberCreateNestedOneWithoutAppointmentsInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => MemberCreateWithoutAppointmentsInputSchema),
					z.lazy(() => MemberUncheckedCreateWithoutAppointmentsInputSchema),
				])
				.optional(),
			connectOrCreate: z
				.lazy(() => MemberCreateOrConnectWithoutAppointmentsInputSchema)
				.optional(),
			connect: z.lazy(() => MemberWhereUniqueInputSchema).optional(),
		})
		.strict();

export const EnumAppointmentStatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumAppointmentStatusFieldUpdateOperationsInput> =
	z
		.object({
			set: z.lazy(() => AppointmentStatusSchema).optional(),
		})
		.strict();

export const PatientUpdateOneRequiredWithoutAppointmentsNestedInputSchema: z.ZodType<Prisma.PatientUpdateOneRequiredWithoutAppointmentsNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => PatientCreateWithoutAppointmentsInputSchema),
					z.lazy(() => PatientUncheckedCreateWithoutAppointmentsInputSchema),
				])
				.optional(),
			connectOrCreate: z
				.lazy(() => PatientCreateOrConnectWithoutAppointmentsInputSchema)
				.optional(),
			upsert: z
				.lazy(() => PatientUpsertWithoutAppointmentsInputSchema)
				.optional(),
			connect: z.lazy(() => PatientWhereUniqueInputSchema).optional(),
			update: z
				.union([
					z.lazy(
						() => PatientUpdateToOneWithWhereWithoutAppointmentsInputSchema,
					),
					z.lazy(() => PatientUpdateWithoutAppointmentsInputSchema),
					z.lazy(() => PatientUncheckedUpdateWithoutAppointmentsInputSchema),
				])
				.optional(),
		})
		.strict();

export const MemberUpdateOneRequiredWithoutAppointmentsNestedInputSchema: z.ZodType<Prisma.MemberUpdateOneRequiredWithoutAppointmentsNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => MemberCreateWithoutAppointmentsInputSchema),
					z.lazy(() => MemberUncheckedCreateWithoutAppointmentsInputSchema),
				])
				.optional(),
			connectOrCreate: z
				.lazy(() => MemberCreateOrConnectWithoutAppointmentsInputSchema)
				.optional(),
			upsert: z
				.lazy(() => MemberUpsertWithoutAppointmentsInputSchema)
				.optional(),
			connect: z.lazy(() => MemberWhereUniqueInputSchema).optional(),
			update: z
				.union([
					z.lazy(
						() => MemberUpdateToOneWithWhereWithoutAppointmentsInputSchema,
					),
					z.lazy(() => MemberUpdateWithoutAppointmentsInputSchema),
					z.lazy(() => MemberUncheckedUpdateWithoutAppointmentsInputSchema),
				])
				.optional(),
		})
		.strict();

export const UserCreateNestedOneWithoutOwns_organizationsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutOwns_organizationsInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => UserCreateWithoutOwns_organizationsInputSchema),
					z.lazy(() => UserUncheckedCreateWithoutOwns_organizationsInputSchema),
				])
				.optional(),
			connectOrCreate: z
				.lazy(() => UserCreateOrConnectWithoutOwns_organizationsInputSchema)
				.optional(),
			connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
		})
		.strict();

export const InviteCreateNestedManyWithoutOrganizationInputSchema: z.ZodType<Prisma.InviteCreateNestedManyWithoutOrganizationInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => InviteCreateWithoutOrganizationInputSchema),
					z.lazy(() => InviteCreateWithoutOrganizationInputSchema).array(),
					z.lazy(() => InviteUncheckedCreateWithoutOrganizationInputSchema),
					z
						.lazy(() => InviteUncheckedCreateWithoutOrganizationInputSchema)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => InviteCreateOrConnectWithoutOrganizationInputSchema),
					z
						.lazy(() => InviteCreateOrConnectWithoutOrganizationInputSchema)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => InviteCreateManyOrganizationInputEnvelopeSchema)
				.optional(),
			connect: z
				.union([
					z.lazy(() => InviteWhereUniqueInputSchema),
					z.lazy(() => InviteWhereUniqueInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const MemberCreateNestedManyWithoutOrganizationInputSchema: z.ZodType<Prisma.MemberCreateNestedManyWithoutOrganizationInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => MemberCreateWithoutOrganizationInputSchema),
					z.lazy(() => MemberCreateWithoutOrganizationInputSchema).array(),
					z.lazy(() => MemberUncheckedCreateWithoutOrganizationInputSchema),
					z
						.lazy(() => MemberUncheckedCreateWithoutOrganizationInputSchema)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => MemberCreateOrConnectWithoutOrganizationInputSchema),
					z
						.lazy(() => MemberCreateOrConnectWithoutOrganizationInputSchema)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => MemberCreateManyOrganizationInputEnvelopeSchema)
				.optional(),
			connect: z
				.union([
					z.lazy(() => MemberWhereUniqueInputSchema),
					z.lazy(() => MemberWhereUniqueInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const PatientCreateNestedManyWithoutOrganizationInputSchema: z.ZodType<Prisma.PatientCreateNestedManyWithoutOrganizationInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => PatientCreateWithoutOrganizationInputSchema),
					z.lazy(() => PatientCreateWithoutOrganizationInputSchema).array(),
					z.lazy(() => PatientUncheckedCreateWithoutOrganizationInputSchema),
					z
						.lazy(() => PatientUncheckedCreateWithoutOrganizationInputSchema)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => PatientCreateOrConnectWithoutOrganizationInputSchema),
					z
						.lazy(() => PatientCreateOrConnectWithoutOrganizationInputSchema)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => PatientCreateManyOrganizationInputEnvelopeSchema)
				.optional(),
			connect: z
				.union([
					z.lazy(() => PatientWhereUniqueInputSchema),
					z.lazy(() => PatientWhereUniqueInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const InviteUncheckedCreateNestedManyWithoutOrganizationInputSchema: z.ZodType<Prisma.InviteUncheckedCreateNestedManyWithoutOrganizationInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => InviteCreateWithoutOrganizationInputSchema),
					z.lazy(() => InviteCreateWithoutOrganizationInputSchema).array(),
					z.lazy(() => InviteUncheckedCreateWithoutOrganizationInputSchema),
					z
						.lazy(() => InviteUncheckedCreateWithoutOrganizationInputSchema)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => InviteCreateOrConnectWithoutOrganizationInputSchema),
					z
						.lazy(() => InviteCreateOrConnectWithoutOrganizationInputSchema)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => InviteCreateManyOrganizationInputEnvelopeSchema)
				.optional(),
			connect: z
				.union([
					z.lazy(() => InviteWhereUniqueInputSchema),
					z.lazy(() => InviteWhereUniqueInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const MemberUncheckedCreateNestedManyWithoutOrganizationInputSchema: z.ZodType<Prisma.MemberUncheckedCreateNestedManyWithoutOrganizationInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => MemberCreateWithoutOrganizationInputSchema),
					z.lazy(() => MemberCreateWithoutOrganizationInputSchema).array(),
					z.lazy(() => MemberUncheckedCreateWithoutOrganizationInputSchema),
					z
						.lazy(() => MemberUncheckedCreateWithoutOrganizationInputSchema)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => MemberCreateOrConnectWithoutOrganizationInputSchema),
					z
						.lazy(() => MemberCreateOrConnectWithoutOrganizationInputSchema)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => MemberCreateManyOrganizationInputEnvelopeSchema)
				.optional(),
			connect: z
				.union([
					z.lazy(() => MemberWhereUniqueInputSchema),
					z.lazy(() => MemberWhereUniqueInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const PatientUncheckedCreateNestedManyWithoutOrganizationInputSchema: z.ZodType<Prisma.PatientUncheckedCreateNestedManyWithoutOrganizationInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => PatientCreateWithoutOrganizationInputSchema),
					z.lazy(() => PatientCreateWithoutOrganizationInputSchema).array(),
					z.lazy(() => PatientUncheckedCreateWithoutOrganizationInputSchema),
					z
						.lazy(() => PatientUncheckedCreateWithoutOrganizationInputSchema)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => PatientCreateOrConnectWithoutOrganizationInputSchema),
					z
						.lazy(() => PatientCreateOrConnectWithoutOrganizationInputSchema)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => PatientCreateManyOrganizationInputEnvelopeSchema)
				.optional(),
			connect: z
				.union([
					z.lazy(() => PatientWhereUniqueInputSchema),
					z.lazy(() => PatientWhereUniqueInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> =
	z
		.object({
			set: z.boolean().optional(),
		})
		.strict();

export const UserUpdateOneRequiredWithoutOwns_organizationsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutOwns_organizationsNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => UserCreateWithoutOwns_organizationsInputSchema),
					z.lazy(() => UserUncheckedCreateWithoutOwns_organizationsInputSchema),
				])
				.optional(),
			connectOrCreate: z
				.lazy(() => UserCreateOrConnectWithoutOwns_organizationsInputSchema)
				.optional(),
			upsert: z
				.lazy(() => UserUpsertWithoutOwns_organizationsInputSchema)
				.optional(),
			connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
			update: z
				.union([
					z.lazy(
						() => UserUpdateToOneWithWhereWithoutOwns_organizationsInputSchema,
					),
					z.lazy(() => UserUpdateWithoutOwns_organizationsInputSchema),
					z.lazy(() => UserUncheckedUpdateWithoutOwns_organizationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const InviteUpdateManyWithoutOrganizationNestedInputSchema: z.ZodType<Prisma.InviteUpdateManyWithoutOrganizationNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => InviteCreateWithoutOrganizationInputSchema),
					z.lazy(() => InviteCreateWithoutOrganizationInputSchema).array(),
					z.lazy(() => InviteUncheckedCreateWithoutOrganizationInputSchema),
					z
						.lazy(() => InviteUncheckedCreateWithoutOrganizationInputSchema)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => InviteCreateOrConnectWithoutOrganizationInputSchema),
					z
						.lazy(() => InviteCreateOrConnectWithoutOrganizationInputSchema)
						.array(),
				])
				.optional(),
			upsert: z
				.union([
					z.lazy(
						() => InviteUpsertWithWhereUniqueWithoutOrganizationInputSchema,
					),
					z
						.lazy(
							() => InviteUpsertWithWhereUniqueWithoutOrganizationInputSchema,
						)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => InviteCreateManyOrganizationInputEnvelopeSchema)
				.optional(),
			set: z
				.union([
					z.lazy(() => InviteWhereUniqueInputSchema),
					z.lazy(() => InviteWhereUniqueInputSchema).array(),
				])
				.optional(),
			disconnect: z
				.union([
					z.lazy(() => InviteWhereUniqueInputSchema),
					z.lazy(() => InviteWhereUniqueInputSchema).array(),
				])
				.optional(),
			delete: z
				.union([
					z.lazy(() => InviteWhereUniqueInputSchema),
					z.lazy(() => InviteWhereUniqueInputSchema).array(),
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => InviteWhereUniqueInputSchema),
					z.lazy(() => InviteWhereUniqueInputSchema).array(),
				])
				.optional(),
			update: z
				.union([
					z.lazy(
						() => InviteUpdateWithWhereUniqueWithoutOrganizationInputSchema,
					),
					z
						.lazy(
							() => InviteUpdateWithWhereUniqueWithoutOrganizationInputSchema,
						)
						.array(),
				])
				.optional(),
			updateMany: z
				.union([
					z.lazy(() => InviteUpdateManyWithWhereWithoutOrganizationInputSchema),
					z
						.lazy(() => InviteUpdateManyWithWhereWithoutOrganizationInputSchema)
						.array(),
				])
				.optional(),
			deleteMany: z
				.union([
					z.lazy(() => InviteScalarWhereInputSchema),
					z.lazy(() => InviteScalarWhereInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const MemberUpdateManyWithoutOrganizationNestedInputSchema: z.ZodType<Prisma.MemberUpdateManyWithoutOrganizationNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => MemberCreateWithoutOrganizationInputSchema),
					z.lazy(() => MemberCreateWithoutOrganizationInputSchema).array(),
					z.lazy(() => MemberUncheckedCreateWithoutOrganizationInputSchema),
					z
						.lazy(() => MemberUncheckedCreateWithoutOrganizationInputSchema)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => MemberCreateOrConnectWithoutOrganizationInputSchema),
					z
						.lazy(() => MemberCreateOrConnectWithoutOrganizationInputSchema)
						.array(),
				])
				.optional(),
			upsert: z
				.union([
					z.lazy(
						() => MemberUpsertWithWhereUniqueWithoutOrganizationInputSchema,
					),
					z
						.lazy(
							() => MemberUpsertWithWhereUniqueWithoutOrganizationInputSchema,
						)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => MemberCreateManyOrganizationInputEnvelopeSchema)
				.optional(),
			set: z
				.union([
					z.lazy(() => MemberWhereUniqueInputSchema),
					z.lazy(() => MemberWhereUniqueInputSchema).array(),
				])
				.optional(),
			disconnect: z
				.union([
					z.lazy(() => MemberWhereUniqueInputSchema),
					z.lazy(() => MemberWhereUniqueInputSchema).array(),
				])
				.optional(),
			delete: z
				.union([
					z.lazy(() => MemberWhereUniqueInputSchema),
					z.lazy(() => MemberWhereUniqueInputSchema).array(),
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => MemberWhereUniqueInputSchema),
					z.lazy(() => MemberWhereUniqueInputSchema).array(),
				])
				.optional(),
			update: z
				.union([
					z.lazy(
						() => MemberUpdateWithWhereUniqueWithoutOrganizationInputSchema,
					),
					z
						.lazy(
							() => MemberUpdateWithWhereUniqueWithoutOrganizationInputSchema,
						)
						.array(),
				])
				.optional(),
			updateMany: z
				.union([
					z.lazy(() => MemberUpdateManyWithWhereWithoutOrganizationInputSchema),
					z
						.lazy(() => MemberUpdateManyWithWhereWithoutOrganizationInputSchema)
						.array(),
				])
				.optional(),
			deleteMany: z
				.union([
					z.lazy(() => MemberScalarWhereInputSchema),
					z.lazy(() => MemberScalarWhereInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const PatientUpdateManyWithoutOrganizationNestedInputSchema: z.ZodType<Prisma.PatientUpdateManyWithoutOrganizationNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => PatientCreateWithoutOrganizationInputSchema),
					z.lazy(() => PatientCreateWithoutOrganizationInputSchema).array(),
					z.lazy(() => PatientUncheckedCreateWithoutOrganizationInputSchema),
					z
						.lazy(() => PatientUncheckedCreateWithoutOrganizationInputSchema)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => PatientCreateOrConnectWithoutOrganizationInputSchema),
					z
						.lazy(() => PatientCreateOrConnectWithoutOrganizationInputSchema)
						.array(),
				])
				.optional(),
			upsert: z
				.union([
					z.lazy(
						() => PatientUpsertWithWhereUniqueWithoutOrganizationInputSchema,
					),
					z
						.lazy(
							() => PatientUpsertWithWhereUniqueWithoutOrganizationInputSchema,
						)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => PatientCreateManyOrganizationInputEnvelopeSchema)
				.optional(),
			set: z
				.union([
					z.lazy(() => PatientWhereUniqueInputSchema),
					z.lazy(() => PatientWhereUniqueInputSchema).array(),
				])
				.optional(),
			disconnect: z
				.union([
					z.lazy(() => PatientWhereUniqueInputSchema),
					z.lazy(() => PatientWhereUniqueInputSchema).array(),
				])
				.optional(),
			delete: z
				.union([
					z.lazy(() => PatientWhereUniqueInputSchema),
					z.lazy(() => PatientWhereUniqueInputSchema).array(),
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => PatientWhereUniqueInputSchema),
					z.lazy(() => PatientWhereUniqueInputSchema).array(),
				])
				.optional(),
			update: z
				.union([
					z.lazy(
						() => PatientUpdateWithWhereUniqueWithoutOrganizationInputSchema,
					),
					z
						.lazy(
							() => PatientUpdateWithWhereUniqueWithoutOrganizationInputSchema,
						)
						.array(),
				])
				.optional(),
			updateMany: z
				.union([
					z.lazy(
						() => PatientUpdateManyWithWhereWithoutOrganizationInputSchema,
					),
					z
						.lazy(
							() => PatientUpdateManyWithWhereWithoutOrganizationInputSchema,
						)
						.array(),
				])
				.optional(),
			deleteMany: z
				.union([
					z.lazy(() => PatientScalarWhereInputSchema),
					z.lazy(() => PatientScalarWhereInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const InviteUncheckedUpdateManyWithoutOrganizationNestedInputSchema: z.ZodType<Prisma.InviteUncheckedUpdateManyWithoutOrganizationNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => InviteCreateWithoutOrganizationInputSchema),
					z.lazy(() => InviteCreateWithoutOrganizationInputSchema).array(),
					z.lazy(() => InviteUncheckedCreateWithoutOrganizationInputSchema),
					z
						.lazy(() => InviteUncheckedCreateWithoutOrganizationInputSchema)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => InviteCreateOrConnectWithoutOrganizationInputSchema),
					z
						.lazy(() => InviteCreateOrConnectWithoutOrganizationInputSchema)
						.array(),
				])
				.optional(),
			upsert: z
				.union([
					z.lazy(
						() => InviteUpsertWithWhereUniqueWithoutOrganizationInputSchema,
					),
					z
						.lazy(
							() => InviteUpsertWithWhereUniqueWithoutOrganizationInputSchema,
						)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => InviteCreateManyOrganizationInputEnvelopeSchema)
				.optional(),
			set: z
				.union([
					z.lazy(() => InviteWhereUniqueInputSchema),
					z.lazy(() => InviteWhereUniqueInputSchema).array(),
				])
				.optional(),
			disconnect: z
				.union([
					z.lazy(() => InviteWhereUniqueInputSchema),
					z.lazy(() => InviteWhereUniqueInputSchema).array(),
				])
				.optional(),
			delete: z
				.union([
					z.lazy(() => InviteWhereUniqueInputSchema),
					z.lazy(() => InviteWhereUniqueInputSchema).array(),
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => InviteWhereUniqueInputSchema),
					z.lazy(() => InviteWhereUniqueInputSchema).array(),
				])
				.optional(),
			update: z
				.union([
					z.lazy(
						() => InviteUpdateWithWhereUniqueWithoutOrganizationInputSchema,
					),
					z
						.lazy(
							() => InviteUpdateWithWhereUniqueWithoutOrganizationInputSchema,
						)
						.array(),
				])
				.optional(),
			updateMany: z
				.union([
					z.lazy(() => InviteUpdateManyWithWhereWithoutOrganizationInputSchema),
					z
						.lazy(() => InviteUpdateManyWithWhereWithoutOrganizationInputSchema)
						.array(),
				])
				.optional(),
			deleteMany: z
				.union([
					z.lazy(() => InviteScalarWhereInputSchema),
					z.lazy(() => InviteScalarWhereInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const MemberUncheckedUpdateManyWithoutOrganizationNestedInputSchema: z.ZodType<Prisma.MemberUncheckedUpdateManyWithoutOrganizationNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => MemberCreateWithoutOrganizationInputSchema),
					z.lazy(() => MemberCreateWithoutOrganizationInputSchema).array(),
					z.lazy(() => MemberUncheckedCreateWithoutOrganizationInputSchema),
					z
						.lazy(() => MemberUncheckedCreateWithoutOrganizationInputSchema)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => MemberCreateOrConnectWithoutOrganizationInputSchema),
					z
						.lazy(() => MemberCreateOrConnectWithoutOrganizationInputSchema)
						.array(),
				])
				.optional(),
			upsert: z
				.union([
					z.lazy(
						() => MemberUpsertWithWhereUniqueWithoutOrganizationInputSchema,
					),
					z
						.lazy(
							() => MemberUpsertWithWhereUniqueWithoutOrganizationInputSchema,
						)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => MemberCreateManyOrganizationInputEnvelopeSchema)
				.optional(),
			set: z
				.union([
					z.lazy(() => MemberWhereUniqueInputSchema),
					z.lazy(() => MemberWhereUniqueInputSchema).array(),
				])
				.optional(),
			disconnect: z
				.union([
					z.lazy(() => MemberWhereUniqueInputSchema),
					z.lazy(() => MemberWhereUniqueInputSchema).array(),
				])
				.optional(),
			delete: z
				.union([
					z.lazy(() => MemberWhereUniqueInputSchema),
					z.lazy(() => MemberWhereUniqueInputSchema).array(),
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => MemberWhereUniqueInputSchema),
					z.lazy(() => MemberWhereUniqueInputSchema).array(),
				])
				.optional(),
			update: z
				.union([
					z.lazy(
						() => MemberUpdateWithWhereUniqueWithoutOrganizationInputSchema,
					),
					z
						.lazy(
							() => MemberUpdateWithWhereUniqueWithoutOrganizationInputSchema,
						)
						.array(),
				])
				.optional(),
			updateMany: z
				.union([
					z.lazy(() => MemberUpdateManyWithWhereWithoutOrganizationInputSchema),
					z
						.lazy(() => MemberUpdateManyWithWhereWithoutOrganizationInputSchema)
						.array(),
				])
				.optional(),
			deleteMany: z
				.union([
					z.lazy(() => MemberScalarWhereInputSchema),
					z.lazy(() => MemberScalarWhereInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const PatientUncheckedUpdateManyWithoutOrganizationNestedInputSchema: z.ZodType<Prisma.PatientUncheckedUpdateManyWithoutOrganizationNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => PatientCreateWithoutOrganizationInputSchema),
					z.lazy(() => PatientCreateWithoutOrganizationInputSchema).array(),
					z.lazy(() => PatientUncheckedCreateWithoutOrganizationInputSchema),
					z
						.lazy(() => PatientUncheckedCreateWithoutOrganizationInputSchema)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => PatientCreateOrConnectWithoutOrganizationInputSchema),
					z
						.lazy(() => PatientCreateOrConnectWithoutOrganizationInputSchema)
						.array(),
				])
				.optional(),
			upsert: z
				.union([
					z.lazy(
						() => PatientUpsertWithWhereUniqueWithoutOrganizationInputSchema,
					),
					z
						.lazy(
							() => PatientUpsertWithWhereUniqueWithoutOrganizationInputSchema,
						)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => PatientCreateManyOrganizationInputEnvelopeSchema)
				.optional(),
			set: z
				.union([
					z.lazy(() => PatientWhereUniqueInputSchema),
					z.lazy(() => PatientWhereUniqueInputSchema).array(),
				])
				.optional(),
			disconnect: z
				.union([
					z.lazy(() => PatientWhereUniqueInputSchema),
					z.lazy(() => PatientWhereUniqueInputSchema).array(),
				])
				.optional(),
			delete: z
				.union([
					z.lazy(() => PatientWhereUniqueInputSchema),
					z.lazy(() => PatientWhereUniqueInputSchema).array(),
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => PatientWhereUniqueInputSchema),
					z.lazy(() => PatientWhereUniqueInputSchema).array(),
				])
				.optional(),
			update: z
				.union([
					z.lazy(
						() => PatientUpdateWithWhereUniqueWithoutOrganizationInputSchema,
					),
					z
						.lazy(
							() => PatientUpdateWithWhereUniqueWithoutOrganizationInputSchema,
						)
						.array(),
				])
				.optional(),
			updateMany: z
				.union([
					z.lazy(
						() => PatientUpdateManyWithWhereWithoutOrganizationInputSchema,
					),
					z
						.lazy(
							() => PatientUpdateManyWithWhereWithoutOrganizationInputSchema,
						)
						.array(),
				])
				.optional(),
			deleteMany: z
				.union([
					z.lazy(() => PatientScalarWhereInputSchema),
					z.lazy(() => PatientScalarWhereInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z
	.object({
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
		not: z
			.union([z.string(), z.lazy(() => NestedStringFilterSchema)])
			.optional(),
	})
	.strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> =
	z
		.object({
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
			not: z
				.union([z.string(), z.lazy(() => NestedStringNullableFilterSchema)])
				.optional()
				.nullable(),
		})
		.strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> =
	z
		.object({
			equals: z.coerce.date().optional(),
			in: z.coerce.date().array().optional(),
			notIn: z.coerce.date().array().optional(),
			lt: z.coerce.date().optional(),
			lte: z.coerce.date().optional(),
			gt: z.coerce.date().optional(),
			gte: z.coerce.date().optional(),
			not: z
				.union([z.coerce.date(), z.lazy(() => NestedDateTimeFilterSchema)])
				.optional(),
		})
		.strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> =
	z
		.object({
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
			not: z
				.union([
					z.string(),
					z.lazy(() => NestedStringWithAggregatesFilterSchema),
				])
				.optional(),
			_count: z.lazy(() => NestedIntFilterSchema).optional(),
			_min: z.lazy(() => NestedStringFilterSchema).optional(),
			_max: z.lazy(() => NestedStringFilterSchema).optional(),
		})
		.strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z
	.object({
		equals: z.number().optional(),
		in: z.number().array().optional(),
		notIn: z.number().array().optional(),
		lt: z.number().optional(),
		lte: z.number().optional(),
		gt: z.number().optional(),
		gte: z.number().optional(),
		not: z.union([z.number(), z.lazy(() => NestedIntFilterSchema)]).optional(),
	})
	.strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> =
	z
		.object({
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
			not: z
				.union([
					z.string(),
					z.lazy(() => NestedStringNullableWithAggregatesFilterSchema),
				])
				.optional()
				.nullable(),
			_count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
			_min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
			_max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
		})
		.strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> =
	z
		.object({
			equals: z.number().optional().nullable(),
			in: z.number().array().optional().nullable(),
			notIn: z.number().array().optional().nullable(),
			lt: z.number().optional(),
			lte: z.number().optional(),
			gt: z.number().optional(),
			gte: z.number().optional(),
			not: z
				.union([z.number(), z.lazy(() => NestedIntNullableFilterSchema)])
				.optional()
				.nullable(),
		})
		.strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> =
	z
		.object({
			equals: z.coerce.date().optional(),
			in: z.coerce.date().array().optional(),
			notIn: z.coerce.date().array().optional(),
			lt: z.coerce.date().optional(),
			lte: z.coerce.date().optional(),
			gt: z.coerce.date().optional(),
			gte: z.coerce.date().optional(),
			not: z
				.union([
					z.coerce.date(),
					z.lazy(() => NestedDateTimeWithAggregatesFilterSchema),
				])
				.optional(),
			_count: z.lazy(() => NestedIntFilterSchema).optional(),
			_min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
			_max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
		})
		.strict();

export const NestedEnumTokenTypeFilterSchema: z.ZodType<Prisma.NestedEnumTokenTypeFilter> =
	z
		.object({
			equals: z.lazy(() => TokenTypeSchema).optional(),
			in: z
				.lazy(() => TokenTypeSchema)
				.array()
				.optional(),
			notIn: z
				.lazy(() => TokenTypeSchema)
				.array()
				.optional(),
			not: z
				.union([
					z.lazy(() => TokenTypeSchema),
					z.lazy(() => NestedEnumTokenTypeFilterSchema),
				])
				.optional(),
		})
		.strict();

export const NestedEnumTokenTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumTokenTypeWithAggregatesFilter> =
	z
		.object({
			equals: z.lazy(() => TokenTypeSchema).optional(),
			in: z
				.lazy(() => TokenTypeSchema)
				.array()
				.optional(),
			notIn: z
				.lazy(() => TokenTypeSchema)
				.array()
				.optional(),
			not: z
				.union([
					z.lazy(() => TokenTypeSchema),
					z.lazy(() => NestedEnumTokenTypeWithAggregatesFilterSchema),
				])
				.optional(),
			_count: z.lazy(() => NestedIntFilterSchema).optional(),
			_min: z.lazy(() => NestedEnumTokenTypeFilterSchema).optional(),
			_max: z.lazy(() => NestedEnumTokenTypeFilterSchema).optional(),
		})
		.strict();

export const NestedEnumAccountProviderFilterSchema: z.ZodType<Prisma.NestedEnumAccountProviderFilter> =
	z
		.object({
			equals: z.lazy(() => AccountProviderSchema).optional(),
			in: z
				.lazy(() => AccountProviderSchema)
				.array()
				.optional(),
			notIn: z
				.lazy(() => AccountProviderSchema)
				.array()
				.optional(),
			not: z
				.union([
					z.lazy(() => AccountProviderSchema),
					z.lazy(() => NestedEnumAccountProviderFilterSchema),
				])
				.optional(),
		})
		.strict();

export const NestedEnumAccountProviderWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumAccountProviderWithAggregatesFilter> =
	z
		.object({
			equals: z.lazy(() => AccountProviderSchema).optional(),
			in: z
				.lazy(() => AccountProviderSchema)
				.array()
				.optional(),
			notIn: z
				.lazy(() => AccountProviderSchema)
				.array()
				.optional(),
			not: z
				.union([
					z.lazy(() => AccountProviderSchema),
					z.lazy(() => NestedEnumAccountProviderWithAggregatesFilterSchema),
				])
				.optional(),
			_count: z.lazy(() => NestedIntFilterSchema).optional(),
			_min: z.lazy(() => NestedEnumAccountProviderFilterSchema).optional(),
			_max: z.lazy(() => NestedEnumAccountProviderFilterSchema).optional(),
		})
		.strict();

export const NestedEnumRoleFilterSchema: z.ZodType<Prisma.NestedEnumRoleFilter> =
	z
		.object({
			equals: z.lazy(() => RoleSchema).optional(),
			in: z
				.lazy(() => RoleSchema)
				.array()
				.optional(),
			notIn: z
				.lazy(() => RoleSchema)
				.array()
				.optional(),
			not: z
				.union([
					z.lazy(() => RoleSchema),
					z.lazy(() => NestedEnumRoleFilterSchema),
				])
				.optional(),
		})
		.strict();

export const NestedEnumRoleWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumRoleWithAggregatesFilter> =
	z
		.object({
			equals: z.lazy(() => RoleSchema).optional(),
			in: z
				.lazy(() => RoleSchema)
				.array()
				.optional(),
			notIn: z
				.lazy(() => RoleSchema)
				.array()
				.optional(),
			not: z
				.union([
					z.lazy(() => RoleSchema),
					z.lazy(() => NestedEnumRoleWithAggregatesFilterSchema),
				])
				.optional(),
			_count: z.lazy(() => NestedIntFilterSchema).optional(),
			_min: z.lazy(() => NestedEnumRoleFilterSchema).optional(),
			_max: z.lazy(() => NestedEnumRoleFilterSchema).optional(),
		})
		.strict();

export const NestedEnumAppointmentStatusFilterSchema: z.ZodType<Prisma.NestedEnumAppointmentStatusFilter> =
	z
		.object({
			equals: z.lazy(() => AppointmentStatusSchema).optional(),
			in: z
				.lazy(() => AppointmentStatusSchema)
				.array()
				.optional(),
			notIn: z
				.lazy(() => AppointmentStatusSchema)
				.array()
				.optional(),
			not: z
				.union([
					z.lazy(() => AppointmentStatusSchema),
					z.lazy(() => NestedEnumAppointmentStatusFilterSchema),
				])
				.optional(),
		})
		.strict();

export const NestedEnumAppointmentStatusWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumAppointmentStatusWithAggregatesFilter> =
	z
		.object({
			equals: z.lazy(() => AppointmentStatusSchema).optional(),
			in: z
				.lazy(() => AppointmentStatusSchema)
				.array()
				.optional(),
			notIn: z
				.lazy(() => AppointmentStatusSchema)
				.array()
				.optional(),
			not: z
				.union([
					z.lazy(() => AppointmentStatusSchema),
					z.lazy(() => NestedEnumAppointmentStatusWithAggregatesFilterSchema),
				])
				.optional(),
			_count: z.lazy(() => NestedIntFilterSchema).optional(),
			_min: z.lazy(() => NestedEnumAppointmentStatusFilterSchema).optional(),
			_max: z.lazy(() => NestedEnumAppointmentStatusFilterSchema).optional(),
		})
		.strict();

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z
	.object({
		equals: z.boolean().optional(),
		not: z
			.union([z.boolean(), z.lazy(() => NestedBoolFilterSchema)])
			.optional(),
	})
	.strict();

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> =
	z
		.object({
			equals: z.boolean().optional(),
			not: z
				.union([
					z.boolean(),
					z.lazy(() => NestedBoolWithAggregatesFilterSchema),
				])
				.optional(),
			_count: z.lazy(() => NestedIntFilterSchema).optional(),
			_min: z.lazy(() => NestedBoolFilterSchema).optional(),
			_max: z.lazy(() => NestedBoolFilterSchema).optional(),
		})
		.strict();

export const TokenCreateWithoutUserInputSchema: z.ZodType<Prisma.TokenCreateWithoutUserInput> =
	z
		.object({
			id: z.string().optional(),
			type: z.lazy(() => TokenTypeSchema),
			createdAt: z.coerce.date().optional(),
		})
		.strict();

export const TokenUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.TokenUncheckedCreateWithoutUserInput> =
	z
		.object({
			id: z.string().optional(),
			type: z.lazy(() => TokenTypeSchema),
			createdAt: z.coerce.date().optional(),
		})
		.strict();

export const TokenCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.TokenCreateOrConnectWithoutUserInput> =
	z
		.object({
			where: z.lazy(() => TokenWhereUniqueInputSchema),
			create: z.union([
				z.lazy(() => TokenCreateWithoutUserInputSchema),
				z.lazy(() => TokenUncheckedCreateWithoutUserInputSchema),
			]),
		})
		.strict();

export const TokenCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.TokenCreateManyUserInputEnvelope> =
	z
		.object({
			data: z.union([
				z.lazy(() => TokenCreateManyUserInputSchema),
				z.lazy(() => TokenCreateManyUserInputSchema).array(),
			]),
			skipDuplicates: z.boolean().optional(),
		})
		.strict();

export const AccountCreateWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateWithoutUserInput> =
	z
		.object({
			id: z.string().optional(),
			provider: z.lazy(() => AccountProviderSchema),
			providerAccountId: z.string(),
		})
		.strict();

export const AccountUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedCreateWithoutUserInput> =
	z
		.object({
			id: z.string().optional(),
			provider: z.lazy(() => AccountProviderSchema),
			providerAccountId: z.string(),
		})
		.strict();

export const AccountCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateOrConnectWithoutUserInput> =
	z
		.object({
			where: z.lazy(() => AccountWhereUniqueInputSchema),
			create: z.union([
				z.lazy(() => AccountCreateWithoutUserInputSchema),
				z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),
			]),
		})
		.strict();

export const AccountCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.AccountCreateManyUserInputEnvelope> =
	z
		.object({
			data: z.union([
				z.lazy(() => AccountCreateManyUserInputSchema),
				z.lazy(() => AccountCreateManyUserInputSchema).array(),
			]),
			skipDuplicates: z.boolean().optional(),
		})
		.strict();

export const InviteCreateWithoutAuthorInputSchema: z.ZodType<Prisma.InviteCreateWithoutAuthorInput> =
	z
		.object({
			id: z.string().optional(),
			email: z.string(),
			role: z.lazy(() => RoleSchema),
			createdAt: z.coerce.date().optional(),
			organization: z.lazy(
				() => OrganizationCreateNestedOneWithoutInvitesInputSchema,
			),
		})
		.strict();

export const InviteUncheckedCreateWithoutAuthorInputSchema: z.ZodType<Prisma.InviteUncheckedCreateWithoutAuthorInput> =
	z
		.object({
			id: z.string().optional(),
			email: z.string(),
			role: z.lazy(() => RoleSchema),
			createdAt: z.coerce.date().optional(),
			organizationId: z.string(),
		})
		.strict();

export const InviteCreateOrConnectWithoutAuthorInputSchema: z.ZodType<Prisma.InviteCreateOrConnectWithoutAuthorInput> =
	z
		.object({
			where: z.lazy(() => InviteWhereUniqueInputSchema),
			create: z.union([
				z.lazy(() => InviteCreateWithoutAuthorInputSchema),
				z.lazy(() => InviteUncheckedCreateWithoutAuthorInputSchema),
			]),
		})
		.strict();

export const InviteCreateManyAuthorInputEnvelopeSchema: z.ZodType<Prisma.InviteCreateManyAuthorInputEnvelope> =
	z
		.object({
			data: z.union([
				z.lazy(() => InviteCreateManyAuthorInputSchema),
				z.lazy(() => InviteCreateManyAuthorInputSchema).array(),
			]),
			skipDuplicates: z.boolean().optional(),
		})
		.strict();

export const MemberCreateWithoutUserInputSchema: z.ZodType<Prisma.MemberCreateWithoutUserInput> =
	z
		.object({
			id: z.string().optional(),
			role: z.lazy(() => RoleSchema).optional(),
			specialty: z.string().optional().nullable(),
			organization: z.lazy(
				() => OrganizationCreateNestedOneWithoutMembersInputSchema,
			),
			appointments: z
				.lazy(() => AppointmentCreateNestedManyWithoutMemberInputSchema)
				.optional(),
		})
		.strict();

export const MemberUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.MemberUncheckedCreateWithoutUserInput> =
	z
		.object({
			id: z.string().optional(),
			role: z.lazy(() => RoleSchema).optional(),
			specialty: z.string().optional().nullable(),
			organizationId: z.string(),
			appointments: z
				.lazy(
					() => AppointmentUncheckedCreateNestedManyWithoutMemberInputSchema,
				)
				.optional(),
		})
		.strict();

export const MemberCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.MemberCreateOrConnectWithoutUserInput> =
	z
		.object({
			where: z.lazy(() => MemberWhereUniqueInputSchema),
			create: z.union([
				z.lazy(() => MemberCreateWithoutUserInputSchema),
				z.lazy(() => MemberUncheckedCreateWithoutUserInputSchema),
			]),
		})
		.strict();

export const MemberCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.MemberCreateManyUserInputEnvelope> =
	z
		.object({
			data: z.union([
				z.lazy(() => MemberCreateManyUserInputSchema),
				z.lazy(() => MemberCreateManyUserInputSchema).array(),
			]),
			skipDuplicates: z.boolean().optional(),
		})
		.strict();

export const OrganizationCreateWithoutOwnerInputSchema: z.ZodType<Prisma.OrganizationCreateWithoutOwnerInput> =
	z
		.object({
			id: z.string().optional(),
			name: z.string(),
			slug: z.string(),
			domain: z.string().optional().nullable(),
			shouldAttachUsersByDomain: z.boolean().optional(),
			avatarUrl: z.string().optional().nullable(),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
			invites: z
				.lazy(() => InviteCreateNestedManyWithoutOrganizationInputSchema)
				.optional(),
			members: z
				.lazy(() => MemberCreateNestedManyWithoutOrganizationInputSchema)
				.optional(),
			patients: z
				.lazy(() => PatientCreateNestedManyWithoutOrganizationInputSchema)
				.optional(),
		})
		.strict();

export const OrganizationUncheckedCreateWithoutOwnerInputSchema: z.ZodType<Prisma.OrganizationUncheckedCreateWithoutOwnerInput> =
	z
		.object({
			id: z.string().optional(),
			name: z.string(),
			slug: z.string(),
			domain: z.string().optional().nullable(),
			shouldAttachUsersByDomain: z.boolean().optional(),
			avatarUrl: z.string().optional().nullable(),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
			invites: z
				.lazy(
					() => InviteUncheckedCreateNestedManyWithoutOrganizationInputSchema,
				)
				.optional(),
			members: z
				.lazy(
					() => MemberUncheckedCreateNestedManyWithoutOrganizationInputSchema,
				)
				.optional(),
			patients: z
				.lazy(
					() => PatientUncheckedCreateNestedManyWithoutOrganizationInputSchema,
				)
				.optional(),
		})
		.strict();

export const OrganizationCreateOrConnectWithoutOwnerInputSchema: z.ZodType<Prisma.OrganizationCreateOrConnectWithoutOwnerInput> =
	z
		.object({
			where: z.lazy(() => OrganizationWhereUniqueInputSchema),
			create: z.union([
				z.lazy(() => OrganizationCreateWithoutOwnerInputSchema),
				z.lazy(() => OrganizationUncheckedCreateWithoutOwnerInputSchema),
			]),
		})
		.strict();

export const OrganizationCreateManyOwnerInputEnvelopeSchema: z.ZodType<Prisma.OrganizationCreateManyOwnerInputEnvelope> =
	z
		.object({
			data: z.union([
				z.lazy(() => OrganizationCreateManyOwnerInputSchema),
				z.lazy(() => OrganizationCreateManyOwnerInputSchema).array(),
			]),
			skipDuplicates: z.boolean().optional(),
		})
		.strict();

export const TokenUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.TokenUpsertWithWhereUniqueWithoutUserInput> =
	z
		.object({
			where: z.lazy(() => TokenWhereUniqueInputSchema),
			update: z.union([
				z.lazy(() => TokenUpdateWithoutUserInputSchema),
				z.lazy(() => TokenUncheckedUpdateWithoutUserInputSchema),
			]),
			create: z.union([
				z.lazy(() => TokenCreateWithoutUserInputSchema),
				z.lazy(() => TokenUncheckedCreateWithoutUserInputSchema),
			]),
		})
		.strict();

export const TokenUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.TokenUpdateWithWhereUniqueWithoutUserInput> =
	z
		.object({
			where: z.lazy(() => TokenWhereUniqueInputSchema),
			data: z.union([
				z.lazy(() => TokenUpdateWithoutUserInputSchema),
				z.lazy(() => TokenUncheckedUpdateWithoutUserInputSchema),
			]),
		})
		.strict();

export const TokenUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.TokenUpdateManyWithWhereWithoutUserInput> =
	z
		.object({
			where: z.lazy(() => TokenScalarWhereInputSchema),
			data: z.union([
				z.lazy(() => TokenUpdateManyMutationInputSchema),
				z.lazy(() => TokenUncheckedUpdateManyWithoutUserInputSchema),
			]),
		})
		.strict();

export const TokenScalarWhereInputSchema: z.ZodType<Prisma.TokenScalarWhereInput> =
	z
		.object({
			AND: z
				.union([
					z.lazy(() => TokenScalarWhereInputSchema),
					z.lazy(() => TokenScalarWhereInputSchema).array(),
				])
				.optional(),
			OR: z
				.lazy(() => TokenScalarWhereInputSchema)
				.array()
				.optional(),
			NOT: z
				.union([
					z.lazy(() => TokenScalarWhereInputSchema),
					z.lazy(() => TokenScalarWhereInputSchema).array(),
				])
				.optional(),
			id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
			type: z
				.union([
					z.lazy(() => EnumTokenTypeFilterSchema),
					z.lazy(() => TokenTypeSchema),
				])
				.optional(),
			createdAt: z
				.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
				.optional(),
			userId: z
				.union([z.lazy(() => StringFilterSchema), z.string()])
				.optional(),
		})
		.strict();

export const AccountUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AccountUpsertWithWhereUniqueWithoutUserInput> =
	z
		.object({
			where: z.lazy(() => AccountWhereUniqueInputSchema),
			update: z.union([
				z.lazy(() => AccountUpdateWithoutUserInputSchema),
				z.lazy(() => AccountUncheckedUpdateWithoutUserInputSchema),
			]),
			create: z.union([
				z.lazy(() => AccountCreateWithoutUserInputSchema),
				z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),
			]),
		})
		.strict();

export const AccountUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateWithWhereUniqueWithoutUserInput> =
	z
		.object({
			where: z.lazy(() => AccountWhereUniqueInputSchema),
			data: z.union([
				z.lazy(() => AccountUpdateWithoutUserInputSchema),
				z.lazy(() => AccountUncheckedUpdateWithoutUserInputSchema),
			]),
		})
		.strict();

export const AccountUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateManyWithWhereWithoutUserInput> =
	z
		.object({
			where: z.lazy(() => AccountScalarWhereInputSchema),
			data: z.union([
				z.lazy(() => AccountUpdateManyMutationInputSchema),
				z.lazy(() => AccountUncheckedUpdateManyWithoutUserInputSchema),
			]),
		})
		.strict();

export const AccountScalarWhereInputSchema: z.ZodType<Prisma.AccountScalarWhereInput> =
	z
		.object({
			AND: z
				.union([
					z.lazy(() => AccountScalarWhereInputSchema),
					z.lazy(() => AccountScalarWhereInputSchema).array(),
				])
				.optional(),
			OR: z
				.lazy(() => AccountScalarWhereInputSchema)
				.array()
				.optional(),
			NOT: z
				.union([
					z.lazy(() => AccountScalarWhereInputSchema),
					z.lazy(() => AccountScalarWhereInputSchema).array(),
				])
				.optional(),
			id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
			provider: z
				.union([
					z.lazy(() => EnumAccountProviderFilterSchema),
					z.lazy(() => AccountProviderSchema),
				])
				.optional(),
			providerAccountId: z
				.union([z.lazy(() => StringFilterSchema), z.string()])
				.optional(),
			userId: z
				.union([z.lazy(() => StringFilterSchema), z.string()])
				.optional(),
		})
		.strict();

export const InviteUpsertWithWhereUniqueWithoutAuthorInputSchema: z.ZodType<Prisma.InviteUpsertWithWhereUniqueWithoutAuthorInput> =
	z
		.object({
			where: z.lazy(() => InviteWhereUniqueInputSchema),
			update: z.union([
				z.lazy(() => InviteUpdateWithoutAuthorInputSchema),
				z.lazy(() => InviteUncheckedUpdateWithoutAuthorInputSchema),
			]),
			create: z.union([
				z.lazy(() => InviteCreateWithoutAuthorInputSchema),
				z.lazy(() => InviteUncheckedCreateWithoutAuthorInputSchema),
			]),
		})
		.strict();

export const InviteUpdateWithWhereUniqueWithoutAuthorInputSchema: z.ZodType<Prisma.InviteUpdateWithWhereUniqueWithoutAuthorInput> =
	z
		.object({
			where: z.lazy(() => InviteWhereUniqueInputSchema),
			data: z.union([
				z.lazy(() => InviteUpdateWithoutAuthorInputSchema),
				z.lazy(() => InviteUncheckedUpdateWithoutAuthorInputSchema),
			]),
		})
		.strict();

export const InviteUpdateManyWithWhereWithoutAuthorInputSchema: z.ZodType<Prisma.InviteUpdateManyWithWhereWithoutAuthorInput> =
	z
		.object({
			where: z.lazy(() => InviteScalarWhereInputSchema),
			data: z.union([
				z.lazy(() => InviteUpdateManyMutationInputSchema),
				z.lazy(() => InviteUncheckedUpdateManyWithoutAuthorInputSchema),
			]),
		})
		.strict();

export const InviteScalarWhereInputSchema: z.ZodType<Prisma.InviteScalarWhereInput> =
	z
		.object({
			AND: z
				.union([
					z.lazy(() => InviteScalarWhereInputSchema),
					z.lazy(() => InviteScalarWhereInputSchema).array(),
				])
				.optional(),
			OR: z
				.lazy(() => InviteScalarWhereInputSchema)
				.array()
				.optional(),
			NOT: z
				.union([
					z.lazy(() => InviteScalarWhereInputSchema),
					z.lazy(() => InviteScalarWhereInputSchema).array(),
				])
				.optional(),
			id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
			email: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
			role: z
				.union([z.lazy(() => EnumRoleFilterSchema), z.lazy(() => RoleSchema)])
				.optional(),
			createdAt: z
				.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
				.optional(),
			authorId: z
				.union([z.lazy(() => StringNullableFilterSchema), z.string()])
				.optional()
				.nullable(),
			organizationId: z
				.union([z.lazy(() => StringFilterSchema), z.string()])
				.optional(),
		})
		.strict();

export const MemberUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.MemberUpsertWithWhereUniqueWithoutUserInput> =
	z
		.object({
			where: z.lazy(() => MemberWhereUniqueInputSchema),
			update: z.union([
				z.lazy(() => MemberUpdateWithoutUserInputSchema),
				z.lazy(() => MemberUncheckedUpdateWithoutUserInputSchema),
			]),
			create: z.union([
				z.lazy(() => MemberCreateWithoutUserInputSchema),
				z.lazy(() => MemberUncheckedCreateWithoutUserInputSchema),
			]),
		})
		.strict();

export const MemberUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.MemberUpdateWithWhereUniqueWithoutUserInput> =
	z
		.object({
			where: z.lazy(() => MemberWhereUniqueInputSchema),
			data: z.union([
				z.lazy(() => MemberUpdateWithoutUserInputSchema),
				z.lazy(() => MemberUncheckedUpdateWithoutUserInputSchema),
			]),
		})
		.strict();

export const MemberUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.MemberUpdateManyWithWhereWithoutUserInput> =
	z
		.object({
			where: z.lazy(() => MemberScalarWhereInputSchema),
			data: z.union([
				z.lazy(() => MemberUpdateManyMutationInputSchema),
				z.lazy(() => MemberUncheckedUpdateManyWithoutUserInputSchema),
			]),
		})
		.strict();

export const MemberScalarWhereInputSchema: z.ZodType<Prisma.MemberScalarWhereInput> =
	z
		.object({
			AND: z
				.union([
					z.lazy(() => MemberScalarWhereInputSchema),
					z.lazy(() => MemberScalarWhereInputSchema).array(),
				])
				.optional(),
			OR: z
				.lazy(() => MemberScalarWhereInputSchema)
				.array()
				.optional(),
			NOT: z
				.union([
					z.lazy(() => MemberScalarWhereInputSchema),
					z.lazy(() => MemberScalarWhereInputSchema).array(),
				])
				.optional(),
			id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
			role: z
				.union([z.lazy(() => EnumRoleFilterSchema), z.lazy(() => RoleSchema)])
				.optional(),
			specialty: z
				.union([z.lazy(() => StringNullableFilterSchema), z.string()])
				.optional()
				.nullable(),
			organizationId: z
				.union([z.lazy(() => StringFilterSchema), z.string()])
				.optional(),
			userId: z
				.union([z.lazy(() => StringFilterSchema), z.string()])
				.optional(),
		})
		.strict();

export const OrganizationUpsertWithWhereUniqueWithoutOwnerInputSchema: z.ZodType<Prisma.OrganizationUpsertWithWhereUniqueWithoutOwnerInput> =
	z
		.object({
			where: z.lazy(() => OrganizationWhereUniqueInputSchema),
			update: z.union([
				z.lazy(() => OrganizationUpdateWithoutOwnerInputSchema),
				z.lazy(() => OrganizationUncheckedUpdateWithoutOwnerInputSchema),
			]),
			create: z.union([
				z.lazy(() => OrganizationCreateWithoutOwnerInputSchema),
				z.lazy(() => OrganizationUncheckedCreateWithoutOwnerInputSchema),
			]),
		})
		.strict();

export const OrganizationUpdateWithWhereUniqueWithoutOwnerInputSchema: z.ZodType<Prisma.OrganizationUpdateWithWhereUniqueWithoutOwnerInput> =
	z
		.object({
			where: z.lazy(() => OrganizationWhereUniqueInputSchema),
			data: z.union([
				z.lazy(() => OrganizationUpdateWithoutOwnerInputSchema),
				z.lazy(() => OrganizationUncheckedUpdateWithoutOwnerInputSchema),
			]),
		})
		.strict();

export const OrganizationUpdateManyWithWhereWithoutOwnerInputSchema: z.ZodType<Prisma.OrganizationUpdateManyWithWhereWithoutOwnerInput> =
	z
		.object({
			where: z.lazy(() => OrganizationScalarWhereInputSchema),
			data: z.union([
				z.lazy(() => OrganizationUpdateManyMutationInputSchema),
				z.lazy(() => OrganizationUncheckedUpdateManyWithoutOwnerInputSchema),
			]),
		})
		.strict();

export const OrganizationScalarWhereInputSchema: z.ZodType<Prisma.OrganizationScalarWhereInput> =
	z
		.object({
			AND: z
				.union([
					z.lazy(() => OrganizationScalarWhereInputSchema),
					z.lazy(() => OrganizationScalarWhereInputSchema).array(),
				])
				.optional(),
			OR: z
				.lazy(() => OrganizationScalarWhereInputSchema)
				.array()
				.optional(),
			NOT: z
				.union([
					z.lazy(() => OrganizationScalarWhereInputSchema),
					z.lazy(() => OrganizationScalarWhereInputSchema).array(),
				])
				.optional(),
			id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
			name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
			slug: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
			domain: z
				.union([z.lazy(() => StringNullableFilterSchema), z.string()])
				.optional()
				.nullable(),
			shouldAttachUsersByDomain: z
				.union([z.lazy(() => BoolFilterSchema), z.boolean()])
				.optional(),
			avatarUrl: z
				.union([z.lazy(() => StringNullableFilterSchema), z.string()])
				.optional()
				.nullable(),
			createdAt: z
				.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
				.optional(),
			updatedAt: z
				.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
				.optional(),
			ownerId: z
				.union([z.lazy(() => StringFilterSchema), z.string()])
				.optional(),
		})
		.strict();

export const UserCreateWithoutTokensInputSchema: z.ZodType<Prisma.UserCreateWithoutTokensInput> =
	z
		.object({
			id: z.string().optional(),
			name: z.string().optional().nullable(),
			email: z.string(),
			passwordHash: z.string().optional().nullable(),
			avatarUrl: z.string().optional().nullable(),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
			accounts: z
				.lazy(() => AccountCreateNestedManyWithoutUserInputSchema)
				.optional(),
			invites: z
				.lazy(() => InviteCreateNestedManyWithoutAuthorInputSchema)
				.optional(),
			member_on: z
				.lazy(() => MemberCreateNestedManyWithoutUserInputSchema)
				.optional(),
			owns_organizations: z
				.lazy(() => OrganizationCreateNestedManyWithoutOwnerInputSchema)
				.optional(),
		})
		.strict();

export const UserUncheckedCreateWithoutTokensInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutTokensInput> =
	z
		.object({
			id: z.string().optional(),
			name: z.string().optional().nullable(),
			email: z.string(),
			passwordHash: z.string().optional().nullable(),
			avatarUrl: z.string().optional().nullable(),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
			accounts: z
				.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema)
				.optional(),
			invites: z
				.lazy(() => InviteUncheckedCreateNestedManyWithoutAuthorInputSchema)
				.optional(),
			member_on: z
				.lazy(() => MemberUncheckedCreateNestedManyWithoutUserInputSchema)
				.optional(),
			owns_organizations: z
				.lazy(
					() => OrganizationUncheckedCreateNestedManyWithoutOwnerInputSchema,
				)
				.optional(),
		})
		.strict();

export const UserCreateOrConnectWithoutTokensInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutTokensInput> =
	z
		.object({
			where: z.lazy(() => UserWhereUniqueInputSchema),
			create: z.union([
				z.lazy(() => UserCreateWithoutTokensInputSchema),
				z.lazy(() => UserUncheckedCreateWithoutTokensInputSchema),
			]),
		})
		.strict();

export const UserUpsertWithoutTokensInputSchema: z.ZodType<Prisma.UserUpsertWithoutTokensInput> =
	z
		.object({
			update: z.union([
				z.lazy(() => UserUpdateWithoutTokensInputSchema),
				z.lazy(() => UserUncheckedUpdateWithoutTokensInputSchema),
			]),
			create: z.union([
				z.lazy(() => UserCreateWithoutTokensInputSchema),
				z.lazy(() => UserUncheckedCreateWithoutTokensInputSchema),
			]),
			where: z.lazy(() => UserWhereInputSchema).optional(),
		})
		.strict();

export const UserUpdateToOneWithWhereWithoutTokensInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutTokensInput> =
	z
		.object({
			where: z.lazy(() => UserWhereInputSchema).optional(),
			data: z.union([
				z.lazy(() => UserUpdateWithoutTokensInputSchema),
				z.lazy(() => UserUncheckedUpdateWithoutTokensInputSchema),
			]),
		})
		.strict();

export const UserUpdateWithoutTokensInputSchema: z.ZodType<Prisma.UserUpdateWithoutTokensInput> =
	z
		.object({
			id: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			name: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			email: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			passwordHash: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			avatarUrl: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			accounts: z
				.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema)
				.optional(),
			invites: z
				.lazy(() => InviteUpdateManyWithoutAuthorNestedInputSchema)
				.optional(),
			member_on: z
				.lazy(() => MemberUpdateManyWithoutUserNestedInputSchema)
				.optional(),
			owns_organizations: z
				.lazy(() => OrganizationUpdateManyWithoutOwnerNestedInputSchema)
				.optional(),
		})
		.strict();

export const UserUncheckedUpdateWithoutTokensInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutTokensInput> =
	z
		.object({
			id: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			name: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			email: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			passwordHash: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			avatarUrl: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			accounts: z
				.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema)
				.optional(),
			invites: z
				.lazy(() => InviteUncheckedUpdateManyWithoutAuthorNestedInputSchema)
				.optional(),
			member_on: z
				.lazy(() => MemberUncheckedUpdateManyWithoutUserNestedInputSchema)
				.optional(),
			owns_organizations: z
				.lazy(
					() => OrganizationUncheckedUpdateManyWithoutOwnerNestedInputSchema,
				)
				.optional(),
		})
		.strict();

export const UserCreateWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateWithoutAccountsInput> =
	z
		.object({
			id: z.string().optional(),
			name: z.string().optional().nullable(),
			email: z.string(),
			passwordHash: z.string().optional().nullable(),
			avatarUrl: z.string().optional().nullable(),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
			tokens: z
				.lazy(() => TokenCreateNestedManyWithoutUserInputSchema)
				.optional(),
			invites: z
				.lazy(() => InviteCreateNestedManyWithoutAuthorInputSchema)
				.optional(),
			member_on: z
				.lazy(() => MemberCreateNestedManyWithoutUserInputSchema)
				.optional(),
			owns_organizations: z
				.lazy(() => OrganizationCreateNestedManyWithoutOwnerInputSchema)
				.optional(),
		})
		.strict();

export const UserUncheckedCreateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutAccountsInput> =
	z
		.object({
			id: z.string().optional(),
			name: z.string().optional().nullable(),
			email: z.string(),
			passwordHash: z.string().optional().nullable(),
			avatarUrl: z.string().optional().nullable(),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
			tokens: z
				.lazy(() => TokenUncheckedCreateNestedManyWithoutUserInputSchema)
				.optional(),
			invites: z
				.lazy(() => InviteUncheckedCreateNestedManyWithoutAuthorInputSchema)
				.optional(),
			member_on: z
				.lazy(() => MemberUncheckedCreateNestedManyWithoutUserInputSchema)
				.optional(),
			owns_organizations: z
				.lazy(
					() => OrganizationUncheckedCreateNestedManyWithoutOwnerInputSchema,
				)
				.optional(),
		})
		.strict();

export const UserCreateOrConnectWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutAccountsInput> =
	z
		.object({
			where: z.lazy(() => UserWhereUniqueInputSchema),
			create: z.union([
				z.lazy(() => UserCreateWithoutAccountsInputSchema),
				z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema),
			]),
		})
		.strict();

export const UserUpsertWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpsertWithoutAccountsInput> =
	z
		.object({
			update: z.union([
				z.lazy(() => UserUpdateWithoutAccountsInputSchema),
				z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema),
			]),
			create: z.union([
				z.lazy(() => UserCreateWithoutAccountsInputSchema),
				z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema),
			]),
			where: z.lazy(() => UserWhereInputSchema).optional(),
		})
		.strict();

export const UserUpdateToOneWithWhereWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutAccountsInput> =
	z
		.object({
			where: z.lazy(() => UserWhereInputSchema).optional(),
			data: z.union([
				z.lazy(() => UserUpdateWithoutAccountsInputSchema),
				z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema),
			]),
		})
		.strict();

export const UserUpdateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpdateWithoutAccountsInput> =
	z
		.object({
			id: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			name: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			email: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			passwordHash: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			avatarUrl: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			tokens: z
				.lazy(() => TokenUpdateManyWithoutUserNestedInputSchema)
				.optional(),
			invites: z
				.lazy(() => InviteUpdateManyWithoutAuthorNestedInputSchema)
				.optional(),
			member_on: z
				.lazy(() => MemberUpdateManyWithoutUserNestedInputSchema)
				.optional(),
			owns_organizations: z
				.lazy(() => OrganizationUpdateManyWithoutOwnerNestedInputSchema)
				.optional(),
		})
		.strict();

export const UserUncheckedUpdateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutAccountsInput> =
	z
		.object({
			id: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			name: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			email: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			passwordHash: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			avatarUrl: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			tokens: z
				.lazy(() => TokenUncheckedUpdateManyWithoutUserNestedInputSchema)
				.optional(),
			invites: z
				.lazy(() => InviteUncheckedUpdateManyWithoutAuthorNestedInputSchema)
				.optional(),
			member_on: z
				.lazy(() => MemberUncheckedUpdateManyWithoutUserNestedInputSchema)
				.optional(),
			owns_organizations: z
				.lazy(
					() => OrganizationUncheckedUpdateManyWithoutOwnerNestedInputSchema,
				)
				.optional(),
		})
		.strict();

export const UserCreateWithoutInvitesInputSchema: z.ZodType<Prisma.UserCreateWithoutInvitesInput> =
	z
		.object({
			id: z.string().optional(),
			name: z.string().optional().nullable(),
			email: z.string(),
			passwordHash: z.string().optional().nullable(),
			avatarUrl: z.string().optional().nullable(),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
			tokens: z
				.lazy(() => TokenCreateNestedManyWithoutUserInputSchema)
				.optional(),
			accounts: z
				.lazy(() => AccountCreateNestedManyWithoutUserInputSchema)
				.optional(),
			member_on: z
				.lazy(() => MemberCreateNestedManyWithoutUserInputSchema)
				.optional(),
			owns_organizations: z
				.lazy(() => OrganizationCreateNestedManyWithoutOwnerInputSchema)
				.optional(),
		})
		.strict();

export const UserUncheckedCreateWithoutInvitesInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutInvitesInput> =
	z
		.object({
			id: z.string().optional(),
			name: z.string().optional().nullable(),
			email: z.string(),
			passwordHash: z.string().optional().nullable(),
			avatarUrl: z.string().optional().nullable(),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
			tokens: z
				.lazy(() => TokenUncheckedCreateNestedManyWithoutUserInputSchema)
				.optional(),
			accounts: z
				.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema)
				.optional(),
			member_on: z
				.lazy(() => MemberUncheckedCreateNestedManyWithoutUserInputSchema)
				.optional(),
			owns_organizations: z
				.lazy(
					() => OrganizationUncheckedCreateNestedManyWithoutOwnerInputSchema,
				)
				.optional(),
		})
		.strict();

export const UserCreateOrConnectWithoutInvitesInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutInvitesInput> =
	z
		.object({
			where: z.lazy(() => UserWhereUniqueInputSchema),
			create: z.union([
				z.lazy(() => UserCreateWithoutInvitesInputSchema),
				z.lazy(() => UserUncheckedCreateWithoutInvitesInputSchema),
			]),
		})
		.strict();

export const OrganizationCreateWithoutInvitesInputSchema: z.ZodType<Prisma.OrganizationCreateWithoutInvitesInput> =
	z
		.object({
			id: z.string().optional(),
			name: z.string(),
			slug: z.string(),
			domain: z.string().optional().nullable(),
			shouldAttachUsersByDomain: z.boolean().optional(),
			avatarUrl: z.string().optional().nullable(),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
			owner: z.lazy(
				() => UserCreateNestedOneWithoutOwns_organizationsInputSchema,
			),
			members: z
				.lazy(() => MemberCreateNestedManyWithoutOrganizationInputSchema)
				.optional(),
			patients: z
				.lazy(() => PatientCreateNestedManyWithoutOrganizationInputSchema)
				.optional(),
		})
		.strict();

export const OrganizationUncheckedCreateWithoutInvitesInputSchema: z.ZodType<Prisma.OrganizationUncheckedCreateWithoutInvitesInput> =
	z
		.object({
			id: z.string().optional(),
			name: z.string(),
			slug: z.string(),
			domain: z.string().optional().nullable(),
			shouldAttachUsersByDomain: z.boolean().optional(),
			avatarUrl: z.string().optional().nullable(),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
			ownerId: z.string(),
			members: z
				.lazy(
					() => MemberUncheckedCreateNestedManyWithoutOrganizationInputSchema,
				)
				.optional(),
			patients: z
				.lazy(
					() => PatientUncheckedCreateNestedManyWithoutOrganizationInputSchema,
				)
				.optional(),
		})
		.strict();

export const OrganizationCreateOrConnectWithoutInvitesInputSchema: z.ZodType<Prisma.OrganizationCreateOrConnectWithoutInvitesInput> =
	z
		.object({
			where: z.lazy(() => OrganizationWhereUniqueInputSchema),
			create: z.union([
				z.lazy(() => OrganizationCreateWithoutInvitesInputSchema),
				z.lazy(() => OrganizationUncheckedCreateWithoutInvitesInputSchema),
			]),
		})
		.strict();

export const UserUpsertWithoutInvitesInputSchema: z.ZodType<Prisma.UserUpsertWithoutInvitesInput> =
	z
		.object({
			update: z.union([
				z.lazy(() => UserUpdateWithoutInvitesInputSchema),
				z.lazy(() => UserUncheckedUpdateWithoutInvitesInputSchema),
			]),
			create: z.union([
				z.lazy(() => UserCreateWithoutInvitesInputSchema),
				z.lazy(() => UserUncheckedCreateWithoutInvitesInputSchema),
			]),
			where: z.lazy(() => UserWhereInputSchema).optional(),
		})
		.strict();

export const UserUpdateToOneWithWhereWithoutInvitesInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutInvitesInput> =
	z
		.object({
			where: z.lazy(() => UserWhereInputSchema).optional(),
			data: z.union([
				z.lazy(() => UserUpdateWithoutInvitesInputSchema),
				z.lazy(() => UserUncheckedUpdateWithoutInvitesInputSchema),
			]),
		})
		.strict();

export const UserUpdateWithoutInvitesInputSchema: z.ZodType<Prisma.UserUpdateWithoutInvitesInput> =
	z
		.object({
			id: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			name: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			email: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			passwordHash: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			avatarUrl: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			tokens: z
				.lazy(() => TokenUpdateManyWithoutUserNestedInputSchema)
				.optional(),
			accounts: z
				.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema)
				.optional(),
			member_on: z
				.lazy(() => MemberUpdateManyWithoutUserNestedInputSchema)
				.optional(),
			owns_organizations: z
				.lazy(() => OrganizationUpdateManyWithoutOwnerNestedInputSchema)
				.optional(),
		})
		.strict();

export const UserUncheckedUpdateWithoutInvitesInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutInvitesInput> =
	z
		.object({
			id: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			name: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			email: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			passwordHash: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			avatarUrl: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			tokens: z
				.lazy(() => TokenUncheckedUpdateManyWithoutUserNestedInputSchema)
				.optional(),
			accounts: z
				.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema)
				.optional(),
			member_on: z
				.lazy(() => MemberUncheckedUpdateManyWithoutUserNestedInputSchema)
				.optional(),
			owns_organizations: z
				.lazy(
					() => OrganizationUncheckedUpdateManyWithoutOwnerNestedInputSchema,
				)
				.optional(),
		})
		.strict();

export const OrganizationUpsertWithoutInvitesInputSchema: z.ZodType<Prisma.OrganizationUpsertWithoutInvitesInput> =
	z
		.object({
			update: z.union([
				z.lazy(() => OrganizationUpdateWithoutInvitesInputSchema),
				z.lazy(() => OrganizationUncheckedUpdateWithoutInvitesInputSchema),
			]),
			create: z.union([
				z.lazy(() => OrganizationCreateWithoutInvitesInputSchema),
				z.lazy(() => OrganizationUncheckedCreateWithoutInvitesInputSchema),
			]),
			where: z.lazy(() => OrganizationWhereInputSchema).optional(),
		})
		.strict();

export const OrganizationUpdateToOneWithWhereWithoutInvitesInputSchema: z.ZodType<Prisma.OrganizationUpdateToOneWithWhereWithoutInvitesInput> =
	z
		.object({
			where: z.lazy(() => OrganizationWhereInputSchema).optional(),
			data: z.union([
				z.lazy(() => OrganizationUpdateWithoutInvitesInputSchema),
				z.lazy(() => OrganizationUncheckedUpdateWithoutInvitesInputSchema),
			]),
		})
		.strict();

export const OrganizationUpdateWithoutInvitesInputSchema: z.ZodType<Prisma.OrganizationUpdateWithoutInvitesInput> =
	z
		.object({
			id: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			name: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			slug: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			domain: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			shouldAttachUsersByDomain: z
				.union([
					z.boolean(),
					z.lazy(() => BoolFieldUpdateOperationsInputSchema),
				])
				.optional(),
			avatarUrl: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			owner: z
				.lazy(
					() => UserUpdateOneRequiredWithoutOwns_organizationsNestedInputSchema,
				)
				.optional(),
			members: z
				.lazy(() => MemberUpdateManyWithoutOrganizationNestedInputSchema)
				.optional(),
			patients: z
				.lazy(() => PatientUpdateManyWithoutOrganizationNestedInputSchema)
				.optional(),
		})
		.strict();

export const OrganizationUncheckedUpdateWithoutInvitesInputSchema: z.ZodType<Prisma.OrganizationUncheckedUpdateWithoutInvitesInput> =
	z
		.object({
			id: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			name: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			slug: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			domain: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			shouldAttachUsersByDomain: z
				.union([
					z.boolean(),
					z.lazy(() => BoolFieldUpdateOperationsInputSchema),
				])
				.optional(),
			avatarUrl: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			ownerId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			members: z
				.lazy(
					() => MemberUncheckedUpdateManyWithoutOrganizationNestedInputSchema,
				)
				.optional(),
			patients: z
				.lazy(
					() => PatientUncheckedUpdateManyWithoutOrganizationNestedInputSchema,
				)
				.optional(),
		})
		.strict();

export const OrganizationCreateWithoutMembersInputSchema: z.ZodType<Prisma.OrganizationCreateWithoutMembersInput> =
	z
		.object({
			id: z.string().optional(),
			name: z.string(),
			slug: z.string(),
			domain: z.string().optional().nullable(),
			shouldAttachUsersByDomain: z.boolean().optional(),
			avatarUrl: z.string().optional().nullable(),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
			owner: z.lazy(
				() => UserCreateNestedOneWithoutOwns_organizationsInputSchema,
			),
			invites: z
				.lazy(() => InviteCreateNestedManyWithoutOrganizationInputSchema)
				.optional(),
			patients: z
				.lazy(() => PatientCreateNestedManyWithoutOrganizationInputSchema)
				.optional(),
		})
		.strict();

export const OrganizationUncheckedCreateWithoutMembersInputSchema: z.ZodType<Prisma.OrganizationUncheckedCreateWithoutMembersInput> =
	z
		.object({
			id: z.string().optional(),
			name: z.string(),
			slug: z.string(),
			domain: z.string().optional().nullable(),
			shouldAttachUsersByDomain: z.boolean().optional(),
			avatarUrl: z.string().optional().nullable(),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
			ownerId: z.string(),
			invites: z
				.lazy(
					() => InviteUncheckedCreateNestedManyWithoutOrganizationInputSchema,
				)
				.optional(),
			patients: z
				.lazy(
					() => PatientUncheckedCreateNestedManyWithoutOrganizationInputSchema,
				)
				.optional(),
		})
		.strict();

export const OrganizationCreateOrConnectWithoutMembersInputSchema: z.ZodType<Prisma.OrganizationCreateOrConnectWithoutMembersInput> =
	z
		.object({
			where: z.lazy(() => OrganizationWhereUniqueInputSchema),
			create: z.union([
				z.lazy(() => OrganizationCreateWithoutMembersInputSchema),
				z.lazy(() => OrganizationUncheckedCreateWithoutMembersInputSchema),
			]),
		})
		.strict();

export const UserCreateWithoutMember_onInputSchema: z.ZodType<Prisma.UserCreateWithoutMember_onInput> =
	z
		.object({
			id: z.string().optional(),
			name: z.string().optional().nullable(),
			email: z.string(),
			passwordHash: z.string().optional().nullable(),
			avatarUrl: z.string().optional().nullable(),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
			tokens: z
				.lazy(() => TokenCreateNestedManyWithoutUserInputSchema)
				.optional(),
			accounts: z
				.lazy(() => AccountCreateNestedManyWithoutUserInputSchema)
				.optional(),
			invites: z
				.lazy(() => InviteCreateNestedManyWithoutAuthorInputSchema)
				.optional(),
			owns_organizations: z
				.lazy(() => OrganizationCreateNestedManyWithoutOwnerInputSchema)
				.optional(),
		})
		.strict();

export const UserUncheckedCreateWithoutMember_onInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutMember_onInput> =
	z
		.object({
			id: z.string().optional(),
			name: z.string().optional().nullable(),
			email: z.string(),
			passwordHash: z.string().optional().nullable(),
			avatarUrl: z.string().optional().nullable(),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
			tokens: z
				.lazy(() => TokenUncheckedCreateNestedManyWithoutUserInputSchema)
				.optional(),
			accounts: z
				.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema)
				.optional(),
			invites: z
				.lazy(() => InviteUncheckedCreateNestedManyWithoutAuthorInputSchema)
				.optional(),
			owns_organizations: z
				.lazy(
					() => OrganizationUncheckedCreateNestedManyWithoutOwnerInputSchema,
				)
				.optional(),
		})
		.strict();

export const UserCreateOrConnectWithoutMember_onInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutMember_onInput> =
	z
		.object({
			where: z.lazy(() => UserWhereUniqueInputSchema),
			create: z.union([
				z.lazy(() => UserCreateWithoutMember_onInputSchema),
				z.lazy(() => UserUncheckedCreateWithoutMember_onInputSchema),
			]),
		})
		.strict();

export const AppointmentCreateWithoutMemberInputSchema: z.ZodType<Prisma.AppointmentCreateWithoutMemberInput> =
	z
		.object({
			id: z.string().optional(),
			startTime: z.coerce.date(),
			endTime: z.coerce.date(),
			description: z.string().optional().nullable(),
			status: z.lazy(() => AppointmentStatusSchema).optional(),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
			patient: z.lazy(
				() => PatientCreateNestedOneWithoutAppointmentsInputSchema,
			),
		})
		.strict();

export const AppointmentUncheckedCreateWithoutMemberInputSchema: z.ZodType<Prisma.AppointmentUncheckedCreateWithoutMemberInput> =
	z
		.object({
			id: z.string().optional(),
			startTime: z.coerce.date(),
			endTime: z.coerce.date(),
			description: z.string().optional().nullable(),
			status: z.lazy(() => AppointmentStatusSchema).optional(),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
			patientId: z.string(),
		})
		.strict();

export const AppointmentCreateOrConnectWithoutMemberInputSchema: z.ZodType<Prisma.AppointmentCreateOrConnectWithoutMemberInput> =
	z
		.object({
			where: z.lazy(() => AppointmentWhereUniqueInputSchema),
			create: z.union([
				z.lazy(() => AppointmentCreateWithoutMemberInputSchema),
				z.lazy(() => AppointmentUncheckedCreateWithoutMemberInputSchema),
			]),
		})
		.strict();

export const AppointmentCreateManyMemberInputEnvelopeSchema: z.ZodType<Prisma.AppointmentCreateManyMemberInputEnvelope> =
	z
		.object({
			data: z.union([
				z.lazy(() => AppointmentCreateManyMemberInputSchema),
				z.lazy(() => AppointmentCreateManyMemberInputSchema).array(),
			]),
			skipDuplicates: z.boolean().optional(),
		})
		.strict();

export const OrganizationUpsertWithoutMembersInputSchema: z.ZodType<Prisma.OrganizationUpsertWithoutMembersInput> =
	z
		.object({
			update: z.union([
				z.lazy(() => OrganizationUpdateWithoutMembersInputSchema),
				z.lazy(() => OrganizationUncheckedUpdateWithoutMembersInputSchema),
			]),
			create: z.union([
				z.lazy(() => OrganizationCreateWithoutMembersInputSchema),
				z.lazy(() => OrganizationUncheckedCreateWithoutMembersInputSchema),
			]),
			where: z.lazy(() => OrganizationWhereInputSchema).optional(),
		})
		.strict();

export const OrganizationUpdateToOneWithWhereWithoutMembersInputSchema: z.ZodType<Prisma.OrganizationUpdateToOneWithWhereWithoutMembersInput> =
	z
		.object({
			where: z.lazy(() => OrganizationWhereInputSchema).optional(),
			data: z.union([
				z.lazy(() => OrganizationUpdateWithoutMembersInputSchema),
				z.lazy(() => OrganizationUncheckedUpdateWithoutMembersInputSchema),
			]),
		})
		.strict();

export const OrganizationUpdateWithoutMembersInputSchema: z.ZodType<Prisma.OrganizationUpdateWithoutMembersInput> =
	z
		.object({
			id: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			name: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			slug: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			domain: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			shouldAttachUsersByDomain: z
				.union([
					z.boolean(),
					z.lazy(() => BoolFieldUpdateOperationsInputSchema),
				])
				.optional(),
			avatarUrl: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			owner: z
				.lazy(
					() => UserUpdateOneRequiredWithoutOwns_organizationsNestedInputSchema,
				)
				.optional(),
			invites: z
				.lazy(() => InviteUpdateManyWithoutOrganizationNestedInputSchema)
				.optional(),
			patients: z
				.lazy(() => PatientUpdateManyWithoutOrganizationNestedInputSchema)
				.optional(),
		})
		.strict();

export const OrganizationUncheckedUpdateWithoutMembersInputSchema: z.ZodType<Prisma.OrganizationUncheckedUpdateWithoutMembersInput> =
	z
		.object({
			id: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			name: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			slug: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			domain: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			shouldAttachUsersByDomain: z
				.union([
					z.boolean(),
					z.lazy(() => BoolFieldUpdateOperationsInputSchema),
				])
				.optional(),
			avatarUrl: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			ownerId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			invites: z
				.lazy(
					() => InviteUncheckedUpdateManyWithoutOrganizationNestedInputSchema,
				)
				.optional(),
			patients: z
				.lazy(
					() => PatientUncheckedUpdateManyWithoutOrganizationNestedInputSchema,
				)
				.optional(),
		})
		.strict();

export const UserUpsertWithoutMember_onInputSchema: z.ZodType<Prisma.UserUpsertWithoutMember_onInput> =
	z
		.object({
			update: z.union([
				z.lazy(() => UserUpdateWithoutMember_onInputSchema),
				z.lazy(() => UserUncheckedUpdateWithoutMember_onInputSchema),
			]),
			create: z.union([
				z.lazy(() => UserCreateWithoutMember_onInputSchema),
				z.lazy(() => UserUncheckedCreateWithoutMember_onInputSchema),
			]),
			where: z.lazy(() => UserWhereInputSchema).optional(),
		})
		.strict();

export const UserUpdateToOneWithWhereWithoutMember_onInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutMember_onInput> =
	z
		.object({
			where: z.lazy(() => UserWhereInputSchema).optional(),
			data: z.union([
				z.lazy(() => UserUpdateWithoutMember_onInputSchema),
				z.lazy(() => UserUncheckedUpdateWithoutMember_onInputSchema),
			]),
		})
		.strict();

export const UserUpdateWithoutMember_onInputSchema: z.ZodType<Prisma.UserUpdateWithoutMember_onInput> =
	z
		.object({
			id: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			name: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			email: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			passwordHash: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			avatarUrl: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			tokens: z
				.lazy(() => TokenUpdateManyWithoutUserNestedInputSchema)
				.optional(),
			accounts: z
				.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema)
				.optional(),
			invites: z
				.lazy(() => InviteUpdateManyWithoutAuthorNestedInputSchema)
				.optional(),
			owns_organizations: z
				.lazy(() => OrganizationUpdateManyWithoutOwnerNestedInputSchema)
				.optional(),
		})
		.strict();

export const UserUncheckedUpdateWithoutMember_onInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutMember_onInput> =
	z
		.object({
			id: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			name: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			email: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			passwordHash: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			avatarUrl: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			tokens: z
				.lazy(() => TokenUncheckedUpdateManyWithoutUserNestedInputSchema)
				.optional(),
			accounts: z
				.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema)
				.optional(),
			invites: z
				.lazy(() => InviteUncheckedUpdateManyWithoutAuthorNestedInputSchema)
				.optional(),
			owns_organizations: z
				.lazy(
					() => OrganizationUncheckedUpdateManyWithoutOwnerNestedInputSchema,
				)
				.optional(),
		})
		.strict();

export const AppointmentUpsertWithWhereUniqueWithoutMemberInputSchema: z.ZodType<Prisma.AppointmentUpsertWithWhereUniqueWithoutMemberInput> =
	z
		.object({
			where: z.lazy(() => AppointmentWhereUniqueInputSchema),
			update: z.union([
				z.lazy(() => AppointmentUpdateWithoutMemberInputSchema),
				z.lazy(() => AppointmentUncheckedUpdateWithoutMemberInputSchema),
			]),
			create: z.union([
				z.lazy(() => AppointmentCreateWithoutMemberInputSchema),
				z.lazy(() => AppointmentUncheckedCreateWithoutMemberInputSchema),
			]),
		})
		.strict();

export const AppointmentUpdateWithWhereUniqueWithoutMemberInputSchema: z.ZodType<Prisma.AppointmentUpdateWithWhereUniqueWithoutMemberInput> =
	z
		.object({
			where: z.lazy(() => AppointmentWhereUniqueInputSchema),
			data: z.union([
				z.lazy(() => AppointmentUpdateWithoutMemberInputSchema),
				z.lazy(() => AppointmentUncheckedUpdateWithoutMemberInputSchema),
			]),
		})
		.strict();

export const AppointmentUpdateManyWithWhereWithoutMemberInputSchema: z.ZodType<Prisma.AppointmentUpdateManyWithWhereWithoutMemberInput> =
	z
		.object({
			where: z.lazy(() => AppointmentScalarWhereInputSchema),
			data: z.union([
				z.lazy(() => AppointmentUpdateManyMutationInputSchema),
				z.lazy(() => AppointmentUncheckedUpdateManyWithoutMemberInputSchema),
			]),
		})
		.strict();

export const AppointmentScalarWhereInputSchema: z.ZodType<Prisma.AppointmentScalarWhereInput> =
	z
		.object({
			AND: z
				.union([
					z.lazy(() => AppointmentScalarWhereInputSchema),
					z.lazy(() => AppointmentScalarWhereInputSchema).array(),
				])
				.optional(),
			OR: z
				.lazy(() => AppointmentScalarWhereInputSchema)
				.array()
				.optional(),
			NOT: z
				.union([
					z.lazy(() => AppointmentScalarWhereInputSchema),
					z.lazy(() => AppointmentScalarWhereInputSchema).array(),
				])
				.optional(),
			id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
			startTime: z
				.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
				.optional(),
			endTime: z
				.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
				.optional(),
			description: z
				.union([z.lazy(() => StringNullableFilterSchema), z.string()])
				.optional()
				.nullable(),
			status: z
				.union([
					z.lazy(() => EnumAppointmentStatusFilterSchema),
					z.lazy(() => AppointmentStatusSchema),
				])
				.optional(),
			createdAt: z
				.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
				.optional(),
			updatedAt: z
				.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
				.optional(),
			patientId: z
				.union([z.lazy(() => StringFilterSchema), z.string()])
				.optional(),
			memberId: z
				.union([z.lazy(() => StringFilterSchema), z.string()])
				.optional(),
		})
		.strict();

export const AppointmentCreateWithoutPatientInputSchema: z.ZodType<Prisma.AppointmentCreateWithoutPatientInput> =
	z
		.object({
			id: z.string().optional(),
			startTime: z.coerce.date(),
			endTime: z.coerce.date(),
			description: z.string().optional().nullable(),
			status: z.lazy(() => AppointmentStatusSchema).optional(),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
			member: z.lazy(() => MemberCreateNestedOneWithoutAppointmentsInputSchema),
		})
		.strict();

export const AppointmentUncheckedCreateWithoutPatientInputSchema: z.ZodType<Prisma.AppointmentUncheckedCreateWithoutPatientInput> =
	z
		.object({
			id: z.string().optional(),
			startTime: z.coerce.date(),
			endTime: z.coerce.date(),
			description: z.string().optional().nullable(),
			status: z.lazy(() => AppointmentStatusSchema).optional(),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
			memberId: z.string(),
		})
		.strict();

export const AppointmentCreateOrConnectWithoutPatientInputSchema: z.ZodType<Prisma.AppointmentCreateOrConnectWithoutPatientInput> =
	z
		.object({
			where: z.lazy(() => AppointmentWhereUniqueInputSchema),
			create: z.union([
				z.lazy(() => AppointmentCreateWithoutPatientInputSchema),
				z.lazy(() => AppointmentUncheckedCreateWithoutPatientInputSchema),
			]),
		})
		.strict();

export const AppointmentCreateManyPatientInputEnvelopeSchema: z.ZodType<Prisma.AppointmentCreateManyPatientInputEnvelope> =
	z
		.object({
			data: z.union([
				z.lazy(() => AppointmentCreateManyPatientInputSchema),
				z.lazy(() => AppointmentCreateManyPatientInputSchema).array(),
			]),
			skipDuplicates: z.boolean().optional(),
		})
		.strict();

export const OrganizationCreateWithoutPatientsInputSchema: z.ZodType<Prisma.OrganizationCreateWithoutPatientsInput> =
	z
		.object({
			id: z.string().optional(),
			name: z.string(),
			slug: z.string(),
			domain: z.string().optional().nullable(),
			shouldAttachUsersByDomain: z.boolean().optional(),
			avatarUrl: z.string().optional().nullable(),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
			owner: z.lazy(
				() => UserCreateNestedOneWithoutOwns_organizationsInputSchema,
			),
			invites: z
				.lazy(() => InviteCreateNestedManyWithoutOrganizationInputSchema)
				.optional(),
			members: z
				.lazy(() => MemberCreateNestedManyWithoutOrganizationInputSchema)
				.optional(),
		})
		.strict();

export const OrganizationUncheckedCreateWithoutPatientsInputSchema: z.ZodType<Prisma.OrganizationUncheckedCreateWithoutPatientsInput> =
	z
		.object({
			id: z.string().optional(),
			name: z.string(),
			slug: z.string(),
			domain: z.string().optional().nullable(),
			shouldAttachUsersByDomain: z.boolean().optional(),
			avatarUrl: z.string().optional().nullable(),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
			ownerId: z.string(),
			invites: z
				.lazy(
					() => InviteUncheckedCreateNestedManyWithoutOrganizationInputSchema,
				)
				.optional(),
			members: z
				.lazy(
					() => MemberUncheckedCreateNestedManyWithoutOrganizationInputSchema,
				)
				.optional(),
		})
		.strict();

export const OrganizationCreateOrConnectWithoutPatientsInputSchema: z.ZodType<Prisma.OrganizationCreateOrConnectWithoutPatientsInput> =
	z
		.object({
			where: z.lazy(() => OrganizationWhereUniqueInputSchema),
			create: z.union([
				z.lazy(() => OrganizationCreateWithoutPatientsInputSchema),
				z.lazy(() => OrganizationUncheckedCreateWithoutPatientsInputSchema),
			]),
		})
		.strict();

export const AppointmentUpsertWithWhereUniqueWithoutPatientInputSchema: z.ZodType<Prisma.AppointmentUpsertWithWhereUniqueWithoutPatientInput> =
	z
		.object({
			where: z.lazy(() => AppointmentWhereUniqueInputSchema),
			update: z.union([
				z.lazy(() => AppointmentUpdateWithoutPatientInputSchema),
				z.lazy(() => AppointmentUncheckedUpdateWithoutPatientInputSchema),
			]),
			create: z.union([
				z.lazy(() => AppointmentCreateWithoutPatientInputSchema),
				z.lazy(() => AppointmentUncheckedCreateWithoutPatientInputSchema),
			]),
		})
		.strict();

export const AppointmentUpdateWithWhereUniqueWithoutPatientInputSchema: z.ZodType<Prisma.AppointmentUpdateWithWhereUniqueWithoutPatientInput> =
	z
		.object({
			where: z.lazy(() => AppointmentWhereUniqueInputSchema),
			data: z.union([
				z.lazy(() => AppointmentUpdateWithoutPatientInputSchema),
				z.lazy(() => AppointmentUncheckedUpdateWithoutPatientInputSchema),
			]),
		})
		.strict();

export const AppointmentUpdateManyWithWhereWithoutPatientInputSchema: z.ZodType<Prisma.AppointmentUpdateManyWithWhereWithoutPatientInput> =
	z
		.object({
			where: z.lazy(() => AppointmentScalarWhereInputSchema),
			data: z.union([
				z.lazy(() => AppointmentUpdateManyMutationInputSchema),
				z.lazy(() => AppointmentUncheckedUpdateManyWithoutPatientInputSchema),
			]),
		})
		.strict();

export const OrganizationUpsertWithoutPatientsInputSchema: z.ZodType<Prisma.OrganizationUpsertWithoutPatientsInput> =
	z
		.object({
			update: z.union([
				z.lazy(() => OrganizationUpdateWithoutPatientsInputSchema),
				z.lazy(() => OrganizationUncheckedUpdateWithoutPatientsInputSchema),
			]),
			create: z.union([
				z.lazy(() => OrganizationCreateWithoutPatientsInputSchema),
				z.lazy(() => OrganizationUncheckedCreateWithoutPatientsInputSchema),
			]),
			where: z.lazy(() => OrganizationWhereInputSchema).optional(),
		})
		.strict();

export const OrganizationUpdateToOneWithWhereWithoutPatientsInputSchema: z.ZodType<Prisma.OrganizationUpdateToOneWithWhereWithoutPatientsInput> =
	z
		.object({
			where: z.lazy(() => OrganizationWhereInputSchema).optional(),
			data: z.union([
				z.lazy(() => OrganizationUpdateWithoutPatientsInputSchema),
				z.lazy(() => OrganizationUncheckedUpdateWithoutPatientsInputSchema),
			]),
		})
		.strict();

export const OrganizationUpdateWithoutPatientsInputSchema: z.ZodType<Prisma.OrganizationUpdateWithoutPatientsInput> =
	z
		.object({
			id: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			name: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			slug: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			domain: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			shouldAttachUsersByDomain: z
				.union([
					z.boolean(),
					z.lazy(() => BoolFieldUpdateOperationsInputSchema),
				])
				.optional(),
			avatarUrl: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			owner: z
				.lazy(
					() => UserUpdateOneRequiredWithoutOwns_organizationsNestedInputSchema,
				)
				.optional(),
			invites: z
				.lazy(() => InviteUpdateManyWithoutOrganizationNestedInputSchema)
				.optional(),
			members: z
				.lazy(() => MemberUpdateManyWithoutOrganizationNestedInputSchema)
				.optional(),
		})
		.strict();

export const OrganizationUncheckedUpdateWithoutPatientsInputSchema: z.ZodType<Prisma.OrganizationUncheckedUpdateWithoutPatientsInput> =
	z
		.object({
			id: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			name: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			slug: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			domain: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			shouldAttachUsersByDomain: z
				.union([
					z.boolean(),
					z.lazy(() => BoolFieldUpdateOperationsInputSchema),
				])
				.optional(),
			avatarUrl: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			ownerId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			invites: z
				.lazy(
					() => InviteUncheckedUpdateManyWithoutOrganizationNestedInputSchema,
				)
				.optional(),
			members: z
				.lazy(
					() => MemberUncheckedUpdateManyWithoutOrganizationNestedInputSchema,
				)
				.optional(),
		})
		.strict();

export const PatientCreateWithoutAppointmentsInputSchema: z.ZodType<Prisma.PatientCreateWithoutAppointmentsInput> =
	z
		.object({
			id: z.string().optional(),
			name: z.string(),
			email: z.string().optional().nullable(),
			phone: z.string().optional().nullable(),
			birthDate: z.coerce.date(),
			address: z.string().optional().nullable(),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
			organization: z.lazy(
				() => OrganizationCreateNestedOneWithoutPatientsInputSchema,
			),
		})
		.strict();

export const PatientUncheckedCreateWithoutAppointmentsInputSchema: z.ZodType<Prisma.PatientUncheckedCreateWithoutAppointmentsInput> =
	z
		.object({
			id: z.string().optional(),
			name: z.string(),
			email: z.string().optional().nullable(),
			phone: z.string().optional().nullable(),
			birthDate: z.coerce.date(),
			address: z.string().optional().nullable(),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
			organizationId: z.string(),
		})
		.strict();

export const PatientCreateOrConnectWithoutAppointmentsInputSchema: z.ZodType<Prisma.PatientCreateOrConnectWithoutAppointmentsInput> =
	z
		.object({
			where: z.lazy(() => PatientWhereUniqueInputSchema),
			create: z.union([
				z.lazy(() => PatientCreateWithoutAppointmentsInputSchema),
				z.lazy(() => PatientUncheckedCreateWithoutAppointmentsInputSchema),
			]),
		})
		.strict();

export const MemberCreateWithoutAppointmentsInputSchema: z.ZodType<Prisma.MemberCreateWithoutAppointmentsInput> =
	z
		.object({
			id: z.string().optional(),
			role: z.lazy(() => RoleSchema).optional(),
			specialty: z.string().optional().nullable(),
			organization: z.lazy(
				() => OrganizationCreateNestedOneWithoutMembersInputSchema,
			),
			user: z.lazy(() => UserCreateNestedOneWithoutMember_onInputSchema),
		})
		.strict();

export const MemberUncheckedCreateWithoutAppointmentsInputSchema: z.ZodType<Prisma.MemberUncheckedCreateWithoutAppointmentsInput> =
	z
		.object({
			id: z.string().optional(),
			role: z.lazy(() => RoleSchema).optional(),
			specialty: z.string().optional().nullable(),
			organizationId: z.string(),
			userId: z.string(),
		})
		.strict();

export const MemberCreateOrConnectWithoutAppointmentsInputSchema: z.ZodType<Prisma.MemberCreateOrConnectWithoutAppointmentsInput> =
	z
		.object({
			where: z.lazy(() => MemberWhereUniqueInputSchema),
			create: z.union([
				z.lazy(() => MemberCreateWithoutAppointmentsInputSchema),
				z.lazy(() => MemberUncheckedCreateWithoutAppointmentsInputSchema),
			]),
		})
		.strict();

export const PatientUpsertWithoutAppointmentsInputSchema: z.ZodType<Prisma.PatientUpsertWithoutAppointmentsInput> =
	z
		.object({
			update: z.union([
				z.lazy(() => PatientUpdateWithoutAppointmentsInputSchema),
				z.lazy(() => PatientUncheckedUpdateWithoutAppointmentsInputSchema),
			]),
			create: z.union([
				z.lazy(() => PatientCreateWithoutAppointmentsInputSchema),
				z.lazy(() => PatientUncheckedCreateWithoutAppointmentsInputSchema),
			]),
			where: z.lazy(() => PatientWhereInputSchema).optional(),
		})
		.strict();

export const PatientUpdateToOneWithWhereWithoutAppointmentsInputSchema: z.ZodType<Prisma.PatientUpdateToOneWithWhereWithoutAppointmentsInput> =
	z
		.object({
			where: z.lazy(() => PatientWhereInputSchema).optional(),
			data: z.union([
				z.lazy(() => PatientUpdateWithoutAppointmentsInputSchema),
				z.lazy(() => PatientUncheckedUpdateWithoutAppointmentsInputSchema),
			]),
		})
		.strict();

export const PatientUpdateWithoutAppointmentsInputSchema: z.ZodType<Prisma.PatientUpdateWithoutAppointmentsInput> =
	z
		.object({
			id: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			name: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			email: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			phone: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			birthDate: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			address: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			organization: z
				.lazy(
					() => OrganizationUpdateOneRequiredWithoutPatientsNestedInputSchema,
				)
				.optional(),
		})
		.strict();

export const PatientUncheckedUpdateWithoutAppointmentsInputSchema: z.ZodType<Prisma.PatientUncheckedUpdateWithoutAppointmentsInput> =
	z
		.object({
			id: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			name: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			email: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			phone: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			birthDate: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			address: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			organizationId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const MemberUpsertWithoutAppointmentsInputSchema: z.ZodType<Prisma.MemberUpsertWithoutAppointmentsInput> =
	z
		.object({
			update: z.union([
				z.lazy(() => MemberUpdateWithoutAppointmentsInputSchema),
				z.lazy(() => MemberUncheckedUpdateWithoutAppointmentsInputSchema),
			]),
			create: z.union([
				z.lazy(() => MemberCreateWithoutAppointmentsInputSchema),
				z.lazy(() => MemberUncheckedCreateWithoutAppointmentsInputSchema),
			]),
			where: z.lazy(() => MemberWhereInputSchema).optional(),
		})
		.strict();

export const MemberUpdateToOneWithWhereWithoutAppointmentsInputSchema: z.ZodType<Prisma.MemberUpdateToOneWithWhereWithoutAppointmentsInput> =
	z
		.object({
			where: z.lazy(() => MemberWhereInputSchema).optional(),
			data: z.union([
				z.lazy(() => MemberUpdateWithoutAppointmentsInputSchema),
				z.lazy(() => MemberUncheckedUpdateWithoutAppointmentsInputSchema),
			]),
		})
		.strict();

export const MemberUpdateWithoutAppointmentsInputSchema: z.ZodType<Prisma.MemberUpdateWithoutAppointmentsInput> =
	z
		.object({
			id: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			role: z
				.union([
					z.lazy(() => RoleSchema),
					z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema),
				])
				.optional(),
			specialty: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			organization: z
				.lazy(
					() => OrganizationUpdateOneRequiredWithoutMembersNestedInputSchema,
				)
				.optional(),
			user: z
				.lazy(() => UserUpdateOneRequiredWithoutMember_onNestedInputSchema)
				.optional(),
		})
		.strict();

export const MemberUncheckedUpdateWithoutAppointmentsInputSchema: z.ZodType<Prisma.MemberUncheckedUpdateWithoutAppointmentsInput> =
	z
		.object({
			id: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			role: z
				.union([
					z.lazy(() => RoleSchema),
					z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema),
				])
				.optional(),
			specialty: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			organizationId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			userId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const UserCreateWithoutOwns_organizationsInputSchema: z.ZodType<Prisma.UserCreateWithoutOwns_organizationsInput> =
	z
		.object({
			id: z.string().optional(),
			name: z.string().optional().nullable(),
			email: z.string(),
			passwordHash: z.string().optional().nullable(),
			avatarUrl: z.string().optional().nullable(),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
			tokens: z
				.lazy(() => TokenCreateNestedManyWithoutUserInputSchema)
				.optional(),
			accounts: z
				.lazy(() => AccountCreateNestedManyWithoutUserInputSchema)
				.optional(),
			invites: z
				.lazy(() => InviteCreateNestedManyWithoutAuthorInputSchema)
				.optional(),
			member_on: z
				.lazy(() => MemberCreateNestedManyWithoutUserInputSchema)
				.optional(),
		})
		.strict();

export const UserUncheckedCreateWithoutOwns_organizationsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutOwns_organizationsInput> =
	z
		.object({
			id: z.string().optional(),
			name: z.string().optional().nullable(),
			email: z.string(),
			passwordHash: z.string().optional().nullable(),
			avatarUrl: z.string().optional().nullable(),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
			tokens: z
				.lazy(() => TokenUncheckedCreateNestedManyWithoutUserInputSchema)
				.optional(),
			accounts: z
				.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema)
				.optional(),
			invites: z
				.lazy(() => InviteUncheckedCreateNestedManyWithoutAuthorInputSchema)
				.optional(),
			member_on: z
				.lazy(() => MemberUncheckedCreateNestedManyWithoutUserInputSchema)
				.optional(),
		})
		.strict();

export const UserCreateOrConnectWithoutOwns_organizationsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutOwns_organizationsInput> =
	z
		.object({
			where: z.lazy(() => UserWhereUniqueInputSchema),
			create: z.union([
				z.lazy(() => UserCreateWithoutOwns_organizationsInputSchema),
				z.lazy(() => UserUncheckedCreateWithoutOwns_organizationsInputSchema),
			]),
		})
		.strict();

export const InviteCreateWithoutOrganizationInputSchema: z.ZodType<Prisma.InviteCreateWithoutOrganizationInput> =
	z
		.object({
			id: z.string().optional(),
			email: z.string(),
			role: z.lazy(() => RoleSchema),
			createdAt: z.coerce.date().optional(),
			author: z
				.lazy(() => UserCreateNestedOneWithoutInvitesInputSchema)
				.optional(),
		})
		.strict();

export const InviteUncheckedCreateWithoutOrganizationInputSchema: z.ZodType<Prisma.InviteUncheckedCreateWithoutOrganizationInput> =
	z
		.object({
			id: z.string().optional(),
			email: z.string(),
			role: z.lazy(() => RoleSchema),
			createdAt: z.coerce.date().optional(),
			authorId: z.string().optional().nullable(),
		})
		.strict();

export const InviteCreateOrConnectWithoutOrganizationInputSchema: z.ZodType<Prisma.InviteCreateOrConnectWithoutOrganizationInput> =
	z
		.object({
			where: z.lazy(() => InviteWhereUniqueInputSchema),
			create: z.union([
				z.lazy(() => InviteCreateWithoutOrganizationInputSchema),
				z.lazy(() => InviteUncheckedCreateWithoutOrganizationInputSchema),
			]),
		})
		.strict();

export const InviteCreateManyOrganizationInputEnvelopeSchema: z.ZodType<Prisma.InviteCreateManyOrganizationInputEnvelope> =
	z
		.object({
			data: z.union([
				z.lazy(() => InviteCreateManyOrganizationInputSchema),
				z.lazy(() => InviteCreateManyOrganizationInputSchema).array(),
			]),
			skipDuplicates: z.boolean().optional(),
		})
		.strict();

export const MemberCreateWithoutOrganizationInputSchema: z.ZodType<Prisma.MemberCreateWithoutOrganizationInput> =
	z
		.object({
			id: z.string().optional(),
			role: z.lazy(() => RoleSchema).optional(),
			specialty: z.string().optional().nullable(),
			user: z.lazy(() => UserCreateNestedOneWithoutMember_onInputSchema),
			appointments: z
				.lazy(() => AppointmentCreateNestedManyWithoutMemberInputSchema)
				.optional(),
		})
		.strict();

export const MemberUncheckedCreateWithoutOrganizationInputSchema: z.ZodType<Prisma.MemberUncheckedCreateWithoutOrganizationInput> =
	z
		.object({
			id: z.string().optional(),
			role: z.lazy(() => RoleSchema).optional(),
			specialty: z.string().optional().nullable(),
			userId: z.string(),
			appointments: z
				.lazy(
					() => AppointmentUncheckedCreateNestedManyWithoutMemberInputSchema,
				)
				.optional(),
		})
		.strict();

export const MemberCreateOrConnectWithoutOrganizationInputSchema: z.ZodType<Prisma.MemberCreateOrConnectWithoutOrganizationInput> =
	z
		.object({
			where: z.lazy(() => MemberWhereUniqueInputSchema),
			create: z.union([
				z.lazy(() => MemberCreateWithoutOrganizationInputSchema),
				z.lazy(() => MemberUncheckedCreateWithoutOrganizationInputSchema),
			]),
		})
		.strict();

export const MemberCreateManyOrganizationInputEnvelopeSchema: z.ZodType<Prisma.MemberCreateManyOrganizationInputEnvelope> =
	z
		.object({
			data: z.union([
				z.lazy(() => MemberCreateManyOrganizationInputSchema),
				z.lazy(() => MemberCreateManyOrganizationInputSchema).array(),
			]),
			skipDuplicates: z.boolean().optional(),
		})
		.strict();

export const PatientCreateWithoutOrganizationInputSchema: z.ZodType<Prisma.PatientCreateWithoutOrganizationInput> =
	z
		.object({
			id: z.string().optional(),
			name: z.string(),
			email: z.string().optional().nullable(),
			phone: z.string().optional().nullable(),
			birthDate: z.coerce.date(),
			address: z.string().optional().nullable(),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
			appointments: z
				.lazy(() => AppointmentCreateNestedManyWithoutPatientInputSchema)
				.optional(),
		})
		.strict();

export const PatientUncheckedCreateWithoutOrganizationInputSchema: z.ZodType<Prisma.PatientUncheckedCreateWithoutOrganizationInput> =
	z
		.object({
			id: z.string().optional(),
			name: z.string(),
			email: z.string().optional().nullable(),
			phone: z.string().optional().nullable(),
			birthDate: z.coerce.date(),
			address: z.string().optional().nullable(),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
			appointments: z
				.lazy(
					() => AppointmentUncheckedCreateNestedManyWithoutPatientInputSchema,
				)
				.optional(),
		})
		.strict();

export const PatientCreateOrConnectWithoutOrganizationInputSchema: z.ZodType<Prisma.PatientCreateOrConnectWithoutOrganizationInput> =
	z
		.object({
			where: z.lazy(() => PatientWhereUniqueInputSchema),
			create: z.union([
				z.lazy(() => PatientCreateWithoutOrganizationInputSchema),
				z.lazy(() => PatientUncheckedCreateWithoutOrganizationInputSchema),
			]),
		})
		.strict();

export const PatientCreateManyOrganizationInputEnvelopeSchema: z.ZodType<Prisma.PatientCreateManyOrganizationInputEnvelope> =
	z
		.object({
			data: z.union([
				z.lazy(() => PatientCreateManyOrganizationInputSchema),
				z.lazy(() => PatientCreateManyOrganizationInputSchema).array(),
			]),
			skipDuplicates: z.boolean().optional(),
		})
		.strict();

export const UserUpsertWithoutOwns_organizationsInputSchema: z.ZodType<Prisma.UserUpsertWithoutOwns_organizationsInput> =
	z
		.object({
			update: z.union([
				z.lazy(() => UserUpdateWithoutOwns_organizationsInputSchema),
				z.lazy(() => UserUncheckedUpdateWithoutOwns_organizationsInputSchema),
			]),
			create: z.union([
				z.lazy(() => UserCreateWithoutOwns_organizationsInputSchema),
				z.lazy(() => UserUncheckedCreateWithoutOwns_organizationsInputSchema),
			]),
			where: z.lazy(() => UserWhereInputSchema).optional(),
		})
		.strict();

export const UserUpdateToOneWithWhereWithoutOwns_organizationsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutOwns_organizationsInput> =
	z
		.object({
			where: z.lazy(() => UserWhereInputSchema).optional(),
			data: z.union([
				z.lazy(() => UserUpdateWithoutOwns_organizationsInputSchema),
				z.lazy(() => UserUncheckedUpdateWithoutOwns_organizationsInputSchema),
			]),
		})
		.strict();

export const UserUpdateWithoutOwns_organizationsInputSchema: z.ZodType<Prisma.UserUpdateWithoutOwns_organizationsInput> =
	z
		.object({
			id: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			name: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			email: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			passwordHash: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			avatarUrl: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			tokens: z
				.lazy(() => TokenUpdateManyWithoutUserNestedInputSchema)
				.optional(),
			accounts: z
				.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema)
				.optional(),
			invites: z
				.lazy(() => InviteUpdateManyWithoutAuthorNestedInputSchema)
				.optional(),
			member_on: z
				.lazy(() => MemberUpdateManyWithoutUserNestedInputSchema)
				.optional(),
		})
		.strict();

export const UserUncheckedUpdateWithoutOwns_organizationsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutOwns_organizationsInput> =
	z
		.object({
			id: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			name: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			email: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			passwordHash: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			avatarUrl: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			tokens: z
				.lazy(() => TokenUncheckedUpdateManyWithoutUserNestedInputSchema)
				.optional(),
			accounts: z
				.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema)
				.optional(),
			invites: z
				.lazy(() => InviteUncheckedUpdateManyWithoutAuthorNestedInputSchema)
				.optional(),
			member_on: z
				.lazy(() => MemberUncheckedUpdateManyWithoutUserNestedInputSchema)
				.optional(),
		})
		.strict();

export const InviteUpsertWithWhereUniqueWithoutOrganizationInputSchema: z.ZodType<Prisma.InviteUpsertWithWhereUniqueWithoutOrganizationInput> =
	z
		.object({
			where: z.lazy(() => InviteWhereUniqueInputSchema),
			update: z.union([
				z.lazy(() => InviteUpdateWithoutOrganizationInputSchema),
				z.lazy(() => InviteUncheckedUpdateWithoutOrganizationInputSchema),
			]),
			create: z.union([
				z.lazy(() => InviteCreateWithoutOrganizationInputSchema),
				z.lazy(() => InviteUncheckedCreateWithoutOrganizationInputSchema),
			]),
		})
		.strict();

export const InviteUpdateWithWhereUniqueWithoutOrganizationInputSchema: z.ZodType<Prisma.InviteUpdateWithWhereUniqueWithoutOrganizationInput> =
	z
		.object({
			where: z.lazy(() => InviteWhereUniqueInputSchema),
			data: z.union([
				z.lazy(() => InviteUpdateWithoutOrganizationInputSchema),
				z.lazy(() => InviteUncheckedUpdateWithoutOrganizationInputSchema),
			]),
		})
		.strict();

export const InviteUpdateManyWithWhereWithoutOrganizationInputSchema: z.ZodType<Prisma.InviteUpdateManyWithWhereWithoutOrganizationInput> =
	z
		.object({
			where: z.lazy(() => InviteScalarWhereInputSchema),
			data: z.union([
				z.lazy(() => InviteUpdateManyMutationInputSchema),
				z.lazy(() => InviteUncheckedUpdateManyWithoutOrganizationInputSchema),
			]),
		})
		.strict();

export const MemberUpsertWithWhereUniqueWithoutOrganizationInputSchema: z.ZodType<Prisma.MemberUpsertWithWhereUniqueWithoutOrganizationInput> =
	z
		.object({
			where: z.lazy(() => MemberWhereUniqueInputSchema),
			update: z.union([
				z.lazy(() => MemberUpdateWithoutOrganizationInputSchema),
				z.lazy(() => MemberUncheckedUpdateWithoutOrganizationInputSchema),
			]),
			create: z.union([
				z.lazy(() => MemberCreateWithoutOrganizationInputSchema),
				z.lazy(() => MemberUncheckedCreateWithoutOrganizationInputSchema),
			]),
		})
		.strict();

export const MemberUpdateWithWhereUniqueWithoutOrganizationInputSchema: z.ZodType<Prisma.MemberUpdateWithWhereUniqueWithoutOrganizationInput> =
	z
		.object({
			where: z.lazy(() => MemberWhereUniqueInputSchema),
			data: z.union([
				z.lazy(() => MemberUpdateWithoutOrganizationInputSchema),
				z.lazy(() => MemberUncheckedUpdateWithoutOrganizationInputSchema),
			]),
		})
		.strict();

export const MemberUpdateManyWithWhereWithoutOrganizationInputSchema: z.ZodType<Prisma.MemberUpdateManyWithWhereWithoutOrganizationInput> =
	z
		.object({
			where: z.lazy(() => MemberScalarWhereInputSchema),
			data: z.union([
				z.lazy(() => MemberUpdateManyMutationInputSchema),
				z.lazy(() => MemberUncheckedUpdateManyWithoutOrganizationInputSchema),
			]),
		})
		.strict();

export const PatientUpsertWithWhereUniqueWithoutOrganizationInputSchema: z.ZodType<Prisma.PatientUpsertWithWhereUniqueWithoutOrganizationInput> =
	z
		.object({
			where: z.lazy(() => PatientWhereUniqueInputSchema),
			update: z.union([
				z.lazy(() => PatientUpdateWithoutOrganizationInputSchema),
				z.lazy(() => PatientUncheckedUpdateWithoutOrganizationInputSchema),
			]),
			create: z.union([
				z.lazy(() => PatientCreateWithoutOrganizationInputSchema),
				z.lazy(() => PatientUncheckedCreateWithoutOrganizationInputSchema),
			]),
		})
		.strict();

export const PatientUpdateWithWhereUniqueWithoutOrganizationInputSchema: z.ZodType<Prisma.PatientUpdateWithWhereUniqueWithoutOrganizationInput> =
	z
		.object({
			where: z.lazy(() => PatientWhereUniqueInputSchema),
			data: z.union([
				z.lazy(() => PatientUpdateWithoutOrganizationInputSchema),
				z.lazy(() => PatientUncheckedUpdateWithoutOrganizationInputSchema),
			]),
		})
		.strict();

export const PatientUpdateManyWithWhereWithoutOrganizationInputSchema: z.ZodType<Prisma.PatientUpdateManyWithWhereWithoutOrganizationInput> =
	z
		.object({
			where: z.lazy(() => PatientScalarWhereInputSchema),
			data: z.union([
				z.lazy(() => PatientUpdateManyMutationInputSchema),
				z.lazy(() => PatientUncheckedUpdateManyWithoutOrganizationInputSchema),
			]),
		})
		.strict();

export const PatientScalarWhereInputSchema: z.ZodType<Prisma.PatientScalarWhereInput> =
	z
		.object({
			AND: z
				.union([
					z.lazy(() => PatientScalarWhereInputSchema),
					z.lazy(() => PatientScalarWhereInputSchema).array(),
				])
				.optional(),
			OR: z
				.lazy(() => PatientScalarWhereInputSchema)
				.array()
				.optional(),
			NOT: z
				.union([
					z.lazy(() => PatientScalarWhereInputSchema),
					z.lazy(() => PatientScalarWhereInputSchema).array(),
				])
				.optional(),
			id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
			name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
			email: z
				.union([z.lazy(() => StringNullableFilterSchema), z.string()])
				.optional()
				.nullable(),
			phone: z
				.union([z.lazy(() => StringNullableFilterSchema), z.string()])
				.optional()
				.nullable(),
			birthDate: z
				.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
				.optional(),
			address: z
				.union([z.lazy(() => StringNullableFilterSchema), z.string()])
				.optional()
				.nullable(),
			createdAt: z
				.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
				.optional(),
			updatedAt: z
				.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
				.optional(),
			organizationId: z
				.union([z.lazy(() => StringFilterSchema), z.string()])
				.optional(),
		})
		.strict();

export const TokenCreateManyUserInputSchema: z.ZodType<Prisma.TokenCreateManyUserInput> =
	z
		.object({
			id: z.string().optional(),
			type: z.lazy(() => TokenTypeSchema),
			createdAt: z.coerce.date().optional(),
		})
		.strict();

export const AccountCreateManyUserInputSchema: z.ZodType<Prisma.AccountCreateManyUserInput> =
	z
		.object({
			id: z.string().optional(),
			provider: z.lazy(() => AccountProviderSchema),
			providerAccountId: z.string(),
		})
		.strict();

export const InviteCreateManyAuthorInputSchema: z.ZodType<Prisma.InviteCreateManyAuthorInput> =
	z
		.object({
			id: z.string().optional(),
			email: z.string(),
			role: z.lazy(() => RoleSchema),
			createdAt: z.coerce.date().optional(),
			organizationId: z.string(),
		})
		.strict();

export const MemberCreateManyUserInputSchema: z.ZodType<Prisma.MemberCreateManyUserInput> =
	z
		.object({
			id: z.string().optional(),
			role: z.lazy(() => RoleSchema).optional(),
			specialty: z.string().optional().nullable(),
			organizationId: z.string(),
		})
		.strict();

export const OrganizationCreateManyOwnerInputSchema: z.ZodType<Prisma.OrganizationCreateManyOwnerInput> =
	z
		.object({
			id: z.string().optional(),
			name: z.string(),
			slug: z.string(),
			domain: z.string().optional().nullable(),
			shouldAttachUsersByDomain: z.boolean().optional(),
			avatarUrl: z.string().optional().nullable(),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
		})
		.strict();

export const TokenUpdateWithoutUserInputSchema: z.ZodType<Prisma.TokenUpdateWithoutUserInput> =
	z
		.object({
			id: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			type: z
				.union([
					z.lazy(() => TokenTypeSchema),
					z.lazy(() => EnumTokenTypeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const TokenUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.TokenUncheckedUpdateWithoutUserInput> =
	z
		.object({
			id: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			type: z
				.union([
					z.lazy(() => TokenTypeSchema),
					z.lazy(() => EnumTokenTypeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const TokenUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.TokenUncheckedUpdateManyWithoutUserInput> =
	z
		.object({
			id: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			type: z
				.union([
					z.lazy(() => TokenTypeSchema),
					z.lazy(() => EnumTokenTypeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const AccountUpdateWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateWithoutUserInput> =
	z
		.object({
			id: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			provider: z
				.union([
					z.lazy(() => AccountProviderSchema),
					z.lazy(() => EnumAccountProviderFieldUpdateOperationsInputSchema),
				])
				.optional(),
			providerAccountId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const AccountUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateWithoutUserInput> =
	z
		.object({
			id: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			provider: z
				.union([
					z.lazy(() => AccountProviderSchema),
					z.lazy(() => EnumAccountProviderFieldUpdateOperationsInputSchema),
				])
				.optional(),
			providerAccountId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const AccountUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyWithoutUserInput> =
	z
		.object({
			id: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			provider: z
				.union([
					z.lazy(() => AccountProviderSchema),
					z.lazy(() => EnumAccountProviderFieldUpdateOperationsInputSchema),
				])
				.optional(),
			providerAccountId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const InviteUpdateWithoutAuthorInputSchema: z.ZodType<Prisma.InviteUpdateWithoutAuthorInput> =
	z
		.object({
			id: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			email: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			role: z
				.union([
					z.lazy(() => RoleSchema),
					z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			organization: z
				.lazy(
					() => OrganizationUpdateOneRequiredWithoutInvitesNestedInputSchema,
				)
				.optional(),
		})
		.strict();

export const InviteUncheckedUpdateWithoutAuthorInputSchema: z.ZodType<Prisma.InviteUncheckedUpdateWithoutAuthorInput> =
	z
		.object({
			id: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			email: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			role: z
				.union([
					z.lazy(() => RoleSchema),
					z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			organizationId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const InviteUncheckedUpdateManyWithoutAuthorInputSchema: z.ZodType<Prisma.InviteUncheckedUpdateManyWithoutAuthorInput> =
	z
		.object({
			id: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			email: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			role: z
				.union([
					z.lazy(() => RoleSchema),
					z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			organizationId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const MemberUpdateWithoutUserInputSchema: z.ZodType<Prisma.MemberUpdateWithoutUserInput> =
	z
		.object({
			id: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			role: z
				.union([
					z.lazy(() => RoleSchema),
					z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema),
				])
				.optional(),
			specialty: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			organization: z
				.lazy(
					() => OrganizationUpdateOneRequiredWithoutMembersNestedInputSchema,
				)
				.optional(),
			appointments: z
				.lazy(() => AppointmentUpdateManyWithoutMemberNestedInputSchema)
				.optional(),
		})
		.strict();

export const MemberUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.MemberUncheckedUpdateWithoutUserInput> =
	z
		.object({
			id: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			role: z
				.union([
					z.lazy(() => RoleSchema),
					z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema),
				])
				.optional(),
			specialty: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			organizationId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			appointments: z
				.lazy(
					() => AppointmentUncheckedUpdateManyWithoutMemberNestedInputSchema,
				)
				.optional(),
		})
		.strict();

export const MemberUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.MemberUncheckedUpdateManyWithoutUserInput> =
	z
		.object({
			id: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			role: z
				.union([
					z.lazy(() => RoleSchema),
					z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema),
				])
				.optional(),
			specialty: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			organizationId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const OrganizationUpdateWithoutOwnerInputSchema: z.ZodType<Prisma.OrganizationUpdateWithoutOwnerInput> =
	z
		.object({
			id: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			name: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			slug: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			domain: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			shouldAttachUsersByDomain: z
				.union([
					z.boolean(),
					z.lazy(() => BoolFieldUpdateOperationsInputSchema),
				])
				.optional(),
			avatarUrl: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			invites: z
				.lazy(() => InviteUpdateManyWithoutOrganizationNestedInputSchema)
				.optional(),
			members: z
				.lazy(() => MemberUpdateManyWithoutOrganizationNestedInputSchema)
				.optional(),
			patients: z
				.lazy(() => PatientUpdateManyWithoutOrganizationNestedInputSchema)
				.optional(),
		})
		.strict();

export const OrganizationUncheckedUpdateWithoutOwnerInputSchema: z.ZodType<Prisma.OrganizationUncheckedUpdateWithoutOwnerInput> =
	z
		.object({
			id: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			name: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			slug: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			domain: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			shouldAttachUsersByDomain: z
				.union([
					z.boolean(),
					z.lazy(() => BoolFieldUpdateOperationsInputSchema),
				])
				.optional(),
			avatarUrl: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			invites: z
				.lazy(
					() => InviteUncheckedUpdateManyWithoutOrganizationNestedInputSchema,
				)
				.optional(),
			members: z
				.lazy(
					() => MemberUncheckedUpdateManyWithoutOrganizationNestedInputSchema,
				)
				.optional(),
			patients: z
				.lazy(
					() => PatientUncheckedUpdateManyWithoutOrganizationNestedInputSchema,
				)
				.optional(),
		})
		.strict();

export const OrganizationUncheckedUpdateManyWithoutOwnerInputSchema: z.ZodType<Prisma.OrganizationUncheckedUpdateManyWithoutOwnerInput> =
	z
		.object({
			id: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			name: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			slug: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			domain: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			shouldAttachUsersByDomain: z
				.union([
					z.boolean(),
					z.lazy(() => BoolFieldUpdateOperationsInputSchema),
				])
				.optional(),
			avatarUrl: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const AppointmentCreateManyMemberInputSchema: z.ZodType<Prisma.AppointmentCreateManyMemberInput> =
	z
		.object({
			id: z.string().optional(),
			startTime: z.coerce.date(),
			endTime: z.coerce.date(),
			description: z.string().optional().nullable(),
			status: z.lazy(() => AppointmentStatusSchema).optional(),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
			patientId: z.string(),
		})
		.strict();

export const AppointmentUpdateWithoutMemberInputSchema: z.ZodType<Prisma.AppointmentUpdateWithoutMemberInput> =
	z
		.object({
			id: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			startTime: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			endTime: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			description: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			status: z
				.union([
					z.lazy(() => AppointmentStatusSchema),
					z.lazy(() => EnumAppointmentStatusFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			patient: z
				.lazy(
					() => PatientUpdateOneRequiredWithoutAppointmentsNestedInputSchema,
				)
				.optional(),
		})
		.strict();

export const AppointmentUncheckedUpdateWithoutMemberInputSchema: z.ZodType<Prisma.AppointmentUncheckedUpdateWithoutMemberInput> =
	z
		.object({
			id: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			startTime: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			endTime: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			description: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			status: z
				.union([
					z.lazy(() => AppointmentStatusSchema),
					z.lazy(() => EnumAppointmentStatusFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			patientId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const AppointmentUncheckedUpdateManyWithoutMemberInputSchema: z.ZodType<Prisma.AppointmentUncheckedUpdateManyWithoutMemberInput> =
	z
		.object({
			id: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			startTime: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			endTime: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			description: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			status: z
				.union([
					z.lazy(() => AppointmentStatusSchema),
					z.lazy(() => EnumAppointmentStatusFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			patientId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const AppointmentCreateManyPatientInputSchema: z.ZodType<Prisma.AppointmentCreateManyPatientInput> =
	z
		.object({
			id: z.string().optional(),
			startTime: z.coerce.date(),
			endTime: z.coerce.date(),
			description: z.string().optional().nullable(),
			status: z.lazy(() => AppointmentStatusSchema).optional(),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
			memberId: z.string(),
		})
		.strict();

export const AppointmentUpdateWithoutPatientInputSchema: z.ZodType<Prisma.AppointmentUpdateWithoutPatientInput> =
	z
		.object({
			id: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			startTime: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			endTime: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			description: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			status: z
				.union([
					z.lazy(() => AppointmentStatusSchema),
					z.lazy(() => EnumAppointmentStatusFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			member: z
				.lazy(() => MemberUpdateOneRequiredWithoutAppointmentsNestedInputSchema)
				.optional(),
		})
		.strict();

export const AppointmentUncheckedUpdateWithoutPatientInputSchema: z.ZodType<Prisma.AppointmentUncheckedUpdateWithoutPatientInput> =
	z
		.object({
			id: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			startTime: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			endTime: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			description: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			status: z
				.union([
					z.lazy(() => AppointmentStatusSchema),
					z.lazy(() => EnumAppointmentStatusFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			memberId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const AppointmentUncheckedUpdateManyWithoutPatientInputSchema: z.ZodType<Prisma.AppointmentUncheckedUpdateManyWithoutPatientInput> =
	z
		.object({
			id: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			startTime: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			endTime: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			description: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			status: z
				.union([
					z.lazy(() => AppointmentStatusSchema),
					z.lazy(() => EnumAppointmentStatusFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			memberId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const InviteCreateManyOrganizationInputSchema: z.ZodType<Prisma.InviteCreateManyOrganizationInput> =
	z
		.object({
			id: z.string().optional(),
			email: z.string(),
			role: z.lazy(() => RoleSchema),
			createdAt: z.coerce.date().optional(),
			authorId: z.string().optional().nullable(),
		})
		.strict();

export const MemberCreateManyOrganizationInputSchema: z.ZodType<Prisma.MemberCreateManyOrganizationInput> =
	z
		.object({
			id: z.string().optional(),
			role: z.lazy(() => RoleSchema).optional(),
			specialty: z.string().optional().nullable(),
			userId: z.string(),
		})
		.strict();

export const PatientCreateManyOrganizationInputSchema: z.ZodType<Prisma.PatientCreateManyOrganizationInput> =
	z
		.object({
			id: z.string().optional(),
			name: z.string(),
			email: z.string().optional().nullable(),
			phone: z.string().optional().nullable(),
			birthDate: z.coerce.date(),
			address: z.string().optional().nullable(),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
		})
		.strict();

export const InviteUpdateWithoutOrganizationInputSchema: z.ZodType<Prisma.InviteUpdateWithoutOrganizationInput> =
	z
		.object({
			id: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			email: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			role: z
				.union([
					z.lazy(() => RoleSchema),
					z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			author: z
				.lazy(() => UserUpdateOneWithoutInvitesNestedInputSchema)
				.optional(),
		})
		.strict();

export const InviteUncheckedUpdateWithoutOrganizationInputSchema: z.ZodType<Prisma.InviteUncheckedUpdateWithoutOrganizationInput> =
	z
		.object({
			id: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			email: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			role: z
				.union([
					z.lazy(() => RoleSchema),
					z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			authorId: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
		})
		.strict();

export const InviteUncheckedUpdateManyWithoutOrganizationInputSchema: z.ZodType<Prisma.InviteUncheckedUpdateManyWithoutOrganizationInput> =
	z
		.object({
			id: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			email: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			role: z
				.union([
					z.lazy(() => RoleSchema),
					z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			authorId: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
		})
		.strict();

export const MemberUpdateWithoutOrganizationInputSchema: z.ZodType<Prisma.MemberUpdateWithoutOrganizationInput> =
	z
		.object({
			id: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			role: z
				.union([
					z.lazy(() => RoleSchema),
					z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema),
				])
				.optional(),
			specialty: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			user: z
				.lazy(() => UserUpdateOneRequiredWithoutMember_onNestedInputSchema)
				.optional(),
			appointments: z
				.lazy(() => AppointmentUpdateManyWithoutMemberNestedInputSchema)
				.optional(),
		})
		.strict();

export const MemberUncheckedUpdateWithoutOrganizationInputSchema: z.ZodType<Prisma.MemberUncheckedUpdateWithoutOrganizationInput> =
	z
		.object({
			id: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			role: z
				.union([
					z.lazy(() => RoleSchema),
					z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema),
				])
				.optional(),
			specialty: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			userId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			appointments: z
				.lazy(
					() => AppointmentUncheckedUpdateManyWithoutMemberNestedInputSchema,
				)
				.optional(),
		})
		.strict();

export const MemberUncheckedUpdateManyWithoutOrganizationInputSchema: z.ZodType<Prisma.MemberUncheckedUpdateManyWithoutOrganizationInput> =
	z
		.object({
			id: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			role: z
				.union([
					z.lazy(() => RoleSchema),
					z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema),
				])
				.optional(),
			specialty: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			userId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const PatientUpdateWithoutOrganizationInputSchema: z.ZodType<Prisma.PatientUpdateWithoutOrganizationInput> =
	z
		.object({
			id: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			name: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			email: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			phone: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			birthDate: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			address: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			appointments: z
				.lazy(() => AppointmentUpdateManyWithoutPatientNestedInputSchema)
				.optional(),
		})
		.strict();

export const PatientUncheckedUpdateWithoutOrganizationInputSchema: z.ZodType<Prisma.PatientUncheckedUpdateWithoutOrganizationInput> =
	z
		.object({
			id: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			name: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			email: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			phone: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			birthDate: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			address: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			appointments: z
				.lazy(
					() => AppointmentUncheckedUpdateManyWithoutPatientNestedInputSchema,
				)
				.optional(),
		})
		.strict();

export const PatientUncheckedUpdateManyWithoutOrganizationInputSchema: z.ZodType<Prisma.PatientUncheckedUpdateManyWithoutOrganizationInput> =
	z
		.object({
			id: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			name: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			email: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			phone: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			birthDate: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			address: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
				])
				.optional()
				.nullable(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z
	.object({
		select: UserSelectSchema.optional(),
		include: UserIncludeSchema.optional(),
		where: UserWhereInputSchema.optional(),
		orderBy: z
			.union([
				UserOrderByWithRelationInputSchema.array(),
				UserOrderByWithRelationInputSchema,
			])
			.optional(),
		cursor: UserWhereUniqueInputSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
		distinct: z
			.union([UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array()])
			.optional(),
	})
	.strict();

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> =
	z
		.object({
			select: UserSelectSchema.optional(),
			include: UserIncludeSchema.optional(),
			where: UserWhereInputSchema.optional(),
			orderBy: z
				.union([
					UserOrderByWithRelationInputSchema.array(),
					UserOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: UserWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
			distinct: z
				.union([UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array()])
				.optional(),
		})
		.strict();

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z
	.object({
		select: UserSelectSchema.optional(),
		include: UserIncludeSchema.optional(),
		where: UserWhereInputSchema.optional(),
		orderBy: z
			.union([
				UserOrderByWithRelationInputSchema.array(),
				UserOrderByWithRelationInputSchema,
			])
			.optional(),
		cursor: UserWhereUniqueInputSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
		distinct: z
			.union([UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array()])
			.optional(),
	})
	.strict();

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z
	.object({
		where: UserWhereInputSchema.optional(),
		orderBy: z
			.union([
				UserOrderByWithRelationInputSchema.array(),
				UserOrderByWithRelationInputSchema,
			])
			.optional(),
		cursor: UserWhereUniqueInputSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
	})
	.strict();

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z
	.object({
		where: UserWhereInputSchema.optional(),
		orderBy: z
			.union([
				UserOrderByWithAggregationInputSchema.array(),
				UserOrderByWithAggregationInputSchema,
			])
			.optional(),
		by: UserScalarFieldEnumSchema.array(),
		having: UserScalarWhereWithAggregatesInputSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
	})
	.strict();

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z
	.object({
		select: UserSelectSchema.optional(),
		include: UserIncludeSchema.optional(),
		where: UserWhereUniqueInputSchema,
	})
	.strict();

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> =
	z
		.object({
			select: UserSelectSchema.optional(),
			include: UserIncludeSchema.optional(),
			where: UserWhereUniqueInputSchema,
		})
		.strict();

export const TokenFindFirstArgsSchema: z.ZodType<Prisma.TokenFindFirstArgs> = z
	.object({
		select: TokenSelectSchema.optional(),
		include: TokenIncludeSchema.optional(),
		where: TokenWhereInputSchema.optional(),
		orderBy: z
			.union([
				TokenOrderByWithRelationInputSchema.array(),
				TokenOrderByWithRelationInputSchema,
			])
			.optional(),
		cursor: TokenWhereUniqueInputSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
		distinct: z
			.union([TokenScalarFieldEnumSchema, TokenScalarFieldEnumSchema.array()])
			.optional(),
	})
	.strict();

export const TokenFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TokenFindFirstOrThrowArgs> =
	z
		.object({
			select: TokenSelectSchema.optional(),
			include: TokenIncludeSchema.optional(),
			where: TokenWhereInputSchema.optional(),
			orderBy: z
				.union([
					TokenOrderByWithRelationInputSchema.array(),
					TokenOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: TokenWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
			distinct: z
				.union([TokenScalarFieldEnumSchema, TokenScalarFieldEnumSchema.array()])
				.optional(),
		})
		.strict();

export const TokenFindManyArgsSchema: z.ZodType<Prisma.TokenFindManyArgs> = z
	.object({
		select: TokenSelectSchema.optional(),
		include: TokenIncludeSchema.optional(),
		where: TokenWhereInputSchema.optional(),
		orderBy: z
			.union([
				TokenOrderByWithRelationInputSchema.array(),
				TokenOrderByWithRelationInputSchema,
			])
			.optional(),
		cursor: TokenWhereUniqueInputSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
		distinct: z
			.union([TokenScalarFieldEnumSchema, TokenScalarFieldEnumSchema.array()])
			.optional(),
	})
	.strict();

export const TokenAggregateArgsSchema: z.ZodType<Prisma.TokenAggregateArgs> = z
	.object({
		where: TokenWhereInputSchema.optional(),
		orderBy: z
			.union([
				TokenOrderByWithRelationInputSchema.array(),
				TokenOrderByWithRelationInputSchema,
			])
			.optional(),
		cursor: TokenWhereUniqueInputSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
	})
	.strict();

export const TokenGroupByArgsSchema: z.ZodType<Prisma.TokenGroupByArgs> = z
	.object({
		where: TokenWhereInputSchema.optional(),
		orderBy: z
			.union([
				TokenOrderByWithAggregationInputSchema.array(),
				TokenOrderByWithAggregationInputSchema,
			])
			.optional(),
		by: TokenScalarFieldEnumSchema.array(),
		having: TokenScalarWhereWithAggregatesInputSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
	})
	.strict();

export const TokenFindUniqueArgsSchema: z.ZodType<Prisma.TokenFindUniqueArgs> =
	z
		.object({
			select: TokenSelectSchema.optional(),
			include: TokenIncludeSchema.optional(),
			where: TokenWhereUniqueInputSchema,
		})
		.strict();

export const TokenFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TokenFindUniqueOrThrowArgs> =
	z
		.object({
			select: TokenSelectSchema.optional(),
			include: TokenIncludeSchema.optional(),
			where: TokenWhereUniqueInputSchema,
		})
		.strict();

export const AccountFindFirstArgsSchema: z.ZodType<Prisma.AccountFindFirstArgs> =
	z
		.object({
			select: AccountSelectSchema.optional(),
			include: AccountIncludeSchema.optional(),
			where: AccountWhereInputSchema.optional(),
			orderBy: z
				.union([
					AccountOrderByWithRelationInputSchema.array(),
					AccountOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: AccountWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
			distinct: z
				.union([
					AccountScalarFieldEnumSchema,
					AccountScalarFieldEnumSchema.array(),
				])
				.optional(),
		})
		.strict();

export const AccountFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AccountFindFirstOrThrowArgs> =
	z
		.object({
			select: AccountSelectSchema.optional(),
			include: AccountIncludeSchema.optional(),
			where: AccountWhereInputSchema.optional(),
			orderBy: z
				.union([
					AccountOrderByWithRelationInputSchema.array(),
					AccountOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: AccountWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
			distinct: z
				.union([
					AccountScalarFieldEnumSchema,
					AccountScalarFieldEnumSchema.array(),
				])
				.optional(),
		})
		.strict();

export const AccountFindManyArgsSchema: z.ZodType<Prisma.AccountFindManyArgs> =
	z
		.object({
			select: AccountSelectSchema.optional(),
			include: AccountIncludeSchema.optional(),
			where: AccountWhereInputSchema.optional(),
			orderBy: z
				.union([
					AccountOrderByWithRelationInputSchema.array(),
					AccountOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: AccountWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
			distinct: z
				.union([
					AccountScalarFieldEnumSchema,
					AccountScalarFieldEnumSchema.array(),
				])
				.optional(),
		})
		.strict();

export const AccountAggregateArgsSchema: z.ZodType<Prisma.AccountAggregateArgs> =
	z
		.object({
			where: AccountWhereInputSchema.optional(),
			orderBy: z
				.union([
					AccountOrderByWithRelationInputSchema.array(),
					AccountOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: AccountWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
		})
		.strict();

export const AccountGroupByArgsSchema: z.ZodType<Prisma.AccountGroupByArgs> = z
	.object({
		where: AccountWhereInputSchema.optional(),
		orderBy: z
			.union([
				AccountOrderByWithAggregationInputSchema.array(),
				AccountOrderByWithAggregationInputSchema,
			])
			.optional(),
		by: AccountScalarFieldEnumSchema.array(),
		having: AccountScalarWhereWithAggregatesInputSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
	})
	.strict();

export const AccountFindUniqueArgsSchema: z.ZodType<Prisma.AccountFindUniqueArgs> =
	z
		.object({
			select: AccountSelectSchema.optional(),
			include: AccountIncludeSchema.optional(),
			where: AccountWhereUniqueInputSchema,
		})
		.strict();

export const AccountFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AccountFindUniqueOrThrowArgs> =
	z
		.object({
			select: AccountSelectSchema.optional(),
			include: AccountIncludeSchema.optional(),
			where: AccountWhereUniqueInputSchema,
		})
		.strict();

export const InviteFindFirstArgsSchema: z.ZodType<Prisma.InviteFindFirstArgs> =
	z
		.object({
			select: InviteSelectSchema.optional(),
			include: InviteIncludeSchema.optional(),
			where: InviteWhereInputSchema.optional(),
			orderBy: z
				.union([
					InviteOrderByWithRelationInputSchema.array(),
					InviteOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: InviteWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
			distinct: z
				.union([
					InviteScalarFieldEnumSchema,
					InviteScalarFieldEnumSchema.array(),
				])
				.optional(),
		})
		.strict();

export const InviteFindFirstOrThrowArgsSchema: z.ZodType<Prisma.InviteFindFirstOrThrowArgs> =
	z
		.object({
			select: InviteSelectSchema.optional(),
			include: InviteIncludeSchema.optional(),
			where: InviteWhereInputSchema.optional(),
			orderBy: z
				.union([
					InviteOrderByWithRelationInputSchema.array(),
					InviteOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: InviteWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
			distinct: z
				.union([
					InviteScalarFieldEnumSchema,
					InviteScalarFieldEnumSchema.array(),
				])
				.optional(),
		})
		.strict();

export const InviteFindManyArgsSchema: z.ZodType<Prisma.InviteFindManyArgs> = z
	.object({
		select: InviteSelectSchema.optional(),
		include: InviteIncludeSchema.optional(),
		where: InviteWhereInputSchema.optional(),
		orderBy: z
			.union([
				InviteOrderByWithRelationInputSchema.array(),
				InviteOrderByWithRelationInputSchema,
			])
			.optional(),
		cursor: InviteWhereUniqueInputSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
		distinct: z
			.union([InviteScalarFieldEnumSchema, InviteScalarFieldEnumSchema.array()])
			.optional(),
	})
	.strict();

export const InviteAggregateArgsSchema: z.ZodType<Prisma.InviteAggregateArgs> =
	z
		.object({
			where: InviteWhereInputSchema.optional(),
			orderBy: z
				.union([
					InviteOrderByWithRelationInputSchema.array(),
					InviteOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: InviteWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
		})
		.strict();

export const InviteGroupByArgsSchema: z.ZodType<Prisma.InviteGroupByArgs> = z
	.object({
		where: InviteWhereInputSchema.optional(),
		orderBy: z
			.union([
				InviteOrderByWithAggregationInputSchema.array(),
				InviteOrderByWithAggregationInputSchema,
			])
			.optional(),
		by: InviteScalarFieldEnumSchema.array(),
		having: InviteScalarWhereWithAggregatesInputSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
	})
	.strict();

export const InviteFindUniqueArgsSchema: z.ZodType<Prisma.InviteFindUniqueArgs> =
	z
		.object({
			select: InviteSelectSchema.optional(),
			include: InviteIncludeSchema.optional(),
			where: InviteWhereUniqueInputSchema,
		})
		.strict();

export const InviteFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.InviteFindUniqueOrThrowArgs> =
	z
		.object({
			select: InviteSelectSchema.optional(),
			include: InviteIncludeSchema.optional(),
			where: InviteWhereUniqueInputSchema,
		})
		.strict();

export const MemberFindFirstArgsSchema: z.ZodType<Prisma.MemberFindFirstArgs> =
	z
		.object({
			select: MemberSelectSchema.optional(),
			include: MemberIncludeSchema.optional(),
			where: MemberWhereInputSchema.optional(),
			orderBy: z
				.union([
					MemberOrderByWithRelationInputSchema.array(),
					MemberOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: MemberWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
			distinct: z
				.union([
					MemberScalarFieldEnumSchema,
					MemberScalarFieldEnumSchema.array(),
				])
				.optional(),
		})
		.strict();

export const MemberFindFirstOrThrowArgsSchema: z.ZodType<Prisma.MemberFindFirstOrThrowArgs> =
	z
		.object({
			select: MemberSelectSchema.optional(),
			include: MemberIncludeSchema.optional(),
			where: MemberWhereInputSchema.optional(),
			orderBy: z
				.union([
					MemberOrderByWithRelationInputSchema.array(),
					MemberOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: MemberWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
			distinct: z
				.union([
					MemberScalarFieldEnumSchema,
					MemberScalarFieldEnumSchema.array(),
				])
				.optional(),
		})
		.strict();

export const MemberFindManyArgsSchema: z.ZodType<Prisma.MemberFindManyArgs> = z
	.object({
		select: MemberSelectSchema.optional(),
		include: MemberIncludeSchema.optional(),
		where: MemberWhereInputSchema.optional(),
		orderBy: z
			.union([
				MemberOrderByWithRelationInputSchema.array(),
				MemberOrderByWithRelationInputSchema,
			])
			.optional(),
		cursor: MemberWhereUniqueInputSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
		distinct: z
			.union([MemberScalarFieldEnumSchema, MemberScalarFieldEnumSchema.array()])
			.optional(),
	})
	.strict();

export const MemberAggregateArgsSchema: z.ZodType<Prisma.MemberAggregateArgs> =
	z
		.object({
			where: MemberWhereInputSchema.optional(),
			orderBy: z
				.union([
					MemberOrderByWithRelationInputSchema.array(),
					MemberOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: MemberWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
		})
		.strict();

export const MemberGroupByArgsSchema: z.ZodType<Prisma.MemberGroupByArgs> = z
	.object({
		where: MemberWhereInputSchema.optional(),
		orderBy: z
			.union([
				MemberOrderByWithAggregationInputSchema.array(),
				MemberOrderByWithAggregationInputSchema,
			])
			.optional(),
		by: MemberScalarFieldEnumSchema.array(),
		having: MemberScalarWhereWithAggregatesInputSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
	})
	.strict();

export const MemberFindUniqueArgsSchema: z.ZodType<Prisma.MemberFindUniqueArgs> =
	z
		.object({
			select: MemberSelectSchema.optional(),
			include: MemberIncludeSchema.optional(),
			where: MemberWhereUniqueInputSchema,
		})
		.strict();

export const MemberFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.MemberFindUniqueOrThrowArgs> =
	z
		.object({
			select: MemberSelectSchema.optional(),
			include: MemberIncludeSchema.optional(),
			where: MemberWhereUniqueInputSchema,
		})
		.strict();

export const PatientFindFirstArgsSchema: z.ZodType<Prisma.PatientFindFirstArgs> =
	z
		.object({
			select: PatientSelectSchema.optional(),
			include: PatientIncludeSchema.optional(),
			where: PatientWhereInputSchema.optional(),
			orderBy: z
				.union([
					PatientOrderByWithRelationInputSchema.array(),
					PatientOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: PatientWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
			distinct: z
				.union([
					PatientScalarFieldEnumSchema,
					PatientScalarFieldEnumSchema.array(),
				])
				.optional(),
		})
		.strict();

export const PatientFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PatientFindFirstOrThrowArgs> =
	z
		.object({
			select: PatientSelectSchema.optional(),
			include: PatientIncludeSchema.optional(),
			where: PatientWhereInputSchema.optional(),
			orderBy: z
				.union([
					PatientOrderByWithRelationInputSchema.array(),
					PatientOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: PatientWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
			distinct: z
				.union([
					PatientScalarFieldEnumSchema,
					PatientScalarFieldEnumSchema.array(),
				])
				.optional(),
		})
		.strict();

export const PatientFindManyArgsSchema: z.ZodType<Prisma.PatientFindManyArgs> =
	z
		.object({
			select: PatientSelectSchema.optional(),
			include: PatientIncludeSchema.optional(),
			where: PatientWhereInputSchema.optional(),
			orderBy: z
				.union([
					PatientOrderByWithRelationInputSchema.array(),
					PatientOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: PatientWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
			distinct: z
				.union([
					PatientScalarFieldEnumSchema,
					PatientScalarFieldEnumSchema.array(),
				])
				.optional(),
		})
		.strict();

export const PatientAggregateArgsSchema: z.ZodType<Prisma.PatientAggregateArgs> =
	z
		.object({
			where: PatientWhereInputSchema.optional(),
			orderBy: z
				.union([
					PatientOrderByWithRelationInputSchema.array(),
					PatientOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: PatientWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
		})
		.strict();

export const PatientGroupByArgsSchema: z.ZodType<Prisma.PatientGroupByArgs> = z
	.object({
		where: PatientWhereInputSchema.optional(),
		orderBy: z
			.union([
				PatientOrderByWithAggregationInputSchema.array(),
				PatientOrderByWithAggregationInputSchema,
			])
			.optional(),
		by: PatientScalarFieldEnumSchema.array(),
		having: PatientScalarWhereWithAggregatesInputSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
	})
	.strict();

export const PatientFindUniqueArgsSchema: z.ZodType<Prisma.PatientFindUniqueArgs> =
	z
		.object({
			select: PatientSelectSchema.optional(),
			include: PatientIncludeSchema.optional(),
			where: PatientWhereUniqueInputSchema,
		})
		.strict();

export const PatientFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PatientFindUniqueOrThrowArgs> =
	z
		.object({
			select: PatientSelectSchema.optional(),
			include: PatientIncludeSchema.optional(),
			where: PatientWhereUniqueInputSchema,
		})
		.strict();

export const AppointmentFindFirstArgsSchema: z.ZodType<Prisma.AppointmentFindFirstArgs> =
	z
		.object({
			select: AppointmentSelectSchema.optional(),
			include: AppointmentIncludeSchema.optional(),
			where: AppointmentWhereInputSchema.optional(),
			orderBy: z
				.union([
					AppointmentOrderByWithRelationInputSchema.array(),
					AppointmentOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: AppointmentWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
			distinct: z
				.union([
					AppointmentScalarFieldEnumSchema,
					AppointmentScalarFieldEnumSchema.array(),
				])
				.optional(),
		})
		.strict();

export const AppointmentFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AppointmentFindFirstOrThrowArgs> =
	z
		.object({
			select: AppointmentSelectSchema.optional(),
			include: AppointmentIncludeSchema.optional(),
			where: AppointmentWhereInputSchema.optional(),
			orderBy: z
				.union([
					AppointmentOrderByWithRelationInputSchema.array(),
					AppointmentOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: AppointmentWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
			distinct: z
				.union([
					AppointmentScalarFieldEnumSchema,
					AppointmentScalarFieldEnumSchema.array(),
				])
				.optional(),
		})
		.strict();

export const AppointmentFindManyArgsSchema: z.ZodType<Prisma.AppointmentFindManyArgs> =
	z
		.object({
			select: AppointmentSelectSchema.optional(),
			include: AppointmentIncludeSchema.optional(),
			where: AppointmentWhereInputSchema.optional(),
			orderBy: z
				.union([
					AppointmentOrderByWithRelationInputSchema.array(),
					AppointmentOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: AppointmentWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
			distinct: z
				.union([
					AppointmentScalarFieldEnumSchema,
					AppointmentScalarFieldEnumSchema.array(),
				])
				.optional(),
		})
		.strict();

export const AppointmentAggregateArgsSchema: z.ZodType<Prisma.AppointmentAggregateArgs> =
	z
		.object({
			where: AppointmentWhereInputSchema.optional(),
			orderBy: z
				.union([
					AppointmentOrderByWithRelationInputSchema.array(),
					AppointmentOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: AppointmentWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
		})
		.strict();

export const AppointmentGroupByArgsSchema: z.ZodType<Prisma.AppointmentGroupByArgs> =
	z
		.object({
			where: AppointmentWhereInputSchema.optional(),
			orderBy: z
				.union([
					AppointmentOrderByWithAggregationInputSchema.array(),
					AppointmentOrderByWithAggregationInputSchema,
				])
				.optional(),
			by: AppointmentScalarFieldEnumSchema.array(),
			having: AppointmentScalarWhereWithAggregatesInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
		})
		.strict();

export const AppointmentFindUniqueArgsSchema: z.ZodType<Prisma.AppointmentFindUniqueArgs> =
	z
		.object({
			select: AppointmentSelectSchema.optional(),
			include: AppointmentIncludeSchema.optional(),
			where: AppointmentWhereUniqueInputSchema,
		})
		.strict();

export const AppointmentFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AppointmentFindUniqueOrThrowArgs> =
	z
		.object({
			select: AppointmentSelectSchema.optional(),
			include: AppointmentIncludeSchema.optional(),
			where: AppointmentWhereUniqueInputSchema,
		})
		.strict();

export const OrganizationFindFirstArgsSchema: z.ZodType<Prisma.OrganizationFindFirstArgs> =
	z
		.object({
			select: OrganizationSelectSchema.optional(),
			include: OrganizationIncludeSchema.optional(),
			where: OrganizationWhereInputSchema.optional(),
			orderBy: z
				.union([
					OrganizationOrderByWithRelationInputSchema.array(),
					OrganizationOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: OrganizationWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
			distinct: z
				.union([
					OrganizationScalarFieldEnumSchema,
					OrganizationScalarFieldEnumSchema.array(),
				])
				.optional(),
		})
		.strict();

export const OrganizationFindFirstOrThrowArgsSchema: z.ZodType<Prisma.OrganizationFindFirstOrThrowArgs> =
	z
		.object({
			select: OrganizationSelectSchema.optional(),
			include: OrganizationIncludeSchema.optional(),
			where: OrganizationWhereInputSchema.optional(),
			orderBy: z
				.union([
					OrganizationOrderByWithRelationInputSchema.array(),
					OrganizationOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: OrganizationWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
			distinct: z
				.union([
					OrganizationScalarFieldEnumSchema,
					OrganizationScalarFieldEnumSchema.array(),
				])
				.optional(),
		})
		.strict();

export const OrganizationFindManyArgsSchema: z.ZodType<Prisma.OrganizationFindManyArgs> =
	z
		.object({
			select: OrganizationSelectSchema.optional(),
			include: OrganizationIncludeSchema.optional(),
			where: OrganizationWhereInputSchema.optional(),
			orderBy: z
				.union([
					OrganizationOrderByWithRelationInputSchema.array(),
					OrganizationOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: OrganizationWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
			distinct: z
				.union([
					OrganizationScalarFieldEnumSchema,
					OrganizationScalarFieldEnumSchema.array(),
				])
				.optional(),
		})
		.strict();

export const OrganizationAggregateArgsSchema: z.ZodType<Prisma.OrganizationAggregateArgs> =
	z
		.object({
			where: OrganizationWhereInputSchema.optional(),
			orderBy: z
				.union([
					OrganizationOrderByWithRelationInputSchema.array(),
					OrganizationOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: OrganizationWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
		})
		.strict();

export const OrganizationGroupByArgsSchema: z.ZodType<Prisma.OrganizationGroupByArgs> =
	z
		.object({
			where: OrganizationWhereInputSchema.optional(),
			orderBy: z
				.union([
					OrganizationOrderByWithAggregationInputSchema.array(),
					OrganizationOrderByWithAggregationInputSchema,
				])
				.optional(),
			by: OrganizationScalarFieldEnumSchema.array(),
			having: OrganizationScalarWhereWithAggregatesInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
		})
		.strict();

export const OrganizationFindUniqueArgsSchema: z.ZodType<Prisma.OrganizationFindUniqueArgs> =
	z
		.object({
			select: OrganizationSelectSchema.optional(),
			include: OrganizationIncludeSchema.optional(),
			where: OrganizationWhereUniqueInputSchema,
		})
		.strict();

export const OrganizationFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.OrganizationFindUniqueOrThrowArgs> =
	z
		.object({
			select: OrganizationSelectSchema.optional(),
			include: OrganizationIncludeSchema.optional(),
			where: OrganizationWhereUniqueInputSchema,
		})
		.strict();

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z
	.object({
		select: UserSelectSchema.optional(),
		include: UserIncludeSchema.optional(),
		data: z.union([UserCreateInputSchema, UserUncheckedCreateInputSchema]),
	})
	.strict();

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z
	.object({
		select: UserSelectSchema.optional(),
		include: UserIncludeSchema.optional(),
		where: UserWhereUniqueInputSchema,
		create: z.union([UserCreateInputSchema, UserUncheckedCreateInputSchema]),
		update: z.union([UserUpdateInputSchema, UserUncheckedUpdateInputSchema]),
	})
	.strict();

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z
	.object({
		data: z.union([
			UserCreateManyInputSchema,
			UserCreateManyInputSchema.array(),
		]),
		skipDuplicates: z.boolean().optional(),
	})
	.strict();

export const UserCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UserCreateManyAndReturnArgs> =
	z
		.object({
			data: z.union([
				UserCreateManyInputSchema,
				UserCreateManyInputSchema.array(),
			]),
			skipDuplicates: z.boolean().optional(),
		})
		.strict();

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z
	.object({
		select: UserSelectSchema.optional(),
		include: UserIncludeSchema.optional(),
		where: UserWhereUniqueInputSchema,
	})
	.strict();

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z
	.object({
		select: UserSelectSchema.optional(),
		include: UserIncludeSchema.optional(),
		data: z.union([UserUpdateInputSchema, UserUncheckedUpdateInputSchema]),
		where: UserWhereUniqueInputSchema,
	})
	.strict();

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z
	.object({
		data: z.union([
			UserUpdateManyMutationInputSchema,
			UserUncheckedUpdateManyInputSchema,
		]),
		where: UserWhereInputSchema.optional(),
	})
	.strict();

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z
	.object({
		where: UserWhereInputSchema.optional(),
	})
	.strict();

export const TokenCreateArgsSchema: z.ZodType<Prisma.TokenCreateArgs> = z
	.object({
		select: TokenSelectSchema.optional(),
		include: TokenIncludeSchema.optional(),
		data: z.union([TokenCreateInputSchema, TokenUncheckedCreateInputSchema]),
	})
	.strict();

export const TokenUpsertArgsSchema: z.ZodType<Prisma.TokenUpsertArgs> = z
	.object({
		select: TokenSelectSchema.optional(),
		include: TokenIncludeSchema.optional(),
		where: TokenWhereUniqueInputSchema,
		create: z.union([TokenCreateInputSchema, TokenUncheckedCreateInputSchema]),
		update: z.union([TokenUpdateInputSchema, TokenUncheckedUpdateInputSchema]),
	})
	.strict();

export const TokenCreateManyArgsSchema: z.ZodType<Prisma.TokenCreateManyArgs> =
	z
		.object({
			data: z.union([
				TokenCreateManyInputSchema,
				TokenCreateManyInputSchema.array(),
			]),
			skipDuplicates: z.boolean().optional(),
		})
		.strict();

export const TokenCreateManyAndReturnArgsSchema: z.ZodType<Prisma.TokenCreateManyAndReturnArgs> =
	z
		.object({
			data: z.union([
				TokenCreateManyInputSchema,
				TokenCreateManyInputSchema.array(),
			]),
			skipDuplicates: z.boolean().optional(),
		})
		.strict();

export const TokenDeleteArgsSchema: z.ZodType<Prisma.TokenDeleteArgs> = z
	.object({
		select: TokenSelectSchema.optional(),
		include: TokenIncludeSchema.optional(),
		where: TokenWhereUniqueInputSchema,
	})
	.strict();

export const TokenUpdateArgsSchema: z.ZodType<Prisma.TokenUpdateArgs> = z
	.object({
		select: TokenSelectSchema.optional(),
		include: TokenIncludeSchema.optional(),
		data: z.union([TokenUpdateInputSchema, TokenUncheckedUpdateInputSchema]),
		where: TokenWhereUniqueInputSchema,
	})
	.strict();

export const TokenUpdateManyArgsSchema: z.ZodType<Prisma.TokenUpdateManyArgs> =
	z
		.object({
			data: z.union([
				TokenUpdateManyMutationInputSchema,
				TokenUncheckedUpdateManyInputSchema,
			]),
			where: TokenWhereInputSchema.optional(),
		})
		.strict();

export const TokenDeleteManyArgsSchema: z.ZodType<Prisma.TokenDeleteManyArgs> =
	z
		.object({
			where: TokenWhereInputSchema.optional(),
		})
		.strict();

export const AccountCreateArgsSchema: z.ZodType<Prisma.AccountCreateArgs> = z
	.object({
		select: AccountSelectSchema.optional(),
		include: AccountIncludeSchema.optional(),
		data: z.union([
			AccountCreateInputSchema,
			AccountUncheckedCreateInputSchema,
		]),
	})
	.strict();

export const AccountUpsertArgsSchema: z.ZodType<Prisma.AccountUpsertArgs> = z
	.object({
		select: AccountSelectSchema.optional(),
		include: AccountIncludeSchema.optional(),
		where: AccountWhereUniqueInputSchema,
		create: z.union([
			AccountCreateInputSchema,
			AccountUncheckedCreateInputSchema,
		]),
		update: z.union([
			AccountUpdateInputSchema,
			AccountUncheckedUpdateInputSchema,
		]),
	})
	.strict();

export const AccountCreateManyArgsSchema: z.ZodType<Prisma.AccountCreateManyArgs> =
	z
		.object({
			data: z.union([
				AccountCreateManyInputSchema,
				AccountCreateManyInputSchema.array(),
			]),
			skipDuplicates: z.boolean().optional(),
		})
		.strict();

export const AccountCreateManyAndReturnArgsSchema: z.ZodType<Prisma.AccountCreateManyAndReturnArgs> =
	z
		.object({
			data: z.union([
				AccountCreateManyInputSchema,
				AccountCreateManyInputSchema.array(),
			]),
			skipDuplicates: z.boolean().optional(),
		})
		.strict();

export const AccountDeleteArgsSchema: z.ZodType<Prisma.AccountDeleteArgs> = z
	.object({
		select: AccountSelectSchema.optional(),
		include: AccountIncludeSchema.optional(),
		where: AccountWhereUniqueInputSchema,
	})
	.strict();

export const AccountUpdateArgsSchema: z.ZodType<Prisma.AccountUpdateArgs> = z
	.object({
		select: AccountSelectSchema.optional(),
		include: AccountIncludeSchema.optional(),
		data: z.union([
			AccountUpdateInputSchema,
			AccountUncheckedUpdateInputSchema,
		]),
		where: AccountWhereUniqueInputSchema,
	})
	.strict();

export const AccountUpdateManyArgsSchema: z.ZodType<Prisma.AccountUpdateManyArgs> =
	z
		.object({
			data: z.union([
				AccountUpdateManyMutationInputSchema,
				AccountUncheckedUpdateManyInputSchema,
			]),
			where: AccountWhereInputSchema.optional(),
		})
		.strict();

export const AccountDeleteManyArgsSchema: z.ZodType<Prisma.AccountDeleteManyArgs> =
	z
		.object({
			where: AccountWhereInputSchema.optional(),
		})
		.strict();

export const InviteCreateArgsSchema: z.ZodType<Prisma.InviteCreateArgs> = z
	.object({
		select: InviteSelectSchema.optional(),
		include: InviteIncludeSchema.optional(),
		data: z.union([InviteCreateInputSchema, InviteUncheckedCreateInputSchema]),
	})
	.strict();

export const InviteUpsertArgsSchema: z.ZodType<Prisma.InviteUpsertArgs> = z
	.object({
		select: InviteSelectSchema.optional(),
		include: InviteIncludeSchema.optional(),
		where: InviteWhereUniqueInputSchema,
		create: z.union([
			InviteCreateInputSchema,
			InviteUncheckedCreateInputSchema,
		]),
		update: z.union([
			InviteUpdateInputSchema,
			InviteUncheckedUpdateInputSchema,
		]),
	})
	.strict();

export const InviteCreateManyArgsSchema: z.ZodType<Prisma.InviteCreateManyArgs> =
	z
		.object({
			data: z.union([
				InviteCreateManyInputSchema,
				InviteCreateManyInputSchema.array(),
			]),
			skipDuplicates: z.boolean().optional(),
		})
		.strict();

export const InviteCreateManyAndReturnArgsSchema: z.ZodType<Prisma.InviteCreateManyAndReturnArgs> =
	z
		.object({
			data: z.union([
				InviteCreateManyInputSchema,
				InviteCreateManyInputSchema.array(),
			]),
			skipDuplicates: z.boolean().optional(),
		})
		.strict();

export const InviteDeleteArgsSchema: z.ZodType<Prisma.InviteDeleteArgs> = z
	.object({
		select: InviteSelectSchema.optional(),
		include: InviteIncludeSchema.optional(),
		where: InviteWhereUniqueInputSchema,
	})
	.strict();

export const InviteUpdateArgsSchema: z.ZodType<Prisma.InviteUpdateArgs> = z
	.object({
		select: InviteSelectSchema.optional(),
		include: InviteIncludeSchema.optional(),
		data: z.union([InviteUpdateInputSchema, InviteUncheckedUpdateInputSchema]),
		where: InviteWhereUniqueInputSchema,
	})
	.strict();

export const InviteUpdateManyArgsSchema: z.ZodType<Prisma.InviteUpdateManyArgs> =
	z
		.object({
			data: z.union([
				InviteUpdateManyMutationInputSchema,
				InviteUncheckedUpdateManyInputSchema,
			]),
			where: InviteWhereInputSchema.optional(),
		})
		.strict();

export const InviteDeleteManyArgsSchema: z.ZodType<Prisma.InviteDeleteManyArgs> =
	z
		.object({
			where: InviteWhereInputSchema.optional(),
		})
		.strict();

export const MemberCreateArgsSchema: z.ZodType<Prisma.MemberCreateArgs> = z
	.object({
		select: MemberSelectSchema.optional(),
		include: MemberIncludeSchema.optional(),
		data: z.union([MemberCreateInputSchema, MemberUncheckedCreateInputSchema]),
	})
	.strict();

export const MemberUpsertArgsSchema: z.ZodType<Prisma.MemberUpsertArgs> = z
	.object({
		select: MemberSelectSchema.optional(),
		include: MemberIncludeSchema.optional(),
		where: MemberWhereUniqueInputSchema,
		create: z.union([
			MemberCreateInputSchema,
			MemberUncheckedCreateInputSchema,
		]),
		update: z.union([
			MemberUpdateInputSchema,
			MemberUncheckedUpdateInputSchema,
		]),
	})
	.strict();

export const MemberCreateManyArgsSchema: z.ZodType<Prisma.MemberCreateManyArgs> =
	z
		.object({
			data: z.union([
				MemberCreateManyInputSchema,
				MemberCreateManyInputSchema.array(),
			]),
			skipDuplicates: z.boolean().optional(),
		})
		.strict();

export const MemberCreateManyAndReturnArgsSchema: z.ZodType<Prisma.MemberCreateManyAndReturnArgs> =
	z
		.object({
			data: z.union([
				MemberCreateManyInputSchema,
				MemberCreateManyInputSchema.array(),
			]),
			skipDuplicates: z.boolean().optional(),
		})
		.strict();

export const MemberDeleteArgsSchema: z.ZodType<Prisma.MemberDeleteArgs> = z
	.object({
		select: MemberSelectSchema.optional(),
		include: MemberIncludeSchema.optional(),
		where: MemberWhereUniqueInputSchema,
	})
	.strict();

export const MemberUpdateArgsSchema: z.ZodType<Prisma.MemberUpdateArgs> = z
	.object({
		select: MemberSelectSchema.optional(),
		include: MemberIncludeSchema.optional(),
		data: z.union([MemberUpdateInputSchema, MemberUncheckedUpdateInputSchema]),
		where: MemberWhereUniqueInputSchema,
	})
	.strict();

export const MemberUpdateManyArgsSchema: z.ZodType<Prisma.MemberUpdateManyArgs> =
	z
		.object({
			data: z.union([
				MemberUpdateManyMutationInputSchema,
				MemberUncheckedUpdateManyInputSchema,
			]),
			where: MemberWhereInputSchema.optional(),
		})
		.strict();

export const MemberDeleteManyArgsSchema: z.ZodType<Prisma.MemberDeleteManyArgs> =
	z
		.object({
			where: MemberWhereInputSchema.optional(),
		})
		.strict();

export const PatientCreateArgsSchema: z.ZodType<Prisma.PatientCreateArgs> = z
	.object({
		select: PatientSelectSchema.optional(),
		include: PatientIncludeSchema.optional(),
		data: z.union([
			PatientCreateInputSchema,
			PatientUncheckedCreateInputSchema,
		]),
	})
	.strict();

export const PatientUpsertArgsSchema: z.ZodType<Prisma.PatientUpsertArgs> = z
	.object({
		select: PatientSelectSchema.optional(),
		include: PatientIncludeSchema.optional(),
		where: PatientWhereUniqueInputSchema,
		create: z.union([
			PatientCreateInputSchema,
			PatientUncheckedCreateInputSchema,
		]),
		update: z.union([
			PatientUpdateInputSchema,
			PatientUncheckedUpdateInputSchema,
		]),
	})
	.strict();

export const PatientCreateManyArgsSchema: z.ZodType<Prisma.PatientCreateManyArgs> =
	z
		.object({
			data: z.union([
				PatientCreateManyInputSchema,
				PatientCreateManyInputSchema.array(),
			]),
			skipDuplicates: z.boolean().optional(),
		})
		.strict();

export const PatientCreateManyAndReturnArgsSchema: z.ZodType<Prisma.PatientCreateManyAndReturnArgs> =
	z
		.object({
			data: z.union([
				PatientCreateManyInputSchema,
				PatientCreateManyInputSchema.array(),
			]),
			skipDuplicates: z.boolean().optional(),
		})
		.strict();

export const PatientDeleteArgsSchema: z.ZodType<Prisma.PatientDeleteArgs> = z
	.object({
		select: PatientSelectSchema.optional(),
		include: PatientIncludeSchema.optional(),
		where: PatientWhereUniqueInputSchema,
	})
	.strict();

export const PatientUpdateArgsSchema: z.ZodType<Prisma.PatientUpdateArgs> = z
	.object({
		select: PatientSelectSchema.optional(),
		include: PatientIncludeSchema.optional(),
		data: z.union([
			PatientUpdateInputSchema,
			PatientUncheckedUpdateInputSchema,
		]),
		where: PatientWhereUniqueInputSchema,
	})
	.strict();

export const PatientUpdateManyArgsSchema: z.ZodType<Prisma.PatientUpdateManyArgs> =
	z
		.object({
			data: z.union([
				PatientUpdateManyMutationInputSchema,
				PatientUncheckedUpdateManyInputSchema,
			]),
			where: PatientWhereInputSchema.optional(),
		})
		.strict();

export const PatientDeleteManyArgsSchema: z.ZodType<Prisma.PatientDeleteManyArgs> =
	z
		.object({
			where: PatientWhereInputSchema.optional(),
		})
		.strict();

export const AppointmentCreateArgsSchema: z.ZodType<Prisma.AppointmentCreateArgs> =
	z
		.object({
			select: AppointmentSelectSchema.optional(),
			include: AppointmentIncludeSchema.optional(),
			data: z.union([
				AppointmentCreateInputSchema,
				AppointmentUncheckedCreateInputSchema,
			]),
		})
		.strict();

export const AppointmentUpsertArgsSchema: z.ZodType<Prisma.AppointmentUpsertArgs> =
	z
		.object({
			select: AppointmentSelectSchema.optional(),
			include: AppointmentIncludeSchema.optional(),
			where: AppointmentWhereUniqueInputSchema,
			create: z.union([
				AppointmentCreateInputSchema,
				AppointmentUncheckedCreateInputSchema,
			]),
			update: z.union([
				AppointmentUpdateInputSchema,
				AppointmentUncheckedUpdateInputSchema,
			]),
		})
		.strict();

export const AppointmentCreateManyArgsSchema: z.ZodType<Prisma.AppointmentCreateManyArgs> =
	z
		.object({
			data: z.union([
				AppointmentCreateManyInputSchema,
				AppointmentCreateManyInputSchema.array(),
			]),
			skipDuplicates: z.boolean().optional(),
		})
		.strict();

export const AppointmentCreateManyAndReturnArgsSchema: z.ZodType<Prisma.AppointmentCreateManyAndReturnArgs> =
	z
		.object({
			data: z.union([
				AppointmentCreateManyInputSchema,
				AppointmentCreateManyInputSchema.array(),
			]),
			skipDuplicates: z.boolean().optional(),
		})
		.strict();

export const AppointmentDeleteArgsSchema: z.ZodType<Prisma.AppointmentDeleteArgs> =
	z
		.object({
			select: AppointmentSelectSchema.optional(),
			include: AppointmentIncludeSchema.optional(),
			where: AppointmentWhereUniqueInputSchema,
		})
		.strict();

export const AppointmentUpdateArgsSchema: z.ZodType<Prisma.AppointmentUpdateArgs> =
	z
		.object({
			select: AppointmentSelectSchema.optional(),
			include: AppointmentIncludeSchema.optional(),
			data: z.union([
				AppointmentUpdateInputSchema,
				AppointmentUncheckedUpdateInputSchema,
			]),
			where: AppointmentWhereUniqueInputSchema,
		})
		.strict();

export const AppointmentUpdateManyArgsSchema: z.ZodType<Prisma.AppointmentUpdateManyArgs> =
	z
		.object({
			data: z.union([
				AppointmentUpdateManyMutationInputSchema,
				AppointmentUncheckedUpdateManyInputSchema,
			]),
			where: AppointmentWhereInputSchema.optional(),
		})
		.strict();

export const AppointmentDeleteManyArgsSchema: z.ZodType<Prisma.AppointmentDeleteManyArgs> =
	z
		.object({
			where: AppointmentWhereInputSchema.optional(),
		})
		.strict();

export const OrganizationCreateArgsSchema: z.ZodType<Prisma.OrganizationCreateArgs> =
	z
		.object({
			select: OrganizationSelectSchema.optional(),
			include: OrganizationIncludeSchema.optional(),
			data: z.union([
				OrganizationCreateInputSchema,
				OrganizationUncheckedCreateInputSchema,
			]),
		})
		.strict();

export const OrganizationUpsertArgsSchema: z.ZodType<Prisma.OrganizationUpsertArgs> =
	z
		.object({
			select: OrganizationSelectSchema.optional(),
			include: OrganizationIncludeSchema.optional(),
			where: OrganizationWhereUniqueInputSchema,
			create: z.union([
				OrganizationCreateInputSchema,
				OrganizationUncheckedCreateInputSchema,
			]),
			update: z.union([
				OrganizationUpdateInputSchema,
				OrganizationUncheckedUpdateInputSchema,
			]),
		})
		.strict();

export const OrganizationCreateManyArgsSchema: z.ZodType<Prisma.OrganizationCreateManyArgs> =
	z
		.object({
			data: z.union([
				OrganizationCreateManyInputSchema,
				OrganizationCreateManyInputSchema.array(),
			]),
			skipDuplicates: z.boolean().optional(),
		})
		.strict();

export const OrganizationCreateManyAndReturnArgsSchema: z.ZodType<Prisma.OrganizationCreateManyAndReturnArgs> =
	z
		.object({
			data: z.union([
				OrganizationCreateManyInputSchema,
				OrganizationCreateManyInputSchema.array(),
			]),
			skipDuplicates: z.boolean().optional(),
		})
		.strict();

export const OrganizationDeleteArgsSchema: z.ZodType<Prisma.OrganizationDeleteArgs> =
	z
		.object({
			select: OrganizationSelectSchema.optional(),
			include: OrganizationIncludeSchema.optional(),
			where: OrganizationWhereUniqueInputSchema,
		})
		.strict();

export const OrganizationUpdateArgsSchema: z.ZodType<Prisma.OrganizationUpdateArgs> =
	z
		.object({
			select: OrganizationSelectSchema.optional(),
			include: OrganizationIncludeSchema.optional(),
			data: z.union([
				OrganizationUpdateInputSchema,
				OrganizationUncheckedUpdateInputSchema,
			]),
			where: OrganizationWhereUniqueInputSchema,
		})
		.strict();

export const OrganizationUpdateManyArgsSchema: z.ZodType<Prisma.OrganizationUpdateManyArgs> =
	z
		.object({
			data: z.union([
				OrganizationUpdateManyMutationInputSchema,
				OrganizationUncheckedUpdateManyInputSchema,
			]),
			where: OrganizationWhereInputSchema.optional(),
		})
		.strict();

export const OrganizationDeleteManyArgsSchema: z.ZodType<Prisma.OrganizationDeleteManyArgs> =
	z
		.object({
			where: OrganizationWhereInputSchema.optional(),
		})
		.strict();
