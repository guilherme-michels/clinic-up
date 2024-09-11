import {
	Controller,
	type Control,
	type FieldValues,
	type Path,
} from "react-hook-form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";
import { cn } from "@/lib/utils";

interface FormSelectProps<T extends FieldValues> {
	control: Control<T>;
	name: Path<T>;
	label: string;
	options: { value: string; name: string }[];
	placeholder?: string;
	required?: boolean;
}

export function FormSelect<T extends FieldValues>({
	control,
	name,
	label,
	options,
	placeholder,
}: FormSelectProps<T>) {
	return (
		<Controller
			control={control}
			name={name}
			render={({ field, fieldState: { error } }) => (
				<div className="flex flex-col">
					{label && (
						<div className="text-xs px-1 mb-1 text-foreground">
							{label}
							{error && (
								<span className="text-xs text-red-500 ml-2">
									{error.message}
								</span>
							)}
						</div>
					)}
					<Select
						onValueChange={field.onChange}
						defaultValue={field.value}
						value={field.value}
					>
						<SelectTrigger
							className={cn(
								"w-full border-zinc-300 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
								error ? "border-red-600" : "border-zinc-300",
							)}
						>
							<SelectValue placeholder={placeholder || "Selecione uma opção"} />
						</SelectTrigger>
						<SelectContent>
							{options.map((option) => (
								<SelectItem
									key={option.value}
									value={option.value}
									className="text-sm"
								>
									{option.name}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
			)}
		/>
	);
}
