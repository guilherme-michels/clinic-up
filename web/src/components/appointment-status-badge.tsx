import { Badge } from "@/components/ui/badge";

type AppointmentStatusType = "SCHEDULED" | "CANCELED" | "COMPLETED";

interface AppointmentStatusBadgeProps {
	status: AppointmentStatusType;
}

export function AppointmentStatusBadge({
	status,
}: AppointmentStatusBadgeProps) {
	const getStatusColor = (status: AppointmentStatusType) => {
		switch (status) {
			case "SCHEDULED":
				return "bg-blue-500 hover:bg-blue-600";
			case "CANCELED":
				return "bg-red-500 hover:bg-red-600";
			case "COMPLETED":
				return "bg-green-500 hover:bg-green-600";
			default:
				return "bg-gray-500 hover:bg-gray-600";
		}
	};

	const getStatusLabel = (status: AppointmentStatusType) => {
		switch (status) {
			case "SCHEDULED":
				return "Agendada";
			case "CANCELED":
				return "Cancelada";
			case "COMPLETED":
				return "Concluída";
			default:
				return "Desconhecido";
		}
	};

	return (
		<Badge className={`${getStatusColor(status)} text-white`}>
			{getStatusLabel(status)}
		</Badge>
	);
}
