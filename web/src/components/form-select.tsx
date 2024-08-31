import {
	type Control,
	Controller,
	type FieldValues,
	type Path,
} from "react-hook-form";
import { Multiselect } from "./multiselect";
import type { SelectProps } from "@radix-ui/react-select";

type FormSelectProps<T extends FieldValues> = SelectProps & {
	control: Control<T>;
	name: Path<T>;
	label: string;
	required: boolean;
	options: {
		value: string;
		name: string;
	}[];
};

export function FormSelect<T extends FieldValues>({
	control,
	name,
	label,
	required,
	options,
	...props
}: FormSelectProps<T>) {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState }) => (
				<Multiselect
					name={label}
					options={options}
					value={field.value as string}
					label={label}
					required={required}
					onChange={(value: string) => field.onChange(value)}
					error={fieldState.error?.message}
					defaultValue={field.value as string}
					{...props}
				/>
			)}
		/>
	);
}
