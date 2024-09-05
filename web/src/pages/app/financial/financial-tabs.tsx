import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, useLocation } from "react-router-dom";

export function FinancialTabs() {
	const location = useLocation();
	const currentPath = location.pathname;

	const getActiveTab = () => {
		if (currentPath === "/financeiro") {
			return "financial";
		}
		if (currentPath.includes("/financeiro")) {
			return "patient";
		}
		return "financial";
	};

	return (
		<Tabs value={getActiveTab()} className="w-full">
			<TabsList>
				<TabsTrigger value="financial" asChild>
					<Link to={"/analise-dados"}>Histórico</Link>
				</TabsTrigger>
			</TabsList>
		</Tabs>
	);
}
