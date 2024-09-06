import {
	type Control,
	Controller,
	type FieldValues,
	type Path,
} from "react-hook-form";
import { Input, type InputProps } from "./ui/input";

type FormInputProps<T extends FieldValues> = InputProps & {
	control: Control<T>;
	name: Path<T>;
	label: string;
	required: boolean;
};

function formatDate(date: Date | string): string {
	if (date instanceof Date) {
		return date.toLocaleDateString("pt-BR", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
		});
	}
	return date;
}

export function FormInput<T extends FieldValues>({
	control,
	name,
	label,
	required,
	type,
	...props
}: FormInputProps<T>) {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState }) => (
				<div className="relative flex justify-center flex-col w-full">
					{label && (
						<div className="text-xs px-1 mb-1 text-foreground">{label}</div>
					)}
					<Input
						{...field}
						value={type === "date" ? formatDate(field.value) : field.value}
						id={name}
						type={type === "date" ? "text" : type}
						placeholder={type === "date" ? "--/--/----" : undefined}
						pattern={type === "date" ? "\\d{2}/\\d{2}/\\d{4}" : undefined}
						required={required}
						onChange={(event) => {
							if (type === "date") {
								const value = event.target.value.replace(/\D/g, "");
								const formattedValue = value
									.replace(/^(\d{2})(\d)/, "$1/$2")
									.replace(/^(\d{2})\/(\d{2})(\d)/, "$1/$2/$3")
									.slice(0, 10);
								field.onChange(formattedValue);
							} else {
								field.onChange(event);
							}
						}}
						{...props}
					/>
					{fieldState.error && (
						<span className="text-sm text-red-500">
							{fieldState.error.message}
						</span>
					)}
				</div>
			)}
		/>
	);
}
