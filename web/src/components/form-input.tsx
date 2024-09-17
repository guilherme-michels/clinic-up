import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import {
	type Control,
	Controller,
	type FieldValues,
	type Path,
} from "react-hook-form";
import InputMask from "react-input-mask";
import { Input, type InputProps } from "./ui/input";

type FormInputProps<T extends FieldValues> = InputProps & {
	control: Control<T>;
	name: Path<T>;
	label: string;
	required: boolean;
	type?: string;
	mask?: "date" | "cpf" | "rg" | "time";
};

function getMask(maskType: "date" | "cpf" | "rg"): string {
	switch (maskType) {
		case "date":
			return "99/99/9999";
		case "cpf":
			return "999.999.999-99";
		case "rg":
			return "99.999.999-9";
		default:
			return "";
	}
}

export function FormInput<T extends FieldValues>({
	control,
	name,
	label,
	required,
	type,
	mask,
	...props
}: FormInputProps<T>) {
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
					{mask ? (
						mask === "time" ? (
							<TimeInput
								value={field.value}
								onChange={field.onChange}
								onBlur={field.onBlur}
								error={!!fieldState.error}
							/>
						) : (
							<InputMask
								mask={getMask(mask)}
								maskChar={null}
								value={field.value}
								onChange={(e) => {
									let value = e.target.value;
									if (mask === "date") {
										value = formatDateInput(value);
									}
									field.onChange(value);
								}}
								onBlur={(e) => {
									field.onBlur();
									if (mask === "date") {
										field.onChange(formatDateInput(e.target.value));
									}
								}}
								className={cn(
									"flex h-10 w-full border-[1px] rounded-md bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
									fieldState.error ? "border-red-600" : "border-zinc-300",
								)}
							/>
						)
					) : (
						<Input
							{...field}
							{...props}
							type={type}
							id={name}
							required={required}
							className={cn(
								"flex h-10 w-full border-[1px] rounded-md bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
								fieldState.error ? "border-red-600" : "border-zinc-300",
							)}
						/>
					)}
				</div>
			)}
		/>
	);
}

function TimeInput({
	value,
	onChange,
	onBlur,
	error,
}: {
	value: string;
	onChange: (value: string) => void;
	onBlur: () => void;
	error: boolean;
}) {
	const [internalValue, setInternalValue] = useState(value || "");

	useEffect(() => {
		setInternalValue(value || "");
	}, [value]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let newValue = e.target.value.replace(/[^\d:]/g, "");
		if (newValue.length > 5) newValue = newValue.slice(0, 5);
		if (newValue.length === 2 && !newValue.includes(":")) newValue += ":";
		setInternalValue(newValue);
	};

	const handleBlur = () => {
		const formatted = formatTimeInput(internalValue);
		setInternalValue(formatted);
		onChange(formatted);
		onBlur();
	};

	return (
		<input
			type="text"
			value={internalValue}
			onChange={handleChange}
			onBlur={handleBlur}
			placeholder="HH:MM"
			className={cn(
				"flex h-10 w-full border-[1px] rounded-md bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
				error ? "border-red-600" : "border-zinc-300",
			)}
		/>
	);
}

function formatTimeInput(value: string): string {
	const [hours, minutes] = value.split(":");
	let formattedHours = hours ? Number.parseInt(hours) : 0;
	let formattedMinutes = minutes ? Number.parseInt(minutes) : 0;

	if (formattedHours > 23) formattedHours = 23;
	if (formattedMinutes > 59) formattedMinutes = 59;

	return `${formattedHours.toString().padStart(2, "0")}:${formattedMinutes.toString().padStart(2, "0")}`;
}

function formatDateInput(value: string): string {
	const numbers = value.replace(/\D/g, "");
	const date = new Date(
		Number.parseInt(numbers.substring(4, 8)),
		Number.parseInt(numbers.substring(2, 4)) - 1,
		Number.parseInt(numbers.substring(0, 2)),
	);

	return date.toLocaleDateString("pt-BR", {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
	});
}
