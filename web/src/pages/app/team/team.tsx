import { Helmet } from "react-helmet-async";

export function Team() {
	return (
		<>
			<Helmet title="Equipe" />
			<div className="flex flex-col gap-4">
				<h1 className="text-xl sm:text-3xl font-bold tracking-tight">Equipe</h1>

				<div className="grid grid-cols-4 gap-4">teste</div>
			</div>
		</>
	);
}
