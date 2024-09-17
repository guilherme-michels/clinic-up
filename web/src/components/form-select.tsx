import { cn } from "@/lib/utils";
import {
	type Control,
	Controller,
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

interface FormSelectProps<T extends FieldValues> {
	control: Control<T>;
	name: Path<T>;
	label: string;
	options: { value: string; name: string }[];
	placeholder?: string;
	required?: boolean;
	disabled?: boolean;
}

export function FormSelect<T extends FieldValues>({
	control,
	name,
	label,
	options,
	placeholder,
	disabled,
}: FormSelectProps<T>) {
	const hasOptions = options.length > 0;

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
						disabled={disabled || !hasOptions}
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
							{hasOptions ? (
								options.map((option) => (
									<SelectItem
										key={option.value}
										value={option.value}
										className="text-sm"
									>
										{option.name}
									</SelectItem>
								))
							) : (
								<div className="text-sm text-gray-400 p-2">
									Nenhuma opção disponível
								</div>
							)}
						</SelectContent>
					</Select>
				</div>
			)}
		/>
	);
}
