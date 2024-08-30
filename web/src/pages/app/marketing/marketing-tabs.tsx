import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function MarketingTabs() {
	return (
		<Tabs defaultValue="account" className="w-full">
			<TabsList>
				<TabsTrigger value="account">Lista</TabsTrigger>
				<TabsTrigger value="password">Cadastro</TabsTrigger>
			</TabsList>
		</Tabs>
	);
}
