import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function MarketingTabs() {
	return (
		<Tabs defaultValue="appointment" className="w-full">
			<TabsList>
				<TabsTrigger value="appointment">Agendamentos</TabsTrigger>
			</TabsList>
		</Tabs>
	);
}
