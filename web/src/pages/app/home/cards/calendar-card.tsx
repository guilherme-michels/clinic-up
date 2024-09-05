import { useState, useEffect, useCallback } from "react";
import { Calendar, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HomeCardSkeleton } from "./home-card-skeleton";
import { Button } from "@/components/ui/button";

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

function useWindowSize() {
	const [size, setSize] = useState([0, 0]);
	useEffect(() => {
		function updateSize() {
			setSize([window.innerWidth, window.innerHeight]);
		}
		window.addEventListener("resize", updateSize);
		updateSize();
		return () => window.removeEventListener("resize", updateSize);
	}, []);
	return size;
}

export function CalendarCard() {
	const [isLoading, setIsLoading] = useState(true);
	const [width] = useWindowSize();
	const [maxDescriptionLength, setMaxDescriptionLength] = useState(0);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 1000);

		return () => clearTimeout(timer);
	}, []);

	useEffect(() => {
		const newMaxLength = Math.max(30, Math.floor(width / 26));
		setMaxDescriptionLength(newMaxLength);
	}, [width]);

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

	const truncateDescription = useCallback(
		(description: string) => {
			if (description.length <= maxDescriptionLength) return description;
			return `${description.slice(0, maxDescriptionLength)}...`;
		},
		[maxDescriptionLength],
	);

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
												{truncateDescription(appointment.description)}
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
