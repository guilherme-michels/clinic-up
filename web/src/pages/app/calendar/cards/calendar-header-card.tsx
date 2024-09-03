import { useState, useEffect } from "react";
import { AlertCircle, Calendar, CheckCircle, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarCardSkeleton } from "./calendar-card-skeleton";

interface AgendaStats {
	appointmentsToday: number;
	appointmentsThisWeek: number;
	completedAppointments: number;
	upcomingAppointments: number;
}

// Dados simulados
const agendaStats: AgendaStats = {
	appointmentsToday: 8,
	appointmentsThisWeek: 35,
	completedAppointments: 120,
	upcomingAppointments: 45,
};

interface StatItemProps {
	icon: React.ReactNode;
	label: string;
	value: number;
}

const StatItem: React.FC<StatItemProps> = ({ icon, label, value }) => (
	<div className="flex items-center gap-1 p-2 rounded-md">
		<div className="flex items-center gap-2">
			{icon}
			<span className="text-xs font-medium">{label}:</span>
		</div>
		<span className="text-sm font-semibold">{value}</span>
	</div>
);

export function CalendarHeaderCard() {
	const [isLoading, setIsLoading] = useState(true);
	const [stats, setStats] = useState<AgendaStats | null>(null);

	useEffect(() => {
		const timer = setTimeout(() => {
			setStats(agendaStats);
			setIsLoading(false);
		}, 1000);

		return () => clearTimeout(timer);
	}, []);

	return (
		<Card>
			<CardContent className="space-y-4 pb-2 pt-2 px-2">
				{!isLoading && stats ? (
					<div className="grid grid-cols-2">
						<StatItem
							icon={<Clock className="h-4 w-4 text-blue-500" />}
							label="Compromissos Hoje"
							value={stats.appointmentsToday}
						/>
						<StatItem
							icon={<Calendar className="h-4 w-4 text-green-500" />}
							label="Compromissos Esta Semana"
							value={stats.appointmentsThisWeek}
						/>
						<StatItem
							icon={<CheckCircle className="h-4 w-4 text-purple-500" />}
							label="Compromissos Realizados"
							value={stats.completedAppointments}
						/>
						<StatItem
							icon={<AlertCircle className="h-4 w-4 text-orange-500" />}
							label="Próximos Compromissos"
							value={stats.upcomingAppointments}
						/>
					</div>
				) : (
					<CalendarCardSkeleton />
				)}
			</CardContent>
		</Card>
	);
}
