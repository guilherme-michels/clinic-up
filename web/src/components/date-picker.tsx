import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import {
	type Control,
	Controller,
	type FieldValues,
	type Path,
} from "react-hook-form";

type FormDatePickerProps<T extends FieldValues> = {
	control: Control<T>;
	name: Path<T>;
	label: string;
	required?: boolean;
};

export function FormDatePicker<T extends FieldValues>({
	control,
	name,
	label,
}: FormDatePickerProps<T>) {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState }) => (
				<div className="relative flex justify-center flex-col w-full">
					{label && (
						<div className="text-xs px-1 mb-1 text-foreground">
							{label}
							{fieldState.error && (
								<span className="text-xs text-red-500 ml-2">
									{fieldState.error.message}
								</span>
							)}
						</div>
					)}
					<Popover>
						<PopoverTrigger asChild>
							<Button
								variant={"outline"}
								className={cn(
									"w-full justify-start text-left font-normal border-zinc-300 h-10",
									!field.value && "text-muted-foreground",
									fieldState.error ? "border-red-600" : "border-zinc-300",
								)}
							>
								<CalendarIcon className="mr-2 h-4 w-4" />
								{field.value ? (
									format(field.value, "dd/MM/yyyy", { locale: ptBR })
								) : (
									<span>Selecione uma data</span>
								)}
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-auto p-0" align="start">
							<Calendar
								mode="single"
								selected={field.value}
								onSelect={field.onChange}
								initialFocus
								locale={ptBR}
							/>
						</PopoverContent>
					</Popover>
				</div>
			)}
		/>
	);
}
