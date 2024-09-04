import {
	PolarAngleAxis,
	PolarGrid,
	Radar,
	RadarChart,
	ResponsiveContainer,
} from "recharts";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
	{ method: "Cartão", count: 250 },
	{ method: "Dinheiro", count: 100 },
	{ method: "PIX", count: 180 },
	{ method: "Transferência", count: 70 },
];

const chartConfig = {
	count: {
		label: "Quantidade",
		color: "hsl(var(--chart-1))",
	},
} satisfies ChartConfig;

export function FinancialPaymentMethodsCard() {
	return (
		<Card>
			<CardHeader className="items-center pb-4">
				<CardTitle>Métodos de Pagamento</CardTitle>
				<CardDescription>
					Distribuição de transações por método de pagamento
				</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer config={chartConfig} className="mx-auto aspect-square ">
					<ResponsiveContainer>
						<RadarChart
							data={chartData}
							margin={{
								top: 5,
								right: 100,
								bottom: 5,
								left: 5,
							}}
						>
							<ChartTooltip
								cursor={false}
								content={<ChartTooltipContent indicator="line" />}
							/>
							<PolarAngleAxis dataKey="method" />
							<PolarGrid />
							<Radar
								dataKey="count"
								fill="var(--color-count)"
								fillOpacity={0.6}
								stroke="var(--color-count)"
							/>
						</RadarChart>
					</ResponsiveContainer>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}

import {
	PolarAngleAxis,
	PolarGrid,
	Radar,
	RadarChart,
	ResponsiveContainer,
} from "recharts";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
	{ method: "Cartão", count: 250 },
	{ method: "Dinheiro", count: 100 },
	{ method: "PIX", count: 180 },
	{ method: "Transferência", count: 70 },
];

const chartConfig = {
	count: {
		label: "Quantidade",
		color: "hsl(var(--chart-1))",
	},
} satisfies ChartConfig;

export function FinancialPaymentMethodsCard() {
	return (
		<Card>
			<CardHeader className="items-center pb-4">
				<CardTitle>Métodos de Pagamento</CardTitle>
				<CardDescription>
					Distribuição de transações por método de pagamento
				</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer
					config={chartConfig}
					className="mx-auto h-[250px] w-full"
				>
					<ResponsiveContainer>
						<RadarChart
							data={chartData}
							margin={{
								top: 20,
								right: 30,
								bottom: 20,
								left: 30,
							}}
						>
							<ChartTooltip
								cursor={false}
								content={<ChartTooltipContent indicator="line" />}
							/>
							<PolarAngleAxis dataKey="method" tick={{ fontSize: 12 }} />
							<PolarGrid stroke="var(--border)" />
							<Radar
								dataKey="count"
								fill="var(--color-count)"
								fillOpacity={0.6}
								stroke="var(--color-count)"
							/>
						</RadarChart>
					</ResponsiveContainer>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
