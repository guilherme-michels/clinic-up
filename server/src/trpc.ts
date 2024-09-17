import { PrismaClient } from "@prisma/client";
import { TRPCError, initTRPC } from "@trpc/server";
import type { inferAsyncReturnType } from "@trpc/server";
import type { CreateHTTPContextOptions } from "@trpc/server/adapters/standalone";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function createContext({ req, res }: CreateHTTPContextOptions) {
	const token = req.headers.authorization?.split(" ")[1];
	let user = null;

	if (token) {
		try {
			const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
				userId: string;
			};
			user = await prisma.user.findUnique({
				where: { id: decoded.userId },
				select: { id: true, name: true, email: true },
			});
		} catch (error) {
			// Token inválido ou expirado
		}
	}

	return {
		req,
		res,
		prisma,
		user,
	};
}

export type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;
export const middleware = t.middleware;

export const protectedProcedure = t.procedure.use(
	t.middleware(({ ctx, next }) => {
		if (!ctx.user) {
			throw new TRPCError({ code: "UNAUTHORIZED" });
		}
		return next({
			ctx: {
				...ctx,
				user: ctx.user,
			},
		});
	}),
);
