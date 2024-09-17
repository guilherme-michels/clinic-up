import { zodResolver } from "@hookform/resolvers/zod";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

import { trpc } from "@/App";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const signUpForm = z.object({
	organizationName: z.string().min(1, "Nome da organização é obrigatório"),
	managerName: z.string().min(1, "Seu nome é obrigatório"),
	email: z.string().email("E-mail inválido"),
	password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

type SignUpForm = z.infer<typeof signUpForm>;

export function SignUp() {
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<SignUpForm>({
		resolver: zodResolver(signUpForm),
	});

	const signUpMutation = trpc.auth.signUp.useMutation({
		onSuccess: (data) => {
			toast.success("Organização cadastrada com sucesso!", {
				action: {
					label: "Login",
					onClick: () => navigate(`/sign-in?email=${data.user.email}`),
				},
			});
		},
		onError: (error) => {
			toast.error(error.message || "Erro ao cadastrar organização.");
		},
	});

	async function handleSignUp(data: SignUpForm) {
		signUpMutation.mutate(data);
	}

	return (
		<>
			<Helmet title="Cadastro" />

			<div className="p-8">
				<Button variant="ghost" asChild className="absolute right-8 top-8">
					<Link to="/sign-in">Fazer login</Link>
				</Button>

				<div className="flex w-[350px] flex-col justify-center gap-6">
					<div className="flex flex-col gap-2 text-center">
						<h1 className="text-2xl font-semibold tracking-tight">
							Criar conta grátis
						</h1>
						<p className="text-sm text-muted-foreground">
							Seja um parceiro e entre para a melhor solução de Clínicas!
						</p>
					</div>

					<form className="space-y-4" onSubmit={handleSubmit(handleSignUp)}>
						<div className="space-y-2">
							<Label htmlFor="organizationName">Nome da organização</Label>
							<Input
								id="organizationName"
								type="text"
								{...register("organizationName")}
							/>
							{errors.organizationName && (
								<p className="text-sm text-red-500">
									{errors.organizationName.message}
								</p>
							)}
						</div>

						<div className="space-y-2">
							<Label htmlFor="managerName">Seu nome</Label>
							<Input
								id="managerName"
								type="text"
								{...register("managerName")}
							/>
							{errors.managerName && (
								<p className="text-sm text-red-500">
									{errors.managerName.message}
								</p>
							)}
						</div>

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
							Finalizar cadastro
						</Button>

						<p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
							Ao continuar, você concorda com nossos{" "}
							<span className="underline underline-offset-4">
								termos de serviço
							</span>{" "}
							e{" "}
							<span className="underline underline-offset-4">
								políticas de privacidade
							</span>
						</p>
					</form>
				</div>
			</div>
		</>
	);
}
