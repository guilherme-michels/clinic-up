import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, XCircle } from "lucide-react";

interface TransactionSummary {
	status: string;
	count: number;
	icon: React.ReactNode;
	onClick: () => void;
}

const transactionSummary: TransactionSummary[] = [
	{
		status: "Concluídas",
		count: 150,
		icon: <CheckCircle className="h-4 w-4" />,
		onClick: () => console.log("Clicou em Concluídas"),
	},
	{
		status: "Pendentes",
		count: 30,
		icon: <Clock className="h-4 w-4" />,
		onClick: () => console.log("Clicou em Pendentes"),
	},
	{
		status: "Canceladas",
		count: 5,
		icon: <XCircle className="h-4 w-4" />,
		onClick: () => console.log("Clicou em Canceladas"),
	},
];

export function FinancialTransactionSummaryCard() {
	return (
		<Card className="h-fit">
			<CardHeader>
				<CardTitle>Resumo de Transações</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="space-y-2">
					{transactionSummary.map((item) => (
						<Button
							key={item.status}
							variant="ghost"
							className="w-full justify-between hover:bg-secondary"
							onClick={item.onClick}
						>
							<div className="flex items-center space-x-2">
								{item.icon}
								<span>{item.status}</span>
							</div>
							<span className="font-semibold">{item.count}</span>
						</Button>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
