import {
	type Control,
	Controller,
	type FieldValues,
	type Path,
} from "react-hook-form";
import { Input, type InputProps } from "./ui/input";
import InputMask from "react-input-mask";
import { cn } from "@/lib/utils";

type FormInputProps<T extends FieldValues> = InputProps & {
	control: Control<T>;
	name: Path<T>;
	label: string;
	required: boolean;
	type?: string;
	mask?: "date" | "cpf" | "rg";
};

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
						<div className="text-xs px-1 mb-1 text-foreground">{label}</div>
					)}
					{mask ? (
						<InputMask
							mask={getMask(mask)}
							maskChar={null}
							value={field.value}
							onChange={field.onChange}
							className={cn(
								"flex h-10 w-full border-[1px] rounded-md bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
								fieldState.error ? "border-red-600" : "border-zinc-300",
							)}
						/>
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

function getMask(maskType: string): string {
	switch (maskType) {
		case "date":
			return "99/99/9999";
		case "cpf":
			return "999.999.999-99";
		case "rg":
			return "9999999999";
		default:
			return "";
	}
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
function formatDateValue(value: any, type?: string): string {
	if (type === "date" && value instanceof Date) {
		const day = value.getDate().toString().padStart(2, "0");
		const month = (value.getMonth() + 1).toString().padStart(2, "0");
		const year = value.getFullYear();
		return `${day}/${month}/${year}`;
	}
	return value ?? "";
}

function formatDateInput(value: string): string {
	const cleanValue = value.replace(/\D/g, "");
	const day = cleanValue.slice(0, 2);
	const month = cleanValue.slice(2, 4);
	const year = cleanValue.slice(4, 8);

	if (cleanValue.length <= 2) return day;
	if (cleanValue.length <= 4) return `${day}/${month}`;
	return `${day}/${month}/${year}`;
}
