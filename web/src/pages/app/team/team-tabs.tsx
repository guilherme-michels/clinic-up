import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, useLocation } from "react-router-dom";

export function TeamTabs() {
	const location = useLocation();
	const currentPath = location.pathname;

	const getActiveTab = () => {
		if (currentPath.includes("/equipe/cadastro")) {
			return "form";
		}
		return "list";
	};

	return (
		<Tabs value={getActiveTab()} className="w-full">
			<TabsList>
				<TabsTrigger value="list" asChild>
					<Link to="/equipe">Lista</Link>
				</TabsTrigger>
				<TabsTrigger value="form" asChild>
					<Link to="/equipe/cadastro">Cadastro</Link>
				</TabsTrigger>
			</TabsList>
		</Tabs>
	);
}
