import { useState, useEffect } from "react";
import { DollarSign, TrendingUp, TrendingDown, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

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
export function FinancialIncomeCard() {
	const [isLoading, setIsLoading] = useState(true);
	const [stats, setStats] = useState<FinancialStats | null>(null);

	useEffect(() => {
		const timer = setTimeout(() => {
			setStats(financialStats);
			setIsLoading(false);
		}, 3000);

		return () => clearTimeout(timer);
	}, []);

	return (
		<Card className="max-h-[400px] col-span-2 h-fit">
			<CardHeader>
				<CardTitle>Receita</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4 overflow-y-auto">
				{!isLoading && stats ? (
					<>
						<StatItem
							icon={<TrendingUp className="h-4 w-4 text-emerald-500" />}
							label="Entradas"
							value={stats.totalRevenue}
							subLabel="A receber"
							subValue={stats.toReceive}
							lineColor="bg-emerald-500"
						/>
						<StatItem
							icon={<TrendingDown className="h-4 w-4 text-rose-500" />}
							label="Saídas"
							value={stats.totalExpenses}
							subLabel="A pagar"
							subValue={stats.toPay}
							lineColor="bg-rose-500"
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
					<div className="flex w-full flex-col gap-4">
						<Skeleton className="h-12" />
						<Skeleton className="h-12" />
						<Skeleton className="h-12" />
					</div>
				)}
			</CardContent>
		</Card>
	);
}
