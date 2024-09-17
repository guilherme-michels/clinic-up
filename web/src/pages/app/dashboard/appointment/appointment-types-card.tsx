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

export const description = "A multiple bar chart";

const chartData = [
	{ month: "January", appointments: 186 },
	{ month: "February", appointments: 305 },
	{ month: "March", appointments: 237 },
	{ month: "April", appointments: 73 },
	{ month: "May", appointments: 209 },
	{ month: "June", appointments: 214 },
];

const chartConfig = {
	appointments: {
		label: "Atendimentos",
		color: "hsl(var(--chart-2))",
	},
} satisfies ChartConfig;

export function AppointmentTypes() {
	return (
		<Card className="max-h-[400px]">
			<CardHeader>
				<CardTitle>Atendimentos realizados</CardTitle>
				<CardDescription>Abril 2024 - Setembro 2024</CardDescription>
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
