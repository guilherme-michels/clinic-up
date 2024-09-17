import { useEffect, useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

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
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";

import { Skeleton } from "@/components/ui/skeleton";

export const description = "An interactive area chart";

const chartData = [
	{ date: "2024-04-01", inflow: 222, outflow: 150 },
	{ date: "2024-04-02", inflow: 97, outflow: 180 },
	{ date: "2024-04-03", inflow: 167, outflow: 120 },
	{ date: "2024-04-04", inflow: 242, outflow: 260 },
	{ date: "2024-04-05", inflow: 373, outflow: 290 },
	{ date: "2024-04-06", inflow: 301, outflow: 340 },
	{ date: "2024-04-07", inflow: 245, outflow: 180 },
	{ date: "2024-04-08", inflow: 409, outflow: 320 },
	{ date: "2024-04-09", inflow: 59, outflow: 110 },
	{ date: "2024-04-10", inflow: 261, outflow: 190 },
	{ date: "2024-04-11", inflow: 327, outflow: 350 },
	{ date: "2024-04-12", inflow: 292, outflow: 210 },
	{ date: "2024-04-13", inflow: 342, outflow: 380 },
	{ date: "2024-04-14", inflow: 137, outflow: 220 },
	{ date: "2024-04-15", inflow: 120, outflow: 170 },
	{ date: "2024-04-16", inflow: 138, outflow: 190 },
	{ date: "2024-04-17", inflow: 446, outflow: 360 },
	{ date: "2024-04-18", inflow: 364, outflow: 410 },
	{ date: "2024-04-19", inflow: 243, outflow: 180 },
	{ date: "2024-04-20", inflow: 89, outflow: 150 },
	{ date: "2024-04-21", inflow: 137, outflow: 200 },
	{ date: "2024-04-22", inflow: 224, outflow: 170 },
	{ date: "2024-04-23", inflow: 138, outflow: 230 },
	{ date: "2024-04-24", inflow: 387, outflow: 290 },
	{ date: "2024-04-25", inflow: 215, outflow: 250 },
	{ date: "2024-04-26", inflow: 75, outflow: 130 },
	{ date: "2024-04-27", inflow: 383, outflow: 420 },
	{ date: "2024-04-28", inflow: 122, outflow: 180 },
	{ date: "2024-04-29", inflow: 315, outflow: 240 },
	{ date: "2024-04-30", inflow: 454, outflow: 380 },
	{ date: "2024-05-01", inflow: 165, outflow: 220 },
	{ date: "2024-05-02", inflow: 293, outflow: 310 },
	{ date: "2024-05-03", inflow: 247, outflow: 190 },
	{ date: "2024-05-04", inflow: 385, outflow: 420 },
	{ date: "2024-05-05", inflow: 481, outflow: 390 },
	{ date: "2024-05-06", inflow: 498, outflow: 520 },
	{ date: "2024-05-07", inflow: 388, outflow: 300 },
	{ date: "2024-05-08", inflow: 149, outflow: 210 },
	{ date: "2024-05-09", inflow: 227, outflow: 180 },
	{ date: "2024-05-10", inflow: 293, outflow: 330 },
	{ date: "2024-05-11", inflow: 335, outflow: 270 },
	{ date: "2024-05-12", inflow: 197, outflow: 240 },
	{ date: "2024-05-13", inflow: 197, outflow: 160 },
	{ date: "2024-05-14", inflow: 448, outflow: 490 },
	{ date: "2024-05-15", inflow: 473, outflow: 380 },
	{ date: "2024-05-16", inflow: 338, outflow: 400 },
	{ date: "2024-05-17", inflow: 499, outflow: 420 },
	{ date: "2024-05-18", inflow: 315, outflow: 350 },
	{ date: "2024-05-19", inflow: 235, outflow: 180 },
	{ date: "2024-05-20", inflow: 177, outflow: 230 },
	{ date: "2024-05-21", inflow: 82, outflow: 140 },
	{ date: "2024-05-22", inflow: 81, outflow: 120 },
	{ date: "2024-05-23", inflow: 252, outflow: 290 },
	{ date: "2024-05-24", inflow: 294, outflow: 220 },
	{ date: "2024-05-25", inflow: 201, outflow: 250 },
	{ date: "2024-05-26", inflow: 213, outflow: 170 },
	{ date: "2024-05-27", inflow: 420, outflow: 460 },
	{ date: "2024-05-28", inflow: 233, outflow: 190 },
	{ date: "2024-05-29", inflow: 78, outflow: 130 },
	{ date: "2024-05-30", inflow: 340, outflow: 280 },
	{ date: "2024-05-31", inflow: 178, outflow: 230 },
	{ date: "2024-06-01", inflow: 178, outflow: 200 },
	{ date: "2024-06-02", inflow: 470, outflow: 410 },
	{ date: "2024-06-03", inflow: 103, outflow: 160 },
	{ date: "2024-06-04", inflow: 439, outflow: 380 },
	{ date: "2024-06-05", inflow: 88, outflow: 140 },
	{ date: "2024-06-06", inflow: 294, outflow: 250 },
	{ date: "2024-06-07", inflow: 323, outflow: 370 },
	{ date: "2024-06-08", inflow: 385, outflow: 320 },
	{ date: "2024-06-09", inflow: 438, outflow: 480 },
	{ date: "2024-06-10", inflow: 155, outflow: 200 },
	{ date: "2024-06-11", inflow: 92, outflow: 150 },
	{ date: "2024-06-12", inflow: 492, outflow: 420 },
	{ date: "2024-06-13", inflow: 81, outflow: 130 },
	{ date: "2024-06-14", inflow: 426, outflow: 380 },
	{ date: "2024-06-15", inflow: 307, outflow: 350 },
	{ date: "2024-06-16", inflow: 371, outflow: 310 },
	{ date: "2024-06-17", inflow: 475, outflow: 520 },
	{ date: "2024-06-18", inflow: 107, outflow: 170 },
	{ date: "2024-06-19", inflow: 341, outflow: 290 },
	{ date: "2024-06-20", inflow: 408, outflow: 450 },
	{ date: "2024-06-21", inflow: 169, outflow: 210 },
	{ date: "2024-06-22", inflow: 317, outflow: 270 },
	{ date: "2024-06-23", inflow: 480, outflow: 530 },
	{ date: "2024-06-24", inflow: 132, outflow: 180 },
	{ date: "2024-06-25", inflow: 141, outflow: 190 },
	{ date: "2024-06-26", inflow: 434, outflow: 380 },
	{ date: "2024-06-27", inflow: 448, outflow: 490 },
	{ date: "2024-06-28", inflow: 149, outflow: 200 },
	{ date: "2024-06-29", inflow: 103, outflow: 160 },
	{ date: "2024-06-30", inflow: 446, outflow: 400 },
];

const chartConfig = {
	visitors: {
		label: "Visitors",
	},
	inflow: {
		label: "Entradas",
		color: "#4dfd08",
	},
	outflow: {
		label: "Saídas",
		color: "#fd0808",
	},
} satisfies ChartConfig;

export function FinancialInflowOutflowCard() {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 3000);

		return () => clearTimeout(timer);
	}, []);

	return (
		<Card>
			<CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
				<div className="grid flex-1 gap-1 text-center sm:text-left">
					<CardTitle>Entradas e Saídas</CardTitle>
					<CardDescription>
						Mostrando entradas e saídas do período
					</CardDescription>
				</div>
			</CardHeader>
			<CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
				{!isLoading ? (
					<ChartContainer
						config={chartConfig}
						className="aspect-auto h-[250px] w-full"
					>
						<AreaChart data={chartData}>
							<defs>
								<linearGradient id="fillinflow" x1="0" y1="0" x2="0" y2="1">
									<stop
										offset="5%"
										stopColor="var(--color-inflow)"
										stopOpacity={0.8}
									/>
									<stop
										offset="95%"
										stopColor="var(--color-inflow)"
										stopOpacity={0.1}
									/>
								</linearGradient>
								<linearGradient id="filloutflow" x1="0" y1="0" x2="0" y2="1">
									<stop
										offset="5%"
										stopColor="var(--color-outflow)"
										stopOpacity={0.8}
									/>
									<stop
										offset="95%"
										stopColor="var(--color-outflow)"
										stopOpacity={0.1}
									/>
								</linearGradient>
							</defs>
							<CartesianGrid vertical={false} />
							<XAxis
								dataKey="date"
								tickLine={false}
								axisLine={false}
								tickMargin={8}
								minTickGap={32}
								tickFormatter={(value) => {
									const date = new Date(value);
									return date.toLocaleDateString("en-US", {
										month: "short",
										day: "numeric",
									});
								}}
							/>
							<ChartTooltip
								cursor={false}
								content={
									<ChartTooltipContent
										labelFormatter={(value) => {
											return new Date(value).toLocaleDateString("en-US", {
												month: "short",
												day: "numeric",
											});
										}}
										indicator="dot"
									/>
								}
							/>
							<Area
								dataKey="outflow"
								type="natural"
								fill="url(#filloutflow)"
								stroke="var(--color-outflow)"
								stackId="a"
							/>
							<Area
								dataKey="inflow"
								type="natural"
								fill="url(#fillinflow)"
								stroke="var(--color-inflow)"
								stackId="a"
							/>
							<ChartLegend content={<ChartLegendContent />} />
						</AreaChart>
					</ChartContainer>
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
