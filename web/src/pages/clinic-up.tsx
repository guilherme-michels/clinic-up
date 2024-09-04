import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Smile, Star } from "lucide-react";
import { Link } from "react-router-dom";

export function ClinicUp() {
	return (
		<div className="h-screen flex flex-col bg-white">
			<header className="py-8 text-center bg-zinc-100">
				<Link
					to="/sign-in"
					className="flex w-full items-center justify-center mb-4 gap-2 hover:opacity-80 transition-all"
				>
					<Smile className="size-8" />

					<h1 className="text-4xl font-bold text-zinc-800">Clinic Up</h1>
				</Link>
				<p className="text-xl text-zinc-600 max-w-2xl mx-auto">
					Transforme sua clínica com nossa solução completa de gestão.
					Eficiência, organização e crescimento ao seu alcance.
				</p>
			</header>

			<div className="flex-1 overflow-y-auto">
				<section className="py-8 bg-white">
					<div className="container mx-auto px-4">
						<h2 className="text-3xl font-semibold text-center mb-12 text-zinc-800">
							Nossos Planos
						</h2>
						<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
							{plans.map((plan) => (
								<Card key={plan.name} className="flex flex-col border-zinc-200">
									<CardHeader>
										<CardTitle className="text-2xl font-bold text-center text-zinc-800">
											{plan.name}
										</CardTitle>
									</CardHeader>
									<CardContent className="flex-grow flex flex-col justify-between">
										<div>
											<p className="text-3xl font-bold text-center mb-6 text-zinc-800">
												{plan.price}
											</p>
											<ul className="space-y-2">
												{plan.features.map((feature) => (
													<li key={feature} className="flex items-center">
														<Check className="text-zinc-500 mr-2" size={20} />
														<span className="text-zinc-600">{feature}</span>
													</li>
												))}
											</ul>
										</div>
										<Button className="mt-6 w-full bg-zinc-800 hover:bg-zinc-700 text-white">
											{plan.cta}
										</Button>
									</CardContent>
								</Card>
							))}
						</div>
					</div>
				</section>
				<section className="py-16 bg-zinc-100">
					<div className="container mx-auto px-4">
						<h2 className="text-3xl font-semibold text-center mb-12 text-zinc-800">
							Por que escolher a Clinic Up?
						</h2>
						<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
							{benefits.map((benefit) => (
								<div key={benefit.title} className="text-center">
									<div className="bg-zinc-800 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
										<Star size={24} />
									</div>
									<h3 className="text-xl font-semibold mb-2 text-zinc-800">
										{benefit.title}
									</h3>
									<p className="text-zinc-600">{benefit.description}</p>
								</div>
							))}
						</div>
					</div>
				</section>
				<footer className="bg-zinc-800 text-white py-12">
					<div className="container mx-auto px-4">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
							<div>
								<h3 className="text-xl font-semibold mb-4">
									Termos de Serviço
								</h3>
								<p className="text-zinc-400">
									Nossos termos de serviço descrevem as regras e condições para
									o uso da plataforma Clinic Up. Leia atentamente para entender
									seus direitos e responsabilidades.
								</p>
								<Button
									variant="link"
									className="text-zinc-300 hover:text-white mt-2 p-0"
								>
									Ler Termos de Serviço
								</Button>
							</div>
							<div>
								<h3 className="text-xl font-semibold mb-4">
									Política de Privacidade
								</h3>
								<p className="text-zinc-400">
									Sua privacidade é importante para nós. Nossa política de
									privacidade explica como coletamos, usamos e protegemos suas
									informações pessoais.
								</p>
								<Button
									variant="link"
									className="text-zinc-300 hover:text-white mt-2 p-0"
								>
									Ler Política de Privacidade
								</Button>
							</div>
						</div>
						<div className="mt-8 pt-8 border-t border-zinc-700 text-center text-zinc-400">
							<p>&copy; 2023 Clinic Up. Todos os direitos reservados.</p>
						</div>
					</div>
				</footer>
			</div>
		</div>
	);
}

const plans = [
	{
		name: "Básico",
		price: "R$ 99/mês",
		features: [
			"Agendamento de consultas",
			"Prontuário eletrônico básico",
			"Suporte por e-mail",
		],
		cta: "Começar Agora",
	},
	{
		name: "Profissional",
		price: "R$ 199/mês",
		features: [
			"Tudo do plano Básico",
			"Faturamento e relatórios",
			"Integração com laboratórios",
			"Suporte prioritário",
		],
		cta: "Escolher Profissional",
	},
	{
		name: "Enterprise",
		price: "Personalizado",
		features: [
			"Tudo do plano Profissional",
			"API personalizada",
			"Treinamento dedicado",
			"Gerente de conta exclusivo",
		],
		cta: "Falar com Vendas",
	},
];

const benefits = [
	{
		title: "Eficiência Operacional",
		description:
			"Otimize seus processos e economize tempo com nossas ferramentas intuitivas.",
	},
	{
		title: "Satisfação do Paciente",
		description:
			"Melhore a experiência do paciente com agendamento online e comunicação simplificada.",
	},
	{
		title: "Crescimento do Negócio",
		description:
			"Obtenha insights valiosos e tome decisões informadas para expandir sua clínica.",
	},
];
