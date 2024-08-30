import { Helmet } from "react-helmet-async";
import { PatientListWeb } from "./cards/patient-list/patient-list-web";
import { PatientTabs } from "./patient-tabs";
import { PatientListMobile } from "./cards/patient-list/patient-list-mobile";

export function Patients() {
	return (
		<>
			<Helmet title="Pacientes" />
			<div className="flex flex-col gap-4">
				<h1 className="text-xl sm:text-3xl font-bold tracking-tight">
					Pacientes
				</h1>
				<PatientTabs />

				<div className="hidden md:block">
					<PatientListWeb />
				</div>
				<div className="md:hidden">
					<PatientListMobile />
				</div>
			</div>
		</>
	);
}
