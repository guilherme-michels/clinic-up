import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

type CardType = "entrada" | "despesa" | "saldo";

interface FinancialCardProps {
	title: string;
	valueLabel: string;
	value: number;
	buttonLabel: string;
	buttonIcon: LucideIcon;
	onButtonClick: () => void;
	cardType: CardType;
}

export function FinancialCard({
	title,
	valueLabel,
	value,
	buttonLabel,
	buttonIcon: ButtonIcon,
	onButtonClick,
	cardType,
}: FinancialCardProps) {
	const lineColorClass = {
		entrada: "bg-green-500",
		despesa: "bg-red-500",
		saldo: "bg-blue-500",
	}[cardType];

	return (
		<Card>
			<CardHeader className="flex-row items-center justify-between space-y-0 pb-4 pt-6">
				<CardTitle className="font-semibold">
					<div className={cn("h-2 w-8 rounded", lineColorClass)} />
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="flex flex-col">
					<p className="text-sm text-muted-foreground">{valueLabel}</p>
					<p className="text-2xl font-bold">
						R$ {value.toFixed(2).replace(".", ",")}
					</p>
				</div>
				<Button
					className="w-fit flex items-center justify-center gap-2"
					onClick={onButtonClick}
				>
					{buttonLabel}
					<ButtonIcon className="h-4 w-4" />
				</Button>
			</CardContent>
		</Card>
	);
}
