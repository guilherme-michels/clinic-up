import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, useLocation, useParams } from "react-router-dom";

export function PatientTabs() {
	const location = useLocation();
	const { id } = useParams();
	const currentPath = location.pathname;

	const getActiveTab = () => {
		if (currentPath.endsWith(`/pacientes/${id}`)) {
			return "about";
		}
		if (currentPath.includes(`/pacientes/${id}/historico`)) {
			return "history";
		}
		if (currentPath.includes(`/pacientes/${id}/imagens`)) {
			return "image";
		}
		if (currentPath.includes(`/pacientes/${id}/orcamentos`)) {
			return "budget";
		}
		return "about";
	};

	return (
		<Tabs value={getActiveTab()} className="w-full">
			<TabsList>
				<TabsTrigger value="about" asChild>
					<Link to={`/pacientes/${id}`}>Sobre</Link>
				</TabsTrigger>
				<TabsTrigger value="history" asChild>
					<Link to={`/pacientes/${id}/historico`}>Histórico</Link>
				</TabsTrigger>
				<TabsTrigger value="image" asChild>
					<Link to={`/pacientes/${id}/imagens`}>Imagens</Link>
				</TabsTrigger>
				<TabsTrigger value="budget" asChild>
					<Link to={`/pacientes/${id}/orcamentos`}>Orçamentos</Link>
				</TabsTrigger>
			</TabsList>
		</Tabs>
	);
}
