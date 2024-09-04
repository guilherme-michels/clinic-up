import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { NotebookText } from "lucide-react";

const signInForm = z.object({
	email: z.string().email("E-mail inválido"),
	password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

type SignInForm = z.infer<typeof signInForm>;

export function SignIn() {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const { signIn } = useAuth();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<SignInForm>({
		resolver: zodResolver(signInForm),
		defaultValues: {
			email: searchParams.get("email") ?? "",
			password: "",
		},
	});

	async function handleSignIn(data: SignInForm) {
		try {
			await signIn(data.email, data.password);
			toast.success("Bem vindo!");
			navigate("/");
		} catch (error: unknown) {
			if (error instanceof Error) {
				toast.error(error.message);
			} else {
				toast.error("Ocorreu um erro desconhecido");
			}
		}
	}

	return (
		<>
			<Helmet title="Login" />

			<div className="p-8">
				<Button variant="ghost" asChild className="absolute left-8 top-8">
					<Link to="/clinic-up" className="flex items-center gap-1">
						<NotebookText />
						Conheça os planos
					</Link>
				</Button>

				<Button variant="ghost" asChild className="absolute right-8 top-8">
					<Link to="/sign-up">Nova organização</Link>
				</Button>

				<div className="flex w-[350px] flex-col justify-center gap-6">
					<div className="flex flex-col gap-2 text-center">
						<h1 className="text-2xl font-semibold tracking-tight">
							Acessar painel
						</h1>
						<p className="text-sm text-muted-foreground">
							Acompanhe suas vendas pelo painel do parceiro!
						</p>
					</div>

					<form className="space-y-4" onSubmit={handleSubmit(handleSignIn)}>
						<div className="space-y-2">
							<Label htmlFor="email">Seu e-mail</Label>
							<Input id="email" type="email" {...register("email")} />
							{errors.email && (
								<p className="text-sm text-red-500">{errors.email.message}</p>
							)}
						</div>

						<div className="space-y-2">
							<Label htmlFor="password">Senha</Label>
							<Input id="password" type="password" {...register("password")} />
							{errors.password && (
								<p className="text-sm text-red-500">
									{errors.password.message}
								</p>
							)}
						</div>

						<Button
							disabled={isSubmitting}
							className="w-full h-10"
							type="submit"
						>
							Acessar painel
						</Button>
					</form>
				</div>
			</div>
		</>
	);
}
