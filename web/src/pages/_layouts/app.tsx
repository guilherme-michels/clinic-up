import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { Outlet, useNavigate } from "react-router-dom";

export function AppLayout() {
	const navigate = useNavigate();

	return (
		<div className="flex min-h-screen flex-col antialiased">
			<Header />

			<Sidebar />

			<div className="flex flex-1 flex-col gap-4 p-8 pt-6 sm:ml-48 mt-16">
				<Outlet />
			</div>
		</div>
	);
}
