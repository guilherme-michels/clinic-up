import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, useLocation } from "react-router-dom";

export function PatientsTabs() {
	const location = useLocation();
	const currentPath = location.pathname;

	const getActiveTab = () => {
		if (currentPath.includes("/pacientes/cadastro")) {
			return "cadastro";
		}
		return "lista";
	};

	return (
		<Tabs value={getActiveTab()} className="w-full">
			<TabsList>
				<TabsTrigger value="lista" asChild>
					<Link to="/pacientes">Lista</Link>
				</TabsTrigger>
				<TabsTrigger value="cadastro" asChild>
					<Link to="/pacientes/cadastro">Cadastro</Link>
				</TabsTrigger>
			</TabsList>
		</Tabs>
	);
}
