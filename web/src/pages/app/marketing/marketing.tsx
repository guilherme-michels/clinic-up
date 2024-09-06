import { Developing } from "@/components/developing";
import { Helmet } from "react-helmet-async";

export function Marketing() {
	return (
		<>
			<Helmet title="Marketing" />
			<div className="flex flex-col gap-4">
				<h1 className="text-xl sm:text-2xl  font-bold tracking-tight">
					Marketing
				</h1>

				<Developing />
			</div>
		</>
	);
}
