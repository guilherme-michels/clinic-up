import { Hospital } from "lucide-react";

import { ThemeToggle } from "./theme/theme-toggle";
import { AccountMenu } from "./account-menu";
import { NavMenu } from "./navigation-menu";
import { NotificationToggle } from "./notification-toggle";
import { Link } from "react-router-dom";

export function Header() {
	return (
		<div className="fixed w-full border-b z-10 bg-background/80 backdrop-blur-sm">
			<div className="flex h-16 items-center justify-between px-4 sm:px-6">
				<div className="flex items-center gap-2 sm:gap-6">
					<Link to="/" className="flex gap-2 hover:opacity-80 transition-all">
						<Hospital className="h-6 w-6" />
						<span className="font-semibold hidden sm:inline">ClinicUp</span>
					</Link>

					<div className="ml-1 sm:hidden flex">
						<NavMenu />
					</div>
				</div>
				<div className="items-center gap-2 flex">
					{/* <NotificationToggle /> */}
					<ThemeToggle />
					<AccountMenu />
				</div>
			</div>
		</div>
	);
}
