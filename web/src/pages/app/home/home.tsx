import { Helmet } from "react-helmet-async";
import { CalendarCard } from "./cards/calendar-card";
import { PatientCard } from "./cards/patient-card";
import { FinancialCard } from "./cards/financial-card";
import { CustomerSatisfactionCard } from "./cards/customer-satisfaction-card";
import { ClinicGoalsCard } from "./cards/clinic-goals-card";

export function Home() {
	return (
		<>
			<Helmet title="Home" />
			<div className="flex flex-col gap-4">
				<h1 className="text-xl sm:text-2xl  font-bold tracking-tight">
					Página inicial
				</h1>

				<div className="grid lg:grid-cols-2 gap-4 ">
					<CalendarCard />
					<PatientCard />
				</div>

				<div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
					<FinancialCard />

					<CustomerSatisfactionCard />
					<ClinicGoalsCard />
				</div>
			</div>
		</>
	);
}
