import { Helmet } from "react-helmet-async";
import { Outlet, useLocation, useParams } from "react-router-dom";
import { PatientTabs } from "./patient-tabs";
import { PatientAbout } from "./patient-about";

export function Patient() {
	const location = useLocation();
	const { id } = useParams();
	const isPatientList = location.pathname === `/pacientes/${id}`;

	return (
		<>
			<Helmet title="Paciente" />
			<div className="flex flex-col gap-4">
				<h1 className="text-xl sm:text-2xl font-bold tracking-tight flex items-center gap-2">
					<span className="hover:text-zinc-600 dark:hover:text-zinc-400 transition-all cursor-pointer">
						Pacientes
					</span>
					/ Guilherme Michels
				</h1>

				<PatientTabs />

				{isPatientList ? (
					<>
						<PatientAbout />
					</>
				) : (
					<Outlet />
				)}
			</div>
		</>
	);
}
