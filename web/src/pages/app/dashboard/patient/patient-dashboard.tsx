import { PatientAgeGroupCard } from "./patient-age-group-card";

export function PatientDashboard() {
	return (
		<div className="grid grid-cols-2 gap-4">
			<PatientAgeGroupCard />
		</div>
	);
}
