import { Helmet } from "react-helmet-async";

export function Clinic() {
	return (
		<>
			<Helmet title="Clínica" />
			<div className="flex flex-col gap-4">
				<h1 className="text-xl sm:text-3xl font-bold tracking-tight">
					Clínica
				</h1>

				<div className="grid grid-cols-4 gap-4">teste</div>
			</div>
		</>
	);
}
