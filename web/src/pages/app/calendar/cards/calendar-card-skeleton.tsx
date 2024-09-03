import { Skeleton } from "@/components/ui/skeleton";

export function CalendarCardSkeleton() {
	return (
		<div className="grid grid-cols-2 gap-2">
			<Skeleton className="h-8 w-52" />
			<Skeleton className="h-8 w-52" />
			<Skeleton className="h-8 w-52" />
			<Skeleton className="h-8 w-52" />
		</div>
	);
}
