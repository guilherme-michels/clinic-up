import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, DollarSign, TrendingDown, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { HomeCardSkeleton } from "./home-card-skeleton";

interface FinancialStats {
	totalRevenue: number;
	toReceive: number;
	totalExpenses: number;
	toPay: number;
	profit: number;
	pendingInvoices: number;
}

// Dados simulados
const financialStats: FinancialStats = {
	totalRevenue: 150000,
	toReceive: 30000,
	totalExpenses: 100000,
	toPay: 20000,
	profit: 50000,
	pendingInvoices: 25000,
};

interface StatItemProps {
	icon: React.ReactNode;
	label: string;
	value: number;
	subLabel?: string;
	subValue?: number;
	lineColor?: string;
}

const StatItem: React.FC<StatItemProps> = ({
	icon,
	label,
	value,
	subLabel,
	subValue,
	lineColor,
}) => (
	<div className="space-y-1">
		<div className="flex items-center justify-between">
			<p className="font-medium flex gap-2 items-center">
				{icon}
				{label}
			</p>
			<p className="text-base xl:text-xl font-bold">
				{value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
			</p>
		</div>
		{subLabel && subValue && (
			<>
				{lineColor && (
					<div className={`h-[2px] ${lineColor} my-1 rounded bg-opacity-70`} />
				)}
				<p className="text-sm text-muted-foreground flex justify-between">
					<span>{subLabel}</span>
					<span>
						{subValue.toLocaleString("pt-BR", {
							style: "currency",
							currency: "BRL",
						})}
					</span>
				</p>
			</>
		)}
	</div>
);

export function FinancialCard() {
	const [isLoading, setIsLoading] = useState(true);
	const [stats, setStats] = useState<FinancialStats | null>(null);

	useEffect(() => {
		const timer = setTimeout(() => {
			setStats(financialStats);
			setIsLoading(false);
		}, 1000);

		return () => clearTimeout(timer);
	}, []);

	return (
		<Card className="max-h-[400px]">
			<CardHeader className="flex-row items-center justify-between space-y-0 pb-4">
				<CardTitle className="font-semibold">Resumo Financeiro</CardTitle>
				<Button className="flex items-center gap-2">
					Analisar métricas
					<DollarSign className="h-4 w-4 text-muted" />
				</Button>
			</CardHeader>
			<CardContent className="space-y-4 overflow-y-auto">
				{!isLoading && stats ? (
					<>
						<StatItem
							icon={<TrendingUp className="h-4 w-4 text-emerald-500" />}
							label="Receita Total"
							value={stats.totalRevenue}
							subLabel="A receber"
							subValue={stats.toReceive}
							lineColor="bg-emerald-500"
						/>
						<StatItem
							icon={<TrendingDown className="h-4 w-4 text-red-500" />}
							label="Despesas Totais"
							value={stats.totalExpenses}
							subLabel="A pagar"
							subValue={stats.toPay}
							lineColor="bg-red-500"
						/>
						<StatItem
							icon={<DollarSign className="h-4 w-4 text-blue-500" />}
							label="Lucro"
							value={stats.profit}
							subLabel="Previsto"
							subValue={stats.toPay}
							lineColor="bg-blue-500"
						/>
					</>
				) : (
					<HomeCardSkeleton />
				)}
			</CardContent>
		</Card>
	);
}
