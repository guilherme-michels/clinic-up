import { addDays, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import * as React from "react";
import type { DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export function DatePickerWithRange({
	className,
}: React.HTMLAttributes<HTMLDivElement>) {
	const [date, setDate] = React.useState<DateRange | undefined>({
		from: new Date(2022, 0, 20),
		to: addDays(new Date(2022, 0, 20), 20),
	});

	const formatDate = (date: Date) => {
		return format(date, "dd 'de' MMM", { locale: ptBR });
	};

	return (
		<div className={cn("grid gap-2", className)}>
			<Popover>
				<PopoverTrigger asChild>
					<Button
						id="date"
						variant={"outline"}
						className={cn(
							"w-fit justify-start text-left font-normal h-10",
							!date && "text-muted-foreground",
						)}
					>
						<CalendarIcon className="mr-2 h-4 w-4" />
						{date?.from ? (
							date.to ? (
								<>
									{formatDate(date.from)} - {formatDate(date.to)}
								</>
							) : (
								formatDate(date.from)
							)
						) : (
							<span>Selecione um período</span>
						)}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-0" align="start">
					<Calendar
						initialFocus
						mode="range"
						defaultMonth={date?.from}
						selected={date}
						onSelect={setDate}
						numberOfMonths={2}
						locale={ptBR}
						weekStartsOn={0}
						formatters={{
							formatWeekdayName: (day) =>
								format(day, "EEEEE", { locale: ptBR }).toUpperCase(),
							formatCaption: (date) =>
								format(date, "MMMM yyyy", { locale: ptBR }),
						}}
					/>
				</PopoverContent>
			</Popover>
		</div>
	);
}
