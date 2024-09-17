import {
	Bar,
	BarChart,
	CartesianGrid,
	LabelList,
	ResponsiveContainer,
	XAxis,
	YAxis,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
	{ faixaEtaria: "0-10", pacientes: 120 },
	{ faixaEtaria: "11-20", pacientes: 200 },
	{ faixaEtaria: "21-30", pacientes: 300 },
	{ faixaEtaria: "31-40", pacientes: 250 },
	{ faixaEtaria: "41-50", pacientes: 180 },
	{ faixaEtaria: "51-60", pacientes: 150 },
	{ faixaEtaria: "61+", pacientes: 100 },
];

const chartConfig = {
	pacientes: {
		label: "Pacientes",
		color: "hsl(var(--chart-1))",
	},
	label: {
		color: "hsl(var(--background))",
	},
} satisfies ChartConfig;

export function PatientAgeGroupCard() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Distribuição de faixa etária dos pacientes</CardTitle>
			</CardHeader>
			<CardContent>
				<ChartContainer config={chartConfig} className="max-h-[300px] w-full">
					<ResponsiveContainer width="100%" height="100%">
						<BarChart
							accessibilityLayer
							data={chartData}
							layout="vertical"
							margin={{
								right: 40,
							}}
						>
							<CartesianGrid horizontal={false} />
							<YAxis
								dataKey="faixaEtaria"
								type="category"
								tickLine={false}
								tickMargin={10}
								axisLine={false}
							/>
							<XAxis dataKey="pacientes" type="number" hide />
							<ChartTooltip
								cursor={false}
								content={<ChartTooltipContent indicator="line" />}
							/>
							<Bar
								dataKey="pacientes"
								layout="vertical"
								fill="var(--color-pacientes)"
								radius={4}
							>
								<LabelList
									dataKey="pacientes"
									position="right"
									offset={8}
									className="fill-foreground"
									fontSize={12}
								/>
							</Bar>
						</BarChart>
					</ResponsiveContainer>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
