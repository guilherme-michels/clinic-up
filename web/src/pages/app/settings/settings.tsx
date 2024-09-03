import { Helmet } from "react-helmet-async";
import { SettingsTabs } from "./settings-tabs";

export function Settings() {
	return (
		<>
			<Helmet title="Equipe" />
			<div className="flex flex-col gap-4">
				<h1 className="text-xl sm:text-3xl font-bold tracking-tight">
					Configurações
				</h1>

				<SettingsTabs />
			</div>
		</>
	);
}
