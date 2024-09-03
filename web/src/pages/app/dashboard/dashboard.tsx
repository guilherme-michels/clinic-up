import { Helmet } from "react-helmet-async";

export function Dashboard() {
	return (
		<>
			<Helmet title="Dashboard" />
			<div className="flex flex-col gap-4">
				<h1 className="text-xl sm:text-2xl  font-bold tracking-tight">
					Análise de dados
				</h1>

				<div className="grid grid-cols-4 gap-4">teste</div>
			</div>
		</>
	);
}
