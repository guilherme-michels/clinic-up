import { PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";

const prisma = new PrismaClient();

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export async function getCurrentUserOrganizationId(ctx: any) {
	const member = await prisma.member.findFirst({
		where: { userId: ctx.user.id },
		select: { organizationId: true },
	});

	if (!member) {
		throw new TRPCError({
			code: "NOT_FOUND",
			message: "Organização não encontrada para o usuário atual.",
		});
	}

	return member.organizationId;
}
