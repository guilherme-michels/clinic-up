import { AppointmentCompletedCard } from "./appointment-completed-card";
import { AppointmentTypes } from "./appointment-types-card";

export function AppointmentDashboard() {
	return (
		<div className="grid grid-cols-2 gap-4">
			<AppointmentCompletedCard />
			<AppointmentTypes />
		</div>
	);
}
