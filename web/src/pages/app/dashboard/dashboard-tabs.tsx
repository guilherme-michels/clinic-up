import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, useLocation } from "react-router-dom";

export function DashboardTabs() {
	const location = useLocation();
	const currentPath = location.pathname;

	const getActiveTab = () => {
		if (currentPath === "/analise-dados") {
			return "appointment";
		}
		if (currentPath.includes("/analise-dados/financeiro")) {
			return "financial";
		}
		if (currentPath.includes("/analise-dados/pacientes")) {
			return "patient";
		}
		return "appointment";
	};

	return (
		<Tabs value={getActiveTab()} className="w-full">
			<TabsList>
				<TabsTrigger value="appointment" asChild>
					<Link to={"/analise-dados"}>Agendamentos</Link>
				</TabsTrigger>
				<TabsTrigger value="financial" asChild>
					<Link to={"/analise-dados/financeiro"}>Financeiro</Link>
				</TabsTrigger>
				<TabsTrigger value="patient" asChild>
					<Link to={"/analise-dados/pacientes"}>Pacientes</Link>
				</TabsTrigger>
			</TabsList>
		</Tabs>
	);
}
