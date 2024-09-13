import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

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
import { trpc } from "@/App";

export const description = "Gráfico de barras de atendimentos realizados";

const chartConfig = {
	appointments: {
		label: "Atendimentos",
		color: "hsl(var(--chart-2))",
	},
} satisfies ChartConfig;

export function ClinicGoalsCard() {
	const { data: chartData, isLoading } =
		trpc.appointment.getCompletedAppointmentsLast6Months.useQuery();

	if (isLoading) {
		return <div>Carregando...</div>;
	}

	if (!chartData) {
		return <div>Nenhum dado disponível</div>;
	}

	return (
		<Card className="max-h-[400px]">
			<CardHeader>
				<CardTitle>Atendimentos realizados</CardTitle>
				<CardDescription>Últimos 6 meses</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer config={chartConfig} className="h-[200px] w-full">
					<BarChart accessibilityLayer data={chartData}>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="month"
							tickLine={false}
							tickMargin={10}
							axisLine={false}
							tickFormatter={(value: string) => value.slice(0, 3)}
							stroke="#666"
							fontSize={12}
						/>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent indicator="dashed" />}
						/>
						<Bar
							dataKey="appointments"
							fill="var(--color-appointments)"
							radius={4}
						/>
					</BarChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
