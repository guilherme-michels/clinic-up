import { Bell, Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NotificationCard } from "./notification-card";

export function NotificationToggle() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" size="icon">
					<Bell className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="min-w-[300px]">
				<div className="p-2 text-sm font-bold">Notificações</div>

				<div className="flex flex-col w-full">
					<NotificationCard />
				</div>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
