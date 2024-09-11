import { Developing } from "@/components/developing";
import { Helmet } from "react-helmet-async";

export function MyAccount() {
	return (
		<>
			<Helmet title="Pacientes" />
			<div className="flex flex-col gap-4">
				<h1 className="text-xl sm:text-2xl  font-bold tracking-tight">
					Minha conta
				</h1>

				<Developing />
			</div>
		</>
	);
}
