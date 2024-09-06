import React, { useEffect, useState } from "react";
import { cn } from "../lib/utils";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";

interface MultiselectProps {
	options: {
		value: string;
		name: string;
	}[];
	label: string;
	placeholder?: string;
	required?: boolean;
	disabled?: boolean;
	value?: string;
	onChange: (value: string) => void;
	onBlur?: () => void;
	error?: string | null;
}

export function Multiselect({
	options,
	label,
	placeholder,
	disabled,
	value,
	onChange,
	onBlur,
	error,
}: MultiselectProps) {
	const [selectedOptions, setSelectedOptions] = useState<string>(value || "");

	useEffect(() => {
		setSelectedOptions(value || "");
	}, [value]);

	const handleOptionChange = (newValue: string) => {
		const newSelectedOptions = selectedOptions.includes(newValue)
			? selectedOptions
					.split(",")
					.filter((v) => v.trim() !== newValue)
					.join(", ")
			: selectedOptions
				? `${selectedOptions}, ${newValue}`
				: newValue;

		setSelectedOptions(newSelectedOptions);
		onChange(newSelectedOptions);
	};

	return (
		<div className={"flex w-full flex-col"}>
			{label && (
				<div className="text-xs px-1 text-zinc">
					{label}
					{error && (
						<span className="text-red-600 text-xs mt-1 ml-2">{error}</span>
					)}
				</div>
			)}

			<Select
				onValueChange={handleOptionChange}
				disabled={disabled || options.length === 0}
				value={selectedOptions}
				onOpenChange={(open) => {
					if (!open && onBlur) {
						onBlur();
					}
				}}
			>
				<SelectTrigger
					className={cn("mt-1 w-full text-xs ", error && "border-red")}
				>
					<SelectValue
						placeholder={
							options.length === 0
								? "Não existe nenhum dado cadastrado"
								: placeholder || "Selecione uma opção"
						}
					/>
				</SelectTrigger>
				<SelectContent>
					{options.map((option) => (
						<SelectItem
							key={option.value}
							value={option.value}
							className="text-xs hover:bg-zinc-100 cursor-pointer"
						>
							{selectedOptions.includes(option.value) && "✓ "}
							{option.name}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
}
