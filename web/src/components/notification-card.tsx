import { useEffect, useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { NotificationCardSkeleton } from "./notification-card-skeleton";

export function NotificationCard() {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 1000);

		return () => clearTimeout(timer);
	}, []);

	return (
		<Card>
			<CardHeader className="flex-row items-center justify-between space-y-0 py-1 px-2">
				<CardTitle className="font-thin !text-sm">Notificação</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4 overflow-y-auto px-3 pb-2 text-xs">
				{isLoading ? <NotificationCardSkeleton /> : <div>a</div>}
			</CardContent>
		</Card>
	);
}
