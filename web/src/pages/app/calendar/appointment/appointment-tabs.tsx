import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function AppointmentTabs() {
	return (
		<Tabs defaultValue="appointment" className="w-full">
			<TabsList>
				<TabsTrigger value="appointment">Consulta</TabsTrigger>
				<TabsTrigger value="scheduling">Compromisso</TabsTrigger>
			</TabsList>
		</Tabs>
	);
}
