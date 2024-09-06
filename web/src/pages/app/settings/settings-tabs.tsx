import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, useLocation } from "react-router-dom";

export function SettingsTabs() {
	const location = useLocation();
	const currentPath = location.pathname;

	const getActiveTab = () => {
		if (currentPath.includes("/configuracoes")) {
			return "settings";
		}
		return "list";
	};

	return (
		<Tabs value={getActiveTab()} className="w-full">
			<TabsList>
				<TabsTrigger value="settings" asChild>
					<Link to="/configuracoes">Configurações</Link>
				</TabsTrigger>
			</TabsList>
		</Tabs>
	);
}
