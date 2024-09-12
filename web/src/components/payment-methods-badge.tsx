import { Badge } from "@/components/ui/badge";

type PaymentMethod =
	| "CASH"
	| "CREDIT_CARD"
	| "DEBIT_CARD"
	| "BANK_TRANSFER"
	| "PIX"
	| "OTHER";

interface PaymentMethodBadgeProps {
	method: PaymentMethod;
}

export function PaymentMethodBadge({ method }: PaymentMethodBadgeProps) {
	const getMethodColor = (method: PaymentMethod) => {
		switch (method) {
			case "CASH":
				return "bg-green-500 hover:bg-green-600";
			case "CREDIT_CARD":
				return "bg-blue-500 hover:bg-blue-600";
			case "DEBIT_CARD":
				return "bg-cyan-500 hover:bg-cyan-600";
			case "BANK_TRANSFER":
				return "bg-purple-500 hover:bg-purple-600";
			case "PIX":
				return "bg-yellow-500 hover:bg-yellow-600";
			case "OTHER":
				return "bg-gray-500 hover:bg-gray-600";
			default:
				return "bg-gray-500 hover:bg-gray-600";
		}
	};

	const getMethodLabel = (method: PaymentMethod) => {
		switch (method) {
			case "CASH":
				return "Dinheiro";
			case "CREDIT_CARD":
				return "Cartão de Crédito";
			case "DEBIT_CARD":
				return "Cartão de Débito";
			case "BANK_TRANSFER":
				return "Transferência Bancária";
			case "PIX":
				return "PIX";
			case "OTHER":
				return "Outro";
			default:
				return "Desconhecido";
		}
	};

	return (
		<Badge className={`${getMethodColor(method)} text-white`}>
			{getMethodLabel(method)}
		</Badge>
	);
}
