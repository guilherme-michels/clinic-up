import { Skeleton } from "@/components/ui/skeleton";

export function HomeCardSkeleton() {
	return (
		<>
			<Skeleton className="mt-1 h-8 w-full" />
			<Skeleton className="h-8 w-full" />
			<Skeleton className="h-8 w-full" />
			<Skeleton className="h-8 w-full" />
		</>
	);
}
