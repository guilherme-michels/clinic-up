import { Helmet } from "react-helmet-async";
import { SettingsTabs } from "./settings-tabs";
import { Developing } from "@/components/developing";

export function Settings() {
	return (
		<>
			<Helmet title="Equipe" />
			<div className="flex flex-col gap-4">
				<h1 className="text-xl sm:text-2xl  font-bold tracking-tight">
					Configurações
				</h1>

				<SettingsTabs />

				<Developing />
			</div>
		</>
	);
}
