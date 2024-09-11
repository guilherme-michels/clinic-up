import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AppointmentTabsProps {
	onValueChange: (value: string) => void;
}

export function AppointmentTabs({ onValueChange }: AppointmentTabsProps) {
	return (
		<Tabs
			defaultValue="CONSULTATION"
			className="w-full"
			onValueChange={onValueChange}
		>
			<TabsList>
				<TabsTrigger value="CONSULTATION">Consulta</TabsTrigger>
				<TabsTrigger value="COMMITMENT">Compromisso</TabsTrigger>
			</TabsList>
		</Tabs>
	);
}
