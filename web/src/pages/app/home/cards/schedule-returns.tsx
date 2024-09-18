import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { CalendarClock } from "lucide-react";

export function ScheduledReturns() {
	const hasReturns = false;

	return (
		<Card className="h-max-[400px]">
			<CardHeader className="flex-row items-center justify-between space-y-0 pb-4">
				<CardTitle className="font-semibold">
					Retornos a serem agendados
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				{hasReturns ? (
					<p>Lista de retornos a serem agendados</p>
				) : (
					<p className="text-center text-muted-foreground">
						Você ainda não tem nenhum retorno a ser agendado.
					</p>
				)}
			</CardContent>
			<CardFooter className="mt-2">
				<Button className="flex items-center gap-2">
					Visualizar painel de retornos
					<CalendarClock className="h-4 w-4 text-muted" />
				</Button>
			</CardFooter>
		</Card>
	);
}
