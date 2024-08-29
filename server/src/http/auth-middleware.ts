import { TRPCError } from "@trpc/server";
import { middleware, publicProcedure } from "../trpc";
import jwt from "jsonwebtoken";

export const authMiddleware = middleware(async ({ ctx, next }) => {
	const token = ctx.req.headers.authorization;

	if (!token) {
		throw new TRPCError({ code: "UNAUTHORIZED" });
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
			userId: string;
		};

		const user = await ctx.prisma.user.findUnique({
			where: { id: decoded.userId },
			select: {
				id: true,
				name: true,
				email: true,
			},
		});

		if (!user) {
			throw new TRPCError({
				code: "UNAUTHORIZED",
				message: "Usuário não encontrado",
			});
		}

		return next({
			ctx: {
				...ctx,
				user,
			},
		});
	} catch (error) {
		throw new TRPCError({ code: "UNAUTHORIZED" });
	}
});

export const protectedProcedure = publicProcedure.use(authMiddleware);
