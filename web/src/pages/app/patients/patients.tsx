import { Helmet } from "react-helmet-async";
import { Outlet, useLocation } from "react-router-dom";
import { PatientListMobile } from "./patient-list/patient-list-mobile";
import { PatientListWeb } from "./patient-list/patient-list-web";
import { PatientsTabs } from "./patients-tabs";

export function Patients() {
	const location = useLocation();
	const isPatientList = location.pathname === "/pacientes";

	return (
		<>
			<Helmet title="Pacientes" />
			<div className="flex flex-col gap-4">
				<h1 className="text-xl sm:text-2xl  font-bold tracking-tight">
					Pacientes
				</h1>

				<PatientsTabs />

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
