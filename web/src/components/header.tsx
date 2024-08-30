import { Hospital } from "lucide-react";

import { ThemeToggle } from "./theme/theme-toggle";
import { AccountMenu } from "./account-menu";
import { NavMenu } from "./navigation-menu";

export function Header() {
	return (
		<div className="fixed w-full border-b z-10 bg-background/80 backdrop-blur-sm">
			<div className="flex h-16 items-center justify-between px-4 sm:px-6">
				<div className="flex items-center gap-2 sm:gap-6">
					<Hospital className="h-6 w-6" />
					<span className="font-semibold hidden sm:inline">ClinicUp</span>

					<div className="ml-1 sm:hidden flex">
						<NavMenu />
					</div>
				</div>
				<div className="items-center gap-2 flex">
					<ThemeToggle />
					<AccountMenu />
				</div>
			</div>
		</div>
	);
}
