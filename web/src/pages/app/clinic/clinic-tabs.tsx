import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Link, useLocation } from "react-router-dom";

export function ClinicTabs() {
	const location = useLocation();
	const currentPath = location.pathname;

	const getActiveTab = () => {
		if (currentPath === "/minha-clinica") {
			return "data";
		}
		if (currentPath.includes("/minha-clinica/planos")) {
			return "plans";
		}
		if (currentPath.includes("/minha-clinica/anamnese")) {
			return "anamnese";
		}
		return "data";
	};

	return (
		<Tabs value={getActiveTab()} className="w-full">
			<TabsList>
				<TabsTrigger value="data" asChild>
					<Link to={"/minha-clinica"}>Dados</Link>
				</TabsTrigger>
				<TabsTrigger value="plans" asChild>
					<Link to={"/minha-clinica/planos"}>Planos</Link>
				</TabsTrigger>
				<TabsTrigger value="anamnese" asChild>
					<Link to={"/minha-clinica/anamnese"}>Anamnese</Link>
				</TabsTrigger>
			</TabsList>
		</Tabs>
	);
}
