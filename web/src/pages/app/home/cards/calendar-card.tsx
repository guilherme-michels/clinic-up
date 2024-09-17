import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { truncateText } from "@/utils";
import { Calendar, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { HomeCardSkeleton } from "./home-card-skeleton";

// Dados simulados de compromissos
const upcomingAppointments = [
	{
		id: 1,
		title: "Reunião com cliente",
		description: "Finalização e apresentação do projeto X",
		date: "2023-06-15T14:00:00",
	},
	{
		id: 2,
		title: "Entrega do projeto",
		description:
			"Confraternização mensal no restaurante Y. Confraternização mensal no restaurante Y",
		date: "2023-06-17T09:00:00",
	},
	{
		id: 3,
		title: "Almoço de equipe",
		description: "Confraternização mensal no restaurante Y",
		date: "2023-06-18T12:30:00",
	},
	{
		id: 4,
		title: "Reunião com cliente",
		description: "Finalização e apresentação do projeto X",
		date: "2023-06-15T14:00:00",
	},
	{
		id: 5,
		title: "Entrega do projeto",
		description:
			"Confraternização mensal no restaurante Y. Confraternização mensal no restaurante Y",
		date: "2023-06-17T09:00:00",
	},
	{
		id: 6,
		title: "Almoço de equipe",
		description: "Confraternização mensal no restaurante Y",
		date: "2023-06-18T12:30:00",
	},
];

export function CalendarCard() {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 1000);

		return () => clearTimeout(timer);
	}, []);

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString("pt-BR", {
			day: "2-digit",
			month: "2-digit",
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	const handleAppointmentClick = (id: number) => {
		console.log(`Compromisso ${id} clicado`);
	};

	return (
		<Card className="max-h-[400px] flex flex-col">
			<CardHeader className="flex-row items-center justify-between space-y-0 pb-4">
				<CardTitle className="font-semibold">Próximos Compromissos</CardTitle>

				<Calendar className="h-4 w-4 text-muted-foreground" />
			</CardHeader>
			<CardContent className="flex-grow overflow-y-auto space-y-4">
				{!isLoading ? (
					<ul className="space-y-2">
						{upcomingAppointments.map((appointment) => (
							<li key={appointment.id}>
								<Button
									variant="ghost"
									className="w-full justify-start text-left hover:bg-muted/50 h-12"
									onClick={() => handleAppointmentClick(appointment.id)}
								>
									<div className="flex items-start w-full">
										<div className="flex-grow">
											<span className="font-medium block mb-1 ">
												{appointment.title}
											</span>
											<span className="text-xs text-muted-foreground block">
												{truncateText(appointment.description, 35)}
											</span>
										</div>
										<div className="flex flex-col items-end min-fit shrink-0">
											<span className="text-xs text-muted-foreground whitespace-nowrap">
												{formatDate(appointment.date)}
											</span>
											<ChevronRight className="h-4 w-4 text-muted-foreground mt-1" />
										</div>
									</div>
								</Button>
							</li>
						))}
					</ul>
				) : (
					<HomeCardSkeleton />
				)}
			</CardContent>
		</Card>
	);
}
