import { Helmet } from "react-helmet-async";
import { PatientListWeb } from "./patient-list/patient-list-web";
import { PatientTabs } from "./patient-tabs";
import { PatientListMobile } from "./patient-list/patient-list-mobile";
import { Outlet, useLocation } from "react-router-dom";

export function Patients() {
	const location = useLocation();
	const isPatientList = location.pathname === "/pacientes";

	return (
		<>
			<Helmet title="Pacientes" />
			<div className="flex flex-col gap-4">
				<h1 className="text-xl sm:text-3xl font-bold tracking-tight">
					Pacientes
				</h1>

				<PatientTabs />

				{isPatientList ? (
					<>
						<div className="hidden md:block">
							<PatientListWeb />
						</div>
						<div className="md:hidden">
							<PatientListMobile />
						</div>
					</>
				) : (
					<Outlet />
				)}
			</div>
		</>
	);
}
