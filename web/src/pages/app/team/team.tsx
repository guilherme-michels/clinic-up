import { Helmet } from "react-helmet-async";
import { Outlet, useLocation } from "react-router-dom";
import { TeamListMobile } from "./team-list/team-list-mobile";
import { TeamListWeb } from "./team-list/team-list-web";
import { TeamTabs } from "./team-tabs";

export function Team() {
	const location = useLocation();
	const isTeamList = location.pathname === "/equipe";

	return (
		<>
			<Helmet title="Equipe" />
			<div className="flex flex-col gap-4">
				<h1 className="text-xl sm:text-2xl  font-bold tracking-tight">
					Equipe
				</h1>

				<TeamTabs />

				{isTeamList ? (
					<>
						<div className="hidden md:block">
							<TeamListWeb />
						</div>
						<div className="md:hidden">
							<TeamListMobile />
						</div>
					</>
				) : (
					<Outlet />
				)}
			</div>
		</>
	);
}
