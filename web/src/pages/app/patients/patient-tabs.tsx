import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";

export function PatientTabs() {
	return (
		<Tabs defaultValue="lista" className="w-full">
			<TabsList>
				<TabsTrigger value="lista" asChild>
					<Link to="/pacientes">Lista</Link>
				</TabsTrigger>
				<TabsTrigger value="cadastro" asChild>
					<Link to="cadastro">Cadastro</Link>
				</TabsTrigger>
			</TabsList>
		</Tabs>
	);
}
