import { useState, useEffect } from "react";
import { SmilePlus, Frown, Star, MessageCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HomeCardSkeleton } from "./home-card-skeleton";

import {
	Label,
	PolarAngleAxis,
	PolarGrid,
	PolarRadiusAxis,
	RadialBar,
	RadialBarChart,
} from "recharts";
import { type ChartConfig, ChartContainer } from "@/components/ui/chart";

interface SatisfactionStats {
	overallScore: number;
	totalReviews: number;
	positivePercentage: number;
	negativePercentage: number;
}

// Dados simulados
const satisfactionStats: SatisfactionStats = {
	overallScore: 4.7,
	totalReviews: 1250,
	positivePercentage: 92,
	negativePercentage: 8,
};

const chartConfig = {
	satisfaction: {
		label: "Satisfação",
		color: "hsl(var(--chart-2))",
	},
} satisfies ChartConfig;

const chartData = [
	{
		name: "Satisfação",
		satisfaction: 100,
		fill: "hsl(var(--chart-2))",
	},
];

export function CustomerSatisfactionCard() {
	const [isLoading, setIsLoading] = useState(true);
	const [stats, setStats] = useState<SatisfactionStats | null>(null);

	useEffect(() => {
		const timer = setTimeout(() => {
			setStats(satisfactionStats);
			setIsLoading(false);
		}, 1000);

		return () => clearTimeout(timer);
	}, []);

	return (
		<Card className="max-h-[400px]">
			<CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="text-base font-semibold">
					Satisfação do Cliente
				</CardTitle>
				<Star className="size-4" />
			</CardHeader>
			<CardContent className="space-y-4">
				{!isLoading && stats ? (
					<div className="flex space-y-4 flex-col">
						<div className="flex items-center space-x-3 justify-center w-full">
							<ChartContainer
								config={chartConfig}
								className="w-1/2 aspect-square max-h-[150px]"
							>
								<RadialBarChart
									data={chartData}
									startAngle={0}
									endAngle={360}
									innerRadius={50}
									outerRadius={40}
								>
									<PolarGrid
										gridType="circle"
										radialLines={false}
										polarRadius={[40, 0]}
									/>

									<RadialBar
										background
										dataKey="satisfaction"
										cornerRadius={10}
										fill={chartConfig.satisfaction.color}
									/>
									<text
										x="50%"
										y="50%"
										textAnchor="middle"
										dominantBaseline="middle"
										className="fill-foreground text-xl xl:text-2xl font-bold"
									>
										{chartData[0].satisfaction}%
									</text>
								</RadialBarChart>
							</ChartContainer>

							<div className="flex flex-col text-sm gap-1">
								<div className="flex items-center gap-1">
									<SmilePlus className="h-4 w-4 text-emerald-500" />
									<span className="text-xs xl:text-sm w-full">
										{stats.positivePercentage}% Positivas
									</span>
								</div>
								<div className="flex items-center gap-1">
									<Frown className="h-4 w-4 text-rose-500" />
									<span className="text-xs xl:text-sm w-full">
										{stats.negativePercentage}% Negativas
									</span>
								</div>
							</div>
						</div>

						<div className="flex justify-around items-center">
							<div className="space-y-1">
								<p className="text-2xl font-bold flex items-center gap-2">
									{stats.overallScore.toFixed(1)}

									<Star />
								</p>
								<p className="text-xs text-muted-foreground">Pontuação Geral</p>
							</div>
							<div className="text-right space-y-1">
								<p className="text-xl font-semibold">{stats.totalReviews}</p>
								<p className="text-xs text-muted-foreground flex items-center justify-end gap-1">
									<MessageCircle className="h-3 w-3" />
									Avaliações
								</p>
							</div>
						</div>
					</div>
				) : (
					<HomeCardSkeleton />
				)}
			</CardContent>
		</Card>
	);
}
