import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function ClinicTabs() {
	return (
		<Tabs defaultValue="data" className="w-full">
			<TabsList>
				<TabsTrigger value="data">Dados</TabsTrigger>
				<TabsTrigger value="plans">Planos</TabsTrigger>
				<TabsTrigger value="anamnese">Anamnese</TabsTrigger>
			</TabsList>
		</Tabs>
	);
}
