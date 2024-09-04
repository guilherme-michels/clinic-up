import { Helmet } from "react-helmet-async";
import { DashboardTabs } from "./dashboard-tabs";
import { AppointmentDashboard } from "./appointment/appointment-dashboard";
import { Outlet, useLocation } from "react-router-dom";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { DatePickerWithRange } from "@/components/date-range-picker";

export function Dashboard() {
	const location = useLocation();
	const isDashboardList = location.pathname === "/analise-dados";

	return (
		<>
			<Helmet title="Dashboard" />
			<div className="flex flex-col gap-4">
				<h1 className="text-xl sm:text-2xl  font-bold tracking-tight">
					Análise de dados
				</h1>

				<div className="w-full justify-between items-center flex">
					<DashboardTabs />

					<div className="gap-2 flex items-center">
						<DatePickerWithRange />

						<Select>
							<SelectTrigger className="w-[180px]">
								<SelectValue placeholder="Período" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="light">30 Dias</SelectItem>
								<SelectItem value="dark">60 Dias</SelectItem>
								<SelectItem value="system">Selecionar período</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>

				{isDashboardList ? <AppointmentDashboard /> : <Outlet />}
			</div>
		</>
	);
}
